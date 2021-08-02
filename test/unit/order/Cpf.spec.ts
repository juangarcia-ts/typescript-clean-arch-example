import { Cpf } from "../../../src/order/Cpf";

describe("Cpf", () => {
  describe("when cpf size is wrong", () => {
    const cpf = "10.33.53-77";

    it("should throw exception", () => {
      expect(() => new Cpf(cpf)).toThrow("Invalid CPF");
    });
  });

  describe("when all digits are equal", () => {
    const cpf = "333.333.333-33";

    it("should throw exception", () => {
      expect(() => new Cpf(cpf)).toThrow("Invalid CPF");
    });
  });

  describe("when cpf format is correct", () => {
    describe("but cpf is invalid", () => {
      const invalidCpf = "667.258.607-80";

      it("should throw exception", () => {
        expect(() => new Cpf(invalidCpf)).toThrow("Invalid CPF");
      });

      describe("and cpf is valid", () => {
        const validCpf = "766.582.760-80";

        it("should not throw exception", () => {
          expect(() => new Cpf(validCpf)).not.toThrow("Invalid CPF");
        });
      });
    });
  });
});
