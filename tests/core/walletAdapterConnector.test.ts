import { createWalletEnvironment } from '../../src/infra/sdk/createWalletEnvironment';
import { WalletAdapterConnector } from '../../src/infra/adapter/WalletAdapterConnector';

describe('createWalletEnvironment', () => {
  it('uses WalletAdapterConnector when flag is true', () => {
    const env = createWalletEnvironment('devnet', true);
    expect(env.connector).toBeInstanceOf(WalletAdapterConnector);
  });
});
