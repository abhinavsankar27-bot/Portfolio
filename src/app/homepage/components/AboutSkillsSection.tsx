'use client';

import React, { useEffect, useRef } from 'react';

const skillCategories = [
  {
    label: 'Backend & Dev',
    color: '#00FF94',
    skills: [
      { name: 'Python', level: 88 },
      { name: 'Flask / REST APIs', level: 82 },
      { name: 'Java', level: 70 },
      { name: 'SQL & DBMS', level: 75 },
      { name: 'HTML / CSS', level: 80 },
    ],
  },
  {
    label: 'AI & Data',
    color: '#7C8FFF',
    skills: [
      { name: 'Machine Learning', level: 78 },
      { name: 'Data Science', level: 72 },
      { name: 'Artificial Intelligence', level: 70 },
      { name: 'Big Data Basics', level: 60 },
    ],
  },
  {
    label: 'Cloud & Tools',
    color: '#FF8A65',
    skills: [
      { name: 'AWS (Learning)', level: 55 },
      { name: 'Google Cloud (Learning)', level: 52 },
      { name: 'Git & GitHub', level: 85 },
    ],
  },
];

export default function AboutSkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Bio reveal
      if (bioRef.current) {
        const els = bioRef.current.querySelectorAll('.bio-reveal');
        gsap.fromTo(
          els,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bioRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Skills reveal
      if (skillsRef.current) {
        gsap.fromTo(
          skillsRef.current.querySelectorAll('.skill-category'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 70%',
            },
          }
        );

        // Animate skill bars
        ScrollTrigger.create({
          trigger: skillsRef.current,
          start: 'top 65%',
          onEnter: () => {
            const bars = document.querySelectorAll<HTMLElement>('.skill-bar-fill');
            bars.forEach((bar) => {
              bar.classList.add('animated');
            });
          },
        });
      }
    };

    initAnimations();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6"
      style={{ background: '#0A0A0F' }}
    >
      {/* Section divider */}
      <div className="section-divider mb-20 max-w-7xl mx-auto" />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="mb-16">
          <span className="section-label">
            <span className="inline-block w-6 h-px bg-accent mr-3 align-middle" />
            About Me
          </span>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: Bio */}
          <div ref={bioRef}>
            <div className="bio-reveal mb-6">
              <h2
                className="font-display font-black uppercase tracking-tight text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '0.95', letterSpacing: '-0.03em' }}
              >
                Building at the
                <br />
                <span className="gradient-text">intersection</span>
                <br />
                of cloud &amp; AI.
              </h2>
            </div>

            <div className="bio-reveal mt-10 space-y-5">
              <p
                className="font-display text-base leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '480px' }}
              >
                I&apos;m an MCA student specializing in Cloud Computing with experience in building
                web, AI, and data-driven applications. I&apos;m interested in backend systems, cloud
                deployment, and scalable software.
              </p>
              <p
                className="font-display text-base leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '480px' }}
              >
                I enjoy solving real-world problems using data, automation, and clean architecture.
                Currently preparing for cloud computing, AI, and backend roles through hands-on
                projects and continuous learning.
              </p>
            </div>

            {/* Soft skills tags */}
            <div className="bio-reveal mt-10 flex flex-wrap gap-3">
              {['Problem Solving', 'Teamwork', 'Communication', 'Time Management'].map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs px-4 py-2 rounded-full"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.45)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Contact info */}
            <div className="bio-reveal mt-12 space-y-3">
              {[
                { label: 'Email', value: 'abhinavsankar27@gmail.com', href: 'mailto:abhinavsankar27@gmail.com' },
                { label: 'GitHub', value: 'github.com/abhinavsankar27-bot', href: 'https://github.com/abhinavsankar27-bot' },
                { label: 'LinkedIn', value: 'linkedin.com/in/abhinav-sankar-1abab2381', href: 'https://linkedin.com/in/abhinav-sankar-1abab2381' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)', minWidth: '70px' }}>
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="font-mono text-xs hover:text-accent transition-colors duration-300 truncate"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Skills */}
          <div ref={skillsRef} className="space-y-12" id="skills">
            {skillCategories.map((category, ci) => (
              <div key={category.label} className="skill-category">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: category.color }}
                  />
                  <span
                    className="font-mono text-xs font-bold tracking-[0.3em] uppercase"
                    style={{ color: category.color }}
                  >
                    {category.label}
                  </span>
                </div>

                {/* Skills */}
                <div className="space-y-5">
                  {category.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className="font-display text-sm font-medium"
                          style={{ color: 'rgba(255,255,255,0.7)' }}
                        >
                          {skill.name}
                        </span>
                        <span
                          className="font-mono text-xs"
                          style={{ color: 'rgba(255,255,255,0.3)' }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="skill-bar-track">
                        <div
                          className="skill-bar-fill"
                          style={{
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                            transitionDelay: `${(ci * 5 + si) * 80}ms`,
                          }}
                          data-width={skill.level}
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} proficiency: ${skill.level}%`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}