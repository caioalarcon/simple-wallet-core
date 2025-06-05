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
import { SpireKey } from '@kadena/spirekey-sdk';

/**
 * Connector implementation for SpireKey (Google OAuth).
 */
export class SpireKeyConnector implements WalletConnectorPort {
  private spire: SpireKey;
  private address: Address = null;

  constructor(private networkConfig: NetworkConfigPort) {
    this.spire = new SpireKey({
      chainId: this.networkConfig.getConfig().chainId,
    });
  }

  /**
   * Connects to SpireKey and returns the address.
   */
  async connect(): Promise<WalletConnectionResult> {
    try {
      const addr: string = await this.spire.login();
      this.address = addr;
      return { address: this.address, error: null };
    } catch (err: any) {
      return { address: null, error: err.message || 'Error connecting via SpireKey' };
    }
  }

  /**
   * Disconnects from SpireKey and clears internal state.
   */
  async disconnect(): Promise<void> {
    if (this.spire && this.spire.logout) {
      await this.spire.logout();
    }
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
