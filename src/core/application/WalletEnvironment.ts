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
  return createWalletEnvironment();
}

const nodeEnv = (globalThis as any).process?.env?.NODE_ENV;
const isMock = nodeEnv !== 'production';

export const WalletEnvironment: WalletServices = isMock
  ? createMockEnvironment()
  : createRealEnvironment();

