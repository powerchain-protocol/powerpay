import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const METHODS_WITH_BODY = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

type RouteContext = { params: Promise<{ path: string[] }> };

async function proxy(request: NextRequest, context: RouteContext) {
  const base = process.env.POWERPAY_API_URL?.replace(/\/$/, '');
  if (!base) {
    return NextResponse.json({ error: { code: 'POWERPAY_API_NOT_CONFIGURED', message: 'Set POWERPAY_API_URL for the web checkout server.' } }, { status: 503 });
  }

  const { path } = await context.params;
  const target = new URL(`${base}/${path.map(encodeURIComponent).join('/')}`);
  request.nextUrl.searchParams.forEach((value, key) => target.searchParams.append(key, value));

  const headers = new Headers();
  for (const name of ['authorization', 'x-idempotency-key', 'accept']) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  if (METHODS_WITH_BODY.has(request.method)) headers.set('content-type', request.headers.get('content-type') || 'application/json');

  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body: METHODS_WITH_BODY.has(request.method) ? await request.text() : undefined,
    redirect: 'manual',
    cache: 'no-store',
  });

  const responseHeaders = new Headers();
  responseHeaders.set('content-type', upstream.headers.get('content-type') || 'application/json');
  responseHeaders.set('cache-control', 'no-store');
  const requestId = upstream.headers.get('x-request-id');
  if (requestId) responseHeaders.set('x-request-id', requestId);
  return new NextResponse(await upstream.arrayBuffer(), { status: upstream.status, headers: responseHeaders });
}

export function GET(request: NextRequest, context: RouteContext) { return proxy(request, context); }
export function POST(request: NextRequest, context: RouteContext) { return proxy(request, context); }
export function PUT(request: NextRequest, context: RouteContext) { return proxy(request, context); }
export function PATCH(request: NextRequest, context: RouteContext) { return proxy(request, context); }
export function DELETE(request: NextRequest, context: RouteContext) { return proxy(request, context); }
