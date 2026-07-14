"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const achievements = [
  {
    id: 1,
    text: "DEVELOPED AND DEPLOYED AN AI-POWERED FULL STACK APPLICATION UNDER STRICT PROJECT TIMELINES.",
    author: "VIBE HACKATHON 2025",
    rotate: "sticker-rotate-p2"
  },
  {
    id: 2,
    text: "APPLIED ANALYTICAL THINKING & COLLABORATIVE PROBLEM-SOLVING TO REAL-WORLD DATA CHALLENGES.",
    author: "ZOMATHON HACKATHON",
    rotate: "sticker-rotate-m2"
  },
  {
    id: 3,
    text: "INTERNSHIP: DESIGNED AND DEVELOPED EVENTBOOK, A MODERN FULL-STACK EVENT BOOKING PLATFORM.",
    author: "TCS iON / APR '26 - MAY '26",
    rotate: "sticker-rotate-p1"
  },
  {
    id: 4,
    text: "MAINTAINS AN ACTIVE GITHUB PORTFOLIO WITH 6+ FULL-STACK PROJECTS SHOWCASING CLEAN CODE PRACTICES.",
    author: "OPEN SOURCE / GITHUB",
    rotate: "sticker-rotate-m1"
  }
];

export default function DisruptorSocialProof() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="w-full bg-disruptor-white border-b-8 border-disruptor-black py-24 overflow-hidden relative cursor-grab active:cursor-grabbing">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Label */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex items-center gap-4 mb-16 border-b-4 border-disruptor-black pb-4"
        >
          <div className="w-4 h-4 bg-disruptor-volt border-2 border-disruptor-black"></div>
          <h2 className="font-space font-bold uppercase text-xl tracking-tech text-disruptor-black pointer-events-none">
            System Output // Validation & Achievements
          </h2>
        </motion.div>

        {/* Sticker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {achievements.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', damping: 12 }}
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
              drag
              dragConstraints={containerRef}
              whileDrag={{ scale: 1.05, rotate: 0, zIndex: 50, boxShadow: "16px 16px 0px 0px #000000" }}
              className={`bg-disruptor-volt border-4 border-disruptor-black p-6 ${item.rotate} neo-shadow flex flex-col justify-between cursor-grab active:cursor-grabbing`}
            >
              <p className="font-space font-bold text-base md:text-sm lg:text-base leading-relaxed text-disruptor-black uppercase tracking-wider mb-8 pointer-events-none">
                "{item.text}"
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t-2 border-disruptor-black pointer-events-none">
                <div className="w-10 h-10 bg-disruptor-black flex items-center justify-center shrink-0">
                  <span className="font-ranchers text-disruptor-white text-lg">
                    {item.author.charAt(0)}
                  </span>
                </div>
                <span className="font-space font-bold text-xs tracking-tech text-disruptor-black">
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
