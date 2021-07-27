import { MemoryStorage } from "../common/storage/memory.storage";
import { Order } from "./order.entity";

export class OrderRepository {
  constructor(private readonly storage: MemoryStorage<Order>) {}

  public create(order: Order): void {
    this.storage.append(order);
  }
}
