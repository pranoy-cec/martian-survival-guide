'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Satellite,
  Sun,
  MapPin,
  Sparkles,
  Map as MapIcon,
  Activity,
  Atom,
  CircleDot,
  FileText
} from 'lucide-react';
import { LANDING_SITES } from '@/lib/data/landingSites';
import { LandingSitePreset, EnvironmentalTelemetry } from '@/lib/types';

interface HeaderProps {
  selectedSite: LandingSitePreset;
  onSelectSite: (site: LandingSitePreset) => void;
  telemetry: EnvironmentalTelemetry | null;
}

export const Header: React.FC<HeaderProps> = ({
  selectedSite,
  onSelectSite,
  telemetry
}) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Mission Control', icon: Compass },
    { href: '/map', label: 'Martian GIS Map', icon: MapIcon },
    { href: '/routes', label: 'Route Optimizer', icon: Sparkles },
    { href: '/environment', label: 'Atmosphere & MEDA', icon: Activity },
    { href: '/science', label: 'Science Dossier', icon: Atom },
    { href: '/craters', label: 'Crater Archive', icon: CircleDot },
    { href: '/briefing', label: 'Flight Briefing', icon: FileText }
  ];

  return (
    <header className="bg-mars-panel border-b border-mars-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-sm z-30 select-none">
      {/* Brand & Challenge Title */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity">
        <div className="w-9 h-9 rounded bg-mars-red/20 border border-mars-red flex items-center justify-center text-mars-orange shadow-inner">
          <Compass className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider text-base text-mars-orange glow-orange">
              ARES VANGUARD
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-mars-red/30 text-mars-sand border border-mars-red/50">
              NASA SPACE APPS 2026
            </span>
          </div>
          <p className="text-xs text-gray-400 font-mono hidden sm:block">
            Interplanetary Survival Guide & Science–Safety Route Optimizer
          </p>
        </div>
      </Link>

      {/* Landing Site Sector Selector */}
      <div className="flex items-center gap-2 bg-mars-dark px-2.5 py-1.5 rounded-lg border border-mars-border">
        <MapPin className="w-4 h-4 text-mars-orange shrink-0" />
        <span className="text-xs font-mono text-gray-400 hidden md:inline">SECTOR:</span>
        <select
          value={selectedSite.id}
          onChange={(e) => {
            const found = LANDING_SITES.find((s) => s.id === e.target.value);
            if (found) onSelectSite(found);
          }}
          className="bg-transparent text-xs font-semibold text-gray-200 focus:outline-none cursor-pointer pr-2 font-mono"
        >
          {LANDING_SITES.map((site) => (
            <option key={site.id} value={site.id} className="bg-mars-panel text-gray-200">
              {site.name} ({site.historicMission.split(' ')[0]})
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Links for Each Dedicated Page */}
      <nav className="flex items-center gap-1 bg-mars-dark/80 p-1 rounded-lg border border-mars-border overflow-x-auto max-w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-2.5 py-1 rounded text-xs font-medium font-mono flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-mars-red text-white shadow font-bold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-mars-panel'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mission Clock & Link Telemetry */}
      <div className="hidden xl:flex items-center gap-4 text-xs font-mono text-gray-300">
        <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-mars-border">
          <Sun className="w-3.5 h-3.5 text-mars-sand" />
          <span>SOL {telemetry?.sol ?? 1326}</span>
          <span className="text-gray-500">|</span>
          <span className="text-mars-cyan">LTST {telemetry?.ltst ?? '13:45'}</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400">Ls {telemetry?.ls ?? 84}°</span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/40">
          <Satellite className="w-3.5 h-3.5 animate-pulse" />
          <span>MRO RELAY: NOMINAL</span>
        </div>
      </div>
    </header>
  );
};
