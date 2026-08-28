# Fees and Quotes

Fee calculation is server-side and bound to one payment intent. A quote contains subtotal, PowerPay service fee, optional PWRC protocol fee, network-fee estimate, expiry, SHA-256 quote hash and optional HMAC signature.

For Solana, explicit PowerPay service/protocol fees are routed to the configured `POWERPAY_FEE_TREASURY`. If a non-zero PowerPay fee exists and no treasury is configured, execution fails closed.

Token-2022 transfer-extension fees are distinct from PowerPay application fees and are enforced by the token program. Network fees are paid by the Solana transaction fee payer and should be presented separately whenever denominated in a different asset.
