/**
 * @file TransactionService.ts
 * @description Validates and sends simple transfer transactions.
 */

import { TransactionSignerPort, TxResult, TxParams } from '../ports/TransactionSignerPort';
import { WalletConnectorPort } from '../ports/WalletConnectorPort';

/**
 * Service for validating and sending transactions.
 */
export class TransactionService {
  constructor(
    private signer: TransactionSignerPort,
    private walletConnector: WalletConnectorPort
  ) {}

  /**
   * Validates input and uses the signer to send a simple transfer.
   * @param params - parameters for the transaction
   */
  async sendSimpleTransfer(params: TxParams): Promise<TxResult> {
    if (!this.walletConnector.isConnected()) {
      return { txHash: null, error: 'Wallet not connected' };
    }
    const address = this.walletConnector.getAddress();
    if (!address) {
      return { txHash: null, error: 'Invalid address' };
    }
    if (!params.to || typeof params.to !== 'string') {
      return { txHash: null, error: 'Invalid destination address' };
    }
    if (typeof params.amount !== 'number' || params.amount <= 0) {
      return { txHash: null, error: 'Invalid amount' };
    }
    return await this.signer.signAndSend(params);
  }
}
