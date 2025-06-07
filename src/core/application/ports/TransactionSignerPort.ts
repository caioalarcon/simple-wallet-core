/**
 * Abstraction for signing messages and transactions with a wallet.
 * Calls may throw if no wallet connection is available.
 */
export interface TransactionSignerPort {
  /**
   * Sign an arbitrary UTF-8 message with the user's wallet key.
   * @param message - Message to sign.
   * @returns Encoded signature string.
   */
  signMessage(message: string): Promise<string>;

  /**
   * Sign and submit a transaction object to the network.
   * @param tx - Implementation-specific transaction payload.
   * @returns Identifier for the submitted transaction.
   */
  signAndSend(tx: object): Promise<{ txId: string }>;
}
