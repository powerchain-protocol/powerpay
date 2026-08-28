# Validation report — 2026-08-28

## Passed

```text
node scripts/check-structure.mjs
  PowerPay structure check passed (42 required files).

node scripts/check-assets.mjs
  PowerPay asset check passed (77 required assets; authoritative binary state: registered/pending).

node scripts/check-program-registry.mjs
  Program registry/manifest check passed (5 manifest entries).

node scripts/check-actions-manifest.mjs
  Solana Actions manifest/runtime check passed.

node scripts/check-payment-invariants.mjs
  Payment invariant check passed (14 invariants).

JSON parser
  JSON parse passed (68 files).
```

TypeScript `tsc --noEmit` passed for the dependency-free/shared packages validated in this environment:

- `packages/shared`
- `packages/payment-core`
- `packages/payment-machine`
- `packages/fees`
- `packages/ledger`
- `packages/security`
- `packages/transaction-recovery`
- `packages/capabilities`
- `packages/explorers`
- `packages/qr`
- `packages/program-clients`
- `packages/chain-adapters`
- `packages/core`
- `packages/web3-icons`

Repository snapshot at validation time:

```text
393 files
251 text/source files
~9,400 text/source lines
68 JSON files
```

## Asset-specific gates

`check-assets.mjs` now verifies:

- browser assets are rooted only at `apps/web/public`;
- native assets are rooted at `apps/mobile/assets`;
- the five latest PWRC/wPWRC/brand attachment IDs are registered as authoritative sources;
- served owned artwork is either `user-upload-authoritative` with an installed hash record or explicitly `uploaded-derived-fallback` while source binary materialization is pending;
- app/adaptive icons are 1024×1024 PNGs;
- PWRC and wPWRC are separate PowerPay-owned visual definitions;
- visual registry contains no mint, program or Sui object IDs;
- `@web3icons/react` is pinned at `4.1.21` and `@web3icons/core` at `4.0.55`;
- selected external SVGs carry Web3Icons source markers;
- web uses individual static Web3Icons components instead of dynamic imports;
- Expo uses canonical USDC/EURC/SOL/SUI and wallet visual bundles;
- wallet modal uses Phantom/Solflare/Backpack/WalletConnect identities and keeps WalletConnect/Sui non-executable paths gated;
- Solana wallet identity resolves the PowerPay mark through the shared asset registry;
- scanner and Receive QR use canonical PowerPay branding and no demo receive address.

## Script syntax

`node --check` passes for:

- `scripts/import-user-brand-assets.mjs`
- `scripts/sync-web3icons.mjs`

## Dependency-gated checks

The workspace has no installed `node_modules` in this execution environment. A complete Expo/Next.js/backend/services build therefore remains dependency-gated and is not represented as passed.

Before deployment:

```bash
corepack enable
pnpm install
pnpm assets:sync-web3icons
pnpm check
pnpm --filter @powerpay/mobile exec expo install --check
pnpm --filter @powerpay/web build
```

After exact user-source images are materialized, run `pnpm assets:import-user -- ...` before the final production artifact so source SHA-256 provenance changes from registered/pending to installed/authoritative.

External deployment validation remains required for Prisma/Supabase, Cloudflare, Clerk, Helius/RPC, Pyth, Anchor/Solana programs, Sui Move packages, production mint/config values and native iOS/Android builds.
