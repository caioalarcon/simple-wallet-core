/**
 * Read-only queries for network and account information.
 */
export interface WalletInfoPort {
  /**
   * Get the identifier of the connected network (e.g., testnet04).
   */
  getNetwork(): Promise<string>;

  /**
   * Fetch the balance for a given account address.
   * @param address - Account identifier.
   * @returns Numeric balance in the wallet's smallest denomination.
   */
  getBalance(address: string): Promise<number>;
}
