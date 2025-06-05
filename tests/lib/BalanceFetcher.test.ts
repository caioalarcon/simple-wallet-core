import { BalanceFetcher } from '../../src/lib/BalanceFetcher';
import { NetworkConfigPort } from '../../src/ports/NetworkConfigPort';

declare const global: any;

class FakeNetwork implements NetworkConfigPort {
  getConfig() {
    return {
      chainwebId: 'testnet04',
      chainId: '0',
      rpcHost: 'https://example.com',
      apiHost: '',
      gasPrice: 0.00000001,
      gasLimit: 1000,
    };
  }
}

describe('BalanceFetcher', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('fetchBalance returns balance when first chain succeeds', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ result: { status: 'success', data: { decimal: '12.34' } } }),
    });

    const fetcher = new BalanceFetcher(new FakeNetwork());
    const result = await fetcher.fetchBalance('k:addr');
    expect(result.balance).toBeCloseTo(12.34);
    expect(result.error).toBeNull();
    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1);
  });

  test('fetchBalance returns account not found when all chains fail', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 404 });
    const fetcher = new BalanceFetcher(new FakeNetwork());
    const result = await fetcher.fetchBalance('k:missing');
    expect(result.balance).toBe(0);
    expect(result.error).toBe('Account not found');
    expect((global.fetch as jest.Mock).mock.calls.length).toBe(20);
  });
});
