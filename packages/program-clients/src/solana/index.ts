import type { ProtocolManifest } from '../manifest';
import { requireCompatibleProgram } from '../manifest';

export interface SolanaProgramClientConfig {
  manifest: ProtocolManifest;
  network: 'devnet' | 'mainnet-beta';
}

export class PowerPaySolanaPrograms {
  constructor(private readonly config: SolanaProgramClientConfig) {}
  checkout() { return requireCompatibleProgram(this.config.manifest, { name: 'powerpay-checkout', network: this.config.network, minimumVersion: '1.0.0', feature: 'checkout' }); }
  settlement() { return requireCompatibleProgram(this.config.manifest, { name: 'powerpay-settlement', network: this.config.network, minimumVersion: '1.0.0', feature: 'settlement' }); }
}
