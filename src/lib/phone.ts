const ARABIC_INDIC = "٠١٢٣٤٥٦٧٨٩";
const EXTENDED_ARABIC = "۰۱۲۳۴۵۶۷۸۹";

export function normalizeDigits(value: string): string {
  return value
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_INDIC.indexOf(digit)))
    .replace(/[۰-۹]/g, (digit) => String(EXTENDED_ARABIC.indexOf(digit)));
}

export function digitsOnly(value: string): string {
  return normalizeDigits(value).replace(/\D/g, "");
}

export function isPhoneNumber(value: string): boolean {
  const digits = digitsOnly(value);
  return digits.length >= 10 && digits.length <= 15;
}
