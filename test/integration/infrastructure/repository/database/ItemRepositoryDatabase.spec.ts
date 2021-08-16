import { Dimension } from "../../../../../src/domain/entity/Dimension";
import { Item } from "../../../../../src/domain/entity/Item";
import { PostgresDatabase } from "../../../../../src/infrastructure/database/PostgresDatabase";
import { ItemRepositoryDatabase } from "../../../../../src/infrastructure/repository/database/ItemRepositoryDatabase";

describe("ItemRepositoryDatabase", () => {
  const database = new PostgresDatabase();
  const repository = new ItemRepositoryDatabase(database);

  const item = new Item(
    "4daefff4-2576-4e58-a57e-0b184477815c",
    "Item #1",
    2500,
    new Dimension(20, 20, 20, 20)
  );

  beforeEach(async () => {
    return database.executeQuery(
      `INSERT INTO public.item ("id", "description", "price", "height", "width", "depth", "weight")
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        item.id,
        item.description,
        item.price,
        item.dimension.height,
        item.dimension.width,
        item.dimension.depth,
        item.dimension.weight,
      ]
    );
  });

  afterAll(async () => {
    return database.executeQuery("DELETE FROM item");
  });

  it("should find one by id", async () => {
    const result = await repository.findOneById(item.id);
    expect(result?.id).toBe(item.id);
  });
});
