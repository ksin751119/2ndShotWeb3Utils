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
import { Alert, AlertDescription } from './ui/alert';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './ui/tooltip';

const BaseConverter: React.FC = () => {
  const [hexValue, setHexValue] = useState<string>('');
  const [decimalValue, setDecimalValue] = useState<string>('');
  const [binaryValue, setBinaryValue] = useState<string>('');

  const [error, setError] = useState<string>('');

  const updateOtherFields = (setter: React.Dispatch<React.SetStateAction<string>>, result: string) => {
    if (result.startsWith('錯誤：')) {
      setError(result);
      setter('');
    } else {
      setter(result);
    }
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexValue(value);
    setDecimalValue('');
    setBinaryValue('');
    setError('');

    if (value && !isValidHex(value)) {
      setError('錯誤：請輸入有效的十六進位數值 (0-9, A-F/a-f, 可選 0x 前綴)。');
      return;
    }

    if (value) {
      const decimalResult = hexToDecimal(value);
      updateOtherFields(setDecimalValue, decimalResult);
      if (!decimalResult.startsWith('錯誤：')) {
        const binaryResult = hexToBinary(value);
        updateOtherFields(setBinaryValue, binaryResult);
      }
    }
  };

  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDecimalValue(value);
    setHexValue('');
    setBinaryValue('');
    setError('');

    if (value && !isValidDecimal(value)) {
      setError('錯誤：請輸入有效的十進位數值 (0-9)。');
      return;
    }

    if (value) {
      const hexResult = decimalToHex(value);
      updateOtherFields(setHexValue, hexResult);
      if (!hexResult.startsWith('錯誤：')) {
        const binaryResult = decimalToBinary(value);
        updateOtherFields(setBinaryValue, binaryResult);
      }
    }
  };

  const handleBinaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBinaryValue(value);
    setHexValue('');
    setDecimalValue('');
    setError('');

    if (value && !isValidBinary(value)) {
      setError('錯誤：請輸入有效的二進位數值 (0-1, 可選 0b 前綴)。');
      return;
    }

    if (value) {
      const decimalResult = binaryToDecimal(value);
      updateOtherFields(setDecimalValue, decimalResult);
      if (!decimalResult.startsWith('錯誤：')) {
        const hexResult = binaryToHex(value);
        updateOtherFields(setHexValue, hexResult);
      }
    }
  };

  return (
    <Card>
      <h2>進制轉換器</h2>
      <p>在下方輸入框中輸入數值以自動轉換為其他進制</p>

      <div className="form-group mt-4">
        <label>十六進位 (Hex)：</label>
        <Input
          value={hexValue}
          onChange={handleHexChange}
          placeholder="例如：0x1a 或 1a"
        />
      </div>

      <div className="form-group mt-4">
        <label>十進位 (Decimal)：</label>
        <Input
          value={decimalValue}
          onChange={handleDecimalChange}
          placeholder="例如：42"
        />
      </div>

      <div className="form-group mt-4">
        <label>二進位 (Binary)：</label>
        <Input
          value={binaryValue}
          onChange={handleBinaryChange}
          placeholder="例如：0b101010 或 101010"
        />
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!error && (hexValue || decimalValue || binaryValue) && (
        <div className="button-row mt-4">
          {hexValue && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CopyButton text={hexValue}>複製十六進位</CopyButton>
                </TooltipTrigger>
                <TooltipContent><p>複製十六進位值</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {decimalValue && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CopyButton text={decimalValue}>複製十進位</CopyButton>
                </TooltipTrigger>
                <TooltipContent><p>複製十進位值</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {binaryValue && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CopyButton text={binaryValue}>複製二進位</CopyButton>
                </TooltipTrigger>
                <TooltipContent><p>複製二進位值</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
    </Card>
  );
};

export default BaseConverter;
