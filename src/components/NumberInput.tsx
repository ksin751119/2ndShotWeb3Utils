import React, { useState } from 'react';
import Input, { InputProps } from './Input';

interface NumberInputProps extends Omit<InputProps, 'type' | 'value' | 'onChange'> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
  max?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({ required = false, value, onChange, helperText, error, min, max, ...rest }) => {
  const [touched, setTouched] = useState(false);
  const isEmpty = value.trim() === '';
  const isNumber = !isNaN(Number(value));
  const outOfRange = (!isEmpty && min !== undefined && Number(value) < min) || (!isEmpty && max !== undefined && Number(value) > max);
  let showError = false;
  let errorMsg = helperText;
  if (required && touched && isEmpty) {
    showError = true;
    errorMsg = '此欄位為必填';
  } else if (!isEmpty && touched && !isNumber) {
    showError = true;
    errorMsg = '請輸入有效數字';
  } else if (touched && outOfRange) {
    showError = true;
    errorMsg = `數值需介於${min ?? '-∞'} ~ ${max ?? '∞'}`;
  }
  return (
    <Input
      type="number"
      value={value}
      onChange={e => {
        onChange(e);
        if (!touched) setTouched(true);
      }}
      error={Boolean(error) || showError}
      helperText={errorMsg}
      {...rest}
    />
  );
};

export default NumberInput;
