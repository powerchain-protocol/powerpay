# PowerPay v1.0.0 — build status

## Implemented

- Expo Router mobile-first app with persistent onboarding gate and uploaded PowerChain visual assets.
- Home / Pay / camera-first Scan / Activity / Wallet navigation with responsive mobile/tablet breakpoints.
- USDC-first payments with EURC, SOL and PWRC support and live Solana portfolio reads through the server RPC boundary.
- Canonical immutable `PaymentIntent` + separate `PaymentAttempt` execution model.
- Attempt-level idempotency and signed-transaction SHA-256 binding.
- Event-driven payment state transitions, signed fee quotes, merchant trust policy and immutable locked fields.
- Authoritative cancel/expiry semantics and append-only payment timeline.
- Mobile crash/reconnect recovery with signed payloads stored in Expo SecureStore; recovery never auto-rebroadcasts.
- Solana SOL/SPL/Token-2022 transaction building, simulation, submission and confirmation adapter.
- Checkout reconciliation -> application ledger -> immutable receipt.
- Helius/custom server RPC, Pyth transactional prices, CoinGecko reference prices, Metaplex/token metadata abstractions.
- Account authentication separated from wallet connection and transaction authorization.
- Supabase/Postgres persistence, account/wallet mapping, notifications, RLS and atomic QR replay protection.
- Solana Actions `/actions.json` + Action GET/POST routing and CORS contract.
- `/backend`, `/services`, `/programs`, deployment manifests, generated-client boundary and feature/capability system.
- `GET /api/v1/readiness` exposes non-secret deployment readiness state.
- Swap/Bridge/Vault surfaces are fail-closed and contain no fabricated financial values until their execution adapters/programs are deployed.

## Validation completed in this environment

- `check-structure.mjs` — passed.
- `check-program-registry.mjs` — passed; manifest/deployment registry consistent and no fabricated program IDs.
- `check-actions-manifest.mjs` — passed; root manifest and runtime rules match.
- `check-payment-invariants.mjs` — passed (14 invariants).
- Dependency-free TypeScript packages passed `tsc --noEmit`: payment-core, ledger, security, transaction-recovery, capabilities, program-clients, fees, chain-adapters, qr, explorers.
- All JSON files parse successfully.

## Environment-dependent validation still required

Full backend/services/mobile typecheck currently stops at missing workspace/native dependencies because `pnpm install` has not been run in this container. The observed backend/services errors are unresolved imports for `@solana/web3.js`, `@solana/spl-token` and Node `buffer`; mobile additionally needs the installed Expo/React Native type environment.

Production release also requires real environment values and external toolchains: PostgreSQL/Supabase migrations, Clerk JWKS, Helius/RPC credentials, asset mint addresses, Pyth feed IDs, fee treasury, quote-signing secret, Anchor/Rust build + deployment key sync, and Sui CLI/package publication. Program IDs remain `null` until actual deployments exist.

CCTP Solana↔Sui bridging remains disabled by default because a compatible versioned Sui adapter/reconciliation path is not yet implemented; this release does not fake bridge availability.
