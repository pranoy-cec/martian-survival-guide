'use client';

import React, { useState } from 'react';
import { useMission } from '@/context/MissionContext';
import {
  FileText,
  Download,
  Printer,
  CheckCircle,
  AlertTriangle,
  Compass,
  MapPin,
  Shield,
  Activity,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function BriefingPage() {
  const { selectedSite, activeRoute, telemetry } = useMission();
  const [copied, setCopied] = useState(false);

  const handleDownloadJson = () => {
    const reportData = {
      platform: 'ARES Vanguard — Interplanetary Survival Guide',
      generatedAtUtc: new Date().toISOString(),
      sector: selectedSite,
      activeTraversePlan: activeRoute,
      environmentalTelemetry: telemetry,
      compliance: 'NASA-STD-3001 Vol 1/2 EVA Standards'
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ARES_Mission_Briefing_${selectedSite.id}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyClipboard = () => {
    const text = `ARES MISSION BRIEFING — ${selectedSite.name}\nSector Datum Elev: ${selectedSite.elevationMeters}m\nSelected Route: ${activeRoute?.title || 'None'}\nDistance: ${activeRoute?.totalDistanceKm || 0} km | Duration: ${activeRoute?.estimatedDurationHours || 0} hrs\nO2 Consumption: ${activeRoute?.oxygenConsumptionLiters || 0} L | Safety Score: ${activeRoute?.safetyScore || 0}/100`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-mars-dark text-gray-200 overflow-y-auto p-4 space-y-4 font-mono select-none">
      {/* Top Banner */}
      <div className="p-4 bg-mars-panel border border-mars-border rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-mars-orange animate-pulse" />
            <h1 className="text-base font-bold text-white tracking-wide">
              ARES EVA FLIGHT PLAN BRIEFING & MISSION DOSSIER
            </h1>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              MISSION READY
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Formal mission flight authorization dossier formatted for astronaut extravehicular activity (EVA) and NASA science archives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyClipboard}
            className="px-3.5 py-1.5 rounded-lg bg-mars-dark border border-mars-border text-xs text-gray-200 hover:text-white flex items-center gap-1.5 transition-all"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>
          <button
            onClick={handleDownloadJson}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-mars-red to-mars-orange text-white text-xs font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Mission JSON</span>
          </button>
        </div>
      </div>

      {/* Main Dossier Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Sector & Environmental Authorization */}
        <div className="space-y-4">
          {/* Target Sector Card */}
          <div className="p-4 bg-mars-panel border border-mars-border rounded-xl space-y-2 shadow-lg">
            <div className="flex items-center justify-between border-b border-mars-border pb-1.5">
              <span className="text-xs font-bold text-mars-orange flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                EXPLORATION SECTOR
              </span>
              <span className="text-[10px] text-gray-400">{selectedSite.historicMission.split(' ')[0]}</span>
            </div>
            <div className="text-sm font-bold text-white">{selectedSite.name}</div>
            <div className="text-xs text-mars-cyan">
              {selectedSite.center.lat}°N, {selectedSite.center.lon}°E (Datum Elev: {selectedSite.elevationMeters}m)
            </div>
            <p className="text-xs text-gray-300 leading-relaxed pt-1">
              {selectedSite.geologicContext}
            </p>
          </div>

          {/* Environmental Authorization Status */}
          <div className="p-4 bg-mars-panel border border-mars-border rounded-xl space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between border-b border-mars-border pb-1.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-mars-cyan" />
                ENVIRONMENTAL GO / NO-GO CRITERIA
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">GO FOR EVA</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between p-1.5 rounded bg-black/40">
                <span className="text-gray-400">Surface Air Temp:</span>
                <span className="text-white font-bold">{telemetry?.temperature.current ?? -65}°C</span>
              </div>
              <div className="flex justify-between p-1.5 rounded bg-black/40">
                <span className="text-gray-400">Atm Pressure:</span>
                <span className="text-mars-cyan font-bold">{telemetry?.pressure.current ?? 735} Pa</span>
              </div>
              <div className="flex justify-between p-1.5 rounded bg-black/40">
                <span className="text-gray-400">Dust Optical Depth:</span>
                <span className="text-amber-400 font-bold">τ = {telemetry?.dustOpticalDepth.tau ?? 0.42}</span>
              </div>
              <div className="flex justify-between p-1.5 rounded bg-black/40">
                <span className="text-gray-400">Ionizing Radiation:</span>
                <span className="text-emerald-400 font-bold">
                  {telemetry?.radiation.ionizingDoseRateMgyPerDay ?? 0.64} mGy/day
                </span>
              </div>
              <div className="flex justify-between p-1.5 rounded bg-black/40">
                <span className="text-gray-400">Max Safe EVA Limit:</span>
                <span className="text-white font-bold">{telemetry?.radiation.safeEvaTimeHours ?? 8.0} Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Active Traverse Flight Plan & Tradeoff Analysis */}
        <div className="lg:col-span-2 space-y-4">
          {activeRoute ? (
            <div className="p-5 bg-mars-panel border border-mars-border rounded-xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-mars-border pb-2">
                <div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-mars-red/20 text-mars-orange border border-mars-red/40">
                    APPROVED TRAVERSE STRATEGY: {activeRoute.type}
                  </span>
                  <h2 className="text-base font-bold text-white mt-1">{activeRoute.title}</h2>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Composite Score</div>
                  <div className="text-lg font-bold text-mars-orange">{activeRoute.overallScore}/100</div>
                </div>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-black/50 p-2.5 rounded-lg border border-mars-border/60">
                  <span className="text-gray-400 block text-[10px]">TOTAL DISTANCE</span>
                  <span className="text-white font-bold text-sm">{activeRoute.totalDistanceKm} km</span>
                </div>
                <div className="bg-black/50 p-2.5 rounded-lg border border-mars-border/60">
                  <span className="text-gray-400 block text-[10px]">EST. DURATION</span>
                  <span className="text-white font-bold text-sm">{activeRoute.estimatedDurationHours} hrs</span>
                </div>
                <div className="bg-black/50 p-2.5 rounded-lg border border-mars-border/60">
                  <span className="text-gray-400 block text-[10px]">O2 CONSUMPTION</span>
                  <span className="text-mars-cyan font-bold text-sm">{activeRoute.oxygenConsumptionLiters} L</span>
                </div>
                <div className="bg-black/50 p-2.5 rounded-lg border border-mars-border/60">
                  <span className="text-gray-400 block text-[10px]">MAX SLOPE</span>
                  <span className="text-amber-400 font-bold text-sm">{activeRoute.maxSlopeDeg}°</span>
                </div>
              </div>

              {/* Waypoints Breakdown */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-white uppercase flex items-center justify-between">
                  <span>WAYPOINT SEQUENCE ({activeRoute.waypoints.length} LEGS)</span>
                  <Link href="/routes" className="text-[10px] text-mars-cyan hover:underline">
                    Edit in Optimizer →
                  </Link>
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {activeRoute.waypoints.map((wp, idx) => (
                    <div
                      key={wp.id}
                      className="p-2 rounded bg-black/40 border border-mars-border/50 text-xs flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-mars-red/20 text-mars-orange flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-bold text-white">{wp.name}</div>
                          <div className="text-[10px] text-gray-400">
                            {wp.coordinate.lat.toFixed(3)}°N, {wp.coordinate.lon.toFixed(3)}°E • Elev: {wp.elevationMeters}m
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-[11px]">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            wp.hazardLevel === 'NOMINAL'
                              ? 'text-emerald-400'
                              : wp.hazardLevel === 'MODERATE'
                              ? 'text-amber-400'
                              : 'text-red-400'
                          }`}
                        >
                          {wp.hazardLevel} ({wp.slopeDeg}°)
                        </span>
                        <div className="text-gray-500 text-[10px]">{wp.cumulativeTimeMin} min</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tradeoff Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-mars-border/60 text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1 text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    STRATEGIC ADVANTAGES:
                  </div>
                  <ul className="list-disc list-inside text-gray-300 text-[11px] space-y-0.5">
                    {activeRoute.tradeoffAnalysis.advantages.map((adv, idx) => (
                      <li key={idx}>{adv}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1 text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    OPERATIONAL CAUTIONS:
                  </div>
                  <ul className="list-disc list-inside text-gray-300 text-[11px] space-y-0.5">
                    {activeRoute.tradeoffAnalysis.disadvantages.map((dis, idx) => (
                      <li key={idx}>{dis}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-mars-panel border border-mars-border rounded-xl text-center space-y-3">
              <Sparkles className="w-8 h-8 text-mars-orange mx-auto animate-pulse" />
              <p className="text-xs text-gray-300">
                No active route activated yet. Head to the Route Optimizer to generate Pareto-optimal flight plans.
              </p>
              <Link
                href="/routes"
                className="inline-block px-4 py-2 rounded-lg bg-mars-red text-white text-xs font-bold"
              >
                Go to Route Optimizer
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
