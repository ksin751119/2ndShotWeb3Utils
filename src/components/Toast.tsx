import React from 'react';
import { Toast } from './ToastContext';

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const getColor = (type: string) => {
  switch (type) {
    case 'success':
      return '#43a047';
    case 'error':
      return '#e53935';
    case 'warning':
      return '#fbc02d';
    case 'info':
    default:
      return '#1976d2';
  }
};

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  return (
    <div
      style={{
        minWidth: 220,
        background: '#fff',
        color: getColor(toast.type),
        border: `1.5px solid ${getColor(toast.type)}`,
        borderRadius: 8,
        boxShadow: '0 2px 8px #0002',
        padding: '0.7rem 1.2rem',
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontSize: '1rem',
        position: 'relative',
      }}
      role="status"
    >
      <span style={{ fontSize: 20 }}>
        {toast.type === 'success' && '✅'}
        {toast.type === 'error' && '❌'}
        {toast.type === 'warning' && '⚠️'}
        {toast.type === 'info' && 'ℹ️'}
      </span>
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#888',
          fontSize: 18,
          cursor: 'pointer',
          position: 'absolute',
          right: 8,
          top: 4,
        }}
        aria-label="關閉通知"
      >
        ×
      </button>
    </div>
  );
};

export default ToastItem;
