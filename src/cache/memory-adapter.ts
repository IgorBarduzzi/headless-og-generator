import type { StorageAdapter } from './adapter.js';

export class MemoryStorageAdapter implements StorageAdapter {
  readonly name = 'MemoryStorageAdapter';
  private readonly store = new Map<string, Buffer>();

  async get(key: string): Promise<Buffer | null> {
    return this.store.get(key) ?? null;
  }

  async set(key: string, data: Buffer): Promise<void> {
    this.store.set(key, data);
  }

  async has(key: string): Promise<boolean> {
    return this.store.has(key);
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  get size(): number {
    return this.store.size;
  }
}
