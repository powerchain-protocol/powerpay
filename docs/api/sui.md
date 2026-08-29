# PowerPay Sui Read API

PowerPay exposes a Sui-native read contract parallel to the Solana read API. The deployment surface is named **packages** because Sui deploys Move packages rather than Solana executable programs.

## Data pipeline

```text
PowerPay API
   ↓
Sui JSON-RPC
   ├── sui_getChainIdentifier
   ├── sui_getLatestCheckpointSequenceNumber
   ├── suix_getCoinMetadata
   ├── suix_getTotalSupply
   └── sui_getObject
   ↓
chain / checkpoint / coin metadata / decimals / supply / package state

coin type
   ↓
Cetus market adapter
   ↓
pool price context / raw CLMM liquidity
   ↓
USD price + USD liquidity only when supplied or safely derivable
```

Cetus CLMM `liquidity` is a protocol liquidity value, not inherently a USD value. PowerPay exposes it as `liquidityRaw`. `liquidityUsd` is returned only when the provider supplies USD TVL/liquidity or a configured stablecoin pair permits a conservative valuation.

## Canonical v1 routes

- `GET /api/v1/sui/overview`
- `GET /api/v1/sui/packages`
- `GET /api/v1/sui/market?coinType=<0x...::module::TYPE>`
- `GET /api/v1/sui/assets/:coinType`

The canonical market route always requires an explicit `coinType`.

For path parameters, URL-encode the coin type:

```text
/api/v1/sui/assets/0x2%3A%3Asui%3A%3ASUI
```

## Compatibility aliases

- `GET /api/sui/overview`
- `GET /api/sui/packages`
- `GET /api/sui/market?coinType=<type>`
- `GET /api/sui/assets/:coinType`

`/api/sui/market` may default to `WPWRC_COIN_TYPE` when configured. These routes call the same backend service as the canonical v1 routes; they are not independent implementations.

Older `/api/v1/sui/programs`, `/api/sui/programs`, and `/api/sui/token/market` paths remain accepted temporarily as deprecated legacy aliases. New clients should not use them.

## Package response

```json
{
  "packages": [
    {
      "name": "powerpay-payments",
      "packageId": null,
      "status": "UNCONFIGURED"
    }
  ],
  "semanticType": "MOVE_PACKAGES"
}
```

A package ID remains `null` until a real network publication is configured. PowerPay does not fabricate Sui package IDs.

## Market response provenance

```json
{
  "market": {
    "coinType": "0x2::sui::SUI",
    "onChain": {
      "totalSupply": "<raw-total-supply>",
      "decimals": 9,
      "source": "SUI_RPC"
    },
    "market": {
      "usdPrice": null,
      "liquidityUsd": null,
      "liquidityRaw": null,
      "priceChange24h": null,
      "observedCheckpoint": "<checkpoint>",
      "poolCount": 0,
      "bestPoolId": null,
      "source": "CETUS_POOLS_API"
    }
  }
}
```

The checkpoint records chain observation state. It is not presented as a Cetus price block.

## Website-origin proxies

The same eight documented URLs are implemented under `apps/web/app/api/**`. The browser calls the Next.js origin; Next proxies to the PowerPay API server so Sui RPC endpoints and provider configuration stay server-side.

## Configuration

```env
SUI_NETWORK=mainnet
SUI_RPC_URL=
CUSTOM_SUI_RPC_URL=
CETUS_POOLS_URL=https://api-sui.cetus.zone/v2/sui/pools_info
SUI_USDC_COIN_TYPE=
SUI_USDT_COIN_TYPE=
WPWRC_COIN_TYPE=
POWERPAY_SUI_PACKAGE_ID=
```

Cetus market reads are enabled for mainnet/testnet. Devnet remains RPC-only in this integration.
