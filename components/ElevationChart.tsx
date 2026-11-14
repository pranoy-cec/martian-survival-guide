'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { RouteOption } from '@/lib/types';
import { TrendingUp, ShieldAlert, Mountain } from 'lucide-react';

interface ElevationChartProps {
  route: RouteOption | null;
}

export const ElevationChart: React.FC<ElevationChartProps> = ({ route }) => {
  if (!route || !route.waypoints || route.waypoints.length === 0) {
    return (
      <div className="p-4 bg-mars-panel rounded-xl border border-mars-border text-center text-gray-500 font-mono text-xs">
        No active route selected for elevation profile analysis.
      </div>
    );
  }

  // Construct chart points from waypoints
  const chartData = route.waypoints.map((wp) => ({
    name: wp.name,
    distanceKm: wp.distanceFromStartKm,
    elevationM: wp.elevationMeters,
    slopeDeg: wp.slopeDeg,
    hazard: wp.hazardLevel
  }));

  const minElev = Math.min(...chartData.map(d => d.elevationM)) - 50;
  const maxElev = Math.max(...chartData.map(d => d.elevationM)) + 50;

  return (
    <div className="p-4 bg-mars-panel rounded-xl border border-mars-border text-xs font-mono space-y-3 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-mars-border pb-2">
        <div className="flex items-center gap-2">
          <Mountain className="w-4 h-4 text-mars-cyan" />
          <span className="font-bold text-white tracking-wide uppercase">
            MOLA NUMERICAL ELEVATION PROFILE
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/50 text-gray-400 border border-mars-border">
            {route.title}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <div>
            <span className="text-gray-400">Gain / Loss:</span>{' '}
            <span className="text-emerald-400 font-bold">+{route.elevationGainMeters}m</span> /{' '}
            <span className="text-amber-400 font-bold">-{route.elevationLossMeters}m</span>
          </div>
          <div>
            <span className="text-gray-400">Max Slope:</span>{' '}
            <span className={`font-bold ${route.maxSlopeDeg > 15 ? 'text-red-400' : 'text-emerald-400'}`}>
              {route.maxSlopeDeg}°
            </span>
          </div>
        </div>
      </div>

      {/* Recharts Elevation Area Chart */}
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="distanceKm"
              tickFormatter={(v) => `${v} km`}
              stroke="#64748b"
              fontSize={10}
            />
            <YAxis
              domain={[minElev, maxElev]}
              tickFormatter={(v) => `${v}m`}
              stroke="#64748b"
              fontSize={10}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-2 bg-mars-dark/95 border border-mars-border rounded shadow-xl text-[11px] font-mono text-gray-200">
                      <div className="font-bold text-white mb-0.5">{data.name}</div>
                      <div>Dist: <span className="text-mars-cyan">{data.distanceKm} km</span></div>
                      <div>MOLA Elev: <span className="text-white font-bold">{data.elevationM} m</span></div>
                      <div>Slope: <span className={data.slopeDeg > 15 ? 'text-red-400' : 'text-emerald-400'}>{data.slopeDeg}°</span></div>
                      <div>Hazard: <span className="text-mars-orange">{data.hazard}</span></div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="elevationM"
              stroke="#00f0ff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#elevationGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Slope Hazard Breakdown Heatbar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>TRAVERSE HAZARD EXPOSURE RATIO</span>
          <span className="text-emerald-400 font-bold">{Math.round(route.hazardBreakdown.nominalFraction * 100)}% Nominal (&lt;8°)</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden flex bg-gray-900 border border-mars-border/60">
          <div
            style={{ width: `${route.hazardBreakdown.nominalFraction * 100}%` }}
            className="bg-emerald-500 h-full"
            title="Nominal (<8°)"
          />
          <div
            style={{ width: `${route.hazardBreakdown.moderateFraction * 100}%` }}
            className="bg-amber-500 h-full"
            title="Caution (8-15°)"
          />
          <div
            style={{ width: `${route.hazardBreakdown.severeFraction * 100}%` }}
            className="bg-orange-500 h-full"
            title="Severe (15-25°)"
          />
          <div
            style={{ width: `${route.hazardBreakdown.impassableFraction * 100}%` }}
            className="bg-red-600 h-full"
            title="Impassable (>25°)"
          />
        </div>
      </div>
    </div>
  );
};
