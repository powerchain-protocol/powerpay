export interface PowerPayFeatures {
  escrow: boolean;
  suiPayments: boolean;
  bridge: boolean;
  vault: boolean;
  swaps: boolean;
  solanaActions: boolean;
  token2022: boolean;
}

export function featureFlags(env: Record<string, string | undefined>): PowerPayFeatures {
  const enabled = (key: string, fallback: boolean) => env[key] === undefined ? fallback : env[key] === 'true';
  return {
    escrow: enabled('FEATURE_ESCROW', false),
    suiPayments: enabled('FEATURE_SUI_PAYMENTS', false),
    bridge: enabled('FEATURE_BRIDGE', false),
    vault: enabled('FEATURE_VAULT', false),
    swaps: enabled('FEATURE_SWAPS', false),
    solanaActions: enabled('FEATURE_SOLANA_ACTIONS', true),
    token2022: enabled('FEATURE_TOKEN_2022', true),
  };
}
