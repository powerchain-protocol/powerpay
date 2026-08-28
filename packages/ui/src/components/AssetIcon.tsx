'use client';

import type { CSSProperties, ComponentType } from 'react';
import { TokenEURC, TokenSOL, TokenSUI, TokenUSDC } from '@web3icons/react';
import { POWERPAY_ASSET_VISUALS, type PowerPayAssetSymbol } from '@powerpay/shared/assets';

type Web3IconComponent = ComponentType<{ size?: number | string; variant?: 'mono' | 'branded' | 'background'; className?: string }>;
const EXTERNAL_ICONS: Partial<Record<PowerPayAssetSymbol, Web3IconComponent>> = {
  SOL: TokenSOL,
  USDC: TokenUSDC,
  EURC: TokenEURC,
  SUI: TokenSUI,
};

export interface AssetIconProps {
  asset: PowerPayAssetSymbol;
  size?: number;
  /** Use the premium PowerPay-owned coin artwork. Intended for >=40px. */
  detailed?: boolean;
  /** @deprecated Use `detailed`; retained for compatibility with earlier PowerPay surfaces. */
  detailedPwrc?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function AssetIcon({ asset, size = 32, detailed = false, detailedPwrc = false, className, style }: AssetIconProps) {
  const definition = POWERPAY_ASSET_VISUALS[asset];
  if (definition.source === 'powerpay-owned') {
    const useDetailed = (detailed || detailedPwrc) && size >= (definition.minDetailedImagePx ?? 40);
    const src = useDetailed && definition.image ? definition.image : definition.icon;
    return <img src={src} alt={`${definition.name} (${asset})`} width={size} height={size} className={className} style={{ objectFit: 'contain', ...style }} />;
  }
  const Icon = EXTERNAL_ICONS[asset];
  if (!Icon) return <span aria-label={`${asset} icon`}>{asset.slice(0, 1)}</span>;
  return <Icon size={size} variant="branded" className={className} />;
}
