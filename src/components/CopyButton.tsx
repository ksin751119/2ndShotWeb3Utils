import React, { useState } from 'react';
import Button, { ButtonProps } from './Button';

interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  text: string; // 要複製的內容
  successText?: string;
  errorText?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  children,
  successText = '✔️ 已複製',
  errorText = '❌ 複製失敗',
  disabled,
  ...rest
}) => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 1200);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 1200);
    }
  };

  let displayText = children;
  if (status === 'success') displayText = successText;
  if (status === 'error') displayText = errorText;

  return (
    <Button
      {...rest}
      onClick={handleCopy}
      disabled={Boolean(disabled) || status === 'success'}
      variant="secondary"
      icon={status === 'success' ? '✔️' : status === 'error' ? '❌' : (rest.icon !== undefined && rest.icon !== null ? rest.icon : '📋')}
    >
      {displayText}
    </Button>
  );
};

export default CopyButton;
