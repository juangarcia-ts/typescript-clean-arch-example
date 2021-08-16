import { Cpf } from "../../../../../src/domain/entity/Cpf";
import { Order } from "../../../../../src/domain/entity/Order";
import { PostgresDatabase } from "../../../../../src/infrastructure/database/PostgresDatabase";
import { OrderRepositoryDatabase } from "../../../../../src/infrastructure/repository/database/OrderRepositoryDatabase";

describe("OrderRepositoryDatabase", () => {
  const database = new PostgresDatabase();
  const repository = new OrderRepositoryDatabase(database);

  const order = new Order(new Cpf("766.582.760-80"));

  afterAll(async () => {
    return database.executeQuery("DELETE FROM public.order");
  });

  it("should save order into database", async () => {
    await repository.save(order);
    const orders = await repository.findAll();
    expect(orders).toHaveLength(1);
  });
});
