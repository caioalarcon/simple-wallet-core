import React, { useState } from 'react';
import { useWallet } from '@context/WalletContext';

export const SignTransaction: React.FC = () => {
  const { signer } = useWallet();
  const [payload, setPayload] = useState('{}');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    setError(null);
    setResult(null);
    try {
      const obj = JSON.parse(payload);
      const { txId } = await signer.signAndSend(obj);
      setResult(txId);
    } catch (err: any) {
      setError(err.message || 'Failed to send');
    }
  };

  return (
    <div>
      <h3>Sign &amp; Send Transaction</h3>
      <textarea
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        rows={4}
        cols={40}
      />
      <br />
      <button onClick={handleSend}>Submit</button>
      {result && <div>Tx ID: {result}</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};
