export type HeliusCluster = 'mainnet' | 'devnet';

export class HeliusClient {
  readonly rpcUrl: string;
  constructor(private readonly apiKey: string, cluster: HeliusCluster = 'mainnet') {
    if (!apiKey) throw new Error('Helius API key is required');
    this.rpcUrl = `https://${cluster}.helius-rpc.com/?api-key=${encodeURIComponent(apiKey)}`;
  }

  async rpc<T>(method: string, params: unknown[] = []): Promise<T> {
    const response = await fetch(this.rpcUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: crypto.randomUUID(), method, params }),
    });
    if (!response.ok) throw new Error(`Helius RPC HTTP ${response.status}`);
    const body = await response.json() as { result?: T; error?: { message?: string } };
    if (body.error) throw new Error(body.error.message || 'Helius RPC error');
    if (body.result === undefined) throw new Error('Helius RPC returned no result');
    return body.result;
  }

  async getTokenSupply(mint: string, commitment: 'processed' | 'confirmed' | 'finalized' = 'confirmed') {
    return this.rpc<{ value: { amount: string; decimals: number; uiAmount: number | null; uiAmountString: string } }>('getTokenSupply', [mint, { commitment }]);
  }

  async getAccountInfo(address: string, encoding: 'base64' | 'jsonParsed' = 'jsonParsed') {
    return this.rpc<unknown>('getAccountInfo', [address, { encoding, commitment: 'confirmed' }]);
  }

  async getTransfersByAddress(address: string, options: Record<string, unknown> = {}) {
    return this.rpc<unknown>('getTransfersByAddress', [address, options]);
  }

  async enhancedTransactions(address: string, limit = 20) {
    const endpoint = new URL(`https://api.helius.xyz/v0/addresses/${address}/transactions`);
    endpoint.searchParams.set('api-key', this.apiKey);
    endpoint.searchParams.set('limit', String(Math.min(Math.max(limit, 1), 100)));
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`Helius Enhanced API HTTP ${response.status}`);
    return response.json() as Promise<unknown[]>;
  }
}
