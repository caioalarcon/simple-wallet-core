import React, { useEffect, useState } from 'react';
import { useWallet } from '@context/WalletContext';

export const AddressDisplay: React.FC = () => {
  const { connector } = useWallet();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    connector.getAddress().then(setAddress).catch(() => setAddress(null));
  }, [connector]);

  return <div>Address: {address ?? 'Not connected'}</div>;
};
