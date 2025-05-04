import React, { useState, useCallback } from 'react';
import Card from './Card';
import Input from './Input';
import ConvertButton from './ConvertButton';
import CopyButton from './CopyButton';
import { publicKeyToAddress } from '../utils/addressUtils';
import '../styles/tools.css';
import { Alert, AlertDescription } from './ui/alert';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './ui/tooltip';

export const PublicKeyToAddressConverter: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string>('');
  const [derivedAddress, setDerivedAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleConvertAsync = useCallback(async (): Promise<void> => {
    setError('');
    setDerivedAddress('');
    const result = publicKeyToAddress(publicKey);
    if (result.startsWith('錯誤：')) {
      setError(result);
    } else {
      setDerivedAddress(result);
      setError('');
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

      <div className="form-group mt-4">
        <label htmlFor="input-public-key">輸入公鑰</label>
        <Input
          id="input-public-key"
          placeholder="0x... (壓縮或非壓縮格式)"
          value={publicKey}
          onChange={handleInputChange}
        />
      </div>

      {error && (
          <Alert variant="destructive" className="mt-2">
              <AlertDescription>{error}</AlertDescription>
          </Alert>
      )}

      <div className="form-group mt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ConvertButton onConvert={handleConvertAsync} disabled={!publicKey || !!error}>
                計算地址
              </ConvertButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>從輸入的公鑰計算出以太坊地址</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {derivedAddress && !error && (
         <div className="result-container mt-4">
           <h3>計算出的地址 (EIP-55)</h3>
           <div className="result-value">{derivedAddress}</div>
           <TooltipProvider>
             <Tooltip>
               <TooltipTrigger asChild>
                 <CopyButton text={derivedAddress}>複製</CopyButton>
               </TooltipTrigger>
               <TooltipContent>
                 <p>複製計算出的地址</p>
               </TooltipContent>
             </Tooltip>
           </TooltipProvider>
         </div>
      )}
    </Card>
  );
};
