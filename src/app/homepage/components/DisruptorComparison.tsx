"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const skills = [
  {
    id: 1,
    labelCat: "CORE DOMAIN",
    titleCat: "FRONTEND",
    labelTech: "TECH STACK",
    titleTech: "REACT / NEXT",
    subSkills: ["TAILWIND", "HTML5", "CSS3", "FIGMA", "UI/UX", "WCAG"]
  },
  {
    id: 2,
    labelCat: "CORE DOMAIN",
    titleCat: "BACKEND",
    labelTech: "TECH STACK",
    titleTech: "NODE / PYTHON",
    subSkills: ["EXPRESS", "FLASK", "REST API", "RBAC", "OOP", "SDLC"]
  },
  {
    id: 3,
    labelCat: "CORE DOMAIN",
    titleCat: "DATABASES",
    labelTech: "TECH STACK",
    titleTech: "MONGO / MYSQL",
    subSkills: ["RABBITMQ", "JSON", "POSTMAN"]
  },
  {
    id: 4,
    labelCat: "CORE DOMAIN",
    titleCat: "CLOUD OPS",
    labelTech: "TECH STACK",
    titleTech: "AWS / DOCKER",
    subSkills: ["EC2", "S3", "LAMBDA", "VERCEL", "NETLIFY", "CI/CD"]
  },
  {
    id: 5,
    labelCat: "CORE DOMAIN",
    titleCat: "GAME & AI",
    labelTech: "TECH STACK",
    titleTech: "UNITY / ML",
    subSkills: ["UNREAL ENGINE 5", "BLENDER", "MACHINE LEARNING", "QA"]
  }
];

// Reusable component for the 3D Tilt text
function TiltText({ children, className, style }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);

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
      style={{ perspective: 1200, display: 'inline-block' }}
    >
      <motion.h3 
        className={className}
        style={{ ...style, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <motion.span style={{ translateZ: 50, display: 'inline-block' }}>
          {children}
        </motion.span>
      </motion.h3>
    </motion.div>
  );
}

// Interactive Physics Pill for Sub-skills
function PhysicsPill({ text, containerRef, index }: { text: string, containerRef: React.RefObject<HTMLDivElement>, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const delay = index * 0.1;

  // Add random physics modifiers
  const rotation = (index % 2 === 0 ? 1 : -1) * (Math.random() * 10 + 5);

  return (
    <motion.div
      ref={ref}
      drag
      dragConstraints={containerRef}
      dragElastic={0.6}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay }}
      whileHover={{ scale: 1.15, zIndex: 50, rotate: rotation }}
      whileDrag={{ scale: 1.25, zIndex: 100, rotate: 0 }}
      className="inline-block bg-disruptor-black text-disruptor-white border-2 border-disruptor-black font-space font-bold text-xs md:text-sm px-4 py-2 uppercase tracking-widest cursor-grab active:cursor-grabbing neo-shadow-white relative"
    >
      {text}
    </motion.div>
  );
}

export default function DisruptorComparison() {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section id="skills" className="w-full border-b-8 border-disruptor-black overflow-hidden relative">
      {skills.map((row, index) => (
        <div key={row.id} className={`flex flex-col md:flex-row w-full ${index !== skills.length - 1 ? 'border-b-4 border-disruptor-black' : ''}`}>
          
          {/* Category (Left) - Heavy Scroll Reveal */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
            className="flex-1 bg-disruptor-black p-12 md:p-24 border-b-4 md:border-b-0 md:border-r-4 border-disruptor-black flex flex-col justify-center overflow-hidden relative"
          >
            {/* Huge faint background text for depth */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
              <span className="font-ranchers text-[20vw] leading-none whitespace-nowrap">
                {row.titleCat}
              </span>
            </div>

            <span className="font-space uppercase font-bold text-sm tracking-tech text-disruptor-white mb-4 relative z-10">
              {row.labelCat}
            </span>
            <TiltText className="font-ranchers text-[60px] md:text-[80px] text-disruptor-white leading-tight-heading uppercase relative z-10">
              {row.titleCat}
            </TiltText>
          </motion.div>

          {/* Tech Stack (Right) - Heavy Scroll Reveal with Physics Pills */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
            className="flex-1 bg-disruptor-volt p-12 md:p-24 flex flex-col justify-center relative overflow-hidden"
            ref={(el) => { containerRefs.current[index] = el }}
          >

            <div className="relative z-10 mb-8 pointer-events-none select-none">
              <span className="font-space uppercase font-bold text-sm tracking-tech text-disruptor-black mb-4 block">
                {row.labelTech}
              </span>
              <TiltText 
                className="font-ranchers text-[50px] md:text-[70px] text-disruptor-black leading-tight-heading uppercase" 
                style={{ textShadow: '6px 6px 0 #FFFFFF' }}
              >
                {row.titleTech}
              </TiltText>
            </div>

            {/* Draggable Physics Sub-skills */}
            <div className="flex flex-wrap gap-4 relative z-20">
              {row.subSkills.map((subSkill, subIndex) => (
                <PhysicsPill 
                  key={subSkill} 
                  text={subSkill} 
                  index={subIndex} 
                  containerRef={{ current: containerRefs.current[index] }}
                />
              ))}
            </div>

          </motion.div>
        </div>
      ))}
    </section>
  );
}
