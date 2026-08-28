# Mobile UX Contract

- default light theme
- USDC-first payment selection, EURC secondary
- five tabs: Home, Pay, Scan, Activity, Wallet
- Scan opens the camera directly and pauses after one decoded payload
- no QR payload can broadcast without review and wallet approval
- minimum 44px touch target; primary buttons 52–56px; inputs >=54px/16px text
- safe-area sticky payment controls
- explicit offline/submitted/recovery states
- Profile and Settings use the header avatar/gear; notifications use the alarm icon
- connected-wallet records distinguish local device sessions from account-verified mappings
- fake balances are prohibited: disconnected/unconfigured states render `—` or explicit unavailable messaging
