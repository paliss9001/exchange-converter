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
  AUD: "AU", // Australia
  BRL: "BR", // Brazil
  CAD: "CA", // Canada
  CHF: "CH", // Switzerland
  DKK: "DK", // Denmark
  EUR: "EU", // Eurozone (no single country; placeholder)
  GBP: "GB", // United Kingdom
  JPY: "JP", // Japan
  NOK: "NO", // Norway
  SEK: "SE", // Sweden
  USD: "US", // United States
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