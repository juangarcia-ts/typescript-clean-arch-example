import { IStorage } from "../common/storage/IStorage";
import { Coupon } from "./Coupon";
import { Cpf } from "./Cpf";
import { Order } from "./Order";
import { PlaceOrderDTO } from "./OrderDto";
import { OrderItem } from "./OrderItem";

export class PlaceOrder {
  private orderStorage: IStorage<Order>;
  private couponStorage: IStorage<Coupon>;

  constructor(orderStorage: IStorage<Order>, couponStorage: IStorage<Coupon>) {
    this.orderStorage = orderStorage;
    this.couponStorage = couponStorage;
  }

  public execute({ cpf, items, couponName }: PlaceOrderDTO): { total: number } {
    const customerCpf = new Cpf(cpf);
    const order = new Order(customerCpf);

    for (const item of items) {
      order.addItem(new OrderItem(item.description, item.price, item.amount));
    }

    if (couponName) {
      const coupon = this.couponStorage
        .findAll()
        .find((coupon) => coupon.name === couponName);

      if (coupon) {
        order.addCoupon(coupon);
      }
    }

    this.orderStorage.save(order);

    return {
      total: order.getTotal(),
    };
  }
}
