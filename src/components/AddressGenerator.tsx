import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import CopyButton from './CopyButton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Label } from './ui/label';
import { Input } from './ui/input'; // For displaying keys/address
import { Checkbox } from './ui/checkbox'; // For show/hide private key
import { generateEthereumKeyPair } from '../utils/addressUtils';
import { Eye, EyeOff, AlertTriangle, Trash2 } from 'lucide-react'; // Icons

interface KeyPair {
  privateKey: string;
  publicKey: string;
  address: string;
}

export const AddressGenerator: React.FC = () => {
  const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = useCallback(() => {
    setError('');
    try {
      const newKeyPair = generateEthereumKeyPair();
      setKeyPair(newKeyPair);
      setShowPrivateKey(false); // Always hide new private key by default
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('生成金鑰對時發生未知錯誤。');
        }
       setKeyPair(null); // Clear previous results on error
    }
  }, []);

  const handleClear = useCallback(() => {
    setKeyPair(null);
    setShowPrivateKey(false);
    setError('');
  }, []);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>以太坊地址生成器</CardTitle>
        <CardDescription>生成新的隨機私鑰、公鑰和地址。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Security Warning */}
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>安全警告！</AlertTitle>
          <AlertDescription>
            <ul>
                <li>- **私鑰即資產！** 絕不要與任何人分享您的私鑰，也不要在不安全的網站或應用程式中輸入它。</li>
                <li>- 在瀏覽器中生成私鑰**存在風險**，建議僅用於測試或非重要用途。</li>
                <li>- 為了最大程度的安全性，請考慮使用硬體錢包或在安全的離線環境中生成金鑰。</li>
                <li>- 請務必在安全的地方**備份**您的私鑰，遺失將導致資產永久損失。</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="flex space-x-2">
            <Button onClick={handleGenerate}>生成新金鑰對</Button>
            {keyPair && (
                <Button variant="outline" onClick={handleClear}>
                    <Trash2 className="mr-2 h-4 w-4" /> 清除
                </Button>
            )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {keyPair && (
          <div className="space-y-4 pt-4 border-t">
            {/* Private Key */}
            <div className="space-y-2">
                <Label htmlFor="private-key">私鑰 (Private Key)</Label>
                <div className="flex items-center space-x-2">
                    <Input
                        id="private-key"
                        readOnly
                        type={showPrivateKey ? 'text' : 'password'}
                        value={keyPair.privateKey}
                        className="font-mono flex-grow bg-muted"
                    />
                    <Button variant="outline" size="icon" onClick={() => setShowPrivateKey(!showPrivateKey)}>
                        {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <CopyButton text={keyPair.privateKey} variant="secondary">複製</CopyButton>
                </div>
                <div className="flex items-center space-x-2">
                     <Checkbox
                        id="show-pk-checkbox"
                        checked={showPrivateKey}
                        onCheckedChange={() => setShowPrivateKey(!showPrivateKey)}
                     />
                    <label htmlFor="show-pk-checkbox" className="text-sm text-muted-foreground cursor-pointer">
                        顯示私鑰 (請謹慎操作)
                    </label>
                </div>
            </div>

            {/* Public Key */}
            <div className="space-y-2">
                <Label htmlFor="public-key">公鑰 (Public Key)</Label>
                <div className="flex items-center space-x-2">
                    <Input
                        id="public-key"
                        readOnly
                        value={keyPair.publicKey}
                        className="font-mono flex-grow bg-muted"
                    />
                    <CopyButton text={keyPair.publicKey} variant="secondary">複製</CopyButton>
                </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
                <Label htmlFor="address">地址 (Address)</Label>
                <div className="flex items-center space-x-2">
                    <Input
                        id="address"
                        readOnly
                        value={keyPair.address}
                        className="font-mono flex-grow bg-muted"
                    />
                    <CopyButton text={keyPair.address} variant="secondary">複製</CopyButton>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
