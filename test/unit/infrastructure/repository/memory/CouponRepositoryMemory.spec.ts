import { Coupon } from "../../../../../src/domain/entity/Coupon";
import { CouponRepositoryMemory } from "../../../../../src/infrastructure/repository/memory/CouponRepositoryMemory";

describe("CouponRepositoryMemory", () => {
  const coupon = new Coupon("VALE20", 20);
  const repository = new CouponRepositoryMemory([coupon]);

  it("should find one by code", async () => {
    expect(await repository.findOneByCode("VALE20")).toBe(coupon);
  });
});
