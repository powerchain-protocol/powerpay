import type { MerchantTrustStatus } from '@powerpay/security';
import type { PaymentAsset, PaymentNetwork } from '@powerpay/payment-core';

export interface MerchantRecord {
  id: string;
  name: string;
  trustStatus: MerchantTrustStatus;
  recipient: string;
}

export interface CheckoutRecord {
  id: string;
  merchant: MerchantRecord;
  amount: string;
  asset: PaymentAsset;
  network: PaymentNetwork;
  reference: string;
  expiresAt: string;
  nonce: string;
  multiUse: boolean;
}

export interface MerchantDirectory {
  getMerchant(id: string): Promise<MerchantRecord | null>;
  getCheckout(id: string): Promise<CheckoutRecord | null>;
}

export class StaticMerchantDirectory implements MerchantDirectory {
  constructor(private readonly checkouts: CheckoutRecord[] = []) {}
  async getMerchant(id: string) { return this.checkouts.find((checkout) => checkout.merchant.id === id)?.merchant ?? null; }
  async getCheckout(id: string) { return this.checkouts.find((checkout) => checkout.id === id) ?? null; }
}
