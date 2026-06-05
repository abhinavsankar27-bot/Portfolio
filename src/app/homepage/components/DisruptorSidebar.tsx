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
    <aside className="fixed right-0 top-0 h-screen w-[64px] md:w-[200px] border-l-8 border-disruptor-black flex bg-disruptor-white z-40">
      <div className="flex w-full h-full border-disruptor-black flex-col md:flex-row">
        
        {/* Strip 1 */}
        <div onClick={() => scrollTo('skills')} className="flex-1 h-1/3 md:h-full border-b-4 md:border-b-0 md:border-r-4 border-disruptor-black flex items-center justify-center bg-disruptor-white hover:bg-disruptor-volt transition-colors cursor-pointer group">
          <span className="font-space font-bold text-disruptor-black tracking-widest uppercase writing-vertical text-xl md:text-2xl group-hover:text-disruptor-black">
            // SKILLS
          </span>
        </div>

        {/* Strip 2 */}
        <div onClick={() => scrollTo('projects')} className="flex-1 h-1/3 md:h-full border-b-4 md:border-b-0 md:border-r-4 border-disruptor-black flex items-center justify-center bg-disruptor-white hover:bg-disruptor-volt transition-colors cursor-pointer group">
          <span className="font-space font-bold text-disruptor-black tracking-widest uppercase writing-vertical text-xl md:text-2xl group-hover:text-disruptor-black">
            // PROJECTS
          </span>
        </div>

        {/* Strip 3 */}
        <div onClick={() => scrollTo('contact')} className="flex-1 h-1/3 md:h-full flex items-center justify-center bg-disruptor-white hover:bg-disruptor-volt transition-colors cursor-pointer group">
          <span className="font-space font-bold text-disruptor-black tracking-widest uppercase writing-vertical text-xl md:text-2xl group-hover:text-disruptor-black">
            // CONTACT
          </span>
        </div>

      </div>
    </aside>
  );
}
