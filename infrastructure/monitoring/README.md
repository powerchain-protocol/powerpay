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


## Worker telemetry

`apps/api/wrangler.toml` enables Cloudflare Workers observability. The backend emits one structured `powerpay.request` JSON record per handled request containing only request ID, method, pathname, status, and duration. Query strings, authorization headers, request bodies, provider credentials, wallet signatures, and signed transactions are never included in this request-completion log.

Every standard API response also carries `x-request-id`, `x-powerpay-api-version`, and `Server-Timing` so browser/mobile failures can be correlated with server logs without exposing secrets.
