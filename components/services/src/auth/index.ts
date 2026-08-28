export interface RequestIdentity {
  userId: string;
  sessionId?: string;
  claims: Record<string, unknown>;
}

export interface RequestAuthenticator {
  authenticate(request: Request): Promise<RequestIdentity | null>;
}

export interface JwksJwtAuthenticatorOptions {
  jwksUrl: string;
  issuer?: string;
  audience?: string;
  cacheTtlMs?: number;
}

type Jwk = JsonWebKey & { kid?: string; alg?: string; use?: string };

export class JwksJwtAuthenticator implements RequestAuthenticator {
  private keys = new Map<string, { key: CryptoKey; expiresAt: number }>();

  constructor(private readonly options: JwksJwtAuthenticatorOptions) {
    if (!options.jwksUrl.startsWith('https://')) throw new Error('JWKS URL must use HTTPS');
  }

  async authenticate(request: Request): Promise<RequestIdentity | null> {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) return null;
    const token = authorization.slice(7).trim();
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const header = decodeJson(parts[0]);
    const claims = decodeJson(parts[1]);
    if (header.alg !== 'RS256' || typeof header.kid !== 'string') return null;
    if (typeof claims.sub !== 'string' || !claims.sub) return null;

    const now = Math.floor(Date.now() / 1000);
    if (typeof claims.exp === 'number' && claims.exp <= now) return null;
    if (typeof claims.nbf === 'number' && claims.nbf > now + 30) return null;
    if (this.options.issuer && claims.iss !== this.options.issuer) return null;
    if (this.options.audience && !audienceMatches(claims.aud, this.options.audience)) return null;

    const key = await this.getKey(header.kid);
    const signed = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
    const signature = base64UrlBytes(parts[2]);
    const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, signature, signed);
    if (!ok) return null;

    return {
      userId: claims.sub,
      sessionId: typeof claims.sid === 'string' ? claims.sid : undefined,
      claims,
    };
  }

  private async getKey(kid: string): Promise<CryptoKey> {
    const cached = this.keys.get(kid);
    if (cached && cached.expiresAt > Date.now()) return cached.key;

    const response = await fetch(this.options.jwksUrl, { headers: { accept: 'application/json' } });
    if (!response.ok) throw new Error(`JWKS request failed (${response.status})`);
    const body = await response.json() as { keys?: Jwk[] };
    const jwk = body.keys?.find((candidate) => candidate.kid === kid && (!candidate.alg || candidate.alg === 'RS256'));
    if (!jwk) throw new Error('JWT signing key not found');
    const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    this.keys.set(kid, { key, expiresAt: Date.now() + (this.options.cacheTtlMs ?? 10 * 60_000) });
    return key;
  }
}

function decodeJson(part: string): Record<string, any> {
  try { return JSON.parse(new TextDecoder().decode(base64UrlBytes(part))) as Record<string, any>; }
  catch { return {}; }
}

function base64UrlBytes(value: string): Uint8Array {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(normalized);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function audienceMatches(value: unknown, expected: string): boolean {
  if (typeof value === 'string') return value === expected;
  return Array.isArray(value) && value.some((item) => item === expected);
}
