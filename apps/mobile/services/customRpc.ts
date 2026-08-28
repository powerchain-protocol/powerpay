import * as SecureStore from 'expo-secure-store';

const HTTP_KEY = 'powerpay.custom-solana-rpc.http';
const WS_KEY = 'powerpay.custom-solana-rpc.ws';
const CLUSTER = process.env.EXPO_PUBLIC_SOLANA_CLUSTER === 'devnet' ? 'devnet' : 'mainnet-beta';
const GENESIS: Record<'mainnet-beta' | 'devnet', string> = {
  'mainnet-beta': '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2dJ',
  devnet: 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
};

export interface CustomRpcConfig { httpUrl: string; wsUrl?: string; cluster: 'mainnet-beta' | 'devnet' }
export interface CustomRpcValidation { ok: true; latencyMs: number; genesisHash: string; health: string; cluster: 'mainnet-beta' | 'devnet' }

export async function loadCustomRpc(): Promise<CustomRpcConfig | null> {
  const httpUrl = await SecureStore.getItemAsync(HTTP_KEY);
  if (!httpUrl) return null;
  return { httpUrl, wsUrl: (await SecureStore.getItemAsync(WS_KEY)) || undefined, cluster: CLUSTER };
}

export async function saveCustomRpc(config: CustomRpcConfig): Promise<void> {
  await SecureStore.setItemAsync(HTTP_KEY, config.httpUrl);
  if (config.wsUrl) await SecureStore.setItemAsync(WS_KEY, config.wsUrl); else await SecureStore.deleteItemAsync(WS_KEY);
}

export async function clearCustomRpc(): Promise<void> { await Promise.all([SecureStore.deleteItemAsync(HTTP_KEY), SecureStore.deleteItemAsync(WS_KEY)]); }

export async function validateCustomRpc(httpUrl: string, wsUrl?: string): Promise<CustomRpcValidation> {
  const parsed = new URL(httpUrl.trim());
  if (parsed.protocol !== 'https:' && !(process.env.NODE_ENV !== 'production' && parsed.protocol === 'http:')) throw new Error('Use an HTTPS RPC endpoint');
  if (wsUrl) {
    const ws = new URL(wsUrl.trim());
    if (ws.protocol !== 'wss:' && !(process.env.NODE_ENV !== 'production' && ws.protocol === 'ws:')) throw new Error('Use a WSS WebSocket endpoint');
  }
  const started = Date.now();
  const [genesisHash, latest, health] = await Promise.all([
    rpc<string>(parsed.toString(), 'getGenesisHash', []),
    rpc<{ value?: { blockhash?: string; lastValidBlockHeight?: number } }>(parsed.toString(), 'getLatestBlockhash', [{ commitment: 'confirmed' }]),
    rpc<string>(parsed.toString(), 'getHealth', []).catch(() => 'unknown'),
  ]);
  if (genesisHash !== GENESIS[CLUSTER]) throw new Error(`RPC is not ${CLUSTER}; genesis hash mismatch`);
  if (!latest?.value?.blockhash || !Number.isFinite(latest.value.lastValidBlockHeight)) throw new Error('RPC did not return a usable latest blockhash');
  return { ok: true, latencyMs: Date.now() - started, genesisHash, health, cluster: CLUSTER };
}

async function rpc<T>(url: string, method: string, params: unknown[]): Promise<T> {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: `${method}-${Date.now()}`, method, params }), signal: controller.signal });
    if (!response.ok) throw new Error(`RPC ${method} returned HTTP ${response.status}`);
    const body = await response.json() as { result?: T; error?: { message?: string } };
    if (body.error) throw new Error(body.error.message || `${method} failed`);
    if (body.result === undefined) throw new Error(`${method} returned no result`);
    return body.result;
  } finally { clearTimeout(timer); }
}
