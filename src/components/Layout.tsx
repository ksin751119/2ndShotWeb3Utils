import React, { ReactNode } from 'react';
import '../styles/theme.css';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: 240,
          background: 'var(--secondary-color)',
          color: 'var(--primary-color)',
          padding: '2rem 1rem',
          minHeight: '100vh',
        }}
      >
        <h2 style={{ color: 'var(--primary-color)' }}>2ndShot Web3 Utils</h2>
        <Navigation />
      </aside>
      <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
    </div>
  );
};

export default Layout;
