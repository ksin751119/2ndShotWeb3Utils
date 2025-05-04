import React from 'react';

export type ErrorMessageType = 'error' | 'warning' | 'info';

interface ErrorMessageProps {
  message: string;
  type?: ErrorMessageType;
  style?: React.CSSProperties;
  className?: string;
}

const getColor = (type: ErrorMessageType) => {
  switch (type) {
    case 'error':
      return '#e53935';
    case 'warning':
      return '#fbc02d';
    case 'info':
    default:
      return '#1976d2';
  }
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, type = 'error', style, className }) => {
  if (!message) return null;
  return (
    <div
      className={className}
      style={{
        color: getColor(type),
        background: type === 'error' ? '#fdecea' : type === 'warning' ? '#fff8e1' : '#e3f2fd',
        border: `1.5px solid ${getColor(type)}`,
        borderRadius: 6,
        padding: '0.5rem 1rem',
        fontSize: '0.98rem',
        margin: '0.5rem 0',
        ...style,
      }}
      role={type === 'error' ? 'alert' : undefined}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
