import { Order } from "../../../domain/entity/Order";
import { OrderRepository } from "../../../domain/repository/OrderRepository";

export class OrderRepositoryMemory implements OrderRepository {
  private items: Order[];

  constructor(orders: Order[]) {
    this.items = orders;
  }

  public save(order: Order): Order {
    this.items.push(order);
    return order;
  }
}
