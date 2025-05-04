import React from 'react';

export interface ComboBoxProps {
  options: string[];
  placeholder?: string;
  onSelectionChange?: (value: string[]) => void;
  disabled?: boolean;
  multiple?: boolean;
}

export interface ComboBoxProviderProps {
  children: React.ReactNode;
  options: string[];
  onSelectionChange?: (value: string[]) => void;
  disabled?: boolean;
  multiple?: boolean;
}

export interface ComboBoxContextType {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  filteredOptions: string[];
  selectOption: (option: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  openDropdown: () => void;
  closeDropdown: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  listboxRef: React.RefObject<HTMLUListElement>;
  optionRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
  disabled: boolean;
  selectedOptions: string[];
  removeOption: (option: string) => void;
  multiple: boolean;
}