import { MockWalletAdapter } from '@infra/mock/MockWalletAdapter';

export type WalletServices = typeof MockWalletAdapter;

function createMockEnvironment(): WalletServices {
  return MockWalletAdapter;
}

function createRealEnvironment(): WalletServices {
  // Placeholder for future real SDK integration
  throw new Error('Real wallet environment not implemented');
}

const nodeEnv = (globalThis as any).process?.env?.NODE_ENV;
const isMock = nodeEnv !== 'production';

export const WalletEnvironment: WalletServices = isMock
  ? createMockEnvironment()
  : createRealEnvironment();

