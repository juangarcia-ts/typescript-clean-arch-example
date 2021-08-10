export class Coupon {
  public name: string;
  public percentage: number;
  public expiresAt?: Date;

  constructor(name: string, percentage: number, expiresAt?: Date) {
    this.name = name;
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
