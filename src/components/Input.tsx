import React from 'react';

export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  error?: boolean;
  helperText?: string;
  name?: string;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  type = 'text',
  error = false,
  helperText,
  name,
  autoComplete,
}) => {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        name={name}
        autoComplete={autoComplete}
        style={{
          width: '100%',
          padding: '0.5rem 0.75rem',
          border: error ? '1.5px solid #e53935' : '1.5px solid #ccc',
          borderRadius: 6,
          fontSize: '1rem',
          outline: 'none',
          background: disabled ? '#f5f5f5' : '#fff',
          color: '#222',
          boxSizing: 'border-box',
        }}
      />
      {helperText !== undefined && helperText !== null && helperText !== '' && (
        <div style={{ color: error ? '#e53935' : '#888', fontSize: '0.92rem', marginTop: 4 }}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Input;
