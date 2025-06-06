import { BalanceFetcher } from '../../src/lib/BalanceFetcher';
import { DefaultNetworkConfig } from '../../src/lib/NetworkConfig';

describe('BalanceFetcher integration', () => {
  test(
    'fetchBalance retrieves non-zero balance from testnet',
    async () => {
      const network = new DefaultNetworkConfig();
      const fetcher = new BalanceFetcher(network);
      const addr =
        'k:0175a6ab5f291b81fa6931af0a7f694b9be880b868358558338a5a6e1a93881d';
      const result = await fetcher.fetchBalance(addr);
      expect(result.error).toBeNull();
      expect(result.balance).toBeGreaterThan(0);
    },
    15000
  );
});
