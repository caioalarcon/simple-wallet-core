import { TransactionService } from '../../src/services/TransactionService';
import { TransactionSignerPort, TxResult } from '../../src/ports/TransactionSignerPort';
import { WalletConnectorPort, WalletConnectionResult } from '../../src/ports/WalletConnectorPort';

class FakeConnector implements WalletConnectorPort {
  private addr: string | null = 'k:fakeAddress';

  async connect(): Promise<WalletConnectionResult> { return { address: this.addr, error: null }; }
  async disconnect(): Promise<void> { this.addr = null; }
  isConnected(): boolean { return this.addr !== null; }
  getAddress(): string | null { return this.addr; }
}

class FakeSigner implements TransactionSignerPort {
  async signAndSend(params: { to: string; amount: number; gasPrice?: number; gasLimit?: number; }): Promise<TxResult> {
    if (params.to === 'k:destino' && params.amount === 1.23) {
      return { txHash: 'fakeTxHash123', error: null };
    }
    return { txHash: null, error: 'Invalid parameters' };
  }
}

describe('TransactionService', () => {
  let connector: FakeConnector;
  let signer: FakeSigner;
  let service: TransactionService;

  beforeEach(() => {
    connector = new FakeConnector();
    signer = new FakeSigner();
    service = new TransactionService(signer, connector);
  });

  test('sendSimpleTransfer fails if not connected', async () => {
    await connector.disconnect();
    const result = await service.sendSimpleTransfer({ to: 'k:destino', amount: 1.23 });
    expect(result.error).toBe('Wallet not connected');
    expect(result.txHash).toBeNull();
  });

  test('sendSimpleTransfer fails for invalid destination', async () => {
    const result = await service.sendSimpleTransfer({ to: '', amount: 1.23 });
    expect(result.error).toBe('Invalid destination address');
  });

  test('sendSimpleTransfer fails for invalid amount', async () => {
    const result = await service.sendSimpleTransfer({ to: 'k:destino', amount: 0 });
    expect(result.error).toBe('Invalid amount');
  });

  test('sendSimpleTransfer returns correct txHash', async () => {
    const result = await service.sendSimpleTransfer({ to: 'k:destino', amount: 1.23 });
    expect(result.txHash).toBe('fakeTxHash123');
    expect(result.error).toBeNull();
  });
});
