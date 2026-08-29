#!/usr/bin/env bash
set -euo pipefail

REQUIRED_NODE="24.20.0"
REQUIRED_PNPM="11.24.0"
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
ROOT="$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd -P)"
cd "$ROOT"

if [ "$(uname -s)" != "Darwin" ]; then
  echo "repair:macos is intended for macOS."
  exit 1
fi
MACOS_VERSION="$(sw_vers -productVersion 2>/dev/null || echo unknown)"
if [ "$MACOS_VERSION" != "unknown" ]; then
  MAC_MAJOR="${MACOS_VERSION%%.*}"
  MAC_REST="${MACOS_VERSION#*.}"
  MAC_MINOR="${MAC_REST%%.*}"
  if [ "$MAC_MAJOR" -lt 13 ] || { [ "$MAC_MAJOR" -eq 13 ] && [ "$MAC_MINOR" -lt 5 ]; }; then
    echo "PowerPay Node 24 requires macOS 13.5 or newer; detected $MACOS_VERSION."
    echo "Upgrade macOS or use a supported container/remote development host."
    exit 1
  fi
fi

echo "PowerPay runtime repair"
echo "Repository: $ROOT"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck source=/dev/null
  . "$NVM_DIR/nvm.sh"
else
  echo "nvm was not found at $NVM_DIR/nvm.sh"
  echo "Install nvm first, then rerun this script."
  exit 1
fi

nvm install "$REQUIRED_NODE"
nvm use "$REQUIRED_NODE"

ACTUAL_NODE="$(node --version)"
if [ "$ACTUAL_NODE" != "v$REQUIRED_NODE" ]; then
  echo "Expected Node v$REQUIRED_NODE, got $ACTUAL_NODE"
  exit 1
fi

corepack enable
corepack install --global "pnpm@$REQUIRED_PNPM"

ACTUAL_PNPM="$(pnpm --version)"
if [ "$ACTUAL_PNPM" != "$REQUIRED_PNPM" ]; then
  echo "Expected pnpm $REQUIRED_PNPM, got $ACTUAL_PNPM"
  exit 1
fi

node scripts/sync-env.mjs
node scripts/clean.mjs cache

echo
printf 'Runtime repaired: Node %s / pnpm %s\n' "$ACTUAL_NODE" "$ACTUAL_PNPM"
echo "Next: pnpm install"
