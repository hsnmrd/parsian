const PERSIAN_ZERO_CODE_POINT = "۰".charCodeAt(0);
const ARABIC_ZERO_CODE_POINT = "٠".charCodeAt(0);

export function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - PERSIAN_ZERO_CODE_POINT))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - ARABIC_ZERO_CODE_POINT));
}
