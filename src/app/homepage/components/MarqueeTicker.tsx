import React from 'react';

export default function MarqueeTicker() {
  // We repeat the text to ensure continuous scrolling
  const tickerText = Array(10).fill("// OPEN FOR OPPORTUNITIES // SHIPPING FAST // BUILDING END-TO-END //").join(" ");

  return (
    <div className="w-full bg-disruptor-volt border-b-8 border-disruptor-black py-4 overflow-hidden relative flex items-center">
      <div className="whitespace-nowrap animate-marquee flex items-center">
        <span className="font-space font-bold uppercase text-xl md:text-2xl tracking-tech text-disruptor-black px-4">
          {tickerText}
        </span>
        <span className="font-space font-bold uppercase text-xl md:text-2xl tracking-tech text-disruptor-black px-4 absolute top-0 left-[100%]">
          {tickerText}
        </span>
      </div>
    </div>
  );
}
