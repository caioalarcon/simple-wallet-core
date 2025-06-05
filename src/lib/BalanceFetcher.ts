/**
 * @file BalanceFetcher.ts
 * @description Fetches the balance of a Kadena address using network RPC.
 */

import {
  BalanceFetcherPort,
  BalanceFetchResult,
} from '../ports/BalanceFetcherPort';
import { NetworkConfigPort } from '../ports/NetworkConfigPort';
import { createHash } from 'crypto';


/**
 * Concrete implementation of BalanceFetcherPort using fetch.
 */
export class BalanceFetcher implements BalanceFetcherPort {
  constructor(private networkConfig: NetworkConfigPort) {}

  /**
   * Fetches the KDA balance for the given address.
   */
  async fetchBalance(address: string): Promise<BalanceFetchResult> {
    const { chainwebId, rpcHost, gasPrice } = this.networkConfig.getConfig();

    // The Kadena wallet SDK cannot perform local reads reliably in a browser
    // environment. EckoWallet performs raw POST requests to the chain nodes
    // instead, looping over all chains until the account is found. We mirror
    // that approach here.

    for (let chainId = 0; chainId < 20; chainId++) {
      const inner = {
        networkId: chainwebId,
        payload: {
          exec: {
            data: {},
            code: `(coin.get-balance "${address}")`,
          },
        },
        signers: [],
        meta: {
          creationTime: 0,
          ttl: 28800,
          gasLimit: 2500,
          chainId: chainId.toString(),
          gasPrice,
          sender: '',
        },
        nonce: `"${new Date().toISOString()}"`,
      };

      const cmd = JSON.stringify(inner);
      const fullHash = createHash('blake2b512').update(cmd).digest();
      const hash = Buffer.from(fullHash.subarray(0, 32)).toString('base64url');
      const wrapper = { hash, sigs: [], cmd };

      const url = `${rpcHost}/chainweb/0.0/${chainwebId}/chain/${chainId}/pact/api/v1/local`;
      try {
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(wrapper),
        });
        if (!resp.ok) continue;
        const json = await resp.json();
        if (json?.result?.status === 'success') {
          const data = json.result.data;
          const value =
            typeof data === 'number'
              ? data
              : typeof data === 'string'
              ? parseFloat(data)
              : parseFloat(data.decimal);
          return { balance: value, error: null };
        }
      } catch {
        // ignore network errors for individual chains
      }
    }

    return { balance: 0, error: 'Account not found' };
  }
}
