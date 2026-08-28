import type { RequestIdentity } from '../auth';

export type AccountChain = 'SOLANA' | 'SUI';
export type WalletConnectionState = 'CONNECTED' | 'DISCONNECTED' | 'REVOKED' | 'UNSUPPORTED';
export type WalletPermissionName = 'READ_ADDRESS' | 'READ_BALANCES' | 'REQUEST_SIGNATURE' | 'REQUEST_TRANSACTION';

export interface PowerPayAccount {
  id: string;
  externalId: string;
  email?: string;
  displayName?: string;
}

export interface AccountWalletConnection {
  id: string;
  userId: string;
  chain: AccountChain;
  address: string;
  label?: string;
  walletType?: string;
  status: WalletConnectionState;
  primary: boolean;
  permissions: WalletPermissionName[];
  connectedAt: string;
  lastUsedAt?: string;
  revokedAt?: string;
}

export interface AccountDirectory {
  ensureAccount(identity: RequestIdentity): Promise<PowerPayAccount>;
  getAccount(id: string): Promise<PowerPayAccount | null>;
  listWallets(userId: string): Promise<AccountWalletConnection[]>;
  connectWallet(input: {
    userId: string;
    chain: AccountChain;
    address: string;
    label?: string;
    walletType?: string;
    permissions?: WalletPermissionName[];
  }): Promise<AccountWalletConnection>;
  revokeWallet(userId: string, walletId: string): Promise<void>;
}

export class InMemoryAccountDirectory implements AccountDirectory {
  private accounts = new Map<string, PowerPayAccount>();
  private wallets = new Map<string, AccountWalletConnection>();

  async ensureAccount(identity: RequestIdentity): Promise<PowerPayAccount> {
    const existing = [...this.accounts.values()].find((account) => account.externalId === identity.userId);
    if (existing) return structuredClone(existing);
    const claims = identity.claims || {};
    const account: PowerPayAccount = {
      id: identity.userId,
      externalId: identity.userId,
      email: claimString(claims, ['email', 'email_address']),
      displayName: claimString(claims, ['name', 'full_name', 'username']),
    };
    this.accounts.set(account.id, account);
    return structuredClone(account);
  }

  async getAccount(id: string) { return this.accounts.has(id) ? structuredClone(this.accounts.get(id)!) : null; }

  async listWallets(userId: string) {
    return [...this.wallets.values()].filter((wallet) => wallet.userId === userId).map((wallet) => structuredClone(wallet));
  }

  async connectWallet(input: { userId: string; chain: AccountChain; address: string; label?: string; walletType?: string; permissions?: WalletPermissionName[] }) {
    const normalized = normalizeAddress(input.chain, input.address);
    const occupied = [...this.wallets.values()].find((wallet) => wallet.chain === input.chain && normalizeAddress(wallet.chain, wallet.address) === normalized && wallet.userId !== input.userId && wallet.status !== 'REVOKED');
    if (occupied) throw new Error('WALLET_OWNERSHIP_CONFLICT');
    const existing = [...this.wallets.values()].find((wallet) => wallet.userId === input.userId && wallet.chain === input.chain && normalizeAddress(wallet.chain, wallet.address) === normalized);
    const now = new Date().toISOString();
    const wallet: AccountWalletConnection = existing ? {
      ...existing, label: input.label ?? existing.label, walletType: input.walletType ?? existing.walletType,
      permissions: input.permissions ?? existing.permissions, status: 'CONNECTED', revokedAt: undefined, lastUsedAt: now,
    } : {
      id: crypto.randomUUID(), userId: input.userId, chain: input.chain, address: input.address,
      label: input.label, walletType: input.walletType, status: 'CONNECTED', primary: false,
      permissions: input.permissions ?? defaultPermissions(), connectedAt: now, lastUsedAt: now,
    };
    this.wallets.set(wallet.id, wallet);
    return structuredClone(wallet);
  }

  async revokeWallet(userId: string, walletId: string) {
    const wallet = this.wallets.get(walletId);
    if (!wallet || wallet.userId !== userId) return;
    this.wallets.set(walletId, { ...wallet, status: 'REVOKED', revokedAt: new Date().toISOString() });
  }
}

export class SupabaseAccountDirectory implements AccountDirectory {
  constructor(private readonly url: string, private readonly serviceRoleKey: string) {
    if (!url || !serviceRoleKey) throw new Error('Supabase account directory requires URL and service role key');
  }

  async ensureAccount(identity: RequestIdentity): Promise<PowerPayAccount> {
    const existing = await this.one<any>('User', `externalId=eq.${encodeURIComponent(identity.userId)}&select=id,externalId,email,displayName`);
    if (existing) return existing;
    const claims = identity.claims || {};
    const account: PowerPayAccount = {
      // The auth subject is intentionally used as the canonical primary key. This keeps PaymentIntent.userId
      // and the authenticated account FK aligned while retaining externalId for provider migration/auditing.
      id: identity.userId,
      externalId: identity.userId,
      email: claimString(claims, ['email', 'email_address']),
      displayName: claimString(claims, ['name', 'full_name', 'username']),
    };
    const response = await this.request('User', { method: 'POST', body: account, headers: { Prefer: 'resolution=ignore-duplicates,return=representation' } });
    const rows = await response.json() as PowerPayAccount[];
    return rows[0] ?? (await this.one<PowerPayAccount>('User', `externalId=eq.${encodeURIComponent(identity.userId)}&select=id,externalId,email,displayName`))!;
  }

  async getAccount(id: string) { return this.one<PowerPayAccount>('User', `id=eq.${encodeURIComponent(id)}&select=id,externalId,email,displayName`); }

  async listWallets(userId: string): Promise<AccountWalletConnection[]> {
    const wallets = await this.many<any>('Wallet', `userId=eq.${encodeURIComponent(userId)}&select=*&order=connectedAt.desc`);
    const output: AccountWalletConnection[] = [];
    for (const wallet of wallets) {
      const consent = await this.one<any>('WalletConsent', `walletId=eq.${encodeURIComponent(wallet.id)}&revokedAt=is.null&select=permissions&order=acceptedAt.desc`);
      output.push({
        id: wallet.id, userId: wallet.userId, chain: wallet.chain, address: wallet.address,
        label: wallet.label ?? undefined, walletType: wallet.walletType ?? undefined, status: wallet.status,
        primary: Boolean(wallet.primary), permissions: Array.isArray(consent?.permissions) ? consent.permissions : [],
        connectedAt: wallet.connectedAt, lastUsedAt: wallet.lastUsedAt ?? undefined, revokedAt: wallet.revokedAt ?? undefined,
      });
    }
    return output;
  }

  async connectWallet(input: { userId: string; chain: AccountChain; address: string; label?: string; walletType?: string; permissions?: WalletPermissionName[] }): Promise<AccountWalletConnection> {
    const existing = await this.one<any>('Wallet', `chain=eq.${input.chain}&address=eq.${encodeURIComponent(input.address)}&select=*`);
    if (existing && existing.userId !== input.userId && existing.status !== 'REVOKED') throw new Error('WALLET_OWNERSHIP_CONFLICT');
    const now = new Date().toISOString();
    let wallet: any;
    if (existing && existing.userId === input.userId) {
      const response = await this.request(`Wallet?id=eq.${encodeURIComponent(existing.id)}`, { method: 'PATCH', body: { status: 'CONNECTED', revokedAt: null, lastUsedAt: now, label: input.label ?? existing.label, walletType: input.walletType ?? existing.walletType }, headers: { Prefer: 'return=representation' } });
      wallet = (await response.json() as any[])[0];
    } else {
      const response = await this.request('Wallet', { method: 'POST', body: { id: crypto.randomUUID(), userId: input.userId, chain: input.chain, address: input.address, label: input.label, walletType: input.walletType, status: 'CONNECTED', lastUsedAt: now }, headers: { Prefer: 'return=representation' } });
      wallet = (await response.json() as any[])[0];
    }
    const permissions = input.permissions ?? defaultPermissions();
    await this.request('WalletConsent', { method: 'POST', body: { id: crypto.randomUUID(), walletId: wallet.id, permissions }, headers: { Prefer: 'return=minimal' } });
    return { id: wallet.id, userId: wallet.userId, chain: wallet.chain, address: wallet.address, label: wallet.label ?? undefined, walletType: wallet.walletType ?? undefined, status: wallet.status, primary: Boolean(wallet.primary), permissions, connectedAt: wallet.connectedAt, lastUsedAt: wallet.lastUsedAt ?? undefined };
  }

  async revokeWallet(userId: string, walletId: string): Promise<void> {
    const wallet = await this.one<any>('Wallet', `id=eq.${encodeURIComponent(walletId)}&userId=eq.${encodeURIComponent(userId)}&select=id`);
    if (!wallet) return;
    const now = new Date().toISOString();
    await this.request(`Wallet?id=eq.${encodeURIComponent(walletId)}`, { method: 'PATCH', body: { status: 'REVOKED', revokedAt: now }, headers: { Prefer: 'return=minimal' } });
    await this.request(`WalletConsent?walletId=eq.${encodeURIComponent(walletId)}&revokedAt=is.null`, { method: 'PATCH', body: { revokedAt: now }, headers: { Prefer: 'return=minimal' } });
  }

  private async one<T>(table: string, query: string): Promise<T | null> { const rows = await this.many<T>(table, `${query}&limit=1`); return rows[0] ?? null; }
  private async many<T>(table: string, query: string): Promise<T[]> { const response = await this.request(`${table}?${query}`, { method: 'GET' }); return response.json() as Promise<T[]>; }
  private async request(path: string, input: { method: string; body?: unknown; headers?: Record<string, string> }) {
    const response = await fetch(`${this.url.replace(/\/$/, '')}/rest/v1/${path}`, { method: input.method, headers: { apikey: this.serviceRoleKey, authorization: `Bearer ${this.serviceRoleKey}`, 'content-type': 'application/json', ...input.headers }, body: input.body === undefined ? undefined : JSON.stringify(input.body) });
    if (!response.ok) throw new Error(`Supabase account ${input.method} ${path} failed (${response.status}): ${(await response.text()).slice(0, 240)}`);
    return response;
  }
}

function claimString(claims: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) if (typeof claims[key] === 'string' && claims[key]) return claims[key] as string;
  return undefined;
}

function defaultPermissions(): WalletPermissionName[] { return ['READ_ADDRESS', 'READ_BALANCES', 'REQUEST_SIGNATURE', 'REQUEST_TRANSACTION']; }
function normalizeAddress(chain: AccountChain, address: string): string { return chain === 'SUI' ? address.toLowerCase() : address; }
