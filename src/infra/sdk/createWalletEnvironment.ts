import { WalletSDKConnector } from './WalletSDKConnector';
import { WalletSDKTransactionSigner } from './WalletSDKTransactionSigner';
import { WalletSDKInfo } from './WalletSDKInfo';
import { WalletAdapterConnector } from '../adapter/WalletAdapterConnector';

/**
 * Factory that instantiates the wallet services backed by the real SDK.
 */
export function createWalletEnvironment(
  networkHost: string,
  networkId: string,
  useAdapter = false,
) {
  return {
    connector: useAdapter
      ? new WalletAdapterConnector()
      : new WalletSDKConnector(),
    signer: new WalletSDKTransactionSigner(),
    info: new WalletSDKInfo(networkHost, networkId),
  };
}

export type WalletEnvironmentServices = ReturnType<typeof createWalletEnvironment>;
