export class InMemoryRateLimiter {
  private readonly buckets = new Map<string, number[]>();
  constructor(private readonly limit = 30, private readonly windowMs = 60_000) {}
  check(key: string, now = Date.now()): boolean {
    const floor = now - this.windowMs;
    const current = (this.buckets.get(key) ?? []).filter((t) => t > floor);
    if (current.length >= this.limit) return false;
    current.push(now);
    this.buckets.set(key, current);
    return true;
  }
}
