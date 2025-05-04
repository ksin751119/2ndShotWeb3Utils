import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'text';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: React.ReactNode;
}

const getButtonStyle = (variant: ButtonVariant, disabled: boolean): React.CSSProperties => {
  switch (variant) {
    case 'primary':
      return {
        background: disabled ? '#ccc' : 'var(--secondary-color)',
        color: 'var(--primary-color)',
        border: 'none',
      };
    case 'secondary':
      return {
        background: disabled ? '#eee' : 'var(--primary-color)',
        color: 'var(--secondary-color)',
        border: '1.5px solid var(--secondary-color)',
      };
    case 'text':
    default:
      return {
        background: 'none',
        color: 'var(--secondary-color)',
        border: 'none',
      };
  }
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading = false,
  icon,
  children,
  disabled,
  style,
  ...rest
}) => {
  return (
    <button
      disabled={Boolean(disabled) || Boolean(loading)}
      style={{
        ...getButtonStyle(variant, Boolean(disabled)),
        padding: '0.5rem 1.2rem',
        borderRadius: 6,
        fontWeight: 600,
        fontSize: '1rem',
        cursor: Boolean(disabled) || Boolean(loading) ? 'not-allowed' : 'pointer',
        opacity: Boolean(disabled) || Boolean(loading) ? 0.7 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style,
      }}
      {...rest}
    >
      {Boolean(loading) ? (
        <span style={{ fontSize: 16 }}>⏳</span>
      ) : (
        icon !== undefined && icon !== null && <span style={{ fontSize: 18 }}>{icon}</span>
      )}
      {children !== undefined && children !== null && children}
    </button>
  );
};

export default Button;
