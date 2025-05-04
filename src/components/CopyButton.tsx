import React, { useState } from 'react';
import { toast } from 'sonner'; // Import toast function
import Button, { ButtonProps } from './Button';

interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  text: string; // 要複製的內容
  // Remove successText and errorText as we now use toasts
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  children,
  disabled,
  ...rest
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false); // Simpler state to prevent rapid re-clicks

  const handleCopy = async () => {
    if (isCopied) return; // Prevent action if already recently copied

    try {
      await navigator.clipboard.writeText(text);
      toast.success('已成功複製到剪貼簿！'); // Show success toast
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500); // Reset state after 1.5s
    } catch (err) {
      console.error('複製失敗:', err);
      toast.error('複製到剪貼簿失敗！'); // Show error toast
      setIsCopied(false); // Ensure state is reset on error
    }
  };

  // Keep original children, no text/icon changes needed
  // const displayText = children;
  // if (status === 'success') displayText = successText;
  // if (status === 'error') displayText = errorText;

  return (
    <Button
      {...rest}
      onClick={handleCopy}
      // Disable briefly after successful copy
      disabled={Boolean(disabled) || isCopied}
      variant="secondary"
      // Use default icon or passed icon, don't change based on status
      icon={rest.icon !== undefined && rest.icon !== null ? rest.icon : '📋'}
    >
      {children}
    </Button>
  );
};

export default CopyButton;
