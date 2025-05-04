import React, { useState, useEffect, useCallback } from 'react';
import NumberInput from './NumberInput';
import Card from './Card';
import ConvertButton from './ConvertButton';
import CopyButton from './CopyButton';
import { convertUnit, EthUnit, unitDisplayNames, isValidNumber } from '../utils/ethUnitConverter';
import '../styles/tools.css';
import { Alert, AlertDescription } from './ui/alert';

const EthUnitConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<EthUnit>('ether');
  const [toUnit, setToUnit] = useState<EthUnit>('gwei');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 處理輸入變更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 即時驗證並設置/清除錯誤
    if (value && !isValidNumber(value)) {
      setError('錯誤：請輸入有效的數字格式。');
      setResult(''); // Clear result on invalid input
    } else {
      setError(''); // Clear error if format is valid or input is empty
      // Optionally trigger conversion here if format is valid and not empty
      // For now, let's keep conversion triggered by useEffect/button
    }
  };

  // 處理單位變更
  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as EthUnit);
    setError(''); // Clear error on unit change, conversion will re-validate
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as EthUnit);
    setError(''); // Clear error on unit change, conversion will re-validate
  };

  // 執行轉換 (for ConvertButton)
  const handleConvert = useCallback(async (): Promise<void> => {
    if (!inputValue || error) { // Check for empty input or existing validation error
      // If input is empty, ensure no error is shown, result is cleared
      if (!inputValue) {
        setError('');
        setResult('');
      }
      // If there is already an error (e.g., from input validation), do nothing more
      return;
    }

    setError(''); // Clear previous errors before attempting conversion
    setResult(''); // Clear previous result

    try {
      const convertedValue = convertUnit(inputValue, fromUnit, toUnit);
      if (convertedValue.startsWith('錯誤：')) {
        setError(convertedValue); // Set error state if conversion returns an error message
        setResult('');
      } else {
        setResult(convertedValue); // Set result on success
        setError(''); // Clear error on success
      }
    } catch (err) {
        // This catch block might be redundant now as convertUnit handles internal errors
        // But keep it as a safeguard for unexpected issues
        console.error('Unexpected conversion error in component:', err);
        setError('錯誤：轉換時發生未預期的問題。');
        setResult('');
    }
  }, [inputValue, fromUnit, toUnit, error]); // Add error to dependency array

  // 自動轉換（當輸入或單位改變時, 且輸入有效）
  useEffect(() => {
    // Only auto-convert if input is not empty and there is no current error
    if (inputValue && !error) {
      void handleConvert();
    }
    // If input becomes empty, clear result
    if (!inputValue) {
        setResult('');
        // We might want to clear error too, handled in handleInputChange
    }
  }, [inputValue, fromUnit, toUnit, error, handleConvert]); // Add error and handleConvert

  return (
    <Card>
      <h2>以太坊單位轉換器</h2>
      <div className="form-group mt-4">
        <label htmlFor="from-value">數值：</label>
        <NumberInput
          id="from-value"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="輸入數值..."
        />
      </div>

      <div className="form-row mt-4">
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

      {error && (
        <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="form-group mt-4">
        <ConvertButton onConvert={handleConvert} disabled={!!error || !inputValue}>轉換</ConvertButton>
      </div>

      {result && !error && (
        <div className="result-container mt-4">
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
