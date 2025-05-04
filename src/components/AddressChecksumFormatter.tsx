import React, { useState, useCallback } from 'react';
// Change imports from shadcn/ui to custom components
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import Card from './Card';
// import { Input } from './ui/input';
import Input from './Input';
// import { Label } from './ui/label'; // Use standard label
// import { Button } from './ui/button'; // Use standard button or check CopyButton's implementation
import Button from './Button'; // Assuming custom Button exists
import CopyButton from './CopyButton';
// import { Alert, AlertDescription } from './ui/alert'; // Use simple text for error
import { formatChecksumAddress } from '../utils/addressUtils';
import '../styles/tools.css'; // Ensure CSS is imported

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
    // Use custom Card
    <Card>
      {/* Use h2 and p like BaseConverter */}
      <h2>地址校驗和格式化</h2>
      <p>將以太坊地址轉換為標準的 EIP-55 校驗和格式。</p>

      {/* Use form-group and standard label */}
      <div className="form-group">
        <label htmlFor="input-address">輸入地址</label>
        {/* Use custom Input */}
        <Input
          id="input-address"
          placeholder="0x..."
          value={inputAddress}
          onChange={handleInputChange}
          error={!!error} // Pass boolean for error state
          helperText={error} // Pass error string as helper text
        />
      </div>

      {/* Use custom Button - check if Button component exists and props */}
       <Button onClick={handleFormat} disabled={!inputAddress}>格式化地址</Button>

      {/* Display result in a div, similar to BaseConverter's copy buttons */}
      {formattedAddress && (
        <div className="result-container"> {/* Optional: Use result-container class? */}
           <label>格式化地址 (EIP-55)</label>
           <div className="flex items-center space-x-2 mt-1"> {/* Basic flex layout */}
             <p className="font-mono text-sm break-all flex-grow bg-gray-100 p-2 rounded">{formattedAddress}</p>
             <CopyButton text={formattedAddress}>複製</CopyButton>
           </div>
        </div>
      )}
    </Card>
  );
};
