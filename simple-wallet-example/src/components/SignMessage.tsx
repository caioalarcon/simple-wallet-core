import React, { useState } from 'react';
import { useWallet } from '@context/WalletContext';

export const SignMessage: React.FC = () => {
  const { signer } = useWallet();
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSign = async () => {
    setError(null);
    try {
      const sig = await signer.signMessage(message);
      setSignature(sig);
    } catch (err: any) {
      setError(err.message || 'Failed to sign');
    }
  };

  return (
    <div>
      <h3>Sign Message</h3>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <button onClick={handleSign}>Sign</button>
      {signature && <div>Signature: {signature}</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};
