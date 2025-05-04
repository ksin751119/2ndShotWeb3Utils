import React, { useState, useCallback } from 'react';
// Change imports from shadcn/ui to custom components
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import Card from './Card';
// import { Input } from './ui/input';
import Input from './Input';
// import { Label } from './ui/label'; // Use standard label
// import { Button } from './ui/button'; // Use standard button or check CopyButton's implementation
import ConvertButton from './ConvertButton'; // Import ConvertButton
import CopyButton from './CopyButton';
import { formatChecksumAddress } from '../utils/addressUtils';
import '../styles/tools.css'; // Ensure CSS is imported
import { Alert, AlertDescription } from './ui/alert'; // Import Alert

export const AddressChecksumFormatter: React.FC = () => {
  const [inputAddress, setInputAddress] = useState<string>('');
  const [formattedAddress, setFormattedAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Wrap the sync function for ConvertButton
  const handleFormatAsync = useCallback(async (): Promise<void> => {
    setError('');
    setFormattedAddress('');
    const result = formatChecksumAddress(inputAddress);
    if (result.startsWith('錯誤：')) {
      setError(result);
    } else {
      setFormattedAddress(result);
      setError(''); // Clear error on success
    }
  }, [inputAddress]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setInputAddress(event.target.value);
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
      <div className="form-group mt-4"> {/* Add margin */}
        <label htmlFor="input-address">輸入地址</label>
        {/* Use custom Input */}
        <Input
          id="input-address"
          placeholder="0x..."
          value={inputAddress}
          onChange={handleInputChange}
        />
      </div>

      {/* Display Error Alert */}
      {error && (
          <Alert variant="destructive" className="mt-2"> {/* Add margin */}
              <AlertDescription>{error}</AlertDescription>
          </Alert>
      )}

      {/* Use ConvertButton */}
       <div className="form-group mt-4"> {/* Add margin */}
           <ConvertButton onConvert={handleFormatAsync} disabled={!inputAddress || !!error}>
               格式化地址
           </ConvertButton>
       </div>

      {/* Result Display - Use result-container and result-value */}
      {formattedAddress && !error && (
        <div className="result-container mt-4"> {/* Use class, add margin */}
           <h3>格式化地址 (EIP-55)</h3> {/* Use H3 */}
           <div className="result-value">{formattedAddress}</div> {/* Use class */}
           <CopyButton text={formattedAddress}>複製</CopyButton>
        </div>
      )}
    </Card>
  );
};
