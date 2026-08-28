# Validation report — 2026-08-28

## Passed

```text
node scripts/check-structure.mjs
  PowerPay structure check passed (40 required files).

node scripts/check-program-registry.mjs
  Program registry/manifest check passed (5 manifest entries).

node scripts/check-actions-manifest.mjs
  Solana Actions manifest/runtime check passed.

node scripts/check-payment-invariants.mjs
  Payment invariant check passed (14 invariants).

JSON parser
  JSON parse check passed (61 JSON files).
```

TypeScript `tsc --noEmit` passed for:

- packages/payment-core
- packages/ledger
- packages/security
- packages/transaction-recovery
- packages/capabilities
- packages/program-clients
- packages/fees
- packages/chain-adapters
- packages/qr
- packages/explorers

## Dependency-gated checks

Full backend/services/mobile typecheck was invoked but cannot complete until workspace/native dependencies are installed. The observed failures are unresolved external imports (`@solana/web3.js`, `@solana/spl-token`, Node `buffer`, Expo/React Native typings), not failures in the dependency-free core packages.

Before production release run:

```bash
corepack enable
pnpm install
pnpm check
pnpm --filter @powerpay/mobile exec expo install --check
```

Then build/deploy the external toolchains:

- Prisma migrations against PostgreSQL/Supabase
- Cloudflare Worker validation/deploy
- Anchor/Rust program build/test and deployment key sync
- Sui Move build/test/publish
- native Expo iOS/Android builds
