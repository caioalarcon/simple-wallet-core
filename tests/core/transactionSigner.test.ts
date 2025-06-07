import { DummyTransactionSigner } from '../../src/infra/mock/DummyTransactionSigner';

describe('DummyTransactionSigner', () => {
  it('signs a message', async () => {
    const signer = new DummyTransactionSigner();
    const sig = await signer.signMessage('hello');
    expect(sig).toContain('signed:');
  });

  it('signs and sends a transaction', async () => {
    const signer = new DummyTransactionSigner();
    const result = await signer.signAndSend({ foo: 'bar' });
    expect(result.txId).toMatch(/^dummy-tx-/);
  });

  it('throws on transaction failure', async () => {
    const signer = new DummyTransactionSigner();
    await expect(signer.signAndSend({ fail: true })).rejects.toThrow(
      'Dummy transaction failure'
    );
  });
});
