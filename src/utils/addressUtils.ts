import { ethers } from 'ethers';

/**
 * 驗證並格式化以太坊地址為 EIP-55 校驗和格式。
 * 使用 ethers.getAddress，它會自動處理驗證和格式化。
 * @param address - 需要格式化的以太坊地址字串。
 * @returns 格式化後的地址字串；如果地址無效，則返回錯誤訊息字串。
 */
export const formatChecksumAddress = (address: string): string => {
  if (!address || address.trim() === '') {
    return ''; // 允許空輸入，返回空字串
  }
  try {
    // ethers.getAddress 會驗證地址格式並返回校驗和格式的地址
    const formattedAddress = ethers.getAddress(address.trim());
    return formattedAddress;
  } catch (error: unknown) {
    // 如果 ethers.getAddress 拋出錯誤，表示地址格式無效
    // console.error("Invalid address format:", error); // 可選：日誌記錄詳細錯誤
    if (typeof error === 'object' && error !== null) {
        // Check if it's the specific error from ethers
        const ethersError = error as { code?: string; argument?: string; message?: string }; // Type assertion
        if (ethersError.code === 'INVALID_ARGUMENT' && ethersError.argument === 'address') {
            return '錯誤：無效的以太坊地址格式。';
        }
        // Generic error message fallback, explicitly check for non-empty message string
        const errorMessage = typeof ethersError.message === 'string' && ethersError.message.length > 0
                            ? ethersError.message
                            : '格式化地址時發生未知錯誤';
        return `錯誤：${errorMessage}`;
    }
    // Fallback for non-object errors
    return '錯誤：格式化地址時發生非預期錯誤。';
  }
};

/**
 * 從以太坊公鑰計算出對應的地址。
 * @param publicKey - 公鑰字串 (可以包含 0x 前綴，可以是壓縮或非壓縮格式)。
 * @returns 格式化後的 EIP-55 地址字串；如果公鑰無效，則返回錯誤訊息字串。
 */
export const publicKeyToAddress = (publicKey: string): string => {
  if (!publicKey || publicKey.trim() === '') {
    return ''; // 允許空輸入
  }
  try {
    // ethers.computeAddress 會處理壓縮/非壓縮格式並返回 checksum 地址
    const address = ethers.computeAddress(publicKey.trim());
    // 雖然 computeAddress 返回的就是 checksum 格式，但為了明確，可以再調用一次
    // return formatChecksumAddress(address); // 或者直接返回 computeAddress 的結果
    return address; // computeAddress 本身就返回 EIP-55 格式
  } catch (error: unknown) {
    // console.error("Invalid public key:", error);
     if (typeof error === 'object' && error !== null) {
        const ethersError = error as { code?: string; argument?: string; message?: string };
        // 檢查是否為 ethers.js 的特定錯誤
        if (ethersError.code === 'INVALID_ARGUMENT' && (ethersError.argument === 'pubKey' || ethersError.argument === 'key')) {
             return '錯誤：無效的公鑰格式或長度。';
        }
        const errorMessage = typeof ethersError.message === 'string' && ethersError.message.length > 0
                            ? ethersError.message
                            : '計算地址時發生未知錯誤';
        return `錯誤：${errorMessage}`;
    }
    return '錯誤：計算地址時發生非預期錯誤。';
  }
};

/**
 * 生成一個新的以太坊金鑰對（私鑰、公鑰、地址）。
 * **警告:** 在瀏覽器環境中生成私鑰存在安全風險。
 * @returns 包含 privateKey, publicKey, address 的物件。
 */
export const generateEthereumKeyPair = (): { privateKey: string; publicKey: string; address: string } => {
  try {
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey;
    const publicKey = wallet.publicKey; // 非壓縮格式
    const address = wallet.address; // EIP-55 格式

    return { privateKey, publicKey, address };
  } catch (error) {
    console.error("Error generating key pair:", error); // 記錄內部錯誤
    // 對於此函數，我們拋出一個更通用的錯誤，讓 UI 層處理顯示
    throw new Error('生成金鑰對時發生錯誤，請重試。');
  }
};
