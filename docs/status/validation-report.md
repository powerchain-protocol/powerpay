# PowerPay Validation Report

## Full-stack consolidation

Validated the versioned API boundary shared across backend, Next.js, and Expo, including request context, safe web proxying, runtime/system status, dual-chain read APIs, payment invariants, environment boundaries, and release automation.

## Passed static and contract gates

- `check-structure`: 126 required files
- `check-assets`: 77 canonical assets; authoritative user-supplied binaries installed
- `check-program-registry`: 7 deployment/program entries
- `check-actions-manifest`: Solana Actions manifest/runtime parity
- `check-payment-invariants`: 14 invariants
- `check-pnpm-build-policy`: 10 exact approvals; strict fail-closed
- `check-expo-config`: universal Expo configuration
- `check-web-experience`: 32 required files
- `check-env-layout`: canonical environment/runtime layout
- `check-solana-api`: 11-route Solana/RPC/program/token contract
- `check-sui-api`: 8 canonical/compatibility routes plus deprecated legacy fallbacks
- `check-public-env-secrets`: 21 public environment keys inspected
- `check-full-stack`: 16 required consolidation files and integration assertions

## Source validation

- TypeScript parser: 220 TS/TSX implementation files passed
- semantic `tsc --noEmit`: `packages/api-contract`, `packages/api-client`, `packages/oracle`
- JSON parsing: 77 files
- TOML parsing: 4 files (`wrangler.toml`, Anchor/Cargo/Move manifests)
- GitHub Actions YAML parsing: passed
- shell scripts: `bash -n` passed
- generated OpenAPI executable smoke test: 16 paths

## API edge invariants

- canonical API version and route/header definitions come from `@powerpay/api-contract`
- web and mobile transport semantics come from `@powerpay/api-client`
- request IDs are preserved or generated at the edge
- browser CORS uses exact server-side allowlisted origins
- Solana Actions retain dedicated protocol CORS behavior
- API responses expose safe version/request timing metadata, not secrets
- Next.js BFF forwards an explicit header allowlist only
- upstream calls have bounded timeouts and normalized errors
- safe system overview reports configured/observed state without returning RPC URLs or provider credentials

## Chain and payment invariants

- Solana RPC/Helius remains authoritative for mint state, supply and decimals
- Sui RPC remains authoritative for coin/package state
- Pyth/Jupiter/CoinGecko/CoinMarketCap/Cetus provenance remains provider-separated
- compatibility routes delegate to canonical service implementations
- no Solana program or Sui package deployment IDs are fabricated
- payment submission does not imply application-ledger settlement
- unfinished Vault/Swap execution defaults fail closed

## Environment limitation

Current validation runtime:

- Node: 22.16.0
- pnpm: unavailable

Supported PowerPay runtime:

- Node: 24.20.0
- pnpm: 11.24.0

Consequently, the full recursive dependency-backed workspace typecheck/build was not executed in this container. The GitHub Actions dependency-build job performs the frozen install/full checks when a committed `pnpm-lock.yaml` is available.
