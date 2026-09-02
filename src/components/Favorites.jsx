import { useContext } from "react";
import { CurrencyDataContext } from "../helpers/contexts";
import arrowIcon from "/assets/images/icon-arrow-right.svg";
import favoriteIconFilled from "/assets/images/icon-star-filled.svg";
import Default from "./Default";
import { structureArray } from "../helpers/functions";

export default function Favorites() {
  const { favoritesCollection } = useContext(CurrencyDataContext);
  const arrayedFavorites = JSON.parse(favoritesCollection);
  const structuredFavorites = structureArray(arrayedFavorites);
  const {isFavorite, setIsFavorite} = useContext(CurrencyDataContext)

  function handleFavorite(favorite) {
    const copy = JSON.parse(localStorage.getItem("favorites"))
  
    copy.splice(copy.indexOf(favorite[0]), 3)

    localStorage.setItem("favorites", JSON.stringify(copy))
    setIsFavorite(!isFavorite)
  }

  if (structuredFavorites.length === 0) {
    return <Default title={"No pinned pairs yet"} text={"Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row."} />
  }

  return (
    <section className="favorites content-bg">
      <div className="favorites__header">
        <span className="favorites__title">PINNED PAIRS</span>
        <span className="favorites__count">{structuredFavorites.length} FAVORITES</span>
      </div>
      <ul className="favorites__list">
        {structuredFavorites.map((favorite, index) => {
          const [base, quote] = favorite[0].split("-");
          const [, change, bitrate] = favorite;
 
          return (
            <li key={index} className="favorites__item content-card">
              <span className="favorites__currencies">
                {base}
                <img className="favorites__arrow" src={arrowIcon}></img>
                {quote}
              </span>
              <div className="favorites__extra">
                <div className="favorites__currency-wrapper">
                  <span className="favorites__bitrate">{bitrate.toFixed(5)}</span>
                  <span className="favorites__history">{change.toFixed(3)}</span>
                </div>
                <button
                  className="compare__favorite active"
                  onClick={() => handleFavorite(favorite)}
                >
                  <img src={favoriteIconFilled}></img>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

