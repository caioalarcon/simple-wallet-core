import { WalletService } from '../../src/services/WalletService';
import { WalletConnectorPort, WalletConnectionResult } from '../../src/ports/WalletConnectorPort';
import { BalanceFetcherPort, BalanceFetchResult } from '../../src/ports/BalanceFetcherPort';

class FakeConnector implements WalletConnectorPort {
  private addr: string | null = null;

  async connect(): Promise<WalletConnectionResult> {
    this.addr = 'k:fakeAddress';
    return { address: this.addr, error: null };
  }
  async disconnect(): Promise<void> {
    this.addr = null;
  }
  isConnected(): boolean {
    return this.addr !== null;
  }
  getAddress(): string | null {
    return this.addr;
  }
}

class FakeBalanceFetcher implements BalanceFetcherPort {
  async fetchBalance(address: string): Promise<BalanceFetchResult> {
    if (address === 'k:fakeAddress') {
      return { balance: 42.5, error: null };
    }
    return { balance: 0, error: 'Address not found' };
  }
}

describe('WalletService', () => {
  let connector: FakeConnector;
  let balanceFetcher: FakeBalanceFetcher;
  let service: WalletService;

  beforeEach(() => {
    connector = new FakeConnector();
    balanceFetcher = new FakeBalanceFetcher();
    service = new WalletService(connector, balanceFetcher);
  });

  test('connectWallet returns address and no error', async () => {
    const result = await service.connectWallet();
    expect(result.address).toBe('k:fakeAddress');
    expect(result.error).toBeNull();
  });

  test('getBalance returns correct value after connection', async () => {
    await service.connectWallet();
    const balanceResult = await service.getBalance();
    expect(balanceResult.balance).toBe(42.5);
    expect(balanceResult.error).toBeNull();
  });

  test('getBalance returns error if not connected', async () => {
    const balanceResult = await service.getBalance();
    expect(balanceResult.balance).toBe(0);
    expect(balanceResult.error).toBe('Wallet not connected');
  });

  test('disconnectWallet clears connection state', async () => {
    await service.connectWallet();
    await service.disconnectWallet();
    expect(service.isConnected()).toBe(false);
    expect(service.getAddress()).toBeNull();
  });
});
