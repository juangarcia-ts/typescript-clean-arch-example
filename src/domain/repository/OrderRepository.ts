import { Order } from "../entity/Order";

export interface OrderRepository {
  findOneByCode(code: string): Promise<Order | undefined>;
  save(order: Order): Promise<void>;
  count(): Promise<number>;
}
