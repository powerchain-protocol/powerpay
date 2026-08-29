import { NextRequest, NextResponse } from 'next/server';
import { POWERPAY_HEADERS } from '@powerpay/api-contract';

type Cluster = 'devnet' | 'mainnet-beta';

function resolveApiBase(request: NextRequest): { base?: string; cluster: Cluster } {
  const requested = request.headers.get(POWERPAY_HEADERS.cluster);
  const cluster: Cluster = requested === 'mainnet-beta' ? 'mainnet-beta' : 'devnet';
  const clusterBase = cluster === 'mainnet-beta' ? process.env.POWERPAY_API_URL_MAINNET_BETA : process.env.POWERPAY_API_URL_DEVNET;
  return { base: (clusterBase || process.env.POWERPAY_API_URL)?.replace(/\/$/, ''), cluster };
}

export async function proxyPowerPayGet(request: NextRequest, upstreamPath: string): Promise<NextResponse> {
  const { base, cluster } = resolveApiBase(request);
  const requestId = request.headers.get(POWERPAY_HEADERS.requestId) || crypto.randomUUID();
  if (!base) {
    return NextResponse.json({
      error: {
        code: 'POWERPAY_API_NOT_CONFIGURED',
        message: `Set ${cluster === 'mainnet-beta' ? 'POWERPAY_API_URL_MAINNET_BETA' : 'POWERPAY_API_URL_DEVNET'} or POWERPAY_API_URL for the PowerPay website server.`,
      },
      requestId,
    }, { status: 503, headers: { [POWERPAY_HEADERS.requestId]: requestId } });
  }

  const target = new URL(upstreamPath, `${base}/`);
  request.nextUrl.searchParams.forEach((value, key) => target.searchParams.append(key, value));
  const headers = new Headers({ accept: 'application/json', [POWERPAY_HEADERS.cluster]: cluster, [POWERPAY_HEADERS.requestId]: requestId });
  for (const name of [POWERPAY_HEADERS.rpcProfile, POWERPAY_HEADERS.suiNetwork, POWERPAY_HEADERS.suiRpcProfile]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  if (!headers.has(POWERPAY_HEADERS.suiNetwork) && process.env.NEXT_PUBLIC_SUI_NETWORK) headers.set(POWERPAY_HEADERS.suiNetwork, process.env.NEXT_PUBLIC_SUI_NETWORK);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const upstream = await fetch(target, { method: 'GET', headers, cache: 'no-store', redirect: 'manual', signal: controller.signal });
    const responseHeaders = new Headers({
      'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      [POWERPAY_HEADERS.requestId]: upstream.headers.get(POWERPAY_HEADERS.requestId) || requestId,
    });
    for (const name of [POWERPAY_HEADERS.apiVersion, 'server-timing']) {
      const value = upstream.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }
    return new NextResponse(await upstream.arrayBuffer(), { status: upstream.status, headers: responseHeaders });
  } catch (error) {
    const timeout = error instanceof Error && error.name === 'AbortError';
    return NextResponse.json({ error: { code: timeout ? 'POWERPAY_API_TIMEOUT' : 'POWERPAY_API_UNREACHABLE', message: timeout ? 'PowerPay read request timed out.' : 'PowerPay API is unreachable from the website server.' }, requestId }, { status: 503, headers: { 'cache-control': 'no-store', [POWERPAY_HEADERS.requestId]: requestId } });
  } finally {
    clearTimeout(timer);
  }
}
