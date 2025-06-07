/**
 * @file BalanceFetcher.ts
 * @description Fetches the balance of a Kadena address using network RPC.
 */

import {
  BalanceFetcherPort,
  BalanceFetchResult,
} from '../ports/BalanceFetcherPort';
import { NetworkConfigPort } from '../ports/NetworkConfigPort';

/**
 * Concrete implementation of BalanceFetcherPort using fetch.
 */
export class BalanceFetcher implements BalanceFetcherPort {
  constructor(private networkConfig: NetworkConfigPort) {}

  /**
   * Fetches the KDA balance for the given address.
   */
  async fetchBalance(address: string): Promise<BalanceFetchResult> {
    const { rpcHost, chainwebId } = this.networkConfig.getConfig();
    try {
      const url = `${rpcHost}/chainweb/0.0/${chainwebId}/account/balance/${address}`;
      const response = await fetch(url);
      if (!response.ok) {
        return { balance: 0, error: `HTTP ${response.status}` };
      }
      const json = await response.json();
      const balance = json.data.balance as number;
      return { balance, error: null };
    } catch (err: any) {
      return { balance: 0, error: err.message || 'Error fetching balance' };
    }
  }
}
