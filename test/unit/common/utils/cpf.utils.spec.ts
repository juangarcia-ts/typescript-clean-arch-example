import { CpfUtils } from "../../../../src/common/utils/cpf.utils";

describe("CpfUtils", () => {
  describe("#validate", () => {
    describe("when cpf size is wrong", () => {
      const cpf = "10.33.53-77";

      it("should return false", () => {
        expect(CpfUtils.validate(cpf)).toBeFalsy;
      });
    });

    describe("when all digits are equal", () => {
      const cpf = "333.333.333-33";

      it("should return false", () => {
        expect(CpfUtils.validate(cpf)).toBeFalsy;
      });
    });

    describe("when cpf format is correct", () => {
      const invalidCpf = "667.258.607-80";
      const validCpf = "766.582.760-80";

      it("should validate cpf", () => {
        expect(CpfUtils.validate(invalidCpf)).toBeFalsy();
        expect(CpfUtils.validate(validCpf)).toBeTruthy();
      });
    });
  });
});
