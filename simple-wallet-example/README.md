# Simple Wallet Example

This example dApp demonstrates the basic wallet flows using the abstractions from the **simple-wallet-core** package.

## Getting Started

Install dependencies:

```bash
npm install
```

### Mock Mode

Run the example with the mock wallet services:

```bash
npm run dev:mock
```

### SDK Mode

Use the real Wallet SDK services:

```bash
npm run dev:sdk
```

## Overview

The UI exposes four basic flows:

1. **Connect/Disconnect Wallet** – toggles wallet state.
2. **Display Connected Address** – shows the currently connected account.
3. **Sign Message** – sign an arbitrary message and display the signature.
4. **Sign & Send Transaction** – submit a JSON transaction payload and show the resulting `txId`.
