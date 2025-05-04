import React from "react";
import { useComboBox } from "./ComboBoxContext";
import { Check } from "lucide-react";

const ComboBoxDropdown: React.FC = () => {
  const {
    isOpen,
    filteredOptions,
    highlightedIndex,
    selectOption,
    listboxRef,
    optionRefs,
    selectedOptions,
    multiple,
  } = useComboBox();

  if (!isOpen) {
    return null;
  }

  const handleOptionClick = (option: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    selectOption(option);
  };

  return (
    <div
      className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transform transition-opacity duration-200 opacity-100"
      role="presentation"
    >
      <ul
        ref={listboxRef}
        className="max-h-60 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-gray-300"
        role="listbox"
        id="combo-box-listbox"
        aria-label="Options"
        tabIndex={-1}
      >
        {filteredOptions.length === 0 ? (
          <li className="px-4 py-2 text-gray-500 italic">No results found</li>
        ) : (
          filteredOptions.map((option, index) => (
            <li
              key={option}
              ref={(el) => (optionRefs.current[index] = el)}
              className={`flex items-center px-4 py-2 cursor-pointer transition-colors ${
                highlightedIndex === index
                  ? "bg-indigo-100 text-indigo-800"
                  : "hover:bg-gray-200"
              }`}
              role="option"
              id={`option-${option}`}
              aria-selected={
                multiple
                  ? selectedOptions.includes(option)
                  : highlightedIndex === index
              }
              onMouseDown={(e) => handleOptionClick(option, e)}
              tabIndex={0}
            >
              {multiple && selectedOptions.includes(option) && (
                <Check
                  className="w-4 h-4 mr-2 text-indigo-600"
                  aria-hidden="true"
                />
              )}
              {option}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ComboBoxDropdown;
