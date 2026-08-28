export type SwapProviderName = 'jupiter' | 'raydium' | 'meteora' | 'cetus';

export interface SwapQuoteRequest {
  chain: 'solana' | 'sui';
  inputAsset: string;
  outputAsset: string;
  inputAmountAtomic: bigint;
  maxSlippageBps: number;
}

export interface SwapQuote {
  provider: SwapProviderName;
  inputAmountAtomic: bigint;
  expectedOutputAtomic: bigint;
  minimumOutputAtomic: bigint;
  priceImpactBps: number;
  estimatedNetworkFeeUsdMicros: bigint;
  routeHops: number;
  expiresAt: string;
  opaqueExecutionPayload?: unknown;
}

export interface SwapProvider {
  name: SwapProviderName;
  supports(request: SwapQuoteRequest): boolean;
  quote(request: SwapQuoteRequest): Promise<SwapQuote>;
}

export function scoreQuote(quote: SwapQuote): bigint {
  const priceImpactPenalty = BigInt(Math.max(quote.priceImpactBps, 0)) * 1000n;
  const routePenalty = BigInt(Math.max(quote.routeHops - 1, 0)) * 10000n;
  const feePenalty = quote.estimatedNetworkFeeUsdMicros / 100n;
  return quote.expectedOutputAtomic - priceImpactPenalty - routePenalty - feePenalty;
}

export async function bestQuote(providers: readonly SwapProvider[], request: SwapQuoteRequest): Promise<SwapQuote> {
  const supported = providers.filter((provider) => provider.supports(request));
  if (!supported.length) throw new Error('No swap provider supports this route');
  const results = await Promise.allSettled(supported.map((provider) => provider.quote(request)));
  const quotes = results.flatMap((result) => result.status === 'fulfilled' ? [result.value] : []);
  if (!quotes.length) throw new Error('All swap providers failed to quote');
  return quotes.sort((a, b) => scoreQuote(a) > scoreQuote(b) ? -1 : 1)[0];
}
