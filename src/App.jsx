import { useEffect, useState, useContext } from "react";
import Header from "./components/Header";
import Ticker from "./components/Ticker";
import Conversion from "./components/Conversion";
import { targetCountryCodes } from "./helpers/countryCodes";
import Analytics from "./components/Analytics";
import History from "./components/History";
import { getStartStr } from "./helpers/functions";
import Compare from "./components/Compare";
import Favorites from "./components/Favorites";

export default function App() {
  const [currencies, setCurrencies] = useState(null);
  const [rates, setRates] = useState(null);
  const [amount, setAmount] = useState(1);
  const [exchangeAmount, setExchangeAmount] = useState(0);
  const [base, setBase] = useState("USD");
  const [quotes, setQuotes] = useState("EUR");
  const [exchangeFactor, setExchangeFactor] = useState(0);
  const [tab, setTab] = useState("history");
  const [range, setRange] = useState("one month");
  const [relativeRates, setRelativeRates] = useState(null);
  const [currencyInput, setCurrencyInput] = useState("");
  const [ratesList, setRatesList] = useState(null);
  const [favorited, setFavorited] = useState(false);

  const favorites = JSON.parse(localStorage.getItem("favorites"));
  if (!favorites) {
    localStorage.setItem("favorites", JSON.stringify([]));
  }

  const favoritesCount = JSON.parse(localStorage.getItem("favorites")).length;

  const [screenWidth, setScreenWidth] = useState(
    document.documentElement.clientWidth,
  );

  const date = new Date();
  const startStr = getStartStr(range, date);
  const currencyOptions = [];
  const targetDate = getStartStr(range, new Date());

  useEffect(() => {
    function handleSize() {
      setScreenWidth(document.documentElement.clientWidth);
    }

    window.addEventListener("resize", handleSize);

    return () => window.removeEventListener('resize', handleSize)
  });

  for (const currency in targetCountryCodes) {
    const { code, name } = targetCountryCodes[currency];

    currencyOptions.push({
      label: currency,
      currencyName: name,
      state: `assets/images/flags/${code.toLowerCase()}.webp`,
    });
  }
  useEffect(() => {
    async function fetchCurrencies() {
      const buffer = [];
      for (const currencyTypes of [
        ["EUR", "GBP"],
        ["CHF", "AUD"],
        ["USD", "CHF"],
        ["USD", "CAD"],
        ["GBP", "USD"],
        ["USD", "JPY"],
        ["JPY", "EUR"],
        ["EUR", "CAD"],
      ]) {
        const [base, quotes] = currencyTypes;

        const response = await fetch(
          // `https://api.frankfurter.dev/v2/rates?base=${base}&from=${targetDate}&quotes=${quotes}&providers=BCB`,
          `https://api.frankfurter.dev/v2/rates?from=${targetDate}&base=${base}&quotes=${quotes}`
        );
        buffer.push(await response.json());
      }
      setRates(buffer);

      const currenciesResponse = await fetch(
        "https://api.frankfurter.dev/v2/currencies?providers=BCB",
      );
      const converterResponse = await fetch(
        `https://api.frankfurter.dev/v2/rates?&base=${base}&quotes=${quotes}&providers=BCB`,
      );
      const unitRateResponse = await fetch(
        `https://api.frankfurter.dev/v1/latest?amount=1&base=${base}&symbols=${quotes}&providers=BCB`,
      );

      const rangeResponse = await fetch(
        `https://api.frankfurter.dev/v1/${startStr}..?from=${base}&to=${quotes}&providers=BCB`,
      );

      const resultRange = await rangeResponse.json();
      const availableCurrencies = await currenciesResponse.json();
      const convertedAmountData = await converterResponse.json();
      const unitRateData = await unitRateResponse.json();
      console.log(resultRange)

      setExchangeAmount(convertedAmountData[0].rate * amount);
      setExchangeFactor(unitRateData.rates[quotes]);
      setCurrencies(availableCurrencies);
      const [start, end] = [
        Object.values(resultRange.rates)[0],
        Object.values(resultRange.rates)[1],
      ];

      setRelativeRates([start[quotes], end[quotes]]);
    }

    fetchCurrencies();
  }, [amount, base, quotes, range, favorited]);

  if (!currencies) return;

  const historyData = {
    tab,
    relativeRates,
    range,
    setRange,
    currencyInput,
    setCurrencyInput,
  };

  const compareData = {
    amount,
    base,
    currencyOptions,
    exchangeAmount,
    tab,
    ratesList,
    setRatesList,
    quotes,
    favorited,
    setFavorited,
    relativeRates,
    range,
  };

  const favoritesData = {
    favoritesCount: favoritesCount
  };

  return (
    <>
      <Header currenciesLength={currencies.length} />
      <main>
        <Ticker rates={rates} />
        <Conversion
          amount={amount}
          setAmount={setAmount}
          currencyOptions={currencyOptions}
          base={base}
          setBase={setBase}
          quotes={quotes}
          setQuotes={setQuotes}
          exchangeAmount={exchangeAmount}
          exchangeFactor={exchangeFactor}
          setRatesList={setRatesList}
          setFavorited={setFavorited}
          favorited={favorited}
          relativeRates={relativeRates}
        />
        <Analytics
          favoritesCount={favoritesCount}
          tab={tab}
          setTab={setTab}
          screenWidth={screenWidth}
        />
        <Content {...historyData} {...compareData} {...favoritesData} />
      </main>
    </>
  );
}

function Content({ tab, ...props }) {
  return (
    <div className="tab-container content-container">
      {tab === "history" ? (
        <History {...props} />
      ) : tab === "compare" ? (
        <Compare {...props} />
      ) : tab === "favorites" ? (
        <Favorites {...props} />
      ) : (
        ""
      )}
    </div>
  );
}
