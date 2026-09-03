import { useEffect, useState, useContext } from "react";
import {
  CurrencyDataContext,
  SetCurrencyDataContext,
} from "../helpers/contexts";
import {
  getPrevMonth,
  getPrevWeek,
  getPrevYear,
  getPrevFiveYears,
  getPrevDay,
  getRangeDate,
} from "../helpers/functions";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { useChartData } from "../helpers/hooks";
import LineChart from "./LineChart";

Chart.register(CategoryScale);

export default function History() {
  const [changes, setChanges] = useState(null);
  const [activeRange, setActiveRange] = useState("1D");
  const [isLoading, setIsLoading] = useState(true);

  const currencyData = useContext(CurrencyDataContext);
  const setCurrencyData = useContext(SetCurrencyDataContext);
  const { base, quote } = currencyData;
  const [chartData, isChartLoading] = useChartData(getRangeDate(activeRange), base, quote);


  const URLs = [
    `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${quote}`,
    `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${quote}&date=${getRangeDate(activeRange)}`,
  ];

  const promises = URLs.map((url) => fetch(url));

  useEffect(() => {
    Promise.all(promises)
      .then((responses) =>
        Promise.all(responses.map((response) => response.json())),
      )
      .then((result) => {
        setChanges(result);
        setIsLoading(false);
      });
  }, [activeRange, base, quote]);

  if (isLoading) return;


  const [open, last] = [changes[0][0]["rate"], changes[1][0]["rate"]];
  const change = last - open;
  const pctChange = (change / open) * 100;

  const targetChangeClass =
    change > 0 ? "ticker__change up" : "ticker__change down";
  const targetPctClass =
    pctChange > 0 ? "ticker__change up" : "ticker__change down";

  const historyData = [
    { label: "OPEN", value: open },
    { label: "LAST", value: last },
    { label: "CHANGE", value: change.toFixed(4), modifier: targetChangeClass },
    {
      label: "% CHANGE",
      value: pctChange.toFixed(3),
      modifier: targetPctClass,
    },
  ];

  return (
    <section className="history">
      <div className="history__body">
      <ul className="history__cards-list">
        {historyData.map((data, i) => {
          const { label, value, modifier } = data;

          return (
            <Item key={i} label={label} value={value} modifier={modifier} />
          );
        })}
      </ul>

      <Range activeRange={activeRange} setActiveRange={setActiveRange} />
      <div className="history__chart content-bg" style={{ width: "width: 100%", flexGrow: 1, marginBottom: "2rem" }}>
        {isChartLoading ? <div>chart is loading</div> : <LineChart chartData={chartData} base={base} quote={quote} />}
      </div>
      </div>
    </section>
  );
}

function Item({ label, value, modifier = "" }) {
  return (
    <li className="history__item">
      <span className="history__label">{label}</span>
      <span className={"history__value" + " " + modifier}>{value}</span>
    </li>
  );
}

function Range({ activeRange, setActiveRange }) {
  const ranges = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

  function handleRange(e) {
    setActiveRange(e.target.dataset["range"]);
  }

  return (
    <div className="range">
      <ul className="range__list">
        {ranges.map((range) => (
          <li
            key={range}
            className={
              range === activeRange ? "range__item active" : "range__item"
            }
            data-range={range}
            onClick={handleRange}
          >
            {range}
          </li>
        ))}
      </ul>
    </div>
  );
}
