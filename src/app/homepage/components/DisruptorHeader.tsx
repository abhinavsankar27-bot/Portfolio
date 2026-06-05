'use client';

import React from 'react';
import { useUiMode } from '../../../context/UiModeContext';

export default function DisruptorHeader() {
  const { mode, toggleMode } = useUiMode();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-disruptor-white border-b-4 border-disruptor-black px-6 py-4 flex items-center justify-between">
      {/* Left: Logo & Brand */}
      <div className="flex items-center gap-4">
        {/* Rotated Black Square Logo */}
        <div className="w-12 h-12 bg-disruptor-black flex items-center justify-center rotate-3 border-2 border-disruptor-black neo-shadow-white">
          <svg className="w-6 h-6 text-disruptor-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        {/* Brand Text */}
        <span className="font-jakarta font-extrabold text-[30px] text-disruptor-black uppercase tracking-tight whitespace-nowrap">
          ABHINAV SANKAR
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* DEV MODE Toggle */}
        <button 
          onClick={toggleMode}
          className={`px-3 py-2 md:px-4 md:py-2 border-4 border-disruptor-black font-space font-bold text-xs md:text-sm uppercase tracking-widest transition-colors duration-200 neo-shadow-hover ${mode === 'RAW' ? 'bg-disruptor-black text-[#CCFF00]' : 'bg-disruptor-white text-disruptor-black hover:bg-disruptor-black hover:text-disruptor-white'}`}
        >
          {mode === 'RAW' ? '> SYS.RAW' : '> SYS.RENDER'}
        </button>

        {/* Technical Badge */}
        <div className="hidden lg:block px-3 py-1 bg-disruptor-volt border-2 border-disruptor-black neo-shadow font-space text-sm font-bold uppercase tracking-tech text-disruptor-black">
          FULL_STACK_DEV
        </div>

        {/* Contact Button */}
        <button 
          onClick={() => scrollTo('contact')}
          className="hidden md:block px-6 py-3 bg-disruptor-black text-disruptor-white font-space uppercase font-bold text-sm tracking-tech border-4 border-disruptor-black rounded-[8px] neo-shadow-hover hover:bg-disruptor-white hover:text-disruptor-black transition-colors duration-200"
        >
          CONTACT
        </button>
      </div>
    </header>
  );
}
