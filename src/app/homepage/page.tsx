'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DisruptorHeader from './components/DisruptorHeader';
import DisruptorHero from './components/DisruptorHero';
import DisruptorSocialProof from './components/DisruptorSocialProof';
import DisruptorComparison from './components/DisruptorComparison';
import DisruptorProcess from './components/DisruptorProcess';
import DisruptorTimerForm from './components/DisruptorTimerForm';
import DisruptorSidebar from './components/DisruptorSidebar';
import MarqueeTicker from './components/MarqueeTicker';
import LiveSystemLogs from './components/LiveSystemLogs';
import { useUiMode } from '../../context/UiModeContext';

gsap.registerPlugin(ScrollTrigger);

export default function Homepage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { mode } = useUiMode();

  useEffect(() => {
    if (!mainRef.current || mode === 'RAW') return;

    // Harsh brutalist reveal animation for sections
    const sections = mainRef.current.querySelectorAll('section');
    
    sections.forEach((section) => {
      // Set initial state (hidden & harsh scaled)
      gsap.set(section, { opacity: 0, scale: 0.95, filter: 'contrast(200%) grayscale(100%)' });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            scale: 1,
            filter: 'contrast(100%) grayscale(0%)',
            duration: 0.3,
            ease: "steps(5)", // Mechanical, choppy ease
            overwrite: true
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [mode]);

  return (
    <div className={`relative min-h-screen font-jakarta ${mode === 'RAW' ? 'bg-black text-[#00FF41] selection:bg-[#00FF41] selection:text-black' : 'bg-disruptor-dark selection:bg-disruptor-volt selection:text-disruptor-black'}`}>
      
      {mode === 'RAW' && <LiveSystemLogs />}

      {/* Structural Sidebar */}
      <DisruptorSidebar />

      {/* Main Content Area (padding-right to account for fixed sidebar) */}
      <div className="pr-[64px] md:pr-[200px] w-full min-h-screen" ref={mainRef}>
        <DisruptorHeader />
        
        {mode === 'RAW' ? (
          <div className="w-full min-h-[90vh] p-8 md:p-12 pr-[64px] md:pr-[420px] bg-black">
            <pre className="font-space text-[#00FF41] text-xs md:text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify({
                status: 200,
                message: "OK",
                timestamp: new Date().toISOString(),
                data: {
                  developer: {
                    name: "Abhinav Sankar",
                    role: "Full Stack Developer",
                    location: "Thrissur, Kerala",
                    skills: {
                      frontend: ["React.js", "Next.js", "JavaScript (ES6+)"],
                      backend: ["Node.js", "Python", "Flask", "Express.js"],
                      databases: ["MongoDB", "MySQL"],
                      infrastructure: ["RabbitMQ", "REST APIs", "Role-Based Access Control"]
                    }
                  },
                  projects: [
                    {
                      id: "1",
                      name: "EventBOOK",
                      stack: ["React.js", "Flask", "MongoDB"],
                      architecture: "RESTful API with RBAC enforcing UI permissions."
                    },
                    {
                      id: "2",
                      name: "Smart E-Commerce",
                      stack: ["Node.js", "Express.js", "RabbitMQ", "MySQL"],
                      architecture: "Async event-driven microservices for cart and payment."
                    },
                    {
                      id: "3",
                      name: "Flight Price Predictor",
                      stack: ["Python", "Machine Learning", "HTML5", "CSS3"],
                      architecture: "ML Model inference exposed via REST endpoint."
                    }
                  ],
                  education: "MCA - Cloud Computing (2025)",
                  links: {
                    github: "github.com/abhinavsankar27-bot"
                  }
                }
              }, null, 2)}
            </pre>
          </div>
        ) : (
          <main className="w-full">
            <DisruptorHero />
            <MarqueeTicker />
            <DisruptorComparison />
            <MarqueeTicker />
            <DisruptorProcess />
            <DisruptorSocialProof />
            <MarqueeTicker />
            <DisruptorTimerForm />
          </main>
        )}
      </div>
    </div>
  );
}