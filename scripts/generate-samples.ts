import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderOgImage } from '../src/engine/renderer.js';
import type { OgParams } from '../src/types/og.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'assets', 'examples');

const SAMPLES: Array<{ name: string; params: OgParams }> = [
  {
    name: 'cyberpunk-card.png',
    params: {
      title: 'Single-Flight Request Deduplication & Cache Coalescing',
      description: 'Mitigating the Thundering Herd / Cache Stampede problem under high concurrent load.',
      author: 'Igor Barduzzi',
      theme: 'cyberpunk',
      format: 'png',
      badge: 'Production Ready',
      tags: ['Rust', 'NodeJS', 'Fastify', 'Satori'],
      site: 'og.barduzzi.dev',
    },
  },
  {
    name: 'dark-card.png',
    params: {
      title: 'Building Resilient Backend Services with Clean Architecture',
      description: 'Hexagonal Domain Design, Adapter Pattern for Multi-Tier Storage, and Strict Problem Details Error Envelopes.',
      author: 'Igor Barduzzi',
      theme: 'dark',
      format: 'png',
      badge: 'Architecture Guide',
      tags: ['TypeScript', 'Hexagonal', 'Systems'],
      site: 'og.barduzzi.dev',
    },
  },
  {
    name: 'ocean-card.png',
    params: {
      title: 'Zero-Downtime Deployments & High-Availability Database Tuning',
      description: 'Connection pooling, distributed locks, and automated failovers for mission-critical workloads.',
      author: 'Igor Barduzzi',
      theme: 'ocean',
      format: 'png',
      badge: 'DevOps & DB',
      tags: ['PostgreSQL', 'Docker', 'Kubernetes'],
      site: 'og.barduzzi.dev',
    },
  },
  {
    name: 'sunset-card.png',
    params: {
      title: 'High-Speed Headless OpenGraph Image Engine',
      description: 'Sub-2ms cache response times, Satori vector generation, and instant social share cards.',
      author: 'Igor Barduzzi',
      theme: 'sunset',
      format: 'png',
      badge: 'Open Source',
      tags: ['Performance', 'WebP', 'CloudflareR2'],
      site: 'og.barduzzi.dev',
    },
  },
];

async function generate() {
  await fs.mkdir(outputDir, { recursive: true });
  console.log('Generating preview samples for README gallery...');

  for (const sample of SAMPLES) {
    const buffer = await renderOgImage(sample.params);
    const filePath = path.join(outputDir, sample.name);
    await fs.writeFile(filePath, buffer);
    console.log(`✓ Generated ${sample.name} (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log('\nAll sample images generated in assets/examples/!');
}

generate().catch(console.error);
