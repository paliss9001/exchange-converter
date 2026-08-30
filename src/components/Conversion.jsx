import { useState } from "react";
import Dropdown from "./CurrencyDropdown";
import exchangeIcon from "/assets/images/icon-exchange.svg";
import { handleFavorite } from "../helpers/functions";

export default function Conversion({
  amount,
  setAmount,
  currencyOptions,
  base,
  setBase,
  quotes,
  setQuotes,
  exchangeAmount,
  exchangeFactor,
  setFavorited,
  favorited,
  relativeRates,
}) {
  const [active, setActive] = useState(false);

  function handleExchange() {
    setBase(quotes);
    setQuotes(base);
  }

  return (
    <section className="conversion content-container">
      <h1 className="conversion__title">CHECK THE RATE</h1>
      <div className="conversion__body">
        <div className="conversion__main">
          <ConversionCard
            action="send"
            dropdown={
              <Dropdown
                options={currencyOptions}
                activeFrequency={base}
                base={base}
                setBase={setBase}
                quotes={quotes}
              />
            }
            amount={amount}
            setAmount={setAmount}
          />
          <button
            className="conversion__exchange-button"
            onClick={handleExchange}
          >
            <img src={exchangeIcon}></img>
          </button>
          <ConversionCard
            action="receive"
            dropdown={
              <Dropdown
                options={currencyOptions}
                activeFrequency={quotes}
                base={base}
                quotes={quotes}
                setQuotes={setQuotes}
              />
            }
            modifier="highlight"
            exchangeAmount={exchangeAmount}
          />
        </div>
        <div className="conversion__extra">
          <span className="conversion__exchange-data">
            1 {base} = {exchangeFactor.toFixed(6)} {quotes}
          </span>
          <div className="conversion__actions">
            <button
              className={getTargetClass(
                base,
                quotes,
                amount,
                "button conversion__button",
              )}
              onClick={() =>
                handleFavorite(
                  relativeRates,
                  base,
                  quotes,
                  amount,
                  exchangeAmount,
                  setFavorited,
                  favorited,
                )
              }
            >
              FAVORITE
            </button>
            <button className="button">LOG CONVERSION</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function getTargetClass(base, quotes, baseAmount, defClass) {
  const result = JSON.parse(localStorage.getItem("favorites"));

  for (const obj of result) {
    const { currencies, amount } = obj;

    if (`${base}-${quotes}` === currencies && +amount === +baseAmount) {
      return defClass + " active";
    }
  }

  return defClass;
}

function ConversionCard({
  action,
  value,
  amount,
  setAmount,
  dropdown,
  modifier,
  exchangeAmount,
}) {
  const targetClass = modifier
    ? "conversion__input accent"
    : "conversion__input";

  function handleValue(e) {
    if (e.target.value.toString().length === 0) return;

    setAmount(e.target.value);
  }

  return (
    <div className="conversion__card">
      <div className="conversion__data">
        <span className="conversion__action">{action}</span>
        {action === "receive" ? (
          <span className={targetClass}>{exchangeAmount}</span>
        ) : (
          <input
            className={targetClass}
            value={amount}
            onChange={handleValue}
            type="number"
          />
        )}
      </div>
      <div className="conversion__exchange-dropdown">{dropdown}</div>
    </div>
  );
}
