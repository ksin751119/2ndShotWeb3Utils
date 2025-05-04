// Functions for converting between different number bases

/**
 * 驗證十六進位輸入
 * @param value 需要驗證的字串
 * @returns 是否為有效的十六進位
 */
export const isValidHex = (value: string): boolean => {
  if (!value || value.trim() === '') return true; // 允許空值

  // 移除 0x 前綴（如果有的話）
  const hexValue = value.startsWith('0x') ? value.slice(2) : value;

  // 檢查是否僅包含十六進位字元 (0-9, A-F, a-f)
  const hexRegex = /^[0-9A-Fa-f]+$/;
  return hexRegex.test(hexValue);
};

/**
 * 驗證二進位輸入
 * @param value 需要驗證的字串
 * @returns 是否為有效的二進位
 */
export const isValidBinary = (value: string): boolean => {
  if (!value || value.trim() === '') return true; // 允許空值

  // 移除 0b 前綴（如果有的話）
  const binaryValue = value.startsWith('0b') ? value.slice(2) : value;

  // 檢查是否僅包含二進位字元 (0, 1)
  const binaryRegex = /^[01]+$/;
  return binaryRegex.test(binaryValue);
};

/**
 * 驗證十進位輸入
 * @param value 需要驗證的字串
 * @returns 是否為有效的十進位
 */
export const isValidDecimal = (value: string): boolean => {
  if (!value || value.trim() === '') return true; // 允許空值

  // 檢查是否僅包含十進位字元 (0-9)
  const decimalRegex = /^[0-9]+$/;
  return decimalRegex.test(value);
};

/**
 * 將十六進位轉換為十進位
 * @param hexValue 十六進位字串 (可含 0x 前綴)
 * @returns 十進位字串 或 錯誤訊息字串
 */
export const hexToDecimal = (hexValue: string): string => {
  // Assume validation is done by caller
  try {
    const cleanHex = hexValue.startsWith('0x') ? hexValue.slice(2) : hexValue;
    return BigInt(`0x${cleanHex}`).toString(10);
  } catch (error: unknown) {
    console.error('Hex to Decimal conversion error:', error);
    if (typeof error === 'object' && error !== null) {
      const potentialError = error as { code?: string; fault?: string };
      if (potentialError.code === 'NUMERIC_FAULT' && potentialError.fault === 'overflow') {
          return `錯誤：數值過大，無法轉換為十進位。`;
      }
    }
    return '錯誤：從十六進位轉換為十進位時發生問題。';
  }
};

/**
 * 將十六進位轉換為二進位
 * @param hexValue 十六進位字串 (可含 0x 前綴)
 * @returns 二進位字串 或 錯誤訊息字串
 */
export const hexToBinary = (hexValue: string): string => {
  // Assume validation is done by caller
  try {
    const cleanHex = hexValue.startsWith('0x') ? hexValue.slice(2) : hexValue;
    return BigInt(`0x${cleanHex}`).toString(2);
  } catch (error: unknown) {
    console.error('Hex to Binary conversion error:', error);
     if (typeof error === 'object' && error !== null) {
      const potentialError = error as { code?: string; fault?: string };
      if (potentialError.code === 'NUMERIC_FAULT' && potentialError.fault === 'overflow') {
          return `錯誤：數值過大，無法轉換為二進位。`;
      }
    }
    return '錯誤：從十六進位轉換為二進位時發生問題。';
  }
};

/**
 * 將十進位轉換為十六進位
 * @param decimalValue 十進位字串
 * @returns 十六進位字串 (含 0x 前綴) 或 錯誤訊息字串
 */
export const decimalToHex = (decimalValue: string): string => {
  // Assume validation is done by caller
  try {
    const hex = BigInt(decimalValue).toString(16);
    return `0x${hex}`;
  } catch (error: unknown) {
    console.error('Decimal to Hex conversion error:', error);
    if (typeof error === 'object' && error !== null) {
      const potentialError = error as { code?: string; fault?: string };
      if (potentialError.code === 'NUMERIC_FAULT' && potentialError.fault === 'overflow') {
          return `錯誤：數值過大，無法轉換為十六進位。`;
      }
    }
    return '錯誤：從十進位轉換為十六進位時發生問題。';
  }
};

/**
 * 將十進位轉換為二進位
 * @param decimalValue 十進位字串
 * @returns 二進位字串 (含 0b 前綴) 或 錯誤訊息字串
 */
export const decimalToBinary = (decimalValue: string): string => {
  // Assume validation is done by caller
  try {
    const binary = BigInt(decimalValue).toString(2);
    return `0b${binary}`;
  } catch (error: unknown) {
    console.error('Decimal to Binary conversion error:', error);
    if (typeof error === 'object' && error !== null) {
      const potentialError = error as { code?: string; fault?: string };
      if (potentialError.code === 'NUMERIC_FAULT' && potentialError.fault === 'overflow') {
          return `錯誤：數值過大，無法轉換為二進位。`;
      }
    }
    return '錯誤：從十進位轉換為二進位時發生問題。';
  }
};

/**
 * 將二進位轉換為十進位
 * @param binaryValue 二進位字串 (可含 0b 前綴)
 * @returns 十進位字串 或 錯誤訊息字串
 */
export const binaryToDecimal = (binaryValue: string): string => {
  // Assume validation is done by caller
  try {
    const cleanBinary = binaryValue.startsWith('0b') ? binaryValue.slice(2) : binaryValue;
    return BigInt(`0b${cleanBinary}`).toString(10);
  } catch (error: unknown) {
    console.error('Binary to Decimal conversion error:', error);
    if (typeof error === 'object' && error !== null) {
      const potentialError = error as { code?: string; fault?: string };
      if (potentialError.code === 'NUMERIC_FAULT' && potentialError.fault === 'overflow') {
          return `錯誤：數值過大，無法轉換為十進位。`;
      }
    }
    return '錯誤：從二進位轉換為十進位時發生問題。';
  }
};

/**
 * 將二進位轉換為十六進位
 * @param binaryValue 二進位字串 (可含 0b 前綴)
 * @returns 十六進位字串 (含 0x 前綴) 或 錯誤訊息字串
 */
export const binaryToHex = (binaryValue: string): string => {
  // Assume validation is done by caller
  try {
    const cleanBinary = binaryValue.startsWith('0b') ? binaryValue.slice(2) : binaryValue;
    const hex = BigInt(`0b${cleanBinary}`).toString(16);
    return `0x${hex}`;
  } catch (error: unknown) {
    console.error('Binary to Hex conversion error:', error);
    if (typeof error === 'object' && error !== null) {
      const potentialError = error as { code?: string; fault?: string };
      if (potentialError.code === 'NUMERIC_FAULT' && potentialError.fault === 'overflow') {
          return `錯誤：數值過大，無法轉換為十六進位。`;
      }
    }
    return '錯誤：從二進位轉換為十六進位時發生問題。';
  }
};
