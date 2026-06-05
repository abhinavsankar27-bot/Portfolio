import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Ranchers, Space_Mono, Plus_Jakarta_Sans, Archivo } from 'next/font/google';
import BrutalistCursor from './homepage/components/BrutalistCursor';
import { UiModeProvider } from '../context/UiModeContext';
import '../styles/tailwind.css';

const ranchers = Ranchers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-ranchers',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Abhinav Sankar — Cloud & AI Systems Engineer',
  description: 'MCA student from Kerala building scalable cloud, AI, and backend systems. Explore projects in Flask, ML, and AWS on this portfolio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ranchers.variable} ${spaceMono.variable} ${jakarta.variable} ${archivo.variable}`}>
      <body className="font-jakarta bg-disruptor-dark text-disruptor-white antialiased">
        <UiModeProvider>
          <BrutalistCursor />
          {children}
        </UiModeProvider>
      </body>
    </html>
  );
}