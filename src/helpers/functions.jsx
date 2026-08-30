import { useEffect } from "react";

export function generateTabs(activetab, data, updater, targetClass) {
  const currClass = targetClass;

  return data.map((item, index) => {
    const isArray = Array.isArray(item);
    if (isArray) {
      return (
        <li
          data-tab={item[0]}
          className={item[0] === activetab ? currClass + " active" : currClass}
          key={index}
          onClick={updater}
        >
          {item[0]}
          <span>{item[1]}</span>
        </li>
      );
    }

    return (
      <li
        data-tab={item}
        className={item === activetab ? currClass + " active" : currClass}
        key={index}
        onClick={updater}
      >
        {item}
      </li>
    );
  });
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
  });
}

export function getStartStr(range, date) {
  switch (range) {
    case "one month":
      date.setMonth(date.getMonth() - 1);
      break;
    case "one day":
      date.setHours(date.getHours() - 72);
      break;
    case "one week":
      date.setDate(date.getDate() - 7);
      break;
    case "three months":
      date.setMonth(date.getMonth() - 3);
      break;
    case "one year":
      date.setMonth(date.getMonth() - 12);
      break;
    case "five years":
      date.setMonth(date.getMonth() - 60);
      break;
  }

  return date.toISOString().split("T")[0];
}

export function validateDuplicate(array, target) {
  if (array.length === 0) return false;

  for (const obj of array) {
    if (
      obj["currencies"] === target["currencies"] &&
      obj["amount"] === target["amount"]
    ) {
      return true;
    }
  }

  return false;
}

export async function handleFavorite(
  relativeRates,
  base,
  quotes,
  amount,
  exchangeAmount,
  setFavorited,
  favorited,
  range,
) {
  const pair = `${base}-${quotes}`;
  const favoritePair = {
    currencies: pair,
    amount: amount.toString(),
    exchangeAmount: exchangeAmount,
    relativeChange: await getRelativeRate(base, quotes, range)
  };
  const copy = [...JSON.parse(localStorage.getItem("favorites"))];

  if (!validateDuplicate(copy, favoritePair)) {
    copy.push(favoritePair);
    localStorage.setItem("favorites", JSON.stringify(copy));
    setFavorited(!favorited);
  } else {
    const newCopy = copy.filter((object) => {
      if (
        object["currencies"] === pair &&
        object["amount"] === amount.toString()
      ) {
        return false;
      }

      return true;
    });

    localStorage.setItem("favorites", JSON.stringify(newCopy));
    setFavorited(!favorited);
  }

  async function getRelativeRate(base, quote) {
    const date = new Date();
    const startStr = getStartStr(range, date);

    const converterResponse = await fetch(
      `https://api.frankfurter.dev/v1/${startStr}..?from=${base}&to=${quotes}&providers=BCB`,
    );

    const resultRange = await converterResponse.json();

    // if (resultRange.rates.length === 1) {
    //   console.log('dsa')
    // }
    if (Object.values(resultRange.rates).length === 1) {
      return Object.values(resultRange.rates)[0][quote] * amount
    }

    const [start, end] = [
      Object.values(resultRange.rates)[0],
      Object.values(resultRange.rates)[1],
    ];

    const change = end[quote] - start[quote];
    const pctChange = (change / start[quote]) * 100;

    return pctChange;
  }
}
