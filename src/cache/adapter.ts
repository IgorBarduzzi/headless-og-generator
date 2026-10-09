export interface StorageItem {
  data: Buffer;
  contentType: string;
  createdAt: number;
}

export interface StorageAdapter {
  readonly name: string;
  get(key: string): Promise<Buffer | null>;
  set(key: string, data: Buffer, contentType?: string): Promise<void>;
  has(key: string): Promise<boolean>;
  delete(key: string): Promise<void>;
  clear?(): Promise<void>;
}
