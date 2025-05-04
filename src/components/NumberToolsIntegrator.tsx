import React, { useState } from 'react';
import Card from './Card';
import BaseConverter from './BaseConverter';
import BigNumberCalculator from './BigNumberCalculator';
import '../styles/tools.css';

// 定義可用的工具類型
type ToolType = 'base-converter' | 'big-calculator';

// 統一的工具選擇器介面
const NumberToolsIntegrator: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('base-converter');

  // 選項卡切換處理器
  const handleToolChange = (tool: ToolType) => {
    setActiveTool(tool);
  };

  return (
    <Card>
      <h2>數值工具集成器</h2>
      <p>多種數值工具的整合界面，可在不同工具之間切換</p>

      {/* 工具選擇器按鈕 */}
      <div className="tool-tabs">
        <button
          className={`tool-tab-button ${activeTool === 'base-converter' ? 'active' : ''}`}
          onClick={() => handleToolChange('base-converter')}
        >
          進制轉換器
        </button>
        <button
          className={`tool-tab-button ${activeTool === 'big-calculator' ? 'active' : ''}`}
          onClick={() => handleToolChange('big-calculator')}
        >
          大數計算器
        </button>
      </div>

      {/* 工具顯示區域 */}
      <div className="tool-content">
        {activeTool === 'base-converter' && (
          <div className="tool-wrapper">
            <BaseConverter />
          </div>
        )}

        {activeTool === 'big-calculator' && (
          <div className="tool-wrapper">
            <BigNumberCalculator />
          </div>
        )}
      </div>
    </Card>
  );
};

export default NumberToolsIntegrator;
