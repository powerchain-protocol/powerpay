import { CoinGeckoReferenceProvider, FixedStablecoinProvider, PythHermesProvider, type PriceQuote } from '@powerpay/oracle';

export interface OracleRouterConfig {
  hermesUrl: string;
  pythFeedIds: Record<string, string>;
  coinGeckoApiKey?: string;
  coinGeckoBaseUrl?: string;
}

export class OracleRouter {
  private readonly pyth: PythHermesProvider;
  private readonly reference: CoinGeckoReferenceProvider;
  private readonly fixed = new FixedStablecoinProvider();

  constructor(config: OracleRouterConfig) {
    this.pyth = new PythHermesProvider(config.hermesUrl, config.pythFeedIds);
    this.reference = new CoinGeckoReferenceProvider(config.coinGeckoBaseUrl, config.coinGeckoApiKey);
  }

  async getPrices(base: string, quote: 'USD' | 'EUR'): Promise<{ transactional?: PriceQuote; reference?: PriceQuote }> {
    let transactional: PriceQuote | undefined;
    let reference: PriceQuote | undefined;
    try {
      if ((base === 'USDC' && quote === 'USD') || (base === 'EURC' && quote === 'EUR')) transactional = await this.fixed.getPrice({ base, quote });
      else transactional = await this.pyth.getPrice({ base, quote });
    } catch {
      transactional = undefined;
    }
    try { reference = await this.reference.getPrice({ base, quote }); } catch { reference = undefined; }
    if (!transactional && !reference) throw new Error('Price unavailable');
    return { transactional, reference };
  }
}
