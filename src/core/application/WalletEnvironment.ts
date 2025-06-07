import { MockWalletAdapter } from '@infra/mock/MockWalletAdapter';
import { createWalletEnvironment } from '@infra/sdk/createWalletEnvironment';
import { WalletConnectorPort } from './ports/WalletConnectorPort';
import { TransactionSignerPort } from './ports/TransactionSignerPort';
import { WalletInfoPort } from './ports/WalletInfoPort';

export interface WalletServices {
  connector: WalletConnectorPort;
  signer: TransactionSignerPort;
  info: WalletInfoPort;
}

function createMockEnvironment(): WalletServices {
  return MockWalletAdapter;
}

function createRealEnvironment(): WalletServices {
  const env = (globalThis as any).process?.env || {};
  const networkHost = env.NETWORK_HOST || 'https://api.testnet.chainweb.com';
  const networkId = env.NETWORK_ID || 'testnet04';
  const useAdapter = env.USE_WALLET_ADAPTER === 'true';
  return createWalletEnvironment(networkHost, networkId, useAdapter);
}

const nodeEnv = (globalThis as any).process?.env?.NODE_ENV;
const isMock = nodeEnv !== 'production';

export const WalletEnvironment: WalletServices = isMock
  ? createMockEnvironment()
  : createRealEnvironment();

