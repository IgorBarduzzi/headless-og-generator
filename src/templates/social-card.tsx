import React from 'react';
import type { OgParams } from '../types/og.js';
import { THEME_PRESETS } from './theme-presets.js';

export function SocialCard(props: OgParams): React.ReactElement {
  const theme = THEME_PRESETS[props.theme] || THEME_PRESETS.dark;
  const author = props.author || 'Igor Barduzzi';
  const site = props.site || 'og.barduzzi.dev';

  // Dynamic font scaling according to title length for perfect balance
  const titleLen = props.title.length;
  const titleSize = titleLen <= 35 ? '58px' : titleLen <= 70 ? '48px' : '40px';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: theme.bg,
        backgroundImage: theme.gradientBg,
        padding: '36px',
        fontFamily: 'Inter',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Sleek Inner Card Frame */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: '24px',
          padding: '48px 56px',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Author Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                backgroundColor: theme.tagBg,
                border: `1px solid ${theme.tagBorder}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.tagColor,
                fontWeight: 800,
                fontSize: '20px',
              }}
            >
              {author.charAt(0).toUpperCase()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span
                style={{
                  color: theme.authorColor,
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                {author}
              </span>
              <span
                style={{
                  color: theme.authorSub,
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}
              >
                OpenGraph Headless Engine
              </span>
            </div>
          </div>

          {/* Right Status Badge */}
          {props.badge && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '9999px',
                backgroundColor: theme.badgeBg,
                border: `1px solid ${theme.badgeBorder}`,
                color: theme.badgeColor,
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.02em',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: theme.accent,
                }}
              />
              <span>{props.badge}</span>
            </div>
          )}
        </div>

        {/* Center Content Body */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            marginTop: 'auto',
            marginBottom: 'auto',
            maxWidth: '1020px',
          }}
        >
          <h1
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              color: '#ffffff',
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
                fontSize: '22px',
                color: theme.descColor,
                lineHeight: 1.45,
                margin: 0,
                fontWeight: 400,
                maxWidth: '920px',
              }}
            >
              {props.description}
            </p>
          )}
        </div>

        {/* Bottom Bar: Tags & Watermark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: `1px solid ${theme.cardBorder}`,
            paddingTop: '24px',
          }}
        >
          {/* Tags */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {props.tags && props.tags.length > 0 ? (
              props.tags.map((tag, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    backgroundColor: theme.tagBg,
                    color: theme.tagColor,
                    border: `1px solid ${theme.tagBorder}`,
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  #{tag}
                </div>
              ))
            ) : (
              <div
                style={{
                  color: theme.descColor,
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                ⚡ Sub-10ms Headless OG Engine
              </div>
            )}
          </div>

          {/* Watermark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: theme.watermarkColor,
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Inter',
            }}
          >
            <span style={{ color: theme.accent }}>⚡</span>
            <span>{site}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
