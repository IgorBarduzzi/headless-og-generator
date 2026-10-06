import fs from 'node:fs/promises';
import { config } from '../config.js';

export interface SatoriFont {
  name: string;
  data: Buffer;
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style: 'normal' | 'italic';
}

let cachedFonts: SatoriFont[] | null = null;

/**
 * Loads font data once into memory (Singleton Warmup)
 * Eliminates per-request font file I/O latency.
 */
export async function loadFonts(): Promise<SatoriFont[]> {
  if (cachedFonts) {
    return cachedFonts;
  }

  const [regularBuffer, boldBuffer] = await Promise.all([
    fs.readFile(config.regularFontPath),
    fs.readFile(config.boldFontPath),
  ]);

  cachedFonts = [
    {
      name: 'Inter',
      data: regularBuffer,
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Inter',
      data: boldBuffer,
      weight: 700,
      style: 'normal',
    },
  ];

  return cachedFonts;
}
