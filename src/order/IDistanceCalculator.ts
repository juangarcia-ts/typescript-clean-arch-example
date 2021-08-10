export interface IDistanceCalculator {
  calculate(originZipCode: string, destinationZipCode: string): number;
}
