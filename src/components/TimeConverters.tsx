import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input'; // Assuming generic Input might be needed, or use NumberInput if available
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/CopyButton'; // To this (default import)
import { isValidTimestampString, convertTimestampToTaipeiString, isValidBlockNumberString, getBlockTimestamp } from '@/utils/timeConverter'; // Using alias for utils
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react'; // Keep this as lucide-react is a package

export const TimeConverters: React.FC = () => {
  // State for Timestamp to Date Converter
  const [timestampInput, setTimestampInput] = useState<string>('');
  const [timestampResult, setTimestampResult] = useState<string>('');
  const [timestampError, setTimestampError] = useState<string>('');

  // State for Block Number to Timestamp/Date Converter
  const [blockNumberInput, setBlockNumberInput] = useState<string>('');
  const [blockResultTimestamp, setBlockResultTimestamp] = useState<string>('');
  const [blockResultDate, setBlockResultDate] = useState<string>('');
  const [blockError, setBlockError] = useState<string>('');
  const [blockLoading, setBlockLoading] = useState<boolean>(false);

  // --- Handlers for Timestamp to Date Converter ---
  const handleTimestampInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTimestampInput(value);
    setTimestampError(''); // Clear error on input change
    if (!isValidTimestampString(value)) {
        setTimestampError('請輸入有效的數字時間戳');
    }
  };

  const handleTimestampConvert = useCallback(() => {
    if (!isValidTimestampString(timestampInput)) {
      setTimestampError('錯誤：時間戳必須是純數字');
      setTimestampResult('');
      return;
    }
    const result = convertTimestampToTaipeiString(timestampInput);
    if (result.startsWith('錯誤：')) {
      setTimestampError(result);
      setTimestampResult('');
    } else {
      setTimestampResult(result);
      setTimestampError('');
    }
  }, [timestampInput]);

  // --- Handlers for Block Number to Timestamp/Date Converter ---
   const handleBlockNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBlockNumberInput(value);
    setBlockError(''); // Clear error on input change
    if (!isValidBlockNumberString(value)) {
        setBlockError('請輸入有效的非負整數區塊編號');
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
        // Should not happen based on getBlockTimestamp return type, but handle defensively
        setBlockError('錯誤：獲取區塊時間戳時返回未知的結果類型');
    }

    setBlockLoading(false);
  }, [blockNumberInput]);


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>時間轉換工具</CardTitle>
        <CardDescription>在 Unix 時間戳、日期和區塊編號之間進行轉換。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timestamp to Date Section */}
        <div className="space-y-2">
          <h3 className="font-medium">Unix 時間戳 ➔ 台北日期</h3>
          <Label htmlFor="timestamp-input">輸入 Unix 時間戳 (秒或毫秒)</Label>
          <Input
            id="timestamp-input"
            type="text" // Use text to allow potentially large numbers beyond JS number limits initially
            inputMode="numeric" // Hint for mobile keyboards
            pattern="[0-9]*" // Pattern for numeric input
            placeholder="例如: 1678886400 或 1678886400000"
            value={timestampInput}
            onChange={handleTimestampInputChange}
            className={timestampError ? 'border-red-500' : ''}
          />
          {timestampError && (
              <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{timestampError}</AlertDescription>
              </Alert>
          )}
          <Button onClick={handleTimestampConvert} disabled={!timestampInput || !!timestampError}>
            轉換為台北時間
          </Button>
          {timestampResult && (
            <div className="mt-2 p-2 border rounded bg-muted">
              <p className="font-mono text-sm break-all">{timestampResult}</p>
              <CopyButton text={timestampResult}>
                複製日期
              </CopyButton>
            </div>
          )}
        </div>

        <Separator />

        {/* Block Number to Timestamp/Date Section */}
        <div className="space-y-2">
          <h3 className="font-medium">區塊編號 ➔ 時間戳 & 台北日期</h3>
           <Label htmlFor="block-number-input">輸入區塊編號</Label>
           <Input
            id="block-number-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="例如: 18000000"
            value={blockNumberInput}
            onChange={handleBlockNumberInputChange}
            className={blockError ? 'border-red-500' : ''}
           />
           {blockError && (
              <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{blockError}</AlertDescription>
              </Alert>
           )}
           <Button onClick={handleBlockNumberConvert} disabled={!blockNumberInput || blockLoading || !!blockError}>
            {blockLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {blockLoading ? '查詢中...' : '獲取區塊時間'}
           </Button>
           {(blockResultTimestamp || blockResultDate) && !blockError && (
                <div className="mt-2 p-2 border rounded bg-muted space-y-1">
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
        </div>
      </CardContent>
    </Card>
  );
};
