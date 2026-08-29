import { NextRequest } from 'next/server';
import { proxyPowerPayGet } from '@/lib/powerpay-read-proxy';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
type Context = { params: Promise<{ mint: string }> };
export async function GET(request: NextRequest, context: Context) {
  const { mint } = await context.params;
  return proxyPowerPayGet(request, `/api/v1/solana/assets/${encodeURIComponent(mint)}`);
}
