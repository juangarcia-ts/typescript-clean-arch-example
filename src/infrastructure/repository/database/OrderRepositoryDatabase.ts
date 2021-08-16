import { Cpf } from "../../../domain/entity/Cpf";
import { Order } from "../../../domain/entity/Order";
import { OrderRepository } from "../../../domain/repository/OrderRepository";
import { Database } from "../../database/Database";

export class OrderRepositoryDatabase implements OrderRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public async findAll(): Promise<Order[]> {
    const rows = await this.db.executeQuery("SELECT * FROM public.order");
    return rows.map((row: any) => new Order(new Cpf(row.cpf)));
  }

  public async save(order: Order): Promise<void> {
    await this.db.executeQuery(
      'INSERT INTO public.order ("cpf", "shipping_cost") VALUES ($1, $2);',
      [order.cpf.value, order.shippingCost]
    );
  }
}
