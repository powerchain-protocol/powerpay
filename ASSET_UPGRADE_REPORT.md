# PowerPay v1.0.0 — Canonical Asset Upgrade Report

Date: 2026-08-28

## Completed

- Standardized browser assets under `apps/web/public` and native assets under `apps/mobile/assets`.
- Registered the latest user-provided PWRC, wPWRC, and green/white/dark brand source attachment IDs in `assets/source/user-brand/manifest.json`.
- Added a deterministic authoritative-source importer (`scripts/import-user-brand-assets.mjs`) that validates image dimensions, preserves original bytes, records SHA-256 hashes, emits web/mobile derivatives, refreshes app icons, and promotes public provenance only after exact sources are installed.
- Registered PWRC and wPWRC as separate PowerPay-owned visual definitions. wPWRC is visually associated with Sui but does not encode Sui object/type IDs or backing policy.
- Added pinned ecosystem assets from Web3 Icons: USDC, EURC, SOL, SUI, Solana, Sui, Phantom, Solflare, Backpack, and WalletConnect.
- Web uses static individual `@web3icons/react` imports; mobile uses bundled PNG derivatives from the corresponding `@web3icons/core` SVG sources.
- Added real wallet-brand visuals to the mobile connect sheet.
- WalletConnect/Reown remains fail-closed until a real connector adapter and project configuration are deployed.
- Updated `AssetIcon` so detailed PowerPay coin art is selected only on sufficiently large surfaces; small PWRC/wPWRC UI uses marks.
- Removed the remaining raw PowerPay mark path from the Solana Mobile Wallet Adapter identity; it now resolves through the shared registry.
- Expanded `/asset-preview` with PWRC/wPWRC scale behavior, brand tones, networks, and wallet identities.
- Added asset-system release checks for provenance, source attachment registration, icon provider versions, Web3Icons SVG provenance, app icon size, wPWRC separation, wallet branding, QR branding, and no chain IDs in the visual registry.

## Authoritative binary status

The attachment IDs are registered and treated as the intended source-of-truth. The exact five new attachment binaries are **not present as materialized files in this runtime**, so the build intentionally remains:

```text
registered-awaiting-binary-materialization
```

It does not claim the fallback derivatives are the exact uploaded originals.

To promote the build after materialization:

```bash
pnpm assets:import-user -- \
  --pwrc /path/pwrc.jpeg \
  --wpwrc /path/wpwrc.jpeg \
  --logo-green /path/logo-green.png \
  --logo-white /path/logo-white.png \
  --logo-dark /path/logo-dark.png
pnpm assets:check
```

## External icon pins

```text
@web3icons/react  4.1.21
@web3icons/core   4.0.55
```

Static selected SVG copies include the upstream `web3icons` class and are attributed in `apps/web/public/assets/WEB3ICONS.md`.
