import type { SolanaAssetDefinition } from './transaction-builder';

export interface SolanaPortfolioAsset {
  asset: string;
  amount: string;
  decimals: number;
  mint?: string;
  tokenProgram: 'NATIVE' | 'SPL' | 'TOKEN_2022';
}

export interface SolanaPortfolio {
  address: string;
  network: 'SOLANA';
  assets: SolanaPortfolioAsset[];
  observedAt: string;
  rpcSource: 'POWERPAY_RPC';
}

type RpcResponse<T> = { jsonrpc?: string; id?: string | number; result?: T; error?: { code: number; message: string } };

type ParsedTokenAccount = {
  account?: { data?: { parsed?: { info?: { mint?: string; tokenAmount?: { amount?: string; decimals?: number; uiAmountString?: string } } } } };
};

const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
const TOKEN_2022_PROGRAM_ID = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';

export class SolanaPortfolioService {
  constructor(private readonly rpcUrl: string, private readonly assets: SolanaAssetDefinition[]) {
    if (!rpcUrl) throw new Error('Solana portfolio service requires an RPC URL');
  }

  async get(address: string): Promise<SolanaPortfolio> {
    if (!isLikelySolanaAddress(address)) throw new Error('Invalid Solana wallet address');
    const native = this.assets.find((asset) => asset.asset === 'SOL' && asset.tokenProgram === 'NATIVE');
    const [lamports, spl, token2022] = await Promise.all([
      native ? this.rpc<number>('getBalance', [address, { commitment: 'confirmed' }]).then((result: any) => Number(result?.value ?? 0)) : Promise.resolve(0),
      this.tokenBalances(address, TOKEN_PROGRAM_ID, 'SPL'),
      this.tokenBalances(address, TOKEN_2022_PROGRAM_ID, 'TOKEN_2022'),
    ]);

    const byMint = new Map<string, { amount: bigint; decimals: number; tokenProgram: 'SPL' | 'TOKEN_2022' }>();
    for (const item of [...spl, ...token2022]) {
      const current = byMint.get(item.mint);
      if (current && current.decimals === item.decimals && current.tokenProgram === item.tokenProgram) current.amount += item.amount;
      else if (!current) byMint.set(item.mint, { amount: item.amount, decimals: item.decimals, tokenProgram: item.tokenProgram });
    }

    const output: SolanaPortfolioAsset[] = [];
    if (native) output.push({ asset: 'SOL', amount: formatAtomic(BigInt(Math.max(0, lamports)), native.decimals), decimals: native.decimals, tokenProgram: 'NATIVE' });
    for (const definition of this.assets) {
      if (definition.tokenProgram === 'NATIVE' || !definition.mint) continue;
      const balance = byMint.get(definition.mint);
      output.push({ asset: definition.asset, amount: formatAtomic(balance?.amount ?? 0n, definition.decimals), decimals: definition.decimals, mint: definition.mint, tokenProgram: definition.tokenProgram });
    }

    return { address, network: 'SOLANA', assets: output, observedAt: new Date().toISOString(), rpcSource: 'POWERPAY_RPC' };
  }

  private async tokenBalances(address: string, programId: string, tokenProgram: 'SPL' | 'TOKEN_2022') {
    const result = await this.rpc<{ value?: ParsedTokenAccount[] }>('getTokenAccountsByOwner', [address, { programId }, { encoding: 'jsonParsed', commitment: 'confirmed' }]);
    const rows: Array<{ mint: string; amount: bigint; decimals: number; tokenProgram: 'SPL' | 'TOKEN_2022' }> = [];
    for (const entry of result?.value ?? []) {
      const info = entry.account?.data?.parsed?.info;
      const mint = info?.mint;
      const raw = info?.tokenAmount?.amount;
      const decimals = Number(info?.tokenAmount?.decimals);
      if (!mint || !raw || !/^\d+$/.test(raw) || !Number.isInteger(decimals) || decimals < 0 || decimals > 18) continue;
      rows.push({ mint, amount: BigInt(raw), decimals, tokenProgram });
    }
    return rows;
  }

  private async rpc<T>(method: string, params: unknown[]): Promise<T> {
    const response = await fetch(this.rpcUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: crypto.randomUUID(), method, params }),
    });
    if (!response.ok) throw new Error(`Solana RPC HTTP ${response.status}`);
    const body = await response.json() as RpcResponse<T>;
    if (body.error) throw new Error(`Solana RPC ${body.error.code}: ${body.error.message}`);
    if (body.result === undefined) throw new Error(`Solana RPC returned no result for ${method}`);
    return body.result;
  }
}

function formatAtomic(value: bigint, decimals: number): string {
  const negative = value < 0n; const absolute = negative ? -value : value;
  if (decimals === 0) return `${negative ? '-' : ''}${absolute}`;
  const padded = absolute.toString().padStart(decimals + 1, '0');
  const whole = padded.slice(0, -decimals); const fraction = padded.slice(-decimals).replace(/0+$/, '');
  return `${negative ? '-' : ''}${whole}${fraction ? `.${fraction}` : ''}`;
}
function isLikelySolanaAddress(value: string) { return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value); }
