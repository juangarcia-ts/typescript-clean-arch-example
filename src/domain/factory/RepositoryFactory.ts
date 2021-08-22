import { CouponRepository } from "../repository/CouponRepository";
import { ItemRepository } from "../repository/ItemRepository";
import { OrderRepository } from "../repository/OrderRepository";

export interface RepositoryFactory {
  createItemRepository(): ItemRepository;
  createOrderRepository(): OrderRepository;
  createCouponRepository(): CouponRepository;
}