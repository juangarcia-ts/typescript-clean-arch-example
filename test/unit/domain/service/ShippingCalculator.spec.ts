import { Dimension } from "../../../../src/domain/entity/Dimension";
import { ShippingCalculator } from "../../../../src/domain/service/ShippingCalculator";

describe("ShippingCalculator", () => {
  const dimension = new Dimension(50, 50, 50, 22);
  const distance = 1000;

  it("should calculate cost", () => {
    expect(ShippingCalculator.calculateCost(distance, dimension)).toBe(220);
  });

  describe("when calculated cost is less than 10", () => {
    const tinyDimension = new Dimension(1, 1, 1, 1);

    it("should return 10 as minimum", () => {
      expect(ShippingCalculator.calculateCost(distance, tinyDimension)).toBe(
        10
      );
    });
  });
});
