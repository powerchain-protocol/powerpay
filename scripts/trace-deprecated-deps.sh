#!/usr/bin/env bash
set -euo pipefail

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is required. Use Node 24.20.0 + pnpm 11.24.0." >&2
  exit 1
fi

printf '%s\n' 'PowerPay deprecated transitive dependency trace'
printf '%s\n' '================================================'
printf '%s\n\n' 'Upgrade the owning parent package; do not blindly override a transitive major.'

for dep in crypto-js text-encoding uuid; do
  printf '\n--- %s ---\n' "$dep"
  pnpm why -r "$dep" || true
done

cat <<'EOF'

Interpretation:
- crypto-js@4.2.0: upstream package is discontinued; prefer replacing/upgrading the parent dependency.
- text-encoding@0.7.0: obsolete/unmaintained Encoding API polyfill; remove through its parent dependency.
- uuid@7.x / 8.x: old majors. Upgrade the owning parent; avoid forced overrides until API compatibility is verified.
EOF
