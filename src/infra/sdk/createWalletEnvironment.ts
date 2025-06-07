import { WalletSDKConnector } from './WalletSDKConnector';
import { WalletSDKTransactionSigner } from './WalletSDKTransactionSigner';
import { WalletSDKInfo } from './WalletSDKInfo';
import { DEVNET_RPC_URL, TESTNET_RPC_URL } from '@infra/constants/networks';

/**
 * Factory that instantiates the wallet services backed by the real SDK.
 */
export function createWalletEnvironment() {
  const network =
    (globalThis as any).process?.env?.KADENA_NETWORK === 'testnet'
      ? 'testnet'
      : 'devnet';

  const networkHost = network === 'testnet' ? TESTNET_RPC_URL : DEVNET_RPC_URL;
  const networkId = network === 'testnet' ? 'testnet04' : 'development';

  return {
    connector: new WalletSDKConnector(networkHost, networkId),
    signer: new WalletSDKTransactionSigner(),
    info: new WalletSDKInfo(networkHost, networkId),
  };
}

export type WalletEnvironmentServices = ReturnType<typeof createWalletEnvironment>;
