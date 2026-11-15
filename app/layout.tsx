import type { Metadata } from 'next';
import './globals.css';
import { MissionProvider } from '@/context/MissionContext';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'ARES — Advanced Martian Exploration & Survival System | NASA Space Apps 2026',
  description:
    'Layered planetary GIS, MOLA terrain intelligence, and multi-objective Science-Safety route optimization platform for human Martian exploration.',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-mars-darkest text-slate-100 min-h-screen overflow-hidden">
        <MissionProvider>
          <AppShell>{children}</AppShell>
        </MissionProvider>
      </body>
    </html>
  );
}
