import { useEffect, useState } from "react"
import { getPreviousDay, formatDate } from "./functions"

export function useCurrencies(provider) {
  const [currencies, setCurrencies] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null) 

  useEffect(() => {
    fetch(`https://api.frankfurter.dev/v2/currencies?providers=${provider}`)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("could not fetch currencies")
      }

      return response.json()
    })
    .then(result => {setCurrencies(result); setIsLoading(false)})

    .catch(err => {setError(err.message)})
  }, [])

  return [currencies, isLoading, error]
}

export function useTicker(TICKER_PAIRS) {
  const [latestDates, setLatestData] = useState(null)
  const [isTickerLoading, setTickerIsLoading] = useState(true)
  const [error, setError] = useState(null) 

  const date = formatDate(getPreviousDay(new Date()))

  const URLs = TICKER_PAIRS.map(([base, quote]) => {
    return `https://api.frankfurter.dev/v2/rates?from=${date}&base=${base}&quotes=${quote}`
  })

  const promises = URLs.map(url => fetch(url))

  useEffect(() => {
    Promise.all(promises)
    .then(responses => {
      if (responses.status >= 400) {
        throw new Error("could not fetch ticker data")
      }

      return Promise.all(responses.map(response => response.json()))
    })
    .then(result => {setLatestData(result); setTickerIsLoading(false)})
    .catch(err => setError(err.message))
  }, [])

  return {latestDates, isTickerLoading}
}

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
 
    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)
 
    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler]) 
}

export function useExchange(base, quote) {
  const [bitRateAmount, setBitRateAmount] = useState(0) 
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${quote}`)
    .then(response => response.json())
    .then(result => {setBitRateAmount(result[0]['rate']), setIsLoading(false);})
  }, [base, quote])

  return [bitRateAmount, isLoading];
}

export function useScreenWidth() {
  const [width, setWidth] = useState(document.documentElement.clientWidth)

  useEffect(() => {

    function handleResize() {
      setWidth(document.documentElement.clientWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  return width;
}