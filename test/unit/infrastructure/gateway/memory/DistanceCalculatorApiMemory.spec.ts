import { DistanceCalculatorApiMemory } from "../../../../../src/infrastructure/gateway/memory/DistanceCalculatorApiMemory";

describe("DistanceCalculatorApiMemory", () => {
  const calculator = new DistanceCalculatorApiMemory();

  it("should return always 1000", () => {
    const originZipCode = "22222-222";
    const destinationZipCode = "33333-333";
    expect(calculator.calculate(originZipCode, destinationZipCode)).toBe(1000);
  });
});
