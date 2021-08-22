import { Cpf } from "../../../../../src/domain/entity/Cpf";
import { Order } from "../../../../../src/domain/entity/Order";
import { OrderItem } from "../../../../../src/domain/entity/OrderItem";
import { PostgresDatabase } from "../../../../../src/infrastructure/database/PostgresDatabase";
import { OrderRepositoryDatabase } from "../../../../../src/infrastructure/repository/database/OrderRepositoryDatabase";

describe("OrderRepositoryDatabase", () => {
  const database = PostgresDatabase.getInstance();
  const repository = new OrderRepositoryDatabase(database);

  afterAll(async () => {
    await database.executeQuery("DELETE FROM public.order_item");
    await database.executeQuery("DELETE FROM public.order");
  });

  it("should save order into database and find it by id", async () => {
    const order = new Order(
      new Cpf("766.582.760-80"),
      new Date("2021-10-10"),
      1
    );

    order.addItem(
      new OrderItem("3ee14b1b-74cf-4fe4-bc5a-d4c3c598d4fb", 500, 2)
    );

    await repository.save(order);

    const count = await repository.count();
    expect(count).toEqual(1);

    const result = await repository.findOneByCode("202100000001");
    expect(result?.code.value).toEqual("202100000001");
    expect(result?.items).toHaveLength(1);
  });
});
