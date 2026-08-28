# Monitoring signals

Minimum production signals:

- payment intents created/locked/settled/failed
- attempts stuck in SIGNING/SUBMITTING/CONFIRMING
- reconciliation latency and recovery-required count
- RPC latency/error rate by configured provider
- oracle freshness/validation failures
- QR replay attempts
- authentication failures and rate-limit rejections
- webhook processing/reconciliation failures
- database append-only/constraint violations
