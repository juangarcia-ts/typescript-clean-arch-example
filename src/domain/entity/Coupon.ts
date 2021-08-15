export class Coupon {
  public code: string;
  public percentage: number;
  public expiresAt?: Date;

  constructor(code: string, percentage: number, expiresAt?: Date) {
    this.code = code;
    this.percentage = percentage;
    this.expiresAt = expiresAt;
  }

  public isExpired(): boolean {
    if (!this.expiresAt) {
      return false;
    }

    const now = new Date();
    return now.getTime() > this.expiresAt.getTime();
  }
}
