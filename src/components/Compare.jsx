import { useEffect, useState, useContext } from "react";
import { CurrencyDataContext } from "../helpers/contexts";
import Loading from "./Loading";
import { getCurrencyDropdownData } from "../helpers/functions";
import favoriteIcon from "/assets/images/icon-star.svg";
import favoriteIconFilled from "/assets/images/icon-star-filled.svg";

export default function Compare() {
  const [changes, setChanges] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currenciesData = useContext(CurrencyDataContext);

  const { base, currencies, baseAmount, quote } = currenciesData;

  const strCurrencies = currencies.map((currency) => {
    return currency["iso_code"];
  });

  const dataObject = getCurrencyDropdownData(currencies).filter((curr) => {
    return true;
  });

  useEffect(() => {
    fetch(
      `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${strCurrencies}`,
    )
      .then((response) => response.json())
      .then((result) => {
        setChanges(result);
        setIsLoading(false);
      });
  }, [baseAmount, base, quote]);

  if (isLoading) return <Loading />;

  if (baseAmount === "") {
    return (
      <div className="default">
        <span className="default__title">No comparison available</span>

        <p>
          Enter an amount in SEND above to see what your money is worth in other
          currencies.
        </p>
      </div>
    );
  }

  for (let i = 0; i < changes.length; i++) {
    const changesObj = changes[i];
    const changeRate = changesObj["rate"] * baseAmount;

    dataObject[i]["change"] = +changeRate.toFixed(4);
    dataObject[i]["bitRate"] = changesObj["rate"];
    dataObject[i]["base"] = base;
  }

  const filteredData = dataObject.filter((data) => data["value"] !== base);

  return (
    <div className="compare content-bg">
      <ul className="compare__list">
        {filteredData.map((data) => (
          <Item key={data.value} data={data} base={base} />
        ))}
      </ul>
    </div>
  );
}

function Item({ data, base }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const isInCollection = validateIsFavoritesIncollection(`${base}-${data.value}`)

  function handleFavorite() {
    const pair = `${base}-${data.value}`
    const copy = [...JSON.parse(localStorage.getItem('favorites'))]
 

    if (!validateIsFavoritesIncollection(pair)) {
      copy.push(pair)
      localStorage.setItem("favorites", JSON.stringify(copy))
      setIsFavorite(true)
    } else {
      const updatedArray = copy.splice(copy.indexOf(pair), 1)
      localStorage.setItem("favorites", JSON.stringify(updatedArray))
      setIsFavorite(false)      
    } 
  }


  return (
    <li className="compare__item content-card">
      <div className="compare__info">
        <img src={data.countryImage} className="compare__country"></img>
        <div className="compare__currency">
          <span className="compare__iso">{data.value}</span>
          <span className="compare__name">{data.label}</span>
        </div>
      </div>
      <div className="compare__data">
        <div className="compare__values">
          <span className="compare__change">{data.change}</span>
          <span className="compare__bitrate">@ {data.bitRate}</span>
        </div>
        <button
          className={
            isFavorite
              ? "compare__favorite active"
              : "compare__favorite"
          }
          onClick={() => handleFavorite(data)}
        >
          <img src={isFavorite ? favoriteIconFilled : favoriteIcon}></img>
        </button>
      </div>
    </li>
  );
}

function validateIsFavoritesIncollection(pair) {
  return JSON.parse(localStorage.getItem("favorites")).includes(pair)
}
