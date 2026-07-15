"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Magnetic Button Wrapper
function MagneticButton({ children, onClick, className }: any) {
  const ref = useRef<HTMLButtonElement>(null);
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
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
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
      style={{ perspective: 1200 }}
      className="w-full max-w-4xl mb-20 relative z-10"
    >
      <motion.div 
        className={className}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function DisruptorTimerForm() {
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [hex, setHex] = useState('');
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const terminalLines = [
    "> SYSTEM BOOT SEQUENCE INITIATED...",
    "> ALLOCATING CLOUD INFRASTRUCTURE... [AWS OK]",
    "> INITIALIZING AI MODELS... [TENSORFLOW OK]",
    "> ESTABLISHING BACKEND SERVICES... [FLASK OK]",
    "> STATUS: 100% OPERATIONAL & OPTIMIZED.",
    "> AWAITING NEW COLLABORATIVE DIRECTIVES..."
  ];

  // Hex data stream effect
  useEffect(() => {
    const interval = setInterval(() => {
      let newHex = '';
      for (let i = 0; i < 6; i++) {
        newHex += Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0') + '\n';
      }
      setHex(newHex);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (lineIndex < terminalLines.length) {
      if (charIndex < terminalLines[lineIndex].length) {
        const timeout = setTimeout(() => {
          setText(prev => prev + terminalLines[lineIndex][charIndex]);
          setCharIndex(c => c + 1);
        }, Math.random() * 30 + 20); // Random typing speed
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setText(prev => prev + "\n");
          setLineIndex(l => l + 1);
          setCharIndex(0);
        }, 500); // Pause at end of line
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setText('');
        setLineIndex(0);
        setCharIndex(0);
      }, 6000); // Wait 6 seconds before looping
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, charIndex]);

  const handleContact = async () => {
    if (!email) {
      alert("PLEASE ENTER YOUR EMAIL FIRST.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("PLEASE ENTER A VALID EMAIL ADDRESS.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          email: email,
          subject: "New Portfolio Inquiry from " + email,
          message: `Someone is reaching out from your portfolio!

Their Email: ${email}

They clicked the "SEND IT" button in the contact section. Please reach out to them!`,
          from_name: "Portfolio Brutalist System",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
        console.error(result);
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="w-full bg-disruptor-volt border-y-8 border-disruptor-black py-32 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-disruptor-black rounded-full mix-blend-overlay opacity-10 blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-disruptor-white border-4 border-disruptor-black rotate-12 opacity-30"></div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="text-center mb-16 relative z-10 flex flex-col items-center"
      >
        <h2 className="font-ranchers text-[70px] md:text-[100px] text-disruptor-black uppercase leading-none mb-6 hover:scale-105 transition-transform duration-300" style={{ textShadow: '6px 6px 0 #FFFFFF' }}>
          HIRE ME NOW
        </h2>
        <div className="bg-disruptor-black text-disruptor-volt px-6 py-3 border-2 border-disruptor-white transform -rotate-3 hover:rotate-0 transition-transform duration-300 shadow-[8px_8px_0_0_#FFFFFF]">
          <p className="font-space font-bold uppercase tracking-widest md:text-lg">
            // OPEN FOR NEW OPPORTUNITIES //
          </p>
        </div>
      </motion.div>

      {/* Advanced Terminal Component */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
        className="w-full flex justify-center"
      >
        <TiltCard className="w-full bg-disruptor-black border-4 border-disruptor-white p-6 md:p-8 relative z-10 shadow-[12px_12px_0_0_rgba(255,255,255,1)] hover:shadow-[16px_16px_0_0_rgba(255,255,255,1)] transition-shadow duration-300 group">
          <motion.div style={{ translateZ: 20 }}>
            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 pointer-events-none opacity-30"></div>
            
            {/* Terminal Header */}
            <div className="flex justify-between items-center border-b-2 border-disruptor-white/30 pb-4 mb-6 relative z-20">
              <span className="font-space text-disruptor-white text-sm md:text-base tracking-widest uppercase font-bold">
                root@abhinav-system:~
              </span>
              <div className="flex gap-2">
                <div className="w-4 h-4 border-2 border-disruptor-white bg-red-500 animate-pulse"></div>
                <div className="w-4 h-4 border-2 border-disruptor-white bg-yellow-400"></div>
                <div className="w-4 h-4 border-2 border-disruptor-white bg-green-500"></div>
              </div>
            </div>

            {/* Terminal Body & Data Stream */}
            <div className="flex justify-between gap-6 relative z-20">
              <div className="font-space text-disruptor-volt whitespace-pre-wrap min-h-[160px] text-base md:text-xl leading-relaxed flex-1 font-bold">
                {text}
                <span className="animate-pulse bg-disruptor-volt text-disruptor-black inline-block w-3 md:w-4 h-6 md:h-7 align-middle ml-2"></span>
              </div>
              
              <div className="hidden md:block font-space text-sm text-disruptor-white/40 whitespace-pre-wrap text-right border-l-2 border-disruptor-white/30 pl-6 leading-relaxed">
                {hex}
              </div>
            </div>
          </motion.div>
        </TiltCard>
      </motion.div>

      {/* Integrated Contact Form */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.4, type: 'spring' }}
        className="w-full max-w-3xl bg-disruptor-white border-4 border-disruptor-black flex flex-col sm:flex-row hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] transition-shadow duration-300 relative z-10"
      >
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER_YOUR_EMAIL_FOR_RESUME..." 
          disabled={isSubmitting || submitStatus === 'success'}
          className="flex-1 bg-transparent px-6 py-8 font-space text-disruptor-black placeholder:text-disruptor-black/50 focus:outline-none tracking-tech font-bold text-sm sm:text-lg border-b-4 sm:border-b-0 sm:border-r-4 border-disruptor-black focus:bg-gray-100 transition-colors disabled:opacity-50"
        />
        <MagneticButton 
          onClick={handleContact}
          disabled={isSubmitting}
          className={`px-10 py-8 font-ranchers text-3xl md:text-4xl uppercase transition-colors duration-200 flex items-center justify-center gap-3 group border-0 outline-none
            ${submitStatus === 'success' ? 'bg-green-500 text-disruptor-black' : 
              submitStatus === 'error' ? 'bg-red-500 text-disruptor-white' : 
              'bg-disruptor-black text-disruptor-volt hover:bg-disruptor-volt hover:text-disruptor-black'}`}
        >
          {isSubmitting ? (
            <span className="animate-pulse">SENDING...</span>
          ) : submitStatus === 'success' ? (
            <span>SENT!</span>
          ) : submitStatus === 'error' ? (
            <span>FAILED</span>
          ) : (
            <>
              <span>SEND IT</span>
              <span className="group-hover:translate-x-2 transition-transform duration-200">&rarr;</span>
            </>
          )}
        </MagneticButton>
      </motion.div>

    </section>
  );
}
