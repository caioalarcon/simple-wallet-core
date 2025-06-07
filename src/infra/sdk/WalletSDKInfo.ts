import { WalletSDK } from '@kadena/wallet-sdk';
import { WalletInfoPort } from '@core/application/ports/WalletInfoPort';

/**
 * Provides network and balance information using the Wallet SDK.
 */
export class WalletSDKInfo implements WalletInfoPort {
  private sdk: WalletSDK;
  private readonly networkHost: string;
  private readonly networkId: string;

  constructor(networkHost: string, networkId: string) {
    this.sdk = new WalletSDK();
    this.networkHost = networkHost;
    this.networkId = networkId;
  }

  async getNetwork(): Promise<string> {
    try {
      return this.networkId;
    } catch (err) {
      console.error('WalletSDKInfo.getNetwork failed', err);
      throw err;
    }
  }

  async getBalance(address: string): Promise<number> {
    try {
      const [details] = await this.sdk.getAccountDetails(
        address,
        this.networkId,
        'coin',
      );
      const bal: any = details?.accountDetails?.balance;
      return typeof bal === 'number' ? bal : bal?.decimal ?? 0;
    } catch (err) {
      console.error('WalletSDKInfo.getBalance failed', err);
      throw err;
    }
  }
}
