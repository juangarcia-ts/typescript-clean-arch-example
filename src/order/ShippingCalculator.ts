import { Dimension } from "./Dimension";

export class ShippingCalculator {
  static calculateCost(distance: number, dimension: Dimension): number {
    const price =
      distance * dimension.getVolume() * (dimension.getDensity() / 100);

    return price >= 10 ? price : 10;
  }
}
