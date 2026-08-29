# PowerPay Full-Stack Upgrade Report

## Scope

This upgrade consolidates the PowerPay web, Expo mobile client, Cloudflare API worker, backend orchestration, shared infrastructure services, Solana/Sui read layers, payment engine boundaries, runtime configuration, observability, and release-quality gates around one versioned API contract.

## Architecture

```text
Web (Next.js) ───────┐
                     ├── @powerpay/api-client ── @powerpay/api-contract
Expo Mobile ─────────┘               │
                                     ▼
                         Website BFF / Cloudflare Worker
                                     │
                     request-id / CORS / timeout / telemetry
                                     │
                                     ▼
                            apps/backend handler
                         ┌───────────┴───────────┐
                         ▼                       ▼
                 Payment orchestration     Chain read services
                         │                  Solana / Sui
                         ▼                       │
                  Payment core/ledger           ├─ Solana RPC / Helius
                  attempts/recovery             ├─ Jupiter / Pyth / CG / CMC
                  receipts/reconcile            └─ Sui RPC / Cetus
```

The API client owns transport semantics only. Payment state transitions remain in the backend/payment-core boundary, and chain RPC remains authoritative for chain state.

## Added

### Shared API boundary

- `packages/api-contract/` for canonical API version, route paths, headers, error context, and OpenAPI generation.
- `packages/api-client/` for web/mobile request IDs, bounded timeouts, normalized errors, authentication injection, network/RPC context, read APIs, and payment lifecycle calls.
- TypeScript aliases and workspace dependencies for both packages.

### API and backend edge hardening

- `GET /api/v1/ready`
- `GET /api/v1/system/overview`
- `GET /api/v1/openapi.json`
- explicit credentialed origin allowlisting for normal APIs
- dedicated Solana Actions CORS remains separate
- `x-request-id` and `x-powerpay-api-version` on standard API responses
- `Server-Timing` request duration
- `X-Content-Type-Options: nosniff`
- safe referrer policy
- structured request-completion logs without request bodies, authorization data, or provider secrets
- normalized upstream timeout/unreachable errors at the Next.js BFF

### Web

- shared PowerPay API client replaces the independent web fetch implementation
- same-origin BFF forwards only approved headers and chain context
- `/status` provides live runtime, Solana, Sui, and provider status
- matching website-origin proxies for health, readiness, capabilities, system overview, and OpenAPI
- workspace packages added to Next.js `transpilePackages`

### Mobile

- shared API client replaces the independent Expo API transport
- Clerk authentication is injected through the same transport boundary
- Solana/Sui network and RPC context are propagated consistently
- Profile now reflects configured networks instead of hard-coded mainnet/Helius labels
- `/profile/system` provides pull-to-refresh system status without synthesizing unavailable providers as healthy

### Provider resilience

- Pyth, CoinGecko, and CoinMarketCap reads now have bounded default timeouts
- existing Jupiter, Cetus, and RPC reads retain their bounded behavior
- provider provenance remains separate from authoritative chain fields

### Operations and release quality

- Cloudflare Workers observability enabled
- unfinished Vault and Swap execution flags default to fail-closed `false`
- public environment secret-boundary check
- full-stack contract check
- GitHub Actions static-contract job on Node 24.20.0
- dependency install/typecheck/web-build job executes when a committed pnpm lockfile exists
- canonical environment sync includes allowed origins, release version, and commit SHA metadata

## Security invariants retained

- No wallet private keys, API keys, custom RPC URLs, or provider credentials are returned through system status or public configuration.
- Browser origins are matched against an explicit server-side allowlist; normal API CORS is not wildcarded.
- Solana Actions continue to use their protocol-specific CORS behavior.
- Payment intent immutable fields remain locked before signing.
- A submitted transaction is not treated as settled until reconciliation confirms it and the application ledger records settlement.
- Solana/Sui deployment IDs are never fabricated.
- Incomplete protocol execution surfaces remain fail-closed.

## Validation state

Dependency-independent repository gates pass:

- 126 required structural files
- 77 canonical assets with authoritative supplied binaries installed
- 7 deployment/program manifest entries
- 14 payment invariants
- 10 exact pnpm build-script approvals in strict fail-closed mode
- 32 web-experience files
- Solana API contract: 11 routes
- Sui API contract: 8 documented routes plus deprecated compatibility fallbacks
- public environment boundary: 21 public keys inspected
- full-stack contract: 16 required upgrade files
- TypeScript parser pass: 220 TS/TSX implementation files
- semantic TypeScript pass: `api-contract`, `api-client`, and `oracle`
- JSON parsing: 77 files
- TOML parsing: 4 files
- GitHub Actions YAML parsing
- shell-script syntax validation
- generated OpenAPI smoke test: 16 documented paths

## Toolchain limitation

The validation container runs Node 22.16.0 and does not provide pnpm. Therefore the final dependency-backed recursive workspace typecheck, Next.js production build, Expo/native build, and Worker build must run in CI or locally on the supported PowerPay toolchain:

- Node 24.20.0
- pnpm 11.24.0

No successful dependency-backed production build is claimed by this report.
