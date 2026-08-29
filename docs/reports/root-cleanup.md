# Root documentation cleanup

PowerPay keeps the repository root intentionally small.

## Canonical root Markdown

- `README.md` — current product/repository overview and developer entry point.
- `CHANGELOG.md` — chronological change record.
- `RELEASE_NOTES.md` — release-oriented summary and operational notes.

## Relocated documentation

- Current build and validation evidence: `docs/status/`
- Asset-system notes: `docs/assets/`
- Historical implementation reports: `docs/reports/history/`

Historical reports are retained for provenance but are not normative. Current architecture and API contracts live under `docs/architecture/` and `docs/api/`.

The `scripts/check-root-docs.mjs` gate enforces this policy.
