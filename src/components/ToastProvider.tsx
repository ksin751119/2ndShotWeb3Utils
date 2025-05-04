import React, { useState, useCallback, useRef } from 'react';
import { ToastContext, Toast, ToastType } from './ToastContext';
import ToastItem from './Toast';

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = `toast_${Date.now()}_${idRef.current++}`;
    setToasts(ts => [...ts, { id, message, type }]);
    setTimeout(() => {
      setToasts(ts => ts.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(ts => ts.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999 }}>
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onClose={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
