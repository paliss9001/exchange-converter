import { useState, useContext } from "react";
import Conversion from "./components/Conversion";
import Error from "./components/Error";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Tabs from "./components/Tabs";
import Ticker from "./components/Ticker";
import { useCurrencies, useScreenWidth, useTicker } from "./helpers/hooks";
import { CurrencyDataContext, SetCurrencyDataContext } from "./helpers/contexts";
import { getPrevDay } from "./helpers/functions";
import InfoPicker from "./components/InfoPicker";
import History from "./components/History";
import Compare from "./components/Compare";

const tabs = [
  {
    label: "HISTORY",
    content: <History />,
  },
  {
    label: "COMPARE",
    content: <Compare />
  },
  {
    label: "FAVORITES",
    content: "A feed, a log, or a timeline could live in this panel.",
  },
  {
    label: "LOG",
    content: "A feed,dsafadfggdggd",
  },
];
const PROVIDER = "BCB";
const TICKER_PAIRS = [
  ["USD", "JPY"],
  ["GBP", "USD"],
  ["USD", "CHF"],
  ["EUR", "GBP"],
  ["AUD", "USD"],
  ["USD", "CHF"],
  ["CHF", "EUR"],
  ["GBP", "CAD"],
];

if (!localStorage.getItem("favorites")) {
  localStorage.setItem("favorites", JSON.stringify([]));
}

if (!localStorage.getItem("logs")) {
  localStorage.setItem("logs", JSON.stringify([]));
}

export default function App() {
  const [active, setActive] = useState(0)
  const [currencies, isLoading, error] = useCurrencies(PROVIDER);
  const { latestDates, isTickerLoading } = useTicker(TICKER_PAIRS);
  const [base, setBase] = useState("USD");
  const [quote, setQuote] = useState("EUR");
  const screenWidth = useScreenWidth()
  const [baseAmount, setBaseAmount] = useState(0);
  

  if (error !== null) return <Error error={error} />;

  if (isLoading) return <Loading />;

  return (
    <>
      <Header PROVIDER={PROVIDER} currencies={currencies} />
      {!isTickerLoading && (
        <Ticker TICKER_PAIRS={TICKER_PAIRS} latestDates={latestDates}></Ticker>
      )}
      <main className="container">
        <h1 className="title">CHECK THE RATE</h1>
        <Conversion
          base={base}
          quote={quote}
          currencies={currencies}
          day={1}
          month={31}
          setBase={setBase}
          setQuote={setQuote}
          baseAmount={baseAmount}
          setBaseAmount={setBaseAmount}
        />
        <CurrencyDataContext value={{base, quote, currencies, baseAmount}}>
        <SetCurrencyDataContext value={{setBase, setQuote}}>
          {screenWidth > 767 ?
            <Tabs active={active} setActive={setActive} tabs={tabs} /> :
            <InfoPicker active={active} setActive={setActive} options={tabs} />
          }
        </SetCurrencyDataContext>
        </CurrencyDataContext>
      </main>
    </>
  );
}
