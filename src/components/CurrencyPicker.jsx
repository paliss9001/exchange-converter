import { useState, useRef, useEffect } from "react";
import { useOnClickOutside } from "../helpers/hooks";
import chevron from "/assets/images/icon-chevron-down.svg";
import { getDefaultOption } from "../helpers/functions";


export default function CurrencyPicker({
  options,
  searchTerm,
  setSearchTerm,
  base,
  setBase,
  quote,
  setQuote,
  activeCurr,
  orig
}) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    getDefaultOption(orig, activeCurr) 
  );

  const [popularCurrencies, otherCurrencies] = allCurrencies(options);

  const handleOptionClick = (option, e) => {
    setSelectedOption(option);
    setIsOpen(false);

    activeCurr === base
      ? setBase(e.target.closest("li").dataset["value"])
      : setQuote(e.target.closest("li").dataset["value"]);
  };

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    setSelectedOption(getDefaultOption(orig, activeCurr))
  }, [activeCurr])

  return (
    <div className="currency-picker" ref={dropdownRef}>
      <button
        className="currency-picker__trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          width={20}
          height={20}
          className="currency-picker__country-image"
          src={selectedOption.countryImage}
        ></img>
        {selectedOption.value}
        <img src={chevron}></img>
      </button>
      {isOpen && (
        <div>
          <ul className="currency-picker__menu">
            <input
              onInput={(e) => setSearchTerm(e.target.value)}
              className="currency-picker__search"
              placeholder="Search currency..."
              value={searchTerm}
            ></input>
            <span className="currency-picker__list-title">POPULAR</span>
            {popularCurrencies.map((option) => (
              <li
                key={option.value}
                data-value={option.value}
                className={
                  option.value === quote || option.value === base
                    ? "currency-picker__item active"
                    : "currency-picker__item"
                }
                onClick={(e) => handleOptionClick(option, e)}
              >
                <img
                  width={20}
                  height={20}
                  className="currency-picker__country-image"
                  src={option.countryImage}
                ></img>
                <span className="currency-picker__iso-code">
                  {option.value}
                </span>
                <span className="currency-picker__currency-name">
                  {option.label}
                </span>
              </li>
            ))}
            <span className="currency-picker__list-title">
              OTHER CURRENCIES
            </span>
            {otherCurrencies.map((option) => (
              <li
                key={option.value}
                className={
                  option.value === quote || option.value === base
                    ? "currency-picker__item active"
                    : "currency-picker__item"
                }
                onClick={(e) => handleOptionClick(option, e)}
                data-value={option.value}
              >
                <img
                  width={20}
                  height={20}
                  className="currency-picker__country-image"
                  src={option.countryImage}
                ></img>
                <span className="currency-picker__iso-code">
                  {option.value}
                </span>
                <span className="currency-picker__currency-name">
                  {option.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function allCurrencies(currencies) {
  const popularOptions = ["USD", "GBP", "EUR"];

  const popularCurrencies = [];
  const otherCurrencies = [];

  currencies.forEach((currency) => {
    const { value } = currency;

    if (popularOptions.includes(value)) {
      popularCurrencies.push(currency);
    } else {
      otherCurrencies.push(currency);
    }
  });

  return [popularCurrencies, otherCurrencies];
}
