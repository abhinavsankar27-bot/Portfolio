import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#CCFF00',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1A1A1A',
          fontWeight: 900,
          fontFamily: 'monospace',
          border: '3px solid #1A1A1A',
          borderRadius: '50%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', marginTop: -2, marginLeft: 2, fontSize: 18, letterSpacing: -2 }}>
          {'>_'}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
