import { Coupon } from "../../../../src/domain/entity/Coupon";

describe("Coupon", () => {
  describe("when coupon has no expiration date", () => {
    it("should not be expired", () => {
      const coupon = new Coupon("VALE20", 20);
      expect(coupon.isExpired()).toBeFalsy();
    });
  });

  describe("when coupon has expiration date", () => {
    const expiredCoupon = new Coupon("VALE20", 20, new Date("2020-01-11"));
    const validCoupon = new Coupon("VALE20", 20, new Date("2050-01-11"));

    it("should verify if coupon is expired", () => {
      expect(expiredCoupon.isExpired()).toBeTruthy();
      expect(validCoupon.isExpired()).toBeFalsy();
    });
  });
});
