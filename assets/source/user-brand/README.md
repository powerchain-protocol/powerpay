# PowerPay user-supplied brand sources

The five attachment records in `manifest.json` are the authoritative source visuals for PWRC, wPWRC and the PowerPay/PowerChain mark variants.

The source binaries are intentionally not reconstructed from screenshots or approximated. Materialize the original files, then run:

```bash
pnpm assets:import-user -- \
  --pwrc /path/to/pwrc.jpeg \
  --wpwrc /path/to/wpwrc.jpeg \
  --logo-green /path/to/logo-green.png \
  --logo-white /path/to/logo-white.png \
  --logo-dark /path/to/logo-dark.png
```

The importer normalizes web/mobile outputs, keeps an immutable source copy and records SHA-256 provenance in the public asset manifest.
