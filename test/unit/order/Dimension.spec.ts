import { Dimension } from "../../../src/order/Dimension";

describe("Dimension", () => {
  describe("when unit is already in meters", () => {
    const dimensionInMeters = new Dimension(20, 30, 10, 10, "m");

    it("should not convert any value", () => {
      expect(dimensionInMeters.width).toBe(20);
      expect(dimensionInMeters.height).toBe(30);
      expect(dimensionInMeters.depth).toBe(10);
    });
  });

  describe("when unit is in centimeters", () => {
    const dimensionInCentimeters = new Dimension(20, 30, 10, 10, "cm");

    it("should divide values by 100", () => {
      expect(dimensionInCentimeters.width).toBe(0.2);
      expect(dimensionInCentimeters.height).toBe(0.3);
      expect(dimensionInCentimeters.depth).toBe(0.1);
    });
  });

  describe("when unit is in millimeters", () => {
    const dimensionInMillimeters = new Dimension(20, 30, 10, 10, "mm");

    it("should divide values by 1000", () => {
      expect(dimensionInMillimeters.width).toBe(0.02);
      expect(dimensionInMillimeters.height).toBe(0.03);
      expect(dimensionInMillimeters.depth).toBe(0.01);
    });
  });

  it("should calculate volume", () => {
    const dimension = new Dimension(50, 50, 50, 10);
    expect(dimension.getVolume()).toBe(0.125);
  });
});
