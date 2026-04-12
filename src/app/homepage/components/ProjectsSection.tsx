'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';
import { soundEngine } from '@/utils/soundEngine';

interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  story: {
    chapter: string;
    title: string;
    content: string;
  }[];
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  image: string;
  imageAlt: string;
  year: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 'healthqueue',
    number: '01',
    title: 'HealthQueue',
    subtitle: 'Healthcare Queue & Appointment System',
    description: 'A healthcare queue and appointment system built using Python and Flask with real-time scheduling. Improves patient flow and reduces waiting time significantly.',
    story: [
      {
        chapter: 'Chapter I — The Problem',
        title: 'Chaos in the Waiting Room',
        content: 'Healthcare facilities across India struggle with inefficient patient queuing. Long wait times, missed appointments, and poor patient experience were costing clinics both revenue and trust. The system was broken — and it was hurting people.',
      },
      {
        chapter: 'Chapter II — The Build',
        title: 'Engineering the Solution',
        content: 'Built a real-time queue management system using Python and Flask. REST APIs handle live scheduling, automated notifications keep patients informed, and a clean dashboard gives staff full visibility. Every component was designed for reliability under pressure.',
      },
      {
        chapter: 'Chapter III — The Impact',
        title: 'Results That Matter',
        content: 'Average patient wait time reduced by 40%. Appointment scheduling efficiency improved across multiple clinic workflows. Staff reported significantly less administrative overhead. The system proved that clean architecture solves real human problems.',
      },
    ],
    problem: 'Healthcare facilities struggle with inefficient patient queuing, leading to long wait times and poor patient experience.',
    solution: 'Built a real-time queue management system using Python, Flask, and REST APIs with live scheduling and automated notifications.',
    result: 'Reduced average patient wait time by 40% and improved appointment scheduling efficiency across multiple clinic workflows.',
    tags: ['Python', 'Flask', 'REST API', 'Real-time', 'SQL'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_13aa9211e-1772148515180.png',
    imageAlt: 'Medical clinic interior with modern digital scheduling display, clean white walls, soft ambient lighting, bright healthcare environment',
    year: '2024',
  },
  {
    id: 'flightpredictor',
    number: '02',
    title: 'Flight Price Predictor',
    subtitle: 'ML-Powered Fare Estimation',
    description: 'A machine learning web application that predicts airline ticket prices using travel parameters, helping users make cost-effective booking decisions.',
    story: [
      {
        chapter: 'Chapter I — The Problem',
        title: 'The Unpredictable Sky',
        content: 'Airline ticket prices fluctuate wildly — sometimes changing hundreds of rupees within hours. Travelers had no reliable way to know when to book, often overpaying or missing optimal windows entirely. Data existed, but no one was using it intelligently.',
      },
      {
        chapter: 'Chapter II — The Build',
        title: 'Training the Machine',
        content: 'Trained a machine learning model on historical flight data using Scikit-learn. Feature engineering extracted meaningful signals from routes, timing, and seasonality. The model was deployed via Flask with an interactive web interface that made predictions accessible to anyone.',
      },
      {
        chapter: 'Chapter III — The Impact',
        title: 'Smarter Decisions',
        content: 'Achieved 87% prediction accuracy on test data. Users could identify optimal booking windows and make data-driven decisions. The project demonstrated that machine learning, applied thoughtfully, creates genuine value for everyday problems.',
      },
    ],
    problem: 'Airline ticket prices fluctuate unpredictably, making it difficult for travelers to book at the optimal time.',
    solution: 'Trained a machine learning model on historical flight data using Scikit-learn, deployed via Flask with an interactive web interface.',
    result: 'Achieved 87% prediction accuracy on test data, helping users identify the best booking windows and save on travel costs.',
    tags: ['Python', 'Machine Learning', 'Flask', 'Data Science', 'Scikit-learn'],
    image: 'https://images.unsplash.com/photo-1512162940654-a2b6874174d3',
    imageAlt: 'Aerial view of airplane wing above clouds at sunset, warm orange and blue sky gradient, serene atmospheric perspective',
    year: '2024',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [chapterText, setChapterText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imageParallaxRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
          }
        );
      }

      const rows = document.querySelectorAll('.project-row');
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { y: 60, opacity: 0, x: i % 2 === 0 ? -20 : 20 },
          {
            y: 0, opacity: 1, x: 0, duration: 1.1, ease: 'power3.out', delay: i * 0.15,
            scrollTrigger: { trigger: row, start: 'top 82%' },
          }
        );
      });
    };

    initAnimations();
  }, []);

  // Smooth cursor-following preview
  useEffect(() => {
    let previewX = 0, previewY = 0;
    let targetX = 0, targetY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      previewX += (targetX - previewX) * 0.12;
      previewY += (targetY - previewY) * 0.12;
      setPreviewPos({ x: previewX, y: previewY });
      rafId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Typewriter effect for story chapters
  const typeChapter = useCallback((text: string) => {
    setChapterText('');
    setIsTyping(true);
    let i = 0;
    const speed = 18;

    const type = () => {
      if (i < text.length) {
        setChapterText(text.slice(0, i + 1));
        i++;
        typewriterRef.current = setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };
    type();
  }, []);

  // When chapter changes, typewrite the content
  useEffect(() => {
    if (!activeProject || !overlayVisible) return;
    if (typewriterRef.current) clearTimeout(typewriterRef.current);
    typeChapter(activeProject.story[activeChapter].content);
  }, [activeChapter, activeProject, overlayVisible, typeChapter]);

  // Image parallax inside overlay
  useEffect(() => {
    if (!overlayVisible) return;
    const img = imageParallaxRef.current;
    if (!img) return;

    const handleMove = (e: MouseEvent) => {
      const rect = img.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      img.style.transform = `scale(1.08) translate(${dx * 12}px, ${dy * 8}px)`;
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [overlayVisible]);

  // Open project overlay
  const openProject = async (project: Project) => {
    soundEngine.playSwooshSound();
    setActiveProject(project);
    setActiveChapter(0);
    setOverlayVisible(true);
    document.body.style.overflow = 'hidden';

    const { gsap } = await import('gsap');
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { yPercent: 100, clipPath: 'inset(0 0 100% 0)' },
        { yPercent: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0, ease: 'expo.inOut' }
      );
    }

    if (overlayContentRef.current) {
      const items = overlayContentRef.current.querySelectorAll('.overlay-reveal');
      gsap.fromTo(
        items,
        { y: 60, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.6 }
      );
    }
  };

  // Navigate chapters
  const goToChapter = async (idx: number) => {
    if (!activeProject || idx === activeChapter) return;
    const { gsap } = await import('gsap');
    const storyEl = document.querySelector('.story-content');
    if (storyEl) {
      await gsap.to(storyEl, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
      setActiveChapter(idx);
      gsap.fromTo(storyEl, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    } else {
      setActiveChapter(idx);
    }
  };

  // Close project overlay
  const closeProject = async () => {
    const { gsap } = await import('gsap');
    if (typewriterRef.current) clearTimeout(typewriterRef.current);
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        yPercent: 100,
        duration: 0.8,
        ease: 'expo.inOut',
        onComplete: () => {
          setOverlayVisible(false);
          setActiveProject(null);
          setActiveChapter(0);
          setChapterText('');
          document.body.style.overflow = '';
        },
      });
    }
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && overlayVisible) closeProject();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [overlayVisible]);

  const chapterColors = ['#FF6B6B', '#00FF94', '#7C8FFF'];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6"
      style={{ background: '#0F0F18' }}
    >
      <div className="section-divider mb-20 max-w-7xl mx-auto" />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-20">
          <span className="section-label block mb-6">
            <span className="inline-block w-6 h-px bg-accent mr-3 align-middle" />
            Selected Projects
          </span>
          <h2
            className="font-display font-black uppercase text-white"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: '0.92', letterSpacing: '-0.04em' }}
          >
            Real Work.
            <br />
            <span className="gradient-text">Real Impact.</span>
          </h2>
        </div>

        {/* Projects list */}
        <div className="space-y-1">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-row group relative transition-all duration-500"
              style={{
                filter: activePreview && activePreview !== project.id ? 'blur(4px)' : 'none',
                opacity: activePreview && activePreview !== project.id ? 0.3 : 1,
              }}
              onMouseEnter={() => setActivePreview(project.id)}
              onMouseLeave={() => setActivePreview(null)}
            >
              <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div
                className="flex flex-col md:flex-row md:items-center gap-6 py-10 px-2 transition-all duration-500 rounded-xl hover:px-6 cursor-pointer"
                onClick={() => openProject(project)}
                data-cursor-view="VIEW"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openProject(project)}
                aria-label={`View ${project.title} project story`}
              >
                {/* Number */}
                <span
                  className="font-mono text-xs font-bold shrink-0"
                  style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}
                >
                  {project.number}
                </span>

                {/* Title block */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-display font-black uppercase text-white group-hover:text-accent transition-colors duration-300"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', lineHeight: '1', letterSpacing: '-0.02em' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="font-display text-sm mt-2 max-w-lg"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:max-w-xs">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(0,255,148,0.06)',
                        border: '1px solid rgba(0,255,148,0.15)',
                        color: 'rgba(0,255,148,0.7)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Year + Arrow */}
                <div className="flex items-center gap-6 shrink-0">
                  <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    {project.year}
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:bg-accent group-hover:border-accent"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <svg
                      width="14" height="14" viewBox="0 0 14 14" fill="none"
                      aria-hidden="true"
                      className="transition-colors duration-300 group-hover:stroke-bg"
                      stroke="rgba(255,255,255,0.5)"
                    >
                      <path d="M2.5 7h9M7.5 3l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* GitHub CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://github.com/abhinavsankar27-bot"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="inline-flex items-center gap-3 font-mono text-sm font-medium tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:border-accent hover:text-accent"
            style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View All on GitHub
          </a>
        </div>
      </div>

      {/* Floating cursor preview image */}
      <div
        ref={previewRef}
        className={`project-preview-img ${activePreview ? 'visible' : ''}`}
        style={{
          left: previewPos.x + 24,
          top: previewPos.y - 100,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {activePreview && (
          <AppImage
            src={projects.find((p) => p.id === activePreview)?.image || ''}
            alt={projects.find((p) => p.id === activePreview)?.imageAlt || ''}
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>

      {/* ── INTERACTIVE STORYTELLING OVERLAY ── */}
      {overlayVisible && activeProject && (
        <div
          ref={overlayRef}
          className="project-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} project story`}
          style={{ background: '#07070E' }}
        >
          {/* Close button */}
          <button
            onClick={closeProject}
            className="project-overlay-close"
            aria-label="Close project"
            data-hover
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Chapter progress bar */}
          <div
            aria-hidden="true"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'rgba(255,255,255,0.05)',
              zIndex: 5002,
            }}
          >
            <div
              style={{
                height: '100%',
                background: chapterColors[activeChapter],
                width: `${((activeChapter + 1) / activeProject.story.length) * 100}%`,
                transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1), background 0.4s ease',
                boxShadow: `0 0 12px ${chapterColors[activeChapter]}`,
              }}
            />
          </div>

          <div ref={overlayContentRef} className="project-overlay-inner">
            {/* Header */}
            <div className="overlay-reveal mb-4 flex items-center gap-4">
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(0,255,148,0.7)' }}>
                {activeProject.number} / {activeProject.subtitle}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.1)' }}>—</span>
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Interactive Story
              </span>
            </div>

            <h2
              className="overlay-reveal font-display font-black uppercase text-white mb-8"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: '0.92', letterSpacing: '-0.04em' }}
            >
              {activeProject.title}
            </h2>

            {/* Tags */}
            <div className="overlay-reveal flex flex-wrap gap-2 mb-10">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(0,255,148,0.06)',
                    border: '1px solid rgba(0,255,148,0.2)',
                    color: 'rgba(0,255,148,0.8)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Image with parallax */}
            <div
              className="overlay-reveal relative w-full mb-12 rounded-2xl overflow-hidden"
              style={{ height: 'clamp(200px, 35vh, 400px)' }}
            >
              <div
                ref={imageParallaxRef}
                style={{
                  position: 'absolute',
                  inset: '-8%',
                  transition: 'transform 0.1s linear',
                }}
              >
                <AppImage
                  src={activeProject.image}
                  alt={activeProject.imageAlt}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(7,7,14,0.9) 0%, rgba(7,7,14,0.3) 60%, transparent 100%)',
                }}
              />
              {/* Chapter label on image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 24,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: chapterColors[activeChapter],
                  textShadow: `0 0 20px ${chapterColors[activeChapter]}`,
                }}
              >
                {activeProject.story[activeChapter].chapter}
              </div>
            </div>

            {/* ── Story chapters ── */}
            <div className="overlay-reveal">
              {/* Chapter navigation */}
              <div className="flex gap-3 mb-8">
                {activeProject.story.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToChapter(idx)}
                    aria-label={ch.chapter}
                    style={{
                      flex: 1,
                      height: 3,
                      borderRadius: 2,
                      background: idx === activeChapter ? chapterColors[idx] : 'rgba(255,255,255,0.1)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease, box-shadow 0.3s ease',
                      boxShadow: idx === activeChapter ? `0 0 10px ${chapterColors[idx]}` : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Story content */}
              <div className="story-content">
                <h3
                  className="font-display font-black text-white mb-4"
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}
                >
                  {activeProject.story[activeChapter].title}
                </h3>
                <p
                  className="font-display leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                    color: 'rgba(255,255,255,0.65)',
                    minHeight: '5em',
                  }}
                >
                  {chapterText}
                  {isTyping && (
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'inline-block',
                        width: 2,
                        height: '1.1em',
                        background: chapterColors[activeChapter],
                        marginLeft: 2,
                        verticalAlign: 'middle',
                        animation: 'blink 0.8s step-end infinite',
                      }}
                    />
                  )}
                </p>
              </div>

              {/* Chapter navigation buttons */}
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={() => goToChapter(Math.max(0, activeChapter - 1))}
                  disabled={activeChapter === 0}
                  className="font-mono text-xs tracking-widest uppercase flex items-center gap-2"
                  style={{
                    color: activeChapter === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)',
                    background: 'none',
                    border: 'none',
                    cursor: activeChapter === 0 ? 'default' : 'pointer',
                    transition: 'color 0.3s ease',
                  }}
                  aria-label="Previous chapter"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Prev
                </button>

                <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  {activeChapter + 1} / {activeProject.story.length}
                </span>

                <button
                  onClick={() => goToChapter(Math.min(activeProject.story.length - 1, activeChapter + 1))}
                  disabled={activeChapter === activeProject.story.length - 1}
                  className="font-mono text-xs tracking-widest uppercase flex items-center gap-2"
                  style={{
                    color: activeChapter === activeProject.story.length - 1 ? 'rgba(255,255,255,0.15)' : chapterColors[activeChapter],
                    background: 'none',
                    border: 'none',
                    cursor: activeChapter === activeProject.story.length - 1 ? 'default' : 'pointer',
                    transition: 'color 0.3s ease',
                  }}
                  aria-label="Next chapter"
                >
                  Next
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Problem / Solution / Result summary */}
            <div className="overlay-reveal grid md:grid-cols-3 gap-6 mt-14">
              {[
                { label: 'Problem', content: activeProject.problem, color: '#FF6B6B' },
                { label: 'Solution', content: activeProject.solution, color: '#00FF94' },
                { label: 'Result', content: activeProject.result, color: '#7C8FFF' },
              ].map((block) => (
                <div
                  key={block.label}
                  className="p-6 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${block.color}22` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: block.color }} />
                    <span
                      className="font-mono text-xs font-bold tracking-widest uppercase"
                      style={{ color: block.color }}
                    >
                      {block.label}
                    </span>
                  </div>
                  <p className="font-display text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {block.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}