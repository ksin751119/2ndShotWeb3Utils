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
