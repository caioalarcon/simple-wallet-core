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

## Switch Networks
Choose **devnet** or **testnet** when creating the environment or set `NETWORK=devnet` in your `.env` file. You may override the RPC with `KADENA_RPC_URL`.

## Connection Example
```ts
adapter.connect();
adapter.on('connect', () => {
  console.log('Connected to', adapter.account);
});
```

## Sample Code
Enable the adapter connector when creating the environment:
```ts
import { createWalletEnvironment } from '@infra/sdk/createWalletEnvironment';

const services = createWalletEnvironment('testnet', true);
await services.connector.connect();
console.log('Address', await services.connector.getAddress());
```

## Troubleshooting
- Make sure the adapter version matches the SDK version.
- Restart the dev server after changing RPC URLs.

## FAQ
**Q: Can I use multiple adapters?**
A: Yes. Create a new instance for each provider and select the one you need.
