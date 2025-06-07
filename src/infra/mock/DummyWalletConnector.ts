import { WalletConnectorPort } from '@core/application/ports/WalletConnectorPort';

/**
 * Dummy connector used during development. It simply toggles an in-memory
 * connected state and exposes a fixed address. No real wallet interactions
 * take place.
 */
export class DummyWalletConnector implements WalletConnectorPort {
  private connected = false;
  private address: string | null = 'kadena:test:dummy';

  async connect(): Promise<void> {
    // simulate async approval delay
    await new Promise((resolve) => setTimeout(resolve, 50));
    console.log('DummyWalletConnector.connect called');
    this.connected = true;
  }

  async disconnect(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 10));
    console.log('DummyWalletConnector.disconnect called');
    this.connected = false;
  }

  async isConnected(): Promise<boolean> {
    return this.connected;
  }

  async getAddress(): Promise<string | null> {
    return this.connected ? this.address : null;
  }
}
