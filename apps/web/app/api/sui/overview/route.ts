import { NextRequest } from 'next/server';
import { proxyPowerPayGet } from '@/lib/powerpay-read-proxy';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export function GET(request: NextRequest) { return proxyPowerPayGet(request, '/api/sui/overview'); }
