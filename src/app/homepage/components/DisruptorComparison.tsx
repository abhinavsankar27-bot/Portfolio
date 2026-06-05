'use client';

import React from 'react';

const skills = [
  {
    id: 1,
    labelCat: "CORE DOMAIN",
    titleCat: "FRONTEND",
    labelTech: "TECH STACK",
    titleTech: "REACT / NEXT"
  },
  {
    id: 2,
    labelCat: "CORE DOMAIN",
    titleCat: "BACKEND",
    labelTech: "TECH STACK",
    titleTech: "NODE / PYTHON"
  },
  {
    id: 3,
    labelCat: "CORE DOMAIN",
    titleCat: "DATABASES",
    labelTech: "TECH STACK",
    titleTech: "MONGO / MYSQL"
  }
];

export default function DisruptorComparison() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="w-full border-b-8 border-disruptor-black">
      {skills.map((row, index) => (
        <div key={row.id} className={`flex flex-col md:flex-row w-full ${index !== skills.length - 1 ? 'border-b-4 border-disruptor-black' : ''}`}>
          
          {/* Category (Left) */}
          <div className="flex-1 bg-disruptor-black p-12 md:p-24 border-b-4 md:border-b-0 md:border-r-4 border-disruptor-black flex flex-col justify-center">
            <span className="font-space uppercase font-bold text-sm tracking-tech text-[#475569] mb-4">
              {row.labelCat}
            </span>
            <h3 className="font-ranchers text-[60px] md:text-[80px] text-[#475569] leading-tight-heading uppercase">
              {row.titleCat}
            </h3>
          </div>

          {/* Tech Stack (Right) */}
          <div 
            onClick={scrollToProjects}
            className="flex-1 bg-disruptor-volt p-12 md:p-24 flex flex-col justify-center relative overflow-hidden group cursor-pointer"
          >
            {/* Arrow Decoration */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="square">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            <span className="font-space uppercase font-bold text-sm tracking-tech text-disruptor-black mb-4">
              {row.labelTech}
            </span>
            <h3 className="font-ranchers text-[50px] md:text-[70px] text-disruptor-black leading-tight-heading uppercase" style={{ textShadow: '4px 4px 0 #FFFFFF' }}>
              {row.titleTech}
            </h3>
          </div>

        </div>
      ))}
    </section>
  );
}
