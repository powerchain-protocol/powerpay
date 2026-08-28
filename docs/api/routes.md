# API Routes

## Public/system

- `GET /api/v1/health`
- `GET /api/v1/readiness`
- `GET /api/v1/capabilities`
- `GET /api/v1/prices?base=SOL&quote=USD`
- `POST /api/v1/qr/resolve`
- `GET /actions.json`
- `GET|POST /api/actions/pay/:checkoutId`
- `POST /api/v1/webhooks/helius`

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
