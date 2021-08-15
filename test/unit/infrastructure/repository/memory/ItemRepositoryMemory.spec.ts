import { Dimension } from "../../../../../src/domain/entity/Dimension";
import { Item } from "../../../../../src/domain/entity/Item";
import { ItemRepositoryMemory } from "../../../../../src/infrastructure/repository/memory/ItemRepositoryMemory";

describe("ItemRepositoryMemory", () => {
  const item = new Item("123", "Fake Item", 20, new Dimension(20, 20, 20, 20));
  const repository = new ItemRepositoryMemory([item]);

  it("should find one by id", () => {
    expect(repository.findOneById("123")).toBe(item);
  });
});
