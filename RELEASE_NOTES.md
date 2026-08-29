# PowerPay 1.0.0 — full-stack consolidation

This release consolidates PowerPay around one API contract and one cross-platform API client. The Cloudflare Worker now exposes canonical readiness/system/OpenAPI endpoints, origin-allowlisted CORS, request correlation headers, bounded provider calls, and Workers observability. The Next.js BFF and Expo client share the same request semantics, and both web and mobile expose live infrastructure-status surfaces.

Chain truth and payment truth remain unchanged: Solana/Sui RPC state is authoritative for on-chain fields, market providers remain provenance-separated, unfinished execution capabilities remain fail-closed, and transaction submission does not become ledger settlement until reconciliation.

# PowerPay 1.0.0 — Solana + Sui market/read upgrade

This release adds a provider-separated dual-chain read architecture. Solana uses Helius/selected RPC for authoritative on-chain mint state, Jupiter Price API V3 for USD price/24h change/price block, and Jupiter Tokens API V2 for USD liquidity/market metadata. Sui uses Sui JSON-RPC for chain/package/coin state and Cetus for mainnet/testnet market/pool context.

No provider is allowed to override authoritative chain fields: Solana RPC supply/decimals and Sui RPC total supply/decimals remain canonical. Missing market data stays unavailable rather than being silently estimated. Move package IDs remain null until actual deployment.

# PowerPay 1.0.0 — product + mobile UX refinement

This refinement adds the dedicated public website/product pages, compact recipient-locked checkout, Stripe/MoonPay/Coinbase Pay funding handoffs, configurable social/footer links, responsive mobile/tablet composition, branded Expo app icons, floating navigation, onramp surfaces, Swap/Bridge capability views, and improved iOS simulator diagnostics.

The payment engine remains canonical and unchanged in authority: UI surfaces create immutable intents and attempts, wallet signatures authorize chain execution, and ledger receipts are emitted only after reconciliation. Funding providers do not receive custody authority over PowerPay wallets or settlement programs.

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

The current user-supplied PowerPay/PWRC binaries are installed as authoritative sources, with original files and SHA-256 provenance retained under `assets/source/user-brand/`.

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

## RPC / program / token market extension

- Added `/api/v1/rpc/health`, `/api/v1/programs/verify`, `/api/v1/token/mint/:mint`, and `/api/v1/token/market?mint=<required>`.
- Added PowerChain Finance, Factory, and Launchpad external deployment-verification targets without fabricating IDs.
- Added Pyth authenticated transactional resolution plus CoinGecko and CoinMarketCap independent references.
- Preserved Jupiter V3/V2 market provenance and RPC-authoritative supply/decimals.
- Added matching Next.js website-origin proxies. Compatibility aliases remain thin delegates; `/api/token/market` may default to `PWRC_MINT`.
