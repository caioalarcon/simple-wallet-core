import { BalanceFetcher } from '../../src/lib/BalanceFetcher';
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

var mockGetAccountDetails: jest.Mock;

jest.mock('@kadena/wallet-sdk', () => {
  mockGetAccountDetails = jest.fn();
  return { walletSdk: { getAccountDetails: mockGetAccountDetails } };
});

beforeEach(() => {
  mockGetAccountDetails.mockReset();
});

describe('BalanceFetcher', () => {
  test('fetchBalance returns balance from sdk', async () => {
    mockGetAccountDetails.mockResolvedValue([
      { chainId: '0', accountDetails: { balance: 12.34 } },
    ]);
    const fetcher = new BalanceFetcher(new FakeNetwork());
    const result = await fetcher.fetchBalance('k:addr1');
    expect(mockGetAccountDetails).toHaveBeenCalledWith(
      'k:addr1',
      'testnet04',
      'coin',
      ['0']
    );
    expect(result.balance).toBe(12.34);
    expect(result.error).toBeNull();
  });

  test('fetchBalance handles missing account', async () => {
    mockGetAccountDetails.mockResolvedValue([
      { chainId: '0', accountDetails: null },
    ]);
    const fetcher = new BalanceFetcher(new FakeNetwork());
    const result = await fetcher.fetchBalance('k:missing');
    expect(result.balance).toBe(0);
    expect(result.error).toBe('Account not found');
  });
});
