import React, { useState } from 'react';
import { DefaultNetworkConfig } from '@/lib/NetworkConfig';
import { AdapterWalletConnector } from '@/lib/AdapterWalletConnector';
import { SpireKeyConnector } from '@/lib/SpireKeyConnector';
import { WalletService } from '@/services/WalletService';
import { TransactionService } from '@/services/TransactionService';
import { TransactionSigner } from '@/lib/TransactionSigner';

const network = new DefaultNetworkConfig();

export default function App() {
  const [stage, setStage] = useState<'auth' | 'wallet'>('auth');
  const [walletService, setWalletService] = useState<WalletService | null>(null);
  const [txService, setTxService] = useState<TransactionService | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  async function connect(useSpireKey: boolean) {
    const connector = useSpireKey
      ? new SpireKeyConnector(network)
      : new AdapterWalletConnector(network);
    const balanceFetcher = new (await import('@/lib/BalanceFetcher')).BalanceFetcher(
      network
    );
    const ws = new WalletService(connector, balanceFetcher);
    const connectResult = await ws.connectWallet();
    if (connectResult.error) {
      setError(connectResult.error);
      return;
    }
    setAddress(connectResult.address);
    const balResult = await ws.getBalance();
    if (!balResult.error) {
      setBalance(balResult.balance);
    }
    const signer = new TransactionSigner(connector, network);
    const ts = new TransactionService(signer, connector);
    setWalletService(ws);
    setTxService(ts);
    setStage('wallet');
  }

  async function refreshBalance() {
    if (walletService) {
      const balResult = await walletService.getBalance();
      if (balResult.error) setError(balResult.error);
      else setBalance(balResult.balance);
    }
  }

  async function send(to: string, amount: number) {
    if (txService) {
      const result = await txService.sendSimpleTransfer({ to, amount });
      if (result.error) {
        alert(result.error);
      } else {
        alert(`Tx sent: ${result.txHash}`);
        refreshBalance();
      }
    }
  }

  if (stage === 'auth') {
    return (
      <div style={{ padding: 20 }}>
        <h2>Connect Wallet</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={() => connect(false)}>Via Extension</button>
        <button onClick={() => connect(true)} style={{ marginLeft: 10 }}>
          Via Google
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Wallet</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Address: {address}</p>
      <p>Balance: {balance} KDA</p>
      <div style={{ marginTop: 20 }}>
        <TransferForm onSend={send} />
      </div>
      <button onClick={refreshBalance} style={{ marginTop: 10 }}>
        Refresh Balance
      </button>
    </div>
  );
}

interface TransferFormProps {
  onSend: (to: string, amount: number) => void;
}

function TransferForm({ onSend }: TransferFormProps) {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  return (
    <div>
      <h3>Send KDA</h3>
      <input
        placeholder="To address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{ width: 300 }}
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: 100, marginLeft: 10 }}
      />
      <button
        onClick={() => onSend(to, parseFloat(amount))}
        style={{ marginLeft: 10 }}
      >
        Send
      </button>
    </div>
  );
}
