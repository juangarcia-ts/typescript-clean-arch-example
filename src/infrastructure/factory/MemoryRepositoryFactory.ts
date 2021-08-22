import { RepositoryFactory } from "../../domain/factory/RepositoryFactory";
import { CouponRepositoryMemory } from "../repository/memory/CouponRepositoryMemory";
import { ItemRepositoryMemory } from "../repository/memory/ItemRepositoryMemory";
import { OrderRepositoryMemory } from "../repository/memory/OrderRepositoryMemory";

export class MemoryRepositoryFactory implements RepositoryFactory {
  createItemRepository(): ItemRepositoryMemory {
    return new ItemRepositoryMemory();
  }

  createOrderRepository(): OrderRepositoryMemory {
    return new OrderRepositoryMemory();
  }

  createCouponRepository(): CouponRepositoryMemory {
    return new CouponRepositoryMemory();
  }
}
