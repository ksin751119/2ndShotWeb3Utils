import React, { useState } from 'react';
import Input from './Input';
import Card from './Card';
import CopyButton from './CopyButton';
import {
  isValidHex,
  isValidDecimal,
  isValidBinary,
  hexToDecimal,
  hexToBinary,
  decimalToHex,
  decimalToBinary,
  binaryToDecimal,
  binaryToHex
} from '../utils/baseConverter';
import '../styles/tools.css';

const BaseConverter: React.FC = () => {
  const [hexValue, setHexValue] = useState<string>('');
  const [decimalValue, setDecimalValue] = useState<string>('');
  const [binaryValue, setBinaryValue] = useState<string>('');

  const [hexError, setHexError] = useState<boolean>(false);
  const [decimalError, setDecimalError] = useState<boolean>(false);
  const [binaryError, setBinaryError] = useState<boolean>(false);

  // 處理十六進位輸入變更
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexValue(value);

    if (value && !isValidHex(value)) {
      setHexError(true);
      return;
    }

    setHexError(false);
    if (value) {
      // 更新其他欄位
      setDecimalValue(hexToDecimal(value));
      setBinaryValue(hexToBinary(value));
    } else {
      // 如果輸入為空，清空其他欄位
      setDecimalValue('');
      setBinaryValue('');
    }
  };

  // 處理十進位輸入變更
  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDecimalValue(value);

    if (value && !isValidDecimal(value)) {
      setDecimalError(true);
      return;
    }

    setDecimalError(false);
    if (value) {
      // 更新其他欄位
      setHexValue(decimalToHex(value));
      setBinaryValue(decimalToBinary(value));
    } else {
      // 如果輸入為空，清空其他欄位
      setHexValue('');
      setBinaryValue('');
    }
  };

  // 處理二進位輸入變更
  const handleBinaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBinaryValue(value);

    if (value && !isValidBinary(value)) {
      setBinaryError(true);
      return;
    }

    setBinaryError(false);
    if (value) {
      // 更新其他欄位
      setHexValue(binaryToHex(value));
      setDecimalValue(binaryToDecimal(value));
    } else {
      // 如果輸入為空，清空其他欄位
      setHexValue('');
      setDecimalValue('');
    }
  };

  return (
    <Card>
      <h2>進制轉換器</h2>
      <p>在下方輸入框中輸入數值以自動轉換為其他進制</p>

      <div className="form-group">
        <label>十六進位 (Hex)：</label>
        <Input
          value={hexValue}
          onChange={handleHexChange}
          placeholder="例如：0x1a 或 1a"
          error={hexError}
          helperText={hexError ? '請輸入有效的十六進位數值' : ''}
        />
      </div>

      <div className="form-group">
        <label>十進位 (Decimal)：</label>
        <Input
          value={decimalValue}
          onChange={handleDecimalChange}
          placeholder="例如：42"
          error={decimalError}
          helperText={decimalError ? '請輸入有效的十進位數值' : ''}
        />
      </div>

      <div className="form-group">
        <label>二進位 (Binary)：</label>
        <Input
          value={binaryValue}
          onChange={handleBinaryChange}
          placeholder="例如：0b101010 或 101010"
          error={binaryError}
          helperText={binaryError ? '請輸入有效的二進位數值' : ''}
        />
      </div>

      <div className="button-row">
        {hexValue && <CopyButton text={hexValue}>複製十六進位</CopyButton>}
        {decimalValue && <CopyButton text={decimalValue}>複製十進位</CopyButton>}
        {binaryValue && <CopyButton text={binaryValue}>複製二進位</CopyButton>}
      </div>
    </Card>
  );
};

export default BaseConverter;
