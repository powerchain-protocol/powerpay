# Canonical Payment Engine

## Entry points

`SCAN`, `CHECKOUT`, `SEND`, `BUY` and `ACTION` create the same `PowerPayPaymentIntent`.

```text
UI/API/Action
   -> create intent (idempotency key)
   -> validate merchant/asset/network/recipient
   -> signed fee quote
   -> LOCKED
   -> PaymentAttempt
   -> build + simulate through ChainAdapter
   -> wallet authorization/signature outside backend custody
   -> persist SUBMITTING
   -> submit
   -> confirm
   -> reconcile
   -> ledger + receipt
```

## Locked fields

After `LOCKED`: recipient, asset, amount, network, reference, merchant, checkout, nonce and owning account are immutable. PostgreSQL enforces the same invariant as the TypeScript domain.

## Attempts and recovery

One intent can have multiple attempts. A wallet rejection or expired signing attempt does not mutate the commercial intent. Before RPC submission, the attempt is persisted as `SUBMITTING`. An ambiguous response transitions the intent to `RECOVERY_REQUIRED`; the mobile recovery store retains the exact signed payload. Only explicit user resume may resend that same payload.

## Custody boundary

PowerPay builds and simulates transactions but mobile wallet software signs them. The application never models account authentication as signing authority.
