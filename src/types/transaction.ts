/**
 * @file transaction.ts
 * @description Shared transaction-related types.
 */

/**
 * Parameters for a simple transfer transaction.
 */
export interface TxParams {
  to: string;
  amount: number;
  gasPrice?: number;
  gasLimit?: number;
}

/**
 * Result of a transaction submission.
 */
export interface TxResult {
  txHash: string | null;
  error: string | null;
}
