'use client';

import React, { useEffect, useRef, useState } from 'react';

const TERMINAL_LINES = [
  { prefix: '$ ', text: 'whoami', delay: 0 },
  { prefix: '> ', text: 'Abhinav Sankar — Cloud & AI Engineer', delay: 600 },
  { prefix: '$ ', text: 'cat contact.json', delay: 1200 },
  { prefix: '  ', text: '{ "email": "abhinavsankar27@gmail.com",', delay: 1800 },
  { prefix: '  ', text: '  "location": "Thrissur, Kerala, India",', delay: 2200 },
  { prefix: '  ', text: '  "available": true }', delay: 2600 },
  { prefix: '$ ', text: 'echo "Open to opportunities"', delay: 3200 },
  { prefix: '> ', text: 'Open to opportunities ✓', delay: 3800, accent: true },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

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
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Trigger terminal typing when in view
      if (terminalRef.current) {
        ScrollTrigger.create({
          trigger: terminalRef.current,
          start: 'top 75%',
          onEnter: () => {
            setTerminalVisible(true);
          },
        });
      }
    };

    initAnimations();
  }, []);

  // Terminal typing effect
  useEffect(() => {
    if (!terminalVisible) return;

    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });
  }, [terminalVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit — no backend
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6"
      style={{ background: '#0F0F18' }}
    >
      <div className="section-divider mb-20 max-w-7xl mx-auto" />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="mb-16">
          <span className="section-label">
            <span className="inline-block w-6 h-px bg-accent mr-3 align-middle" />
            Get In Touch
          </span>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="mb-20">
          <h2
            className="font-display font-black uppercase text-white"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: '0.92',
              letterSpacing: '-0.04em',
            }}
          >
            Let&apos;s Build
            <br />
            <span className="gradient-text">Something.</span>
          </h2>
          <p
            className="mt-6 font-display text-base max-w-md"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Open to backend, cloud, and AI engineering roles. Currently preparing
            through hands-on projects and continuous learning.
          </p>
        </div>

        {/* Two-col: terminal left, form right */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Terminal */}
          <div ref={terminalRef} className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#FF5F57' }} />
              <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
              <div className="terminal-dot" style={{ background: '#28C840' }} />
              <span
                className="ml-4 font-mono text-xs"
                style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}
              >
                terminal — bash
              </span>
            </div>

            <div className="terminal-body">
              {TERMINAL_LINES.map((line, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 transition-all duration-300"
                  style={{
                    opacity: visibleLines.includes(i) ? 1 : 0,
                    transform: visibleLines.includes(i) ? 'translateY(0)' : 'translateY(4px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                  }}
                >
                  <span
                    style={{
                      color: line.prefix === '$ ' ? '#00FF94' : 'rgba(255,255,255,0.3)',
                      userSelect: 'none',
                    }}
                  >
                    {line.prefix}
                  </span>
                  <span
                    style={{
                      color: line.accent
                        ? '#00FF94'
                        : line.prefix === '> ' ?'rgba(255,255,255,0.7)' :'rgba(255,255,255,0.5)',
                    }}
                  >
                    {line.text}
                  </span>
                </div>
              ))}

              {/* Blinking cursor at end */}
              {visibleLines.length === TERMINAL_LINES.length && (
                <div className="flex items-center gap-2 mt-1">
                  <span style={{ color: '#00FF94' }}>$</span>
                  <span className="typing-cursor" />
                </div>
              )}
            </div>
          </div>

          {/* Right: Contact form */}
          <div>
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center text-center py-20 rounded-2xl"
                style={{ background: 'rgba(0,255,148,0.04)', border: '1px solid rgba(0,255,148,0.15)' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl"
                  style={{ background: 'rgba(0,255,148,0.1)', border: '1px solid rgba(0,255,148,0.3)' }}
                >
                  ✓
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                <p className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  I&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="group">
                  <label
                    htmlFor="name"
                    className="font-mono text-xs tracking-widest uppercase block mb-2"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full bg-transparent font-display text-base text-white placeholder-white/20 outline-none py-4 transition-all duration-300"
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderBottomColor = '#00FF94';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)';
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="font-mono text-xs tracking-widest uppercase block mb-2"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-transparent font-display text-base text-white placeholder-white/20 outline-none py-4 transition-all duration-300"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderBottomColor = '#00FF94';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)';
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="font-mono text-xs tracking-widest uppercase block mb-2"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about the opportunity..."
                    className="w-full bg-transparent font-display text-base text-white placeholder-white/20 outline-none py-4 resize-none transition-all duration-300"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderBottomColor = '#00FF94';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)';
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-5 rounded-xl font-display font-bold text-sm tracking-wide text-bg transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: '#00FF94',
                    boxShadow: '0 0 0 rgba(0,255,148,0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(0,255,148,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 rgba(0,255,148,0)';
                  }}
                >
                  Send Message
                </button>

                {/* Direct links */}
                <div className="flex items-center justify-center gap-8 pt-4">
                  <a
                    href="mailto:abhinavsankar27@gmail.com"
                    className="font-mono text-xs tracking-widest uppercase transition-colors duration-300 hover:text-accent"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    Email Direct
                  </a>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <a
                    href="https://linkedin.com/in/abhinav-sankar-1abab2381"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs tracking-widest uppercase transition-colors duration-300 hover:text-accent"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    LinkedIn
                  </a>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <a
                    href="https://github.com/abhinavsankar27-bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs tracking-widest uppercase transition-colors duration-300 hover:text-accent"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    GitHub
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}