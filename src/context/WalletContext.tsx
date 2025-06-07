import React, { createContext, useContext } from 'react';
import { WalletEnvironment, WalletServices } from '@core/application/WalletEnvironment';

const walletEnv = WalletEnvironment;

const WalletContext = createContext<WalletServices>(walletEnv);

export const WalletProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <WalletContext.Provider value={walletEnv}>{children}</WalletContext.Provider>
);

export const useWallet = () => useContext(WalletContext);
