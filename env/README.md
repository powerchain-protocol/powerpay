# PowerPay environment files

`env/.env.example` is the canonical variable inventory. `env/.env.local` contains safe local-development defaults and intentionally blank secrets.

Run:

```bash
pnpm env:sync
```

This generates the runtime-specific local files:

- `/.env.local` — local server/tooling environment
- `/apps/web/.env.local` — Next.js server + `NEXT_PUBLIC_*` values only
- `/apps/mobile/.env.local` — Expo `EXPO_PUBLIC_*` values only
- `/apps/api/.dev.vars` — Worker/API server variables only

The generated local files are ignored by Git. Production secrets belong in the deployment platform secret store, never in committed `.env.local` files.

## Runtime / CORS

```env
POWERPAY_PUBLIC_BASE_URL=http://localhost:8787
POWERPAY_ALLOWED_ORIGINS=http://localhost:3000
POWERPAY_RELEASE=1.0.0
POWERPAY_COMMIT_SHA=
```

`POWERPAY_ALLOWED_ORIGINS` is a comma-separated server-only allowlist used for credentialed browser access to the API. Do not use `*` for authenticated payment APIs. `POWERPAY_RELEASE` and `POWERPAY_COMMIT_SHA` are safe deployment metadata returned by `/api/v1/system/overview`; neither field contains secrets.

## Solana read/market providers

```env
SOLANA_CLUSTER=devnet
HELIUS_API_KEY=
HELIUS_RPC_URL=
HELIUS_WS_URL=
CUSTOM_SOLANA_RPC_URL=
JUPITER_API_KEY=
JUPITER_BASE_URL=https://api.jup.ag
```

PowerPay resolves Solana RPC in this order: an explicitly configured managed RPC URL, Helius from `HELIUS_API_KEY`, a reviewed custom RPC URL, then the public devnet endpoint only for development fallback. RPC secrets are server-only.

For canonical token reads, the API calls Solana RPC `getTokenSupply`; its raw supply and decimals are authoritative. Jupiter Price API V3 supplies USD price, 24-hour price change, price block, and its observed decimals. Jupiter Tokens API V2 supplies USD liquidity/metadata because Price V3 does not expose liquidity.

## Sui read/market providers

```env
SUI_NETWORK=devnet
SUI_RPC_URL=
CUSTOM_SUI_RPC_URL=
CETUS_POOLS_URL=https://api-sui.cetus.zone/v2/sui/pools_info
SUI_USDC_COIN_TYPE=
SUI_USDT_COIN_TYPE=
WPWRC_COIN_TYPE=
```

Sui supply/decimals are read from Sui JSON-RPC using `suix_getTotalSupply` and `suix_getCoinMetadata`. Cetus is a separate market-context adapter and is enabled only on mainnet/testnet in the current integration. Raw CLMM liquidity is never mislabeled as USD liquidity; USD liquidity is returned only when Cetus supplies a USD value or a configured stablecoin pair permits conservative derivation.

## Sui package registry

```env
POWERPAY_SUI_PACKAGE_ID=
POWERPAY_SUI_CHECKOUT_PACKAGE_ID=
POWERPAY_SUI_MERCHANT_PACKAGE_ID=
POWERPAY_SUI_VAULT_PACKAGE_ID=
POWERPAY_SUI_BRIDGE_PACKAGE_ID=
```

Leave package IDs empty until actual Move packages are published. PowerPay does not generate placeholder production IDs.
