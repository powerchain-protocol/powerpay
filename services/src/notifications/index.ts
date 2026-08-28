export type NotificationCategory = 'PAYMENTS' | 'SECURITY' | 'WALLET' | 'SYSTEM';
export type NotificationSeverity = 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER';

export interface PowerPayNotification {
  id: string;
  userId: string;
  category: NotificationCategory;
  severity: NotificationSeverity;
  title: string;
  body: string;
  readAt?: string;
  createdAt: string;
}

export interface NotificationDirectory {
  list(userId: string, limit?: number): Promise<PowerPayNotification[]>;
  create(input: Omit<PowerPayNotification, 'id' | 'createdAt' | 'readAt'> & { idempotencyKey?: string }): Promise<PowerPayNotification>;
  markRead(userId: string, notificationId: string): Promise<PowerPayNotification | null>;
  markAllRead(userId: string): Promise<number>;
}

export class InMemoryNotificationDirectory implements NotificationDirectory {
  private items = new Map<string, PowerPayNotification>();
  private idempotency = new Map<string, string>();
  async list(userId: string, limit = 50) { return [...this.items.values()].filter((item) => item.userId === userId).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, limit).map((item) => structuredClone(item)); }
  async create(input: Omit<PowerPayNotification, 'id' | 'createdAt' | 'readAt'> & { idempotencyKey?: string }) {
    if (input.idempotencyKey) { const id = this.idempotency.get(input.idempotencyKey); if (id) return structuredClone(this.items.get(id)!); }
    const item: PowerPayNotification = { id: crypto.randomUUID(), userId: input.userId, category: input.category, severity: input.severity, title: input.title, body: input.body, createdAt: new Date().toISOString() };
    this.items.set(item.id, item); if (input.idempotencyKey) this.idempotency.set(input.idempotencyKey, item.id); return structuredClone(item);
  }
  async markRead(userId: string, notificationId: string) {
    const item = this.items.get(notificationId);
    if (!item || item.userId !== userId) return null;
    if (!item.readAt) this.items.set(notificationId, { ...item, readAt: new Date().toISOString() });
    return structuredClone(this.items.get(notificationId)!);
  }
  async markAllRead(userId: string) {
    const now = new Date().toISOString(); let count = 0;
    for (const [id, item] of this.items) if (item.userId === userId && !item.readAt) { this.items.set(id, { ...item, readAt: now }); count++; }
    return count;
  }
}

export class SupabaseNotificationDirectory implements NotificationDirectory {
  constructor(private readonly url: string, private readonly serviceRoleKey: string) {}
  async list(userId: string, limit = 50) {
    const response = await this.request(`Notification?userId=eq.${encodeURIComponent(userId)}&select=*&order=createdAt.desc&limit=${Math.max(1, Math.min(limit, 100))}`, { method: 'GET' });
    const rows = await response.json() as any[];
    return rows.map((row) => ({ ...row, readAt: row.readAt ?? undefined })) as PowerPayNotification[];
  }
  async create(input: Omit<PowerPayNotification, 'id' | 'createdAt' | 'readAt'> & { idempotencyKey?: string }) {
    if (input.idempotencyKey) {
      const audit = await this.request(`IdempotencyRecord?key=eq.${encodeURIComponent(`notification:${input.idempotencyKey}`)}&select=resourceId&limit=1`, { method: 'GET' });
      const rows = await audit.json() as Array<{ resourceId: string }>;
      if (rows[0]) {
        const existing = await this.request(`Notification?id=eq.${encodeURIComponent(rows[0].resourceId)}&select=*&limit=1`, { method: 'GET' });
        const existingRows = await existing.json() as PowerPayNotification[];
        if (existingRows[0]) return existingRows[0];
      }
    }
    const item: PowerPayNotification = { id: crypto.randomUUID(), userId: input.userId, category: input.category, severity: input.severity, title: input.title, body: input.body, createdAt: new Date().toISOString() };
    await this.request('Notification', { method: 'POST', body: item, headers: { Prefer: 'return=minimal' } });
    if (input.idempotencyKey) await this.request('IdempotencyRecord', { method: 'POST', body: { key: `notification:${input.idempotencyKey}`, scope: 'NOTIFICATION', resourceType: 'Notification', resourceId: item.id }, headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' } });
    return item;
  }
  async markRead(userId: string, notificationId: string) {
    const response = await this.request(`Notification?id=eq.${encodeURIComponent(notificationId)}&userId=eq.${encodeURIComponent(userId)}`, { method: 'PATCH', body: { readAt: new Date().toISOString() }, headers: { Prefer: 'return=representation' } });
    const rows = await response.json() as PowerPayNotification[];
    return rows[0] ?? null;
  }
  async markAllRead(userId: string) {
    const unread = await this.request(`Notification?userId=eq.${encodeURIComponent(userId)}&readAt=is.null&select=id`, { method: 'GET' });
    const rows = await unread.json() as Array<{ id: string }>;
    if (!rows.length) return 0;
    await this.request(`Notification?userId=eq.${encodeURIComponent(userId)}&readAt=is.null`, { method: 'PATCH', body: { readAt: new Date().toISOString() }, headers: { Prefer: 'return=minimal' } });
    return rows.length;
  }
  private async request(path: string, input: { method: string; body?: unknown; headers?: Record<string, string> }) {
    const response = await fetch(`${this.url.replace(/\/$/, '')}/rest/v1/${path}`, { method: input.method, headers: { apikey: this.serviceRoleKey, authorization: `Bearer ${this.serviceRoleKey}`, 'content-type': 'application/json', ...input.headers }, body: input.body === undefined ? undefined : JSON.stringify(input.body) });
    if (!response.ok) throw new Error(`Supabase notifications ${input.method} ${path} failed (${response.status}): ${(await response.text()).slice(0, 240)}`);
    return response;
  }
}
