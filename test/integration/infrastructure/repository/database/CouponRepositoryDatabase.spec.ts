import { Coupon } from "../../../../../src/domain/entity/Coupon";
import { PostgresDatabase } from "../../../../../src/infrastructure/database/PostgresDatabase";
import { CouponRepositoryDatabase } from "../../../../../src/infrastructure/repository/database/CouponRepositoryDatabase";

describe("CouponRepositoryDatabase", () => {
  const database = PostgresDatabase.getInstance();
  const repository = new CouponRepositoryDatabase(database);

  beforeAll(async () => {
    await database.executeQuery(
      'INSERT INTO public.coupon ("code", "percentage") VALUES ($1, $2)',
      ["COUPON", 50]
    );
  });

  afterAll(async () => {
    await database.executeQuery("DELETE FROM public.coupon");
  });

  it("should find one by code", async () => {
    const result = await repository.findOneByCode("COUPON");
    expect(result?.code).toBe("COUPON");
  });
});
