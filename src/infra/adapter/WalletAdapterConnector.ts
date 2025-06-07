import { WalletConnectorPort } from '@core/application/ports/WalletConnectorPort';
import { WalletAdapter } from '@kadena/wallet-adapter';

export const DEVNET_RPC = 'https://api.devnet.chainweb.com';
export const TESTNET_RPC = 'https://api.testnet.chainweb.com';

/**
 * Wallet connector backed by the Kadena Wallet Adapter layer.
 * This allows swapping different wallet providers behind a
 * unified API.
 */
export class WalletAdapterConnector implements WalletConnectorPort {
  private readonly rpcUrl: string;
  private readonly chainId: string;

  constructor(network: 'devnet' | 'testnet' = 'devnet') {
    this.rpcUrl = network === 'devnet' ? DEVNET_RPC : TESTNET_RPC;
    this.chainId = network === 'devnet' ? 'devnet04' : 'testnet04';

    const env = (globalThis as any).process?.env || {};
    const url = env.KADENA_RPC_URL || this.rpcUrl;

    // initialize adapter with configured RPC
    WalletAdapter.init({ chainId: this.chainId, walletUrl: url });
  }

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
