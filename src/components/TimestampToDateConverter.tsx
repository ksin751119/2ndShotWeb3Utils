import React, { useState, useCallback } from 'react';
import Card from './Card'; // Import the custom Card component
import NumberInput from './NumberInput'; // Import NumberInput
import ConvertButton from './ConvertButton'; // Import ConvertButton
import CopyButton from './CopyButton';
import { isValidTimestampString, convertTimestampToTaipeiString } from '../utils/timeConverter';
import { Alert, AlertDescription } from './ui/alert';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './ui/tooltip';

const TimestampToDateConverter: React.FC = () => {
  const [timestampInput, setTimestampInput] = useState<string>('');
  const [timestampResult, setTimestampResult] = useState<string>('');
  const [timestampError, setTimestampError] = useState<string>('');

  const handleTimestampInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTimestampInput(value);
    setTimestampError(''); // Clear error on input change
    if (!isValidTimestampString(value)) {
        setTimestampError('請輸入有效的數字時間戳');
    } else {
        setTimestampError(''); // Clear error if valid
    }
  };

  const handleTimestampConvert = useCallback(() => {
    if (!isValidTimestampString(timestampInput)) {
      setTimestampError('錯誤：時間戳必須是純數字');
      setTimestampResult('');
      return;
    }
    // Ensure error is cleared if conversion is attempted with valid input format
    setTimestampError('');
    const result = convertTimestampToTaipeiString(timestampInput);
    if (result.startsWith('錯誤：')) {
      setTimestampError(result);
      setTimestampResult('');
    } else {
      setTimestampResult(result);
      // Error should already be cleared, but ensure it is
      setTimestampError('');
    }
  }, [timestampInput]);

  // Ensure handler matches expected type for ConvertButton
  const handleTimestampConvertAsync = useCallback(async (): Promise<void> => {
    handleTimestampConvert(); // Call the original synchronous handler
    // ConvertButton expects a Promise, so we wrap the original call.
    // If handleTimestampConvert were async, we would await it here.
  }, [handleTimestampConvert]);

  return (
    <Card>
      <h2>Unix 時間戳 ➔ 台北日期</h2>
      {/* Input Group */}
      <div className="space-y-2 mt-4">
        <label htmlFor="timestamp-input">輸入 Unix 時間戳 (秒或毫秒)</label>
        <NumberInput
          id="timestamp-input"
          placeholder="例如: 1678886400 或 1678886400000"
          value={timestampInput}
          onChange={handleTimestampInputChange}
        />
         {/* Error Alert - Keep close to input */}
         {timestampError && (
            <Alert variant="destructive" className="mt-2">
                <AlertDescription>{timestampError}</AlertDescription>
            </Alert>
        )}
      </div>

      {/* Button Group with Tooltip */}
      <div className="mt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
               <ConvertButton onConvert={handleTimestampConvertAsync} disabled={!timestampInput || !!timestampError}>
                 轉換為台北時間
               </ConvertButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>將輸入的 Unix 時間戳轉換為台北時區日期</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Result Section with Tooltip on Copy Button */}
      {timestampResult && !timestampError && (
        <div className="result-container">
          <h3>轉換結果：</h3>
          <div className="result-value">{timestampResult}</div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                 <CopyButton text={timestampResult}>
                   複製日期
                 </CopyButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>將轉換後的日期複製到剪貼簿</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </Card>
  );
};

export default TimestampToDateConverter;
