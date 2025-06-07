import { WalletConnectorPort } from '@core/application/ports/WalletConnectorPort';
import { WalletAdapter } from '@kadena/wallet-adapter';

/**
 * Wallet connector backed by the Kadena Wallet Adapter layer.
 * This allows swapping different wallet providers behind a
 * unified API.
 */
export class WalletAdapterConnector implements WalletConnectorPort {
  async connect(): Promise<void> {
    await WalletAdapter.connect();
  }

  async disconnect(): Promise<void> {
    await WalletAdapter.disconnect();
  }

  async getAddress(): Promise<string | null> {
    return await WalletAdapter.getAccount();
  }

  async isConnected(): Promise<boolean> {
    return WalletAdapter.isConnected();
  }
}
