import { useState, useRef } from "react";
import chevron from "/assets/images/icon-chevron-down.svg";
import { useOnClickOutside } from "../helpers/hooks";

export default function InfoPicker({ options, active, setActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  function handleItem(option, e) {
    setSelectedOption(option);
    setIsOpen(false);

    setActive(+e.target.dataset['item'])
  }

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <>
      <div className="info-picker" ref={dropdownRef}>
        <button
          className="info-picker__trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption.label}
          <img src={chevron}></img>
        </button>
        {isOpen && (
          <ul className="info-picker__list">
            {options.map((option, i) => (
              <li
                key={i}
                onClick={(e) => handleItem(option, e)}
                className="info-picker__item"
                data-item={i}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {options.map((option, i) => (
        <div key={i} hidden={active !== i} className="info-picker__content">
          {option.content}
        </div>
      ))}
    </>
  );
}
