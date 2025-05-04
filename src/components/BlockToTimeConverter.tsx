import React, { useState, useCallback } from 'react';
import Card from './Card'; // Import the custom Card component
import NumberInput from './NumberInput'; // Import NumberInput
import ConvertButton from './ConvertButton'; // Import ConvertButton
import CopyButton from './CopyButton';
import { isValidBlockNumberString, getBlockTimestamp, convertTimestampToTaipeiString } from '../utils/timeConverter'; // Make sure convertTimestampToTaipeiString is imported
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';

const BlockToTimeConverter: React.FC = () => {
  const [blockNumberInput, setBlockNumberInput] = useState<string>('');
  const [blockResultTimestamp, setBlockResultTimestamp] = useState<string>('');
  const [blockResultDate, setBlockResultDate] = useState<string>('');
  const [blockError, setBlockError] = useState<string>('');
  const [blockLoading, setBlockLoading] = useState<boolean>(false);

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

    setBlockLoading(true);
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

    setBlockLoading(false);
  }, [blockNumberInput]);

  return (
    <Card>
      <h2>區塊編號 ➔ 時間戳 & 台北日期</h2>
      {/* Input Group */}
      <div className="space-y-2 mt-4">
        <Label htmlFor="block-number-input">輸入區塊編號</Label>
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

      {/* Button Group - Use ConvertButton */}
      <div className="mt-4">
        <ConvertButton
          onConvert={handleBlockNumberConvert} // Pass the existing async handler
          disabled={!blockNumberInput || blockLoading || !!blockError}
        >
          {/* Original Button content might need slight adjustment if ConvertButton doesn't handle loading icon internally */}
          {/* Assuming ConvertButton handles loading state internally based on its code */}
          獲取區塊時間
        </ConvertButton>
      </div>

      {/* Result Section - Separate group */}
      {(blockResultTimestamp || blockResultDate) && !blockError && ( // Only show results if no error
            <div className="mt-4 p-2 border rounded bg-muted space-y-1"> {/* Add margin-top */}
                {blockResultTimestamp && (
                    <div>
                        <span className="text-xs text-muted-foreground">時間戳 (秒):</span>
                        <p className="font-mono text-sm break-all">{blockResultTimestamp}</p>
                        <CopyButton text={blockResultTimestamp} variant="secondary">
                            複製時間戳
                        </CopyButton>
                    </div>
                )}
                  {blockResultDate && (
                      <div>
                          <span className="text-xs text-muted-foreground">台北日期:</span>
                          <p className="font-mono text-sm break-all">{blockResultDate}</p>
                          <CopyButton text={blockResultDate} variant="secondary">
                            複製日期
                        </CopyButton>
                      </div>
                  )}
            </div>
      )}
    </Card>
  );
};

export default BlockToTimeConverter;
