# PowerPay v1.0.0 — build status

## Implemented

### Canonical owned assets

- `apps/web/public` is the sole browser static root.
- `apps/mobile/assets` is the native Expo bundle root.
- Latest PWRC, wPWRC and green/white/dark brand attachment IDs are registered under `assets/source/user-brand`.
- Deterministic authoritative-source importer validates and preserves originals, records SHA-256 provenance, creates canonical web/mobile derivatives and refreshes app icons.
- PWRC and wPWRC are separate PowerPay-owned visual identities.
- Small marks and premium detailed imagery are selected centrally by `AssetIcon` according to UI size/surface intent.
- Green, white and dark brand mark variants are centralized.
- PowerPay brand paths are no longer scattered through wallet-service code.

### Ecosystem identity

- `@web3icons/react` pinned at `4.1.21`.
- `@web3icons/core` pinned at `4.0.55`.
- USDC, EURC, SOL and SUI token identities wired.
- Solana and Sui network identities wired.
- Phantom, Solflare, Backpack and WalletConnect identities wired.
- Web components use individual static Web3Icons imports where applicable.
- Expo uses matching bundled PNG derivatives.

### Mobile UX

- PowerPay mark remains wired to onboarding, header, scanner, Receive QR and wallet connection.
- Wallet modal uses actual wallet-brand visuals rather than generic status dots.
- Android Solana connection continues through Mobile Wallet Adapter discovery.
- WalletConnect/Reown is visibly gated unless its real connector adapter is deployed; optional project-ID configuration alone does not pretend execution exists.
- Sui wallet connection remains connector/capability gated.
- Account authentication, wallet connection and payment authorization remain separate.
- PWRC detail continues to show the premium owned visual with live Token-2022 balance.
- Receive continues to use the actual connected address, QR, copy and share; no sample address is emitted.

### Payment/platform architecture retained

- Canonical immutable PaymentIntent + separate PaymentAttempt engine.
- Attempt idempotency + signed transaction fingerprint binding.
- Event-driven transitions, signed fee quotes, merchant trust, cancel/expiry and append-only ledger.
- SecureStore transaction recovery with no automatic rebroadcast.
- Solana SOL/SPL/Token-2022 execution boundary, Helius/custom server RPC, Pyth conversion data and metadata abstractions.
- Supabase/Postgres persistence, auth/account mapping, notification system, RLS and QR anti-replay.
- `/backend`, `/services`, `/actions.json`, `/programs`, generated clients and capability gating.

## Current source-provenance state

The five latest attachment IDs are registered as authoritative, but the exact binaries were not materialized into this container filesystem. The served PowerPay-owned files therefore remain explicitly:

```text
uploaded-derived-fallback
registered-awaiting-binary-materialization
```

No screenshot reconstruction is substituted for the source originals.

## Validation

- Structure: passed (42 required files).
- Assets: passed (77 required assets, registered/pending authoritative source state).
- Program registry: passed (5 manifest entries).
- Solana Actions: passed.
- Payment invariants: passed (14).
- JSON parse: passed (68 files).
- TypeScript: passed for 14 dependency-free/shared packages in this environment.

## Remaining environment-dependent gates

Full Expo/Next.js/backend/services compilation requires workspace dependency installation. Production release additionally requires exact brand source materialization, real PostgreSQL/Supabase migrations, Clerk/JWKS settings, Helius/RPC credentials, token mint addresses, Pyth feed IDs, fee treasury/quote secrets, real Anchor deployment IDs, Sui package publication and signed native builds.
