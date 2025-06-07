import { WalletSDK } from '@kadena/wallet-sdk';
import { WalletConnectorPort } from '@core/application/ports/WalletConnectorPort';

/**
 * Wallet connector using the Kadena Wallet SDK. It keeps track of the
 * connected account address and exposes lifecycle methods.
 */
export class WalletSDKConnector implements WalletConnectorPort {
  private sdk: WalletSDK;
  private address: string | null = null;
  private readonly networkHost: string;
  private readonly networkId: string;
  constructor(networkHost: string, networkId: string) {
    this.sdk = new WalletSDK();
    this.networkHost = networkHost;
    this.networkId = networkId;
  }

  async connect(): Promise<void> {
    try {
      console.log('Connecting to network', this.networkId);
      const details = await this.sdk.getAccountDetails(
        'kadena-placeholder-account',
        this.networkId,
        'coin',
      );
      this.address = (details[0]?.accountDetails as any)?.account ?? null;
    } catch (err) {
      console.error('WalletSDKConnector.connect failed', err);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    this.address = null;
  }

  async getAddress(): Promise<string | null> {
    return this.address;
  }
}
