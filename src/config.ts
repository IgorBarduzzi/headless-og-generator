import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || '0.0.0.0',
  cacheDir: process.env.CACHE_DIR || path.join(rootDir, 'cache'),
  regularFontPath: process.env.REGULAR_FONT_PATH || path.join(rootDir, 'assets', 'fonts', 'Inter-Regular.woff'),
  boldFontPath: process.env.BOLD_FONT_PATH || path.join(rootDir, 'assets', 'fonts', 'Inter-Bold.woff'),
  defaultTheme: 'dark',
  defaultFormat: 'png',
  cacheControl: 'public, max-age=31536000, immutable',
  imageWidth: 1200,
  imageHeight: 630,
} as const;
