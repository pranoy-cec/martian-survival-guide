'use client';

import React, { useState } from 'react';
import { EnvironmentalTelemetry } from '@/lib/types';
import {
  Thermometer,
  Gauge,
  Sun,
  ShieldAlert,
  Wind,
  Info,
  Activity,
  AlertCircle,
  Droplets,
  CloudSun,
  Flame,
  Radio,
  Compass,
  AlertTriangle,
  Layers
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface EnvironmentalHUDProps {
  telemetry: EnvironmentalTelemetry | null;
}

export const EnvironmentalHUD: React.FC<EnvironmentalHUDProps> = ({ telemetry }) => {
  const [activeChartMetric, setActiveChartMetric] = useState<'temp_press' | 'humidity_wind'>('temp_press');

  if (!telemetry) {
    return (
      <div className="p-4 bg-mars-panel rounded-xl border border-mars-border text-center text-gray-500 font-mono text-xs">
        Loading Mars atmospheric observation telemetry...
      </div>
    );
  }

  // 24-hour diurnal cycle curve calculation (Martian Sol Hours 0:00 to 23:00)
  const diurnalData = Array.from({ length: 24 }).map((_, hour) => {
    const hourAngle = ((hour - 13.5) / 24) * 2 * Math.PI;
    const cycle = Math.cos(hourAngle);
    const temp = Math.round(
      telemetry.temperature.min +
        ((telemetry.temperature.max - telemetry.temperature.min) / 2) * (cycle + 1)
    );
    const tide = Math.sin((hour / 12) * 2 * Math.PI) * 25;
    const pressure = Math.round(telemetry.pressure.current + tide);
    const rh = Math.max(
      2,
      Math.round(35 - cycle * 32 + (telemetry.coordinates.lat > 40 ? 20 : 0))
    );
    const wind = Math.round((3.2 + Math.max(0, cycle) * 3.8) * 10) / 10;

    return {
      hour: `${hour}:00`,
      temperature: temp,
      pressure,
      humidity: rh,
      wind
    };
  });

  const meda = telemetry.medaSensorSuite;

  return (
    <div className="w-full h-full flex flex-col bg-mars-dark text-gray-200 overflow-y-auto p-4 space-y-4 font-mono">
      {/* Top Banner */}
      <div className="p-4 bg-mars-panel border border-mars-border rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-mars-cyan animate-pulse" />
            <h2 className="text-base font-bold text-white tracking-wide">
              MARS ENVIRONMENTAL DYNAMICS & MEDA SENSOR SUITE
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
            <span className="text-gray-400">Ls:</span>{' '}
            <span className="font-bold text-amber-400">{telemetry.ls}°</span>
          </div>
          <div className="text-gray-500">|</div>
          <div>
            <span className="text-gray-400">LTST:</span>{' '}
            <span className="font-bold text-mars-cyan">{telemetry.ltst}</span>
          </div>
        </div>
      </div>

      {/* Primary Telemetry Grid: 4 Core Sensors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Surface Air & Ground Temperature */}
        <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span className="flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-mars-rust" />
              AIR TEMPERATURE
            </span>
            <span className="text-[10px] text-gray-500">MEDA ATS-1 (1.45m)</span>
          </div>
          <div className="text-2xl font-bold text-white flex items-baseline gap-1">
            <span>{telemetry.temperature.current}</span>
            <span className="text-sm font-normal text-gray-400">°C</span>
          </div>
          <div className="text-[11px] text-gray-400 space-y-0.5 pt-1 border-t border-mars-border/40">
            <div className="flex justify-between">
              <span>Diurnal Extremes:</span>
              <span className="text-white">
                {telemetry.temperature.min}°C to {telemetry.temperature.max}°C
              </span>
            </div>
            <div className="flex justify-between">
              <span>GTS Soil Skin Temp:</span>
              <span className="text-mars-orange font-bold">{telemetry.temperature.groundTemp}°C</span>
            </div>
          </div>
        </div>

        {/* Atmospheric Pressure */}
        <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-mars-cyan" />
              BAROMETRIC PRESSURE
            </span>
            <span className="text-[10px] text-gray-500">MEDA PS Sensor</span>
          </div>
          <div className="text-2xl font-bold text-white flex items-baseline gap-1">
            <span>{telemetry.pressure.current}</span>
            <span className="text-sm font-normal text-gray-400">Pa (0.7% Earth)</span>
          </div>
          <div className="text-[11px] text-gray-400 space-y-0.5 pt-1 border-t border-mars-border/40">
            <div className="flex justify-between">
              <span>Thermal Tide Oscillation:</span>
              <span className="text-mars-cyan">±{meda?.psThermalTideAmplitudePa || 36.8} Pa</span>
            </div>
            <div className="flex justify-between">
              <span>Armstrong Boiling Limit:</span>
              <span className="text-emerald-400 font-bold">NOMINAL (&gt;618 Pa)</span>
            </div>
          </div>
        </div>

        {/* Dust Opacity (Tau) & Solar Efficiency */}
        <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span className="flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-mars-sand" />
              DUST OPTICAL DEPTH (τ)
            </span>
            <span className="text-[10px] text-gray-500">MEDA RDS (880nm)</span>
          </div>
          <div className="text-2xl font-bold text-white flex items-baseline gap-2">
            <span>τ = {telemetry.dustOpticalDepth.tau}</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                telemetry.dustOpticalDepth.status === 'OPTIMAL'
                  ? 'bg-emerald-950 text-emerald-400'
                  : 'bg-amber-950 text-amber-400'
              }`}
            >
              {telemetry.dustOpticalDepth.status}
            </span>
          </div>
          <div className="text-[11px] text-gray-400 space-y-0.5 pt-1 border-t border-mars-border/40">
            <div className="flex justify-between">
              <span>Solar Array Loss:</span>
              <span className="text-amber-400 font-bold">
                -{telemetry.dustOpticalDepth.solarArrayEfficiencyPenaltyPct}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Diffuse Ratio:</span>
              <span className="text-gray-300 font-bold">{meda?.rdsDiffuseRatio || 0.38}</span>
            </div>
          </div>
        </div>

        {/* Relative Humidity & Frost Point */}
        <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-cyan-400" />
              RELATIVE HUMIDITY
            </span>
            <span className="text-[10px] text-gray-500">MEDA HS Sensor</span>
          </div>
          <div className="text-2xl font-bold text-white flex items-baseline gap-1">
            <span>{meda?.hsRelativeHumidityPct || 18.5}</span>
            <span className="text-sm font-normal text-gray-400">% RH</span>
          </div>
          <div className="text-[11px] text-gray-400 space-y-0.5 pt-1 border-t border-mars-border/40">
            <div className="flex justify-between">
              <span>Water Vapor Mixing:</span>
              <span className="text-cyan-400 font-bold">{meda?.hsWaterVaporPpmv || 55} ppmv</span>
            </div>
            <div className="flex justify-between">
              <span>Frost Condensation Point:</span>
              <span className="text-white">{meda?.hsFrostPointC || -79.2}°C</span>
            </div>
          </div>
        </div>
      </div>

      {/* MEDA 6-Sensor Suite Deep-Dive Telemetry Panel */}
      <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-mars-border pb-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-mars-orange" />
            <span className="text-xs font-bold text-white tracking-wide uppercase">
              NASA MEDA 6-INSTRUMENT SUBSYSTEM TELEMETRY MATRIX
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            ALL 6 SENSORS ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* ATS: 5-Level Boundary Layer Air Temperature Profile */}
          <div className="p-3 rounded-lg bg-black/40 border border-mars-border/60 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-white border-b border-mars-border/40 pb-1">
              <span className="flex items-center gap-1.5 text-mars-orange">
                <Thermometer className="w-3.5 h-3.5" />
                ATS Boundary Layer (5 Levels)
              </span>
              <span className="text-[10px] text-gray-400">
                dT/dz: {meda?.atsThermalGradientCPerM || -0.45}°C/m
              </span>
            </div>
            <div className="space-y-1 text-[10px]">
              {meda?.atsLevels ? (
                meda.atsLevels.map((lvl, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-400">{lvl.sensor}:</span>
                    <span className="text-white font-bold">{lvl.tempC} °C</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">ATS levels initialized</div>
              )}
            </div>
          </div>

          {/* WS: 2-Boom Sonic Anemometer Wind Vectors */}
          <div className="p-3 rounded-lg bg-black/40 border border-mars-border/60 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-white border-b border-mars-border/40 pb-1">
              <span className="flex items-center gap-1.5 text-mars-cyan">
                <Wind className="w-3.5 h-3.5" />
                WS 2-Boom Wind Anemometer
              </span>
              <span className="text-[10px] text-gray-400">
                Dir: {telemetry.wind.directionDeg}° Azimuth
              </span>
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between">
                <span className="text-gray-400">Horizontal Mean Speed:</span>
                <span className="text-white font-bold">{telemetry.wind.speedAvgMPerS} m/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Peak Afternoon Gust:</span>
                <span className="text-amber-400 font-bold">
                  {telemetry.wind.speedMaxGustMPerS} m/s
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Vertical Wind Vector (w):</span>
                <span className="text-gray-200">{meda?.wsVerticalVectorMPerS || 0.12} m/s</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-mars-border/30">
                <span className="text-gray-400">Sand Saltation Status:</span>
                <span
                  className={`font-bold ${
                    meda?.wsSaltationActive ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {meda?.wsSaltationActive ? 'SALTATION ACTIVE' : 'QUIESCENT (<15 m/s)'}
                </span>
              </div>
            </div>
          </div>

          {/* GTS & TIRS: Thermal Inertia & Soil Skin Dynamics */}
          <div className="p-3 rounded-lg bg-black/40 border border-mars-border/60 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-white border-b border-mars-border/40 pb-1">
              <span className="flex items-center gap-1.5 text-mars-sand">
                <Flame className="w-3.5 h-3.5" />
                GTS Surface Radiometer & Soil
              </span>
              <span className="text-[10px] text-gray-400">IR Radiometer</span>
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between">
                <span className="text-gray-400">Soil Thermal Inertia (I):</span>
                <span className="text-white font-bold">
                  {meda?.gtsThermalInertiaJ || 315} J·m⁻²·K⁻¹·s⁻¹/²
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Surface Kinetic Temp:</span>
                <span className="text-mars-orange font-bold">
                  {telemetry.temperature.groundTemp}°C
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Barometric Kelvin Wave:</span>
                <span className="text-gray-200">
                  {meda?.psKelvinWaveDetected ? 'DETECTION CONFIRMED' : 'NONE DETECTED'}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-mars-border/30">
                <span className="text-gray-400">Frost Hazard Status:</span>
                <span
                  className={`font-bold ${
                    meda?.hsFrostHazard ? 'text-cyan-400 animate-pulse' : 'text-emerald-400'
                  }`}
                >
                  {meda?.hsFrostHazard ? 'SURFACE FROST CONDENSING' : 'NO FROST HAZARD'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diurnal Cycle Curves (Recharts) with Metric Toggle */}
      <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-mars-border pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-mars-orange" />
            <span className="text-xs font-bold text-white tracking-wide uppercase">
              24-HOUR MARTIAN DIURNAL TELEMETRY CURVES (SOL {telemetry.sol})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveChartMetric('temp_press')}
              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
                activeChartMetric === 'temp_press'
                  ? 'bg-mars-red text-white border-white'
                  : 'bg-black/40 text-gray-400 border-mars-border'
              }`}
            >
              Temp & Pressure Tides
            </button>
            <button
              onClick={() => setActiveChartMetric('humidity_wind')}
              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
                activeChartMetric === 'humidity_wind'
                  ? 'bg-mars-cyan text-black border-white'
                  : 'bg-black/40 text-gray-400 border-mars-border'
              }`}
            >
              Humidity & Wind Speed
            </button>
          </div>
        </div>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeChartMetric === 'temp_press' ? (
              <LineChart data={diurnalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="hour" stroke="#64748b" fontSize={10} />
                <YAxis yAxisId="temp" domain={[-100, 0]} stroke="#e76f51" fontSize={10} />
                <YAxis
                  yAxisId="press"
                  orientation="right"
                  domain={[650, 800]}
                  stroke="#00f0ff"
                  fontSize={10}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="p-2.5 bg-mars-dark/95 border border-mars-border rounded shadow-xl text-[11px] font-mono text-gray-200">
                          <div className="font-bold text-white mb-1">LTST {data.hour}</div>
                          <div className="text-mars-rust">Air Temperature: {data.temperature} °C</div>
                          <div className="text-mars-cyan">Atm Pressure: {data.pressure} Pa</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#e76f51"
                  strokeWidth={2.2}
                  dot={false}
                />
                <Line
                  yAxisId="press"
                  type="monotone"
                  dataKey="pressure"
                  stroke="#00f0ff"
                  strokeWidth={2.2}
                  dot={false}
                />
              </LineChart>
            ) : (
              <LineChart data={diurnalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="hour" stroke="#64748b" fontSize={10} />
                <YAxis yAxisId="rh" domain={[0, 80]} stroke="#38bdf8" fontSize={10} />
                <YAxis
                  yAxisId="wind"
                  orientation="right"
                  domain={[0, 15]}
                  stroke="#f59e0b"
                  fontSize={10}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="p-2.5 bg-mars-dark/95 border border-mars-border rounded shadow-xl text-[11px] font-mono text-gray-200">
                          <div className="font-bold text-white mb-1">LTST {data.hour}</div>
                          <div className="text-sky-400">Relative Humidity: {data.humidity} %</div>
                          <div className="text-amber-400">Wind Velocity: {data.wind} m/s</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  yAxisId="rh"
                  type="monotone"
                  dataKey="humidity"
                  stroke="#38bdf8"
                  strokeWidth={2.2}
                  dot={false}
                />
                <Line
                  yAxisId="wind"
                  type="monotone"
                  dataKey="wind"
                  stroke="#f59e0b"
                  strokeWidth={2.2}
                  dot={false}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Atmospheric Gas Composition & In-Situ Breathing Hazard */}
      <div className="p-4 bg-mars-panel rounded-xl border border-mars-border space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-mars-border pb-2">
          <span className="text-xs font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-mars-cyan" />
            MARTIAN ATMOSPHERIC GAS COMPOSITION & LIFE SUPPORT THREAT ANALYSIS
          </span>
          <span className="text-[10px] text-red-400 border border-red-500/50 bg-red-950/40 px-2 py-0.5 rounded font-bold">
            CLOSED-LOOP PLSS REQUIRED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
          {telemetry.atmosphericComposition ? (
            telemetry.atmosphericComposition.map((gas, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-black/40 border border-mars-border/60 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-[11px]">{gas.gas}</span>
                  <span className="font-bold text-mars-cyan text-sm">{gas.percent}%</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-normal">{gas.hazardAlert}</p>
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-400">Atmospheric constituents online.</div>
          )}
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
            <p>
              {telemetry.provenance.instrument} on board {telemetry.provenance.mission}.
            </p>
            <p className="mt-1">{telemetry.provenance.instrumentLimitations}</p>
          </div>
          <div>
            <div className="text-gray-200 font-semibold mb-1">Measurement Uncertainty & Ethics:</div>
            <p>{telemetry.provenance.uncertaintyStatement}</p>
            <p className="mt-1 text-mars-sand">
              Notice: Martian environmental data are historical sensor observations and calibrated
              general circulation models (GCMs), not real-time satellite radar feeds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
