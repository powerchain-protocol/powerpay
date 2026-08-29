# PowerPay web validation — 2026-08-28

Passed:

- `check-web-experience.mjs`: 29 required website/checkout files.
- USDC-first canonical intent flow + reconciliation.
- Immutable recipient review/lock contract.
- Wallet / Solana Pay / Stripe / MoonPay / Coinbase Pay method definitions.
- Server-side Stripe Checkout Session endpoint.
- Provider-configured MoonPay/Coinbase handoff endpoint.
- Explicit PowerPay 2% service fee + separate Solana network fee disclosure.
- Devnet / Mainnet Beta + RPC profile controls.
- Product/About/legal routes, smartphone/dashboard mockups, FAQ and configurable footer socials.
- Topbar deployment/preview context.
- No parser-level TS/TSX errors in the broad source syntax pass.
- CSS brace structure passed.

Dependency-backed `next build` and `tsc --noEmit` should be run after `pnpm install` in the supported Node 24.20.0 / pnpm 11.24.0 local runtime.
