/**
 * SingleFlight prevents the "Cache Stampede" (Thundering Herd) problem.
 * If multiple concurrent requests arrive for the exact same uncached key,
 * only ONE execution is triggered. All other callers await the same in-flight Promise.
 */
export class SingleFlight<T> {
  private readonly inFlight = new Map<string, Promise<T>>();

  async do(key: string, fn: () => Promise<T>): Promise<T> {
    const existing = this.inFlight.get(key);
    if (existing) {
      return existing;
    }

    const promise = (async () => {
      try {
        return await fn();
      } finally {
        this.inFlight.delete(key);
      }
    })();

    this.inFlight.set(key, promise);
    return promise;
  }

  get activeCount(): number {
    return this.inFlight.size;
  }
}
