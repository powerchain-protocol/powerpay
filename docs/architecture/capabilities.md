# Capability and rollout policy

PowerPay separates **requested feature flags** from **effective runtime capabilities**.

A deployment flag is permission to expose a capability only after its execution and reconciliation adapter exists. It is not proof that the capability is safe to use.

## Fail-closed policy

The API returns effective capabilities from `GET /api/v1/capabilities`.

- `swaps` stays disabled until a live quote/build/execute adapter is wired.
- `bridge` stays disabled until a supported CCTP/cross-chain adapter and reconciliation service are wired.
- `vault` stays disabled until a compatible deployed vault program/client exists.
- `suiPayments` stays disabled until a Sui transaction adapter is present.
- `escrow` stays disabled until a deployed escrow program and settlement policy exist.
- `token2022` requires both the rollout flag and a configured PWRC mint.
- `solanaActions` requires both the rollout flag and a live Solana chain adapter.

The mobile UI consumes these server capabilities. Disabled features may be shown as planned surfaces, but must not show fabricated balances, quotes, routes or destination amounts.

## CCTP / Sui compatibility

As of 2026-08-28, Circle's current CCTP supported-chain documentation lists Solana in the current CCTP table while Sui is listed under **CCTP V1 (Legacy) only** (domain 8). PowerPay therefore does not enable a generic Solana↔Sui CCTP flow by feature flag alone. A deployment must explicitly select a compatible CCTP version, contracts/packages and reconciliation path.

Reference: Circle CCTP supported blockchains and domains documentation.
