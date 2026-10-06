import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import { DiskStorageAdapter } from './cache/disk-adapter.js';
import type { StorageAdapter } from './cache/adapter.js';
import { loadFonts } from './engine/fonts.js';
import { ogRoute } from './routes/og.js';
import { healthRoute } from './routes/health.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export interface AppOptions {
  storage?: StorageAdapter;
  logger?: boolean;
}

export async function buildApp(opts: AppOptions = {}) {
  const app = Fastify({
    logger: opts.logger ?? (config.env !== 'test'),
    trustProxy: true,
  });

  // Enable CORS
  await app.register(cors, {
    origin: '*',
    methods: ['GET'],
  });

  // Serve static UI demo from /public
  await app.register(fastifyStatic, {
    root: path.join(rootDir, 'public'),
    prefix: '/',
  });

  // Storage Adapter: default to DiskStorageAdapter unless overridden
  const storage = opts.storage ?? new DiskStorageAdapter(config.cacheDir);

  // Register routes
  await app.register(ogRoute, { storage });
  await app.register(healthRoute, { storage });

  // Alias /demo to /
  app.get('/demo', async (_, reply) => {
    return reply.sendFile('index.html');
  });

  return app;
}

async function start() {
  try {
    console.log('⚡ Pre-warming font engine in memory...');
    await loadFonts();
    console.log('✅ Fonts loaded successfully.');

    const app = await buildApp();

    const address = await app.listen({
      port: config.port,
      host: config.host,
    });

    console.log(`\n🚀 Headless OpenGraph Engine running at: ${address}`);
    console.log(`   Interactive Sandbox: ${address}/demo`);
    console.log(`   Health Check:        ${address}/health\n`);

    // Graceful shutdown handling
    const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
    for (const signal of signals) {
      process.on(signal, async () => {
        console.log(`\nReceived ${signal}, closing server gracefully...`);
        await app.close();
        process.exit(0);
      });
    }
  } catch (err) {
    console.error('Fatal error starting server:', err);
    process.exit(1);
  }
}

// Start if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  start();
}
