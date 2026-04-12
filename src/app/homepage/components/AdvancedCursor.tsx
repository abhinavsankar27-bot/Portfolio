'use client';

import React, { useEffect, useRef } from 'react';
import { soundEngine } from '@/utils/soundEngine';

export default function AdvancedCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let dotX = -100, dotY = -100;
    let ringX = -100, ringY = -100;
    let rafId: number;
    let currentState = 'default';

    const moveCursor = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.1;
      ringY += (dotY - ringY) * 0.1;

      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', moveCursor);

    const setState = (state: string, text?: string) => {
      if (currentState === state) return;
      currentState = state;

      ring.className = 'adv-cursor-ring';
      if (state === 'hover') {
        ring.classList.add('adv-cursor-ring--hover');
        soundEngine.playHoverSound();
      }
      if (state === 'view') {
        ring.classList.add('adv-cursor-ring--view');
        soundEngine.playHoverSound();
      }
      if (state === 'click') {
        ring.classList.add('adv-cursor-ring--click');
        soundEngine.playClickSound();
      }

      if (text && state === 'view') {
        label.textContent = text;
        label.style.opacity = '1';
      } else {
        label.style.opacity = '0';
      }
    };

    // Attach to interactive elements
    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-hover], [data-cursor-view]').forEach((el) => {
        const viewText = (el as HTMLElement).dataset.cursorView;
        el.addEventListener('mouseenter', () => setState(viewText ? 'view' : 'hover', viewText));
        el.addEventListener('mouseleave', () => setState('default'));
      });
    };

    attachListeners();

    // Re-attach on DOM changes
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Click state
    const onMouseDown = () => setState('click');
    const onMouseUp = () => setState('default');
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="adv-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="adv-cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="adv-cursor-label" aria-hidden="true" />
      </div>
    </>
  );
}
