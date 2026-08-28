# PowerPay Asset System

## Canonical layers

```text
assets/source/powerchain/        original PowerChain visual pack
assets/source/user-brand/        registered authoritative PWRC/wPWRC/mark sources
          │
          ├───────────────┐
          ▼               ▼
apps/web/public/      apps/mobile/assets/
          │               │
          └───────┬───────┘
                  ▼
        packages/shared/assets
                  │
          ┌───────┴────────┐
          ▼                ▼
    @powerpay/ui       Native AssetIcon
       (web)             (Expo)
```

`packages/shared/src/assets.ts` is the canonical **visual identity registry**. It is deliberately separate from mint addresses, Sui type/object identifiers, token programs, balances, bridge backing, and settlement configuration.

## Owned vs ecosystem assets

- `PWRC`, `wPWRC`, PowerPay/PowerChain marks, app icons, and custom illustrations are PowerPay-owned assets.
- PWRC remains the native Solana PowerChain token visual; wPWRC remains its distinct Sui representation visual.
- SOL, USDC, EURC, SUI, network identities, and wallet identities come from the pinned Web3 Icons source set.
- Web uses static individual `@web3icons/react` imports where components are needed.
- Expo uses selected bundled PNG derivatives generated from the corresponding `@web3icons/core` SVGs; native code never imports DOM-only SVG React components.

## Authoritative upload workflow

The latest PWRC/wPWRC/brand uploads are registered by attachment ID in `assets/source/user-brand/manifest.json`. Exact source bytes must be installed through `scripts/import-user-brand-assets.mjs`; the importer will not recreate an official source from a rendered screenshot.

```bash
pnpm assets:import-user -- \
  --pwrc ./pwrc.jpeg \
  --wpwrc ./wpwrc.jpeg \
  --logo-green ./logo-green.png \
  --logo-white ./logo-white.png \
  --logo-dark ./logo-dark.png
```

Successful installation writes source hashes/dimensions to `assets/source/user-brand/installed.json` and changes served-asset provenance to `user-upload-authoritative`.

## PWRC / wPWRC sizing

- `< 32px`: simplified mark.
- `40–64px`: mark or premium coin depending on surface hierarchy.
- `96px+`: premium coin art.

Do not shrink detailed coin art into dense navigation or status rows.

## Wallet connection

The wallet sheet uses canonical wallet identities for Phantom, Solflare, Backpack, and WalletConnect. On Android, actual Solana provider choice remains controlled by Mobile Wallet Adapter discovery. WalletConnect/Reown and Sui connectors are shown as gated until their real runtime adapters are deployed and configured; logos never imply an executable provider path.

## External icon refresh

After dependency installation:

```bash
pnpm assets:sync-web3icons
```

This copies the pinned selected SVGs from `@web3icons/core` and generates Expo-safe raster copies.

## Release gate

```bash
pnpm assets:check
```

The gate verifies canonical public/mobile paths, source/provenance state, app-icon dimensions, PowerPay-vs-Web3Icons ownership rules, wPWRC separation, wallet branding, scanner/receive branding, and removal of legacy duplicate asset roots.
