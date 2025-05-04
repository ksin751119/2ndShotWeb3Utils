import React from 'react';
import EthUnitConverter from '../components/EthUnitConverter';
import '../styles/tools.css';

const NumberTools: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Number Tools</h1>
      <div className="tools-grid">
        <EthUnitConverter />
        {/* 未來可加入其他數字相關工具 */}
      </div>
    </div>
  );
};

export default NumberTools;
