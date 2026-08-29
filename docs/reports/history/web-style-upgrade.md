# PowerPay Web + Checkout Style Upgrade

## Reference

Visual and interaction reference: `powerchain-protocol/powerpay-checkout`, historical checkout implementation before the latest repository cleanup.

The reference establishes the design grammar used here:

- light `#F7F9F7` canvas
- white bordered surfaces
- compact centered navigation
- status/network context strips
- medium 12–18px radii
- dark-green / green primary actions
- three-step Select → Approve → Complete progression
- main checkout panel plus sticky order summary
- wallet approval as the authorization boundary

The current implementation adapts that grammar into the broader PowerPay product instead of reproducing its PWRC-sale-specific functionality.

## New public website

`apps/web/app/page.tsx` now contains a full marketing/product homepage rather than redirecting to the asset preview. Sections include:

1. USDC-first PowerPay hero and interactive checkout preview
2. supported asset/network rail
3. checkout / scan / wallet / settlement feature architecture
4. local + web payment workflow
5. canonical payment-engine architecture
6. security model
7. conversion CTA and footer

No PowerChain Mobile/renewable-store screenshot is used in the hero because the user requested the website to present as **PowerPay**.

## Checkout

`/checkout` is wired to the current PowerPay backend contract:

```text
POST /api/v1/payments/intents
POST /api/v1/payments/intents/:id/lock
POST /api/v1/payments/intents/:id/attempts
wallet sign exact returned transaction
POST /signed
POST /submit
POST /reconcile
SETTLED + immutable receipt
```

USDC is the default asset. EURC, SOL and PWRC remain selectable. Execution is fail-closed until a merchant recipient is configured.

## Wallet behavior

Phantom, Solflare and Backpack use injected Solana wallet providers if present. If a supported wallet is not installed, its official site is opened rather than pretending a connection succeeded. WalletConnect/Reown is visibly disabled until a real project/connector configuration is wired.

The modal includes:

- Escape-to-close
- focus containment
- focus restoration
- background scroll locking
- explicit non-custodial messaging

## Web/API boundary

A same-origin Next.js proxy under `/api/powerpay/**` forwards to the server-configured `POWERPAY_API_URL`. This avoids making a cross-origin browser API the default and keeps the upstream host server-controlled.

## Development commands

```bash
pnpm web
pnpm web:build
pnpm website:typecheck
pnpm mobile:web
pnpm check:web
```

## Validation

Passed in the current environment:

- TypeScript/TSX syntax transpile for `apps/web`
- PowerPay web experience static contract
- structure check
- canonical asset check
- program registry check
- Solana Actions manifest/runtime parity
- 14 payment invariants
- pnpm build-script policy
- Expo universal configuration

A full Next.js build was not run because workspace dependencies are not installed in this execution environment.
