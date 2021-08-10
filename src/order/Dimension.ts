export type Unit = "m" | "cm" | "mm";

export class Dimension {
  public width: number;
  public height: number;
  public depth: number;
  public weight: number;
  public unit: Unit;

  constructor(
    width: number,
    height: number,
    depth: number,
    weight: number,
    unit: Unit = "cm"
  ) {
    this.width = this.convertToMeters(width, unit);
    this.height = this.convertToMeters(height, unit);
    this.depth = this.convertToMeters(depth, unit);
    this.weight = weight;
    this.unit = unit;
  }

  private convertToMeters = (value: number, unit: Unit) => {
    const base = {
      m: 1,
      cm: 100,
      mm: 1000,
    }[unit];

    return value / base;
  };

  public getVolume(): number {
    return this.width * this.height * this.depth;
  }

  public getDensity(): number {
    return this.weight / this.getVolume();
  }
}
