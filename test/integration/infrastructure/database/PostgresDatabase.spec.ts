import { PostgresDatabase } from "../../../../src/infrastructure/database/PostgresDatabase";

describe("PostgresDatabase", () => {
  const database = new PostgresDatabase();

  beforeAll(async () => {
    return database.executeQuery(
      `INSERT INTO public.coupon ("code", "percentage") 
       VALUES ($1, $2), ($3, $4);`,
      ["VALE20", 20, "VALE30", 30]
    );
  });

  afterAll(async () => {
    return database.executeQuery("DELETE FROM public.coupon");
  });

  it("should connect to database and execute provided query", async () => {
    const items = await database.executeQuery("SELECT * FROM public.coupon");
    expect(items).toHaveLength(2);
  });
});
