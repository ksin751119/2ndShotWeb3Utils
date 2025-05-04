import React, { useState } from 'react';
import Input, { InputProps } from './Input';

interface TextInputProps extends Omit<InputProps, 'type'> {
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ required = false, value, onChange, helperText, error, ...rest }) => {
  const [touched, setTouched] = useState(false);
  const showError = required && touched && value.trim() === '';
  return (
    <Input
      type="text"
      value={value}
      onChange={e => {
        onChange(e);
        if (!touched) setTouched(true);
      }}
      error={Boolean(error) || showError}
      helperText={showError ? '此欄位為必填' : helperText}
      {...rest}
    />
  );
};

export default TextInput;
