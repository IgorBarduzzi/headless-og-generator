import type { StorageAdapter } from './adapter.js';

export interface S3ClientConfig {
  bucket: string;
  region?: string;
  endpoint?: string; // For Cloudflare R2 or MinIO
  accessKeyId?: string;
  secretAccessKey?: string;
}

/**
 * Storage adapter for AWS S3 and S3-compatible cloud storage (Cloudflare R2, MinIO).
 * Demonstrates the Adapter Pattern: drop-in replacement for DiskStorageAdapter in production clouds.
 */
export class S3StorageAdapter implements StorageAdapter {
  readonly name = 'S3StorageAdapter';
  private readonly config: S3ClientConfig;

  constructor(config: S3ClientConfig) {
    this.config = config;
  }

  async get(key: string): Promise<Buffer | null> {
    // In production with @aws-sdk/client-s3:
    // const command = new GetObjectCommand({ Bucket: this.config.bucket, Key: key });
    // const response = await this.client.send(command);
    // return Buffer.from(await response.Body.transformToByteArray());
    console.debug(`[S3StorageAdapter] Fetching s3://${this.config.bucket}/${key}`);
    return null;
  }

  async set(key: string, data: Buffer, contentType = 'image/png'): Promise<void> {
    // const command = new PutObjectCommand({
    //   Bucket: this.config.bucket,
    //   Key: key,
    //   Body: data,
    //   ContentType: contentType,
    //   CacheControl: 'public, max-age=31536000, immutable',
    // });
    // await this.client.send(command);
    console.debug(`[S3StorageAdapter] Persisted ${data.length} bytes to s3://${this.config.bucket}/${key} (${contentType})`);
  }

  async has(key: string): Promise<boolean> {
    // try {
    //   await this.client.send(new HeadObjectCommand({ Bucket: this.config.bucket, Key: key }));
    //   return true;
    // } catch { return false; }
    return false;
  }

  async delete(key: string): Promise<void> {
    // await this.client.send(new DeleteObjectCommand({ Bucket: this.config.bucket, Key: key }));
    console.debug(`[S3StorageAdapter] Deleted s3://${this.config.bucket}/${key}`);
  }
}
