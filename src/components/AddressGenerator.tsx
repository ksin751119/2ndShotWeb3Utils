import React, { useState, useCallback } from 'react';
import Card from './Card';
import Button from './Button';
import CopyButton from './CopyButton';
import Input from './Input';
import { Checkbox } from './ui/checkbox';
import { generateEthereumKeyPair } from '../utils/addressUtils';
import { Eye, EyeOff, AlertTriangle, Trash2 } from 'lucide-react';
import '../styles/tools.css';
import { Alert, AlertDescription } from './ui/alert';

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
    setKeyPair(null);
    try {
      const newKeyPair = generateEthereumKeyPair();
      setKeyPair(newKeyPair);
      setShowPrivateKey(false);
    } catch (err: unknown) {
        let errorMessage = '錯誤：生成金鑰對時發生未知問題。';
        if (err instanceof Error) {
            errorMessage = `錯誤：${err.message}`;
        } else if (typeof err === 'string') {
            errorMessage = `錯誤：${err}`;
        }
        setError(errorMessage);
        setKeyPair(null);
    }
  }, []);

  const handleClear = useCallback(() => {
    setKeyPair(null);
    setShowPrivateKey(false);
    setError('');
  }, []);

  return (
    <Card>
      <h2>以太坊地址生成器</h2>
      <p>生成新的隨機私鑰、公鑰和地址。</p>

      <div className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50">
          <h3 className="font-bold flex items-center"><AlertTriangle className="h-5 w-5 mr-2" />安全警告！</h3>
          <ul className="list-disc list-inside text-sm mt-2">
              <li>**私鑰即資產！** 絕不要與任何人分享您的私鑰...</li>
              <li>在瀏覽器中生成私鑰**存在風險**...</li>
              <li>為了最大程度的安全性，請考慮使用硬體錢包...</li>
              <li>請務必在安全的地方**備份**您的私鑰...</li>
          </ul>
      </div>

      <div className="button-row mb-4">
          <Button onClick={handleGenerate}>生成新金鑰對</Button>
          {keyPair && (
              <Button variant="secondary" onClick={handleClear}>
                  <Trash2 className="mr-2 h-4 w-4" /> 清除
              </Button>
          )}
      </div>

      {error && (
          <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
          </Alert>
      )}

      {keyPair && (
        <div className="pt-4 border-t">
          <div className="form-group">
            <label htmlFor="private-key">私鑰 (Private Key)</label>
            <div className="flex items-center space-x-2">
              <Input
                  id="private-key"
                  readOnly
                  type={showPrivateKey ? 'text' : 'password'}
                  value={keyPair.privateKey}
                  onChange={() => {}}
                  className="font-mono flex-grow"
              />
              <Button variant="secondary" onClick={() => setShowPrivateKey(!showPrivateKey)}>
                  {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <CopyButton text={keyPair.privateKey}>複製</CopyButton>
            </div>
            <div className="flex items-center space-x-2 mt-2">
                 <Checkbox
                    id="show-pk-checkbox"
                    checked={showPrivateKey}
                    onCheckedChange={() => setShowPrivateKey(!showPrivateKey)}
                 />
                <label htmlFor="show-pk-checkbox" className="text-sm text-gray-600 cursor-pointer">
                    顯示私鑰 (請謹慎操作)
                </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="public-key">公鑰 (Public Key)</label>
            <div className="flex items-center space-x-2">
                <Input
                    id="public-key"
                    readOnly
                    value={keyPair.publicKey}
                    onChange={() => {}}
                    className="font-mono flex-grow"
                />
                <CopyButton text={keyPair.publicKey}>複製</CopyButton>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">地址 (Address)</label>
             <div className="flex items-center space-x-2">
                <Input
                    id="address"
                    readOnly
                    value={keyPair.address}
                    onChange={() => {}}
                    className="font-mono flex-grow"
                />
                <CopyButton text={keyPair.address}>複製</CopyButton>
             </div>
          </div>
        </div>
      )}
    </Card>
  );
};
