# PowerPay Web + Checkout

The public website in `apps/web` adopts the light PowerPay checkout language from the historical `powerpay-checkout` reference while using the current canonical PowerPay payment engine.

## Routes

- `/` — PowerPay public website
- `/checkout` — USDC-first non-custodial checkout
- `/asset-preview` — canonical brand/token visual registry
- `/api/powerpay/**` — same-origin server proxy to `POWERPAY_API_URL`

## Execution path

```text
Web checkout
  -> POST /api/v1/payments/intents
  -> POST /lock
  -> connect wallet
  -> POST /attempts
  -> wallet signs exact simulated transaction
  -> POST /signed
  -> POST /submit
  -> POST /reconcile
  -> immutable receipt
```

The website does not set payment status locally as an authoritative source. UI stage labels mirror backend state and only show completion after reconciliation returns `SETTLED` with a receipt.

## Configuration

Copy `apps/web/.env.example` and set `POWERPAY_API_URL`. Set `NEXT_PUBLIC_POWERPAY_DEMO_RECIPIENT` only to a verified merchant/payment recipient. If it is unset, the checkout remains in preview mode and cannot create a live payment intent.

Production deployments that enable `AUTH_REQUIRED` on the API must provide a valid bearer token. `powerPayFetch` will forward a token from an existing Clerk browser session when Clerk is present; otherwise the API correctly returns an authentication error.

WalletConnect/Reown, card/onramp, Solana Pay QR, Sui execution, bridge and vault remain visibly gated until their executable adapters/configuration are present. The web design must not imply that a protocol is live merely because a button can be drawn.
