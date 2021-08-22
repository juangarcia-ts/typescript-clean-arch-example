import { Order } from "../../../domain/entity/Order";
import { OrderRepository } from "../../../domain/repository/OrderRepository";

export class OrderRepositoryMemory implements OrderRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  public findOneByCode(code: string): Promise<Order | undefined> {
    const order = this.orders.find((el) => el.code.value === code);
    return Promise.resolve(order);
  }

  public save(order: Order): Promise<void> {
    this.orders.push(order);
    return Promise.resolve();
  }

  public count(): Promise<number> {
    return Promise.resolve(this.orders.length);
  }
}
