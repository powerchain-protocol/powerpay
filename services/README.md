# PowerPay services

`services/` contains infrastructure adapters used by the canonical backend.

- account directory: auth subject -> canonical PowerPay account, verified wallet mappings
- notifications: persistent alarm feed and read state
- merchant directory: checkout/merchant trust resolution
- repositories: in-memory development and Supabase/Postgres persistence
- oracle router: Pyth transactional pricing and CoinGecko reference pricing
- Solana transaction builder: SOL, SPL Token and Token-2022
- Solana portfolio: server-side exact balance reads through Helius/custom RPC
- Solana Actions: `actions.json` routing, GET/POST response helpers and CORS

Vendor clients must remain adapters. Business state transitions belong in `backend/` / `packages/payment-core`.
