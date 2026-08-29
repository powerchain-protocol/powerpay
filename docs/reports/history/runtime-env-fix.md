# PowerPay runtime + environment fix report

Date: 2026-08-28

## Fixed failures

### `ENOENT: process.cwd ... uv_cwd`

This failure occurs when a terminal remains inside a directory that was deleted or moved. Node cannot recover because the failure occurs while resolving the process working directory.

Recovery is now documented and supported by the shell-level doctor:

```bash
cd ~
cd /path/to/powerpay
bash scripts/doctor-local.sh
```

### macOS `dyld` / `__libcpp_verbose_abort`

PowerPay now pins Node.js 24.20.0 LTS rather than Node 26. The repository includes `.nvmrc`, `.node-version`, exact `engines`, `engine-strict`, a preinstall runtime gate, and `scripts/repair-macos-runtime.sh`.

The macOS repair path checks macOS 13.5+ before installing the pinned Node binary, activates pnpm 11.24.0 through Corepack, synchronizes environment files, and clears local caches.

## Environment architecture

Canonical local files:

```text
env/
├── .env.example
├── .env.local
└── README.md
```

`pnpm env:sync` generates:

```text
.env.local
apps/mobile/.env.local
apps/web/.env.local
apps/api/.dev.vars
```

Only `EXPO_PUBLIC_*` values are written to the Expo app. Only `NEXT_PUBLIC_*` plus the server-side `POWERPAY_API_URL` are written to the Next.js app. Server secrets remain in server/Worker environment files.

## New commands

```bash
pnpm doctor:local
pnpm repair:macos
pnpm env:sync
pnpm env:check
pnpm clean
pnpm clean:all
```

## Runtime pins

- Node.js: 24.20.0
- pnpm: 11.24.0
- macOS for official Node 24 prebuilt binary: 13.5+

## Validation

Passed in the build environment:

- environment/runtime layout
- structure: 54 required files
- assets: 77 required assets
- program registry: 5 entries
- Solana Actions manifest/runtime parity
- payment invariants: 14
- pnpm exact build allowlist
- Expo universal configuration
- PowerPay website contract
- shell syntax for both recovery scripts
- repository JSON parsing

The build environment itself runs Node 22.16.0, so the exact Node 24.20.0 install/runtime path was not falsely reported as executed here. The repository now enforces and documents that path for local development.
