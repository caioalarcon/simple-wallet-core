import { WalletSDK } from '@kadena/wallet-sdk';
import { TransactionSignerPort } from '@core/application/ports/TransactionSignerPort';

/**
 * Transaction signer backed by the Kadena Wallet SDK.
 * Uses the SDK's sendTransaction utility to submit signed commands.
 */
export class WalletSDKTransactionSigner implements TransactionSignerPort {
  private sdk: WalletSDK;

  constructor() {
    this.sdk = new WalletSDK();
  }

  async signMessage(message: string): Promise<string> {
    return this.sdk.signMessage(message);
  }

  async signAndSend(tx: object): Promise<{ txId: string }> {
    const txId = await this.sdk.signAndSendTransaction(tx);
    return { txId };
  }
}
