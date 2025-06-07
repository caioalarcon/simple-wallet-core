import React from 'react';
import { ConnectButton } from './components/ConnectButton';
import { AddressDisplay } from './components/AddressDisplay';
import { SignMessage } from './components/SignMessage';
import { SignTransaction } from './components/SignTransaction';

const App: React.FC = () => (
  <div style={{ padding: 20 }}>
    <h1>Simple Wallet Example</h1>
    <ConnectButton />
    <AddressDisplay />
    <SignMessage />
    <SignTransaction />
  </div>
);

export default App;
