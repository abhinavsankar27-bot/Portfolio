'use client';

import React, { useEffect, useRef } from 'react';

const certifications = [
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    status: 'Ongoing',
    color: '#FF9900',
    icon: '☁',
  },
  {
    title: 'Google Cloud Fundamentals',
    issuer: 'Google Cloud',
    status: 'Ongoing',
    color: '#4285F4',
    icon: '⬡',
  },
  {
    title: 'Python for Everybody',
    issuer: 'Coursera',
    status: 'Completed',
    color: '#00FF94',
    icon: '⬟',
  },
  {
    title: 'Machine Learning',
    issuer: 'Kaggle',
    status: 'Completed',
    color: '#20BEFF',
    icon: '◈',
  },
  {
    title: 'AI & Data Science',
    issuer: 'Academic Learning',
    status: 'Completed',
    color: '#7C8FFF',
    icon: '◇',
  },
];

const achievements = [
  {
    title: 'Vibe Coding Hackathon',
    org: 'GetWork.ai',
    year: '2025',
    description: 'Participated in competitive hackathon, building functional AI-powered solutions under time constraints.',
    icon: '⚡',
  },
  {
    title: 'Multiple Web & AI Apps',
    org: 'Personal Projects',
    year: '2023–2025',
    description: 'Built and published multiple production-ready web, AI, and ML applications across domains.',
    icon: '◈',
  },
  {
    title: 'Active GitHub Contributor',
    org: 'Open Source',
    year: 'Ongoing',
    description: 'Consistent open source activity with documented commits and project repositories.',
    icon: '⬡',
  },
];

export default function CredentialsSection() {
  const certRef = useRef<HTMLDivElement>(null);
  const achRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap?.registerPlugin(ScrollTrigger);

      // Timeline line animation
      if (timelineRef?.current) {
        const line = timelineRef?.current?.querySelector('.timeline-line');
        if (line) {
          gsap?.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.5,
              ease: 'power2.out',
              transformOrigin: 'top',
              scrollTrigger: {
                trigger: timelineRef?.current,
                start: 'top 70%',
              },
            }
          );
        }
      }

      // Cert items stagger
      if (certRef?.current) {
        gsap?.fromTo(
          certRef?.current?.querySelectorAll('.cert-item'),
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: certRef?.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Achievement cards stagger
      if (achRef?.current) {
        gsap?.fromTo(
          achRef?.current?.querySelectorAll('.achievement-card'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: achRef?.current,
              start: 'top 78%',
            },
          }
        );
      }
    };

    initAnimations();
  }, []);

  return (
    <section
      id="credentials"
      className="relative py-32 px-6"
      style={{ background: '#0A0A0F' }}
    >
      <div className="section-divider mb-20 max-w-7xl mx-auto" />
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="mb-16">
          <span className="section-label">
            <span className="inline-block w-6 h-px bg-accent mr-3 align-middle" />
            Credentials &amp; Achievements
          </span>
        </div>

        {/* Two-col layout */}
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left: Certifications Timeline */}
          <div>
            <h2
              className="font-display font-black uppercase text-white mb-12"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: '0.95', letterSpacing: '-0.03em' }}
            >
              Certifications
            </h2>

            <div ref={certRef} className="relative" style={{ paddingLeft: '28px' }}>
              {/* Timeline line */}
              <div ref={timelineRef} className="absolute left-0 top-0 bottom-0">
                <div
                  className="timeline-line"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '1px',
                    height: '100%',
                    background: 'linear-gradient(180deg, #00FF94, rgba(0,255,148,0.1))',
                    transformOrigin: 'top',
                    transform: 'scaleY(0)',
                    transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>

              <div className="space-y-8">
                {certifications?.map((cert, i) => (
                  <div
                    key={cert?.title}
                    className="cert-item relative flex items-start gap-5"
                  >
                    {/* Dot */}
                    <div
                      className="absolute -left-7 top-1 w-2.5 h-2.5 rounded-full border-2 shrink-0"
                      style={{
                        borderColor: cert?.color,
                        background: '#0A0A0F',
                        boxShadow: `0 0 8px ${cert?.color}40`,
                      }}
                    />

                    {/* Content */}
                    <div
                      className="flex-1 p-5 rounded-xl transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3
                            className="font-display font-bold text-white text-base"
                          >
                            {cert?.title}
                          </h3>
                          <p
                            className="font-mono text-xs mt-1"
                            style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}
                          >
                            {cert?.issuer}
                          </p>
                        </div>
                        <span
                          className="font-mono text-xs px-3 py-1 rounded-full shrink-0"
                          style={{
                            background: cert?.status === 'Ongoing' ?'rgba(255,153,0,0.1)' :'rgba(0,255,148,0.08)',
                            border: `1px solid ${cert?.status === 'Ongoing' ? 'rgba(255,153,0,0.25)' : 'rgba(0,255,148,0.2)'}`,
                            color: cert?.status === 'Ongoing' ? '#FF9900' : '#00FF94',
                          }}
                        >
                          {cert?.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Achievements */}
          <div>
            <h2
              className="font-display font-black uppercase text-white mb-12"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: '0.95', letterSpacing: '-0.03em' }}
            >
              Achievements
            </h2>

            <div ref={achRef} className="space-y-6">
              {achievements?.map((ach, i) => (
                <div
                  key={ach?.title}
                  className="achievement-card card-dark p-6 rounded-2xl"
                  style={{ cursor: 'default' }}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg shrink-0"
                      style={{
                        background: 'rgba(0,255,148,0.08)',
                        border: '1px solid rgba(0,255,148,0.15)',
                      }}
                    >
                      {ach?.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display font-bold text-white text-base">
                          {ach?.title}
                        </h3>
                        <span
                          className="font-mono text-xs shrink-0"
                          style={{ color: 'rgba(0,255,148,0.6)' }}
                        >
                          {ach?.year}
                        </span>
                      </div>
                      <p
                        className="font-mono text-xs mt-1 mb-3"
                        style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}
                      >
                        {ach?.org}
                      </p>
                      <p
                        className="font-display text-sm leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.45)' }}
                      >
                        {ach?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}