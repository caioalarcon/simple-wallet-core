import { DummyWalletConnector } from './DummyWalletConnector';
import { DummyTransactionSigner } from './DummyTransactionSigner';
import { DummyWalletInfo } from './DummyWalletInfo';

/**
 * Aggregates the dummy implementations to mimic a full wallet adapter.
 * This object can be injected wherever the real adapter would be used.
 */
export const MockWalletAdapter = {
  connector: new DummyWalletConnector(),
  signer: new DummyTransactionSigner(),
  info: new DummyWalletInfo(),
};

export type MockWalletAdapter = typeof MockWalletAdapter;
