import React, { createContext, useContext } from 'react';
import { createWalletEnvironment, WalletEnvironmentServices } from '@infra/sdk/createWalletEnvironment';

const walletEnv: WalletEnvironmentServices = createWalletEnvironment();

const WalletContext = createContext<WalletEnvironmentServices>(walletEnv);

export const WalletProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <WalletContext.Provider value={walletEnv}>{children}</WalletContext.Provider>
);

export const useWallet = (): WalletEnvironmentServices => useContext(WalletContext);
