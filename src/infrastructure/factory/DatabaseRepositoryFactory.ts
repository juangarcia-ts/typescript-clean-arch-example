import { RepositoryFactory } from "../../domain/factory/RepositoryFactory";
import { PostgresDatabase } from "../database/PostgresDatabase";
import { CouponRepositoryDatabase } from "../repository/database/CouponRepositoryDatabase";
import { ItemRepositoryDatabase } from "../repository/database/ItemRepositoryDatabase";
import { OrderRepositoryDatabase } from "../repository/database/OrderRepositoryDatabase";

export class DatabaseRepositoryFactory implements RepositoryFactory {
  createItemRepository(): ItemRepositoryDatabase {
    return new ItemRepositoryDatabase(PostgresDatabase.getInstance());
  }

  createOrderRepository(): OrderRepositoryDatabase {
    return new OrderRepositoryDatabase(PostgresDatabase.getInstance());
  }

  createCouponRepository(): CouponRepositoryDatabase {
    return new CouponRepositoryDatabase(PostgresDatabase.getInstance());
  }
}
