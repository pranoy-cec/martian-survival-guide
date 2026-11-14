'use client';

import React, { useState } from 'react';
import { RouteOption, EnvironmentalTelemetry, LandingSitePreset } from '@/lib/types';
import { FileText, Download, Printer, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, X } from 'lucide-react';

interface MissionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRoute: RouteOption | null;
  site: LandingSitePreset;
  telemetry: EnvironmentalTelemetry | null;
}

export const MissionReportModal: React.FC<MissionReportModalProps> = ({
  isOpen,
  onClose,
  activeRoute,
  site,
  telemetry
}) => {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !activeRoute) return null;

  const downloadJsonReport = async () => {
    setDownloading(true);
    try {
      const res = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          missionName: `ARES EVA Traverse: ${site.name}`,
          siteName: site.name,
          start: activeRoute.waypoints[0].coordinate,
          destination: activeRoute.waypoints[activeRoute.waypoints.length - 1].coordinate,
          routeId: activeRoute.id,
          routeType: activeRoute.type,
          metrics: {
            distanceKm: activeRoute.totalDistanceKm,
            durationHours: activeRoute.estimatedDurationHours,
            elevationGainM: activeRoute.elevationGainMeters,
            maxSlopeDeg: activeRoute.maxSlopeDeg,
            oxygenLiters: activeRoute.oxygenConsumptionLiters,
            safetyScore: activeRoute.safetyScore,
            scienceScore: activeRoute.scienceScore
          },
          waypoints: activeRoute.waypoints,
          environment: telemetry ? {
            source: telemetry.provenance.instrument,
            temperatureRange: `${telemetry.temperature.min}°C to ${telemetry.temperature.max}°C`,
            atmosphericPressure: `${telemetry.pressure.current} Pa`,
            dustOpticalDepthTau: telemetry.dustOpticalDepth.tau,
            cosmicRayDoseRate: `${telemetry.radiation.ionizingDoseRateMgyPerDay} mGy/day`
          } : undefined
        })
      });

      const json = await res.json();
      if (json.success) {
        const reportContent = json.data || json.report;
        const blob = new Blob([JSON.stringify(reportContent, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ARES_MISSION_REPORT_${activeRoute.type.toUpperCase()}_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error('Download report error', e);
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[1300] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-mars-panel border border-mars-orange/60 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 space-y-5 shadow-2xl font-mono text-gray-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-mars-border pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-mars-red text-white">
                NASA EVA BRIEFING
              </span>
              <span className="text-xs text-gray-400">DOC ID: ARES-EVA-{activeRoute.id.toUpperCase()}</span>
            </div>
            <h2 className="text-base font-bold text-white mt-1">
              MISSION BRIEFING: {site.name.toUpperCase()}
            </h2>
            <p className="text-xs text-gray-400">
              Trajectory Strategy: {activeRoute.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 text-lg font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Executive Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 p-3.5 rounded-xl border border-mars-border text-xs">
          <div>
            <span className="text-gray-400 block text-[10px]">TOTAL DISTANCE</span>
            <span className="font-bold text-white text-sm">{activeRoute.totalDistanceKm} km</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">EST. TRAVERSE TIME</span>
            <span className="font-bold text-white text-sm">{activeRoute.estimatedDurationHours} hrs</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">OXYGEN USAGE</span>
            <span className="font-bold text-mars-cyan text-sm">{activeRoute.oxygenConsumptionLiters} Liters</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">MAX TERRAIN SLOPE</span>
            <span className={`font-bold text-sm ${activeRoute.maxSlopeDeg > 15 ? 'text-red-400' : 'text-emerald-400'}`}>
              {activeRoute.maxSlopeDeg}°
            </span>
          </div>
        </div>

        {/* Environmental Conditions */}
        <div className="p-3 bg-black/30 rounded-lg border border-mars-border/70 text-xs space-y-1.5">
          <div className="font-bold text-mars-cyan text-[11px] flex items-center gap-1.5">
            <span>OPERATIONAL ENVIRONMENT (MEDA & REMS CALIBRATED)</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300">
            <div>Surface Temp: <span className="text-white">{telemetry?.temperature.current ?? -65}°C</span></div>
            <div>Atmospheric Pressure: <span className="text-white">{telemetry?.pressure.current ?? 735} Pa</span></div>
            <div>Dust Opacity: <span className="text-white">τ = {telemetry?.dustOpticalDepth.tau ?? 0.42}</span></div>
            <div>GCR Radiation: <span className="text-white">{telemetry?.radiation.ionizingDoseRateMgyPerDay ?? 0.64} mGy/day</span></div>
          </div>
        </div>

        {/* Waypoints Sequence */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-white text-[11px]">FLIGHT PLAN WAYPOINTS</div>
          <div className="max-h-48 overflow-y-auto border border-mars-border rounded-lg divide-y divide-mars-border/50 text-[11px]">
            {activeRoute.waypoints.map((wp, idx) => (
              <div key={wp.id} className="p-2 flex items-center justify-between bg-mars-dark/50 hover:bg-mars-dark">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-mars-red/30 text-mars-sand flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-white">{wp.name}</div>
                    <div className="text-[10px] text-gray-400">
                      {wp.coordinate.lat.toFixed(3)}°N, {wp.coordinate.lon.toFixed(3)}°E | MOLA {wp.elevationMeters}m
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    wp.hazardLevel === 'NOMINAL' ? 'bg-emerald-950 text-emerald-400' :
                    wp.hazardLevel === 'MODERATE' ? 'bg-amber-950 text-amber-400' :
                    'bg-red-950 text-red-400'
                  }`}>
                    {wp.hazardLevel} ({wp.slopeDeg}°)
                  </span>
                  <div className="text-[10px] text-gray-400 mt-0.5">{wp.cumulativeTimeMin} min | {wp.cumulativeOxygenLiters} L O2</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uncertainty and Scientific Limitations Notice */}
        <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-lg text-[11px] text-amber-300/80 space-y-1">
          <div className="flex items-center gap-1 font-bold text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>SCIENTIFIC INTEGRITY & MISSION LIMITATIONS</span>
          </div>
          <p>
            Altimetric data is derived from NASA MOLA MEGDR gridded records. Local meter-scale boulder obstacles and soft drift sand hazards cannot be resolved at orbital altimetry scales and must be verified by rover hazard-avoidance cameras (Hazcams).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-mars-border">
          <div className="text-[10px] text-gray-500">
            ARES Martian Mission Planning Platform • NASA Space Apps 2026
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-mars-dark border border-mars-border text-xs text-gray-300 hover:text-white flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Briefing</span>
            </button>
            <button
              onClick={downloadJsonReport}
              disabled={downloading}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-mars-red to-mars-orange text-white text-xs font-bold shadow-lg hover:brightness-110 flex items-center gap-1.5 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Generating...' : 'Download JSON Dossier'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
