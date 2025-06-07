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
    // The SDK does not expose direct message signing; this is a placeholder
    // that simply returns the base64 encoded message.
    try {
      return Buffer.from(`signed:${message}`, 'utf8').toString('base64');
    } catch (err) {
      console.error('WalletSDKTransactionSigner.signMessage failed', err);
      throw err;
    }
  }

  async signAndSend(tx: object): Promise<{ txId: string }> {
    try {
      const { networkId, chainId } = tx as any;
      const descriptor = await this.sdk.sendTransaction(tx as any, networkId, chainId);
      return { txId: descriptor.requestKey };
    } catch (err) {
      console.error('WalletSDKTransactionSigner.signAndSend failed', err);
      throw err;
    }
  }
}
