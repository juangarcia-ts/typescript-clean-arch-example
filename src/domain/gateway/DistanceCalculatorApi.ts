export interface DistanceCalculatorApi {
  calculate(originZipCode: string, destinationZipCode: string): number;
}
