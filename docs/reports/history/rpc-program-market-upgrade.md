# PowerPay RPC / Program / Token Market Upgrade Report

## Added canonical routes

- `GET /api/v1/rpc/health`
- `GET /api/v1/programs/verify`
- `GET /api/v1/token/mint/:mint`
- `GET /api/v1/token/market?mint=<required>`

All routes are implemented over the existing canonical Solana read service. Existing `/api/v1/solana/**` routes and shorter compatibility aliases remain thin views over the same implementation.

## RPC / cluster health

The health route resolves through the selected server-side Helius/custom/development-public RPC profile and returns health, slot, block height, Solana version/feature set, latest blockhash and last-valid-block-height without returning the private RPC URL or API key.

## Program deployment verification

`/api/v1/programs/verify` groups deployment targets into PowerPay, PowerChain Finance, PowerChain Factory and PowerChain Launchpad. Configured addresses are checked with `getAccountInfo`; an active deployment requires an existing executable account. External PowerChain targets are labeled `verificationMode: EXTERNAL` so deployment verification does not imply their implementation is owned by the PowerPay repository.

## Mint inspection

`/api/v1/token/mint/:mint` reuses the Solana asset inspector: SPL vs Token-2022 owner, `getTokenSupply` raw/UI supply, decimals, mint/freeze authorities, initialization state and extension names.

## Market resolution

The token-market response keeps four source families distinct:

1. Pyth Hermes: policy-validated transactional reference when a feed is configured.
2. CoinGecko: independent market reference.
3. CoinMarketCap: independent market reference via latest quotes.
4. Jupiter: Solana-native price V3 + token/liquidity V2 context.

No provider silently overwrites on-chain supply/decimals, and one provider is never mislabeled as another.

## Website origin

Next.js proxies mirror the canonical paths at the web origin and forward only reviewed cluster/RPC-profile selectors. Provider secrets remain in the API/server environment.
