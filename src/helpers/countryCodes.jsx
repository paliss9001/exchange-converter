const allCurrencyCountryCodes = {
  ARS: { code: "AR", name: "Argentine Peso" },
  AUD: { code: "AU", name: "Australian Dollar" },
  BGN: { code: "BG", name: "Bulgarian Lev" },
  BRL: { code: "BR", name: "Brazilian Real" },
  CAD: { code: "CA", name: "Canadian Dollar" },
  CHF: { code: "CH", name: "Swiss Franc" },
  CNY: { code: "CN", name: "Chinese Yuan" },
  CYP: { code: "CY", name: "Cypriot Pound" },
  CZK: { code: "CZ", name: "Czech Koruna" },
  DKK: { code: "DK", name: "Danish Krone" },
  DZD: { code: "DZ", name: "Algerian Dinar" },
  EEK: { code: "EE", name: "Estonian Kroon" },
  EUR: { code: "EU", name: "Euro" },
  GBP: { code: "GB", name: "British Pound" },
  GRD: { code: "GR", name: "Greek Drachma" },
  HKD: { code: "HK", name: "Hong Kong Dollar" },
  HRK: { code: "HR", name: "Croatian Kuna" },
  HUF: { code: "HU", name: "Hungarian Forint" },
  IDR: { code: "ID", name: "Indonesian Rupiah" },
  ILS: { code: "IL", name: "Israeli New Shekel" },
  INR: { code: "IN", name: "Indian Rupee" },
  ISK: { code: "IS", name: "Icelandic Króna" },
  JPY: { code: "JP", name: "Japanese Yen" },
  KRW: { code: "KR", name: "South Korean Won" },
  LTL: { code: "LT", name: "Lithuanian Litas" },
  LVL: { code: "LV", name: "Latvian Lats" },
  MAD: { code: "MA", name: "Moroccan Dirham" },
  MTL: { code: "MT", name: "Maltese Lira" },
  MXN: { code: "MX", name: "Mexican Peso" },
  MYR: { code: "MY", name: "Malaysian Ringgit" },
  NOK: { code: "NO", name: "Norwegian Krone" },
  NZD: { code: "NZ", name: "New Zealand Dollar" },
  PHP: { code: "PH", name: "Philippine Peso" },
  PLN: { code: "PL", name: "Polish Złoty" },
  ROL: { code: "RO", name: "Romanian Leu" },
  RON: { code: "RO", name: "Romanian Leu" },
  RUB: { code: "RU", name: "Russian Ruble" },
  SEK: { code: "SE", name: "Swedish Krona" },
  SGD: { code: "SG", name: "Singapore Dollar" },
  SIT: { code: "SI", name: "Slovenian Tolar" },
  SKK: { code: "SK", name: "Slovak Koruna" },
  THB: { code: "TH", name: "Thai Baht" },
  TRY: { code: "TR", name: "Turkish Lira" },
  TWD: { code: "TW", name: "New Taiwan Dollar" },
  USD: { code: "US", name: "US Dollar" },
  ZAR: { code: "ZA", name: "South African Rand" },
};

export const targetCountryCodes = {}

const response = await fetch(
  "https://api.frankfurter.dev/v2/currencies?providers=BCB",
);
const result = await response.json();

for (const obj of result) {
  const {iso_code} = obj

  if (iso_code in allCurrencyCountryCodes) {
    const {name, code} = allCurrencyCountryCodes[iso_code]
    targetCountryCodes[iso_code] = {code: code, name: name}

  }
}

