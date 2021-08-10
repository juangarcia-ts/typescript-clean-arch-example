import { IDistanceCalculator } from "./IDistanceCalculator";

export class FakeDistanceCalculator implements IDistanceCalculator {
  public calculate(originZipCode: string, destinationZipCode: string): number {
    return 1000;
  }
}
