import React, { useState, useCallback } from 'react';
import Card from './Card'; // Import the custom Card component
import NumberInput from './NumberInput'; // Import NumberInput
import ConvertButton from './ConvertButton'; // Import ConvertButton
import CopyButton from './CopyButton';
import { isValidBlockNumberString, getBlockTimestamp, convertTimestampToTaipeiString } from '../utils/timeConverter'; // Make sure convertTimestampToTaipeiString is imported
import { Alert, AlertDescription } from './ui/alert';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './ui/tooltip';

const BlockToTimeConverter: React.FC = () => {
  const [blockNumberInput, setBlockNumberInput] = useState<string>('');
  const [blockResultTimestamp, setBlockResultTimestamp] = useState<string>('');
  const [blockResultDate, setBlockResultDate] = useState<string>('');
  const [blockError, setBlockError] = useState<string>('');

  const handleBlockNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBlockNumberInput(value);
    setBlockError(''); // Clear error on input change
    if (!isValidBlockNumberString(value)) {
        setBlockError('請輸入有效的非負整數區塊編號');
    } else {
        setBlockError(''); // Clear error if valid
    }
  };

  const handleBlockNumberConvert = useCallback(async () => {
    if (!isValidBlockNumberString(blockNumberInput)) {
      setBlockError('錯誤：區塊編號必須是非負整數');
      setBlockResultTimestamp('');
      setBlockResultDate('');
      return;
    }

    setBlockError('');
    setBlockResultTimestamp('');
    setBlockResultDate('');

    const timestampResult = await getBlockTimestamp(blockNumberInput);

    if (typeof timestampResult === 'string' && timestampResult.startsWith('錯誤：')) {
      setBlockError(timestampResult);
    } else if (typeof timestampResult === 'number') {
      setBlockResultTimestamp(String(timestampResult)); // Store timestamp (seconds)
      const dateString = convertTimestampToTaipeiString(timestampResult);
      if (dateString.startsWith('錯誤：')) {
          setBlockError(`成功獲取時間戳 ${timestampResult}，但轉換日期時出錯: ${dateString}`);
          setBlockResultDate('');
      } else {
          setBlockResultDate(dateString); // Store formatted date string
          setBlockError('');
      }
    } else {
        setBlockError('錯誤：獲取區塊時間戳時返回未知的結果類型');
    }
  }, [blockNumberInput]);

  return (
    <Card>
      <h2>區塊編號 ➔ 時間戳 & 台北日期</h2>
      {/* Input Group */}
      <div className="space-y-2 mt-4">
        <label htmlFor="block-number-input">輸入區塊編號</label>
        <NumberInput
          id="block-number-input"
          placeholder="例如: 18000000"
          value={blockNumberInput}
          onChange={handleBlockNumberInputChange}
        />
        {/* Error Alert - Keep close to input */}
        {blockError && (
            <Alert variant="destructive" className="mt-2">
                <AlertDescription>{blockError}</AlertDescription>
            </Alert>
        )}
      </div>

      {/* Button Group with Tooltip */}
      <div className="mt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
               <ConvertButton
                 onConvert={handleBlockNumberConvert}
                 disabled={!blockNumberInput || !!blockError}
               >
                 獲取區塊時間
               </ConvertButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>查詢輸入區塊編號對應的 Unix 時間戳和日期</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Result Section with Tooltips on Copy Buttons */}
      {(blockResultTimestamp || blockResultDate) && !blockError && (
            <div className="result-container">
                <h3>轉換結果：</h3>
                {blockResultTimestamp && (
                    <div>
                        <span className="text-xs text-muted-foreground">時間戳 (秒):</span>
                        <div className="result-value" style={{marginBottom: '0.5rem'}}>{blockResultTimestamp}</div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <CopyButton text={blockResultTimestamp} variant="secondary">
                                  複製時間戳
                              </CopyButton>
                             </TooltipTrigger>
                             <TooltipContent><p>複製時間戳 (秒)</p></TooltipContent>
                           </Tooltip>
                         </TooltipProvider>
                    </div>
                )}
                {blockResultDate && (
                    <div style={{marginTop: blockResultTimestamp ? '1rem' : '0'}}>
                        <span className="text-xs text-muted-foreground">台北日期:</span>
                        <div className="result-value">{blockResultDate}</div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <CopyButton text={blockResultDate} variant="secondary">
                                複製日期
                              </CopyButton>
                             </TooltipTrigger>
                             <TooltipContent><p>複製轉換後的日期</p></TooltipContent>
                           </Tooltip>
                         </TooltipProvider>
                    </div>
                )}
            </div>
      )}
    </Card>
  );
};

export default BlockToTimeConverter;
