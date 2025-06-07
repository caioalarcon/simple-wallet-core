import { AdapterWalletConnector } from '../../src/lib/AdapterWalletConnector';
import { NetworkConfigPort } from '../../src/ports/NetworkConfigPort';

// Create a fake network config
class FakeNetwork implements NetworkConfigPort {
  getConfig() {
    return {
      chainwebId: 'testnet04',
      chainId: '0',
      rpcHost: '',
      apiHost: '',
      gasPrice: 0.00000001,
      gasLimit: 1000,
    };
  }
}

// No actual adapter behavior is provided in the stub implementation

describe('AdapterWalletConnector', () => {
  beforeEach(() => {});

  test('connect returns error when no adapters configured', async () => {
    const connector = new AdapterWalletConnector(new FakeNetwork());
    const result = await connector.connect();
    expect(result.address).toBeNull();
    expect(result.error).toBe('Wallet adapters not configured');
    expect(connector.getAddress()).toBeNull();
  });
});
