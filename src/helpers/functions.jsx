export function calculateDailyChange(currentPrice, previousPrice) {
  return ((currentPrice - previousPrice) / previousPrice) * 1000;
}

export function getPreviousDay(currentDate) {
  currentDate.setHours(currentDate.getHours() - 24);

  return currentDate;
}

export function formatDate(date) {
  return date.toISOString().split("T")[0];
}

const currencyToCountryCode = {
  AED: "AE", // United Arab Emirates
  AFN: "AF", // Afghanistan
  AMD: "AM", // Armenia
  ARS: "AR", // Argentina
  AUD: "AU", // Australia
  AZN: "AZ", // Azerbaijan
  BDT: "BD", // Bangladesh
  BGN: "BG", // Bulgaria
  BHD: "BH", // Bahrain
  BND: "BN", // Brunei
  BRL: "BR", // Brazil
  BYN: "BY", // Belarus
  CAD: "CA", // Canada
  CHF: "CH", // Switzerland
  CNY: "CN", // China
  CUP: "CU", // Cuba
  CZK: "CZ", // Czech Republic
  DKK: "DK", // Denmark
  DZD: "DZ", // Algeria
  EGP: "EG", // Egypt
  EUR: "EU", // Eurozone (no single country; placeholder)
  GBP: "GB", // United Kingdom
  GEL: "GE", // Georgia
  HKD: "HK", // Hong Kong
  HUF: "HU", // Hungary
  IDR: "ID", // Indonesia
  ILS: "IL", // Israel
  INR: "IN", // India
  IQD: "IQ", // Iraq
  IRR: "IR", // Iran
  ISK: "IS", // Iceland
  JOD: "JO", // Jordan
  JPY: "JP", // Japan
  KGS: "KG", // Kyrgyzstan
  KHR: "KH", // Cambodia
  KRW: "KR", // South Korea
  KWD: "KW", // Kuwait
  KZT: "KZ", // Kazakhstan
  LAK: "LA", // Laos
  LBP: "LB", // Lebanon
  LYD: "LY", // Libya
  MAD: "MA", // Morocco
  MDL: "MD", // Moldova
  MMK: "MM", // Myanmar
  MNT: "MN", // Mongolia
  MXN: "MX", // Mexico
  MYR: "MY", // Malaysia
  NOK: "NO", // Norway
  NZD: "NZ", // New Zealand
  OMR: "OM", // Oman
  PHP: "PH", // Philippines
  PKR: "PK", // Pakistan
  PLN: "PL", // Poland
  QAR: "QA", // Qatar
  RON: "RO", // Romania
  RSD: "RS", // Serbia
  RUB: "RU", // Russia
  SAR: "SA", // Saudi Arabia
  SDG: "SD", // Sudan
  SEK: "SE", // Sweden
  SGD: "SG", // Singapore
  SYP: "SY", // Syria
  THB: "TH", // Thailand
  TJS: "TJ", // Tajikistan
  TMT: "TM", // Turkmenistan
  TND: "TN", // Tunisia
  TRL: "TR", // Turkey (old lira, deprecated)
  TRY: "TR", // Turkey
  UAH: "UA", // Ukraine
  USD: "US", // United States
  UYU: "UY", // Uruguay
  UZS: "UZ", // Uzbekistan
  VES: "VE", // Venezuela
  VND: "VN", // Vietnam
  XDR: "XDR", // IMF Special Drawing Rights (no single country; placeholder)
  YER: "YE", // Yemen
  ZAR: "ZA", // South Africa
};

export function getCurrencyDropdownData(currencyCodes) {
  const result = [];

  for (const currencyObject of currencyCodes) {
    const { iso_code, name } = currencyObject;
    const countryImage = `assets/images/flags/${currencyToCountryCode[iso_code].toLowerCase()}.webp`;


    result.push({
      label: name, value: iso_code, countryImage: countryImage
    })
  }

  return result
}

export function getDefaultOption(options, target) {
  for (const option of options) {
    if (option.value === target) return option;
  }
}

export function getTodayRaw() {
  return new Date(Date.now())
}

export function getPrevDay() {
  const date = getTodayRaw()
  date.setDate(date.getDate() - 1);

  return formatDate(date)
}

export function getPrevWeek() {
  const today = getTodayRaw()
  const res = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  return formatDate(res)
}

export function getPrevMonth() {
  const today = getTodayRaw()
  today.setMonth(today.getMonth() - 1); 

  return formatDate(today)
}

export function getPrevThreeMonths() {
  const today = getTodayRaw()
  today.setMonth(today.getMonth() - 3); 

  return formatDate(today)
}

export function getPrevYear() {
  const today = getTodayRaw()
  today.setMonth(today.getMonth() - 12); 

  return formatDate(today)
}

export function getPrevFiveYears() {
  const today = getTodayRaw()
  today.setMonth(today.getMonth() - 60); 

  return formatDate(today)
}

export function getRangeDate(range) {
  switch (range) {
    case "1D":
      return getPrevDay();
    case "1W":
      return getPrevWeek();
    case '1M': 
      return getPrevMonth();
    case "3M":
      return getPrevThreeMonths();
    case "1Y":
      return getPrevYear();
    case "5Y":
      return getPrevFiveYears()
  }
}

export function handleFavorite() {
    setIsFavorite(!isFavorite)
    
    const pair = `${base}-${value}`
    const copy = [...JSON.parse(localStorage.getItem("favorites"))]
    
    if (copy.includes(pair)) {
      copy.splice(copy.indexOf(pair), 3)
    } else {
      copy.push(pair, change, bitRate)
    }

    
    localStorage.setItem("favorites", JSON.stringify(copy))
}

export function deepCheck(base, target) {
  for (const key in base) {
    // console.log(key)
    

    if (base[key] !== target[key]) {
      return false;
    }
  }

  return true;
}

export function structureArray(array) {
  const result = [];
  let buffer = [];
  for (let i = 0; i < array.length; i++) {
    buffer.push(array[i]);

    if (buffer.length === 3 || i === array.length - 1) {
      result.push(buffer);
      buffer = [];
    }
  }
  return result;
}
