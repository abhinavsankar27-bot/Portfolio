'use client';

import React from 'react';

export default function DisruptorSidebar() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="fixed bottom-0 left-0 lg:right-0 lg:top-0 lg:left-auto w-full h-[80px] lg:h-screen lg:w-[200px] border-t-8 lg:border-t-0 lg:border-l-8 border-disruptor-black flex bg-disruptor-white z-40">
      <div className="flex w-full h-full border-disruptor-black flex-row">
        
        {/* Strip 1 */}
        <div onClick={() => scrollTo('skills')} className="flex-1 h-full border-r-4 lg:border-r-4 border-disruptor-black flex items-center justify-center bg-disruptor-white hover:bg-disruptor-volt transition-colors cursor-pointer group">
          <span className="font-space font-bold text-disruptor-black tracking-widest uppercase lg:writing-vertical text-[10px] sm:text-xs lg:text-2xl group-hover:text-disruptor-black text-center">
            // SKILLS
          </span>
        </div>

        {/* Strip 2 */}
        <div onClick={() => scrollTo('projects')} className="flex-1 h-full border-r-4 lg:border-r-4 border-disruptor-black flex items-center justify-center bg-disruptor-white hover:bg-disruptor-volt transition-colors cursor-pointer group">
          <span className="font-space font-bold text-disruptor-black tracking-widest uppercase lg:writing-vertical text-[10px] sm:text-xs lg:text-2xl group-hover:text-disruptor-black text-center">
            // PROJECTS
          </span>
        </div>

        {/* Strip 3 (ABOUT) */}
        <div onClick={() => scrollTo('about')} className="flex-1 h-full border-r-4 lg:border-r-4 border-disruptor-black flex items-center justify-center bg-disruptor-white hover:bg-disruptor-volt transition-colors cursor-pointer group">
          <span className="font-space font-bold text-disruptor-black tracking-widest uppercase lg:writing-vertical text-[10px] sm:text-xs lg:text-2xl group-hover:text-disruptor-black text-center">
            // ABOUT
          </span>
        </div>

        {/* Strip 4 */}
        <div onClick={() => scrollTo('contact')} className="flex-1 h-full flex items-center justify-center bg-disruptor-white hover:bg-disruptor-volt transition-colors cursor-pointer group">
          <span className="font-space font-bold text-disruptor-black tracking-widest uppercase lg:writing-vertical text-[10px] sm:text-xs lg:text-2xl group-hover:text-disruptor-black text-center">
            // CONTACT
          </span>
        </div>

      </div>
    </aside>
  );
}
