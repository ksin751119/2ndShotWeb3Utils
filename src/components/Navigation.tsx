import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Number Tools', path: '/number-tools' },
  { label: 'Time Tools', path: '/time-tools' },
  { label: 'Address Tools', path: '/address-tools' },
  { label: 'Dev Tools', path: '/dev-tools' },
];

const Navigation: React.FC = () => {
  const location = useLocation();
  return (
    <nav>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {navItems.map((item) => (
          <li key={item.path} style={{ margin: '1rem 0' }}>
            <Link
              to={item.path}
              style={{
                color: 'var(--primary-color)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '1.1rem',
                padding: '0.5rem 1rem',
                borderRadius: 6,
                display: 'block',
                transition: 'background 0.2s',
                background:
                  location.pathname === item.path
                    ? 'rgba(255,255,255,0.12)'
                    : 'none',
              }}
              onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseOut={e => (e.currentTarget.style.background = location.pathname === item.path ? 'rgba(255,255,255,0.12)' : 'none')}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
