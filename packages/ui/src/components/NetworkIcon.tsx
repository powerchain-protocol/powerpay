'use client';

import { NetworkSolana, NetworkSui } from '@web3icons/react';
import type { PowerPayNetwork } from '@powerpay/shared/assets';

export function NetworkIcon({ network, size = 32 }: { network: PowerPayNetwork; size?: number }) {
  return network === 'solana' ? <NetworkSolana size={size} variant="branded" /> : <NetworkSui size={size} variant="branded" />;
}
