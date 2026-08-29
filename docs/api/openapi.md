# OpenAPI and API metadata

PowerPay publishes its route inventory at:

```text
GET /api/v1/openapi.json
```

The document is generated from `@powerpay/api-contract`, the same package used by the backend and cross-platform API client. It is intentionally an interface inventory rather than a source of runtime secrets or deployment IDs.

Operational metadata is available separately:

```text
GET /api/v1/health
GET /api/v1/ready
GET /api/v1/system/overview
GET /api/v1/capabilities
```

`/system/overview` reports whether providers and security controls are configured, but never returns RPC URLs, API keys, service-role keys, JWTs, quote-signing secrets, wallet material, or raw signed transactions.
