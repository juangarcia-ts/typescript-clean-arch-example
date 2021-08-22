import { PostgresDatabase } from "../../../../src/infrastructure/database/PostgresDatabase";

describe("PostgresDatabase", () => {
  const database = PostgresDatabase.getInstance();

  beforeAll(async () => {
    await database.executeQuery(
      `INSERT INTO public.coupon ("code", "percentage") 
       VALUES ($1, $2), ($3, $4);`,
      ["VALE20", 20, "VALE30", 30]
    );
  });

  afterAll(async () => {
    await database.executeQuery("DELETE FROM public.coupon");
  });

  it("should connect to database only once", () => {
    const instance1 = PostgresDatabase.getInstance();
    const instance2 = PostgresDatabase.getInstance();
    expect(instance1).toStrictEqual(instance2);
  });

  it("should connect to database and execute provided query", async () => {
    const items = await database.executeQuery("SELECT * FROM public.coupon");
    expect(items).toHaveLength(2);
  });
});
