import { buildApp } from '../src/server.js';
import { MemoryStorageAdapter } from '../src/cache/memory-adapter.js';

interface BenchStats {
  min: number;
  max: number;
  avg: number;
  p50: number;
  p95: number;
  p99: number;
}

function calculatePercentile(values: number[], percentile: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

function computeStats(latencies: number[]): BenchStats {
  const sum = latencies.reduce((a, b) => a + b, 0);
  return {
    min: Math.min(...latencies),
    max: Math.max(...latencies),
    avg: Number((sum / latencies.length).toFixed(2)),
    p50: Number(calculatePercentile(latencies, 50).toFixed(2)),
    p95: Number(calculatePercentile(latencies, 95).toFixed(2)),
    p99: Number(calculatePercentile(latencies, 99).toFixed(2)),
  };
}

async function runBenchmark() {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('       ⚡ HEADLESS OPENGRAPH ENGINE - BENCHMARK SUITE             ');
  console.log('═══════════════════════════════════════════════════════════════════\n');

  const app = await buildApp({ storage: new MemoryStorageAdapter(), logger: false });
  await app.ready();

  const testUrl = '/api/og?title=Benchmarking+Headless+OG+Engine&author=Igor+Barduzzi&theme=cyberpunk&tags=Rust,TypeScript,Fastify';

  // 1. Warm-up & Cache MISS measurement
  console.log('▶ [1/2] Testing Cold Start (CACHE MISS - Dynamic Rendering)...');
  const t0 = performance.now();
  const missRes = await app.inject({ method: 'GET', url: testUrl });
  const missLatency = Number((performance.now() - t0).toFixed(2));

  if (missRes.statusCode !== 200 || missRes.headers['x-cache'] !== 'MISS') {
    console.error('❌ Cache Miss test failed:', missRes.statusCode, missRes.payload);
    process.exit(1);
  }
  console.log(`   ✓ Cold Cache Miss latency: ${missLatency} ms`);
  console.log(`   ✓ Payload size: ${(missRes.rawPayload.length / 1024).toFixed(1)} KB`);

  // 2. Cache HIT measurement (50 iterations)
  const iterations = 50;
  console.log(`\n▶ [2/2] Testing Hot Path (CACHE HIT - ${iterations} sequential requests)...`);
  const hitLatencies: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    const hitRes = await app.inject({ method: 'GET', url: testUrl });
    const elapsed = performance.now() - start;

    if (hitRes.statusCode !== 200 || hitRes.headers['x-cache'] !== 'HIT') {
      console.error(`❌ Cache Hit request #${i} failed:`, hitRes.statusCode);
      process.exit(1);
    }
    hitLatencies.push(elapsed);
  }

  const stats = computeStats(hitLatencies);

  console.log('\n┌───────────────────────────────────────────────┐');
  console.log('│             BENCHMARK RESULTS SUMMARY         │');
  console.log('├────────────────────────────────┬──────────────┤');
  console.log(`│ Cache MISS (Dynamic Render)    │ ${missLatency.toString().padStart(9)} ms │`);
  console.log('├────────────────────────────────┼──────────────┤');
  console.log(`│ Cache HIT Min Latency          │ ${stats.min.toFixed(2).padStart(9)} ms │`);
  console.log(`│ Cache HIT Avg Latency          │ ${stats.avg.toFixed(2).padStart(9)} ms │`);
  console.log(`│ Cache HIT p50 (Median)         │ ${stats.p50.toFixed(2).padStart(9)} ms │`);
  console.log(`│ Cache HIT p95                  │ ${stats.p95.toFixed(2).padStart(9)} ms │`);
  console.log(`│ Cache HIT p99                  │ ${stats.p99.toFixed(2).padStart(9)} ms │`);
  console.log(`│ Cache HIT Max Latency          │ ${stats.max.toFixed(2).padStart(9)} ms │`);
  console.log('└────────────────────────────────┴──────────────┘\n');

  const speedup = (missLatency / stats.avg).toFixed(1);
  console.log(`🚀 CACHE SPEEDUP FACTOR: ~${speedup}x faster than cold render!\n`);

  await app.close();
}

runBenchmark().catch((err) => {
  console.error('Benchmark error:', err);
  process.exit(1);
});
