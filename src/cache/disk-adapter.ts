import fs from 'node:fs/promises';
import path from 'node:path';
import type { StorageAdapter } from './adapter.js';

export class DiskStorageAdapter implements StorageAdapter {
  readonly name = 'DiskStorageAdapter';
  private readonly dir: string;
  private initialized = false;

  constructor(cacheDirectory: string) {
    this.dir = cacheDirectory;
  }

  private async ensureDir(): Promise<void> {
    if (!this.initialized) {
      await fs.mkdir(this.dir, { recursive: true });
      this.initialized = true;
    }
  }

  private resolvePath(key: string): string {
    // Sanitize key to prevent path traversal
    const safeKey = path.basename(key);
    return path.join(this.dir, safeKey);
  }

  async get(key: string): Promise<Buffer | null> {
    try {
      await this.ensureDir();
      const filePath = this.resolvePath(key);
      return await fs.readFile(filePath);
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        return null;
      }
      throw err;
    }
  }

  async set(key: string, data: Buffer): Promise<void> {
    await this.ensureDir();
    const filePath = this.resolvePath(key);
    // Write atomically via temporary file or direct write
    await fs.writeFile(filePath, data);
  }

  async has(key: string): Promise<boolean> {
    try {
      await this.ensureDir();
      const filePath = this.resolvePath(key);
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.ensureDir();
      const filePath = this.resolvePath(key);
      await fs.unlink(filePath);
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw err;
      }
    }
  }

  async clear(): Promise<void> {
    await this.ensureDir();
    const files = await fs.readdir(this.dir);
    await Promise.all(
      files.map((file) => fs.unlink(path.join(this.dir, file)).catch(() => {}))
    );
  }
}
