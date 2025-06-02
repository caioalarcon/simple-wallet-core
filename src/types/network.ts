/**
 * @file network.ts
 * @description Shared network configuration types.
 */

/**
 * Configuration details for connecting to a Kadena network.
 */
export interface NetworkConfig {
  chainwebId: string;
  rpcHost: string;
  apiHost: string;
  gasPrice: number;
  gasLimit: number;
}
