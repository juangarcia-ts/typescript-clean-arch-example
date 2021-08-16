import { Coupon } from "../../../../../src/domain/entity/Coupon";
import { PostgresDatabase } from "../../../../../src/infrastructure/database/PostgresDatabase";
import { CouponRepositoryDatabase } from "../../../../../src/infrastructure/repository/database/CouponRepositoryDatabase";

describe("CouponRepositoryDatabase", () => {
  const database = new PostgresDatabase();
  const repository = new CouponRepositoryDatabase(database);

  const coupon = new Coupon("VALE20", 20);

  beforeAll(async () => {
    return database.executeQuery(
      'INSERT INTO public.coupon ("code", "percentage") VALUES ($1, $2)',
      [coupon.code, coupon.percentage]
    );
  });

  afterAll(async () => {
    return database.executeQuery("DELETE FROM public.coupon");
  });

  it("should find one by code", async () => {
    const result = await repository.findOneByCode("VALE20");
    expect(result?.code).toBe(coupon.code);
  });
});
