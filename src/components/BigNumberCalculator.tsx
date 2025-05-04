import React, { useState, useCallback } from 'react';
import Input from './Input';
import Card from './Card';
import ConvertButton from './ConvertButton';
import CopyButton from './CopyButton';
import { evaluateExpression } from '../utils/bigNumberCalculator';
import '../styles/tools.css';

const BigNumberCalculator: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 處理表達式輸入變更
  const handleExpressionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpression(e.target.value);
    setError(''); // 清除之前的錯誤
    setResult(''); // 清除之前的結果
  };

  // 執行計算
  const handleCalculate = useCallback(async (): Promise<void> => {
    if (!expression) {
      setResult('');
      setError('');
      return;
    }

    const calculationResult = evaluateExpression(expression);

    // 檢查 evaluateExpression 返回的是否為錯誤訊息
    // (根據 evaluateExpression 的實現，錯誤訊息通常不是純數字)
    const isErrorResult = /[^0-9]/.test(calculationResult) && calculationResult !== '';

    if (isErrorResult) {
      setError(calculationResult);
      setResult('');
    } else {
      setResult(calculationResult);
      setError('');
    }
  }, [expression]);

  return (
    <Card>
      <h2>進階大數計算器</h2>
      <p>輸入數學表達式進行計算，支援大數、括號和運算符優先級。</p>

      <div className="form-group">
        <label htmlFor="expression-input">表達式：</label>
        <Input
          id="expression-input"
          value={expression}
          onChange={handleExpressionChange}
          placeholder="例如：(10n + 5n) * 2n 或 2^100"
          error={Boolean(error)}
          helperText={error || '支援 + - * / ^ % 和括號 ()'}
        />
      </div>

      <div className="form-group">
        {/* 使用 ConvertButton 來觸發計算 */}
        <ConvertButton onConvert={handleCalculate} disabled={!expression}>計算</ConvertButton>
      </div>

      {result && (
        <div className="result-container">
          <h3>計算結果：</h3>
          <div className="result-value">{result}</div>
          <CopyButton text={result}>複製結果</CopyButton>
        </div>
      )}
    </Card>
  );
};

export default BigNumberCalculator;
