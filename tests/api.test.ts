import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/server.js';
import { MemoryStorageAdapter } from '../src/cache/memory-adapter.js';

describe('Fastify OpenGraph API Integration Tests', () => {
  let app: FastifyInstance;
  let memoryStorage: MemoryStorageAdapter;

  beforeAll(async () => {
    memoryStorage = new MemoryStorageAdapter();
    app = await buildApp({ storage: memoryStorage });
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health returns 200 and status healthy', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(res.statusCode).toBe(200);
    const json = JSON.parse(res.payload);
    expect(json.status).toBe('healthy');
    expect(json.adapter).toBe('MemoryStorageAdapter');
  });

  it('GET /api/og returns 400 Problem Details if title is missing', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/og',
    });

    expect(res.statusCode).toBe(400);
    const json = JSON.parse(res.payload);
    expect(json.status).toBe(400);
    expect(json.title).toBe('Validation Error');
    expect(json.errors.title).toBeDefined();
  });

  it('GET /api/og handles MISS then HIT deterministically', async () => {
    const query = '/api/og?title=Architecture+Demo&author=Igor&theme=cyberpunk';

    // 1st Call: Cache MISS
    const missRes = await app.inject({
      method: 'GET',
      url: query,
    });

    expect(missRes.statusCode).toBe(200);
    expect(missRes.headers['x-cache']).toBe('MISS');
    expect(missRes.headers['content-type']).toBe('image/png');
    expect(missRes.rawPayload.length).toBeGreaterThan(1000);

    const firstKey = missRes.headers['x-cache-key'];

    // 2nd Call: Cache HIT (Immediate)
    const hitRes = await app.inject({
      method: 'GET',
      url: query,
    });

    expect(hitRes.statusCode).toBe(200);
    expect(hitRes.headers['x-cache']).toBe('HIT');
    expect(hitRes.headers['x-cache-key']).toBe(firstKey);
    expect(hitRes.rawPayload).toEqual(missRes.rawPayload);

    // 3rd Call: Inverted query parameters should still HIT the exact same cache
    const invertedQuery = '/api/og?theme=cyberpunk&author=Igor&title=Architecture+Demo';
    const invertedHitRes = await app.inject({
      method: 'GET',
      url: invertedQuery,
    });

    expect(invertedHitRes.statusCode).toBe(200);
    expect(invertedHitRes.headers['x-cache']).toBe('HIT');
    expect(invertedHitRes.headers['x-cache-key']).toBe(firstKey);
    expect(invertedHitRes.rawPayload).toEqual(missRes.rawPayload);
  });
});
