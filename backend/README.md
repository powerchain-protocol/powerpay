# PowerPay backend

`backend/` owns orchestration. It does not own wallet private keys and it does not treat chain submission as settlement.

## Canonical execution

```text
request -> identity/account -> intent -> quote/lock -> attempt -> build/simulate
        -> wallet signs externally -> submission -> confirmation -> reconciliation
        -> append-only ledger -> immutable receipt
```

`PaymentEngine` is the only payment state coordinator. Scan, checkout, send, API and Solana Actions all converge on it.

### Invariants

- Locked intent fields cannot change.
- Every execution is a separate `PaymentAttempt`.
- Every attempt has its own idempotency key.
- A signed transaction is fingerprinted before submission; a different payload cannot replace it on retry.
- A persisted `SUBMITTING` attempt is recovered; it is never automatically rebroadcast.
- `CONFIRMED` is a chain state. `SETTLED` requires application reconciliation.
- Automatic expiry applies only before wallet execution (`CREATED`/`LOCKED`).
- Receipts are generated only from reconciled settlement data.
- Authentication, wallet connection and wallet authorization are separate boundaries.
