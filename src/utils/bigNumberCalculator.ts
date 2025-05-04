import { create, all, ConfigOptions } from 'mathjs';

// 配置 math.js 使用 BigNumber 以確保精度
const config: ConfigOptions = {
  number: 'BigNumber', // 使用 BigNumber 進行所有計算
  precision: 256       // 設定足夠的精度以容納 uint256
};
const math = create(all, config);

export type Operation = 'add' | 'subtract' | 'multiply' | 'divide' | 'mod' | 'power';

export const operationDisplayNames: Record<Operation, string> = {
  add: '加法 (+)',
  subtract: '減法 (-)',
  multiply: '乘法 (×)',
  divide: '除法 (÷)',
  mod: '模運算 (%)',
  power: '指數 (^)'
};

/**
 * 驗證數字輸入是否為有效的非負整數
 * @param value 需要驗證的字串
 * @returns 是否為有效非負整數
 */
export const isValidBigNumber = (value: string): boolean => {
  if (!value || value.trim() === '') return true; // 允許空值

  // 檢查是否只有數字
  const numberRegex = /^\d+$/;
  return numberRegex.test(value);
};

/**
 * 驗證是否為 uint256 範圍內的數值
 * uint256 的最大值是 2^256 - 1
 * @param value 需要驗證的數值 (BigNumber 或 string)
 * @returns 是否在 uint256 範圍內
 */
export const isWithinUint256Range = (value: math.BigNumber | string): boolean => {
  try {
    const valueBigNumber = math.bignumber(value);

    // uint256 最大值 (2^256 - 1)
    const uint256Max = math.bignumber(2).pow(256).sub(1);

    // 檢查是否為非負整數且在範圍內
    return valueBigNumber.isInteger() && valueBigNumber.gte(0) && valueBigNumber.lte(uint256Max);
  } catch (error) {
    console.error("Range check error:", error);
    return false;
  }
};

/**
 * 評估數學表達式
 * @param expression 要評估的數學表達式字串
 * @returns 計算結果字串或錯誤訊息
 */
export const evaluateExpression = (expression: string): string => {
  try {
    // 空白輸入處理
    if (!expression || expression.trim() === '') {
      return '';
    }

    // 移除所有空格以簡化解析，但保留數字和運算符
    const sanitizedExpression = expression.replace(/\s+/g, '');

    // 使用 math.js 評估表達式
    const result: math.BigNumber = math.evaluate(sanitizedExpression);

    // 檢查結果是否在 uint256 範圍內
    if (!isWithinUint256Range(result)) {
      return '錯誤：結果超出 uint256 範圍';
    }

    // 格式化結果為整數字串
    return result.toFixed(0);

  } catch (error: unknown) {
    console.error('評估錯誤:', error);
    if (error instanceof Error) {
      // 提供更友好的錯誤訊息
      if (error.message.includes('Invalid number')) {
          return '錯誤：表達式包含無效的數字格式';
      }
      if (error.message.includes('Unexpected end of expression') || error.message.includes('Invalid expression')) {
          return '錯誤：表達式語法錯誤';
      }
       if (error.message.includes('Undefined symbol')) {
          return `錯誤：表達式包含無法識別的符號: ${error.message.split(':')[1]?.trim()}`;
       }
       if (error.message.includes('Division by zero')) {
          return '錯誤：除數不能為零';
       }
       return `錯誤：計算時發生問題 (${error.message})`;
    }
    return '錯誤：計算時發生未知問題';
  }
};
