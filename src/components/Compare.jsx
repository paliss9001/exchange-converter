import { useEffect, useState } from "react";
import { handleFavorite } from "../helpers/functions";

export default function Compare({
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
  range
}) {
  let str = "";
  console.log('asd')
  useEffect(() => {
    async function getRates() {
      for (const option of currencyOptions) {
        const { label } = option;

        str += label + ",";
      }

      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?&base=${base}&quotes=${str}&providers=BCB`,
      );

      const result = await response.json();
      setRatesList(result);
    }

    getRates();
  }, [tab, amount, base, exchangeAmount, quotes]);

  if (!ratesList) return;

  return (
    <section className="compare">
      <div className="compare__info">
        <span className="compare__title">
          MULTI-CURRENCY
          <span className="compare__value">
            {" " + amount} FROM {base}
          </span>
        </span>
        <span className="compare__pairs">
          {currencyOptions.length - 1} pairs
        </span>
      </div>
      <ul className="compare__list">
        {generateCompareItems(
          currencyOptions,
          exchangeAmount,
          ratesList,
          base,
          amount,
          quotes,
          favorited,
          setFavorited,
          relativeRates,
          range
        )}
      </ul>
    </section>
  );
}

function generateCompareItems(
  itemsList,
  exchangeAmount,
  rates,
  base,
  amount,
  quotes,
  favorited,
  setFavorited,
  relativeRates,
  range
) {
  
  const favoritedPairs = JSON.parse(localStorage.getItem("favorites"));

  return itemsList.map((item, index) => {
    const { label, currencyName, state } = item;
    // const relativeRate = rates[index]['rate']
    const rate = (+rates[index]["rate"] * amount).toFixed(3)
    return (
      <li key={label} className="compare__item">
        <div className="compare__origin">
          <img src={state} className="compare__img"></img>
          <div className="compare__currency-data">
            <span className="compare__currency">{label}</span>
            <span className="compare__currency-name">{currencyName}</span>
          </div>
        </div>
        <div className="compare__rate">
          <span className="compare__converted">
            {rate}
          </span>
          <button
            className={
              getFavoritedPair(favoritedPairs, label, base, amount)
                ? "compare__favorited active"
                : "compare__favorited"
            }
            onClick={() =>
              handleFavorite(
                relativeRates,
                base,
                label,
                amount,
                rate,
                setFavorited,
                favorited,
                range
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
              stroke="white"
              strokeWidth={1}
            >
              <path
                fill="#cef739"
                d="M7.332 2.41c.281-.562 1.078-.538 1.336 0l1.547 3.118 3.422.492c.61.094.843.844.398 1.29l-2.46 2.413.585 3.399c.094.61-.562 1.078-1.101.797l-3.047-1.617-3.07 1.617c-.54.28-1.196-.188-1.102-.797l.586-3.399L1.965 7.31c-.446-.445-.211-1.195.398-1.289l3.446-.492z"
              />
            </svg>
          </button>
        </div>
      </li>
    );
  });
}

function getFavoritedPair(favoritedPairs, label, base, baseAmount) {
  for (const favoritedPair of favoritedPairs) {
    const { currencies, amount } = favoritedPair;

    if (amount === baseAmount.toString()) {
      return (
        currencies === `${base}-${label}` && amount === baseAmount.toString()
      );
    }
  }
}
