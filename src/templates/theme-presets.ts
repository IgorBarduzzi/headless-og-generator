import type { ThemeName } from '../types/og.js';

export interface ThemeStyles {
  bg: string;
  bgGradient?: string;
  cardBg: string;
  border: string;
  titleColor: string;
  descColor: string;
  authorColor: string;
  tagBg: string;
  tagColor: string;
  tagBorder: string;
  badgeBg: string;
  badgeColor: string;
  accent: string;
}

export const THEME_PRESETS: Record<ThemeName, ThemeStyles> = {
  dark: {
    bg: '#090d16',
    cardBg: 'rgba(255, 255, 255, 0.03)',
    border: 'rgba(255, 255, 255, 0.08)',
    titleColor: '#ffffff',
    descColor: '#94a3b8',
    authorColor: '#38bdf8',
    tagBg: 'rgba(56, 189, 248, 0.1)',
    tagColor: '#38bdf8',
    tagBorder: 'rgba(56, 189, 248, 0.25)',
    badgeBg: 'linear-gradient(135deg, #38bdf8, #818cf8)',
    badgeColor: '#ffffff',
    accent: '#38bdf8',
  },
  light: {
    bg: '#f8fafc',
    cardBg: 'rgba(255, 255, 255, 0.8)',
    border: 'rgba(0, 0, 0, 0.08)',
    titleColor: '#0f172a',
    descColor: '#475569',
    authorColor: '#2563eb',
    tagBg: 'rgba(37, 99, 235, 0.08)',
    tagColor: '#2563eb',
    tagBorder: 'rgba(37, 99, 235, 0.2)',
    badgeBg: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    badgeColor: '#ffffff',
    accent: '#2563eb',
  },
  cyberpunk: {
    bg: '#0a0a12',
    cardBg: 'rgba(255, 0, 128, 0.04)',
    border: 'rgba(0, 255, 204, 0.25)',
    titleColor: '#00ffcc',
    descColor: '#e0e7ff',
    authorColor: '#ff007f',
    tagBg: 'rgba(255, 0, 127, 0.15)',
    tagColor: '#ff007f',
    tagBorder: 'rgba(255, 0, 127, 0.4)',
    badgeBg: 'linear-gradient(135deg, #ff007f, #00ffcc)',
    badgeColor: '#000000',
    accent: '#00ffcc',
  },
  ocean: {
    bg: '#02182b',
    cardBg: 'rgba(20, 184, 166, 0.04)',
    border: 'rgba(20, 184, 166, 0.2)',
    titleColor: '#f0fdfa',
    descColor: '#99f6e4',
    authorColor: '#2dd4bf',
    tagBg: 'rgba(45, 212, 191, 0.12)',
    tagColor: '#2dd4bf',
    tagBorder: 'rgba(45, 212, 191, 0.3)',
    badgeBg: 'linear-gradient(135deg, #0d9488, #0284c7)',
    badgeColor: '#ffffff',
    accent: '#2dd4bf',
  },
  sunset: {
    bg: '#180e29',
    cardBg: 'rgba(244, 63, 94, 0.05)',
    border: 'rgba(251, 146, 60, 0.25)',
    titleColor: '#fff1f2',
    descColor: '#fed7aa',
    authorColor: '#fb923c',
    tagBg: 'rgba(244, 63, 94, 0.12)',
    tagColor: '#fb7185',
    tagBorder: 'rgba(244, 63, 94, 0.3)',
    badgeBg: 'linear-gradient(135deg, #f43f5e, #fb923c)',
    badgeColor: '#ffffff',
    accent: '#fb923c',
  },
  minimal: {
    bg: '#000000',
    cardBg: '#09090b',
    border: '#27272a',
    titleColor: '#ffffff',
    descColor: '#a1a1aa',
    authorColor: '#e4e4e7',
    tagBg: '#18181b',
    tagColor: '#d4d4d8',
    tagBorder: '#27272a',
    badgeBg: '#ffffff',
    badgeColor: '#000000',
    accent: '#ffffff',
  },
};
