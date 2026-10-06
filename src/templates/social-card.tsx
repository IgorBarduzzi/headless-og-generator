import React from 'react';
import type { OgParams } from '../types/og.js';
import { THEME_PRESETS } from './theme-presets.js';

export function SocialCard(props: OgParams): React.ReactElement {
  const theme = THEME_PRESETS[props.theme] || THEME_PRESETS.dark;
  const author = props.author || 'OpenGraph Generator';
  const site = props.site || 'og.barduzzi.dev';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor: theme.bg,
        padding: '56px 64px',
        fontFamily: 'Inter',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative ambient glow background element */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          backgroundColor: theme.accent,
          opacity: 0.12,
          filter: 'blur(100px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-120px',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          backgroundColor: theme.accent,
          opacity: 0.08,
          filter: 'blur(80px)',
        }}
      />

      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Author avatar chip */}
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '22px',
              background: theme.badgeBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.badgeColor,
              fontWeight: 700,
              fontSize: '18px',
            }}
          >
            {author.charAt(0).toUpperCase()}
          </div>
          <span
            style={{
              color: theme.authorColor,
              fontSize: '22px',
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            {author}
          </span>
        </div>

        {props.badge && (
          <div
            style={{
              display: 'flex',
              padding: '6px 18px',
              borderRadius: '9999px',
              background: theme.tagBg,
              border: `1px solid ${theme.tagBorder}`,
              color: theme.tagColor,
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            {props.badge}
          </div>
        )}
      </div>

      {/* Center Content Body */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginTop: 'auto',
          marginBottom: 'auto',
          maxWidth: '1070px',
        }}
      >
        <h1
          style={{
            fontSize: props.title.length > 60 ? '52px' : '64px',
            fontWeight: 800,
            color: theme.titleColor,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            margin: 0,
            padding: 0,
            wordBreak: 'break-word',
          }}
        >
          {props.title}
        </h1>

        {props.description && (
          <p
            style={{
              fontSize: '24px',
              color: theme.descColor,
              lineHeight: 1.45,
              margin: 0,
              fontWeight: 400,
              maxWidth: '960px',
            }}
          >
            {props.description}
          </p>
        )}
      </div>

      {/* Footer Tags & Site Branding */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          borderTop: `1px solid ${theme.border}`,
          paddingTop: '24px',
        }}
      >
        {/* Tags */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {props.tags && props.tags.length > 0 ? (
            props.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  display: 'flex',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  backgroundColor: theme.tagBg,
                  color: theme.tagColor,
                  border: `1px solid ${theme.tagBorder}`,
                  fontSize: '15px',
                  fontWeight: 600,
                }}
              >
                #{tag}
              </span>
            ))
          ) : (
            <span
              style={{
                color: theme.descColor,
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              OpenGraph High-Speed Engine
            </span>
          )}
        </div>

        {/* Site Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: theme.descColor,
            fontSize: '18px',
            fontWeight: 500,
          }}
        >
          <span>⚡</span>
          <span>{site}</span>
        </div>
      </div>
    </div>
  );
}
