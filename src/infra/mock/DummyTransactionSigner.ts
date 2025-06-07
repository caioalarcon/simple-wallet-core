import { TransactionSignerPort } from '@core/application/ports/TransactionSignerPort';

/**
 * Dummy signer that encodes messages and returns fake transaction IDs.
 * Useful for local development and tests without an actual wallet.
 */
export class DummyTransactionSigner implements TransactionSignerPort {
  async signMessage(message: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 20));
    console.log('DummyTransactionSigner.signMessage called with', message);
    // simplistic encoding to mimic a signature without node typings
    const encoded = typeof btoa === 'function'
      ? btoa(`signed:${message}`)
      : `signed:${message}`;
    return encoded;
  }

  async signAndSend(tx: object): Promise<{ txId: string }> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    console.log('DummyTransactionSigner.signAndSend called with', tx);

    if ((tx as any).fail) {
      throw new Error('Dummy transaction failure');
    }

    return { txId: `dummy-tx-${Date.now()}` };
  }
}
