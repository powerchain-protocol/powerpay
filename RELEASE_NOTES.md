# PowerPay v1.0.0 — hardened upgrade

## Payment execution

- One canonical payment engine for Scan, Checkout, Send/API and Solana Actions.
- Immutable intent lock and signed fee quote.
- Separate execution attempts with attempt-level idempotency keys.
- SHA-256 signed-transaction binding prevents a retry from substituting a different payload.
- Server-authoritative expiry and cancellation.
- Automatic expiry is limited to `CREATED`/`LOCKED`; signed/uncertain states require recovery/reconciliation.
- Append-only payment timeline and immutable settlement receipts.

## Mobile recovery

- Signed recovery payloads moved from AsyncStorage to Expo SecureStore.
- AsyncStorage stores only non-secret recovery metadata.
- Reconnect/relaunch reconciliation does not automatically rebroadcast transactions.
- Checkout cancel calls the backend and refuses unsafe cancellation after signing/submission uncertainty.

## Runtime capabilities

- Added requested-vs-effective capability policy.
- Swap, Bridge, Vault, Sui payments and Escrow fail closed until an actual execution/reconciliation adapter is present.
- Removed fabricated swap output, bridge destination and vault balance values.
- Added `GET /api/v1/readiness` for non-secret deployment readiness.

## Infrastructure

- `/backend` remains the canonical orchestration boundary.
- `/services` provides account, wallet, persistence, merchant, notification, portfolio and Solana execution adapters.
- Supabase/Postgres stores intent/attempt/quote/ledger/receipt records and strips raw signed transaction payloads.
- Program manifest validation now checks deployment-registry parity and ACTIVE deployment hashes.
- Solana Actions root manifest is checked against runtime routes.

## Mobile/product

- USDC-first mobile experience with EURC, SOL and PWRC.
- Camera-first QR scan flow.
- Uploaded PowerChain visual assets retained in onboarding/public asset directories.
- Live wallet portfolio and notification/account surfaces remain backend-driven.
