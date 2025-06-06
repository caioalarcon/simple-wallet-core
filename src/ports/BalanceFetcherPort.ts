/**
 * @file BalanceFetcherPort.ts
 * @description Defines the contract for fetching a Kadena address balance.
 */

/**
 * Result of a balance fetch operation.
 * - balance: non-negative number representing KDA balance
 * - error: error message or null if successful
 */
export interface BalanceFetchResult {
  balance: number;
  error: string | null;
}

/**
 * Contract for fetching a balance from the network.
 */
export interface BalanceFetcherPort {
  /**
   * Fetches the balance (in KDA) for the given address.
   * @param address - Kadena address
   */
  fetchBalance(address: string): Promise<BalanceFetchResult>;
}
