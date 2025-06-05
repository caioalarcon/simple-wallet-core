# Simple Wallet Core

This repository contains the core logic for a very small example wallet
integration for the Kadena ecosystem. The library provides TypeScript
classes for connecting to a wallet, fetching balances and sending simple
transfer transactions. A minimal React based UI example is available in
`webapp/`.

## Running Tests

```bash
npm install
npm test
```

## Running the Example Web App

The web UI is located in the `webapp` folder and uses Vite. Install the
dependencies and start the dev server:

```bash
cd webapp
npm install
npm run dev
```

Open <http://localhost:5173> in your browser. From the first screen you
can choose to connect via an extension or Google (SpireKey). After
connecting, your balance is displayed and you can send funds using a
simple form.
