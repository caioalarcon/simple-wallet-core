import { WalletSDKConnector } from './WalletSDKConnector';
import { WalletSDKTransactionSigner } from './WalletSDKTransactionSigner';
import { WalletSDKInfo } from './WalletSDKInfo';

/**
 * Factory that instantiates the wallet services backed by the real SDK.
 */
export function createWalletEnvironment(networkHost: string, networkId: string) {
  return {
    connector: new WalletSDKConnector(networkHost, networkId),
    signer: new WalletSDKTransactionSigner(),
    info: new WalletSDKInfo(networkHost, networkId),
  };
}

export type WalletEnvironmentServices = ReturnType<typeof createWalletEnvironment>;
