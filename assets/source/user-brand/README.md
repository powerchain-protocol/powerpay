# PowerPay user-supplied brand sources

The current PWRC, wPWRC, green, white and dark PowerPay/PowerChain visuals are installed as the authoritative asset sources. Original binaries are retained under `assets/source/user-brand/originals/` and SHA-256 provenance is recorded in `installed.json` and the public asset manifest.

To replace the authoritative sources later, materialize the new files and run:

```bash
pnpm assets:import-user -- \
  --pwrc /path/to/pwrc.jpeg \
  --wpwrc /path/to/wpwrc.jpeg \
  --logo-green /path/to/logo-green.png \
  --logo-white /path/to/logo-white.png \
  --logo-dark /path/to/logo-dark.png
```

The importer normalizes web/mobile outputs, preserves immutable source copies, and records hashes. Execution identifiers such as token mints and program IDs never belong in this visual registry.
