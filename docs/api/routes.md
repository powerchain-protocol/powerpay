# API Routes

## Public/system

- `GET /api/v1/health`
- `GET /api/v1/ready` — canonical readiness route
- `GET /api/v1/readiness` — compatibility readiness route
- `GET /api/v1/capabilities`
- `GET /api/v1/system/overview` — safe runtime/provider configuration; never returns provider secrets
- `GET /api/v1/openapi.json` — OpenAPI 3.1 route inventory
- `GET /api/v1/prices?base=SOL&quote=USD`
- `POST /api/v1/qr/resolve`
- `GET /actions.json`
- `GET|POST /api/actions/pay/:checkoutId`
- `POST /api/v1/webhooks/helius`

## Solana read API

Canonical infrastructure:

- `GET /api/v1/rpc/health`
- `GET /api/v1/programs/verify`
- `GET /api/v1/token/mint/:mint`
- `GET /api/v1/token/market?mint=<required>`

Canonical Solana namespace:

- `GET /api/v1/solana/overview`
- `GET /api/v1/solana/programs`
- `GET /api/v1/solana/market?mint=<required>`
- `GET /api/v1/solana/assets/:mint`

Compatibility aliases:

- `GET /api/solana/overview`
- `GET /api/token/market?mint=<optional>` — defaults to configured `PWRC_MINT` when omitted
- `GET /api/assets/:mint`

All routes delegate to `components/services/src/solana/read-api.ts`; aliases do not maintain separate RPC/market logic. RPC is authoritative for cluster/program/mint state and `getTokenSupply` supply/decimals. Market resolution exposes Pyth, CoinGecko, CoinMarketCap and Jupiter provenance independently. See [`solana.md`](solana.md).

## Sui read API

Canonical:

- `GET /api/v1/sui/overview`
- `GET /api/v1/sui/packages`
- `GET /api/v1/sui/market?coinType=<type>`
- `GET /api/v1/sui/assets/:coinType`

Compatibility aliases:

- `GET /api/sui/overview`
- `GET /api/sui/packages`
- `GET /api/sui/market?coinType=<type>`
- `GET /api/sui/assets/:coinType`

These routes use Sui JSON-RPC for chain truth and Cetus for market/pool context. See [`sui.md`](sui.md).

## Account-scoped

- `GET /api/v1/account`
- `GET /api/v1/wallets`
- `GET /api/v1/portfolio/solana?address=...`
- `GET /api/v1/activity`
- `GET /api/v1/notifications`
- `POST /api/v1/notifications/:id/read`
- `POST /api/v1/notifications/read-all`

## Payment engine

- `POST /api/v1/checkouts/:id/intents`
- `POST /api/v1/payments/intents`
- `GET /api/v1/payments/intents/:id`
- `POST /api/v1/payments/intents/:id/lock`
- `POST /api/v1/payments/intents/:id/cancel`
- `GET /api/v1/payments/intents/:id/ledger`
- `GET|POST /api/v1/payments/intents/:id/attempts`
- `POST /api/v1/payments/intents/:id/attempts/:attemptId/abort`
- `POST /api/v1/payments/intents/:id/attempts/:attemptId/signed`
- `POST /api/v1/payments/intents/:id/attempts/:attemptId/submit`
- `POST /api/v1/payments/intents/:id/attempts/:attemptId/reconcile`
- `GET /api/v1/payments/intents/:id/receipt`
