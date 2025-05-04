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
 * @returns 十進位字串
 */
export const hexToDecimal = (hexValue: string): string => {
  if (!hexValue || hexValue.trim() === '') return '';

  try {
    // 處理可能的 0x 前綴
    const cleanHex = hexValue.startsWith('0x') ? hexValue.slice(2) : hexValue;

    if (!isValidHex(cleanHex)) return '無效輸入';

    // 轉換為十進位
    return BigInt(`0x${cleanHex}`).toString(10);
  } catch (error) {
    console.error('轉換錯誤:', error);
    return '轉換錯誤';
  }
};

/**
 * 將十六進位轉換為二進位
 * @param hexValue 十六進位字串 (可含 0x 前綴)
 * @returns 二進位字串
 */
export const hexToBinary = (hexValue: string): string => {
  if (!hexValue || hexValue.trim() === '') return '';

  try {
    // 先轉換為十進位，再轉為二進位
    const decimal = hexToDecimal(hexValue);
    if (decimal === '無效輸入' || decimal === '轉換錯誤') return decimal;

    return BigInt(decimal).toString(2);
  } catch (error) {
    console.error('轉換錯誤:', error);
    return '轉換錯誤';
  }
};

/**
 * 將十進位轉換為十六進位
 * @param decimalValue 十進位字串
 * @returns 十六進位字串 (含 0x 前綴)
 */
export const decimalToHex = (decimalValue: string): string => {
  if (!decimalValue || decimalValue.trim() === '') return '';

  try {
    if (!isValidDecimal(decimalValue)) return '無效輸入';

    // 轉換為十六進位
    const hex = BigInt(decimalValue).toString(16);
    return `0x${hex}`;
  } catch (error) {
    console.error('轉換錯誤:', error);
    return '轉換錯誤';
  }
};

/**
 * 將十進位轉換為二進位
 * @param decimalValue 十進位字串
 * @returns 二進位字串 (含 0b 前綴)
 */
export const decimalToBinary = (decimalValue: string): string => {
  if (!decimalValue || decimalValue.trim() === '') return '';

  try {
    if (!isValidDecimal(decimalValue)) return '無效輸入';

    // 轉換為二進位
    const binary = BigInt(decimalValue).toString(2);
    return `0b${binary}`;
  } catch (error) {
    console.error('轉換錯誤:', error);
    return '轉換錯誤';
  }
};

/**
 * 將二進位轉換為十進位
 * @param binaryValue 二進位字串 (可含 0b 前綴)
 * @returns 十進位字串
 */
export const binaryToDecimal = (binaryValue: string): string => {
  if (!binaryValue || binaryValue.trim() === '') return '';

  try {
    // 處理可能的 0b 前綴
    const cleanBinary = binaryValue.startsWith('0b') ? binaryValue.slice(2) : binaryValue;

    if (!isValidBinary(cleanBinary)) return '無效輸入';

    // 轉換為十進位
    return BigInt(`0b${cleanBinary}`).toString(10);
  } catch (error) {
    console.error('轉換錯誤:', error);
    return '轉換錯誤';
  }
};

/**
 * 將二進位轉換為十六進位
 * @param binaryValue 二進位字串 (可含 0b 前綴)
 * @returns 十六進位字串 (含 0x 前綴)
 */
export const binaryToHex = (binaryValue: string): string => {
  if (!binaryValue || binaryValue.trim() === '') return '';

  try {
    // 先轉為十進位，再轉為十六進位
    const decimal = binaryToDecimal(binaryValue);
    if (decimal === '無效輸入' || decimal === '轉換錯誤') return decimal;

    return decimalToHex(decimal);
  } catch (error) {
    console.error('轉換錯誤:', error);
    return '轉換錯誤';
  }
};
