# PowerPay Build Status

## Current state

**Full-stack consolidation complete at the source/contract level.**

PowerPay now uses a shared, versioned API contract and cross-platform API client across Next.js and Expo. The Cloudflare Worker/backend edge exposes canonical readiness, system overview, OpenAPI, Solana, Sui, payment, account, wallet, and operational routes with consistent request correlation, bounded provider access, safe CORS, and observability.

## Implemented release surfaces

- Next.js website and checkout
- Expo mobile application
- Cloudflare Worker API
- backend payment/orchestration handler
- shared infrastructure services
- `@powerpay/api-contract`
- `@powerpay/api-client`
- canonical payment engine, recovery, ledger, receipts, fees and security packages
- Solana RPC/Helius + Jupiter/Pyth/CoinGecko/CoinMarketCap reads
- Sui RPC + Cetus reads
- website-origin API proxies
- web `/status` and mobile `/profile/system`
- generated OpenAPI contract
- environment/runtime synchronization and secret-boundary validation
- Cloudflare observability and GitHub Actions quality gates

## Validation

Passed in the current dependency-independent environment:

- structure: 126 required files
- canonical assets: 77
- deployment/program manifest: 7 entries
- payment invariants: 14
- exact pnpm build approvals: 10
- web experience: 32 required files
- Solana API: 11-route contract
- Sui API: exact 8-route contract plus deprecated compatibility fallbacks
- public environment boundary: 21 public keys
- full-stack contract: 16 upgrade files
- TypeScript parser: 220 implementation TS/TSX files
- semantic TypeScript: api-contract, api-client, oracle
- JSON: 77 files
- TOML: 4 files
- GitHub Actions YAML
- shell syntax
- OpenAPI: 16-path executable smoke test

## Build limitation

The execution container uses Node 22.16.0 and has no `pnpm` binary. PowerPay targets Node 24.20.0 + pnpm 11.24.0, so recursive dependency-backed typecheck, Next production build, Expo/native build, and Worker build are intentionally left to the supported local/CI runtime. No dependency-backed build success is asserted here.
