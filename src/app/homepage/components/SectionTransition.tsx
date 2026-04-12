'use client';

import React, { useEffect, useRef } from 'react';
import { soundEngine } from '@/utils/soundEngine';

interface SectionTransitionProps {
  sectionId: string;
  label: string;
  index: number;
}

export default function SectionTransition({ sectionId, label, index }: SectionTransitionProps) {
  const wipeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initTransition = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const wipe = wipeRef.current;
      const lbl = labelRef.current;
      if (!wipe || !lbl) return;

      const section = document.getElementById(sectionId);
      if (!section) return;

      // Wipe in from left, then out to right
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 40%',
          scrub: false,
          once: true,
          onEnter: () => {
            soundEngine.playSwooshSound();
            gsap.timeline()
              .set(wipe, { scaleX: 0, transformOrigin: 'left center', display: 'block' })
              .to(wipe, { scaleX: 1, duration: 0.6, ease: 'expo.inOut' })
              .to(lbl, { opacity: 1, y: 0, duration: 0.2, ease: 'expo.out' }, '-=0.1')
              .to(lbl, { opacity: 0, duration: 0.15, ease: 'power2.in' }, '+=0.2')
              .to(wipe, { scaleX: 0, transformOrigin: 'right center', duration: 0.6, ease: 'expo.inOut' })
              .set(wipe, { display: 'none' });
          },
        },
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.trigger === section) st.kill();
        });
      };
    };

    initTransition();
  }, [sectionId]);

  const colors = [
    'rgba(0,255,148,0.95)',
    'rgba(124,143,255,0.95)',
    'rgba(255,107,107,0.95)',
    'rgba(0,200,255,0.95)',
  ];
  const color = colors[index % colors.length];

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 50,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      {/* Wipe bar */}
      <div
        ref={wipeRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: color,
          display: 'none',
          boxShadow: `0 0 20px ${color}`,
        }}
      />
      {/* Section label flash */}
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 8,
          left: 24,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color,
          opacity: 0,
          transform: 'translateY(-4px)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
  );
}
