# PowerPay v1.0.0 Asset System

PowerPay uses one visual identity registry across web, mobile, checkout, QR, wallet, and future merchant surfaces.

```text
POWERPAY-OWNED                      ECOSYSTEM
PWRC / wPWRC                       SOL / USDC / EURC / SUI
PowerPay marks                     Solana / Sui
PowerChain marks                   wallet identities
illustrations                             │
       │                                  │
       └──────────────┬───────────────────┘
                      ▼
          packages/shared/src/assets.ts
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
 packages/ui (web)       apps/mobile/components
```

## Canonical browser root

`apps/web/public/`

No root `/public` directory is permitted.

## Provenance

The current PWRC, wPWRC, and logo uploads are registered in `assets/source/user-brand/manifest.json`. Until the exact original binaries are materialized into the container and processed by `pnpm assets:import-user`, currently served owned images remain explicit `uploaded-derived-fallback` assets. The release gate accepts this state only because the authoritative attachment IDs are registered.

## External icons

- `@web3icons/react` `4.1.21` — web components.
- `@web3icons/core` `4.0.55` — pinned SVG source for static public assets and Expo PNG derivatives.

## Rules

1. Never hard-code a PWRC/wPWRC/logo URL outside the shared registry.
2. Never put chain identifiers or settlement authority into the visual registry.
3. Use premium coin art only on medium/large surfaces.
4. Wallet logos do not imply connector availability.
5. Missing authoritative binary art fails provenance promotion; it is never reconstructed from a screenshot.
