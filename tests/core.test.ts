import { describe, it, expect, beforeEach } from 'vitest';
import { generateCacheKey } from '../src/cache/key.js';
import { MemoryStorageAdapter } from '../src/cache/memory-adapter.js';
import { SingleFlight } from '../src/cache/single-flight.js';
import { renderOgImage, renderFallbackImage } from '../src/engine/renderer.js';
import type { OgParams } from '../src/types/og.js';

describe('OpenGraph Engine Core Tests', () => {
  describe('generateCacheKey (Canonical Hashing)', () => {
    it('produces identical keys regardless of property ordering', () => {
      const p1: OgParams = {
        title: 'High-Performance Engine',
        author: 'Igor',
        theme: 'dark',
        format: 'png',
        tags: ['rust', 'node'],
      };

      const p2: OgParams = {
        author: 'Igor',
        title: 'High-Performance Engine',
        format: 'png',
        tags: ['node', 'rust'], // different tag order should normalize
        theme: 'dark',
      };

      const key1 = generateCacheKey(p1);
      const key2 = generateCacheKey(p2);

      expect(key1.key).toBe(key2.key);
      expect(key1.hash).toBe(key2.hash);
      expect(key1.key.endsWith('.png')).toBe(true);
    });

    it('produces different keys when themes or titles differ', () => {
      const p1: OgParams = {
        title: 'Title A',
        theme: 'dark',
        format: 'png',
        tags: [],
      };
      const p2: OgParams = {
        title: 'Title B',
        theme: 'dark',
        format: 'png',
        tags: [],
      };

      expect(generateCacheKey(p1).key).not.toBe(generateCacheKey(p2).key);
    });
  });

  describe('MemoryStorageAdapter', () => {
    let adapter: MemoryStorageAdapter;

    beforeEach(() => {
      adapter = new MemoryStorageAdapter();
    });

    it('stores, checks, and retrieves buffers', async () => {
      const testBuffer = Buffer.from('fake-png-binary-data');
      await adapter.set('test-key.png', testBuffer);

      expect(await adapter.has('test-key.png')).toBe(true);
      const retrieved = await adapter.get('test-key.png');
      expect(retrieved).toEqual(testBuffer);

      await adapter.delete('test-key.png');
      expect(await adapter.has('test-key.png')).toBe(false);
      expect(await adapter.get('test-key.png')).toBeNull();
    });
  });

  describe('SingleFlight (Request Coalescing)', () => {
    it('executes only once when multiple callers request the same key concurrently', async () => {
      const sf = new SingleFlight<string>();
      let executions = 0;

      const worker = async () => {
        return sf.do('same-image-hash', async () => {
          executions++;
          await new Promise((r) => setTimeout(r, 50));
          return 'rendered-image-data';
        });
      };

      const results = await Promise.all([worker(), worker(), worker(), worker()]);

      expect(executions).toBe(1);
      expect(results).toEqual([
        'rendered-image-data',
        'rendered-image-data',
        'rendered-image-data',
        'rendered-image-data',
      ]);
      expect(sf.activeCount).toBe(0);
    });
  });

  describe('Image Rendering Engine', () => {
    it('successfully renders a PNG social card', async () => {
      const params: OgParams = {
        title: 'Testing the High-Speed OG Generator',
        description: 'Blazingly fast social image generation with Satori & Resvg',
        author: 'Igor Barduzzi',
        theme: 'cyberpunk',
        format: 'png',
        tags: ['TypeScript', 'Fastify', 'Satori'],
        badge: 'v1.0.0',
        site: 'og.barduzzi.dev',
      };

      const buffer = await renderOgImage(params);
      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(1000); // valid PNG binary size
    }, 15000);

    it('successfully renders a WebP social card with smaller footprint', async () => {
      const params: OgParams = {
        title: 'WebP Compression Test',
        theme: 'dark',
        format: 'webp',
        tags: ['Fastify'],
      };

      const buffer = await renderOgImage(params);
      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(500);
    }, 15000);

    it('renders emergency fallback image gracefully', async () => {
      const fallback = await renderFallbackImage('png');
      expect(fallback).toBeInstanceOf(Buffer);
      expect(fallback.length).toBeGreaterThan(1000);
    });
  });
});
