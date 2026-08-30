import { useEffect, useState } from "react"

export function useWindowWidth() {
  const [width, setWidth] = useState(document.documentElement.clientWidth);

  useEffect(() => {
    const handleResize = () => setWidth(document.documentElement.clientWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export function useTickerRates(targetDate, TICKER_PAIRS) {
  const [rates, setRates] = useState(null)
  const urls = TICKER_PAIRS.map(([base, quotes]) => {
    return (
      `https://api.frankfurter.dev/v2/rates?base=${base}&from=${targetDate}&quotes=${quotes}&providers=BCB`
    )
  })
  const promises = urls.map(url => fetch(url))

  useEffect(() => {
      Promise.all(promises)
      .then(responses => Promise.all(responses.map(result => result.json())))
      .then(data => setRates(data))
  }, [targetDate])

  return rates
}

export function useConversion({amount, base, quotes}) {
  const [exchangeAmount, setExchangeAmount] = useState(0)

  useEffect(() => {
    fetch(`https://api.frankfurter.dev/v1/latest?amount=1&base=${base}&symbols=${quotes}&providers=BCB`)
    .then(response => response.json())
    .then(data => setExchangeAmount(data['rates'][quotes] * amount))
  }, [base, quotes, amount])

  return exchangeAmount
}

export function useCurrencies() {
  const [currencies, setCurrencies] = useState(null)

  useEffect(() => {
    fetch("https://api.frankfurter.dev/v2/currencies?providers=BCB")
    .then(response => response.json())
    .then(result => setCurrencies(result))
  })

  return currencies
}