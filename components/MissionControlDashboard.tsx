'use client';

import React from 'react';
import { MarsGlobe } from './MarsGlobe';
import { LandingSitePreset, RouteOption, EnvironmentalTelemetry } from '@/lib/types';
import { PLANETARY_DATASETS } from '@/lib/data/datasets';
import {
  Compass,
  MapPin,
  Sparkles,
  Shield,
  Activity,
  Satellite,
  Thermometer,
  Layers,
  FileText,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface MissionControlDashboardProps {
  selectedSite: LandingSitePreset;
  onSelectSite: (site: LandingSitePreset) => void;
  activeRoute: RouteOption | null;
  telemetry: EnvironmentalTelemetry | null;
  onNavigateTab: (tab: 'map' | 'routes' | 'environment' | 'science') => void;
  onOpenReport: () => void;
}

export const MissionControlDashboard: React.FC<MissionControlDashboardProps> = ({
  selectedSite,
  onSelectSite,
  activeRoute,
  telemetry,
  onNavigateTab,
  onOpenReport
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-mars-dark text-gray-200 overflow-y-auto p-4 space-y-4 font-mono select-none">
      {/* Top Banner */}
      <div className="p-4 bg-mars-panel border border-mars-border rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-mars-red/20 border border-mars-red flex items-center justify-center text-mars-orange shadow-inner">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-wider glow-orange">
                ARES MISSION CONTROL COMMAND
              </h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                SYSTEMS OPERATIONAL
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Advanced Martian Exploration & Survival Platform • NASA Planetary Science Integration
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenReport}
            disabled={!activeRoute}
            className="px-3.5 py-1.5 rounded-lg bg-mars-dark border border-mars-border text-xs text-gray-200 hover:text-white hover:border-mars-orange flex items-center gap-1.5 transition-all disabled:opacity-40"
          >
            <FileText className="w-3.5 h-3.5 text-mars-orange" />
            <span>Generate Briefing</span>
          </button>
          <button
            onClick={() => onNavigateTab('routes')}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-mars-red to-mars-orange text-white text-xs font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Route Optimizer</span>
          </button>
        </div>
      </div>

      {/* Main Command Grid: 3D Mars Globe + Exploration Sector Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Animated Mars Globe Canvas */}
        <div className="p-4 bg-mars-panel rounded-xl border border-mars-border flex flex-col items-center justify-between shadow-xl">
          <div className="w-full flex items-center justify-between border-b border-mars-border/60 pb-2 mb-2">
            <span className="text-xs font-bold text-mars-orange flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5" />
              PLANETARY RECONNAISSANCE GLOBE
            </span>
            <span className="text-[10px] text-gray-400">Click to rotate target</span>
          </div>

          <MarsGlobe
            selectedSite={selectedSite}
            onSelectSite={onSelectSite}
            width={260}
            height={260}
          />

          <div className="w-full mt-3 p-2 rounded-lg bg-black/40 border border-mars-border text-[11px] space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Selected Sector:</span>
              <span className="font-bold text-white">{selectedSite.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sector Coordinates:</span>
              <span className="text-mars-cyan">{selectedSite.center.lat}°N, {selectedSite.center.lon}°E</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Datum Elevation:</span>
              <span className="text-white">{selectedSite.elevationMeters} m MOLA</span>
            </div>
          </div>
        </div>

        {/* Selected Sector Science & Geologic Dossier */}
        <div className="lg:col-span-2 p-5 bg-mars-panel rounded-xl border border-mars-border flex flex-col justify-between shadow-xl space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-mars-border pb-2 mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-mars-red" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {selectedSite.name}
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-mars-red/20 text-mars-sand border border-mars-red/40">
                {selectedSite.historicMission}
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              {selectedSite.geologicContext}
            </p>

            <div className="space-y-2 mb-4">
              <div className="text-[11px] font-bold text-mars-cyan uppercase tracking-wider">
                PRIMARY SCIENTIFIC & EXPLORATION OBJECTIVES:
              </div>
              <div className="space-y-1.5">
                {selectedSite.keyScienceGoals.map((goal, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-300 bg-black/30 p-2 rounded border border-mars-border/40">
                    <span className="w-4 h-4 rounded-full bg-mars-cyan/20 text-mars-cyan flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-mars-border">
            <button
              onClick={() => onNavigateTab('map')}
              className="p-2.5 rounded-lg bg-mars-dark border border-mars-border hover:border-mars-cyan text-xs font-bold text-gray-200 hover:text-white flex items-center justify-between transition-all"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-mars-cyan" />
                Open GIS Map
              </span>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </button>
            <button
              onClick={() => onNavigateTab('routes')}
              className="p-2.5 rounded-lg bg-mars-dark border border-mars-border hover:border-mars-orange text-xs font-bold text-gray-200 hover:text-white flex items-center justify-between transition-all"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-mars-orange" />
                Traverse Plan
              </span>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </button>
            <button
              onClick={() => onNavigateTab('science')}
              className="p-2.5 rounded-lg bg-mars-dark border border-mars-border hover:border-mars-sand text-xs font-bold text-gray-200 hover:text-white flex items-center justify-between transition-all col-span-2 sm:col-span-1"
            >
              <span className="flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5 text-mars-sand" />
                NASA Archives
              </span>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Second Row: Environmental Telemetry Quick Strip + Active Route Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Environmental Quick Strip */}
        <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-mars-border pb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-mars-cyan" />
              SURFACE ENVIRONMENTAL OVERVIEW (MEDA)
            </span>
            <button
              onClick={() => onNavigateTab('environment')}
              className="text-[10px] text-mars-cyan hover:underline flex items-center gap-1"
            >
              <span>Full HUD</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-black/40 p-2 rounded border border-mars-border/50">
              <span className="text-[10px] text-gray-400 block">AIR TEMP</span>
              <span className="font-bold text-white text-sm">{telemetry?.temperature.current ?? -65}°C</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-mars-border/50">
              <span className="text-[10px] text-gray-400 block">PRESSURE</span>
              <span className="font-bold text-mars-cyan text-sm">{telemetry?.pressure.current ?? 735} Pa</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-mars-border/50">
              <span className="text-[10px] text-gray-400 block">DUST TAU (τ)</span>
              <span className="font-bold text-amber-400 text-sm">{telemetry?.dustOpticalDepth.tau ?? 0.42}</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-mars-border/50">
              <span className="text-[10px] text-gray-400 block">RAD DOSE</span>
              <span className="font-bold text-emerald-400 text-sm">{telemetry?.radiation.ionizingDoseRateMgyPerDay ?? 0.64} mGy</span>
            </div>
          </div>
        </div>

        {/* Active Flight Plan Quick Card */}
        <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-mars-border pb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              ACTIVE MARSWALK FLIGHT PLAN
            </span>
            <button
              onClick={() => onNavigateTab('routes')}
              className="text-[10px] text-mars-orange hover:underline flex items-center gap-1"
            >
              <span>Optimizer</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {activeRoute ? (
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{activeRoute.title}</span>
                <span className="text-xs font-bold text-mars-orange">Score: {activeRoute.overallScore}/100</span>
              </div>
              <div className="grid grid-cols-3 gap-2 bg-black/40 p-2 rounded border border-mars-border/50 text-[11px]">
                <div>
                  <span className="text-gray-400 block text-[10px]">DISTANCE</span>
                  <span className="font-bold text-white">{activeRoute.totalDistanceKm} km</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">DURATION</span>
                  <span className="font-bold text-white">{activeRoute.estimatedDurationHours} hrs</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">O2 EXPENDITURE</span>
                  <span className="font-bold text-mars-cyan">{activeRoute.oxygenConsumptionLiters} L</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-xs py-2">
              No active route activated. Launch the Science-Safety Route Optimizer to plan traverse.
            </div>
          )}
        </div>
      </div>

      {/* Planetary Datasets Integrity Registry */}
      <div className="p-4 bg-black/40 rounded-xl border border-mars-border/70 space-y-2 text-xs">
        <div className="flex items-center justify-between text-gray-300 font-bold border-b border-mars-border/60 pb-1.5">
          <span className="flex items-center gap-1.5 text-mars-orange">
            <Cpu className="w-4 h-4" />
            INTEGRATED NASA & USGS PLANETARY SCIENCE DATASETS
          </span>
          <span className="text-[10px] text-emerald-400">8 OF 8 SERVICES ONLINE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1 text-[11px]">
          {PLANETARY_DATASETS.slice(0, 4).map((d) => (
            <div key={d.id} className="p-2 rounded bg-mars-dark/80 border border-mars-border/50">
              <div className="font-bold text-white truncate" title={d.name}>{d.name}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{d.mission} • {d.instrument}</div>
              <div className="text-[10px] text-mars-cyan mt-1 flex items-center justify-between">
                <span>{d.spatialResolution}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
