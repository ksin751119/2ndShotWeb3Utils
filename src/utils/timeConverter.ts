import { ethers } from 'ethers';

/**
 * 驗證輸入是否為有效的 Unix 時間戳字串 (純數字)
 * @param timestampStr - 需要驗證的字串
 * @returns 是否為有效的時間戳字串
 */
export const isValidTimestampString = (timestampStr: string): boolean => {
  if (!timestampStr || timestampStr.trim() === '') return true; // 允許空值
  const numberRegex = /^\d+$/;
  return numberRegex.test(timestampStr);
};

/**
 * 將 Unix 時間戳 (秒或毫秒) 轉換為台北時間的可讀字串
 * @param timestampInput - Unix 時間戳 (數字或字串)
 * @returns 格式化後的台北時間字串 (YYYY-MM-DD HH:MM:SS) 或錯誤訊息
 */
export const convertTimestampToTaipeiString = (timestampInput: string | number): string => {
  const timestampStr = String(timestampInput).trim();

  if (!timestampStr) {
    return ''; // 如果輸入為空，返回空字串
  }

  if (!isValidTimestampString(timestampStr)) {
    return '錯誤：時間戳必須是純數字';
  }

  let timestampMs: number;
  try {
    const timestampNum = BigInt(timestampStr); // 使用 BigInt 避免精度問題

    // 簡單啟發式判斷秒或毫秒 (10 位數 -> 秒, 13 位數 -> 毫秒)
    // 注意：這不是絕對可靠的方法，但常用於區分
    if (timestampStr.length <= 11) { // 假設小於等於 11 位的是秒
        timestampMs = Number(timestampNum * 1000n);
    } else if (timestampStr.length >= 12 && timestampStr.length <= 14) { // 假設 12-14 位的是毫秒
        timestampMs = Number(timestampNum);
    } else {
         return '錯誤：時間戳位數不符 (預期 10-14 位)';
    }

     // 再次檢查轉換後的數字是否有效
     if (isNaN(timestampMs)) {
        throw new Error("轉換為數字失敗");
     }

    const date = new Date(timestampMs);

    // 檢查日期是否有效 (例如，時間戳過大導致無效日期)
    if (isNaN(date.getTime())) {
        return '錯誤：無效的時間戳值';
    }

    // 使用 Intl.DateTimeFormat 來格式化並指定時區
    const formatter = new Intl.DateTimeFormat('zh-TW', { // 使用繁體中文地區設定
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // 使用 24 小時制
      timeZone: 'Asia/Taipei', // 指定台北時區
      timeZoneName: undefined, // 可以在此處添加 'short' 或 'long' 來顯示時區名稱
    });

    // Intl.DateTimeFormat 可能會產生 'YYYY/MM/DD HH:MM:SS' 格式
    // 我們需要手動調整為 'YYYY-MM-DD HH:MM:SS'
    const formattedString = formatter.format(date).replace(/\//g, '-');

    return formattedString;

  } catch (error: unknown) {
    console.error("時間戳轉換錯誤:", error);
    if (error instanceof Error && error.message.includes("Cannot convert")) {
        return "錯誤：時間戳數值過大";
    }
    return '錯誤：無法轉換時間戳';
  }
};

/**
 * 驗證輸入是否為有效的區塊編號字串 (正整數)
 * @param blockNumberStr - 需要驗證的字串
 * @returns 是否為有效的區塊編號字串
 */
export const isValidBlockNumberString = (blockNumberStr: string): boolean => {
    if (!blockNumberStr || blockNumberStr.trim() === '') return true; // Allow empty
    const numberRegex = /^\d+$/;
    if (!numberRegex.test(blockNumberStr)) return false;
    try {
        const num = BigInt(blockNumberStr);
        return num >= 0n; // Block number must be non-negative
    } catch {
        return false;
    }
};

/**
 * 根據區塊編號獲取其對應的 Unix 時間戳 (秒)
 * @param blockNumberInput - 區塊編號 (字串或數字)
 * @returns Promise 解析為時間戳 (秒) 或錯誤訊息字串
 */
export const getBlockTimestamp = async (blockNumberInput: string | number): Promise<number | string> => {
    const blockNumberStr = String(blockNumberInput).trim();

    if (!blockNumberStr) {
        // 返回錯誤而不是空字串，因為區塊編號不能為空
        return '錯誤：區塊編號不能為空';
    }

    if (!isValidBlockNumberString(blockNumberStr)) {
        return '錯誤：區塊編號必須是非負整數';
    }

    let blockNumberBigInt: bigint;
    try {
        blockNumberBigInt = BigInt(blockNumberStr);
    } catch {
        return '錯誤：無法將區塊編號轉換為數字'; // 雖然 isValidBlockNumberString 已檢查，但多一層防護
    }

    try {
        // 使用預設的 provider (連接到公共節點，如 Infura, Etherscan 等的免費層級)
        // 注意：在生產環境中，建議使用更可靠的節點提供者和 API Key
        // 使用 InfuraProvider 作為範例，可以替換為 AlchemyProvider 或 JsonRpcProvider
        // 需要在環境變數或配置中設置 INFURA_API_KEY
        // 如果沒有 API Key，可以嘗試 ethers.getDefaultProvider('mainnet')，但可能較不穩定
        // const provider = ethers.getDefaultProvider('mainnet');
        // 為了更明確，我們先用 InfuraProvider，但注意若無 API Key 會依賴公共速率限制
        const provider = new ethers.InfuraProvider('mainnet');

        console.log(`Fetching block info for block number: ${blockNumberBigInt}`);
        // ethers.getBlock 接受 number, bigint, 或有效的區塊標籤字串
        const block = await provider.getBlock(blockNumberBigInt);

        if (!block) {
            // Block 可能為 null 如果區塊不存在 (例如查詢未來的區塊)
            return `錯誤：找不到區塊 ${blockNumberBigInt}`;
        }

        console.log(`Block timestamp received: ${block.timestamp}`);
        // block.timestamp 是秒數 (number)
        return block.timestamp;

    } catch (error: unknown) {
        console.error(`獲取區塊 ${blockNumberStr} 時間戳時發生錯誤:`, error);
        if (error instanceof Error) {
             // 檢查特定的錯誤碼或訊息以提供更精確的回饋
             // 例如: error.code === 'NETWORK_ERROR', error.code === 'INVALID_ARGUMENT'
             if (error.message.includes('NetworkError') || error.message.includes('failed to fetch') || ('code' in error && error.code === 'NETWORK_ERROR')) {
                 return '錯誤：網路連線失敗，無法獲取區塊資訊';
             }
             // Ethers v6 對無效區塊的錯誤可能更通用
             if (error.message.includes('invalid block number') || error.message.includes('requested block number') || ('code' in error && error.code === 'INVALID_ARGUMENT')) {
                 return `錯誤：無效的區塊編號或區塊不存在 (${blockNumberStr})`;
             }
             // 可以根據需要添加更多特定的錯誤處理
        }
        return `錯誤：獲取區塊 ${blockNumberStr} 時發生未知錯誤`;
    }
};
