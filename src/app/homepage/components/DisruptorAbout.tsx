"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Magnetic Button Wrapper
function MagneticButton({ children, href, className, isDownload }: any) {
  const ref = useRef<HTMLAnchorElement>(null);
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Magnetic pull strength
    springX.set(middleX * 0.3);
    springY.set(middleY * 0.3);
  };

  const reset = () => {
    springX.set(0);
    springY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={isDownload ? "Abhinav_Sankar_Resume.pdf" : undefined}
      target={isDownload ? undefined : "_blank"}
      rel={isDownload ? undefined : "noopener noreferrer"}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ x: springX, y: springY, display: 'inline-flex' }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// 3D Tilt Card Component
function TiltCard({ children, className }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200, display: 'block', height: '100%' }}
    >
      <motion.div 
        className={className}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', height: '100%' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Typewriter Text Reveal
function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => {
        if (!hasTriggered) {
          setIsTyping(true);
          setHasTriggered(true);
          let i = 0;
          const typingInterval = setInterval(() => {
            if (i < text.length) {
              setDisplayedText(text.substring(0, i + 1));
              i++;
            } else {
              clearInterval(typingInterval);
              setIsTyping(false);
            }
          }, 30);
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {displayedText}
      {isTyping && (
        <span className="inline-block w-[3px] h-[1.1em] bg-disruptor-black ml-1 align-middle animate-pulse" />
      )}
    </motion.div>
  );
}

export default function DisruptorAbout() {
  return (
    <section id="about" className="relative w-full bg-disruptor-white py-24 border-b-8 border-disruptor-black overflow-hidden">
      
      {/* Background SVG Grid pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Label */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex items-center gap-4 mb-20 border-b-4 border-disruptor-black pb-4"
        >
          <div className="w-4 h-4 bg-disruptor-black"></div>
          <h2 className="font-space font-bold uppercase text-xl tracking-tech text-disruptor-black">
            System // About
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Big Statement */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.h3 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, type: 'spring', damping: 15 }}
              className="font-ranchers text-[60px] md:text-[80px] leading-[0.9] text-disruptor-black uppercase mb-8"
            >
              MASTER OF <br />
              <span className="text-disruptor-volt text-outline-black" style={{ textShadow: '4px 4px 0 #000' }}>CLOUD & UI</span>
            </motion.h3>
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1, type: 'spring', damping: 15 }}
              className="font-space text-disruptor-black font-bold text-lg leading-relaxed max-w-md bg-disruptor-volt p-6 border-4 border-disruptor-black neo-shadow mb-8 min-h-[140px]"
            >
              <TypewriterText text="Based in Kerala, India. I am a Full Stack Developer and MCA student specializing in Cloud Computing, UI engineering, and building scalable backend systems." />
            </motion.div>

            {/* Social / Contact Links */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring', damping: 15 }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <MagneticButton 
                href="https://github.com/abhinavsankar27-bot" 
                className="px-6 py-3 bg-disruptor-black text-disruptor-white font-space uppercase font-bold text-sm tracking-widest border-4 border-disruptor-black hover:bg-disruptor-white hover:text-disruptor-black neo-shadow transition-colors duration-200 flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GITHUB
              </MagneticButton>
              <MagneticButton 
                href="https://www.linkedin.com/in/theabhinavsankar/" 
                className="px-6 py-3 bg-[#0A66C2] text-white font-space uppercase font-bold text-sm tracking-widest border-4 border-disruptor-black hover:bg-disruptor-white hover:text-[#0A66C2] neo-shadow transition-colors duration-200 flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LINKEDIN
              </MagneticButton>
              <MagneticButton 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=abhinavsankar27@gmail.com" 
                className="px-6 py-3 bg-disruptor-white text-disruptor-black font-space uppercase font-bold text-sm tracking-widest border-4 border-disruptor-black hover:bg-disruptor-black hover:text-disruptor-white neo-shadow transition-colors duration-200 flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                EMAIL
              </MagneticButton>
            </motion.div>
            
            {/* Download Resume Button */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3, type: 'spring', damping: 15 }}
              className="mt-8 inline-block"
            >
              <MagneticButton 
                href="/Abhinav_Sankar_Resume.pdf" 
                isDownload={true}
                className="items-center gap-4 bg-disruptor-volt text-disruptor-black px-10 py-6 font-ranchers text-3xl uppercase border-4 border-disruptor-black neo-shadow hover:bg-disruptor-black hover:text-disruptor-volt transition-colors duration-200"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                DOWNLOAD RESUME
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Details Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-12 lg:pt-0">
            
            {/* Education Block */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            >
              <TiltCard className="h-full bg-disruptor-black text-disruptor-white p-6 md:p-8 border-8 border-disruptor-black neo-shadow-white relative group">
                <motion.div style={{ translateZ: 20 }} className="h-full flex flex-col">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-disruptor-volt border-b-4 border-l-4 border-disruptor-black flex items-center justify-center -translate-y-8 translate-x-8 md:translate-y-0 md:translate-x-0 md:top-0 md:right-0">
                    <span className="font-space font-bold text-disruptor-black">01</span>
                  </div>
                  <h4 className="font-space font-bold text-disruptor-volt text-sm tracking-widest uppercase mb-4 mt-4 md:mt-0">
                    // Education
                  </h4>
                  <h5 className="font-ranchers text-2xl mb-1">LEAD COLLEGE</h5>
                  <p className="font-jakarta text-disruptor-white/80 font-bold mb-4 text-sm">
                    Master of Computer Applications (MCA)
                  </p>
                  <ul className="font-space text-xs flex flex-col gap-2 mb-8">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-disruptor-volt"></div>
                      Cloud Computing (Pursuing)
                    </li>
                  </ul>

                  <h5 className="font-ranchers text-2xl mb-1 mt-2">THARANANELLUR COLLEGE</h5>
                  <p className="font-jakarta text-disruptor-white/80 font-bold mb-4 text-sm">
                    Bachelor of Computer Applications (BCA)
                  </p>
                  <ul className="font-space text-xs flex flex-col gap-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-disruptor-volt"></div>
                      Graduated: 2025
                    </li>
                  </ul>
                </motion.div>
              </TiltCard>
            </motion.div>

            {/* Experience Block */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
            >
              <TiltCard className="h-full bg-disruptor-white border-8 border-disruptor-black p-6 md:p-8 neo-shadow relative group">
                <motion.div style={{ translateZ: 20 }} className="h-full flex flex-col">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-disruptor-black border-b-4 border-l-4 border-disruptor-black flex items-center justify-center -translate-y-8 translate-x-8 md:translate-y-0 md:translate-x-0 md:top-0 md:right-0">
                    <span className="font-space font-bold text-disruptor-volt">02</span>
                  </div>
                  <h4 className="font-space font-bold text-disruptor-black text-sm tracking-widest uppercase mb-4 mt-4 md:mt-0">
                    // Experience
                  </h4>
                  
                  {/* Role 1 */}
                  <div className="mb-8">
                    <h5 className="font-ranchers text-2xl mb-1 text-disruptor-black">GETWORK.AI</h5>
                    <p className="font-jakarta text-disruptor-black/80 font-bold mb-2 text-sm">
                      Vibe Coding Hackathon 2025
                    </p>
                    <ul className="font-space text-xs flex flex-col gap-2 text-disruptor-black">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-disruptor-black mt-1 min-w-[6px]"></div>
                        Built & deployed an AI-powered Full Stack App under strict constraints.
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-disruptor-black mt-1 min-w-[6px]"></div>
                        Rapid prototyping & API integrations.
                      </li>
                    </ul>
                  </div>

                  {/* Role 2 */}
                  <div className="mt-2">
                    <h5 className="font-ranchers text-2xl mb-1 text-disruptor-black">ZOMATHON</h5>
                    <p className="font-jakarta text-disruptor-black/80 font-bold mb-2 text-sm">
                      Coding Ninjas x Zomato Data Hackathon
                    </p>
                    <ul className="font-space text-xs flex flex-col gap-2 text-disruptor-black">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-disruptor-black mt-1 min-w-[6px]"></div>
                        Applied analytical thinking & problem-solving to real-world data challenges.
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
