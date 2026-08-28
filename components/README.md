# PowerPay Components

`components/` contains reusable application-level components that sit outside a single app.

## Service components

`components/services/` contains provider and infrastructure adapters shared by the PowerPay apps, including account, auth, merchant, notification, oracle, persistence, Solana Actions, transaction building, and portfolio services.

The package remains published internally as `@powerpay/services`, so consumers import by package name rather than filesystem path.

Business payment state transitions remain owned by `apps/backend/` and `packages/payment-core/`.
