import React, { useState, useEffect } from 'react';
import NumberInput from './NumberInput';
import Card from './Card';
import ConvertButton from './ConvertButton';
import CopyButton from './CopyButton';
import { convertUnit, EthUnit, unitDisplayNames, isValidNumber } from '../utils/ethUnitConverter';
import '../styles/tools.css';

const EthUnitConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<EthUnit>('ether');
  const [toUnit, setToUnit] = useState<EthUnit>('gwei');
  const [result, setResult] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 處理輸入變更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 驗證輸入
    if (!isValidNumber(value)) {
      setIsValid(false);
      setErrorMessage('請輸入有效的數字');
    } else {
      setIsValid(true);
      setErrorMessage('');
    }
  };

  // 處理單位變更
  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as EthUnit);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as EthUnit);
  };

  // 執行轉換
  const handleConvert = async (): Promise<void> => {
    if (!isValid || !inputValue) {
      setResult('');
      return;
    }

    try {
      const convertedValue = convertUnit(inputValue, fromUnit, toUnit);
      setResult(convertedValue);
    } catch (error) {
      console.error('Conversion error:', error);
      setResult('轉換錯誤');
    }
  };

  // 自動轉換（當輸入或單位改變時）
  useEffect(() => {
    if (isValid && inputValue) {
      void handleConvert();
    }
  }, [inputValue, fromUnit, toUnit]);

  return (
    <Card>
      <h2>以太坊單位轉換器</h2>

      <div className="form-group">
        <label htmlFor="from-value">數值：</label>
        <NumberInput
          value={inputValue}
          onChange={handleInputChange}
          placeholder="輸入數值..."
          min={0}
          required
        />
        {!isValid && <div className="error-text">{errorMessage}</div>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="from-unit">從：</label>
          <select
            id="from-unit"
            value={fromUnit}
            onChange={handleFromUnitChange}
            className="select-input"
          >
            {Object.entries(unitDisplayNames).map(([unit, name]) => (
              <option key={unit} value={unit}>{name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="to-unit">至：</label>
          <select
            id="to-unit"
            value={toUnit}
            onChange={handleToUnitChange}
            className="select-input"
          >
            {Object.entries(unitDisplayNames).map(([unit, name]) => (
              <option key={unit} value={unit}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <ConvertButton onConvert={handleConvert}>轉換</ConvertButton>
      </div>

      {result && (
        <div className="result-container">
          <h3>轉換結果：</h3>
          <div className="result-value">
            {result} {unitDisplayNames[toUnit].split(' ')[0]}
          </div>
          <CopyButton text={result}>複製結果</CopyButton>
        </div>
      )}
    </Card>
  );
};

export default EthUnitConverter;
