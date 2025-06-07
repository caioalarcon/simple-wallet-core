# Application Layer

Contains use cases and service orchestrations that act upon domain entities. Interfaces to external dependencies are defined under `ports/`.

`WalletEnvironment.ts` acts as the composition root for wallet services. It injects either mock or real implementations based on `NODE_ENV`.
