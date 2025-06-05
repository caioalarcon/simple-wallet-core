/**
 * @file AdapterWalletConnector.ts
 * @description Connects to a Kadena wallet extension using @kadena/wallet-adapter-core.
 */

import {
  WalletConnectorPort,
  WalletConnectionResult,
  Address,
} from '../ports/WalletConnectorPort';
import { NetworkConfigPort } from '../ports/NetworkConfigPort';
import { WalletAdapterClient } from '@kadena/wallet-adapter-core';
import { eckoAdapter } from '@kadena/wallet-adapter-ecko';

/**
 * Connector implementation that uses WalletAdapterClient with the Ecko wallet adapter.
 */
export class AdapterWalletConnector implements WalletConnectorPort {
  private client: WalletAdapterClient;
  private address: Address = null;

  constructor(private networkConfig: NetworkConfigPort) {
    const chainId = this.networkConfig.getConfig().chainId;
    this.client = new WalletAdapterClient([eckoAdapter({ networkId: chainId })]);
  }

  /**
   * Connects to the wallet extension and returns the address.
   */
  async connect(): Promise<WalletConnectionResult> {
    try {
      await this.client.init();
      const account = await this.client.connect('Ecko');
      this.address = account ? account.accountName : null;
      return { address: this.address, error: null };
    } catch (err: any) {
      return {
        address: null,
        error: err.message || 'Error connecting via extension',
      };
    }
  }

  /**
   * Disconnects the wallet and clears internal state.
   */
  async disconnect(): Promise<void> {
    try {
      await this.client.disconnect('Ecko');
    } catch (err) {
      /* ignore disconnect errors */
    } finally {
      this.address = null;
    }
  }

  /**
   * Returns true if the wallet is connected.
   */
  isConnected(): boolean {
    return this.address !== null;
  }

  /**
   * Returns the currently connected address.
   */
  getAddress(): Address {
    return this.address;
  }
}
