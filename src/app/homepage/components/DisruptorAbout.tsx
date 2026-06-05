import React from 'react';

export default function DisruptorAbout() {
  return (
    <section id="about" className="w-full bg-disruptor-white py-24 border-b-8 border-disruptor-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-20 border-b-4 border-disruptor-black pb-4">
          <div className="w-4 h-4 bg-disruptor-black"></div>
          <h2 className="font-space font-bold uppercase text-xl tracking-tech text-disruptor-black">
            System // About
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Big Statement */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="font-ranchers text-[60px] md:text-[80px] leading-[0.9] text-disruptor-black uppercase mb-8">
              MASTER OF <br />
              <span className="text-disruptor-volt text-outline-black" style={{ textShadow: '4px 4px 0 #000' }}>CLOUD & UI</span>
            </h3>
            <p className="font-space text-disruptor-black font-bold text-lg leading-relaxed max-w-md bg-disruptor-volt p-4 border-4 border-disruptor-black neo-shadow mb-8">
              Based in Kerala, India. I am a Full Stack Developer and MCA student specializing in Cloud Computing, UI engineering, and building scalable backend systems.
            </p>

            {/* Social / Contact Links */}
            <div className="flex flex-wrap gap-4 mt-2">
              <a 
                href="https://github.com/abhinavsankar27-bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-disruptor-black text-disruptor-white font-space uppercase font-bold text-sm tracking-widest border-4 border-disruptor-black hover:bg-disruptor-white hover:text-disruptor-black neo-shadow-hover transition-all duration-200 flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GITHUB
              </a>
              <a 
                href="https://www.linkedin.com/in/theabhinavsankar/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#0A66C2] text-white font-space uppercase font-bold text-sm tracking-widest border-4 border-disruptor-black hover:bg-disruptor-white hover:text-[#0A66C2] neo-shadow-hover transition-all duration-200 flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LINKEDIN
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=abhinavsankar27@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-disruptor-white text-disruptor-black font-space uppercase font-bold text-sm tracking-widest border-4 border-disruptor-black hover:bg-disruptor-black hover:text-disruptor-white neo-shadow-hover transition-all duration-200 flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                EMAIL
              </a>
            </div>
            
            {/* Download Resume Button */}
            <div className="mt-8">
              <a 
                href="/Abhinav_Sankar_F_Resume.pdf" 
                download="Abhinav_Sankar_Resume.pdf"
                className="inline-flex items-center gap-4 bg-disruptor-volt text-disruptor-black px-10 py-6 font-ranchers text-3xl uppercase border-4 border-disruptor-black neo-shadow-hover hover:bg-disruptor-black hover:text-disruptor-volt transition-colors duration-200 cursor-pointer"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                DOWNLOAD RESUME
              </a>
            </div>
          </div>

          {/* Right Column: Details Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Education Block */}
            <div className="h-fit bg-disruptor-black text-disruptor-white p-6 md:p-8 border-8 border-disruptor-black neo-shadow-white relative group transition-transform hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-12 h-12 bg-disruptor-volt border-b-4 border-l-4 border-disruptor-black flex items-center justify-center">
                <span className="font-space font-bold text-disruptor-black">01</span>
              </div>
              <h4 className="font-space font-bold text-disruptor-volt text-sm tracking-widest uppercase mb-4">
                // Education
              </h4>
              <h5 className="font-ranchers text-3xl mb-2">LEAD COLLEGE</h5>
              <p className="font-jakarta text-disruptor-white/80 font-bold mb-4">
                Master of Computer Applications (MCA)
              </p>
              <ul className="font-space text-sm flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-disruptor-volt"></div>
                  Specialization: Cloud Computing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-disruptor-volt"></div>
                  Timeline: 2025 – Present
                </li>
              </ul>
            </div>

            {/* Experience Block */}
            <div className="h-fit bg-disruptor-white border-8 border-disruptor-black p-6 md:p-8 neo-shadow relative group transition-transform hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-12 h-12 bg-disruptor-black border-b-4 border-l-4 border-disruptor-black flex items-center justify-center">
                <span className="font-space font-bold text-disruptor-volt">02</span>
              </div>
              <h4 className="font-space font-bold text-disruptor-black text-sm tracking-widest uppercase mb-4">
                // Experience
              </h4>
              <h5 className="font-ranchers text-3xl mb-2 text-disruptor-black">GETWORK.AI</h5>
              <p className="font-jakarta text-disruptor-black/80 font-bold mb-4">
                Vibe Coding Hackathon 2025
              </p>
              <ul className="font-space text-sm flex flex-col gap-2 text-disruptor-black">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-disruptor-black mt-1.5 min-w-[6px]"></div>
                  Built & deployed a full-stack AI app under strict constraints.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-disruptor-black mt-1.5 min-w-[6px]"></div>
                  Rapid prototyping & API integrations.
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
