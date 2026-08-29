# PowerPay Product + Mobile UX Upgrade Report

## Scope

This release refines PowerPay's public website, checkout and Expo mobile application while preserving the canonical payment engine and custody/settlement boundaries.

## Web

- Compact three-stage checkout card: Details → Approve → Receipt.
- Recipient validation occurs before lock; recipient, asset, amount, network, reference and merchant cannot change after lock.
- Smaller Pyth/SOL market reference and explicit quote expiry.
- Improved order summary with payment amount, 2% PowerPay service fee, token/protocol fee where applicable, separate Solana runtime fee and execution context.
- Payment methods: wallet, Solana Pay/mobile handoff, Stripe Checkout, MoonPay and Coinbase Pay.
- Stripe integration creates Checkout Sessions server-side and never collects PAN/CVC in PowerPay UI.
- MoonPay/Coinbase URLs are deployment configuration and fail closed when missing.
- Added Product, About and legal routes plus smartphone/dashboard mockups.
- Preview/execution state moved into Topbar; public header uses Connect Wallet.
- Footer social destinations are configuration-driven; unconfigured social destinations are not rendered as dead links.

## Mobile

- Brand mark/wordmark normalized across Get Started, headers and app icons.
- Floating five-tab navigation with raised branded Scan action.
- Home / Pay / Wallet cards use lighter borderless hierarchy and live-data-only balances.
- Added secure web funding handoff from Add Money.
- Swap and Bridge surfaces explain route/capability state without invented financial quotes.
- Responsive phone/tablet composition and safer bottom spacing for floating navigation.
- Expo SDK 57 release line aligned to expo 57.0.17, Expo Router 57.0.17, expo-camera 57.0.4 and @expo/cli 57.0.18.
- Added non-destructive `ios:simulator:restart` and stronger `simctl` diagnostics.

## Security / correctness

- No raw card details are accepted by PowerPay forms.
- No provider secret is exposed through `NEXT_PUBLIC_*` or `EXPO_PUBLIC_*` variables.
- Network/RPC changes invalidate payment review before wallet signature.
- Submitted transactions remain recovery/reconciliation-driven and are not blindly rebroadcast.
- Experimental protocols remain capability-gated.
