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
import { PactWalletAdapter } from '@kadena/wallet-adapter-core';

/**
 * Connector implementation that uses the PactWalletAdapter for browser extensions.
 */
export class AdapterWalletConnector implements WalletConnectorPort {
  private adapter: PactWalletAdapter;
  private address: Address = null;

  constructor(private networkConfig: NetworkConfigPort) {
    this.adapter = new PactWalletAdapter({
      chainId: this.networkConfig.getConfig().chainId,
    });
  }

  /**
   * Connects to the wallet extension and returns the address.
   */
  async connect(): Promise<WalletConnectionResult> {
    try {
      const addr: string = await this.adapter.requestAccounts();
      this.address = addr;
      return { address: this.address, error: null };
    } catch (err: any) {
      return { address: null, error: err.message || 'Error connecting via extension' };
    }
  }

  /**
   * Disconnects the wallet and clears internal state.
   */
  async disconnect(): Promise<void> {
    if (this.adapter && this.adapter.disconnect) {
      await this.adapter.disconnect();
    }
    this.address = null;
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
