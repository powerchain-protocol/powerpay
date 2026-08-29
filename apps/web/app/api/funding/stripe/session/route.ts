import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function positiveAmount(value: unknown): number | null { const n = Number(value); return Number.isFinite(n) && n > 0 && n <= 100_000 ? n : null; }

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: 'Stripe is not configured for this deployment.' }, { status: 503 });
  const body = await request.json().catch(() => ({})) as { amount?: string; asset?: string; email?: string };
  const amount = positiveAmount(body.amount);
  const asset = body.asset === 'EURC' ? 'EURC' : 'USDC';
  if (!amount) return NextResponse.json({ error: 'Invalid funding amount.' }, { status: 400 });
  const currency = asset === 'EURC' ? 'eur' : 'usd';
  const subtotalMinor = Math.round(amount * 100);
  const serviceFeeMinor = Math.ceil(subtotalMinor * 0.02);
  const origin = new URL(request.url).origin;
  const params = new URLSearchParams();
  params.set('mode', 'payment');
  params.set('success_url', `${origin}/checkout/card?status=success&session_id={CHECKOUT_SESSION_ID}`);
  params.set('cancel_url', `${origin}/checkout/card?status=cancelled`);
  params.set('client_reference_id', crypto.randomUUID());
  params.set('line_items[0][price_data][currency]', currency);
  params.set('line_items[0][price_data][product_data][name]', `PowerPay ${asset} funding`);
  params.set('line_items[0][price_data][unit_amount]', String(subtotalMinor));
  params.set('line_items[0][quantity]', '1');
  params.set('line_items[1][price_data][currency]', currency);
  params.set('line_items[1][price_data][product_data][name]', 'PowerPay service fee (2%)');
  params.set('line_items[1][price_data][unit_amount]', String(serviceFeeMinor));
  params.set('line_items[1][quantity]', '1');
  params.set('metadata[powerpay_asset]', asset);
  if (body.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) params.set('customer_email', body.email);
  const upstream = await fetch('https://api.stripe.com/v1/checkout/sessions', { method: 'POST', headers: { authorization: `Bearer ${secret}`, 'content-type': 'application/x-www-form-urlencoded' }, body: params.toString(), cache: 'no-store' });
  const result = await upstream.json() as { url?: string; error?: { message?: string } };
  if (!upstream.ok || !result.url) return NextResponse.json({ error: result.error?.message || 'Stripe session creation failed.' }, { status: upstream.status || 502 });
  return NextResponse.json({ url: result.url }, { headers: { 'cache-control': 'no-store' } });
}
