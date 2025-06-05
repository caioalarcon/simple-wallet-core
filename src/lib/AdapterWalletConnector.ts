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

/**
 * Connector implementation that uses the PactWalletAdapter for browser extensions.
 */
export class AdapterWalletConnector implements WalletConnectorPort {
  private address: Address = null;

  constructor(private networkConfig: NetworkConfigPort) {}

  /**
   * Connects to the wallet extension and returns the address.
   */
  async connect(): Promise<WalletConnectionResult> {
    return {
      address: null,
      error: 'Wallet adapters not configured',
    };
  }

  /**
   * Disconnects the wallet and clears internal state.
   */
  async disconnect(): Promise<void> {
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
