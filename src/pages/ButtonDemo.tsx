import React, { useState } from 'react';
import Button from '../components/Button';
import ConvertButton from '../components/ConvertButton';
import CopyButton from '../components/CopyButton';

const ButtonDemo: React.FC = () => {
  const [convertCount, setConvertCount] = useState(0);
  const [copyText, setCopyText] = useState('這是要複製的內容');

  const handleConvert = async () => {
    await new Promise(res => setTimeout(res, 1000));
    setConvertCount(c => c + 1);
  };

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
      <h2>按鈕元件測試</h2>
      <div style={{ marginBottom: 24 }}>
        <Button>Primary Button</Button>{' '}
        <Button variant="secondary">Secondary Button</Button>{' '}
        <Button variant="text">Text Button</Button>
      </div>
      <div style={{ marginBottom: 24 }}>
        <ConvertButton onConvert={handleConvert}>
          轉換（Async）
        </ConvertButton>
        <span style={{ marginLeft: 16 }}>已轉換次數：{convertCount}</span>
      </div>
      <div style={{ marginBottom: 24 }}>
        <input
          value={copyText}
          onChange={e => setCopyText(e.target.value)}
          style={{ width: 220, marginRight: 8, padding: '0.4rem' }}
        />
        <CopyButton text={copyText}>複製內容</CopyButton>
      </div>
    </div>
  );
};

export default ButtonDemo;
