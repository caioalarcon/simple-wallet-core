import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ConnectButton } from '@/ui/components/ConnectButton';
import { WalletConnectorPort } from '@/core/application/ports/WalletConnectorPort';
import { WalletContext } from '@/context/WalletContext';

// Helper to render with a mocked connector via context
function renderWithConnector(connector: WalletConnectorPort) {
  const wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <WalletContext.Provider value={{ connector } as any}>{children}</WalletContext.Provider>
  );
  return render(<ConnectButton />, { wrapper });
}

class MockConnector implements WalletConnectorPort {
  connect = jest.fn(async () => {});
  disconnect = jest.fn(async () => {});
  isConnected = jest.fn(async () => this.connected);
  getAddress = jest.fn(async () => (this.connected ? 'k:test' : null));
  constructor(public connected = false) {}
}

describe('ConnectButton', () => {
  it('renders connect state by default', async () => {
    const connector = new MockConnector(false);
    renderWithConnector(connector);
    expect(screen.getByRole('button')).toHaveTextContent('Connect Wallet');
  });

  it('connects when clicked', async () => {
    const connector = new MockConnector(false);
    renderWithConnector(connector);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(connector.connect).toHaveBeenCalled());
  });

  it('disconnects when clicked', async () => {
    const connector = new MockConnector(true);
    renderWithConnector(connector);
    expect(screen.getByRole('button')).toHaveTextContent('Disconnect Wallet');
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(connector.disconnect).toHaveBeenCalled());
  });

  it('shows error on failure', async () => {
    const connector = new MockConnector(false);
    connector.connect = jest.fn(async () => { throw new Error('fail'); });
    renderWithConnector(connector);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => screen.getByRole('alert'));
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to connect');
  });
});
