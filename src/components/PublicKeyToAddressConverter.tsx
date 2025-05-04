import React, { useState, useCallback } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import CopyButton from './CopyButton';
import { publicKeyToAddress } from '../utils/addressUtils';
import '../styles/tools.css';

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
    <Card>
      <h2>公鑰到地址轉換器</h2>
      <p>從以太坊公鑰計算出對應的地址。</p>

      <div className="form-group">
        <label htmlFor="input-public-key">輸入公鑰</label>
        <Input
          id="input-public-key"
          placeholder="0x... (壓縮或非壓縮格式)"
          value={publicKey}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
        />
      </div>

      <Button onClick={handleConvert} disabled={!publicKey}>計算地址</Button>

      {derivedAddress && (
         <div className="result-container">
           <label>計算出的地址 (EIP-55)</label>
           <div className="flex items-center space-x-2 mt-1">
             <p className="font-mono text-sm break-all flex-grow bg-gray-100 p-2 rounded">{derivedAddress}</p>
             <CopyButton text={derivedAddress}>複製</CopyButton>
           </div>
         </div>
      )}
    </Card>
  );
};
