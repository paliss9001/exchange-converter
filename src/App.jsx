import { useState, useContext } from "react";
import Conversion from "./components/Conversion";
import Error from "./components/Error";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Tabs from "./components/Tabs";
import Ticker from "./components/Ticker";
import {
  useChartData,
  useCurrencies,
  useScreenWidth,
  useTicker,
} from "./helpers/hooks";
import {
  CurrencyDataContext,
  SetCurrencyDataContext,
} from "./helpers/contexts";
import {
  deepCheck,
  getPrevDay,
  getPrevMonth,
  getTodayRaw,
} from "./helpers/functions";
import InfoPicker from "./components/InfoPicker";
import History from "./components/History";
import Compare from "./components/Compare";
import Favorites from "./components/Favorites";
import Log from "./components/Log";


const tabs = [
  {
    label: "HISTORY",
    content: <History />,
  },
  {
    label: "COMPARE",
    content: <Compare />,
  },
  {
    label: "FAVORITES",
    content: <Favorites />,
  },
  {
    label: "LOG",
    content: <Log />,
  },
];
const PROVIDER = "CBU";
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
  const [active, setActive] = useState(0);
  const [currencies, isLoading, error] = useCurrencies(PROVIDER);
  const { latestDates, isTickerLoading } = useTicker(TICKER_PAIRS);
  const [base, setBase] = useState("USD");
  const [quote, setQuote] = useState("EUR");
  const screenWidth = useScreenWidth();
  const [baseAmount, setBaseAmount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const favoritesCollection = localStorage.getItem("favorites");
  const [logs, setLogs] = useState([
    ...JSON.parse(localStorage.getItem("logs")),
  ]);
  const [isLogged, setIsLogged] = useState(false);

  if (error !== null) return <Error error={error} />;

  if (isLoading) return <Loading />;

  const today = getTodayRaw();

  const m = today.toLocaleString("en-US", { month: "short" });
  const date = today.getDate();

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
          day={date}
          month={m}
          setBase={setBase}
          setQuote={setQuote}
          baseAmount={baseAmount}
          setBaseAmount={setBaseAmount}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          setLogs={setLogs}
          isLogged={isLogged}
          setIsLogged={setIsLogged}
        />
        <CurrencyDataContext
          value={{
            base,
            quote,
            currencies,
            baseAmount,
            isFavorite,
            setIsFavorite,
            favoritesCollection,
            logs,
            setLogs,
            setIsLogged,
          }}
        >
          <SetCurrencyDataContext value={{ setBase, setQuote }}>
            {screenWidth > 767 ? (
              <Tabs active={active} setActive={setActive} tabs={tabs} />
            ) : (
              <InfoPicker
                active={active}
                setActive={setActive}
                options={tabs}
              />
            )}
          </SetCurrencyDataContext>
        </CurrencyDataContext>
      </main>
    </>
  );
}
