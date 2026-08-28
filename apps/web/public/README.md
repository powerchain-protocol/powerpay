# PowerPay Public Assets

`apps/web/public` is the only browser-facing static asset root for PowerPay.

## Rules

- PowerPay-owned visuals live under `assets/brand/` and `assets/tokens/`.
- `PWRC` and `wPWRC` always resolve through `packages/shared/src/assets.ts`; do not hard-code coin paths in UI code.
- `PWRC` is the native Solana PowerChain asset visual. `wPWRC` is a distinct Sui wrapped-asset visual. Visual registration never defines mint, object, bridge-backing, or settlement authority.
- SOL, USDC, EURC, SUI, network logos, and wallet logos use pinned Web3 Icons assets.
- Web components use static individual `@web3icons/react` imports. Selected raw SVGs from `@web3icons/core` are retained for public/static and Expo raster fallbacks.
- UI state illustrations and navigation/action/security symbols live in `images/illustrations/` and `icons/`.
- Original uploaded source visuals are preserved under repository-root `assets/source/`; source material is never served directly.

## Authoritative user uploads

The following current-conversation attachments are registered in `assets/source/user-brand/manifest.json`:

- `pwrc.jpeg` → PWRC premium coin
- `wpwrc.jpeg` → wPWRC premium coin
- `logo-green.png` → green brand mark
- `logo-white.png` → white brand mark
- `logo-dark.png` → dark brand mark

The current runtime did not expose the exact attachment bytes as ordinary container files, so the repository intentionally retains build-safe fallback bytes and records that state in `assets/manifest.json` rather than reconstructing the uploads from screenshots.

When the original files are materialized, install them with:

```bash
pnpm assets:import-user -- \
  --pwrc /path/pwrc.jpeg \
  --wpwrc /path/wpwrc.jpeg \
  --logo-green /path/logo-green.png \
  --logo-white /path/logo-white.png \
  --logo-dark /path/logo-dark.png
```

The importer validates dimensions, preserves originals + SHA-256 provenance, generates web/mobile derivatives, updates app icons, and switches the public manifest to `user-upload-authoritative`.
