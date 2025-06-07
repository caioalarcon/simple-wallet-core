/**
 * @file WalletService.ts
 * @description Orchestrates wallet connection and balance retrieval.
 */

import {
  WalletConnectorPort,
  WalletConnectionResult,
  Address,
} from '../ports/WalletConnectorPort';
import { BalanceFetcherPort, BalanceFetchResult } from '../ports/BalanceFetcherPort';

/**
 * Service for connecting/disconnecting and fetching balance.
 */
export class WalletService {
  constructor(
    private connector: WalletConnectorPort,
    private balanceFetcher: BalanceFetcherPort
  ) {}

  /**
   * Connects to the wallet and returns the result.
   */
  async connectWallet(): Promise<WalletConnectionResult> {
    const result = await this.connector.connect();
    return result;
  }

  /**
   * Disconnects from the wallet.
   */
  async disconnectWallet(): Promise<void> {
    await this.connector.disconnect();
  }

  /**
   * Returns true if wallet is connected.
   */
  isConnected(): boolean {
    return this.connector.isConnected();
  }

  /**
   * Returns the current address or null.
   */
  getAddress(): Address {
    return this.connector.getAddress();
  }

  /**
   * Fetches the KDA balance for the connected address.
   */
  async getBalance(): Promise<BalanceFetchResult> {
    const addr = this.connector.getAddress();
    if (!addr) {
      return { balance: 0, error: 'Wallet not connected' };
    }
    return await this.balanceFetcher.fetchBalance(addr);
  }
}
