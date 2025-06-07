import React from 'react';
import { WalletProvider } from '@context/WalletContext';
import { Home } from '@ui/views/Home';

export const App: React.FC = () => (
  <WalletProvider>
    <Home />
  </WalletProvider>
);
