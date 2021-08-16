import { Coupon } from "../../../domain/entity/Coupon";
import { CouponRepository } from "../../../domain/repository/CouponRepository";

export class CouponRepositoryMemory implements CouponRepository {
  private items: Coupon[];

  constructor(coupons: Coupon[]) {
    this.items = coupons;
  }

  public findOneByCode(code: string): Promise<Coupon | undefined> {
    const coupon = this.items.find((item) => item.code === code);
    return Promise.resolve(coupon);
  }
}
