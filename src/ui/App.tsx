import React from 'react';
import { WalletProvider } from '@/context/WalletContext';

export const App: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <WalletProvider>{children}</WalletProvider>
);
