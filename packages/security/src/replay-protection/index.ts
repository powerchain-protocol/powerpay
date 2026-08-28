export interface ReplayNonceStore {
  isConsumed(nonce: string, resourceId?: string): Promise<boolean>;
  consume(nonce: string, expiresAt: string, resourceId?: string): Promise<boolean>;
}

export async function assertNonceAvailable(store: ReplayNonceStore, nonce: string, expiresAt: string, resourceId?: string): Promise<void> {
  if (Date.parse(expiresAt) <= Date.now()) throw new Error('Replay nonce is expired');
  if (await store.isConsumed(nonce, resourceId)) throw new Error('Replay nonce has already been used');
}

export async function consumeNonce(store: ReplayNonceStore, nonce: string, expiresAt: string, resourceId?: string): Promise<void> {
  if (Date.parse(expiresAt) <= Date.now()) throw new Error('Replay nonce is expired');
  const consumed = await store.consume(nonce, expiresAt, resourceId);
  if (!consumed) throw new Error('Replay nonce has already been used by another payment');
}
