declare module '@kadena/wallet-adapter-core' {
  export class PactWalletAdapter {
    constructor(options: any);
    requestAccounts(): Promise<string | string[]>;
    disconnect(): Promise<void>;
  }
}
