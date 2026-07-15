"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
  exit: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "afterChildren"
    }
  }
};

const pillarVariants: Variants = {
  hidden: { y: 0 },
  visible: { y: 0 },
  exit: (i: number) => ({
    y: i % 2 === 0 ? '-100%' : '100%',
    transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] as const }
  })
};

const contentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 1.5, filter: 'blur(10px)', transition: { duration: 0.5, ease: "easeIn" as const } }
};

export default function BrutalistLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';
    
    let currentProgress = 0;
    let isMounted = true;
    const interval = setInterval(() => {
      // Deliberate, mechanical counting (slowed down)
      currentProgress += Math.floor(Math.random() * 3) + 1;
      if (currentProgress >= 100) {
        currentProgress = 100;
        if (isMounted) setProgress(100);
        clearInterval(interval);
        
        // Wait a beat at 100% before triggering vault exit
        setTimeout(() => {
          if (isMounted) {
            document.body.style.overflow = 'auto';
            onComplete(); // Tells page.tsx to unmount, triggering exit animations
          }
        }, 500);
      } else {
        if (isMounted) setProgress(currentProgress);
      }
    }, 60);

    return () => {
      isMounted = false;
      clearInterval(interval);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  const columns = 5;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex w-full h-full bg-transparent overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 5 Vertical Pillars acting as the background vault */}
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={pillarVariants}
          className="h-full bg-disruptor-black flex-1 border-r-2 border-disruptor-white/10"
        />
      ))}

      {/* Foreground Content */}
      <motion.div 
        variants={contentVariants}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Massive Dynamic Loading Bar */}
        <div className="w-[85vw] h-[25vh] md:h-[35vh] border-[8px] md:border-[16px] border-disruptor-white relative flex items-center justify-center overflow-hidden bg-transparent shadow-[16px_16px_0_0_#AEE2FF]">
          
          {/* Background fill that expands */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-disruptor-white z-0"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
          
          {/* Text that magically inverts color when the white bar passes behind it */}
          <div className="relative z-10 font-ranchers text-[100px] sm:text-[180px] md:text-[250px] lg:text-[300px] text-disruptor-white mix-blend-difference leading-none tracking-widest whitespace-nowrap mt-4">
            {progress.toString().padStart(3, '0')}%
          </div>
        </div>

        {/* Dynamic Status Text */}
        <div className="mt-12 font-space text-disruptor-white text-base md:text-3xl font-bold tracking-[0.2em] md:tracking-[0.5em] uppercase flex items-center gap-4 bg-disruptor-black px-6 py-4 border-2 border-disruptor-white">
          <div className={`w-4 h-4 shrink-0 ${progress === 100 ? 'bg-disruptor-volt' : 'bg-red-500 animate-pulse'}`}></div>
          {progress < 100 ? 'ASSEMBLING_ASSETS' : 'SYSTEM_UNLOCKED'}
        </div>
        
        {/* Brutalist Corner Decorations */}
        <div className="absolute top-10 left-10 w-16 md:w-32 h-16 md:h-32 border-t-[8px] md:border-t-[16px] border-l-[8px] md:border-l-[16px] border-disruptor-white"></div>
        <div className="absolute bottom-10 right-10 w-16 md:w-32 h-16 md:h-32 border-b-[8px] md:border-b-[16px] border-r-[8px] md:border-r-[16px] border-disruptor-white"></div>
        
        {/* Rotating Geometric shape */}
        <motion.div 
          className="absolute top-10 right-10 w-12 md:w-20 h-12 md:h-20 border-[6px] border-disruptor-volt mix-blend-difference"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-12 md:w-20 h-12 md:h-20 bg-disruptor-white mix-blend-difference"
          animate={{ scale: [1, 0.5, 1], rotate: [0, 90, 180] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
