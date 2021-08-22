import { Coupon } from "../../../domain/entity/Coupon";
import { Cpf } from "../../../domain/entity/Cpf";
import { Order } from "../../../domain/entity/Order";
import { OrderItem } from "../../../domain/entity/OrderItem";
import { OrderRepository } from "../../../domain/repository/OrderRepository";
import { Database } from "../../database/Database";

export class OrderRepositoryDatabase implements OrderRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public async findOneByCode(code: string): Promise<Order | undefined> {
    const [orderRow] = await this.db.executeQuery(
      "SELECT * FROM public.order WHERE code = $1",
      [code]
    );

    if (!orderRow) {
      return;
    }

    const orderItemRows = await this.db.executeQuery(
      "SELECT * FROM public.order_item WHERE order_id = $1",
      [orderRow.id]
    );

    const order = new Order(
      new Cpf(orderRow.cpf),
      new Date(orderRow.created_at),
      orderRow.sequence
    );

    for (const orderItemRow of orderItemRows) {
      const orderItem = new OrderItem(
        orderItemRow.item_id,
        parseFloat(orderItemRow.price),
        orderItemRow.amount
      );

      order.addItem(orderItem);
    }

    if (orderRow.coupon_code) {
      const [couponRow] = await this.db.executeQuery(
        "SELECT * FROM public.coupon WHERE code = $1",
        [orderRow.coupon_code]
      );

      const coupon = new Coupon(
        couponRow.code,
        couponRow.percentage,
        new Date(couponRow.expires_at)
      );

      order.addCoupon(coupon);
    }

    order.shippingCost = parseFloat(orderRow.shipping_cost);

    return order;
  }

  public async save(order: Order): Promise<void> {
    const [{ id }] = await this.db.executeQuery(
      'INSERT INTO public.order ("cpf", "code", "shipping_cost", "sequence", "created_at") VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        order.cpf.value,
        order.code.value,
        order.shippingCost,
        order.sequence,
        order.createdAt,
      ]
    );

    for (const orderItem of order.items) {
      await this.db.executeQuery(
        'INSERT INTO public.order_item ("order_id", "item_id", "price", "amount") VALUES ($1, $2, $3, $4)',
        [id, orderItem.itemId, orderItem.price, orderItem.amount]
      );
    }
  }

  public async count(): Promise<number> {
    const [{ count }] = await this.db.executeQuery(
      "SELECT COUNT(*) as count FROM public.order"
    );

    return parseInt(count);
  }
}
