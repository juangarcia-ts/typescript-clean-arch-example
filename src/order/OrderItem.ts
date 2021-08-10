export class OrderItem {
  public itemId: string;
  public price: number;
  public amount: number;

  constructor(itemId: string, price: number, amount: number) {
    this.itemId = itemId;
    this.price = price;
    this.amount = amount;
  }

  public getTotal(): number {
    return this.price * this.amount;
  }
}
