/**
 * 驗證輸入的字串是否為有效的 JSON 格式。
 * @param jsonString - 需要驗證的 JSON 字串。
 * @returns 如果有效則返回 true，否則返回 false。
 */
export const isValidJsonString = (jsonString: string): boolean => {
  if (!jsonString || jsonString.trim() === '') {
    return true; // 允許空字串
  }
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
};

/**
 * 格式化（美化）一個 JSON 字串。
 * @param jsonString - 需要格式化的 JSON 字串。
 * @param indent - 縮排使用的空格數（預設為 2）。
 * @returns 格式化後的 JSON 字串；如果輸入無效，則返回錯誤訊息字串。
 */
export const formatJsonString = (jsonString: string, indent: number = 2): string => {
  if (!jsonString || jsonString.trim() === '') {
    return ''; // 如果輸入為空，返回空字串
  }
  try {
    const jsonObj = JSON.parse(jsonString);
    return JSON.stringify(jsonObj, null, indent);
  } catch (error: unknown) {
    if (error instanceof Error) {
        // 提供更具體的錯誤訊息
        return `JSON 解析錯誤：${error.message}`;
    } else {
        return 'JSON 解析時發生未知錯誤。';
    }
  }
};
