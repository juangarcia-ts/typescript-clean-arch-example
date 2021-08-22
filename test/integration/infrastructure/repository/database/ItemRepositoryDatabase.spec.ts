import { PostgresDatabase } from "../../../../../src/infrastructure/database/PostgresDatabase";
import { ItemRepositoryDatabase } from "../../../../../src/infrastructure/repository/database/ItemRepositoryDatabase";

describe("ItemRepositoryDatabase", () => {
  const database = PostgresDatabase.getInstance();
  const repository = new ItemRepositoryDatabase(database);

  const itemId = "3ee14b1b-74cf-4fe4-bc5a-d4c3c598d4fb";

  it("should find one by id", async () => {
    const result = await repository.findOneById(itemId);
    expect(result?.id).toBe(itemId);
  });
});
