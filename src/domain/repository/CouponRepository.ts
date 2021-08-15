import { Coupon } from "../entity/Coupon";

export interface CouponRepository {
  findOneByCode: (code: string) => Coupon | undefined;
}
