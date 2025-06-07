import { DummyWalletConnector } from '../../src/infra/mock/DummyWalletConnector';

describe('DummyWalletConnector', () => {
  it('connects and stores address', async () => {
    const connector = new DummyWalletConnector();
    expect(await connector.isConnected()).toBe(false);
    expect(await connector.getAddress()).toBeNull();
    await connector.connect();
    expect(await connector.isConnected()).toBe(true);
    expect(await connector.getAddress()).toBe('kadena:test:dummy');
  });

  it('disconnects properly', async () => {
    const connector = new DummyWalletConnector();
    await connector.connect();
    await connector.disconnect();
    expect(await connector.isConnected()).toBe(false);
    expect(await connector.getAddress()).toBeNull();
  });
});
