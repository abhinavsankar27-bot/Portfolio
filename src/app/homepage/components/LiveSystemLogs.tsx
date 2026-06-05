'use client';

import React, { useEffect, useState, useRef } from 'react';

const mockLogs = [
  '[RabbitMQ] Connected to cluster at amqp://10.0.0.4',
  '[Express] Listening on port 8080...',
  '[Flask] ML Inference Engine warm-up complete.',
  '[MongoDB] Connection pool established.',
  'GET /api/v1/projects 200 OK - 15ms',
  '[RabbitMQ] Consumer: AuthEvent received',
  '[Auth] RBAC validation passed for user_id=anonymous',
  'GET /api/v1/skills 200 OK - 8ms',
  '[System] CPU Usage: 12% | RAM: 450MB',
  'POST /api/v1/analytics/pageview 201 Created - 4ms',
  '[RabbitMQ] Publisher: Dispatching PageViewEvent',
  'GET /api/v1/achievements 200 OK - 22ms',
  '[Flask] GET /predict_flight_price 200 OK - 145ms',
];

export default function LiveSystemLogs() {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial boot sequence
    setLogs([
      'INIT: Booting Abhinav.S Portfolio Server...',
      '[System] Loading microservices...',
    ]);

    let logIndex = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLogs = [...prev, mockLogs[logIndex % mockLogs.length]];
        // Keep only last 20 logs
        if (newLogs.length > 20) return newLogs.slice(newLogs.length - 20);
        return newLogs;
      });
      logIndex++;
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed bottom-[80px] lg:bottom-0 right-0 w-full lg:w-[400px] h-[300px] lg:h-screen bg-black/90 border-l-2 border-t-2 border-[#00FF41] z-50 flex flex-col pointer-events-none p-4">
      <div className="border-b border-[#00FF41]/50 pb-2 mb-4 flex justify-between items-center">
        <span className="font-space text-[#00FF41] text-xs font-bold tracking-widest">
          TERMINAL // LIVE_SYSTEM_LOGS
        </span>
        <div className="w-2 h-2 bg-[#00FF41] animate-pulse"></div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-hidden font-space text-[10px] md:text-xs text-[#00FF41]/80 flex flex-col gap-1">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="opacity-50">{`[${new Date().toISOString().split('T')[1].split('.')[0]}]`}</span>
            <span>{log}</span>
          </div>
        ))}
        <div className="animate-pulse mt-2">_</div>
      </div>
    </div>
  );
}
