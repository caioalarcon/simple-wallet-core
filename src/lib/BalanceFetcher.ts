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
    const { rpcHost, chainwebId, chainId, gasPrice, gasLimit } =
      this.networkConfig.getConfig();
    const cmd = {
      networkId: chainwebId,
      payload: {
        exec: {
          code: `(coin.get-balance \"${address}\")`,
          data: {},
        },
      },
      signers: [],
      meta: {
        chainId,
        gasLimit,
        gasPrice,
        ttl: 600,
        sender: address,
        creationTime: Math.floor(Date.now() / 1000),
      },
      nonce: 'balance-fetch',
    };

    try {
      const url = `${rpcHost}/chainweb/0.0/${chainwebId}/chain/${chainId}/pact/api/v1/local`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cmd),
      });
      if (!response.ok) {
        return { balance: 0, error: `HTTP ${response.status}` };
      }
      const json = await response.json();
      const balance = (json.result && json.result.data) as number;
      return { balance, error: null };
    } catch (err: any) {
      return { balance: 0, error: err.message || 'Error fetching balance' };
    }
  }
}
