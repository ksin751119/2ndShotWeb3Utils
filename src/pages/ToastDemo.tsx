import React from 'react';
import Button from '../components/Button';
import { useToast } from '../components/ToastContext';

const ToastDemo: React.FC = () => {
  const toast = useToast();

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
      <h2>Toast/Notification 測試</h2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button onClick={() => toast.show('操作成功！', 'success')} variant="primary">顯示 Success</Button>
        <Button onClick={() => toast.show('發生錯誤', 'error')} variant="secondary">顯示 Error</Button>
        <Button onClick={() => toast.show('警告訊息', 'warning')} variant="text">顯示 Warning</Button>
        <Button onClick={() => toast.show('一般通知', 'info')} variant="primary">顯示 Info</Button>
      </div>
      <div style={{ marginTop: 32, color: '#888', fontSize: '0.98rem' }}>
        點擊上方按鈕可觸發不同類型的 Toast 通知，通知會自動消失，也可手動關閉。
      </div>
    </div>
  );
};

export default ToastDemo;
