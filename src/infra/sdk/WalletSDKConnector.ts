import { WalletSDK } from '@kadena/wallet-sdk';
import { WalletConnectorPort } from '@core/application/ports/WalletConnectorPort';

/**
 * Wallet connector using the Kadena Wallet SDK. It keeps track of the
 * connected account address and exposes lifecycle methods.
 */
export class WalletSDKConnector implements WalletConnectorPort {
  private sdk: WalletSDK;

  constructor() {
    this.sdk = new WalletSDK();
  }

  async connect(): Promise<void> {
    await this.sdk.connect();
  }

  async disconnect(): Promise<void> {
    await this.sdk.disconnect();
  }

  async getAddress(): Promise<string | null> {
    const accounts = await this.sdk.getAccounts();
    return accounts[0] ?? null;
  }

  async isConnected(): Promise<boolean> {
    return (await this.sdk.getAccounts()).length > 0;
  }
}
