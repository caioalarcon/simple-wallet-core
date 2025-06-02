/**
 * @file NetworkConfig.ts
 * @description Concrete implementation of the NetworkConfigPort for testnet04.
 */

import { NetworkConfig, NetworkConfigPort } from '../ports/NetworkConfigPort';

/**
 * Provides default configuration for testnet04.
 */
export class DefaultNetworkConfig implements NetworkConfigPort {
  private config: NetworkConfig = {
    chainwebId: 'testnet04',
    rpcHost: 'https://api.testnet.chainweb.com', 
    apiHost: 'https://api.testnet.chainweb.com',
    gasPrice: 0.00000001, // Example: 1 * 10^-8 KDA
    gasLimit: 1000,
  };

  /**
   * Returns the network configuration.
   */
  getConfig(): NetworkConfig {
    return this.config;
  }
}
