import { RepositoryFactory } from "../domain/factory/RepositoryFactory";
import { ItemRepository } from "../domain/repository/ItemRepository";
import { OrderRepository } from "../domain/repository/OrderRepository";
import { GetOrderOutput } from "./GetOrderOutput";

export class GetOrder {
  private itemRepository: ItemRepository;
  private orderRepository: OrderRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.itemRepository = repositoryFactory.createItemRepository();
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  public async execute(code: string): Promise<GetOrderOutput> {
    const order = await this.orderRepository.findOneByCode(code);

    if (!order) {
      throw new Error("Order not found");
    }

    const orderItems = [];

    for (const orderItem of order.items) {
      const item = await this.itemRepository.findOneById(orderItem.itemId);

      if (item) {
        orderItems.push({
          description: item.description,
          price: orderItem.price,
          amount: orderItem.amount,
        });
      }
    }

    return {
      code,
      orderItems,
      shippingCost: order.shippingCost,
      total: order.getTotal(),
    };
  }
}
