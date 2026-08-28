const KEY_PATTERN = /^[A-Za-z0-9:_-]{16,160}$/;

export function assertIdempotencyKey(value: string): void {
  if (!KEY_PATTERN.test(value)) throw new Error('Invalid idempotency key');
}

export function createIdempotencyKey(scope = 'payment'): string {
  return `${scope}:${crypto.randomUUID()}`;
}
