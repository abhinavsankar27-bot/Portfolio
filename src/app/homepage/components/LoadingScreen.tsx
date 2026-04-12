'use client';

import React, { useEffect, useRef, useState } from 'react';

const BOOT_LINES = [
  { text: 'INITIALIZING SYSTEM...', delay: 150, color: '#00FF94' },
  { text: 'LOADING MODULES...', delay: 700, color: 'rgba(255,255,255,0.7)' },
  { text: 'CONNECTING CLOUD INFRASTRUCTURE...', delay: 1200, color: 'rgba(255,255,255,0.7)' },
  { text: 'CALIBRATING AI INTERFACE...', delay: 1700, color: 'rgba(255,255,255,0.7)' },
  { text: 'MOUNTING NEURAL PATHWAYS...', delay: 2100, color: 'rgba(124,143,255,0.8)' },
  { text: 'SYSTEM READY.', delay: 2600, color: '#00FF94' },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Animated grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animId: number;
    let frame = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Perspective grid
      const horizon = canvas.height * 0.55;
      const vp = { x: canvas.width / 2, y: horizon };
      const gridLines = 20;
      const speed = (frame * 0.5) % (canvas.height / gridLines);

      ctx.strokeStyle = 'rgba(0,255,148,0.06)';
      ctx.lineWidth = 0.5;

      // Horizontal lines
      for (let i = 0; i <= gridLines; i++) {
        const y = horizon + (i / gridLines) * (canvas.height - horizon) + speed;
        if (y > canvas.height) continue;
        const perspective = (y - horizon) / (canvas.height - horizon);
        const xLeft = vp.x - perspective * canvas.width * 0.8;
        const xRight = vp.x + perspective * canvas.width * 0.8;
        ctx.globalAlpha = perspective * 0.4;
        ctx.beginPath();
        ctx.moveTo(xLeft, y);
        ctx.lineTo(xRight, y);
        ctx.stroke();
      }

      // Vertical lines converging to vanishing point
      const vLines = 16;
      for (let i = 0; i <= vLines; i++) {
        const t = i / vLines;
        const xBottom = canvas.width * t;
        ctx.globalAlpha = 0.08 * Math.sin(t * Math.PI);
        ctx.beginPath();
        ctx.moveTo(vp.x, horizon);
        ctx.lineTo(xBottom, canvas.height);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      // Scanning line
      const scanY = ((frame * 1.5) % canvas.height);
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 2);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(1, 'rgba(0,255,148,0.08)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 40, canvas.width, 42);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Glitch effect trigger
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 120);
    }, 1800);
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    // Reveal boot lines sequentially
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.2;
      });
    }, 35);

    // Trigger exit
    const exitTimer = setTimeout(async () => {
      setDone(true);
      const { gsap } = await import('gsap');
      if (overlayRef.current) {
        const tl = gsap.timeline();
        // Flash
        tl.to(overlayRef.current, { opacity: 0.3, duration: 0.08, ease: 'none' })
          .to(overlayRef.current, { opacity: 1, duration: 0.08, ease: 'none' })
          .to(overlayRef.current, { opacity: 0.1, duration: 0.06, ease: 'none' })
          .to(overlayRef.current, { opacity: 1, duration: 0.06, ease: 'none' })
          // Cinematic slide up with scale
          .to(overlayRef.current, {
            yPercent: -100,
            scaleX: 1.02,
            duration: 1.2,
            ease: 'expo.inOut',
            onComplete: () => {
              onComplete();
            },
          });
      }
    }, 3400);

    return () => {
      clearTimeout(exitTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="loading-screen"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Animated grid canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />

      {/* Scanline effect */}
      <div className="loading-scanlines" aria-hidden="true" />

      {/* Corner HUD decorations */}
      <div className="loading-corner loading-corner-tl" aria-hidden="true" />
      <div className="loading-corner loading-corner-tr" aria-hidden="true" />
      <div className="loading-corner loading-corner-bl" aria-hidden="true" />
      <div className="loading-corner loading-corner-br" aria-hidden="true" />

      {/* HUD top bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: 'rgba(0,255,148,0.4)',
          letterSpacing: '0.2em',
        }}
      >
        <span>SYS://PORTFOLIO_v2.0</span>
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
        <span>ABHINAV SANKAR</span>
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
        <span>CLOUD &amp; AI</span>
      </div>

      {/* HUD bottom bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: 'rgba(0,255,148,0.3)',
          letterSpacing: '0.15em',
        }}
      >
        <span>THRISSUR, KERALA, INDIA</span>
        <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
        <span>MCA · CLOUD COMPUTING</span>
      </div>

      <div className="loading-content">
        {/* Logo / Name with glitch */}
        <div className="loading-logo">
          <span
            className="loading-logo-text"
            style={{
              filter: glitchActive ? 'hue-rotate(90deg) brightness(1.5)' : 'none',
              transform: glitchActive ? `translate(${Math.random() * 4 - 2}px, 0)` : 'none',
              transition: glitchActive ? 'none' : 'filter 0.1s, transform 0.1s',
            }}
          >
            AS
          </span>
          <div className="loading-logo-line" aria-hidden="true" />
        </div>

        {/* Boot lines */}
        <div className="loading-terminal" role="status">
          {BOOT_LINES.map((line, i) => (
            <div
              key={i}
              className="loading-boot-line"
              style={{
                opacity: visibleLines.includes(i) ? 1 : 0,
                transform: visibleLines.includes(i) ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <span className="loading-boot-prefix">{'>'}</span>
              <span className="loading-boot-text" style={{ color: line.color }}>
                {line.text}
              </span>
              {visibleLines.includes(i) && i === visibleLines.length - 1 && !done && (
                <span className="loading-cursor" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="loading-progress-wrap" aria-hidden="true">
          <div
            className="loading-progress-bar"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Percentage + status */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.15em',
            }}
          >
            {progress < 100 ? 'LOADING...' : 'COMPLETE'}
          </span>
          <div className="loading-percent">{Math.min(Math.round(progress), 100)}%</div>
        </div>
      </div>
    </div>
  );
}
