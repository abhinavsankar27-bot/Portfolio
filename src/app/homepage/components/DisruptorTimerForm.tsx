import React, { useState, useEffect } from 'react';

export default function DisruptorTimerForm() {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days.toString().padStart(2, '0') },
    { label: "HRS", value: timeLeft.hours.toString().padStart(2, '0') },
    { label: "MIN", value: timeLeft.minutes.toString().padStart(2, '0') },
    { label: "SEC", value: timeLeft.seconds.toString().padStart(2, '0') },
  ];

  return (
    <section id="contact" className="w-full bg-disruptor-volt border-b-8 border-disruptor-black py-24 flex flex-col items-center justify-center px-6">
      
      <div className="text-center mb-12">
        <h2 className="font-ranchers text-[60px] md:text-[80px] text-disruptor-black uppercase leading-tight-heading mb-4" style={{ textShadow: '4px 4px 0 #FFFFFF' }}>
          AVAILABLE FOR HIRE
        </h2>
        <p className="font-space font-bold uppercase tracking-tech text-disruptor-black">
          // REACH OUT FOR COLLABORATION //
        </p>
      </div>

      {/* Brutalist Countdown Timer */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {timeBlocks.map((block) => (
          <div key={block.label} className="bg-disruptor-white border-4 border-disruptor-black p-4 min-w-[100px] flex flex-col items-center neo-shadow">
            <span className="font-archivo font-black text-[40px] text-disruptor-black leading-none mb-2">
              {block.value}
            </span>
            <span className="font-space text-xs font-bold uppercase tracking-tech text-disruptor-black">
              {block.label}
            </span>
          </div>
        ))}
      </div>

      {/* Integrated Contact Form */}
      <div className="w-full max-w-2xl bg-disruptor-white border-4 border-disruptor-black flex flex-col sm:flex-row neo-shadow">
        <input 
          type="email" 
          placeholder="ENTER_YOUR_EMAIL_ADDRESS" 
          className="flex-1 bg-transparent px-6 py-6 font-space text-disruptor-black placeholder:text-disruptor-black/50 focus:outline-none uppercase tracking-tech font-bold text-sm sm:text-base border-b-4 sm:border-b-0 sm:border-r-4 border-disruptor-black"
        />
        <button className="bg-disruptor-black text-disruptor-white px-10 py-6 font-ranchers text-2xl uppercase hover:bg-disruptor-white hover:text-disruptor-black transition-colors duration-200">
          CONTACT ME
        </button>
      </div>

    </section>
  );
}
