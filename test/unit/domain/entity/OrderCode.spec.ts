import { OrderCode } from "../../../../src/domain/entity/OrderCode";

describe("OrderCode", () => {
  it("should generate code", () => {
    const code = new OrderCode(new Date("2020-01-01"), 1);
    expect(code.value).toEqual("202000000001");
  });
});
