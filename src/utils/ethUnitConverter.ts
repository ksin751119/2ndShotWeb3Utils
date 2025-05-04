import { parseUnits, formatUnits } from 'ethers';

// 定義支援的以太坊單位
export type EthUnit = 'wei' | 'kwei' | 'mwei' | 'gwei' | 'szabo' | 'finney' | 'ether';

// 單位對應的小數位數
const unitDecimals: Record<EthUnit, number> = {
  wei: 0,
  kwei: 3,
  mwei: 6,
  gwei: 9,
  szabo: 12,
  finney: 15,
  ether: 18
};

// 單位的顯示名稱
export const unitDisplayNames: Record<EthUnit, string> = {
  wei: 'Wei (10^0)',
  kwei: 'Kwei (10^3)',
  mwei: 'Mwei (10^6)',
  gwei: 'Gwei (10^9)',
  szabo: 'Szabo (10^12)',
  finney: 'Finney (10^15)',
  ether: 'Ether (10^18)'
};

// 轉換單位函數
export const convertUnit = (
  value: string,
  fromUnit: EthUnit,
  toUnit: EthUnit
): string => {
  try {
    // 處理空輸入
    if (!value || value.trim() === '') {
      return '';
    }

    // 將輸入值轉換為 Wei (基本單位)
    const valueInWei = parseUnits(value, unitDecimals[fromUnit]);

    // 將 Wei 轉換為目標單位
    return formatUnits(valueInWei, unitDecimals[toUnit]);
  } catch (error) {
    // 處理可能的錯誤（例如：無效輸入）
    console.error('Unit conversion error:', error);
    return '轉換錯誤';
  }
};

// 驗證輸入是否為有效的數字
export const isValidNumber = (value: string): boolean => {
  if (!value || value.trim() === '') return true; // 允許空值

  // 檢查是否為有效數字（允許小數點和正負符號）
  const numberRegex = /^-?\d*\.?\d*$/;
  return numberRegex.test(value);
};
