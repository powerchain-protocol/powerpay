# Changelog

All notable PowerPay changes are documented here.

## [Unreleased]

### Documentation hygiene
- Reduced root Markdown to the canonical `README.md`, `CHANGELOG.md`, and `RELEASE_NOTES.md` entry files.
- Moved current build/validation evidence to `docs/status/`, asset-system notes to `docs/assets/`, and historical upgrade reports to `docs/reports/history/`.
- Added `check:root-docs` so new ad-hoc Markdown reports cannot accumulate in the repository root.

### Full-stack platform
- Added `@powerpay/api-contract` as the canonical route/header/version contract shared by backend, web, and mobile.
- Added `@powerpay/api-client` with cross-platform request IDs, timeouts, network/RPC context propagation, normalized API errors, and payment/read methods.
- Migrated the Next.js checkout client and Expo mobile API service to the shared client instead of maintaining independent fetch implementations.
- Added `GET /api/v1/ready`, `GET /api/v1/system/overview`, and `GET /api/v1/openapi.json`; `/api/v1/readiness` remains compatible.
- Added explicit credentialed CORS allowlisting, API-version/request-ID headers, `Server-Timing`, safe structured request-completion logs, and Cloudflare Workers observability.
- Added provider timeouts for Pyth, CoinGecko, and CoinMarketCap to match existing bounded Jupiter/Cetus/RPC reads.
- Added matching Next.js website-origin proxies for health/readiness/capabilities/system/OpenAPI and hardened the generic BFF with Sui context forwarding and upstream timeout/error handling.
- Added live web and Expo system-status surfaces driven by the same safe system overview and chain-read endpoints.
- Added public-env secret-boundary and full-stack contract gates plus a GitHub Actions static-quality workflow; dependency build runs when a committed lockfile is present.
- Changed Worker default rollout flags for unfinished Vault and Swap execution back to fail-closed `false`.


### Solana API
- Added canonical `GET /api/v1/rpc/health`, `GET /api/v1/programs/verify`, `GET /api/v1/token/mint/:mint`, and `GET /api/v1/token/market?mint=<required>` routes.
- Added PowerChain Finance, Factory, and Launchpad deployment verification targets using the same Solana account/executable verification service; no deployment IDs are fabricated.
- Added server-only Pyth API authentication plus independent Pyth/CoinGecko/CoinMarketCap price-resolution provenance. Pyth remains transactional only when its configured feed passes policy; CoinGecko/CoinMarketCap remain references.
- Preserved `/api/token/market` as a compatibility alias that may default to configured `PWRC_MINT`; canonical v1 market routes require an explicit mint.
- Added matching Next.js website-origin proxies for all new canonical routes while keeping Helius/custom RPC/oracle credentials server-side.
- Added canonical `GET /api/v1/solana/overview`, `/api/v1/solana/programs`, `/api/v1/solana/market?mint=<address>` and `/api/v1/solana/assets/:mint` read endpoints.
- Added compatibility aliases at `/api/solana/overview`, `/api/token/market` and `/api/assets/:mint`, all delegating to the same Solana read service.
- Added on-chain program executable checks and SPL/Token-2022 inspection. `getTokenSupply` is authoritative for supply/decimals; Jupiter Price API V3 provides USD price, 24h change and price block; Jupiter Tokens API V2 provides liquidity/market metadata. Helius is supported as the managed RPC provider.
- Added optional deployment variables for merchant, escrow, receipt and vault program descriptors without fabricating deployment IDs.


### Sui API
- Added canonical `GET /api/v1/sui/overview`, `/api/v1/sui/packages`, `/api/v1/sui/market?coinType=<type>` and `/api/v1/sui/assets/:coinType` routes plus compatibility aliases under `/api/sui/**`.
- Added Sui JSON-RPC reads for chain identity/checkpoint, Move package inspection, coin metadata and total supply.
- Added Cetus mainnet/testnet market adapter with explicit raw CLMM liquidity vs USD-liquidity provenance and conservative stable-pair derivation only when configured.
- Added devnet/testnet/mainnet Sui deployment registries with null package IDs until real Move publication.

### Product and checkout UX
- Refined the web checkout into a compact three-step payment card with immutable recipient locking, smaller Pyth/SOL market context, quote-expiry handling, and an improved order summary.
- Added wallet, Solana Pay/mobile handoff, Stripe Checkout, MoonPay and Coinbase Pay funding method surfaces with provider execution kept behind server-side capability/configuration gates.
- Added server-created Stripe Checkout Sessions so PowerPay never collects raw card PAN/CVC data.
- Added Product, About, Privacy, Terms, Cookies and Disclaimer routes, product mockups, responsive branded illustration icons, and configurable footer social destinations.
- Moved Preview/Execution status into the reusable web top bar and changed the public header action to Connect Wallet.

### Mobile UX
- Refactored Home, Pay and Wallet for a lighter borderless visual hierarchy, live-data-only financial surfaces, and tablet-aware responsive composition.
- Added branded Get Started screens, a floating five-tab dock, a raised Scan control, simplified quick actions, and explicit onramp/Swap/Bridge capability surfaces.
- Added secure web handoff for Stripe, MoonPay and Coinbase Pay instead of collecting card credentials in the Expo client.
- Pinned the Expo runtime to 57.0.17, Expo Router to 57.0.17, expo-camera to 57.0.4, and @expo/cli to 57.0.18.
- Added non-destructive iOS Simulator restart tooling plus stronger Xcode/simctl runtime diagnostics.


### Added
- Canonical `/env/` development configuration with `.env.example`, safe `.env.local`, and runtime-specific environment synchronization.
- `.nvmrc` and `.node-version` pinned to Node.js 24.20.0 LTS.
- Local runtime doctor and macOS repair scripts that detect deleted working directories, broken Node binaries, pnpm/Corepack mismatches, and missing `simctl`.
- Cache cleanup commands for Expo, Next.js, Wrangler, build output, and optional workspace `node_modules` removal.
- Preinstall runtime enforcement for Node 24.20.0 and pnpm 11.24.0.

### Changed
- Root engine policy now rejects Node 26 for this release line and requires Node 24.20.0.
- Local setup documentation now separates shell/cwd recovery from Node/macOS runtime repair.

### Fixed
- Documented recovery for `ENOENT: process.cwd ... uv_cwd` after a repository directory is moved or deleted while a terminal remains inside it.
- Avoided relying on Node 25+ bundled Corepack; Node 24.20.0 is the supported PowerPay runtime.

## [1.0.0] - 2026-08-28

### Added
- PowerPay mobile, web checkout, canonical payment engine, Solana/Sui adapter boundaries, Token-2022 support, QR/Solana Pay flows, transaction recovery, immutable receipts, canonical asset registry, and hardened pnpm build policy.
