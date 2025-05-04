import React from 'react';
import { ComboBoxProvider } from './ComboBoxContext';
import ComboBoxInput from './ComboBoxInput';
import ComboBoxDropdown from './ComboBoxDropdown';
import { ComboBoxProps } from './types';

const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  placeholder = 'Select an option...',
  onSelectionChange,
  disabled = false,
  multiple = false,
}) => {
  return (
    <ComboBoxProvider
      options={options}
      onSelectionChange={onSelectionChange}
      disabled={disabled}
      multiple={multiple}
    >
      <div className="relative w-full">
        <ComboBoxInput placeholder={placeholder} />
        <ComboBoxDropdown />
      </div>
    </ComboBoxProvider>
  );
};

export default ComboBox;