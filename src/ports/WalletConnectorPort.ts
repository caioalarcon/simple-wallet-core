/**
 * @file WalletConnectorPort.ts
 * @description Defines the contract for connecting and disconnecting a Kadena wallet.
 */

/**
 * A Kadena address, e.g., "k:abc123xyz". Null if not connected.
 */
export type Address = string | null;

/**
 * Result of a wallet connection attempt.
 * - address: connected address or null on failure
 * - error: error message or null if successful
 */
export interface WalletConnectionResult {
  address: Address;
  error: string | null;
}

/**
 * Contract for any wallet connector (extension or SpireKey).
 */
export interface WalletConnectorPort {
  /**
   * Connects to the wallet and returns connection result.
   */
  connect(): Promise<WalletConnectionResult>;

  /**
   * Disconnects from the wallet and clears any internal state.
   */
  disconnect(): Promise<void>;

  /**
   * Returns true if the wallet is currently connected.
   */
  isConnected(): boolean;

  /**
   * Returns the current connected address, or null if not connected.
   */
  getAddress(): Address;
}
