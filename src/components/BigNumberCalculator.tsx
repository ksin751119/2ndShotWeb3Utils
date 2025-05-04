import React, { useState, useCallback } from 'react';
import Input from './Input';
import Card from './Card';
import ConvertButton from './ConvertButton';
import CopyButton from './CopyButton';
import { evaluateExpression } from '../utils/bigNumberCalculator';
import '../styles/tools.css';
import { Alert, AlertDescription } from './ui/alert';

const BigNumberCalculator: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 處理表達式輸入變更
  const handleExpressionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpression(e.target.value);
    setError(''); // Clear error on new input
    setResult(''); // Clear result on new input
  };

  // 執行計算
  const handleCalculate = useCallback(async (): Promise<void> => {
    if (!expression) {
      setResult('');
      setError(''); // Ensure error is clear if expression is empty
      return;
    }

    setError(''); // Clear previous error before calculating
    setResult(''); // Clear previous result
    const calculationResult = evaluateExpression(expression);

    // Check if the result string starts with the error prefix
    if (calculationResult.startsWith('錯誤：')) {
      setError(calculationResult);
      setResult(''); // Ensure result is empty on error
    } else {
      setResult(calculationResult);
      setError(''); // Ensure error is empty on success
    }
  }, [expression]);

  return (
    <Card>
      <h2>進階大數計算器</h2>
      <p>輸入數學表達式進行計算，支援大數、括號和運算符優先級。</p>

      <div className="form-group mt-4">
        <label htmlFor="expression-input">表達式：</label>
        <Input
          id="expression-input"
          value={expression}
          onChange={handleExpressionChange}
          placeholder="例如：(10n + 5n) * 2n 或 2^100"
        />
      </div>

      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="form-group mt-4">
        <ConvertButton onConvert={handleCalculate} disabled={!expression || !!error}>
          計算
        </ConvertButton>
      </div>

      {result && !error && (
        <div className="result-container mt-4">
          <h3>計算結果：</h3>
          <div className="result-value">{result}</div>
          <CopyButton text={result}>複製結果</CopyButton>
        </div>
      )}
    </Card>
  );
};

export default BigNumberCalculator;
