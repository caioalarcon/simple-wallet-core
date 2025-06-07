# Wallet Adapter Integration

## Table of Contents
- [Install](#install)
- [Wrap Environment](#wrap-environment)
- [Switch RPC URLs](#switch-rpc-urls)
- [Connection Example](#connection-example)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

## Install
```bash
npm install @kadena/wallet-adapter
```

## Wrap Environment
Import the adapter and wrap your wallet environment:
```ts
import { WalletAdapter } from '@kadena/wallet-adapter';
import { WalletEnvironment } from '@core/application/WalletEnvironment';

const adapter = new WalletAdapter(WalletEnvironment.connector);
```

## Switching Network
Set the `KADENA_NETWORK` environment variable to `testnet` before running any command to target Kadena testnet. The default is `devnet`.

```bash
export KADENA_NETWORK=testnet
npm run dev
```

## Connection Example
```ts
adapter.connect();
adapter.on('connect', () => {
  console.log('Connected to', adapter.account);
});
```

## Troubleshooting
- Make sure the adapter version matches the SDK version.
- Restart the dev server after changing RPC URLs.

## FAQ
**Q: Can I use multiple adapters?**
A: Yes. Create a new instance for each provider and select the one you need.
