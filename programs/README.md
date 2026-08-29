# PowerPay on-chain programs

This directory is the authoritative source for PowerPay on-chain logic.

- `solana/`: Anchor programs and generated IDLs.
- `sui/`: Move package for Sui payment/receipt primitives.

Production program/package IDs are intentionally not fabricated. Solana builds require the appropriate `POWERPAY_*_PROGRAM_ID` environment variables or generated deployment configuration. Deployment manifests under `solana/deployments/` and `sui/deployments/` are the source consumed by client generation and CI checks. Sui package IDs remain null until a real Move publication exists for that network.
