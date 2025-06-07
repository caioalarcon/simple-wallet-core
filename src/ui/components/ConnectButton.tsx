import React, { useEffect, useState } from 'react';
import { useWallet } from '@context/WalletContext';
import styles from './ConnectButton.module.css';

export const ConnectButton: React.FC = () => {
  const { connector } = useWallet();
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    connector
      .isConnected()
      .then(setIsConnected)
      .catch(() => setIsConnected(false));
  }, [connector]);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      await connector.connect();
      setIsConnected(true);
    } catch (e) {
      console.error('Failed to connect', e);
      setError('Failed to connect');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    setError(null);
    try {
      await connector.disconnect();
      setIsConnected(false);
    } catch (e) {
      console.error('Failed to disconnect', e);
      setError('Failed to disconnect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={isConnected ? handleDisconnect : handleConnect}
        disabled={loading}
        aria-pressed={isConnected}
      >
        {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
      </button>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
};
