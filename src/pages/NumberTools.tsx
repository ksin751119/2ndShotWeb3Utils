import React from 'react';
import EthUnitConverter from '../components/EthUnitConverter';
import BaseConverter from '../components/BaseConverter';
import BigNumberCalculator from '../components/BigNumberCalculator';
import NumberToolsIntegrator from '../components/NumberToolsIntegrator';
import '../styles/tools.css';

const NumberTools: React.FC = () => {
  return (
    <div className="page-container">
      <h1>數值工具</h1>
      <div className="tools-grid">
        <EthUnitConverter />
        <BaseConverter />
        <BigNumberCalculator />
        <NumberToolsIntegrator />
      </div>
    </div>
  );
};

export default NumberTools;
