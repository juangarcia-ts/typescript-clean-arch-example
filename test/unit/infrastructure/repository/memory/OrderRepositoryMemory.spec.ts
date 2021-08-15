import { Cpf } from "../../../../../src/domain/entity/Cpf";
import { Order } from "../../../../../src/domain/entity/Order";
import { OrderRepositoryMemory } from "../../../../../src/infrastructure/repository/memory/OrderRepositoryMemory";

describe("OrderRepositoryMemory", () => {
  const repository = new OrderRepositoryMemory([]);

  it("should save item", () => {
    const order = new Order(new Cpf("766.582.760-80"));
    expect(repository.save(order)).toBe(order);
  });
});
