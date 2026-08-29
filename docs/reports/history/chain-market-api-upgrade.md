# PowerPay Chain Market API Upgrade

## Scope

This release extends the PowerPay read API from a Solana-only view to a provider-separated Solana + Sui market architecture.

## Solana pipeline

```text
Helius / selected Solana RPC
        ↓
getTokenSupply + getAccountInfo
        ↓
authoritative supply / decimals / token program

mint
        ↓
Jupiter Price API V3
        ↓
USD price / 24h change / price block / market decimals

mint
        ↓
Jupiter Tokens API V2
        ↓
USD liquidity / token metadata / market context
```

`getTokenSupply` remains authoritative. Jupiter decimals are checked against the on-chain value and cannot overwrite it.

## Sui pipeline

```text
Sui JSON-RPC
        ↓
suix_getCoinMetadata + suix_getTotalSupply
        ↓
authoritative coin decimals / supply

coin type
        ↓
Cetus pools API
        ↓
price context / pool context / raw CLMM liquidity
        ↓
USD liquidity only when explicit or safely derivable
```

The Sui API uses Move-package semantics even though it retains `/programs` for cross-chain client symmetry.

## Routes

### Solana

- `GET /api/v1/solana/overview`
- `GET /api/v1/solana/programs`
- `GET /api/v1/solana/market?mint=<address>`
- `GET /api/v1/solana/assets/:mint`
- compatibility aliases under `/api/solana`, `/api/token`, and `/api/assets`

### Sui

- `GET /api/v1/sui/overview`
- `GET /api/v1/sui/programs`
- `GET /api/v1/sui/market?coinType=<type>`
- `GET /api/v1/sui/assets/:coinType`
- compatibility aliases under `/api/sui/**`

All website-origin routes are thin server proxies to the canonical API runtime.

## Fail-closed behavior

- No Helius/Jupiter/Cetus/RPC secret is returned to clients.
- Missing Jupiter credentials make Jupiter market fields unavailable; no critical market conversion is silently guessed.
- Cetus raw CLMM liquidity is distinct from USD liquidity.
- Sui package IDs remain null until real publication.
- Devnet Sui is RPC-only in this integration; Cetus is enabled for mainnet/testnet.
