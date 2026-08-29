# Dependency hygiene

PowerPay treats npm deprecation warnings separately from vulnerability and supply-chain gates. A lockfile may pass integrity/build-script policy while still containing transitive packages whose maintainers have deprecated them.

## Current warning set observed during install

- `crypto-js@4.2.0` — upstream development is discontinued.
- `text-encoding@0.7.0` — deprecated Encoding API polyfill.
- `uuid@7.0.3`
- `uuid@8.3.2`

The UUID entries are old majors; a deprecation warning alone is not evidence that replacing them through a global override is safe.

## Trace ownership

Run from the repository root after `pnpm install`:

```bash
pnpm deps:trace-deprecated
```

Equivalent commands:

```bash
pnpm why -r crypto-js
pnpm why -r text-encoding
pnpm why -r uuid
```

Upgrade or replace the **owning direct dependency**. Do not add a global `pnpm.overrides` entry for these packages until the owning package's API compatibility has been verified.

## Next.js TypeScript normalization

`apps/web/tsconfig.json` intentionally contains:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  },
  "include": [
    ".next/dev/types/**/*.ts",
    ".next/types/**/*.ts"
  ]
}
```

These values match what Next.js 16.3.3 applies during `next dev`, so a clean checkout should no longer produce an automatic tsconfig rewrite solely for those settings.
