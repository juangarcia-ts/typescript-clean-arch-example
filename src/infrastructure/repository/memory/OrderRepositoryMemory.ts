import { Order } from "../../../domain/entity/Order";
import { OrderRepository } from "../../../domain/repository/OrderRepository";

export class OrderRepositoryMemory implements OrderRepository {
  private items: Order[];

  constructor(orders: Order[]) {
    this.items = orders;
  }

  public findAll(): Promise<Order[]> {
    return Promise.resolve(this.items);
  }

  public save(order: Order): Promise<void> {
    this.items.push(order);
    return Promise.resolve();
  }
}
