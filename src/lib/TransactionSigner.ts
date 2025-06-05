/**
 * @file TransactionSigner.ts
 * @description Signs and sends simple transfer transactions using @kadena/wallet-sdk.
 */

import {
  TransactionSignerPort,
  TxParams,
  TxResult,
} from '../ports/TransactionSignerPort';
import { WalletConnectorPort } from '../ports/WalletConnectorPort';
import { NetworkConfigPort } from '../ports/NetworkConfigPort';
import { walletSdk } from '@kadena/wallet-sdk';

/**
 * Concrete implementation of TransactionSignerPort.
 */
export class TransactionSigner implements TransactionSignerPort {
  constructor(
    private walletConnector: WalletConnectorPort,
    private networkConfig: NetworkConfigPort
  ) {}

  /**
   * Signs and sends a simple transfer transaction.
   * @param params - parameters for the transfer
   */
  async signAndSend(params: TxParams): Promise<TxResult> {
    if (!this.walletConnector.isConnected()) {
      return { txHash: null, error: 'Wallet not connected' };
    }
    const address = this.walletConnector.getAddress();
    if (!address) {
      return { txHash: null, error: 'Invalid address' };
    }

    const { chainwebId, chainId, gasPrice, gasLimit } =
      this.networkConfig.getConfig();
    const gas = {
      gasPrice: params.gasPrice ?? gasPrice,
      gasLimit: params.gasLimit ?? gasLimit,
    };

    try {
      const unsignedCmd = walletSdk.createSimpleTransfer({
        sender: address,
        receiver: params.to,
        amount: String(params.amount),
        chainId: chainId as any,
        networkId: chainwebId,
      });
      const signedTx = {
        ...unsignedCmd,
        gasLimit: gas.gasLimit,
        gasPrice: gas.gasPrice,
      } as any;
      const result = await walletSdk.sendTransaction(
        signedTx,
        chainwebId,
        chainId as any
      );
      const txHash = result.requestKey || null;
      return { txHash, error: null };
    } catch (err: any) {
      return { txHash: null, error: err.message || 'Error sending transaction' };
    }
  }
}
