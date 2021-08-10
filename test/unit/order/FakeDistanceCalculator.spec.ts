import { FakeDistanceCalculator } from "../../../src/order/FakeDistanceCalculator";

describe("FakeDistanceCalculator", () => {
  const calculator = new FakeDistanceCalculator();

  it("should calculate distance between two zip codes", () => {
    const originZipCode = "22222-222";
    const destinationZipCode = "33333-333";
    expect(calculator.calculate(originZipCode, destinationZipCode)).toBe(1000);
  });
});
