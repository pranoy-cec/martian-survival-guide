import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ARES — Advanced Martian Exploration & Survival System | NASA Space Apps 2026',
  description: 'Layered planetary GIS, MOLA terrain intelligence, and multi-objective Science-Safety route optimization platform for human Martian exploration.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-mars-darkest text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
