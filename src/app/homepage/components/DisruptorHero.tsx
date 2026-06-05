import React from 'react';

export default function DisruptorHero() {
  return (
    <section className="relative w-full min-h-[90vh] bg-disruptor-volt border-b-8 border-disruptor-black flex items-center justify-center px-6 py-20 overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <span className="font-ranchers text-[30vw] text-disruptor-black leading-none">
          CODE
        </span>
      </div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-start gap-8">
        
        {/* Sticker Badge */}
        <div className="bg-disruptor-white border-4 border-disruptor-black px-4 py-2 sticker-rotate-m2 neo-shadow">
          <span className="font-space uppercase font-bold text-sm tracking-tech text-disruptor-black">
            // REACT.JS / NODE.JS / PYTHON / MONGODB //
          </span>
        </div>

        {/* Massive Headline */}
        <h1 className="font-ranchers text-[80px] md:text-[130px] lg:text-[160px] leading-tight-heading text-disruptor-white uppercase" style={{ textShadow: '8px 8px 0 #000000' }}>
          FULL STACK<br />
          DEVELOPER
        </h1>

        {/* Subheadline */}
        <p className="font-jakarta text-2xl italic font-bold text-disruptor-black max-w-2xl border-l-4 border-disruptor-black pl-6">
          Building end-to-end web applications using React.js, Node.js, Python/Flask, and MongoDB. Skilled in designing REST APIs and implementing role-based access control.
        </p>

        {/* Brutalist Download Button */}
        <div className="mt-8">
          <a 
            href="/Abhinav_Sankar_F_Resume.pdf" 
            download="Abhinav_Sankar_Resume.pdf"
            className="inline-flex items-center gap-4 bg-disruptor-black text-disruptor-white px-10 py-6 font-ranchers text-3xl uppercase border-4 border-disruptor-black neo-shadow-hover hover:bg-disruptor-white hover:text-disruptor-black transition-colors duration-200 cursor-pointer"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            DOWNLOAD RESUME
          </a>
        </div>

      </div>
    </section>
  );
}
