#!/usr/bin/env bash
set -u

REQUIRED_NODE="24.20.0"
REQUIRED_PNPM="11.24.0"
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")" 2>/dev/null && pwd -P)"
ROOT="$(CDPATH= cd -- "$SCRIPT_DIR/.." 2>/dev/null && pwd -P)"

printf 'PowerPay local doctor\n'
printf '%s\n' '---------------------'

if ! PWD_NOW="$(pwd -P 2>/dev/null)"; then
  printf 'FAIL cwd: current directory was deleted or moved.\n'
  printf 'Recovery: cd ~ && cd "%s"\n' "$ROOT"
else
  printf 'OK   cwd: %s\n' "$PWD_NOW"
fi

if [ "$(uname -s 2>/dev/null || true)" = "Darwin" ]; then
  MACOS_VERSION="$(sw_vers -productVersion 2>/dev/null || echo unknown)"
  printf 'INFO macOS: %s\n' "$MACOS_VERSION"
  case "$MACOS_VERSION" in
    unknown) ;;
    *)
      MAC_MAJOR="${MACOS_VERSION%%.*}"
      MAC_REST="${MACOS_VERSION#*.}"
      MAC_MINOR="${MAC_REST%%.*}"
      if [ "$MAC_MAJOR" -lt 13 ] || { [ "$MAC_MAJOR" -eq 13 ] && [ "$MAC_MINOR" -lt 5 ]; }; then
        printf 'FAIL macOS: Node 24 prebuilt binaries require macOS 13.5 or newer.\n'
      else
        printf 'OK   macOS supports the Node 24 binary baseline.\n'
      fi
      ;;
  esac
fi

NODE_BIN="$(command -v node 2>/dev/null || true)"
if [ -z "$NODE_BIN" ]; then
  printf 'FAIL node: not found.\n'
else
  printf 'INFO node path: %s\n' "$NODE_BIN"
  NODE_OUTPUT="$(node --version 2>&1)"
  NODE_STATUS=$?
  if [ "$NODE_STATUS" -ne 0 ]; then
    printf 'FAIL node runtime could not start.\n%s\n' "$NODE_OUTPUT"
  elif [ "$NODE_OUTPUT" != "v$REQUIRED_NODE" ]; then
    printf 'FAIL node version: %s (required v%s)\n' "$NODE_OUTPUT" "$REQUIRED_NODE"
  else
    printf 'OK   node: %s\n' "$NODE_OUTPUT"
  fi
fi

COREPACK_BIN="$(command -v corepack 2>/dev/null || true)"
if [ -n "$COREPACK_BIN" ]; then
  printf 'OK   corepack: %s\n' "$COREPACK_BIN"
else
  printf 'WARN corepack: not found. Node 25+ no longer bundles Corepack; PowerPay pins Node %s.\n' "$REQUIRED_NODE"
fi

PNPM_BIN="$(command -v pnpm 2>/dev/null || true)"
if [ -n "$PNPM_BIN" ]; then
  PNPM_OUTPUT="$(pnpm --version 2>&1)"
  PNPM_STATUS=$?
  if [ "$PNPM_STATUS" -eq 0 ] && [ "$PNPM_OUTPUT" = "$REQUIRED_PNPM" ]; then
    printf 'OK   pnpm: %s\n' "$PNPM_OUTPUT"
  else
    printf 'WARN pnpm: %s (required %s)\n' "$PNPM_OUTPUT" "$REQUIRED_PNPM"
  fi
else
  printf 'WARN pnpm: not found.\n'
fi

if [ "$(uname -s 2>/dev/null || true)" = "Darwin" ]; then
  if xcrun --find simctl >/dev/null 2>&1; then
    printf 'OK   simctl: %s\n' "$(xcrun --find simctl)"
  else
    printf 'WARN simctl: unavailable; iOS Simulator requires full Xcode and an installed iOS runtime.\n'
  fi
fi

printf '\nRecommended recovery:\n'
printf '  cd ~\n'
printf '  cd "%s"\n' "$ROOT"
printf '  bash scripts/repair-macos-runtime.sh\n'
