'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-4 backdrop-blur-xl border-b border-white/5' :'py-6'
        }`}
        style={{
          background: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
            aria-label="Back to top"
          >
            <AppLogo size={32} />
            <span
              className="font-mono text-sm font-bold tracking-widest uppercase text-white/70 group-hover:text-accent transition-colors duration-300"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              AS
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="nav-link font-mono text-xs font-medium tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="mailto:abhinavsankar27@gmail.com"
            className="hidden md:flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full border border-white/15 text-white/70 hover:border-accent hover:text-accent transition-all duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Hire Me
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-xl transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(10, 10, 15, 0.95)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-display text-4xl font-black uppercase tracking-tight text-white/80 hover:text-accent transition-colors duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="mailto:abhinavsankar27@gmail.com"
            onClick={() => setMenuOpen(false)}
            className="mt-6 font-mono text-sm font-bold tracking-widest uppercase px-8 py-3 rounded-full border border-accent/40 text-accent"
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
}