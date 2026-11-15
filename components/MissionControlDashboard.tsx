'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Cpu,
  TestTube2,
  Atom,
  Database,
  ExternalLink,
  Award
} from 'lucide-react';

interface MissionControlDashboardProps {
  selectedSite: LandingSitePreset;
  onSelectSite: (site: LandingSitePreset) => void;
  activeRoute: RouteOption | null;
  telemetry: EnvironmentalTelemetry | null;
  onNavigateTab?: (tab: 'map' | 'routes' | 'environment' | 'science') => void;
  onOpenReport?: () => void;
}

export const MissionControlDashboard: React.FC<MissionControlDashboardProps> = ({
  selectedSite,
  onSelectSite,
  activeRoute,
  telemetry,
  onNavigateTab,
  onOpenReport
}) => {
  const [dossierTab, setDossierTab] = useState<
    'stratigraphy' | 'mineralogy' | 'samples' | 'astrobiology'
  >('stratigraphy');

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
          <Link
            href="/briefing"
            className="px-3.5 py-1.5 rounded-lg bg-mars-dark border border-mars-border text-xs text-gray-200 hover:text-white hover:border-mars-orange flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-mars-orange" />
            <span>Mission Briefing</span>
          </Link>
          <Link
            href="/routes"
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-mars-red to-mars-orange text-white text-xs font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Route Optimizer</span>
          </Link>
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
            <span className="text-[10px] text-gray-400">Click & drag to rotate</span>
          </div>

          <MarsGlobe
            selectedSite={selectedSite}
            onSelectSite={onSelectSite}
            width={280}
            height={280}
          />

          <div className="w-full mt-3 p-2 rounded-lg bg-black/40 border border-mars-border text-[11px] space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Selected Sector:</span>
              <span className="font-bold text-white">{selectedSite.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Coordinates:</span>
              <span className="text-mars-cyan">
                {selectedSite.center.lat}°N, {selectedSite.center.lon}°E
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">MOLA Datum Elev:</span>
              <span className="text-white">{selectedSite.elevationMeters} m</span>
            </div>
          </div>
        </div>

        {/* Comprehensive Planetary Science Dossier */}
        <div className="lg:col-span-2 p-5 bg-mars-panel rounded-xl border border-mars-border flex flex-col justify-between shadow-xl space-y-3">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-mars-border pb-2 mb-2.5">
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

            <p className="text-xs text-gray-300 leading-relaxed mb-3">
              {selectedSite.geologicContext}
            </p>

            {/* Dossier Tabs */}
            <div className="flex items-center gap-1 border-b border-mars-border/80 pb-1.5 mb-3 text-[11px]">
              <button
                onClick={() => setDossierTab('stratigraphy')}
                className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
                  dossierTab === 'stratigraphy'
                    ? 'bg-mars-red text-white font-bold shadow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Stratigraphy & Epochs</span>
              </button>
              <button
                onClick={() => setDossierTab('mineralogy')}
                className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
                  dossierTab === 'mineralogy'
                    ? 'bg-mars-red text-white font-bold shadow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Atom className="w-3.5 h-3.5" />
                <span>CRISM Mineralogy</span>
              </button>
              {selectedSite.cachedSampleTubes && selectedSite.cachedSampleTubes.length > 0 && (
                <button
                  onClick={() => setDossierTab('samples')}
                  className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
                    dossierTab === 'samples'
                      ? 'bg-mars-red text-white font-bold shadow'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <TestTube2 className="w-3.5 h-3.5" />
                  <span>NASA Sample Tubes ({selectedSite.cachedSampleTubes.length})</span>
                </button>
              )}
              <button
                onClick={() => setDossierTab('astrobiology')}
                className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
                  dossierTab === 'astrobiology'
                    ? 'bg-mars-red text-white font-bold shadow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Astrobiology & Regolith</span>
              </button>
            </div>

            {/* Tab 1: Chronostratigraphic Column */}
            {dossierTab === 'stratigraphy' && (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {selectedSite.chronostratigraphy && selectedSite.chronostratigraphy.length > 0 ? (
                  selectedSite.chronostratigraphy.map((unit, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-black/40 border border-mars-border/60 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{unit.formationName}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-mars-rust/20 text-mars-orange border border-mars-rust/40">
                          {unit.epoch} ({unit.ageGa} Ga)
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400">
                        <span className="text-gray-300">Lithology:</span> {unit.lithology} •{' '}
                        <span className="text-mars-cyan">{unit.layerThicknessM}m thickness</span>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-normal">
                        {unit.depositionalEnvironment}
                      </p>
                      {unit.sampleEvidence && (
                        <div className="text-[10px] text-emerald-400 pt-0.5">
                          ✓ Ground Truth: {unit.sampleEvidence}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-400">
                    Chronostratigraphic profile calibrated to MGS MOLA and regional USGS geologic maps.
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: CRISM Spectral Mineralogy */}
            {dossierTab === 'mineralogy' && (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {selectedSite.crismMineralogy && selectedSite.crismMineralogy.length > 0 ? (
                  selectedSite.crismMineralogy.map((min, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-black/40 border border-mars-border/60 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{min.name}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                            min.abundanceLevel === 'DOMINANT'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {min.abundanceLevel} • {min.instrument}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-mars-cyan">{min.formula}</div>
                      <p className="text-[11px] text-gray-300">{min.scientificImplication}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-400">
                    Spectral mineralogy awaiting CRISM targeted observation synthesis.
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: NASA Cached Sample Tubes */}
            {dossierTab === 'samples' && selectedSite.cachedSampleTubes && (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {selectedSite.cachedSampleTubes.map((tube) => (
                  <div
                    key={tube.tubeId}
                    className="p-2.5 rounded bg-black/40 border border-mars-cyan/40 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-mars-cyan">{tube.tubeId}</span>
                        <span className="font-bold text-white">"{tube.coreName}"</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400">
                        Score: {tube.targetAstrobiologyScore}/100
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[10px] text-gray-400 bg-black/50 p-1.5 rounded">
                      <div>
                        <span>Sol:</span> <span className="text-white font-bold">{tube.sol}</span>
                      </div>
                      <div>
                        <span>Core:</span>{' '}
                        <span className="text-white font-bold">{tube.coreLengthMm} mm</span>
                      </div>
                      <div>
                        <span>Type:</span>{' '}
                        <span className="text-mars-orange font-bold truncate">{tube.rockType}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-300 leading-normal">{tube.sampleContext}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Astrobiology & Geotechnical Regolith Properties */}
            {dossierTab === 'astrobiology' && (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
                {selectedSite.astrobiologyAssessment && (
                  <div className="p-2.5 rounded bg-black/40 border border-mars-border/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Astrobiological Habitability Grade</span>
                      <span className="text-sm font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700">
                        Grade {selectedSite.astrobiologyAssessment.habitabilityGrade}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-300">
                      <span className="text-gray-400">Preservation Window:</span>{' '}
                      {selectedSite.astrobiologyAssessment.preservationWindow}
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      {selectedSite.astrobiologyAssessment.taphonomyNotes}
                    </p>
                    <div className="text-[10px] text-mars-sand">
                      Cosmic Ray Radiation Degradation Depth:{' '}
                      <span className="text-white font-bold">
                        {selectedSite.astrobiologyAssessment.radiationDegradationDepthM} meters
                      </span>
                    </div>
                  </div>
                )}

                {selectedSite.geotechnicalProperties && (
                  <div className="p-2.5 rounded bg-black/40 border border-mars-border/60 space-y-1">
                    <div className="font-bold text-mars-orange text-[11px]">
                      GEOTECHNICAL TRAVERSABILITY & RECONNAISSANCE
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="text-gray-400">Regolith Bearing Capacity:</span>{' '}
                        <span className="font-bold text-white">
                          {selectedSite.geotechnicalProperties.regolithBearingCapacityKPa} kPa
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Internal Friction Angle:</span>{' '}
                        <span className="font-bold text-white">
                          {selectedSite.geotechnicalProperties.soilInternalFrictionAngleDeg}°
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Rock Abundance (CFA):</span>{' '}
                        <span className="font-bold text-white">
                          {selectedSite.geotechnicalProperties.rockAbundancePercent}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Wheel Slip Hazard:</span>{' '}
                        <span
                          className={`font-bold ${
                            selectedSite.geotechnicalProperties.wheelSlipHazardLevel === 'LOW'
                              ? 'text-emerald-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {selectedSite.geotechnicalProperties.wheelSlipHazardLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Action Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-mars-border">
            <Link
              href="/map"
              className="p-2.5 rounded-lg bg-mars-dark border border-mars-border hover:border-mars-cyan text-xs font-bold text-gray-200 hover:text-white flex items-center justify-between transition-all"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-mars-cyan" />
                Open GIS Map
              </span>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </Link>
            <Link
              href="/routes"
              className="p-2.5 rounded-lg bg-mars-dark border border-mars-border hover:border-mars-orange text-xs font-bold text-gray-200 hover:text-white flex items-center justify-between transition-all"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-mars-orange" />
                Traverse Plan
              </span>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </Link>
            <Link
              href="/science"
              className="p-2.5 rounded-lg bg-mars-dark border border-mars-border hover:border-mars-sand text-xs font-bold text-gray-200 hover:text-white flex items-center justify-between transition-all col-span-2 sm:col-span-1"
            >
              <span className="flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5 text-mars-sand" />
                NASA Archives
              </span>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </Link>
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
              SURFACE ENVIRONMENTAL OVERVIEW (MEDA SENSOR SUITE)
            </span>
            <Link
              href="/environment"
              className="text-[10px] text-mars-cyan hover:underline flex items-center gap-1"
            >
              <span>Full HUD</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-black/40 p-2 rounded border border-mars-border/50">
              <span className="text-[10px] text-gray-400 block">AIR TEMP (ATS)</span>
              <span className="font-bold text-white text-sm">
                {telemetry?.temperature.current ?? -65}°C
              </span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-mars-border/50">
              <span className="text-[10px] text-gray-400 block">PRESSURE (PS)</span>
              <span className="font-bold text-mars-cyan text-sm">
                {telemetry?.pressure.current ?? 735} Pa
              </span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-mars-border/50">
              <span className="text-[10px] text-gray-400 block">DUST TAU (RDS)</span>
              <span className="font-bold text-amber-400 text-sm">
                {telemetry?.dustOpticalDepth.tau ?? 0.42}
              </span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-mars-border/50">
              <span className="text-[10px] text-gray-400 block">HUMIDITY (HS)</span>
              <span className="font-bold text-cyan-400 text-sm">
                {telemetry?.medaSensorSuite?.hsRelativeHumidityPct ?? 18}% RH
              </span>
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
            <Link
              href="/routes"
              className="text-[10px] text-mars-orange hover:underline flex items-center gap-1"
            >
              <span>Optimizer</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {activeRoute ? (
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{activeRoute.title}</span>
                <span className="text-xs font-bold text-mars-orange">
                  Score: {activeRoute.overallScore}/100
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 bg-black/40 p-2 rounded border border-mars-border/50 text-[11px]">
                <div>
                  <span className="text-gray-400 block text-[10px]">DISTANCE</span>
                  <span className="font-bold text-white">{activeRoute.totalDistanceKm} km</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">DURATION</span>
                  <span className="font-bold text-white">
                    {activeRoute.estimatedDurationHours} hrs
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">O2 EXPENDITURE</span>
                  <span className="font-bold text-mars-cyan">
                    {activeRoute.oxygenConsumptionLiters} L
                  </span>
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
              <div className="font-bold text-white truncate" title={d.name}>
                {d.name}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                {d.mission} • {d.instrument}
              </div>
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
