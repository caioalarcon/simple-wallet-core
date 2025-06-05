import { AdapterWalletConnector } from '../../src/lib/AdapterWalletConnector';
import { NetworkConfigPort } from '../../src/ports/NetworkConfigPort';

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

const mockInit = jest.fn();
const mockConnect = jest.fn();
const mockDisconnect = jest.fn();

jest.mock('@kadena/wallet-adapter-core', () => {
  return {
    WalletAdapterClient: jest.fn().mockImplementation(() => ({
      init: mockInit,
      connect: mockConnect,
      disconnect: mockDisconnect,
    })),
  };
});

jest.mock('@kadena/wallet-adapter-ecko', () => ({
  eckoAdapter: jest.fn(() => ({ name: 'Ecko' })),
}));

beforeEach(() => {
  mockInit.mockReset();
  mockConnect.mockReset();
  mockDisconnect.mockReset();
});

describe('AdapterWalletConnector', () => {
  test('connect stores returned account name', async () => {
    mockConnect.mockResolvedValue({ accountName: 'k:addr1' });
    const connector = new AdapterWalletConnector(new FakeNetwork());
    const result = await connector.connect();
    expect(mockInit).toHaveBeenCalled();
    expect(mockConnect).toHaveBeenCalledWith('Ecko');
    expect(result.address).toBe('k:addr1');
    expect(result.error).toBeNull();
    expect(connector.getAddress()).toBe('k:addr1');
  });

  test('disconnect clears address', async () => {
    mockConnect.mockResolvedValue({ accountName: 'k:addr1' });
    const connector = new AdapterWalletConnector(new FakeNetwork());
    await connector.connect();
    await connector.disconnect();
    expect(mockDisconnect).toHaveBeenCalledWith('Ecko');
    expect(connector.getAddress()).toBeNull();
  });
});
