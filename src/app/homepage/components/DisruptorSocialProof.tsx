'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const achievements = [
  {
    id: 1,
    text: "VIBE CODING HACKATHON: BUILT AND DEPLOYED A FULL-STACK AI APPLICATION UNDER COMPETITION CONSTRAINTS.",
    author: "GETWORK.AI / 2025",
    rotate: "sticker-rotate-p2"
  },
  {
    id: 2,
    text: "PUBLISHED 6+ FULL-STACK PROJECTS ON GITHUB WITH CONSISTENT VERSION CONTROL AND CLEAN CODE.",
    author: "GITHUB PORTFOLIO",
    rotate: "sticker-rotate-m2"
  },
  {
    id: 3,
    text: "MASTER OF COMPUTER APPLICATIONS (MCA) — CLOUD COMPUTING. IN PROGRESS.",
    author: "LEAD COLLEGE",
    rotate: "sticker-rotate-p2"
  }
];

export default function DisruptorSocialProof() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="w-full bg-disruptor-white border-b-8 border-disruptor-black py-24 overflow-hidden relative cursor-grab active:cursor-grabbing">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16 border-b-4 border-disruptor-black pb-4">
          <div className="w-4 h-4 bg-disruptor-volt border-2 border-disruptor-black"></div>
          <h2 className="font-space font-bold uppercase text-xl tracking-tech text-disruptor-black pointer-events-none">
            System Output // Validation & Achievements
          </h2>
        </div>

        {/* Sticker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {achievements.map((item) => (
            <motion.div 
              key={item.id}
              drag
              dragConstraints={containerRef}
              whileDrag={{ scale: 1.05, rotate: 0, zIndex: 50, boxShadow: "16px 16px 0px 0px #000000" }}
              className={`bg-disruptor-volt border-4 border-disruptor-black p-6 ${item.rotate} neo-shadow flex flex-col justify-between cursor-grab active:cursor-grabbing`}
            >
              <p className="font-space font-bold text-lg leading-relaxed text-disruptor-black uppercase tracking-wider mb-8 pointer-events-none">
                "{item.text}"
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t-2 border-disruptor-black pointer-events-none">
                <div className="w-12 h-12 bg-disruptor-black flex items-center justify-center">
                  <span className="font-ranchers text-disruptor-white text-xl">
                    {item.author.charAt(0)}
                  </span>
                </div>
                <span className="font-space font-bold text-sm tracking-tech text-disruptor-black">
                  {item.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
