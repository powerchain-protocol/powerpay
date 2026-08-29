import { NextRequest, NextResponse } from 'next/server';
import { POWERPAY_HEADERS } from '@powerpay/api-contract';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const METHODS_WITH_BODY = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
type RouteContext = { params: Promise<{ path: string[] }> };
type Cluster = 'devnet' | 'mainnet-beta';

function resolveApiBase(request: NextRequest): { base?: string; cluster: Cluster } {
  const requested = request.headers.get(POWERPAY_HEADERS.cluster);
  const cluster: Cluster = requested === 'mainnet-beta' ? 'mainnet-beta' : 'devnet';
  const clusterBase = cluster === 'mainnet-beta' ? process.env.POWERPAY_API_URL_MAINNET_BETA : process.env.POWERPAY_API_URL_DEVNET;
  return { base: (clusterBase || process.env.POWERPAY_API_URL)?.replace(/\/$/, ''), cluster };
}

async function proxy(request: NextRequest, context: RouteContext) {
  const { base, cluster } = resolveApiBase(request);
  const requestId = request.headers.get(POWERPAY_HEADERS.requestId) || crypto.randomUUID();
  if (!base) {
    return NextResponse.json({ error: { code: 'POWERPAY_API_NOT_CONFIGURED', message: `Set ${cluster === 'mainnet-beta' ? 'POWERPAY_API_URL_MAINNET_BETA' : 'POWERPAY_API_URL_DEVNET'} or POWERPAY_API_URL for the web checkout server.` }, requestId }, { status: 503, headers: { [POWERPAY_HEADERS.requestId]: requestId } });
  }

  const { path } = await context.params;
  const target = new URL(`${base}/${path.map(encodeURIComponent).join('/')}`);
  request.nextUrl.searchParams.forEach((value, key) => target.searchParams.append(key, value));

  const headers = new Headers();
  for (const name of [
    'authorization', POWERPAY_HEADERS.idempotencyKey, POWERPAY_HEADERS.requestId, 'accept',
    POWERPAY_HEADERS.cluster, POWERPAY_HEADERS.rpcProfile, POWERPAY_HEADERS.suiNetwork, POWERPAY_HEADERS.suiRpcProfile,
  ]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  headers.set(POWERPAY_HEADERS.requestId, requestId);
  if (!headers.has(POWERPAY_HEADERS.cluster)) headers.set(POWERPAY_HEADERS.cluster, cluster);
  if (METHODS_WITH_BODY.has(request.method)) headers.set('content-type', request.headers.get('content-type') || 'application/json');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body: METHODS_WITH_BODY.has(request.method) ? await request.text() : undefined,
      redirect: 'manual',
      cache: 'no-store',
      signal: controller.signal,
    });

    const responseHeaders = new Headers();
    responseHeaders.set('content-type', upstream.headers.get('content-type') || 'application/json; charset=utf-8');
    responseHeaders.set('cache-control', 'no-store');
    responseHeaders.set('x-content-type-options', 'nosniff');
    for (const name of [POWERPAY_HEADERS.requestId, POWERPAY_HEADERS.apiVersion, 'server-timing']) {
      const value = upstream.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }
    if (!responseHeaders.has(POWERPAY_HEADERS.requestId)) responseHeaders.set(POWERPAY_HEADERS.requestId, requestId);
    return new NextResponse(await upstream.arrayBuffer(), { status: upstream.status, headers: responseHeaders });
  } catch (error) {
    const timeout = error instanceof Error && error.name === 'AbortError';
    return NextResponse.json({ error: { code: timeout ? 'POWERPAY_API_TIMEOUT' : 'POWERPAY_API_UNREACHABLE', message: timeout ? 'PowerPay API request timed out.' : 'PowerPay API is unreachable from the website server.' }, requestId }, { status: 503, headers: { 'cache-control': 'no-store', [POWERPAY_HEADERS.requestId]: requestId } });
  } finally {
    clearTimeout(timer);
  }
}

export function GET(request: NextRequest, context: RouteContext) { return proxy(request, context); }
export function POST(request: NextRequest, context: RouteContext) { return proxy(request, context); }
export function PUT(request: NextRequest, context: RouteContext) { return proxy(request, context); }
export function PATCH(request: NextRequest, context: RouteContext) { return proxy(request, context); }
export function DELETE(request: NextRequest, context: RouteContext) { return proxy(request, context); }
