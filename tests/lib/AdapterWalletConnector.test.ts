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

// Mocks for PactWalletAdapter
const mockRequestAccounts = jest.fn();
const mockDisconnect = jest.fn();

jest.mock('@kadena/wallet-adapter-core', () => {
  return {
    PactWalletAdapter: jest.fn().mockImplementation(() => ({
      requestAccounts: mockRequestAccounts,
      disconnect: mockDisconnect,
    })),
  };
});

describe('AdapterWalletConnector', () => {
  beforeEach(() => {
    mockRequestAccounts.mockReset();
    mockDisconnect.mockReset();
  });

  test('connect stores first item when adapter returns array', async () => {
    mockRequestAccounts.mockResolvedValue(['k:addr1', 'k:addr2']);
    const connector = new AdapterWalletConnector(new FakeNetwork());
    const result = await connector.connect();
    expect(result.address).toBe('k:addr1');
    expect(result.error).toBeNull();
    expect(connector.getAddress()).toBe('k:addr1');
  });

  test('connect stores value directly when adapter returns string', async () => {
    mockRequestAccounts.mockResolvedValue('k:singleAddr');
    const connector = new AdapterWalletConnector(new FakeNetwork());
    const result = await connector.connect();
    expect(result.address).toBe('k:singleAddr');
    expect(result.error).toBeNull();
    expect(connector.getAddress()).toBe('k:singleAddr');
  });
});
