import React from 'react';

const projects = [
  {
    num: "1",
    title: "EVENTBOOK",
    tech: "React.js • Python/Flask • MongoDB • REST API",
    github: "github.com/abhinavsankar27-bot/EventBOOK",
    bullets: [
      "Built a full-stack event booking platform with React.js (Vite) frontend and Python/Flask REST API backend.",
      "Implemented Role-Based Access Control (RBAC) with differentiated permissions for users versus organizers.",
      "Integrated MongoDB for persistent data storage, powering a real-time Organizer Dashboard."
    ]
  },
  {
    num: "2",
    title: "SMART E-COMMERCE",
    tech: "Node.js • Express.js • MySQL • RabbitMQ",
    github: "github.com/abhinavsankar27-bot/E-commerce",
    bullets: [
      "Architected a service-based backend using Node.js and Express.js with MySQL for transactional data.",
      "Integrated RabbitMQ for async event-driven communication between services, decoupling payment processing.",
      "Built a multi-step React.js checkout frontend with inline validation and real-time inventory state."
    ]
  },
  {
    num: "3",
    title: "FLIGHT PREDICTOR",
    tech: "Python • Machine Learning • JS • HTML/CSS",
    github: "github.com/abhinavsankar27-bot/Flight-Price-Predictor-",
    bullets: [
      "Developed a Python-based ML model to predict flight prices and exposed it as a REST API endpoint.",
      "Built a responsive HTML5/CSS3 frontend with accessible form controls meeting WCAG 2.1 AA standards.",
      "Implemented real-time UI feedback with loading animations, result cards, and error fallbacks."
    ]
  }
];

export default function DisruptorProcess() {
  return (
    <section id="projects" className="w-full bg-disruptor-black py-24 border-b-8 border-disruptor-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-20 border-b-4 border-disruptor-white pb-4">
          <div className="w-4 h-4 bg-disruptor-volt"></div>
          <h2 className="font-space font-bold uppercase text-xl tracking-tech text-disruptor-white">
            Architecture // Featured Projects
          </h2>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {projects.map((step) => (
            <div 
              key={step.num} 
              className="flex flex-col border-t-4 border-disruptor-volt pt-8 group cursor-pointer hover:-translate-y-2 transition-transform duration-300" 
              onClick={() => window.open(`https://${step.github}`, '_blank')}
            >
              <div className="flex justify-between items-start mb-8">
                <span className="font-space font-bold text-disruptor-volt text-2xl">
                  // 0{step.num}
                </span>
                <span className="font-space font-bold text-disruptor-white text-sm tracking-tech text-right max-w-[200px]">
                  {step.tech}
                </span>
              </div>
              
              <h3 className="font-ranchers text-4xl md:text-5xl text-disruptor-white leading-tight-heading uppercase mb-6 group-hover:text-disruptor-volt transition-colors">
                {step.title}
              </h3>
              
              <ul className="flex flex-col gap-4 font-space text-disruptor-white/80">
                {step.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-disruptor-volt mt-1">▹</span>
                    <span className="text-sm leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-4 border-t-2 border-disruptor-white/20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-space text-xs text-disruptor-white uppercase tracking-widest">
                  View Repository
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2" strokeLinecap="square">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
