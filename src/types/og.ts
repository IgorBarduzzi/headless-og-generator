import { z } from 'zod';

export const ThemeEnum = z.enum([
  'dark',
  'light',
  'cyberpunk',
  'ocean',
  'sunset',
  'minimal',
]);

export type ThemeName = z.infer<typeof ThemeEnum>;

export const FormatEnum = z.enum(['png', 'webp']);
export type ImageFormat = z.infer<typeof FormatEnum>;

export const OgQuerySchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(140, 'Title cannot exceed 140 characters')
    .transform((val) => val.trim()),
  description: z
    .string()
    .max(220, 'Description cannot exceed 220 characters')
    .optional()
    .transform((val) => val?.trim()),
  author: z
    .string()
    .max(60, 'Author cannot exceed 60 characters')
    .optional()
    .transform((val) => val?.trim()),
  tags: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0)
            .slice(0, 5)
        : []
    ),
  theme: ThemeEnum.default('dark'),
  format: FormatEnum.default('png'),
  badge: z
    .string()
    .max(30, 'Badge cannot exceed 30 characters')
    .optional()
    .transform((val) => val?.trim()),
  site: z
    .string()
    .max(50, 'Site cannot exceed 50 characters')
    .optional()
    .transform((val) => val?.trim()),
});

export type OgParams = z.infer<typeof OgQuerySchema>;
