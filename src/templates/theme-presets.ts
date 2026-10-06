import type { ThemeName } from '../types/og.js';

export interface ThemeStyles {
  bg: string;
  gradientBg: string;
  gridColor: string;
  cardBorder: string;
  cardBg: string;
  titleGradient: string;
  descColor: string;
  authorColor: string;
  authorSub: string;
  tagBg: string;
  tagColor: string;
  tagBorder: string;
  badgeBg: string;
  badgeColor: string;
  badgeBorder: string;
  accent: string;
  watermarkColor: string;
}

export const THEME_PRESETS: Record<ThemeName, ThemeStyles> = {
  dark: {
    bg: '#080c14',
    gradientBg: 'radial-gradient(circle at 90% 10%, rgba(56, 189, 248, 0.18) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.15) 0%, transparent 45%)',
    gridColor: 'rgba(255, 255, 255, 0.04)',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    cardBg: 'rgba(15, 23, 42, 0.55)',
    titleGradient: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
    descColor: '#94a3b8',
    authorColor: '#f8fafc',
    authorSub: '#64748b',
    tagBg: 'rgba(56, 189, 248, 0.08)',
    tagColor: '#38bdf8',
    tagBorder: 'rgba(56, 189, 248, 0.25)',
    badgeBg: 'rgba(56, 189, 248, 0.12)',
    badgeColor: '#38bdf8',
    badgeBorder: 'rgba(56, 189, 248, 0.35)',
    accent: '#38bdf8',
    watermarkColor: '#64748b',
  },
  cyberpunk: {
    bg: '#05050b',
    gradientBg: 'radial-gradient(circle at 90% 15%, rgba(0, 255, 204, 0.2) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(255, 0, 128, 0.18) 0%, transparent 45%)',
    gridColor: 'rgba(0, 255, 204, 0.05)',
    cardBorder: 'rgba(0, 255, 204, 0.22)',
    cardBg: 'rgba(12, 10, 24, 0.65)',
    titleGradient: 'linear-gradient(180deg, #ffffff 0%, #00ffcc 100%)',
    descColor: '#cbd5e1',
    authorColor: '#00ffcc',
    authorSub: '#ff007f',
    tagBg: 'rgba(255, 0, 128, 0.12)',
    tagColor: '#ff007f',
    tagBorder: 'rgba(255, 0, 128, 0.35)',
    badgeBg: 'rgba(0, 255, 204, 0.12)',
    badgeColor: '#00ffcc',
    badgeBorder: 'rgba(0, 255, 204, 0.4)',
    accent: '#00ffcc',
    watermarkColor: '#94a3b8',
  },
  ocean: {
    bg: '#021321',
    gradientBg: 'radial-gradient(circle at 85% 15%, rgba(45, 212, 191, 0.2) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(14, 165, 233, 0.18) 0%, transparent 45%)',
    gridColor: 'rgba(45, 212, 191, 0.05)',
    cardBorder: 'rgba(45, 212, 191, 0.2)',
    cardBg: 'rgba(4, 26, 46, 0.6)',
    titleGradient: 'linear-gradient(180deg, #ffffff 0%, #a5f3fc 100%)',
    descColor: '#99f6e4',
    authorColor: '#f0fdfa',
    authorSub: '#2dd4bf',
    tagBg: 'rgba(45, 212, 191, 0.1)',
    tagColor: '#2dd4bf',
    tagBorder: 'rgba(45, 212, 191, 0.3)',
    badgeBg: 'rgba(14, 165, 233, 0.12)',
    badgeColor: '#38bdf8',
    badgeBorder: 'rgba(14, 165, 233, 0.35)',
    accent: '#2dd4bf',
    watermarkColor: '#5eead4',
  },
  sunset: {
    bg: '#14091f',
    gradientBg: 'radial-gradient(circle at 85% 15%, rgba(244, 63, 94, 0.2) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(251, 146, 60, 0.18) 0%, transparent 45%)',
    gridColor: 'rgba(251, 146, 60, 0.05)',
    cardBorder: 'rgba(251, 146, 60, 0.22)',
    cardBg: 'rgba(28, 13, 44, 0.65)',
    titleGradient: 'linear-gradient(180deg, #ffffff 0%, #fed7aa 100%)',
    descColor: '#fecdd3',
    authorColor: '#fff1f2',
    authorSub: '#fb923c',
    tagBg: 'rgba(244, 63, 94, 0.12)',
    tagColor: '#fb7185',
    tagBorder: 'rgba(244, 63, 94, 0.35)',
    badgeBg: 'rgba(251, 146, 60, 0.15)',
    badgeColor: '#fb923c',
    badgeBorder: 'rgba(251, 146, 60, 0.4)',
    accent: '#fb923c',
    watermarkColor: '#fda4af',
  },
  light: {
    bg: '#f8fafc',
    gradientBg: 'radial-gradient(circle at 85% 15%, rgba(99, 102, 241, 0.12) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(14, 165, 233, 0.1) 0%, transparent 45%)',
    gridColor: 'rgba(0, 0, 0, 0.03)',
    cardBorder: 'rgba(0, 0, 0, 0.1)',
    cardBg: 'rgba(255, 255, 255, 0.85)',
    titleGradient: 'linear-gradient(180deg, #0f172a 0%, #334155 100%)',
    descColor: '#475569',
    authorColor: '#0f172a',
    authorSub: '#64748b',
    tagBg: 'rgba(99, 102, 241, 0.08)',
    tagColor: '#4f46e5',
    tagBorder: 'rgba(99, 102, 241, 0.25)',
    badgeBg: 'rgba(15, 23, 42, 0.06)',
    badgeColor: '#0f172a',
    badgeBorder: 'rgba(0, 0, 0, 0.15)',
    accent: '#4f46e5',
    watermarkColor: '#64748b',
  },
  minimal: {
    bg: '#000000',
    gradientBg: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
    gridColor: 'rgba(255, 255, 255, 0.03)',
    cardBorder: 'rgba(255, 255, 255, 0.15)',
    cardBg: '#09090b',
    titleGradient: 'linear-gradient(180deg, #ffffff 0%, #e4e4e7 100%)',
    descColor: '#a1a1aa',
    authorColor: '#ffffff',
    authorSub: '#71717a',
    tagBg: 'rgba(255, 255, 255, 0.05)',
    tagColor: '#f4f4f5',
    tagBorder: 'rgba(255, 255, 255, 0.15)',
    badgeBg: 'rgba(255, 255, 255, 0.1)',
    badgeColor: '#ffffff',
    badgeBorder: 'rgba(255, 255, 255, 0.25)',
    accent: '#ffffff',
    watermarkColor: '#71717a',
  },
};
