'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Canvas particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
      color: string; pulse: number;
    }

    const PARTICLE_COUNT = 100;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.35 + 0.05,
      color: Math.random() > 0.88 ? '#00FF94' : '#FFFFFF',
      pulse: Math.random() * Math.PI * 2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Mouse repulsion
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 0) {
          const force = (130 - dist) / 130;
          p.vx -= (dx / dist) * force * 0.4;
          p.vy -= (dy / dist) * force * 0.4;
        }

        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulsedOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color === '#00FF94'
          ? `rgba(0,255,148,${pulsedOpacity})`
          : `rgba(255,255,255,${pulsedOpacity})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 85) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,255,148,${(1 - d / 85) * 0.05})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Glow follows cursor
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    let glowX = window.innerWidth / 2;
    let glowY = window.innerHeight / 2;
    let targetX = glowX;
    let targetY = glowY;
    let rafId: number;

    const move = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      glowX += (targetX - glowX) * 0.06;
      glowY += (targetY - glowY) * 0.06;
      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;
      rafId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Magnetic effect on headline
  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = headline.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / rect.width;
      const dy = (e.clientY - centerY) / rect.height;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 0.8) {
        const strength = (0.8 - dist) / 0.8;
        headline.style.transform = `translate(${dx * 12 * strength}px, ${dy * 8 * strength}px)`;
      } else {
        headline.style.transform = 'translate(0,0)';
      }
    };

    headline.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP hero reveal — blur to sharp stagger
  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');

      const tl = gsap.timeline({ delay: 0.2 });

      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out' }
        );
      }

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.hero-line');
        tl.fromTo(
          lines,
          { y: 100, opacity: 0, filter: 'blur(16px)', skewY: 3 },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            skewY: 0,
            duration: 1.5,
            stagger: 0.15,
            ease: 'expo.out',
          },
          '-=0.3'
        );
      }

      if (subtextRef.current) {
        tl.fromTo(
          subtextRef.current,
          { y: 30, opacity: 0, filter: 'blur(6px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' },
          '-=0.7'
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: 'expo.out' },
          '-=0.6'
        );
      }

      if (statsRef.current) {
        tl.fromTo(
          statsRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
          '-=0.5'
        );
      }

      if (scrollRef.current) {
        tl.fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      }
    };

    initGSAP();
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const initParallax = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      if (subtextRef.current) {
        gsap.to(subtextRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    };

    initParallax();
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: '120px' }}
    >
      {/* Canvas particle system */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Cursor glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(0,255,148,0.07) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 2,
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      {/* Background gradient orbs */}
      <div
        aria-hidden="true"
        className="glow-orb"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(0,255,148,0.04) 0%, transparent 70%)',
          top: '10%',
          right: '-20%',
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        className="glow-orb"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(60,60,180,0.08) 0%, transparent 70%)',
          bottom: '10%',
          left: '-10%',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Label */}
        <div ref={labelRef} className="mb-8" style={{ opacity: 0 }}>
          <span className="section-label">
            <span className="inline-block w-6 h-px bg-accent mr-3 align-middle" />
            MCA · CLOUD COMPUTING · GAME DEVELOPMENT
          </span>
        </div>

        {/* Headline */}
        <div
          ref={headlineRef}
          className="mb-8 overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          <div className="hero-line hero-headline text-white leading-none" style={{ opacity: 0 }}>
            I BUILD SCALABLE
          </div>
          <div className="hero-line hero-headline flex flex-wrap items-baseline gap-x-4" style={{ opacity: 0 }}>
            <span 
              style={{ 
                backgroundImage: 'linear-gradient(135deg, #00B8FF 0%, #00FF94 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              CLOUD
            </span>
            <span className="text-white">&amp;</span>
            <span 
              style={{ 
                backgroundImage: 'linear-gradient(135deg, #B200FF 0%, #00FFF0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0px 0px 15px rgba(178,0,255,0.4))'
              }}
            >
              GAME
            </span>
          </div>
          <div className="hero-line hero-headline text-white leading-none" style={{ opacity: 0 }}>
            SYSTEMS
          </div>
        </div>

        {/* Subtext */}
        <div ref={subtextRef} className="mb-12" style={{ opacity: 0 }}>
          <p
            className="font-mono text-sm tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Cloud
            <span className="mx-3" style={{ color: 'rgba(0,255,148,0.4)' }}>·</span>
            Game Development
            <span className="mx-3" style={{ color: 'rgba(0,255,148,0.4)' }}>·</span>
            Backend Systems
          </p>
        </div>

        {/* CTA row */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-6">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            data-cursor-view="VIEW"
            className="magnetic-btn inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold text-sm tracking-wide text-bg"
            style={{ background: '#00FF94', opacity: 0 }}
          >
            Explore Projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="mailto:abhinavsankar27@gmail.com"
            data-hover
            className="magnetic-btn inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-medium text-sm tracking-wide border"
            style={{
              borderColor: 'rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)',
              opacity: 0,
            }}
          >
            Let’s Build Something
          </a>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="mt-20 pt-10 grid grid-cols-3 gap-8 max-w-sm"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { num: '5+', label: 'Projects Built' },
            { num: '3+', label: 'Certifications' },
            { num: '2025', label: 'Hackathon' },
          ].map((stat) => (
            <div key={stat.label} style={{ opacity: 0 }}>
              <p className="font-display font-black text-2xl text-white">{stat.num}</p>
              <p className="font-mono text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 cursor-pointer"
        style={{ opacity: 0 }}
        onClick={scrollToAbout}
        aria-label="Scroll down"
      >
        <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Scroll
        </span>
        <div className="w-px h-12 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '40%',
              background: 'linear-gradient(180deg, #00FF94, transparent)',
              animation: 'scrollBounce 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Location tag */}
      <div
        className="absolute bottom-10 right-6 z-10 hidden md:flex items-center gap-2"
        style={{ color: 'rgba(255,255,255,0.2)' }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <circle cx="6" cy="5" r="2" stroke="currentColor" strokeWidth="1" />
          <path d="M6 1C3.79 1 2 2.79 2 5c0 3 4 7 4 7s4-4 4-7c0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        <span className="font-mono text-xs tracking-widest uppercase">Thrissur, Kerala</span>
      </div>
    </section>
  );
}