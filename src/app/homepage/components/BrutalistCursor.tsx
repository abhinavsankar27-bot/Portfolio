'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { soundEngine } from '../../../utils/soundEngine';

export default function BrutalistCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor if device has fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    setIsVisible(true);
    // Initialize audio context on first user interaction
    const initAudio = () => soundEngine.init();
    window.addEventListener('click', initAudio, { once: true });

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isInteractive && !isHovering) {
        setIsHovering(true);
        soundEngine.playHoverSound();
      } else if (!isInteractive) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      if (isHovering) {
        soundEngine.playClickSound();
      }
    };
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      animate={{
        x: mousePosition.x - 16, // center the 32x32 cursor
        y: mousePosition.y - 16,
        scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        rotate: isHovering ? 45 : 0
      }}
      transition={{
        type: 'spring',
        stiffness: 1000,
        damping: 50,
        mass: 0.1
      }}
    >
      {/* Brutalist Crosshair/Square */}
      <div className={`bg-white transition-all duration-200 ${isHovering ? 'w-8 h-8 rounded-none' : 'w-6 h-6 rounded-none'}`}>
        {isHovering && (
          <div className="w-full h-full border-4 border-black box-border flex items-center justify-center">
            <div className="w-2 h-2 bg-black"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
