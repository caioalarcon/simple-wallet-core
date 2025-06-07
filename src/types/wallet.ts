/**
 * @file wallet.ts
 * @description Shared wallet-related types.
 */

/**
 * A Kadena address or null if not connected.
 */
export type Address = string | null;

/**
 * Result of a connection operation.
 */
export interface WalletConnectionResult {
  address: Address;
  error: string | null;
}
