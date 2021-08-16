export class Cpf {
  public value: string;

  public static FIRST_DIGIT_FACTOR = 10;
  public static LAST_DIGIT_FACTOR = 11;
  public static FIRST_DIGIT_MAX = 9;
  public static LAST_DIGIT_MAX = 10;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error("Invalid CPF");
    }

    this.value = value;
  }

  private validate(rawCpf: string): boolean {
    const cpf = this.normalize(rawCpf);

    if (!this.isLengthValid(cpf)) {
      return false;
    }

    if (this.areAllDigitsEqual(cpf)) {
      return false;
    }

    const firstVerifierDigit = this.evaluateVerifierDigit(
      cpf,
      Cpf.FIRST_DIGIT_FACTOR,
      Cpf.FIRST_DIGIT_MAX
    );

    const lastVerifierDigit = this.evaluateVerifierDigit(
      cpf,
      Cpf.LAST_DIGIT_FACTOR,
      Cpf.LAST_DIGIT_MAX
    );

    const originalVerifierDigits = this.getVerifierDigits(cpf);
    const calculatedVerifierDigits = `${firstVerifierDigit}${lastVerifierDigit}`;

    return originalVerifierDigits === calculatedVerifierDigits;
  }

  private normalize(rawCpf = ""): string {
    return rawCpf.replace(/\D/g, "");
  }

  private isLengthValid(cpf: string): boolean {
    return cpf.length === 11;
  }

  private toDigitArray(cpf: string): number[] {
    const digits = cpf.split("");
    return digits.map((digit) => parseInt(digit));
  }

  private areAllDigitsEqual(cpf: string): boolean {
    const digits = this.toDigitArray(cpf);
    const [firstDigit] = digits;
    return digits.every((digit) => digit === firstDigit);
  }

  private evaluateVerifierDigit(
    cpf: string,
    factor: number,
    max: number
  ): number {
    const digitsToMultiply = this.toDigitArray(cpf).slice(0, max);
    let total = 0;

    for (const digit of digitsToMultiply) {
      total += digit * factor--;
    }

    return total % 11 < 2 ? 0 : 11 - (total % 11);
  }

  private getVerifierDigits(cpf: string): string {
    return cpf.slice(9);
  }
}
