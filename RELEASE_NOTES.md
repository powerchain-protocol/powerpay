# PowerPay v1.0.0 — canonical asset-system upgrade

## Visual identity

- Browser-facing assets standardized under `apps/web/public`.
- Native Expo assets standardized under `apps/mobile/assets`.
- `packages/shared/src/assets.ts` is the canonical visual registry used by both surfaces.
- PWRC and wPWRC are distinct PowerPay-owned assets; wPWRC is associated with Sui only at the visual/network-label layer.
- Added green, white and dark PowerPay/PowerChain mark variants and centralized their references.
- Added premium/mark scale behavior so detailed coin art is not shrunk into dense 16–24px UI.
- Added `/asset-preview` coverage for owned tokens, brand tones, networks and wallets.

## Latest user-supplied sources

The latest `pwrc.jpeg`, `wpwrc.jpeg`, `logo-green.png`, `logo-white.png`, and `logo-dark.png` attachment IDs are registered as authoritative sources in `assets/source/user-brand/manifest.json`.

The exact attachment binaries were not materialized as ordinary files in this runtime. The release therefore keeps explicit `uploaded-derived-fallback` served bytes and includes `scripts/import-user-brand-assets.mjs` to install the exact originals later. The importer records SHA-256 provenance and changes the public manifest to `user-upload-authoritative` only after successful installation.

## Web3 Icons

- Pinned `@web3icons/react` at `4.1.21` for web UI components.
- Pinned `@web3icons/core` at `4.0.55` for selected static SVG source files and Expo raster derivatives.
- Added USDC, EURC, SOL, SUI, Solana, Sui, Phantom, Solflare, Backpack and WalletConnect visuals.
- Web uses individual/tree-shakable icon imports rather than dynamic Web3Icons imports.
- Attribution is retained in `apps/web/public/assets/WEB3ICONS.md`.

## Wallet modal

- Phantom, Solflare and Backpack compatibility rows now use actual wallet identities rather than generic dots.
- Added WalletConnect identity with an explicit gated state.
- `EXPO_PUBLIC_REOWN_PROJECT_ID` is registered as optional configuration, but no WalletConnect/Reown path is presented as executable until the connector adapter is deployed.
- Sui remains connector/capability gated.
- Account authentication, wallet connection, and transaction authorization remain separate.

## Existing production hardening retained

- One canonical payment engine for Scan, Checkout, Send/API and Solana Actions.
- Immutable intent lock, separate idempotent attempts, signed-transaction fingerprint binding, recovery without automatic rebroadcast, authoritative cancel/expiry, append-only ledger and immutable receipts.
- Swap, Bridge, Vault, Sui payments and Escrow remain fail-closed until executable/reconcilable adapters are deployed.

## Repository organization update

- Moved the canonical backend from `backend/` to `apps/backend/`.
- Moved the shared service adapter package from `services/` to `components/services/`.
- Updated pnpm workspace discovery, TypeScript path aliases, validation scripts, and architecture references.
- Package import names remain stable as `@powerpay/backend` and `@powerpay/services`.
