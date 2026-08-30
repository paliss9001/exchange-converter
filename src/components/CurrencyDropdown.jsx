import { useEffect, useState, useRef, act } from "react";
import chevron from "/assets/images/icon-chevron-down.svg";
import { useOnClickOutside } from "../helpers/functions";

export default function Dropdown({
  options,
  activeFrequency,
  base,
  quotes,
  setBase,
  setQuotes,
  setCurrencyInput,
  currencyOptions
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    getActiveFrequencyObject(activeFrequency, options),
  );
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  function handleOption(option) {
    setSelectedOption(option);
    setIsOpen(false);

    setBase ? setBase(option.label) : setQuotes(option.label);
  }

  function handleSearch(e) {
    setCurrencyInput(e.target.value)
  }

  useEffect(() => {
    setSelectedOption(getActiveFrequencyObject(activeFrequency, options));
  }, [activeFrequency]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown__trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <>
          <img className="dropdown__state" src={selectedOption.state}></img>
          <span className="dropdown__label">{selectedOption.label}</span>
          <img src={chevron}></img>
        </>
      </button>
      {isOpen && (
        <ul className="dropdown__menu">
          <input
            className="dropdown__search"
            placeholder="Search currencies..."
            onInput={handleSearch}
          ></input>
          {options.map((option) => (
            <li
              key={option.label}
              onClick={() => handleOption(option)}
              className={
                option.label === base || option.label === quotes
                  ? "dropdown__item active"
                  : "dropdown__item"
              }
            >
              <>
                <img className="dropdown__state" src={option.state}></img>
                <span className="dropdown__label">{option.label}</span>
                <span className="dropdown__currency">
                  {option.currencyName}
                </span>
              </>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function getActiveFrequencyObject(defaultCurrency, options) {
  for (const option of options) {
    if (option["label"] === defaultCurrency) {
      return option;
    }
  }
}
