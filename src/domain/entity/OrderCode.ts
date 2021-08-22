export class OrderCode {
  value: string;

  constructor(createdAt: Date, sequence: number) {
    this.value = this.generateCode(createdAt, sequence);
  }

  private generateCode(createdAt: Date, sequence: number): string {
    const year = createdAt.getUTCFullYear();
    return `${year}${sequence.toString().padStart(8, "0")}`;
  }
}
