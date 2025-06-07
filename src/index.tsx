import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './ui/App';
import { WalletProvider } from './context/WalletContext';

export const init = () => {
  const container = document.getElementById('root');
  if (!container) return;
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <WalletProvider>
        <App />
      </WalletProvider>
    </React.StrictMode>
  );
};
