import { WalletInfoPort } from '@core/application/ports/WalletInfoPort';

/**
 * Dummy provider for network and balance information. Values are hardcoded and
 * do not reflect any real blockchain state.
 */
export class DummyWalletInfo implements WalletInfoPort {
  async getNetwork(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return 'mocknet';
  }

  async getBalance(address: string): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    console.log('DummyWalletInfo.getBalance called for', address);
    // return deterministic pseudo balance
    return address.length * 1.23;
  }
}
