import crypto from 'node:crypto';
import type { OgParams } from '../types/og.js';

/**
 * Creates a deterministic, canonical hash key from OpenGraph parameters.
 * Regardless of URL parameter ordering, equivalent parameters yield the exact same key.
 */
export function generateCacheKey(params: OgParams): { key: string; hash: string } {
  // Normalize params into a canonical sorted object
  const normalized: Record<string, unknown> = {
    title: params.title,
    theme: params.theme,
    format: params.format,
  };

  if (params.description) normalized.description = params.description;
  if (params.author) normalized.author = params.author;
  if (params.badge) normalized.badge = params.badge;
  if (params.site) normalized.site = params.site;
  if (params.tags && params.tags.length > 0) {
    normalized.tags = [...params.tags].sort();
  }

  // Sort keys alphabetically
  const sortedKeys = Object.keys(normalized).sort();
  const canonicalEntries = sortedKeys.map((k) => [k, normalized[k]]);
  const canonicalString = JSON.stringify(canonicalEntries);

  const hash = crypto.createHash('sha256').update(canonicalString).digest('hex');
  const key = `${hash}.${params.format}`;

  return { key, hash };
}
