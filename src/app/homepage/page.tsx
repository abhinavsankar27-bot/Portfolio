'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import AboutSkillsSection from './components/AboutSkillsSection';
import ProjectsSection from './components/ProjectsSection';
import CredentialsSection from './components/CredentialsSection';
import ContactSection from './components/ContactSection';
import LoadingScreen from './components/LoadingScreen';
import ShaderBackground from './components/ShaderBackground';
import AdvancedCursor from './components/AdvancedCursor';
import ThreeEnvironment from './components/ThreeEnvironment';
import SectionTransition from './components/SectionTransition';
import { soundEngine } from '@/utils/soundEngine';

const SECTIONS = [
  { id: 'about', label: 'ABOUT & SKILLS', index: 0 },
  { id: 'projects', label: 'PROJECTS', index: 1 },
  { id: 'credentials', label: 'CREDENTIALS', index: 2 },
  { id: 'contact', label: 'CONTACT', index: 3 },
];

export default function Homepage() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleLoadComplete = async () => {
    setLoading(false);
    // Init Lenis smooth scroll after loading
    const { default: Lenis } = await import('lenis');
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Magnetic buttons
    const magneticEls = document.querySelectorAll<HTMLElement>('.magnetic-btn');
    magneticEls.forEach((el) => {
      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const dist = Math.sqrt(x * x + y * y);
        const maxDist = Math.max(rect.width, rect.height) * 0.8;
        if (dist < maxDist) {
          const strength = (maxDist - dist) / maxDist;
          gsap.to(el, { x: x * 0.35 * strength, y: y * 0.25 * strength, duration: 0.4, ease: 'power3.out' });
        }
      };
      const handleLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
      };
      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseleave', handleLeave);
    });

    // Cinematic section reveal animations
    const sections = document.querySelectorAll<HTMLElement>('.cinematic-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, scale: 0.98, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  };

  useEffect(() => {
    const initAudio = () => {
      soundEngine.init();
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
    window.addEventListener('click', initAudio);
    window.addEventListener('keydown', initAudio);
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);

  return (
    <>
      {/* Advanced cursor — desktop only */}
      <AdvancedCursor />

      {/* Loading screen */}
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* GLSL shader background */}
      <ShaderBackground />

      {/* Three.js 3D environment */}
      {!loading && <ThreeEnvironment />}

      <main
        ref={mainRef}
        className="relative min-h-screen"
        style={{ background: 'transparent', color: '#FFFFFF' }}
      >
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        <Header />

        <h1 className="sr-only">
          Abhinav Sankar — Cloud and AI Systems Engineer building scalable backend and ML applications
        </h1>

        <HeroSection />

        {/* Sections with cinematic transitions */}
        {SECTIONS.map((s) => (
          <div key={s.id} className="cinematic-section" style={{ position: 'relative', opacity: 0 }}>
            <SectionTransition sectionId={s.id} label={s.label} index={s.index} />
            {s.id === 'about' && <AboutSkillsSection />}
            {s.id === 'projects' && <ProjectsSection />}
            {s.id === 'credentials' && <CredentialsSection />}
            {s.id === 'contact' && <ContactSection />}
          </div>
        ))}

        <Footer />
      </main>
    </>
  );
}