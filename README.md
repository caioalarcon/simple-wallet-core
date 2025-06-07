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

## Development

Install dependencies and run the following commands:

```bash
npm run dev    # start development server
npm run build  # create production build
npm run test   # run tests
```

The project currently contains no runtime logic or tests but the configuration allows teams to begin adding modules immediately.
