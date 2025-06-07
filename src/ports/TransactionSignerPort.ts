/**
 * @file TransactionSignerPort.ts
 * @description Defines the contract for signing and sending Kadena transactions.
 */

/**
 * Parameters required to send a simple transfer transaction.
 */
export interface TxParams {
  to: string;           // Kadena destination address
  amount: number;       // Amount of KDA to transfer
  gasLimit?: number;    // Optional gas limit
  gasPrice?: number;    // Optional gas price
}

/**
 * Result of a transaction send operation.
 * - txHash: returned hash on success, or null on failure
 * - error: error message or null if successful
 */
export interface TxResult {
  txHash: string | null;
  error: string | null;
}

/**
 * Contract for signing and sending transactions.
 */
export interface TransactionSignerPort {
  /**
   * Signs and sends a transaction using the provided parameters.
   * @param params - parameters for the transaction
   */
  signAndSend(params: TxParams): Promise<TxResult>;
}
