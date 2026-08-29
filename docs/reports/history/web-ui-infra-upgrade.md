# PowerPay Web UI / Infrastructure Upgrade

## Scope

This upgrade applies the current user-supplied PowerPay/PowerChain visual identity to the Next.js website and checkout while preserving the canonical PaymentIntent/PaymentAttempt engine.

## Brand assets

- Installed the current `logo-white.png`, `logo-green.png`, `logo-dark.png`, `pwrc.jpeg`, and `wpwrc.jpeg` inputs as authoritative source assets.
- Preserved originals under `assets/source/user-brand/originals/`.
- Recorded SHA-256 hashes and current attachment IDs in `assets/source/user-brand/installed.json` and `apps/web/public/assets/manifest.json`.
- Light surfaces use the dark PowerPay mark; dark surfaces use the white mark; green remains available for product/accent surfaces.
- Dense PWRC UI uses the simplified PowerChain symbol; >=40px token surfaces can use premium PWRC/wPWRC coin art.

## Website / checkout

- Added optimized `apps/web/components/logo.tsx`.
- Added a white light-theme footer and bordered white checkout CTA.
- Added reusable `SelectDropdown` and `StatusBadge` components in `@powerpay/ui`.
- Added Devnet/Mainnet Beta environment badges and network selector.
- Added managed/custom/public-devnet RPC profile selector with server-side allowlisting.
- A network or RPC change clears any current locked web review before signature.
- Checkout explicitly separates payment amount, 2% PowerPay service fee, protocol/token fee, and Solana runtime fee.
- Added Pyth-backed SOL/USD market reference through the existing backend oracle route. No critical conversion is silently estimated.
- Added infrastructure disclosure card and website FAQ.

## Backend routing

The browser never receives a Helius or custom RPC URL. It sends only `x-powerpay-cluster` and `x-powerpay-rpc-profile` preferences to the same-origin proxy. The proxy can route to independently configured Devnet/Mainnet Beta API deployments, and the API rejects cluster mismatches. Production public-RPC execution remains disabled.

## Validation

Passed in this runtime:

- TypeScript syntax transpile for web/UI/API source touched by this upgrade.
- CSS brace validation.
- Canonical asset gate: 77 assets, authoritative binaries installed.
- Web experience contract.
- Structure gate: 63 required files.
- Program manifest gate: 5 entries.
- Solana Actions parity.
- Payment invariants: 14.
- pnpm exact build-script allowlist policy.
- Expo universal configuration.
- Environment/runtime layout.

A full dependency-backed `next build`/workspace `tsc` still belongs in the local Node 24.20.0 + pnpm 11.24.0 environment where dependencies are installed.
