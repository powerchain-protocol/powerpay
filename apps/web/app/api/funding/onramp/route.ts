import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const PROVIDERS = { moonpay: 'MOONPAY_ONRAMP_URL', coinbase: 'COINBASE_PAY_ONRAMP_URL' } as const;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as { provider?: keyof typeof PROVIDERS; asset?: string; amount?: string; wallet?: string };
  const provider = body.provider && body.provider in PROVIDERS ? body.provider : undefined;
  if (!provider) return NextResponse.json({ error: 'Unsupported onramp provider.' }, { status: 400 });
  const configured = process.env[PROVIDERS[provider]];
  if (!configured) return NextResponse.json({ error: `${provider === 'moonpay' ? 'MoonPay' : 'Coinbase Pay'} is not configured for this deployment.` }, { status: 503 });
  let target: URL;
  try { target = new URL(configured); } catch { return NextResponse.json({ error: 'Configured onramp URL is invalid.' }, { status: 500 }); }
  if (target.protocol !== 'https:') return NextResponse.json({ error: 'Onramp URL must use HTTPS.' }, { status: 500 });
  target.searchParams.set('powerpay_asset', ['USDC','EURC','SOL'].includes(body.asset || '') ? String(body.asset) : 'USDC');
  target.searchParams.set('powerpay_amount', String(Math.max(0, Number(body.amount || 0))));
  target.searchParams.set('powerpay_reference', crypto.randomUUID());
  if (body.wallet && body.wallet.length <= 128) target.searchParams.set('powerpay_wallet', body.wallet);
  return NextResponse.json({ url: target.toString() }, { headers: { 'cache-control': 'no-store' } });
}
