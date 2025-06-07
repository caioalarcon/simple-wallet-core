# SDK Setup

## Table of Contents
- [Install WalletSDK](#install-walletsdk)
- [Configure Environment](#configure-environment)
- [Build and Serve](#build-and-serve)
- [Verify](#verify)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

## Install WalletSDK
Install the required packages:
```bash
npm install @kadena/wallet-sdk
```

## Configure Environment
Update `createWalletEnvironment()` with your desired network host and network ID.
Set `NODE_ENV=production` in your `.env` file to enable SDK mode.

## Build and Serve
```bash
npm run build
npm run dev
```
In SDK mode the wallet connects to real endpoints.

## Verify
When you click **Connect Wallet**, the real wallet pop-up appears. You can connect and disconnect as expected.

## Troubleshooting
- Ensure your network host and ID are reachable.
- Remove any leftover mock artifacts before building.

## FAQ
**Q: Do I need browser extensions?**
A: No. The SDK handles wallet communication directly.
