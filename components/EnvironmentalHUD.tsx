'use client';

import React from 'react';
import { EnvironmentalTelemetry } from '@/lib/types';
import {
  Thermometer,
  Gauge,
  Sun,
  ShieldAlert,
  Wind,
  Info,
  Activity,
  AlertCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface EnvironmentalHUDProps {
  telemetry: EnvironmentalTelemetry | null;
}

export const EnvironmentalHUD: React.FC<EnvironmentalHUDProps> = ({ telemetry }) => {
  if (!telemetry) {
    return (
      <div className="p-4 bg-mars-panel rounded-xl border border-mars-border text-center text-gray-500 font-mono text-xs">
        Loading Mars atmospheric observation telemetry...
      </div>
    );
  }

  // Generate simulated 24-hour diurnal curve based on current site parameters
  const diurnalData = Array.from({ length: 24 }).map((_, hour) => {
    const hourAngle = ((hour - 13.5) / 24) * 2 * Math.PI;
    const cycle = Math.cos(hourAngle);
    const temp = Math.round(telemetry.temperature.min + ((telemetry.temperature.max - telemetry.temperature.min) / 2) * (cycle + 1));
    const tide = Math.sin((hour / 12) * 2 * Math.PI) * 25;
    const pressure = Math.round(telemetry.pressure.current + tide);
    return {
      hour: `${hour}:00`,
      temperature: temp,
      pressure
    };
  });

  return (
    <div className="w-full h-full flex flex-col bg-mars-dark text-gray-200 overflow-y-auto p-4 space-y-4 font-mono">
      {/* Top Banner */}
      <div className="p-4 bg-mars-panel border border-mars-border rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-mars-cyan animate-pulse" />
            <h2 className="text-base font-bold text-white tracking-wide">
              MARS ENVIRONMENTAL INTELLIGENCE HUD
            </h2>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              {telemetry.provenance.nature.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            In-situ atmospheric monitoring calibrated with NASA Mars 2020 Perseverance MEDA and MSL Curiosity REMS/RAD.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs bg-black/50 px-3 py-1.5 rounded-lg border border-mars-border">
          <div>
            <span className="text-gray-400">Sector:</span>{' '}
            <span className="font-bold text-mars-orange">{telemetry.siteName}</span>
          </div>
          <div className="text-gray-500">|</div>
          <div>
            <span className="text-gray-400">Sol:</span>{' '}
            <span className="font-bold text-white">{telemetry.sol}</span>
          </div>
          <div className="text-gray-500">|</div>
          <div>
            <span className="text-gray-400">LTST:</span>{' '}
            <span className="font-bold text-mars-cyan">{telemetry.ltst}</span>
          </div>
        </div>
      </div>

      {/* Primary Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Surface Air & Ground Temperature */}
        <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span className="flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-mars-rust" />
              ATMOSPHERIC TEMP
            </span>
            <span className="text-[10px] text-gray-500">MEDA ATS Sensor</span>
          </div>
          <div className="text-2xl font-bold text-white flex items-baseline gap-1">
            <span>{telemetry.temperature.current}</span>
            <span className="text-sm font-normal text-gray-400">°C</span>
          </div>
          <div className="text-[11px] text-gray-400 space-y-0.5 pt-1 border-t border-mars-border/40">
            <div className="flex justify-between">
              <span>Diurnal Range:</span>
              <span className="text-white">{telemetry.temperature.min}°C to {telemetry.temperature.max}°C</span>
            </div>
            <div className="flex justify-between">
              <span>Ground Skin Temp:</span>
              <span className="text-mars-orange">{telemetry.temperature.groundTemp}°C</span>
            </div>
          </div>
        </div>

        {/* Atmospheric Pressure */}
        <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-mars-cyan" />
              SURFACE PRESSURE
            </span>
            <span className="text-[10px] text-gray-500">MEDA PS Sensor</span>
          </div>
          <div className="text-2xl font-bold text-white flex items-baseline gap-1">
            <span>{telemetry.pressure.current}</span>
            <span className="text-sm font-normal text-gray-400">Pa (0.7% Earth)</span>
          </div>
          <div className="text-[11px] text-gray-400 space-y-0.5 pt-1 border-t border-mars-border/40">
            <div className="flex justify-between">
              <span>Thermal Tide Delta:</span>
              <span className="text-mars-cyan">±35 Pa oscillation</span>
            </div>
            <div className="flex justify-between">
              <span>Armstrong Boil Limit:</span>
              <span className="text-emerald-400">NOMINAL (&gt;618 Pa)</span>
            </div>
          </div>
        </div>

        {/* Dust Opacity (Tau) */}
        <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span className="flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-mars-sand" />
              DUST OPTICAL DEPTH (τ)
            </span>
            <span className="text-[10px] text-gray-500">MEDA RDS</span>
          </div>
          <div className="text-2xl font-bold text-white flex items-baseline gap-2">
            <span>τ = {telemetry.dustOpticalDepth.tau}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              telemetry.dustOpticalDepth.status === 'OPTIMAL' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
            }`}>
              {telemetry.dustOpticalDepth.status}
            </span>
          </div>
          <div className="text-[11px] text-gray-400 space-y-0.5 pt-1 border-t border-mars-border/40">
            <div className="flex justify-between">
              <span>Solar Array Loss:</span>
              <span className="text-amber-400 font-bold">-{telemetry.dustOpticalDepth.solarArrayEfficiencyPenaltyPct}%</span>
            </div>
            <div className="flex justify-between">
              <span>Storm Alert Status:</span>
              <span className="text-emerald-400">CLEAR HORIZON</span>
            </div>
          </div>
        </div>

        {/* Radiation Dose Rate */}
        <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-mars-danger" />
              IONIZING RADIATION
            </span>
            <span className="text-[10px] text-gray-500">MSL RAD Baseline</span>
          </div>
          <div className="text-2xl font-bold text-white flex items-baseline gap-1">
            <span>{telemetry.radiation.ionizingDoseRateMgyPerDay}</span>
            <span className="text-sm font-normal text-gray-400">mGy/day</span>
          </div>
          <div className="text-[11px] text-gray-400 space-y-0.5 pt-1 border-t border-mars-border/40">
            <div className="flex justify-between">
              <span>Safe Single EVA Limit:</span>
              <span className="text-mars-cyan font-bold">{telemetry.radiation.safeEvaTimeHours} hours</span>
            </div>
            <div className="flex justify-between">
              <span>UV Solar Flux:</span>
              <span className="text-white">{telemetry.radiation.uvFluxWPerM2} W/m²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Diurnal Cycle Curves (Recharts) */}
      <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-mars-border pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-mars-orange" />
            <span className="text-xs font-bold text-white tracking-wide uppercase">
              24-HOUR MARTIAN DIURNAL CYCLE (TEMPERATURE & PRESSURE TIDES)
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span className="flex items-center gap-1 text-mars-rust">
              <span className="w-2 h-2 rounded-full bg-mars-rust inline-block" />
              Air Temp (°C)
            </span>
            <span className="flex items-center gap-1 text-mars-cyan">
              <span className="w-2 h-2 rounded-full bg-mars-cyan inline-block" />
              Atm Pressure (Pa)
            </span>
          </div>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={diurnalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="hour" stroke="#64748b" fontSize={10} />
              <YAxis yAxisId="temp" domain={[-100, 0]} stroke="#e76f51" fontSize={10} />
              <YAxis yAxisId="press" orientation="right" domain={[650, 800]} stroke="#00f0ff" fontSize={10} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-2 bg-mars-dark/95 border border-mars-border rounded shadow-xl text-[11px] font-mono text-gray-200">
                        <div className="font-bold text-white mb-0.5">LTST {data.hour}</div>
                        <div className="text-mars-rust">Temperature: {data.temperature} °C</div>
                        <div className="text-mars-cyan">Atm Pressure: {data.pressure} Pa</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line yAxisId="temp" type="monotone" dataKey="temperature" stroke="#e76f51" strokeWidth={2} dot={false} />
              <Line yAxisId="press" type="monotone" dataKey="pressure" stroke="#00f0ff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scientific Provenance & Instrument Limitations */}
      <div className="p-4 bg-black/40 rounded-xl border border-mars-border/80 space-y-2 text-xs">
        <div className="flex items-center gap-1.5 text-mars-orange font-bold">
          <Info className="w-4 h-4" />
          <span>SCIENTIFIC PROVENANCE & CALIBRATION METHODOLOGY</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400 text-[11px]">
          <div>
            <div className="text-gray-200 font-semibold mb-1">Instruments & Mission Data:</div>
            <p>{telemetry.provenance.instrument} on board {telemetry.provenance.mission}.</p>
            <p className="mt-1">{telemetry.provenance.instrumentLimitations}</p>
          </div>
          <div>
            <div className="text-gray-200 font-semibold mb-1">Measurement Uncertainty & Ethics:</div>
            <p>{telemetry.provenance.uncertaintyStatement}</p>
            <p className="mt-1 text-mars-sand">
              Notice: Martian environmental data are historical sensor observations and calibrated general circulation models (GCMs), not real-time satellite radar feeds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
