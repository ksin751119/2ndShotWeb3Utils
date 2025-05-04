import React from 'react';
import { JsonParser } from '../components/JsonParser';
import '../styles/tools.css';

const DevTools: React.FC = () => {
  return (
    <div className="page-container">
      {/* <h1>開發工具</h1> */}
      <div className="tools-grid">
         <JsonParser />
         {/* Future Dev tools can be added here */}
      </div>
    </div>
  );
};

export default DevTools;
