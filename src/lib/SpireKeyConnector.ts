/**
 * @file SpireKeyConnector.ts
 * @description Connects using the SpireKey OAuth method via @kadena/spirekey-sdk.
 */

import {
  WalletConnectorPort,
  WalletConnectionResult,
  Address,
} from '../ports/WalletConnectorPort';
import { NetworkConfigPort } from '../ports/NetworkConfigPort';
import { connect, ConnectedAccount } from '@kadena/spirekey-sdk';

/**
 * Connector implementation for SpireKey (Google OAuth).
 */
export class SpireKeyConnector implements WalletConnectorPort {
  private account: ConnectedAccount | null = null;
  private address: Address = null;

  constructor(private networkConfig: NetworkConfigPort) {}

  /**
   * Connects to SpireKey and returns the address.
   */
  async connect(): Promise<WalletConnectionResult> {
    try {
      const { chainwebId, chainId } = this.networkConfig.getConfig();
      this.account = await connect(chainwebId, chainId as any);
      this.address = this.account.accountName;
      return { address: this.address, error: null };
    } catch (err: any) {
      return {
        address: null,
        error: err.message || 'Error connecting via SpireKey',
      };
    }
  }

  /**
   * Disconnects from SpireKey and clears internal state.
   */
  async disconnect(): Promise<void> {
    this.account = null;
    this.address = null;
  }

  /**
   * Returns true if connected.
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
