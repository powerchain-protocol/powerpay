export interface SolanaJsonRpcClientOptions {
  url: string;
  headers?: Record<string, string>;
  timeoutMs?: number;
}

export class SolanaJsonRpcClient {
  constructor(private readonly options: SolanaJsonRpcClientOptions) {}

  async call<T>(method: string, params: unknown[] = []): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.options.timeoutMs ?? 8000);
    try {
      const response = await fetch(this.options.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...(this.options.headers ?? {}) },
        body: JSON.stringify({ jsonrpc: '2.0', id: crypto.randomUUID(), method, params }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Solana RPC ${method} returned ${response.status}`);
      const body = await response.json() as { result?: T; error?: { message?: string } };
      if (body.error) throw new Error(body.error.message || `Solana RPC ${method} failed`);
      if (body.result === undefined) throw new Error(`Solana RPC ${method} returned no result`);
      return body.result;
    } finally {
      clearTimeout(timer);
    }
  }
}
