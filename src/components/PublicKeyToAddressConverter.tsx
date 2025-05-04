import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import CopyButton from './CopyButton';
import { Alert, AlertDescription } from './ui/alert';
import { publicKeyToAddress } from '../utils/addressUtils';

export const PublicKeyToAddressConverter: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string>('');
  const [derivedAddress, setDerivedAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleConvert = useCallback(() => {
    setError('');
    setDerivedAddress('');
    const result = publicKeyToAddress(publicKey);
    if (result.startsWith('錯誤：')) {
      setError(result);
    } else {
      setDerivedAddress(result);
    }
  }, [publicKey]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKey(event.target.value);
    setDerivedAddress('');
    setError('');
  }, []);

  return (
    <Card className="mt-6"> {/* Add margin top for spacing */}
      <CardHeader>
        <CardTitle>公鑰到地址轉換器</CardTitle>
        <CardDescription>從以太坊公鑰計算出對應的地址。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input-public-key">輸入公鑰</Label>
          <Input
            id="input-public-key"
            placeholder="0x... (壓縮或非壓縮格式)"
            value={publicKey}
            onChange={handleInputChange}
            className={error ? 'border-red-500' : ''}
          />
        </div>

        <Button onClick={handleConvert} disabled={!publicKey}>計算地址</Button>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {derivedAddress && (
          <div className="space-y-2">
            <Label>計算出的地址 (EIP-55)</Label>
            <div className="flex items-center space-x-2 p-2 border rounded bg-muted">
              <p className="font-mono text-sm break-all flex-grow">{derivedAddress}</p>
              <CopyButton text={derivedAddress} variant="secondary">
                複製
              </CopyButton>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
