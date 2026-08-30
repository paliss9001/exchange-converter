import { generateTabs } from "../helpers/functions";

export default function History({
  relativeRates,
  range,
  setRange,
}) {
  const [open, last] = relativeRates;
  const change = last - open;
  const pctChange = (change / open) * 100;

  const targetChangeClass =
    change > 0
      ? "history__data ticker__change up"
      : "history__data ticker__change down";
  const targetPctChangeClass =
    pctChange > 0
      ? "history__data ticker__change up"
      : "history__data ticker__change down";

  return (
    <section className="history">
      <dl className="history__list">
        <div className="history__item">
          <dt className="history__term">OPEN</dt>
          <dd className="history__data">{open.toFixed(5)}</dd>
        </div>
        <div className="history__item">
          <dt className="history__term">LAST</dt>
          <dd className="history__data">{last.toFixed(5)}</dd>
        </div>
        <div className="history__item">
          <dt className="history__term">CHANGE</dt>
          <dd className={targetChangeClass}>{change.toFixed(5)}</dd>
        </div>
        <div className="history__item">
          <dt className="history__term">% CHANGE</dt>
          <dd className={targetPctChangeClass}>{pctChange.toFixed(5)}</dd>
        </div>
      </dl>
      <Range range={range} setRange={setRange} />
    </section>
  );
}

function Range({ range, setRange }) {
  function handleRange(e) {
    const rang = e.target.dataset["range"];

    setRange(rang);
  }

  return (
    <div className="range">
      <ul className="range__list">
        <li
          className={range === "one day" ? "range__item active" : "range__item"}
          onClick={handleRange}
          data-range="one day"
        >
          1D
        </li>
        <li
          className={
            range === "one week" ? "range__item active" : "range__item"
          }
          onClick={handleRange}
          data-range="one week"
        >
          1W
        </li>
        <li
          className={
            range === "one month" ? "range__item active" : "range__item"
          }
          onClick={handleRange}
          data-range="one month"
        >
          1M
        </li>
        <li
          className={
            range === "three months" ? "range__item active" : "range__item"
          }
          onClick={handleRange}
          data-range="three months"
        >
          3M
        </li>
        <li
          className={
            range === "one year" ? "range__item active" : "range__item"
          }
          onClick={handleRange}
          data-range="one year"
        >
          1Y
        </li>
        <li
          className={
            range === "five years" ? "range__item active" : "range__item"
          }
          onClick={handleRange}
          data-range="five years"
        >
          5Y
        </li>
      </ul>
    </div>
  );
}
