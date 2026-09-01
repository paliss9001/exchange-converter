import { useState, useRef, useEffect } from "react";
import History from "./History";

export default function Tabs({active, setActive, tabs}) {
  const tabRefs = useRef([]);
  const keys = ["ArrowRight", "ArrowLeft", "Home", "End"]

  function onKeyDown(e) {

    if (!keys.includes(e.key)) return;

    e.preventDefault();
    let nextTab = active;

    if (e.key === "ArrowRight") {
      nextTab = (active + 1) % tabs.length
    }

    if (e.key === "ArrowLeft") {
      nextTab = (active - 1 + tabs.length) % tabs.length 
    }

    if (e.key === "Home") {
      nextTab = 0
    }

    if (e.key = "End") {
      nextTab = tabRefs.length - 1
    }
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section 
      className="tabs"
      aria-label="Tabs"
      onKeyDown={onKeyDown}
    >
      {tabs.map((tab, i) => (
        <button
          key={`tab-${i}`}
          ref={el => tabRefs.current[i] = el}
          role="tab"
          id={`tab-${i}`}
          aria-selected={active === i}
          onClick={() => setActive(i)}
          className={active === i ? "tabs__tab active" : "tabs__tab"}
        >
          {tab.label}
        </button>
      ))}

      {tabs.map((tab, i) => (
        <div 
          key={`tab-${i}`}
          role="tabpanel"
          id={`tab-${i}`}
          aria-labelledby={`tab-${i}`}
          hidden={active !== i}
          className="tabs__panel"
        >
          {tab.content}
        </div>
      ))}
    </section>
  )
}