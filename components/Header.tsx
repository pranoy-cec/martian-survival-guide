'use client';

import React from 'react';
import { Compass, Satellite, ShieldCheck, Sun, MapPin, Sparkles } from 'lucide-react';
import { LANDING_SITES } from '@/lib/data/landingSites';
import { LandingSitePreset, EnvironmentalTelemetry } from '@/lib/types';

interface HeaderProps {
  selectedSite: LandingSitePreset;
  onSelectSite: (site: LandingSitePreset) => void;
  telemetry: EnvironmentalTelemetry | null;
  activeTab: 'dashboard' | 'map' | 'routes' | 'environment' | 'science';
  setActiveTab: (tab: 'dashboard' | 'map' | 'routes' | 'environment' | 'science') => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedSite,
  onSelectSite,
  telemetry,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="bg-mars-panel border-b border-mars-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-sm z-30 select-none">
      {/* Brand & Challenge Title */}
      <div className="flex items-center gap-3">
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
      </div>

      {/* Landing Site Sector Selector */}
      <div className="flex items-center gap-2 bg-mars-dark px-2.5 py-1.5 rounded-lg border border-mars-border">
        <MapPin className="w-4 h-4 text-mars-orange shrink-0" />
        <span className="text-xs font-mono text-gray-400 hidden md:inline">SECTOR:</span>
        <select
          value={selectedSite.id}
          onChange={(e) => {
            const found = LANDING_SITES.find(s => s.id === e.target.value);
            if (found) onSelectSite(found);
          }}
          className="bg-transparent text-xs font-semibold text-gray-200 focus:outline-none cursor-pointer pr-2"
        >
          {LANDING_SITES.map((site) => (
            <option key={site.id} value={site.id} className="bg-mars-panel text-gray-200">
              {site.name} ({site.historicMission.split(' ')[0]})
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 bg-mars-dark/80 p-1 rounded-lg border border-mars-border">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-3 py-1 rounded text-xs font-medium transition-all ${
            activeTab === 'dashboard'
              ? 'bg-mars-red text-white shadow'
              : 'text-gray-400 hover:text-gray-200 hover:bg-mars-panel'
          }`}
        >
          Mission Control
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`px-3 py-1 rounded text-xs font-medium transition-all ${
            activeTab === 'map'
              ? 'bg-mars-red text-white shadow'
              : 'text-gray-400 hover:text-gray-200 hover:bg-mars-panel'
          }`}
        >
          Martian GIS Map
        </button>
        <button
          onClick={() => setActiveTab('routes')}
          className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
            activeTab === 'routes'
              ? 'bg-mars-red text-white shadow'
              : 'text-gray-400 hover:text-gray-200 hover:bg-mars-panel'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-mars-orange" />
          Route Optimizer
        </button>
        <button
          onClick={() => setActiveTab('environment')}
          className={`px-3 py-1 rounded text-xs font-medium transition-all ${
            activeTab === 'environment'
              ? 'bg-mars-red text-white shadow'
              : 'text-gray-400 hover:text-gray-200 hover:bg-mars-panel'
          }`}
        >
          Atmosphere & MEDA
        </button>
        <button
          onClick={() => setActiveTab('science')}
          className={`px-3 py-1 rounded text-xs font-medium transition-all ${
            activeTab === 'science'
              ? 'bg-mars-red text-white shadow'
              : 'text-gray-400 hover:text-gray-200 hover:bg-mars-panel'
          }`}
        >
          Science Dossier
        </button>
      </div>

      {/* Mission Clock & Link Telemetry */}
      <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-gray-300">
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
