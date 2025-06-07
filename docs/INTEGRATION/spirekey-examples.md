# SpireKey Examples

## Table of Contents
- [Import Connector](#import-connector)
- [Sign Message](#sign-message)
- [Sign and Send Transaction](#sign-and-send-transaction)
- [Error Handling](#error-handling)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

## Import Connector
```ts
import { SpireKeyConnector } from '@kadena/wallet-adapter';
```

## Sign Message
```ts
const spire = new SpireKeyConnector();
const signature = await spire.signMessage('hello world');
console.log('signature', signature);
```

## Sign and Send Transaction
```ts
const tx = {
  networkId: 'testnet04',
  chainId: '0',
  payload: { exec: { code: '(coin.get-balance "kadena")', data: {} } },
};
const result = await spire.signAndSend(tx);
console.log('requestKey', result.txId);
```

## Error Handling
```ts
try {
  await spire.signAndSend({ fail: true });
} catch (err) {
  console.error('SpireKey error', err);
}
```

## Troubleshooting
- Ensure the SpireKey extension or provider is running.
- Check that your network ID matches the wallet's configuration.

## FAQ
**Q: Can SpireKey sign arbitrary messages?**
A: Yes, use `signMessage()` as shown above.
