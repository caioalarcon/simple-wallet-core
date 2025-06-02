/**
 * @file NetworkConfigPort.ts
 * @description Defines the contract for providing network configuration settings.
 */

/**
 * Network configuration details.
 */
export interface NetworkConfig {
  chainwebId: string;   // e.g., 'testnet04'
  rpcHost: string;      // RPC endpoint
  apiHost: string;      // API endpoint for transactions
  gasPrice: number;     // Default gas price
  gasLimit: number;     // Default gas limit
}

/**
 * Contract for obtaining network configuration.
 */
export interface NetworkConfigPort {
  /**
   * Returns the current network configuration.
   */
  getConfig(): NetworkConfig;
}
