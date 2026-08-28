export type MetadataSource = 'powerpay-registry' | 'token-2022' | 'metaplex' | 'external';

export interface AssetMetadata {
  chain: 'solana' | 'sui';
  address: string;
  name: string;
  symbol: string;
  imageUrl?: string;
  metadataUri?: string;
  source: MetadataSource;
  verified: boolean;
  creators?: { address: string; verified: boolean }[];
}

export interface MetadataProvider {
  readonly source: MetadataSource;
  resolve(address: string): Promise<AssetMetadata | null>;
}

const priority: MetadataSource[] = ['powerpay-registry', 'token-2022', 'metaplex', 'external'];

export async function resolveMetadata(providers: readonly MetadataProvider[], address: string): Promise<AssetMetadata | null> {
  const sorted = [...providers].sort((a, b) => priority.indexOf(a.source) - priority.indexOf(b.source));
  for (const provider of sorted) {
    const result = await provider.resolve(address);
    if (result) return result;
  }
  return null;
}
