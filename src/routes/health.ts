import type { FastifyPluginAsync } from 'fastify';
import type { StorageAdapter } from '../cache/adapter.js';

export interface HealthRouteOptions {
  storage: StorageAdapter;
}

export const healthRoute: FastifyPluginAsync<HealthRouteOptions> = async (fastify, opts) => {
  fastify.get('/health', async () => {
    const memory = process.memoryUsage();

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      adapter: opts.storage.name,
      memory: {
        rssMb: Math.round(memory.rss / (1024 * 1024)),
        heapUsedMb: Math.round(memory.heapUsed / (1024 * 1024)),
        heapTotalMb: Math.round(memory.heapTotal / (1024 * 1024)),
      },
      nodeVersion: process.version,
    };
  });
};
