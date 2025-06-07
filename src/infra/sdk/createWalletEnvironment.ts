import { WalletSDKConnector } from './WalletSDKConnector';
import { WalletSDKTransactionSigner } from './WalletSDKTransactionSigner';
import { WalletSDKInfo } from './WalletSDKInfo';
import { WalletAdapterConnector, DEVNET_RPC, TESTNET_RPC } from '../adapter/WalletAdapterConnector';

/**
 * Factory that instantiates the wallet services backed by the real SDK.
 */
export function createWalletEnvironment(
  network: 'devnet' | 'testnet' = 'testnet',
  useAdapter = false,
) {
  const host = network === 'devnet' ? DEVNET_RPC : TESTNET_RPC;
  const id = network === 'devnet' ? 'devnet04' : 'testnet04';

  return {
    connector: useAdapter
      ? new WalletAdapterConnector(network)
      : new WalletSDKConnector(),
    signer: new WalletSDKTransactionSigner(),
    info: new WalletSDKInfo(host, id),
  };
}

export type WalletEnvironmentServices = ReturnType<typeof createWalletEnvironment>;
