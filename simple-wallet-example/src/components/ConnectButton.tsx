import React, { useState, useEffect } from 'react';
import { useWallet } from '@context/WalletContext';

export const ConnectButton: React.FC = () => {
  const { connector } = useWallet();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    connector.isConnected().then(setIsConnected).catch(() => setIsConnected(false));
  }, [connector]);

  const handleConnect = async () => {
    try {
      await connector.connect();
      setIsConnected(true);
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await connector.disconnect();
      setIsConnected(false);
    } catch (err) {
      console.error('Disconnection failed:', err);
    }
  };

  return (
    <button onClick={isConnected ? handleDisconnect : handleConnect}>
      {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
    </button>
  );
};
