import { Coupon } from "../../../domain/entity/Coupon";
import { CouponRepository } from "../../../domain/repository/CouponRepository";
import { Database } from "../../database/Database";

export class CouponRepositoryDatabase implements CouponRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public async findOneByCode(code: string): Promise<Coupon | undefined> {
    const [row] = await this.db.executeQuery(
      "SELECT * FROM public.coupon WHERE code = $1",
      [code]
    );

    if (!row) {
      return;
    }

    return new Coupon(row.code, row.percentage, row.expires_at);
  }
}
