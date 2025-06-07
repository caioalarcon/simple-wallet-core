/**
 * Provides lifecycle operations for connecting to a wallet provider.
 * Implementations should manage state and handle user approval flows.
 */
export interface WalletConnectorPort {
  /**
   * Connect to the wallet provider. Resolves once the user approves
   * the connection or throws if the operation fails.
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the wallet provider, cleaning up any resources.
   */
  disconnect(): Promise<void>;

  /**
   * Check whether the wallet is currently connected.
   */
  isConnected(): Promise<boolean>;

  /**
   * Retrieve the currently connected account address. Returns `null`
   * if the wallet is not connected.
   */
  getAddress(): Promise<string | null>;
}
