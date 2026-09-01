import { useEffect, useState } from "react";
import CurrencyPicker from "./CurrencyPicker";
import exchangeIcon from "/assets/images/icon-exchange.svg";
import { getCurrencyDropdownData } from "../helpers/functions";
import { useExchange } from "../helpers/hooks";

export default function Conversion({
  currencies,
  base,
  quote,
  day,
  month,
  setBase,
  setQuote,
  baseAmount,
  setBaseAmount
}) {
  const [currencyData, setCurrencyData] = useState(
    getCurrencyDropdownData(currencies),
  );
  const [bitRateAmount, isLoading] = useExchange(base, quote);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const exchangeAmount = bitRateAmount * baseAmount;
  const currentPair = `${base}-${quote}`;

  function handleExchange(e) {
    setBase(quote);
    setQuote(base);
  }

  function handleFavorite() {
    const copy = [...JSON.parse(localStorage.getItem("favorites"))];

    if (!copy.includes(currentPair)) {
      copy.push(currentPair);

      localStorage.setItem("favorites", JSON.stringify(copy));
    }

    setIsFavorite(!isFavorite);
  }

  function handleLog() {
    if (isLogged) return;

    const copy = [...JSON.parse(localStorage.getItem("logs"))];

    const conversionData = {
      baseAmount,
      exchangeAmount,
      currentPair,
      day,
      month,
    };

    copy.push(conversionData);

    localStorage.setItem("logs", JSON.stringify(copy));
    setIsLogged(true);
  }

  useEffect(() => {
    setIsLogged(false);
  }, [baseAmount, exchangeAmount]);

  const doesPairExist = JSON.parse(localStorage.getItem("favorites")).includes(
    currentPair,
  );

  const targetLogClass = isLogged
    ? "button conversion__log active"
    : "button conversion__log";
  const targetFavoriteClass = doesPairExist
    ? "conversion__favorite button active"
    : "conversion__favorite button";

  return (
    <div className="conversion">
      <div className="conversion__main">
        <ConversionCard
          action="SEND"
          options={currencyData}
          setCurrencyData={setCurrencyData}
          base={base}
          setBase={setBase}
          quote={quote}
          activeCurr={base}
          baseAmount={baseAmount}
          setBaseAmount={setBaseAmount}
        />
        <button className="conversion__exchange" onClick={handleExchange}>
          <img src={exchangeIcon}></img>
        </button>
        <ConversionCard
          action="RECEIVE"
          options={currencyData}
          value={0}
          setCurrencyData={setCurrencyData}
          quote={quote}
          setQuote={setQuote}
          base={base}
          setBase={setBase}
          activeCurr={quote}
          exchangeAmount={exchangeAmount}
        />
      </div>
      <div className="conversion__extra">
        <span className="conversion__bitrate">
          1 {base} = {bitRateAmount} {quote}
        </span>
        <div className="conversion__actions">
          <button className={targetFavoriteClass} onClick={handleFavorite}>
            {doesPairExist ? "✓ FAVORITED" : "FAVORITE"}
          </button>
          <button className={targetLogClass} onClick={handleLog}>
            {isLogged ? "✓ LOGGED" : "LOG CONVERSION"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConversionCard({
  action,
  options,
  base,
  setBase,
  quote,
  setQuote,
  activeCurr,
  baseAmount,
  setBaseAmount,
  exchangeAmount,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  function hanldeChange(e) {
    setBaseAmount(e.target.value);
  }

  const copy = [...options];

  const filteredArray = copy.filter((option) => {
    if (option.value.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
      return true;
    }

    return false;
  });

  const actionElement =
    action === "SEND" ? (
      <input
        type="number"
        onInput={hanldeChange}
        className="conversion__value input"
        placeholder="0"
        value={baseAmount > 0 ? baseAmount : ""}
      ></input>
    ) : (
      <span className="conversion__value accent">
        {exchangeAmount.toFixed(3)}
      </span>
    );

  return (
    <div className="conversion__card">
      <div className="conversion__data">
        <span className="conversion__action">{action}</span>
        {actionElement}
      </div>
      <CurrencyPicker
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        options={filteredArray}
        base={base}
        setBase={setBase}
        quote={quote}
        setQuote={setQuote}
        activeCurr={activeCurr}
        orig={options}
      />
    </div>
  );
}
