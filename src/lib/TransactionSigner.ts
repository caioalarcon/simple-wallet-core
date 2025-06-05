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
import { prepareSimpleTransfer, submitTransaction } from '@kadena/wallet-sdk';

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

    const { chainwebId, chainId, gasPrice, gasLimit } = this.networkConfig.getConfig();
    const gas = {
      gasPrice: params.gasPrice ?? gasPrice,
      gasLimit: params.gasLimit ?? gasLimit,
    };

    try {
      const txCommand = prepareSimpleTransfer({
        from: address,
        to: params.to,
        amount: params.amount,
        chainId: chainId,
        gas,
      });
      const result = await submitTransaction(txCommand);
      const txHash = (result.requestKeys && result.requestKeys[0]) || null;
      return { txHash, error: null };
    } catch (err: any) {
      return { txHash: null, error: err.message || 'Error sending transaction' };
    }
  }
}
