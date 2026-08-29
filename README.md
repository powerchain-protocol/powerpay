# PowerPay v1.0.0

Mobile-first, non-custodial payment application and multi-chain program workspace for PowerPay. All payment entry points converge on one idempotent intent/attempt engine.

## Product defaults

- Light theme.
- USDC is the primary/default payment asset.
- EURC is the secondary stablecoin.
- SOL, SUI and PWRC are supported wallet assets.
- Five-tab mobile navigation: Home / Pay / Scan / Activity / Wallet.
- Profile, security and notifications live behind header actions.
- 6-digit PowerPay PIN plus device biometrics for payment approval.
- Camera-first Scan tab with explicit permission, error, resolving and scan-lock states.
- Responsive breakpoints for compact phones, phones, large phones, tablets and desktop/web.

## Repository

```text
apps/
  mobile/                 Expo Router mobile app
  web/                    Next.js website + checkout + same-origin API proxies
  api/                    Cloudflare Worker API boundary
  backend/                Canonical payment orchestration + HTTP routes
components/
  services/               Persistence, RPC, identity, merchant and notification adapters
packages/
  api-contract/           Canonical API routes, headers, version metadata and OpenAPI inventory
  api-client/             Shared browser/native API client, timeouts, request IDs and normalized errors
  payment-core/           Immutable intents, attempts and state transitions
  solana/                 RPC, program registry, Solana Pay, token support
  swaps/                  Swap-provider contracts; capability is off until execution is wired
  cross-chain/            Versioned CCTP/cross-chain lifecycle contracts
  auth/                   Clerk/Better Auth/Firebase/Supabase adapter contract
  database/               Prisma 7 PostgreSQL schema/config
  shared/                 Canonical asset/visual registry and shared constants
  ui/                     Web AssetIcon/NetworkIcon/WalletIcon, SelectDropdown and status badge components
  web3-icons/             @web3icons/react provider metadata
assets/
  source/powerchain/       Original uploaded visual-pack provenance
programs/
  manifest/               Deployment compatibility manifest
  solana/                 Anchor checkout + settlement programs
  sui/                    Move payment/receipt primitive
docs/
  architecture/           Current architecture contracts
  api/                    Canonical API documentation
  status/                 Build and validation evidence
  reports/history/        Archived implementation reports
```

## Web + checkout

`apps/web` is the dedicated PowerPay public website and non-custodial checkout surface. The interface uses white bordered panels, compact status context, medium radii, restrained green actions, a three-step payment flow, and a sticky order summary.

Routes:

- `/` — PowerPay marketing/product website
- `/checkout` — USDC-first web checkout
- `/asset-preview` — canonical asset registry preview
- `/api/powerpay/**` — same-origin proxy to the PowerPay API

Run the website separately from Expo Web:

```bash
pnpm web          # apps/web / Next.js
pnpm web:build
pnpm mobile:web   # Expo web/PWA
```

The web checkout uses the canonical intent/attempt engine and stays in preview mode until `NEXT_PUBLIC_POWERPAY_DEMO_RECIPIENT` is configured. See `docs/WEB_CHECKOUT.md`. Network/RPC changes invalidate an in-progress review, the order summary separates the canonical 2% service fee from protocol and Solana runtime fees, and SOL/token market reference data is read through the backend Pyth/CoinGecko/CoinMarketCap oracle boundary, with Jupiter kept as an independent Solana-native market source.

### Solana read API

PowerPay exposes one shared read service through both the API Worker and the website origin:

```text
GET /api/v1/rpc/health
GET /api/v1/programs/verify
GET /api/v1/token/mint/:mint
GET /api/v1/token/market?mint=<required>

GET /api/v1/solana/overview
GET /api/v1/solana/programs
GET /api/v1/solana/market?mint=<required>
GET /api/v1/solana/assets/:mint

GET /api/solana/overview
GET /api/token/market?mint=<optional>
GET /api/assets/:mint
```

The short routes are compatibility aliases, not separate implementations. RPC URLs/keys are never returned. See `docs/api/solana.md`.

## Mobile UX

### Scan-to-pay

`Scan` opens the native camera immediately after permission is granted. QR recognition is paused after the first hit, parsed, validated and routed to a payment review screen. The scanner does **not** broadcast a transaction.

Supported parser categories:

- Solana Pay `solana:` transfer URLs
- `powerpay://checkout/<id>`
- base58 wallet address QR
- unsupported/invalid QR state

### Responsive behavior

| Width | Behavior |
|---|---|
| `<360` | 16px page padding, compact text, full touch targets |
| `360–430` | canonical phone layout |
| `431–767` | large-phone layout |
| `768–1023` | centered tablet content, max width 760px |
| `1024–1279` | large-tablet layout |
| `>=1280` | desktop/web breakpoint |


## Full-stack API boundary

Web and Expo no longer maintain separate request implementations. `@powerpay/api-contract` owns route/header/version conventions and `@powerpay/api-client` owns request IDs, timeout behavior, network/RPC context, and normalized failures. The Next.js BFF forwards an explicit header allowlist and never exposes Helius, Pyth, CoinGecko, CoinMarketCap, Supabase service-role, or custom server RPC credentials.

Operational routes:

```text
GET /api/v1/health
GET /api/v1/ready
GET /api/v1/system/overview
GET /api/v1/openapi.json
GET /api/v1/capabilities
```

Browser CORS is allowlisted by `POWERPAY_ALLOWED_ORIGINS`. Native mobile requests do not require an Origin header. Standard responses include `x-request-id`, `x-powerpay-api-version`, `Server-Timing`, `X-Content-Type-Options`, and `Referrer-Policy`. See [`docs/architecture/full-stack.md`](docs/architecture/full-stack.md).

## Canonical payment execution

```text
UI / Scan / Checkout / Action / API
            ↓
      Payment Intent
            ↓ lock + signed fee quote
      Payment Attempt
            ↓ build + simulate
    external wallet signature
            ↓
   idempotent submission
            ↓
      chain confirmation
            ↓
 application reconciliation
            ↓
 append-only ledger + receipt
```

Raw signed transactions are never persisted in PostgreSQL. Mobile recovery stores a resumable signed payload in device SecureStore and binds the server attempt to its SHA-256 fingerprint.

## RPC and chain boundaries

The UI does not call Helius directly. The web header exposes explicit **Devnet / Mainnet Beta** and reviewed RPC-profile selectors. These preferences travel through the same-origin API proxy; the backend rejects cluster mismatches and only resolves allowlisted managed/custom/public-devnet profiles. A custom RPC URL remains server-side. `packages/solana` continues to provide RPC identity and health validation.

Program IDs live in `programs/solana/deployments/*.json` and are intentionally `null` until real deployment keys/IDs exist. Production IDs are never fabricated.

## Token support

The Solana package distinguishes legacy SPL Token from Token-2022. PWRC can therefore expose Token-2022 transfer-fee semantics separately from Solana network fees and PowerPay service fees.


## Asset system

PowerPay-owned visuals and ecosystem branding are intentionally separated:

```text
registered/uploaded PowerPay sources ──► canonical derivatives ──┐
                                                               ├─► shared visual registry ─► mobile + web
pinned Web3 Icons source ──────────────► ecosystem derivatives ─┘
```

- Browser-facing files live only in `apps/web/public/`.
- Expo-bundled files live in `apps/mobile/assets/`.
- `packages/shared/src/assets.ts` is the canonical visual registry.
- `PWRC` is the PowerPay-owned Solana token identity. `wPWRC` is registered separately as the PowerPay-owned Sui wrapped visual; visual metadata never defines bridge backing or settlement authority.
- SOL, USDC, EURC, SUI, Solana/Sui network identities and Phantom/Solflare/Backpack/WalletConnect identities use pinned Web3 Icons sources.
- Web uses tree-shakable individual `@web3icons/react` components. Expo uses bundled raster derivatives from the matching `@web3icons/core` SVG source.
- The current PWRC/wPWRC and green/white/dark logo binaries are installed as **user-upload-authoritative** sources. Original files are preserved under `assets/source/user-brand/originals/`, with SHA-256 hashes in `installed.json` and the public asset manifest.
- WalletConnect/Reown and Sui connector rows are capability-gated; a wallet logo never implies an executable connector.

An asset preview surface is available at `/asset-preview` in `apps/web`.

## Install

PowerPay uses a pinned local toolchain: **Node 24.20.0 LTS** and **pnpm 11.24.0**. Do not use Node 26 for this release line.

```bash
cd /path/to/powerpay
nvm install
nvm use
corepack enable
corepack install --global pnpm@11.24.0
pnpm env:sync
pnpm install
```

If the terminal reports `uv_cwd`, first `cd ~` and re-enter the repository. If Node aborts in `dyld`, run `bash scripts/repair-macos-runtime.sh`. Node 24 prebuilt binaries require macOS 13.5 or later.

Environment templates live in [`env/`](env/README.md). `env/.env.local` contains safe development placeholders and is synchronized into the Expo, Next.js and Worker runtime locations with `pnpm env:sync`.

Useful reset commands:

```bash
pnpm doctor:local
pnpm clean
pnpm clean:all
```

## Environment

Use `env/.env.local` for safe local configuration and deployment secret stores for production credentials. Never embed Helius API keys, service-role database keys, or treasury authority material in the mobile bundle.

## Documentation

- Architecture: [`docs/architecture/`](docs/architecture/)
- API: [`docs/api/`](docs/api/)
- Current status: [`docs/status/`](docs/status/)
- Historical upgrade reports: [`docs/reports/`](docs/reports/)

## Checks

Available without blockchain toolchains:

```bash
node scripts/check-structure.mjs
node scripts/check-assets.mjs
node scripts/check-program-registry.mjs
node scripts/check-actions-manifest.mjs
node scripts/check-payment-invariants.mjs
node scripts/check-solana-api.mjs
node scripts/check-sui-api.mjs
node scripts/check-public-env-secrets.mjs
node scripts/check-full-stack.mjs
```

After dependencies are installed:

```bash
pnpm typecheck
```

Solana program compilation additionally requires Rust + Solana + Anchor. Sui program compilation requires the Sui CLI.

## pnpm dependency build policy

PowerPay uses pnpm 11's fail-closed `allowBuilds` policy. The approved lifecycle/build scripts are pinned to the exact dependency versions currently required by the workspace. New or upgraded packages with build scripts must be reviewed explicitly.

```bash
pnpm install
pnpm run check:build-policy
pnpm run deps:approve-builds   # interactive review for future unapproved packages
```

Do not enable `dangerouslyAllowAllBuilds`.

## Local Expo development

PowerPay supports iOS, Android, and Expo Web. After dependency changes run `pnpm install`, then use `pnpm mobile:web:clear` for Expo Web or `pnpm ios` for the iOS Expo launcher. The dedicated Next.js website uses `pnpm web`. Native local compilation is available separately as `pnpm ios:native`.

If Xcode/Simulator discovery fails, run `pnpm ios:doctor`. See [`docs/mobile/local-development.md`](docs/mobile/local-development.md) for the full repair checklist.

## Chain read / market APIs

PowerPay exposes symmetric read surfaces for Solana and Sui without hiding chain-native semantics.

**Solana:** Helius/selected Solana RPC is authoritative for cluster health, `getTokenSupply`, `getAccountInfo`, SPL/Token-2022 inspection and deployment verification. Pyth/CoinGecko/CoinMarketCap are independently resolved price references; Jupiter Price API V3 supplies Solana-native USD price/24h change/price block and Jupiter Tokens API V2 supplies USD liquidity/market metadata.

**Sui:** Sui JSON-RPC is authoritative for coin metadata, decimals and total supply; Cetus provides pool/market context for mainnet/testnet. Raw CLMM liquidity is never presented as USD unless Cetus supplies a USD value or a configured stablecoin pair permits conservative derivation.

Canonical routes are documented in [`docs/api/solana.md`](docs/api/solana.md) and [`docs/api/sui.md`](docs/api/sui.md).

## Product surfaces

PowerPay now ships dedicated, responsive product surfaces rather than treating the Expo client as the entire product:

- `/` — public PowerPay website
- `/checkout` — USDC-first non-custodial checkout
- `/checkout/card` — Stripe-hosted card funding handoff
- `/checkout/onramp` — MoonPay / Coinbase Pay provider handoff
- `/product` — mobile, web checkout and merchant-dashboard product overview
- `/about` — company / architecture overview
- `/status` — live PowerPay runtime, Solana, Sui and provider status
- `/legal/privacy`, `/legal/terms`, `/legal/cookies`, `/legal/disclaimer` — public legal templates

The checkout uses the same canonical PaymentIntent / PaymentAttempt engine as mobile. Recipient, asset, amount, network, reference and merchant are immutable after review lock. Card/onramp surfaces never become alternate transaction engines; they are funding-provider handoffs into PowerPay-controlled payment state.

### Mobile UX

The Expo app retains Home / Pay / Scan / Activity / Wallet as its five primary destinations, with a floating navigation dock and raised Scan action. Financial values are loaded from PowerPay services rather than demo constants. Add Money can hand off to the web funding surface; Swap, Bridge and Vault remain capability-gated until their execution/reconciliation adapters are deployed.

For iOS simulator diagnostics and a non-destructive restart, use `pnpm ios:doctor` and `pnpm ios:simulator:restart`.
