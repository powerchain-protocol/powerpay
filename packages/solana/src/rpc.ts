export type SolanaCluster = 'mainnet-beta' | 'devnet';
export type RpcProviderKind = 'helius' | 'custom' | 'solana-public';

export interface SolanaRpcConfig {
  provider: RpcProviderKind;
  cluster: SolanaCluster;
  httpUrl: string;
  wsUrl?: string;
}

export interface RpcHealthResult {
  ok: boolean;
  latencyMs: number;
  genesisHash?: string;
  blockhash?: string;
  error?: string;
}

const GENESIS: Record<SolanaCluster, string> = {
  'mainnet-beta': '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  devnet: 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
};

async function rpc<T>(url: string, method: string, params: unknown[] = [], timeoutMs = 8000): Promise<T> {
  if (!/^https:\/\//.test(url) && !/^http:\/\/localhost(?::\d+)?(?:\/|$)/.test(url)) {
    throw new Error('RPC must use HTTPS (localhost HTTP allowed for development)');
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`RPC HTTP ${response.status}`);
    const body = await response.json() as { result?: T; error?: { message?: string } };
    if (body.error) throw new Error(body.error.message || 'RPC error');
    if (body.result === undefined) throw new Error('RPC returned no result');
    return body.result;
  } finally {
    clearTimeout(timer);
  }
}

export async function validateRpc(config: SolanaRpcConfig): Promise<RpcHealthResult> {
  const start = Date.now();
  try {
    const genesisHash = await rpc<string>(config.httpUrl, 'getGenesisHash');
    // Prefix checks protect against accidental cluster mismatch without treating this as settlement authority.
    if (!genesisHash.startsWith(GENESIS[config.cluster])) {
      return { ok: false, latencyMs: Date.now() - start, genesisHash, error: `Cluster mismatch: expected ${config.cluster}` };
    }
    const latest = await rpc<{ value: { blockhash: string } }>(config.httpUrl, 'getLatestBlockhash', [{ commitment: 'confirmed' }]);
    return { ok: true, latencyMs: Date.now() - start, genesisHash, blockhash: latest.value.blockhash };
  } catch (error) {
    return { ok: false, latencyMs: Date.now() - start, error: error instanceof Error ? error.message : String(error) };
  }
}
