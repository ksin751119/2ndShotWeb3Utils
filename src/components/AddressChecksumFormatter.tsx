import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import CopyButton from './CopyButton'; // Assuming default export
import { Alert, AlertDescription } from './ui/alert';
import { formatChecksumAddress } from '../utils/addressUtils';

export const AddressChecksumFormatter: React.FC = () => {
  const [inputAddress, setInputAddress] = useState<string>('');
  const [formattedAddress, setFormattedAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFormat = useCallback(() => {
    setError('');
    setFormattedAddress('');
    const result = formatChecksumAddress(inputAddress);
    if (result.startsWith('錯誤：')) {
      setError(result);
    } else {
      setFormattedAddress(result);
    }
  }, [inputAddress]);

  // 可以選擇即時格式化，或者點擊按鈕格式化
  // 這裡使用按鈕觸發
  // const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  //   const addr = event.target.value;
  //   setInputAddress(addr);
  //   setError('');
  //   const result = formatChecksumAddress(addr);
  //    if (result.startsWith('錯誤：')) {
  //      setError(result);
  //      setFormattedAddress('');
  //    } else {
  //      setFormattedAddress(result);
  //    }
  // }, []);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setInputAddress(event.target.value);
      // 清除之前的結果和錯誤，等待按鈕觸發
      setFormattedAddress('');
      setError('');
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>地址校驗和格式化</CardTitle>
        <CardDescription>將以太坊地址轉換為標準的 EIP-55 校驗和格式。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input-address">輸入地址</Label>
          <Input
            id="input-address"
            placeholder="0x... 或 ENS 名稱 (格式化僅適用於地址)"
            value={inputAddress}
            onChange={handleInputChange}
            className={error ? 'border-red-500' : ''}
          />
        </div>

        <Button onClick={handleFormat} disabled={!inputAddress}>格式化地址</Button>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {formattedAddress && (
          <div className="space-y-2">
            <Label>格式化地址 (EIP-55)</Label>
            <div className="flex items-center space-x-2 p-2 border rounded bg-muted">
              <p className="font-mono text-sm break-all flex-grow">{formattedAddress}</p>
              <CopyButton text={formattedAddress} variant="secondary">
                複製
              </CopyButton>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
