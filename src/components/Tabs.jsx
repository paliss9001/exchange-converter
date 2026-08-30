import { useEffect, useReducer, useState, useRef } from "react";
import chevron from "/assets/images/icon-chevron-down.svg";
import { useOnClickOutside } from "../helpers/functions";

export default function Tabs({ options, setTab, tab}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options.filter(option => {
    return option.label === tab
  })[0]);

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));


  function handleOption(option) {
    setSelectedOption(option);
    setIsOpen(false);
    setTab(option.label)
  }

  return (
    <div className="tabs" ref={dropdownRef}>
      <button className="tabs__trigger" onClick={() => setIsOpen(!isOpen)}>
        <>
          <span className="tabs__label">{selectedOption.label}</span>
          <img src={chevron}></img>
        </>
      </button>
      {isOpen && (
        <ul className="tabs__menu">
          {options.map((option) => (
            <li
              data-tab={option.label}
              key={option.label}
              onClick={() => handleOption(option)}
              className="tabs__item"
            >
              <>
                <span className="tabs__label">{option.label}</span>
                <span className="tabs__currency">{option.currencyName}</span>
              </>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
