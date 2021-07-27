import { deepEqual, instance, mock, verify } from "ts-mockito";
import { MemoryStorage } from "../../../src/common/storage/memory.storage";
import { Order } from "../../../src/order/order.entity";
import { OrderRepository } from "../../../src/order/order.repository";

describe("OrderRepository", () => {
  const memStorage = mock(MemoryStorage) as MemoryStorage<Order>;
  const repository = new OrderRepository(instance(memStorage));

  describe("#create", () => {
    const order: Order = {
      description: "Order #1",
      price: 14.5,
      amount: 2,
    };

    it("should save order", () => {
      repository.create(order);
      verify(memStorage.append(deepEqual(order))).once();
    });
  });
});
