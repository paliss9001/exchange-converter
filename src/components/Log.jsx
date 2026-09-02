import { useContext, useDebugValue, useEffect, useState } from "react";
import arrowIcon from "/assets/images/icon-arrow-right.svg";
import deleteIcon from "/assets/images/icon-delete.svg";
import { CurrencyDataContext } from "../helpers/contexts";
import Default from "./Default";
import { deepCheck } from "../helpers/functions";


export default function Log() {
  const {logs, setLogs} = useContext(CurrencyDataContext)
  const {setIsLogged} = useContext(CurrencyDataContext)

  function handleClear() {
    setLogs([])
    localStorage.setItem("logs", JSON.stringify([]))
    setIsLogged(false)
  }

  if (logs.length === 0) {
    return (
      <Default title={"No conversions logged yet"} text={"Every conversion is recorded here automatically when you tap LOG CONVERSION. Your log is private to this session and this browser."} />
    )
  }

  return (
    <section className="log content-bg">
      <div className="log__header">
        <div className="log__info">
          <span className="log__title">CONVERSION LOG</span>
        </div>
        <div className="log__actions">
          {logs.length} LOGGED
          <button
            className={
              "button log__button"
            }
            onClick={handleClear}
          >
            CLEAR ALL
          </button>
        </div>
      </div>
      <ul className="log__list">
        {logs.map((log, index) => {
          const {base, baseAmount, day, month, exchangeAmount, quote} = log

          return <Item key={index} {...log} setLogs={setLogs} />
        })}
      </ul>
    </section>
  );
}

function Item({base, baseAmount, day, month, exchangeAmount, quote, setLogs}) {
  const {setIsLogged} = useContext(CurrencyDataContext)

  function handleDelete() {
    const target = {base, baseAmount, day, month, exchangeAmount, quote}
    const copy = [...JSON.parse(localStorage.getItem("logs"))]

    for (let i = 0; i < copy.length; i++) {
      if (deepCheck(copy[i], target)) {
        copy.splice(i, 1)
      }
    }

    localStorage.setItem("logs", JSON.stringify(copy))
    setLogs(copy)
    setIsLogged(false)
  }

  return (
    <>
      <li className="log__item content-card">
        <div className="log__info">
          <span className="log__date">
            {month} {day}
          </span>
          <div className="log__currencies">
            <span className="log__base">{base}</span>
            <img src={arrowIcon}></img>
            <span className="log__quote">{quote}</span>
          </div>
        </div>
        <div className="log__exchange">
          <span className="log__base-amount">{baseAmount}</span>
          <span className="log__exchange-amount">{exchangeAmount.toFixed(3)}</span>
          <button
            onClick={() => handleDelete()}
            className="log__delete button"
          >
            <img className="log__arrow" src={deleteIcon}></img>
          </button>
        </div>
      </li>
    
    </>
  );
}



