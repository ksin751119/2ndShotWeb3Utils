import React, { ReactNode } from 'react';

interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Card: React.FC<CardProps> = ({ header, footer, children, style, className }) => {
  return (
    <div
      className={className}
      style={{
        background: '#fff',
        borderRadius: 10,
        boxShadow: '0 2px 8px #0001',
        padding: 24,
        margin: '1.5rem 0',
        ...style,
      }}
    >
      {header && <div style={{ marginBottom: 16, fontWeight: 600, fontSize: '1.15rem' }}>{header}</div>}
      <div>{children}</div>
      {footer && <div style={{ marginTop: 16 }}>{footer}</div>}
    </div>
  );
};

export default Card;
