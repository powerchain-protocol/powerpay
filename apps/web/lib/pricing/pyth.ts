import { PowerPayWebError } from '../errors';
import { powerPayFetch } from '../powerpay-api';
export interface WebPriceQuote { base:string; quote:'USD'|'EUR'; price:string; confidence?:string; source:'pyth'|'coingecko'|'fixed-stablecoin'; observedAt:string; publishTime?:number; feedId?:string; transactional:boolean; expiresAt:string; }
export interface PowerPayPriceResponse { prices:{transactional?:WebPriceQuote;reference?:WebPriceQuote}; requestId?:string; }
export async function getPowerPayPrice(base:'SOL'|'SUI'|'USDC'|'EURC',quote:'USD'|'EUR'='USD'):Promise<PowerPayPriceResponse>{return powerPayFetch<PowerPayPriceResponse>(`/api/v1/prices?base=${encodeURIComponent(base)}&quote=${encodeURIComponent(quote)}`)}
export function preferredPrice(response:PowerPayPriceResponse):WebPriceQuote|undefined{return response.prices.transactional??response.prices.reference}
export function priceAgeSeconds(quote:WebPriceQuote,now=Date.now()):number{const observed=Date.parse(quote.observedAt);return Number.isFinite(observed)?Math.max(0,Math.floor((now-observed)/1000)):Number.POSITIVE_INFINITY}
export function isPriceFresh(quote:WebPriceQuote,maxAgeSeconds=60,now=Date.now()):boolean{return priceAgeSeconds(quote,now)<=maxAgeSeconds&&Date.parse(quote.expiresAt)>now}
export function requireTransactionalPrice(response:PowerPayPriceResponse,maxAgeSeconds=60):WebPriceQuote{const quote=response.prices.transactional;if(!quote)throw new PowerPayWebError('Transactional price unavailable. Conversion-dependent payments are temporarily unavailable.','PRICE_UNAVAILABLE',503);if(!isPriceFresh(quote,maxAgeSeconds))throw new PowerPayWebError('Transactional price is stale. Refresh the quote before continuing.','PRICE_STALE',503);return quote}
