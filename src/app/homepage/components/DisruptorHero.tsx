"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export default function DisruptorHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Tilt for headline
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Exact pixel tracking for spotlight mask
  const pixelX = useMotionValue(0);
  const pixelY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const smoothPixelX = useSpring(pixelX, { stiffness: 100, damping: 20 });
  const smoothPixelY = useSpring(pixelY, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  // Dynamic Hard Shadow for Text (Brutalist)
  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [25, -15]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [25, -15]);
  const dynamicTextShadow = useMotionTemplate`${shadowX}px ${shadowY}px 0 #000000`;

  // Parallax for watermark
  const watermarkX = useTransform(mouseXSpring, [-0.5, 0.5], [40, -40]);
  const watermarkY = useTransform(mouseYSpring, [-0.5, 0.5], [40, -40]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // For 3D Tilt & Parallax
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    pixelX.set(mouseX);
    pixelY.set(mouseY);
  };

  const badges = [
    { text: "REACT.JS", rotation: -2 },
    { text: "NODE.JS", rotation: 3 },
    { text: "PYTHON", rotation: -1 },
    { text: "FIGMA", rotation: 4 },
    { text: "UI/UX DESIGN", rotation: -2 },
    { text: "MONGODB", rotation: 2 },
    { text: "AWS CLOUD", rotation: -3 },
  ];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[90vh] bg-disruptor-volt border-b-8 border-disruptor-black flex items-center justify-center px-6 py-20 overflow-hidden"
      style={{ perspective: 1200 }}
    >
      
      {/* Background Watermark Base (Faint) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 z-0"
        style={{ x: watermarkX, y: watermarkY }}
      >
        <span className="font-ranchers text-[30vw] text-disruptor-black leading-none">
          CODE
        </span>
      </motion.div>

      {/* Spotlight Watermark (Bright, masked to cursor) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 z-0 mix-blend-overlay"
        style={{ 
          x: watermarkX, 
          y: watermarkY,
          WebkitMaskImage: useMotionTemplate`radial-gradient(circle 350px at ${smoothPixelX}px ${smoothPixelY}px, black 0%, transparent 100%)`,
          maskImage: useMotionTemplate`radial-gradient(circle 350px at ${smoothPixelX}px ${smoothPixelY}px, black 0%, transparent 100%)`
        }}
      >
        <span className="font-ranchers text-[30vw] text-disruptor-white leading-none">
          CODE
        </span>
      </motion.div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-start gap-8">
        
        {/* Massive Headline with 3D Tilt and Dynamic Shadow */}
        <motion.h1 
          className="font-ranchers text-[45px] sm:text-[70px] md:text-[110px] lg:text-[130px] leading-tight-heading text-disruptor-white uppercase select-none group" 
          style={{ 
            rotateX, 
            rotateY,
            transformStyle: 'preserve-3d'
          }}
        >
          <motion.span 
            className="inline-block transition-transform duration-300"
            style={{ 
              translateZ: 20, 
              textShadow: dynamicTextShadow,
            }}
          >
            FULL STACK &
          </motion.span><br />
          <motion.span 
            className="inline-block transition-transform duration-300"
            style={{ 
              translateZ: 40,
              textShadow: dynamicTextShadow,
            }}
          >
            UI DESIGNER
          </motion.span>
        </motion.h1>

        <TypingSubheadline />
        
        {/* Draggable & Magnetic Badges */}
        <div className="flex flex-wrap gap-4 mt-6 relative z-50">
          {badges.map((badge, i) => (
            <MagneticBadge key={badge.text} badge={badge} index={i} containerRef={containerRef} />
          ))}
        </div>
      </div>

    </section>
  );
}

// Magnetic Badge Component
function MagneticBadge({ badge, index, containerRef }: { badge: any, index: number, containerRef: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Magnetic pull strength (closer = stronger)
    springX.set(middleX * 0.4);
    springY.set(middleY * 0.4);
  };

  const reset = () => {
    springX.set(0);
    springY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      drag
      dragElastic={0.5}
      dragConstraints={containerRef}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: badge.rotation }}
      whileHover={{ scale: 1.1, zIndex: 50, rotate: 0 }}
      whileDrag={{ scale: 1.15, rotate: 0, zIndex: 100 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.1 + 0.5 }}
      style={{
        x: springX,
        y: springY,
        background: '#FFFFFF',
        border: '4px solid #1A1A1A',
        padding: '8px 16px',
      }}
      className="cursor-grab active:cursor-grabbing neo-shadow select-none relative"
    >
      <span className="font-space uppercase font-bold text-sm tracking-widest text-disruptor-black">
        {badge.text}
      </span>
    </motion.div>
  );
}

// Typing Component for Subheadline matching template style
function TypingSubheadline() {
  const [text, setText] = useState('');
  const fullText = "Full Stack Developer and UI Designer building end-to-end web applications. Skilled in React.js, Node.js, Python, MongoDB, and crafting intuitive user experiences in Figma.";
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 25);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <p className="font-jakarta text-2xl italic font-bold text-disruptor-black max-w-2xl border-l-4 border-disruptor-black pl-6 relative pointer-events-none">
      {text}
      {isTyping && (
        <span className="inline-block w-[3px] h-[1.1em] bg-disruptor-black ml-1 align-middle animate-pulse" />
      )}
    </p>
  );
}
