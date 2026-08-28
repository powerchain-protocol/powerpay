import type { ProtocolManifest } from '../manifest';
import { requireCompatibleProgram } from '../manifest';

export class PowerPaySuiPrograms {
  constructor(private readonly manifest: ProtocolManifest, private readonly network: 'devnet' | 'testnet' | 'mainnet') {}
  payments() { return requireCompatibleProgram(this.manifest, { name: 'powerpay-sui-payments', network: this.network, minimumVersion: '1.0.0', feature: 'payments' }); }
}
