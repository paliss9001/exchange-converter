import rightArrow from "/assets/images/icon-arrow-right.svg";

export default function Favorites({favoritesCount}) {
  return (
    <section className="favorites compare">
      <div className="favorites__info compare__info">
        <span className="favorites__title compare__title">PINNED PAIRS</span>
        <span className="favorites__count compare__pairs">
          {favoritesCount} FAVORITES
        </span>
      </div>
      <ul className="favorites__list compare__list">
        {generateFavoriteItems()}
      </ul>
    </section>
  );
}

function generateFavoriteItems() {
  const favoritesCollection = JSON.parse(localStorage.getItem("favorites"));

  return favoritesCollection.map((favorite, index) => {
    const { currencies, exchangeAmount, relativeChange } = favorite;
    const [based, quotes] = currencies.split("-");

    const targetChangeRateClass =
      relativeChange > 0 ? "ticker__change up" : "ticker__change down";

    return (
      <li key={index} className="favorites__item compare__item">
        <div className="favorites__exchange">
          <span className="favorites__currency">{based}</span>
          <img src={rightArrow}></img>
          <span className="favorites__currency">{quotes}</span>
        </div>
        <div className="favorites__info">
          <div className="favorites__change-data">
            <span className="favorites__change">{exchangeAmount}</span>
            <span className={targetChangeRateClass}>
              {relativeChange.toFixed(5)}
            </span>
          </div>
          <button className="compare__favorited active">
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
