import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Clear 晨曦 - Portfolio';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Subtle Background Accent */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '200px',
            height: '200px',
            background: 'white',
            opacity: 0.03,
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />
        
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
            <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Clear</span>
            <span style={{ fontSize: '64px', opacity: 0.7 }}>晨曦</span>
          </div>
          
          <div 
            style={{ 
              fontSize: '24px', 
              color: '#888', 
              letterSpacing: '0.4em', 
              textTransform: 'uppercase',
              marginTop: '20px',
              textAlign: 'center'
            }}
          >
            Hacker. Maker. Thinker.
          </div>
        </div>

        {/* Footer branding */}
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '60px', 
            fontSize: '14px', 
            color: '#444', 
            letterSpacing: '0.5em',
            textTransform: 'uppercase'
          }}
        >
          Portfolio 2024-2026
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
