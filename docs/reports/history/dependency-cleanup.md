# PowerPay v1.0.0 — Next.js / dependency cleanup

## Result

The reported Next.js development session is healthy. Next.js 16.3.3 started successfully; the remaining output consisted of TypeScript normalization and deprecated transitive dependency warnings.

## Changes

- Pinned `apps/web` to `next@16.3.3`.
- Persisted Next.js-required `jsx: react-jsx` in `apps/web/tsconfig.json`.
- Added `.next/dev/types/**/*.ts` alongside `.next/types/**/*.ts` to the TypeScript include list.
- Added `pnpm deps:trace-deprecated` / `pnpm deps:deprecated`.
- Added `scripts/trace-deprecated-deps.sh`.
- Added `docs/DEPENDENCY_HYGIENE.md`.
- Recorded the update in `CHANGELOG.md`.

## Deprecated transitive packages observed by the user

- `crypto-js@4.2.0`
- `text-encoding@0.7.0`
- `uuid@7.0.3`
- `uuid@8.3.2`

Do not globally override these packages without first tracing their owning direct dependency. Run:

```bash
pnpm deps:trace-deprecated
```

Then upgrade/replace the parent dependency and regenerate `pnpm-lock.yaml`.

## Validation

Passed locally in the packaged source:

- structure: 54 required files
- assets: 77 required assets
- program manifest: 5 entries
- Solana Actions parity
- payment invariants: 14
- pnpm build policy: 10 exact lifecycle-script approvals
- Expo universal config
- PowerPay web contract
- environment/runtime layout
- JSON parsing: 69 files

A full dependency-backed `pnpm install && pnpm check` still needs the caller's lockfile/networked development environment.
