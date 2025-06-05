/**
 * @file BalanceFetcher.ts
 * @description Fetches the balance of a Kadena address using network RPC.
 */

import {
  BalanceFetcherPort,
  BalanceFetchResult,
} from '../ports/BalanceFetcherPort';
import { NetworkConfigPort } from '../ports/NetworkConfigPort';
import { walletSdk } from '@kadena/wallet-sdk';

/**
 * Concrete implementation of BalanceFetcherPort using fetch.
 */
export class BalanceFetcher implements BalanceFetcherPort {
  constructor(private networkConfig: NetworkConfigPort) {}

  /**
   * Fetches the KDA balance for the given address.
   */
  async fetchBalance(address: string): Promise<BalanceFetchResult> {
    const { chainwebId, chainId } = this.networkConfig.getConfig();
    try {
      const details = await walletSdk.getAccountDetails(
        address,
        chainwebId,
        'coin',
        [chainId as any]
      );
      const info = details[0];
      if (!info || !info.accountDetails) {
        return { balance: 0, error: 'Account not found' };
      }
      const rawBalance = info.accountDetails.balance as any;
      const balance =
        typeof rawBalance === 'number' ? rawBalance : rawBalance.decimal;
      return { balance, error: null };
    } catch (err: any) {
      return { balance: 0, error: err.message || 'Error fetching balance' };
    }
  }
}
