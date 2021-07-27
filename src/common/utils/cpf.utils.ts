const FIRST_DIGIT_FACTOR = 10;
const LAST_DIGIT_FACTOR = 11;
const FIRST_DIGIT_MAX = 9;
const LAST_DIGIT_MAX = 10;

function normalize(rawCpf = ""): string {
  return rawCpf.replace(/\D/g, "");
}

function isLengthValid(cpf: string): boolean {
  return cpf.length === 11;
}

function toDigitArray(cpf: string): number[] {
  const digits = cpf.split("");
  return digits.map((digit) => parseInt(digit));
}

function areAllDigitsEqual(cpf: string): boolean {
  const digits = toDigitArray(cpf);
  const [firstDigit] = digits;
  return digits.every((digit) => digit === firstDigit);
}
function evaluateVerifierDigit(
  cpf: string,
  factor: number,
  max: number
): number {
  const digitsToMultiply = toDigitArray(cpf).slice(0, max);
  let total = 0;

  for (const digit of digitsToMultiply) {
    total += digit * factor--;
  }

  return total % 11 < 2 ? 0 : 11 - (total % 11);
}

function getVerifierDigits(cpf: string): string {
  return cpf.slice(9);
}

function validate(rawCpf: string): boolean {
  const cpf = normalize(rawCpf);

  if (!isLengthValid(cpf)) {
    return false;
  }

  if (areAllDigitsEqual(cpf)) {
    return false;
  }

  const firstVerifierDigit = evaluateVerifierDigit(
    cpf,
    FIRST_DIGIT_FACTOR,
    FIRST_DIGIT_MAX
  );

  const lastVerifierDigit = evaluateVerifierDigit(
    cpf,
    LAST_DIGIT_FACTOR,
    LAST_DIGIT_MAX
  );

  const originalVerifierDigits = getVerifierDigits(cpf);
  const calculatedVerifierDigits = `${firstVerifierDigit}${lastVerifierDigit}`;

  return originalVerifierDigits === calculatedVerifierDigits;
}

export const CpfUtils = {
  validate,
};
