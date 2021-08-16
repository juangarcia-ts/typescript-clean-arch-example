import { Cpf } from "../../../../../src/domain/entity/Cpf";
import { Order } from "../../../../../src/domain/entity/Order";
import { OrderRepositoryMemory } from "../../../../../src/infrastructure/repository/memory/OrderRepositoryMemory";

describe("OrderRepositoryMemory", () => {
  const repository = new OrderRepositoryMemory([]);

  const order = new Order(new Cpf("766.582.760-80"));

  it("should save item", async () => {
    await repository.save(order);
    const orders = await repository.findAll();
    expect(orders).toHaveLength(1);
  });
});
