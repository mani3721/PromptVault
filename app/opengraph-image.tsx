import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'PromptVault — Best AI Prompts for ChatGPT, Gemini, Claude & More';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f0f11 0%, #18181b 60%, #1e1333 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow blobs */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -120,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
          }}
        />

        {/* Vault icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 88,
            height: 88,
            borderRadius: 22,
            background: '#f0ecfc',
            border: '2.5px solid #534ab7',
            marginBottom: 28,
            boxShadow: '0 0 56px rgba(83,74,183,0.55)',
          }}
        >
          <svg width="52" height="52" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="28" height="28" rx="7" fill="#f0ecfc" stroke="#534ab7" strokeWidth="1.5"/>
            <rect x="5.5" y="5.5" width="21" height="21" rx="4" fill="#eae4f9" stroke="#7f77dd" strokeWidth="1"/>
            <rect x="5.5" y="9" width="3" height="5" rx="1" fill="#7f77dd"/>
            <rect x="5.5" y="18" width="3" height="5" rx="1" fill="#7f77dd"/>
            <rect x="23.5" y="11.5" width="2.5" height="4" rx="1" fill="#534ab7"/>
            <rect x="23.5" y="16.5" width="2.5" height="4" rx="1" fill="#534ab7"/>
            <circle cx="16" cy="16" r="6.5" fill="white" stroke="#534ab7" strokeWidth="1.5"/>
            <circle cx="16" cy="16" r="4.5" fill="#eae4f9" stroke="#afa9ec" strokeWidth="0.75"/>
            <line x1="16" y1="16" x2="18.5" y2="13.5" stroke="#3c3489" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="16" cy="16" r="1.25" fill="#534ab7"/>
          </svg>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-1.5px',
            marginBottom: 16,
          }}
        >
          PromptVault
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
            maxWidth: 720,
            lineHeight: 1.4,
            marginBottom: 40,
          }}
        >
          Discover &amp; copy the best AI prompts for ChatGPT, Gemini, Claude &amp; more
        </div>

        {/* Pill badges */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['ChatGPT', 'Gemini', 'Claude', 'Midjourney', 'Copilot'].map((label) => (
            <div
              key={label}
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.75)',
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            fontSize: 16,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.04em',
          }}
        >
          promptvault.app
        </div>
      </div>
    ),
    { ...size }
  );
}
