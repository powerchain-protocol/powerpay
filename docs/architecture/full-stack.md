# PowerPay Full-Stack Architecture v1.1

PowerPay uses a single versioned API contract across the website, Expo mobile app, Cloudflare Worker API, backend payment engine, Solana read services, and Sui read services.

## Request path

```text
Web browser ──► Next.js same-origin BFF ─┐
                                         ├──► PowerPay API Worker ─► Backend handler
Expo mobile ─────────────────────────────┘                         │
                                                                  ├──► PaymentEngine / ledger / persistence
                                                                  ├──► Solana RPC / Helius
                                                                  ├──► Jupiter / Pyth / CoinGecko / CoinMarketCap
                                                                  └──► Sui RPC / Cetus
```

`@powerpay/api-contract` owns stable route names, request-context headers, error-envelope types, API version metadata, and the OpenAPI route inventory. `@powerpay/api-client` owns cross-platform request execution, timeout behavior, request IDs, network-context propagation, and normalized errors. Web and mobile wrap this client only to provide their authentication/session state.

## Security boundary

Browser/mobile clients may select declared network and RPC profiles, but they never receive Helius keys, provider API keys, Supabase service credentials, quote-signing secrets, or raw custom server RPC URLs. The Next.js BFF forwards only an explicit header allowlist. Production payment execution remains server-authoritative and fail-closed.

CORS is origin-allowlisted. Requests receive `x-request-id`, `x-powerpay-api-version`, `Server-Timing`, `X-Content-Type-Options`, and `Referrer-Policy` response metadata. Unrecognized browser origins do not receive credentialed CORS access.

## Runtime endpoints

- `GET /api/v1/health` — liveness only.
- `GET /api/v1/ready` — deployment/configuration readiness (`/readiness` remains compatible).
- `GET /api/v1/system/overview` — safe runtime/provider configuration overview with no secrets.
- `GET /api/v1/openapi.json` — OpenAPI 3.1 route inventory.
- `GET /api/v1/capabilities` — effective, fail-closed product capabilities.

## Chain truth

Solana RPC is authoritative for cluster state, program executable state, mint owner/program, supply, decimals, authorities, and Token-2022 extensions. Jupiter/Pyth/CoinGecko/CoinMarketCap are market providers only.

Sui RPC is authoritative for chain state, Move package objects, coin metadata, and total supply. Cetus provides pool/market context only.

## Payment truth

The payment state machine remains authoritative:

```text
Intent → locked quote → attempt → wallet signature → submit → confirm → reconcile → receipt
```

A chain submission is never treated as ledger settlement by itself. Recovery does not blindly resubmit an uncertain signed transaction.
