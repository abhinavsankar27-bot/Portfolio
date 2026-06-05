'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type UiMode = 'RENDERED' | 'RAW';

interface UiModeContextType {
  mode: UiMode;
  toggleMode: () => void;
}

const UiModeContext = createContext<UiModeContextType | undefined>(undefined);

export function UiModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<UiMode>('RENDERED');

  const toggleMode = () => {
    setMode((prev) => (prev === 'RENDERED' ? 'RAW' : 'RENDERED'));
  };

  return (
    <UiModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </UiModeContext.Provider>
  );
}

export function useUiMode() {
  const context = useContext(UiModeContext);
  if (context === undefined) {
    throw new Error('useUiMode must be used within a UiModeProvider');
  }
  return context;
}
