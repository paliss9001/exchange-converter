
export default function Ticker({ rates }) {
  console.log(rates)
  const rateChanges = rates.map((rateChangeData, index) => {
    const [previousRate, currentRate] = getRateInfo(rateChangeData, "rate");
    const [base, quote] = getRateInfo(rateChangeData, "currencies");
    

    const changeRate = calculateChangeRate(previousRate, currentRate).toFixed(
      2,
    );
    const targetChangeRateClass =
      changeRate > 0 ? "ticker__change up" : "ticker__change down";

    return (
      <span key={index} className="ticker__item">
        <span className="ticker__currencies">
          {base}/{quote}
        </span>
        <span className="ticker__rate">{currentRate.toFixed(2)}</span>
        <span className={targetChangeRateClass}>{changeRate}</span>
      </span>
    );
  });

  return (
    <div className="ticker container">
      <span className="current-data">
        <span className="icon icon--default">LIVE MARKETS</span>
      </span>
      <div className="ticker__body">{rateChanges}</div>
      <div className="ticker__body" aria-hidden={true}>{rateChanges}</div>
    </div>
  );
}

function getRateInfo(array, target) {
  const [previousRateArray, currentRateArray] = array;

  if (target === "currencies") {
    return [previousRateArray["base"], currentRateArray["quote"]];
  }

  return [previousRateArray[target], currentRateArray[target]];
}

function calculateChangeRate(previousRate, currentRate) {
  return ((currentRate - previousRate) / previousRate) * 100;
}
