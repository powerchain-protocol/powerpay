# PowerPay Sui API Contract Upgrade

## Summary

The Sui read API is normalized around Sui-native **Move package** terminology while preserving the same canonical service implementation used by all aliases.

## Canonical routes

```text
GET /api/v1/sui/overview
GET /api/v1/sui/packages
GET /api/v1/sui/market?coinType=<type>
GET /api/v1/sui/assets/:coinType
```

## Compatibility aliases

```text
GET /api/sui/overview
GET /api/sui/packages
GET /api/sui/market?coinType=<type>
GET /api/sui/assets/:coinType
```

The canonical v1 market route requires an explicit `coinType`. The shorter compatibility route may use configured `WPWRC_COIN_TYPE` when the query parameter is omitted.

All eight routes delegate to the same `SuiReadService`; there is no duplicated RPC, package, asset, or market implementation.

## Semantic cleanup

- backend dependency renamed from `getSuiPrograms` to `getSuiPackages`
- package response field is `packages`
- response declares `semanticType: MOVE_PACKAGES`
- Sui RPC remains authoritative for chain/package/coin state
- Cetus remains the market/pool adapter
- old `/api/v1/sui/programs`, `/api/sui/programs`, and `/api/sui/token/market` paths are retained only as deprecated compatibility fallbacks

## Next.js proxies

Matching route handlers exist under `apps/web/app/api/**` for the same canonical and compatibility paths. The browser does not receive private Sui RPC URLs or provider credentials.
