# Transaction Recovery and Replay Safety

PowerPay treats mobile interruption as a first-class state.

- unsigned attempts can be cancelled and restarted;
- signed-but-not-submitted payloads are persisted locally for explicit resume;
- submitted transactions are reconciled by transaction ID;
- ambiguous submission never triggers automatic rebroadcast;
- QR nonces are consumed atomically in persistent storage;
- payment idempotency keys prevent duplicate commercial intents;
- Helius webhook reconciliation is correlated through the PowerPay attempt memo;
- the append-only ledger cannot be updated/deleted through normal database operations.
