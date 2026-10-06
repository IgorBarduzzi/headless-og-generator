import type { FastifyPluginAsync } from 'fastify';
import { OgQuerySchema } from '../types/og.js';
import { generateCacheKey } from '../cache/key.js';
import type { StorageAdapter } from '../cache/adapter.js';
import { SingleFlight } from '../cache/single-flight.js';
import { renderOgImage, renderFallbackImage } from '../engine/renderer.js';
import { config } from '../config.js';

export interface OgRouteOptions {
  storage: StorageAdapter;
}

export const ogRoute: FastifyPluginAsync<OgRouteOptions> = async (fastify, opts) => {
  const { storage } = opts;
  const singleFlight = new SingleFlight<Buffer>();

  fastify.get('/api/og', async (request, reply) => {
    const startTime = performance.now();

    // 1. Strict validation via Zod
    const parseResult = OgQuerySchema.safeParse(request.query);
    if (!parseResult.success) {
      return reply.status(400).send({
        type: 'https://og.barduzzi.dev/errors/validation-failed',
        title: 'Validation Error',
        status: 400,
        detail: 'The provided query parameters failed schema validation.',
        errors: parseResult.error.flatten().fieldErrors,
        timestamp: new Date().toISOString(),
      });
    }

    const params = parseResult.data;
    const { key, hash } = generateCacheKey(params);
    const contentType = params.format === 'webp' ? 'image/webp' : 'image/png';

    // 2. Check Cache Storage
    const cachedBuffer = await storage.get(key);

    if (cachedBuffer) {
      const durationMs = (performance.now() - startTime).toFixed(2);

      return reply
        .header('Content-Type', contentType)
        .header('Cache-Control', config.cacheControl)
        .header('X-Cache', 'HIT')
        .header('X-Cache-Key', hash)
        .header('X-Response-Time', `${durationMs}ms`)
        .header('Server-Timing', `hit;dur=${durationMs};desc="Cache Hit"`)
        .send(cachedBuffer);
    }

    // 3. Cache MISS: execute through Single-Flight coalescer to prevent Cache Stampedes
    try {
      const generatedBuffer = await singleFlight.do(key, async () => {
        // Double-check cache in case previous coalesced run just finished
        const existing = await storage.get(key);
        if (existing) return existing;

        const rendered = await renderOgImage(params);
        // Persist to storage adapter asynchronously
        await storage.set(key, rendered);
        return rendered;
      });

      const durationMs = (performance.now() - startTime).toFixed(2);

      return reply
        .header('Content-Type', contentType)
        .header('Cache-Control', config.cacheControl)
        .header('X-Cache', 'MISS')
        .header('X-Cache-Key', hash)
        .header('X-Response-Time', `${durationMs}ms`)
        .header('Server-Timing', `miss;dur=${durationMs};desc="Cache Miss Render"`)
        .send(generatedBuffer);
    } catch (err) {
      request.log.error(err, 'Failed to generate dynamic OG image, using fallback');

      // 4. Graceful degradation: return emergency fallback image
      const fallbackBuffer = await renderFallbackImage(params.format);
      return reply
        .status(200)
        .header('Content-Type', contentType)
        .header('X-Cache', 'FALLBACK')
        .header('Cache-Control', 'public, max-age=60')
        .send(fallbackBuffer);
    }
  });
};
