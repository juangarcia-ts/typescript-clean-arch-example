import { Cpf } from "../../../../../src/domain/entity/Cpf";
import { Order } from "../../../../../src/domain/entity/Order";
import { OrderRepositoryMemory } from "../../../../../src/infrastructure/repository/memory/OrderRepositoryMemory";

describe("OrderRepositoryMemory", () => {
  let repository: OrderRepositoryMemory;

  beforeEach(() => {
    repository = new OrderRepositoryMemory();
  });

  it("should save order and find it by code", async () => {
    const order = new Order(
      new Cpf("766.582.760-80"),
      new Date("2021-10-10"),
      1
    );

    await repository.save(order);
    const count = await repository.count();

    expect(count).toEqual(1);

    const result = await repository.findOneByCode("202100000001");
    expect(result).toBe(order);
  });
});
