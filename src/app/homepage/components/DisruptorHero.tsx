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
        <h1 className="font-ranchers text-[50px] sm:text-[80px] md:text-[130px] lg:text-[160px] leading-tight-heading text-disruptor-white uppercase" style={{ textShadow: '8px 8px 0 #000000' }}>
          FULL STACK<br />
          DEVELOPER
        </h1>

        {/* Subheadline */}
        <p className="font-jakarta text-2xl italic font-bold text-disruptor-black max-w-2xl border-l-4 border-disruptor-black pl-6">
          Building end-to-end web applications using React.js, Node.js, Python/Flask, and MongoDB. Skilled in designing REST APIs and implementing role-based access control.
        </p>



      </div>
    </section>
  );
}
