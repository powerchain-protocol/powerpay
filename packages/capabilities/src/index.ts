import type { PaymentNetwork } from '@powerpay/payment-core';

export interface PaymentCapabilities {
  canScan: boolean;
  canSend: boolean;
  canReceive: boolean;
  canSwap: boolean;
  canBridge: boolean;
  supportsEscrow: boolean;
  supportsVault: boolean;
}

export interface CapabilityFeatureFlags {
  escrow: boolean;
  suiPayments: boolean;
  bridge: boolean;
  vault: boolean;
  swaps: boolean;
  solanaActions: boolean;
  token2022: boolean;
}

export function capabilitiesFor(network: PaymentNetwork, features: CapabilityFeatureFlags): PaymentCapabilities {
  if (network === 'SOLANA') return {
    canScan: true,
    canSend: true,
    canReceive: true,
    canSwap: features.swaps,
    canBridge: features.bridge,
    supportsEscrow: features.escrow,
    supportsVault: features.vault,
  };
  return {
    canScan: features.suiPayments,
    canSend: features.suiPayments,
    canReceive: features.suiPayments,
    canSwap: features.suiPayments && features.swaps,
    canBridge: features.suiPayments && features.bridge,
    supportsEscrow: false,
    supportsVault: false,
  };
}
