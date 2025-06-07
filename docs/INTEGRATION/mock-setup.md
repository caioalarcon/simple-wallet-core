# Mock Setup

## Table of Contents
- [Clone and Install](#clone-and-install)
- [Enable Mock Mode](#enable-mock-mode)
- [Run the Development Server](#run-the-development-server)
- [Verify](#verify)
- [Sample Code](#sample-code)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

## Clone and Install
Clone the repository and install dependencies:
```bash
git clone https://github.com/kadena-community/wallet-sdk-example.git
cd wallet-sdk-example
npm install
```

## Enable Mock Mode
The project defaults to mock mode when `NODE_ENV` is not `production`. Copy `.env.example` to `.env` and leave `NODE_ENV=development`.

## Run the Development Server
```bash
npm run dev
```
The command starts the demo using the dummy adapters.

## Verify
Open the browser at the printed URL. You should see a **Connect Wallet** button. When clicked, the mock address `kadena:test:dummy` is used.

## Sample Code
To use the mock wallet in your own code:
```ts
import { MockWalletAdapter } from '@infra/mock/MockWalletAdapter';

const services = MockWalletAdapter;
services.connector.connect();
```

## Troubleshooting
- Check that `NODE_ENV` is not set to `production`.
- Delete the `.env` file if you accidentally switched modes.

## FAQ
**Q: Can I run tests in mock mode?**
A: Yes. Mock mode is ideal for unit tests and local development.
