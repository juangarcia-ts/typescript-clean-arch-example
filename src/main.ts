import { MemoryStorage } from "./common/storage/memory.storage";
import { Order } from "./order/order.entity";
import { OrderRepository } from "./order/order.repository";
import { OrderService } from "./order/order.service";

function main() {
  const memStorage = new MemoryStorage<Order>();
  const orderRepository = new OrderRepository(memStorage);
  const orderService = new OrderService(orderRepository);

  orderService.create("766.582.760-80", {
    amount: 3,
    description: "Order #1",
    price: 20,
  });

  orderService.create(
    "766.582.760-80",
    {
      amount: 5,
      description: "Order #2",
      price: 100,
    },
    25
  );

  console.log(memStorage.listAll());
}

main();
