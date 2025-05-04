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
      return ''; // Return empty for empty input, not an error
    }

    // 可以在這裡添加一次 isValidNumber 檢查，以便提供更早的自定義錯誤訊息
    if (!isValidNumber(value)) {
      return '錯誤：輸入的數值格式無效。';
    }

    // 將輸入值轉換為 Wei (基本單位)
    // ethers 的 parseUnits 會處理數字格式、溢出等問題
    const valueInWei = parseUnits(value, unitDecimals[fromUnit]);

    // 將 Wei 轉換為目標單位
    return formatUnits(valueInWei, unitDecimals[toUnit]);
  } catch (error: unknown) {
    // 處理可能的錯誤（例如：無效輸入、數值過大等）
    console.error('Unit conversion error:', error);

    // Type guard to check if error is an object with potential properties
    if (typeof error === 'object' && error !== null) {
      // Check for ethers.js specific error structure (or similar)
      const potentialError = error as { code?: string; fault?: string; message?: string }; // Type assertion after check

      if (potentialError.code === 'INVALID_ARGUMENT') {
        return '錯誤：輸入的數值格式無效或包含不支援的字符。';
      }
      if (potentialError.code === 'NUMERIC_FAULT' && potentialError.fault === 'overflow') {
        return `錯誤：數值過大，無法處理。`;
      }
      // Optionally check error.message if needed
      // if (potentialError.message) { ... }
    }

    // 其他未知錯誤或非物件錯誤
    return '錯誤：轉換時發生未知問題。';
  }
};

// 驗證輸入是否為有效的數字
export const isValidNumber = (value: string): boolean => {
  if (!value || value.trim() === '') return true; // 允許空值

  // 檢查是否為有效數字（允許小數點和正負符號）
  const numberRegex = /^-?\d*\.?\d*$/;
  return numberRegex.test(value);
};
