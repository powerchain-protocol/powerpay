# PowerPay Solana API Upgrade

Implemented seven GET endpoints over one canonical `SolanaReadService`.

## Canonical

- `/api/v1/solana/overview`
- `/api/v1/solana/programs`
- `/api/v1/solana/market?mint=<address>`
- `/api/v1/solana/assets/:mint`

## Compatibility

- `/api/solana/overview`
- `/api/token/market?mint=<address>`
- `/api/assets/:mint`

The API Worker performs RPC/market reads. The Next.js route files are thin server-side proxies and never expose Helius credentials or custom RPC URLs. Program verification is fail-closed and reports unconfigured/unsupported deployments rather than inventing IDs.
