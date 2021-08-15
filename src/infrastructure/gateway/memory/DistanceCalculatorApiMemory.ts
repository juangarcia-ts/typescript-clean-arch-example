import { DistanceCalculatorApi } from "../../../domain/gateway/DistanceCalculatorApi";

export class DistanceCalculatorApiMemory implements DistanceCalculatorApi {
  public calculate(originZipCode: string, destinationZipCode: string): number {
    return 1000;
  }
}
