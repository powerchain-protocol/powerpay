# PowerPay Solana Read API

PowerPay exposes one canonical Solana read service through the Worker/API runtime and mirrors the same contract from the Next.js website origin. Helius keys, custom RPC URLs, Pyth credentials, CoinGecko keys, CoinMarketCap keys and Jupiter credentials remain server-side.

## Canonical chain-truth pipeline

```text
PowerPay API
   ↓
Helius / selected Solana RPC
   ↓
getHealth
getSlot
getBlockHeight
getVersion
getLatestBlockhash
getAccountInfo
getTokenSupply
   ↓
cluster/RPC health
program deployment state
SPL vs Token-2022
supply / decimals / authorities / extensions
```

`getTokenSupply` is authoritative for token supply and decimals. Provider market metadata never overrides the on-chain values.

## Market-resolution pipeline

```text
mint
  ↓
PowerPay token registry / mint inspection
  ↓
known symbol (when available)
  ├─ Pyth Hermes → transactional USD reference when configured + fresh
  ├─ CoinGecko   → independent reference
  └─ CoinMarketCap → independent reference

mint
  ├─ Jupiter Price API V3 → USD price / 24h change / price block
  └─ Jupiter Tokens API V2 → USD liquidity / metadata
```

Pyth is the transactional provider only when a configured feed passes freshness/confidence policy. CoinGecko and CoinMarketCap remain reference sources. Jupiter is a separate Solana market source with its own provenance.

## New canonical infrastructure routes

### `GET /api/v1/rpc/health`

Returns the selected cluster/RPC profile plus RPC health, slot, block height, Solana version/feature set and latest blockhash/last-valid-block-height.

### `GET /api/v1/programs/verify`

Verifies configured Solana deployment targets by account existence/executable state and returns grouped summaries for:

- `POWERPAY`
- `POWERCHAIN_FINANCE`
- `POWERCHAIN_FACTORY`
- `POWERCHAIN_LAUNCHPAD`

External PowerChain programs are verification targets only; PowerPay does not claim their local implementation. Missing IDs remain `UNCONFIGURED`, and no production IDs are fabricated.

### `GET /api/v1/token/mint/:mint`

Inspects a mint using the same service as `/api/v1/solana/assets/:mint` and returns SPL vs Token-2022 owner, raw/UI supply, decimals, mint authority, freeze authority, initialization state and Token-2022 extension names.

### `GET /api/v1/token/market?mint=<required>`

Canonical v1 market endpoint. `mint` is always required. The response combines authoritative on-chain supply/decimals with explicit provider-resolution results.

## Existing Solana routes

- `GET /api/v1/solana/overview`
- `GET /api/v1/solana/programs`
- `GET /api/v1/solana/market?mint=<required>`
- `GET /api/v1/solana/assets/:mint`

These delegate to the same `SolanaReadService` as the new canonical infrastructure routes.

## Compatibility aliases

- `GET /api/solana/overview`
- `GET /api/token/market?mint=<optional>`
- `GET /api/assets/:mint`

The aliases contain no independent implementation. `/api/token/market` may default to configured `PWRC_MINT`; both canonical v1 market routes require an explicit mint.

## Provider configuration

```env
SOLANA_CLUSTER=devnet
HELIUS_API_KEY=
HELIUS_RPC_URL=
CUSTOM_SOLANA_RPC_URL=

PYTH_HERMES_URL=https://pyth.dourolabs.app/hermes
PYTH_API_KEY=
PYTH_SOL_USD_FEED_ID=
PYTH_USDC_USD_FEED_ID=
PYTH_EURC_USD_FEED_ID=
PYTH_PWRC_USD_FEED_ID=

COINGECKO_API_KEY=
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
COINMARKETCAP_API_KEY=
COINMARKETCAP_BASE_URL=https://pro-api.coinmarketcap.com

JUPITER_API_KEY=
JUPITER_BASE_URL=https://api.jup.ag

POWERCHAIN_FINANCE_PROGRAM_ID=
POWERCHAIN_FACTORY_PROGRAM_ID=
POWERCHAIN_LAUNCHPAD_PROGRAM_ID=
```

All provider URLs/keys remain in the server/API runtime. Browser clients select only reviewed cluster/RPC profiles through headers; they do not receive the private provider credentials.
