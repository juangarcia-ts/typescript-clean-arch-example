import { Coupon } from "../../../domain/entity/Coupon";
import { CouponRepository } from "../../../domain/repository/CouponRepository";

export class CouponRepositoryMemory implements CouponRepository {
  private coupons: Coupon[];

  constructor(coupons: Coupon[] = []) {
    this.coupons = coupons;
  }

  public findOneByCode(code: string): Promise<Coupon | undefined> {
    const coupon = this.coupons.find((item) => item.code === code);
    return Promise.resolve(coupon);
  }
}
