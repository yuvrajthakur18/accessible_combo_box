import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { ComboBoxContextType, ComboBoxProviderProps } from './types';

const ComboBoxContext = createContext<ComboBoxContextType | undefined>(undefined);

export const ComboBoxProvider: React.FC<ComboBoxProviderProps> = ({
  children,
  options,
  onSelectionChange,
  disabled = false,
  multiple = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  
  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, filteredOptions.length);
  }, [filteredOptions.length]);

  useEffect(() => {
    if (!inputValue.trim()) {
      setFilteredOptions(options.filter(option => !selectedOptions.includes(option)));
    } else {
      const filtered = options
        .filter(option => 
          option.toLowerCase().includes(inputValue.toLowerCase()) &&
          (!multiple || !selectedOptions.includes(option))
        );
      setFilteredOptions(filtered);
    }
    setHighlightedIndex(-1);
  }, [inputValue, options, selectedOptions, multiple]);

  const openDropdown = useCallback(() => {
    if (!disabled && !isOpen) {
      setIsOpen(true);
    }
  }, [isOpen, disabled]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    if (!multiple) {
      setInputValue('');
    }
  }, [multiple]);

  const removeOption = useCallback((option: string) => {
    setSelectedOptions(prev => prev.filter(item => item !== option));
    onSelectionChange?.(selectedOptions.filter(item => item !== option));
  }, [selectedOptions, onSelectionChange]);

  const selectOption = useCallback((option: string) => {
    if (multiple) {
      const newSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      setInputValue('');
      onSelectionChange?.(newSelectedOptions);
    } else {
      setInputValue(option);
      setSelectedOptions([option]);
      onSelectionChange?.([option]);
    }
    closeDropdown();
    inputRef.current?.focus();
  }, [multiple, selectedOptions, onSelectionChange, closeDropdown]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          setHighlightedIndex(prevIndex => {
            const newIndex = prevIndex >= filteredOptions.length - 1 ? 0 : prevIndex + 1;
            scrollOptionIntoView(newIndex);
            return newIndex;
          });
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          setHighlightedIndex(prevIndex => {
            const newIndex = prevIndex <= 0 ? filteredOptions.length - 1 : prevIndex - 1;
            scrollOptionIntoView(newIndex);
            return newIndex;
          });
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          selectOption(filteredOptions[highlightedIndex]);
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        closeDropdown();
        break;
        
      case 'Backspace':
        if (multiple && inputValue === '' && selectedOptions.length > 0) {
          removeOption(selectedOptions[selectedOptions.length - 1]);
        }
        break;
        
      case 'Tab':
        if (isOpen) {
          closeDropdown();
        }
        break;
        
      default:
        break;
    }
  }, [isOpen, highlightedIndex, filteredOptions, selectOption, closeDropdown, openDropdown, disabled, multiple, inputValue, selectedOptions, removeOption]);

  const scrollOptionIntoView = (index: number) => {
    if (index >= 0 && optionRefs.current[index]) {
      optionRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  const contextValue: ComboBoxContextType = {
    inputValue,
    setInputValue,
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
    filteredOptions,
    selectOption,
    handleKeyDown,
    openDropdown,
    closeDropdown,
    inputRef,
    listboxRef,
    optionRefs,
    disabled,
    selectedOptions,
    removeOption,
    multiple
  };

  return (
    <ComboBoxContext.Provider value={contextValue}>
      {children}
    </ComboBoxContext.Provider>
  );
};

export const useComboBox = () => {
  const context = useContext(ComboBoxContext);
  if (context === undefined) {
    throw new Error('useComboBox must be used within a ComboBoxProvider');
  }
  return context;
};