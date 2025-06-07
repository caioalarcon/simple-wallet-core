# Integration Guide

## Table of Contents
- [Introduction](#introduction)
- [Requirements](#requirements)
- [Overview of Modes](#overview-of-modes)
- [Next Steps](#next-steps)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

## Introduction
This guide explains how to integrate the Simple Wallet Clone into your own project. It provides step-by-step instructions for working in development (mock) mode and using the real Kadena Wallet SDK. You can find the repository at [kadena-community/wallet-sdk-example](https://github.com/kadena-community/wallet-sdk-example).

## Requirements
- **Node.js** 18 or later
- **npm** 8 or later
- Git access to the repository
- Copy `.env.example` to `.env` and adjust the values if needed

## Overview of Modes
The wallet can operate in different modes:
- **Mock mode** – uses dummy adapters so you can develop without a real wallet connection.
- **SDK mode** – connects through the official `@kadena/wallet-sdk`.
- **Adapter mode** – integrates with `@kadena/wallet-adapter` for switching providers.

See the following documents for detailed instructions:
- [Mock Setup](mock-setup.md)
- [SDK Setup](sdk-setup.md)
- [Wallet Adapter Integration](adapter.md)
- [SpireKey Examples](spirekey-examples.md)

## Next Steps
1. Pick the mode you need and follow the linked setup guide.
2. Run the provided scripts to start the application.
3. Explore the example code in `src/` to customize for your project.

## Troubleshooting
- Ensure your Node.js version matches the requirement.
- Delete `node_modules` and reinstall dependencies if you see build errors.
- Verify environment variables in your `.env` file are correct.

## FAQ
**Q: Does this demo support mainnet?**
A: No. It is intended for devnet and testnet only.

**Q: Where do I report issues?**
A: Open an issue in the repository on GitHub.
