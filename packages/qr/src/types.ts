export type QrPayload =
  | { kind: 'SOLANA_PAY'; raw: string; recipient: string; amount?: string; splToken?: string; reference?: string; label?: string; message?: string; memo?: string }
  | { kind: 'SOLANA_ACTION'; raw: string; url: string }
  | { kind: 'POWERPAY_CHECKOUT'; raw: string; checkoutId: string; reference?: string; nonce: string; expiresAt: string }
  | { kind: 'WALLET_ADDRESS'; raw: string; address: string; network: 'SOLANA' | 'SUI' }
  | { kind: 'PAYMENT_LINK'; raw: string; url: string }
  | { kind: 'PROGRAM_FUNDING'; raw: string; programId: string; reference: string }
  | { kind: 'DONATION'; raw: string; checkoutId: string; nonce: string; expiresAt: string }
  | { kind: 'UNSUPPORTED'; raw: string; reason: string };
