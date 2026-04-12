'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  const [year, setYear] = useState('2026');

  useEffect(() => {
    setYear(new Date()?.getFullYear()?.toString());
  }, []);

  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: copyright */}
        <div className="flex items-center gap-3">
          <AppLogo size={24} />
          <span className="font-mono text-xs text-white/30 tracking-widest">
            © {year} Abhinav Sankar
          </span>
        </div>

        {/* Center: links */}
        <div className="flex items-center gap-6 font-mono text-xs font-medium text-white/30">
          <a
            href="https://github.com/abhinavsankar27-bot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/abhinav-sankar-1abab2381"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="mailto:abhinavsankar27@gmail.com"
            className="hover:text-accent transition-colors duration-300"
          >
            Email
          </a>
        </div>

        {/* Right: location */}
        <span className="font-mono text-xs text-white/20 tracking-widest uppercase">
          Thrissur, Kerala · India
        </span>
      </div>
    </footer>
  );
}