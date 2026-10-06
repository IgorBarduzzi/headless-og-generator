import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import type { OgParams } from '../types/og.js';
import { SocialCard } from '../templates/social-card.js';
import { loadFonts } from './fonts.js';
import { config } from '../config.js';

/**
 * Core image rendering engine.
 * Pipeline: React Element -> Satori (SVG) -> Resvg (PNG) -> Sharp (Optional WebP)
 */
export async function renderOgImage(params: OgParams): Promise<Buffer> {
  const fonts = await loadFonts();

  // 1. Generate SVG via Satori
  const element = SocialCard(params);
  const svg = await satori(element, {
    width: config.imageWidth,
    height: config.imageHeight,
    fonts: fonts.map((f) => ({
      name: f.name,
      data: f.data,
      weight: f.weight,
      style: f.style,
    })),
  });

  // 2. Rasterize SVG to PNG via high-speed Rust-based Resvg
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: config.imageWidth,
    },
    font: {
      loadSystemFonts: false,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  // 3. Optional WebP optimization
  if (params.format === 'webp') {
    return await sharp(pngBuffer)
      .webp({ quality: 88, effort: 4 })
      .toBuffer();
  }

  return pngBuffer;
}

/**
 * Pre-baked emergency SVG fallback if template rendering ever throws an unexpected exception.
 * Guarantees social bots never encounter an HTTP 500 error page.
 */
export async function renderFallbackImage(format: 'png' | 'webp' = 'png'): Promise<Buffer> {
  const fallbackSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#090d16"/>
      <circle cx="1050" cy="150" r="250" fill="#38bdf8" opacity="0.1"/>
      <rect x="80" y="80" width="1040" height="470" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)"/>
      <text x="140" y="280" font-family="sans-serif" font-size="54" font-weight="bold" fill="#ffffff">Preview Not Available</text>
      <text x="140" y="340" font-family="sans-serif" font-size="24" fill="#94a3b8">The requested preview card could not be generated dynamically.</text>
      <text x="140" y="470" font-family="sans-serif" font-size="20" fill="#38bdf8">OpenGraph Headless Engine</text>
    </svg>
  `;

  const resvg = new Resvg(fallbackSvg, {
    fitTo: { mode: 'width', value: 1200 },
  });
  const png = resvg.render().asPng();

  if (format === 'webp') {
    return await sharp(png).webp({ quality: 80 }).toBuffer();
  }

  return png;
}
