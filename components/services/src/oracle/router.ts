import {
  CoinGeckoReferenceProvider,
  CoinMarketCapReferenceProvider,
  FixedStablecoinProvider,
  PythHermesProvider,
  type PriceQuote,
} from '@powerpay/oracle';

export interface OracleRouterConfig {
  hermesUrl: string;
  pythFeedIds: Record<string, string>;
  pythApiKey?: string;
  coinGeckoApiKey?: string;
  coinGeckoBaseUrl?: string;
  coinMarketCapApiKey?: string;
  coinMarketCapBaseUrl?: string;
}

export interface ResolvedPrices {
  transactional?: PriceQuote;
  reference?: PriceQuote;
  references: {
    coingecko?: PriceQuote;
    coinmarketcap?: PriceQuote;
  };
}

export class OracleRouter {
  private readonly pyth: PythHermesProvider;
  private readonly coinGecko: CoinGeckoReferenceProvider;
  private readonly coinMarketCap: CoinMarketCapReferenceProvider;
  private readonly fixed = new FixedStablecoinProvider();

  constructor(config: OracleRouterConfig) {
    this.pyth = new PythHermesProvider(config.hermesUrl, config.pythFeedIds, undefined, config.pythApiKey);
    this.coinGecko = new CoinGeckoReferenceProvider(config.coinGeckoBaseUrl, config.coinGeckoApiKey);
    this.coinMarketCap = new CoinMarketCapReferenceProvider(config.coinMarketCapBaseUrl, config.coinMarketCapApiKey);
  }

  async getPrices(base: string, quote: 'USD' | 'EUR'): Promise<ResolvedPrices> {
    let transactional: PriceQuote | undefined;
    try {
      if ((base === 'USDC' && quote === 'USD') || (base === 'EURC' && quote === 'EUR')) transactional = await this.fixed.getPrice({ base, quote });
      else transactional = await this.pyth.getPrice({ base, quote });
    } catch {
      transactional = undefined;
    }

    const [coinGeckoResult, coinMarketCapResult] = await Promise.allSettled([
      this.coinGecko.getPrice({ base, quote }),
      this.coinMarketCap.getPrice({ base, quote }),
    ]);
    const coingecko = coinGeckoResult.status === 'fulfilled' ? coinGeckoResult.value : undefined;
    const coinmarketcap = coinMarketCapResult.status === 'fulfilled' ? coinMarketCapResult.value : undefined;
    const reference = coingecko ?? coinmarketcap;
    if (!transactional && !reference) throw new Error('Price unavailable');
    return {
      ...(transactional ? { transactional } : {}),
      ...(reference ? { reference } : {}),
      references: {
        ...(coingecko ? { coingecko } : {}),
        ...(coinmarketcap ? { coinmarketcap } : {}),
      },
    };
  }
}
