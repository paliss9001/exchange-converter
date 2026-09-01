import { calculateDailyChange } from "../helpers/functions";
import { useTicker } from "../helpers/hooks";
import Error from "./Error";
import Loading from "./Loading";

export default function Ticker({ latestDates }) {

  const rates = latestDates.map((dates) => {
    const [previous, current] = dates;

    return [
      calculateDailyChange(current["rate"], previous["rate"]),
      current["base"],
      current["quote"],
      current["rate"],
    ];
  });

  return (
    <div className="ticker container">
      <span className="ticker__live">● live markets</span>
      <div className="ticker__track">
        <ul className="ticker__list">
          {rates.map((rateData, index) => {
            const [change, base, quote, rate] = rateData;
            return (
              <li key={index} className="ticker__item">
                <span className="ticker__currencies">
                  {base}/{quote}
                </span>
                <span className="ticker__rate">{rate}</span>
                <span
                  className={
                    change > 0 ? "ticker__change up" : "ticker__change down"
                  }
                >
                  {change > 0 ? "+" : ""}{change.toFixed(3)}
                </span>
              </li>
            );
          })}
        </ul>
        <ul className="ticker__list">
          {rates.map((rateData, index) => {
            const [change, base, quote, rate] = rateData;
            return (
              <li key={index} className="ticker__item">
                <span className="ticker__currencies">
                  {base}/{quote}
                </span>
                <span className="ticker__rate">{rate}</span>
                <span
                  className={
                    change > 0 ? "ticker__change up" : "ticker__change down"
                  }
                >
                  {change.toFixed(3)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
