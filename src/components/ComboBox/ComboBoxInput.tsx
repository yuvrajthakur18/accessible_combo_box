import React from 'react';
import { useComboBox } from './ComboBoxContext';
import { ChevronDown, X } from 'lucide-react';

interface ComboBoxInputProps {
  placeholder?: string;
}

const ComboBoxInput: React.FC<ComboBoxInputProps> = ({ placeholder = 'Select an option...' }) => {
  const {
    inputValue,
    setInputValue,
    isOpen,
    openDropdown,
    closeDropdown,
    handleKeyDown,
    inputRef,
    filteredOptions,
    disabled,
    selectedOptions,
    removeOption,
    multiple
  } = useComboBox();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    
    if (!isOpen && e.target.value) {
      openDropdown();
    }
  };

  const handleInputFocus = () => {
    if (filteredOptions.length > 0) {
      openDropdown();
    }
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    const isClickingOption = e.relatedTarget?.closest('[role="listbox"]');
    if (!isClickingOption) {
      closeDropdown();
    }
  };

  return (
    <div className="relative">
      <div className="relative flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
        {multiple && selectedOptions.map((option) => (
          <span
            key={option}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
          >
            {option}
            <button
              type="button"
              onClick={() => removeOption(option)}
              className="ml-1 inline-flex items-center p-0.5 hover:bg-indigo-200 rounded-full"
              aria-label={`Remove ${option}`}
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className={`flex-1 min-w-[200px] focus:outline-none ${
            disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-transparent'
          }`}
          placeholder={selectedOptions.length === 0 ? placeholder : ''}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="combo-box-listbox"
          aria-activedescendant={isOpen ? `option-${filteredOptions[0]}` : undefined}
          aria-multiselectable={multiple}
          autoComplete="off"
          disabled={disabled}
        />
      </div>
      <ChevronDown 
        className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${
          isOpen ? 'transform rotate-180' : ''
        } ${disabled ? 'opacity-50' : ''}`}
        aria-hidden="true"
      />
    </div>
  );
};

export default ComboBoxInput;