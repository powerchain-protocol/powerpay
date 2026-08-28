import type { CheckoutRecord, MerchantDirectory, MerchantRecord } from './index';

export class SupabaseMerchantDirectory implements MerchantDirectory {
  constructor(private readonly url: string, private readonly serviceRoleKey: string) {}

  async getMerchant(id: string): Promise<MerchantRecord | null> {
    const rows = await this.get<Record<string, unknown>>(`Merchant?id=eq.${encodeURIComponent(id)}&select=id,name,trustStatus,settlementWallet&limit=1`);
    const row = rows[0];
    if (!row || !row.settlementWallet) return null;
    return { id: String(row.id), name: String(row.name), trustStatus: String(row.trustStatus) as MerchantRecord['trustStatus'], recipient: String(row.settlementWallet) };
  }

  async getCheckout(id: string): Promise<CheckoutRecord | null> {
    const rows = await this.get<Record<string, unknown>>(`Checkout?id=eq.${encodeURIComponent(id)}&select=id,merchantId,network,asset,amount,recipient,reference,nonce,expiresAt,multiUse&limit=1`);
    const row = rows[0];
    if (!row) return null;
    const merchant = await this.getMerchant(String(row.merchantId));
    if (!merchant) return null;
    return {
      id: String(row.id), merchant, amount: String(row.amount), asset: String(row.asset) as CheckoutRecord['asset'],
      network: String(row.network) as CheckoutRecord['network'], reference: String(row.reference), nonce: String(row.nonce),
      expiresAt: String(row.expiresAt), multiUse: Boolean(row.multiUse),
    };
  }

  private async get<T>(path: string): Promise<T[]> {
    const response = await fetch(`${this.url.replace(/\/$/, '')}/rest/v1/${path}`, { headers: { apikey: this.serviceRoleKey, authorization: `Bearer ${this.serviceRoleKey}`, accept: 'application/json' } });
    if (!response.ok) throw new Error(`Supabase merchant query failed (${response.status})`);
    return response.json() as Promise<T[]>;
  }
}
