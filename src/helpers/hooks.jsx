import { useEffect, useState } from "react";
import { getPreviousDay, formatDate, getPrevMonth, getPrevDay, getPrevFiveYears, getPrevYear } from "./functions";

export function useCurrencies(provider) {
  const [currencies, setCurrencies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.frankfurter.dev/v2/currencies?providers=${provider}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("could not fetch currencies");
        }

        return response.json();
      })
      .then((result) => {
        setCurrencies(result);
        setIsLoading(false);
      })

      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return [currencies, isLoading, error];
}

export function useTicker(TICKER_PAIRS) {
  const [latestDates, setLatestData] = useState(null);
  const [isTickerLoading, setTickerIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const date = formatDate(getPreviousDay(new Date()));

  const URLs = TICKER_PAIRS.map(([base, quote]) => {
    return `https://api.frankfurter.dev/v2/rates?from=${date}&base=${base}&quotes=${quote}`;
  });

  const promises = URLs.map((url) => fetch(url));

  useEffect(() => {
    Promise.all(promises)
      .then((responses) => {
        if (responses.status >= 400) {
          throw new Error("could not fetch ticker data");
        }

        return Promise.all(responses.map((response) => response.json()));
      })
      .then((result) => {
        setLatestData(result);
        setTickerIsLoading(false);
      })
      .catch((err) => setError(err.message));
  }, []);

  return { latestDates, isTickerLoading };
}

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export function useExchange(base, quote) {
  const [bitRateAmount, setBitRateAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${quote}`)
      .then((response) => response.json())
      .then((result) => {
        (setBitRateAmount(result[0]["rate"]), setIsLoading(false));
      });
  }, [base, quote]);

  return [bitRateAmount, isLoading];
}

export function useScreenWidth() {
  const [width, setWidth] = useState(document.documentElement.clientWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(document.documentElement.clientWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return width;
}

export function useChartData(date, base, quote) {
  const [chartData, setChartData] = useState(null);
  const [isChartLoading, setIsChartLoading] = useState(true)

  useEffect(() => {
    setIsChartLoading(true)
      fetch(
    `https://api.frankfurter.dev/v2/rates?from=${date}&base=${base}&quotes=${quote}&providers=CBU`,
  )
    .then((response) => response.json())
    .then((result) => {
      setChartData({
        labels: result.map((data) => ""),
        datasets: [
          {
            label: "Users Gained ",
            data: result.map((data) => data.rate),
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return null;
              const gradient = ctx.createLinearGradient(
                0,
                chartArea.top,
                0,
                chartArea.bottom,
              );
              gradient.addColorStop(0, "#CEF739");
              gradient.addColorStop(1, 'rgba(23, 23, 25, 0)');
              return gradient;
            },
              fill: true,
              borderColor: '#CEF739',
              borderWidth: 2,
              pointRadius: 0,
              tension: 0.3,
          },
        ],
      });
      setIsChartLoading(false)
    });
  }, [date, base, quote])


  return [chartData, isChartLoading];
}
