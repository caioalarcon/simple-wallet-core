# Simple Wallet Core

This repository contains the foundational structure for the Simple Wallet Clone demo application. The codebase is organised to facilitate separation of concerns and to allow teams to work in parallel without modifying configuration.

## Project Structure

```
src/
  core/          # Business logic and integrations
    domain/      # Domain entities and pure business rules
    application/ # Use cases, orchestrations, ports
    infrastructure/ # Implementations using external tools
  ui/
    components/  # Reusable presentation components
    views/       # Page-level views composed of components
  infra/
    config/      # Environment setup and constants
    scripts/     # Build, deploy and utility scripts

 tests/          # Integration and system level tests
```

Each directory contains a `README.md` or `.gitkeep` to describe its purpose. Implementation code will be added in later tasks.

`WalletEnvironment.ts` under `src/core/application` exposes wallet services for development using mock adapters. Future integrations can switch implementations centrally without touching UI code.

## Getting Started

```bash
npm run install    # clean install
npm run dev        # start with mock adapters
npm run test       # run tests
npm run build      # build production bundle
npm run start      # serve production build
```

The project currently contains no runtime logic or tests but the scripts allow teams to bootstrap the demo quickly.
