# Web3 Utils Toolbox

A frontend application containing various helper tools commonly used in Web3 development.

## Live Demo

You can access a live version of the toolbox here:
[https://gijera-cemuwa.zeabur.app/](https://gijera-cemuwa.zeabur.app/)

## Features

The toolbox currently includes the following categories:

### Number Tools (`/number-tools`)

*   **ETH Unit Converter:** Convert values between different Ethereum units (e.g., Wei, Gwei, Ether).
*   **Base Converter:** Convert numbers between common numeral systems (Hexadecimal, Decimal, Binary).
*   **BigNumber Calculator:** Evaluate mathematical expressions involving large numbers, supporting common operators and parentheses (uses math.js with BigNumber configuration).

### Time Tools (`/time-tools`)

*   **Timestamp Converter:** Convert Unix timestamps (in seconds or milliseconds) to a human-readable date and time string in the Taipei timezone.
*   **Block Time Querier:** Enter a block number to query the corresponding Unix timestamp and Taipei time (requires connection to the Ethereum mainnet).

### Address Tools (`/address-tools`)

*   **Address Checksum Formatter:** Convert an Ethereum address to the standard EIP-55 checksum format.
*   **Public Key to Address Converter:** Compute the corresponding EIP-55 address from an Ethereum public key (compressed or uncompressed).
*   **Address Generator:** Generate a new random Ethereum key pair (private key, public key, address) with relevant security warnings.

## Tech Stack

*   React
*   TypeScript
*   ethers.js (for address and block-related operations)
*   math.js (for BigNumber calculations)
*   sonner (for Toast notifications)
*   @radix-ui/react-tooltip (for Tooltips)
*   Potentially some shadcn/ui components (e.g., Alert, Checkbox)

## Local Setup & Running

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Web3Utils
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    # Or, if using the default CRA script:
    # npm start
    ```
    > **Note:** Use the correct command based on your `package.json` scripts.

4.  **Open your browser:** Visit `http://localhost:3000` (or the port specified in your terminal output).

## Future Work (Based on Task List)

*   Implement a comprehensive testing suite (Task 10.1)
*   Optimize application performance (Task 10.2)
*   Create more detailed user documentation / in-app help (Task 10.3)

---

*This README.md was generated with AI assistance.*
