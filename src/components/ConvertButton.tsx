import React, { useState } from 'react';
import Button, { ButtonProps } from './Button';

interface ConvertButtonProps extends Omit<ButtonProps, 'loading'> {
  onConvert: () => Promise<void>;
  disabled?: boolean;
}

const ConvertButton: React.FC<ConvertButtonProps> = ({ onConvert, disabled, children, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setDone(false);
    try {
      await onConvert();
      setDone(true);
      setTimeout(() => setDone(false), 1200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      {...rest}
      disabled={Boolean(disabled) || loading}
      loading={loading}
      onClick={handleClick}
      variant="primary"
    >
      {done ? '✔️ 完成' : children}
    </Button>
  );
};

export default ConvertButton;
