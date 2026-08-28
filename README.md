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
  web/                    Next.js web surface + canonical public assets
  api/                    Cloudflare Worker API boundary
backend/                  Canonical payment orchestration + HTTP routes
services/                 Persistence, RPC, identity, merchant and notification adapters
packages/
  payment-core/           Immutable intents, attempts and state transitions
  solana/                 RPC, program registry, Solana Pay, token support
  swaps/                  Swap-provider contracts; capability is off until execution is wired
  cross-chain/            Versioned CCTP/cross-chain lifecycle contracts
  auth/                   Clerk/Better Auth/Firebase/Supabase adapter contract
  database/               Prisma 7 PostgreSQL schema/config
  shared/                 Canonical asset/visual registry and shared constants
  ui/                     Web AssetIcon/NetworkIcon/WalletIcon components
  web3-icons/             @web3icons/react provider metadata
assets/
  source/powerchain/       Original uploaded visual-pack provenance
programs/
  manifest/               Deployment compatibility manifest
  solana/                 Anchor checkout + settlement programs
  sui/                    Move payment/receipt primitive
```

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

The UI does not call Helius directly. `packages/solana` exposes provider-neutral configuration and RPC health validation. A custom RPC must pass HTTPS/localhost checks, cluster identity and latest-blockhash validation before it is accepted.

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
- The newest PWRC/wPWRC/green-white-dark logo uploads are registered by attachment ID in `assets/source/user-brand/manifest.json`. Their exact bytes were not materialized into this runtime, so served PowerPay-owned images remain explicit `uploaded-derived-fallback` files until `pnpm assets:import-user` runs against the originals. The importer records hashes, creates app/web derivatives and promotes provenance to `user-upload-authoritative`.
- WalletConnect/Reown and Sui connector rows are capability-gated; a wallet logo never implies an executable connector.

An asset preview surface is available at `/asset-preview` in `apps/web`.

## Install

The source uses a pnpm workspace. Install in a network-enabled environment:

```bash
corepack enable
pnpm install
```

For Expo-compatible native dependencies, verify/normalize versions with:

```bash
pnpm --filter @powerpay/mobile exec expo install --check
```

Then:

```bash
pnpm mobile
```

## Environment

Copy `.env.example` to `.env` and populate server-side secrets. Never embed normal Helius API keys, service-role database keys or treasury authority material in the mobile bundle.

## Checks

Available without blockchain toolchains:

```bash
node scripts/check-structure.mjs
node scripts/check-assets.mjs
node scripts/check-program-registry.mjs
node scripts/check-actions-manifest.mjs
node scripts/check-payment-invariants.mjs
```

After dependencies are installed:

```bash
pnpm typecheck
```

Solana program compilation additionally requires Rust + Solana + Anchor. Sui program compilation requires the Sui CLI.
