'use client';

import React, { useState } from 'react';
import { RouteOption, MissionProfile, MarsCoordinate, SciencePOI } from '@/lib/types';
import {
  Sparkles,
  Shield,
  Compass,
  Zap,
  Clock,
  HeartPulse,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Download,
  Sliders,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

interface RoutePlannerProps {
  routes: RouteOption[];
  activeRoute: RouteOption | null;
  onSelectRoute: (route: RouteOption) => void;
  startPoint: MarsCoordinate;
  destinationPoint: MarsCoordinate;
  onUpdateCoordinates: (start: MarsCoordinate, dest: MarsCoordinate) => void;
  profile: MissionProfile;
  onChangeProfile: (profile: MissionProfile) => void;
  onOptimize: () => void;
  isCalculating: boolean;
  onSelectPOI: (poi: SciencePOI) => void;
}

export const RoutePlanner: React.FC<RoutePlannerProps> = ({
  routes,
  activeRoute,
  onSelectRoute,
  startPoint,
  destinationPoint,
  onUpdateCoordinates,
  profile,
  onChangeProfile,
  onOptimize,
  isCalculating,
  onSelectPOI
}) => {
  const [showConfig, setShowConfig] = useState(false);

  const exportGeoJson = () => {
    if (!activeRoute) return;
    const geojson = {
      type: 'FeatureCollection',
      name: `ARES_VANGUARD_MARSWALK_${activeRoute.id.toUpperCase()}`,
      metadata: {
        title: activeRoute.title,
        safetyScore: activeRoute.safetyScore,
        scienceScore: activeRoute.scienceScore,
        efficiencyScore: activeRoute.efficiencyScore,
        totalDistanceKm: activeRoute.totalDistanceKm,
        durationHours: activeRoute.estimatedDurationHours,
        oxygenLiters: activeRoute.oxygenConsumptionLiters,
        created: new Date().toISOString()
      },
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: activeRoute.pathCoordinates.map(([lat, lon]) => [lon, lat])
          },
          properties: {
            name: activeRoute.title,
            type: activeRoute.type,
            elevationGain: activeRoute.elevationGainMeters,
            elevationLoss: activeRoute.elevationLossMeters,
            maxSlope: activeRoute.maxSlopeDeg
          }
        },
        ...activeRoute.waypoints.map(wp => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [wp.coordinate.lon, wp.coordinate.lat]
          },
          properties: {
            name: wp.name,
            elevationMeters: wp.elevationMeters,
            slopeDeg: wp.slopeDeg,
            hazardLevel: wp.hazardLevel,
            cumulativeTimeMin: wp.cumulativeTimeMin,
            cumulativeO2: wp.cumulativeOxygenLiters
          }
        }))
      ]
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `martian_flight_plan_${activeRoute.type.toLowerCase()}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-full flex flex-col bg-mars-dark text-gray-200 overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="p-4 bg-mars-panel border-b border-mars-border flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-mars-orange" />
            <h2 className="text-base font-bold text-white tracking-wide">
              SCIENCE–SAFETY ROUTE OPTIMIZER
            </h2>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-mars-cyan/10 text-mars-cyan border border-mars-cyan/30">
              Multi-Objective A* v2.0
            </span>
          </div>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            Generates explainable, Pareto-optimal Martian traverses balancing terrain hazards with astrobiology sampling.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
              showConfig ? 'bg-mars-red text-white border-mars-rust' : 'bg-mars-dark text-gray-300 border-mars-border hover:border-mars-orange'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Mission Constraints</span>
          </button>
          <button
            onClick={onOptimize}
            disabled={isCalculating}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-mars-red to-mars-orange text-white text-xs font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isCalculating ? 'Computing Grids...' : 'Recompute Routes'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Mission Constraints Drawer */}
        {showConfig && (
          <div className="p-4 rounded-xl bg-mars-panel border border-mars-border space-y-4 shadow-xl">
            <div className="text-xs font-mono font-semibold text-mars-orange border-b border-mars-border/60 pb-1 flex items-center justify-between">
              <span>ASTRONAUT EVA & ALGORITHM WEIGHT PROFILE</span>
              <span className="text-gray-400">NASA-STD-3001 SPECS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              {/* Safety Weight */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Safety Priority:</span>
                  <span className="text-emerald-400 font-bold">{Math.round(profile.weights.safety * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={profile.weights.safety}
                  onChange={(e) => onChangeProfile({
                    ...profile,
                    weights: { ...profile.weights, safety: parseFloat(e.target.value) }
                  })}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Science Weight */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Science Yield:</span>
                  <span className="text-mars-cyan font-bold">{Math.round(profile.weights.science * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={profile.weights.science}
                  onChange={(e) => onChangeProfile({
                    ...profile,
                    weights: { ...profile.weights, science: parseFloat(e.target.value) }
                  })}
                  className="w-full accent-cyan-400"
                />
              </div>

              {/* Efficiency Weight */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Traverse Speed:</span>
                  <span className="text-amber-400 font-bold">{Math.round(profile.weights.efficiency * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={profile.weights.efficiency}
                  onChange={(e) => onChangeProfile({
                    ...profile,
                    weights: { ...profile.weights, efficiency: parseFloat(e.target.value) }
                  })}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Rover Support */}
              <div className="flex flex-col justify-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.roverAssisted}
                    onChange={(e) => onChangeProfile({ ...profile, roverAssisted: e.target.checked })}
                    className="w-4 h-4 rounded text-mars-red focus:ring-mars-orange"
                  />
                  <span className="text-gray-200 font-semibold">Pressurized Rover Support</span>
                </label>
                <span className="text-[10px] text-gray-400 mt-1">
                  {profile.roverAssisted ? '8 km/h speed, 35 kWh battery capacity' : 'Pedestrian suit walk (3.6 km/h max)'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Route Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {routes.map((route) => {
            const isSelected = activeRoute?.id === route.id;
            let badgeBg = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
            let borderColor = isSelected ? 'border-amber-500 shadow-amber-500/10' : 'border-mars-border';

            if (route.type === 'SAFE') {
              badgeBg = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
              borderColor = isSelected ? 'border-emerald-500 shadow-emerald-500/10' : 'border-mars-border';
            } else if (route.type === 'SCIENTIFIC') {
              badgeBg = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
              borderColor = isSelected ? 'border-cyan-500 shadow-cyan-500/10' : 'border-mars-border';
            }

            return (
              <div
                key={route.id}
                onClick={() => onSelectRoute(route)}
                className={`p-4 rounded-xl bg-mars-panel border-2 transition-all cursor-pointer shadow-lg hover:border-gray-400 flex flex-col justify-between ${borderColor} ${
                  isSelected ? 'ring-2 ring-mars-orange/50' : ''
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${badgeBg}`}>
                      {route.type} STRATEGY
                    </span>
                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-white bg-black/50 px-2 py-0.5 rounded border border-mars-border">
                      <TrendingUp className="w-3.5 h-3.5 text-mars-orange" />
                      <span>SCORE: {route.overallScore}/100</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1">{route.title}</h3>
                  <p className="text-xs text-gray-400 mb-3">{route.description}</p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-black/40 p-2.5 rounded-lg border border-mars-border/60 mb-3">
                    <div>
                      <span className="text-gray-400 block text-[10px]">TRAVERSE DISTANCE</span>
                      <span className="font-bold text-white">{route.totalDistanceKm} km</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">EST. DURATION</span>
                      <span className="font-bold text-white">{route.estimatedDurationHours} hrs</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">MAX TERRAIN SLOPE</span>
                      <span className={`font-bold ${route.maxSlopeDeg > 15 ? 'text-red-400' : (route.maxSlopeDeg > 8 ? 'text-amber-400' : 'text-emerald-400')}`}>
                        {route.maxSlopeDeg}° (Avg {route.averageSlopeDeg}°)
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">EVA O2 USAGE</span>
                      <span className="font-bold text-mars-cyan">{route.oxygenConsumptionLiters} Liters</span>
                    </div>
                  </div>

                  {/* Subsystem Scores */}
                  <div className="space-y-1.5 text-[11px] font-mono mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-400" /> Safety Index
                      </span>
                      <span className="font-bold text-emerald-400">{route.safetyScore}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${route.safetyScore}%` }} />
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-400" /> Science Return
                      </span>
                      <span className="font-bold text-cyan-400">{route.scienceScore}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${route.scienceScore}%` }} />
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" /> Efficiency / Time
                      </span>
                      <span className="font-bold text-amber-400">{route.efficiencyScore}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${route.efficiencyScore}%` }} />
                    </div>
                  </div>

                  {/* Primary Advantages & Disadvantages */}
                  <div className="text-[11px] space-y-1 bg-mars-dark/60 p-2 rounded-lg border border-mars-border/40 mb-3">
                    <div className="text-emerald-400 flex items-start gap-1">
                      <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{route.tradeoffAnalysis.advantages[0]}</span>
                    </div>
                    <div className="text-amber-400 flex items-start gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{route.tradeoffAnalysis.disadvantages[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Select / Active Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRoute(route);
                  }}
                  className={`w-full py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    isSelected
                      ? 'bg-mars-red text-white shadow-md'
                      : 'bg-mars-dark border border-mars-border text-gray-300 hover:text-white hover:border-mars-orange'
                  }`}
                >
                  {isSelected ? '✓ ACTIVE EVA FLIGHT PLAN' : 'SELECT THIS TRAVERSE'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Route Deep Dive & Explainability Dossier */}
        {activeRoute && (
          <div className="p-4 rounded-xl bg-mars-panel border border-mars-border space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-mars-border pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-mars-red text-white font-bold">
                    ACTIVE FLIGHT PLAN
                  </span>
                  <h3 className="text-base font-bold text-white">{activeRoute.title}</h3>
                </div>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  Recommendation Justification: {activeRoute.tradeoffAnalysis.recommendationReason}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportGeoJson}
                  className="px-3 py-1.5 rounded-lg bg-mars-dark border border-mars-border text-xs font-mono text-gray-200 hover:text-white hover:border-mars-cyan flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-mars-cyan" />
                  <span>Export GeoJSON</span>
                </button>
              </div>
            </div>

            {/* Scientific Yield & Hazards Split View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* Scientific Highlights */}
              <div className="p-3 bg-black/30 rounded-lg border border-mars-border/70 space-y-2">
                <div className="flex items-center justify-between text-mars-cyan font-bold">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    SCIENTIFIC HARVEST ({activeRoute.scienceHighlights.poiCount} Targets)
                  </span>
                  <span>Sample Score: {activeRoute.scienceHighlights.sampleOpportunityScore}%</span>
                </div>

                {activeRoute.scienceHighlights.poisVisited.length > 0 ? (
                  <div className="space-y-1.5">
                    {activeRoute.scienceHighlights.poisVisited.map((poi) => (
                      <div
                        key={poi.id}
                        onClick={() => onSelectPOI(poi)}
                        className="p-1.5 rounded bg-mars-dark/80 border border-mars-border/50 hover:border-mars-cyan cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-white">{poi.name}</div>
                          <div className="text-[10px] text-gray-400">{poi.geologicUnit}</div>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {poi.biosignaturePotential} BIOSIG
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Traverse focuses on transit speed; zero close approach science waypoints.</p>
                )}

                <div className="pt-1 text-[10px] text-gray-400">
                  Target Minerals: {activeRoute.scienceHighlights.keyMinerals.join(', ') || 'Basaltic Regolith'}
                </div>
              </div>

              {/* Hazard Breakdown */}
              <div className="p-3 bg-black/30 rounded-lg border border-mars-border/70 space-y-2">
                <div className="flex items-center justify-between text-mars-orange font-bold">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-mars-danger" />
                    HAZARD & TERRAIN EXPOSURE
                  </span>
                  <span>Confidence: {activeRoute.confidenceScore}%</span>
                </div>

                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nominal Terrain (&lt;8°):</span>
                    <span className="text-emerald-400 font-bold">{Math.round(activeRoute.hazardBreakdown.nominalFraction * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Moderate Incline (8°-15°):</span>
                    <span className="text-amber-400 font-bold">{Math.round(activeRoute.hazardBreakdown.moderateFraction * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Severe Slope (15°-25°):</span>
                    <span className="text-orange-400 font-bold">{Math.round(activeRoute.hazardBreakdown.severeFraction * 100)}%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-mars-border/50 space-y-1">
                  <div className="text-[10px] font-semibold text-gray-300">Identified Hazard Factors:</div>
                  {activeRoute.hazardBreakdown.primaryHazards.map((h, i) => (
                    <div key={i} className="text-[10px] text-gray-400 flex items-start gap-1">
                      <span className="text-mars-orange">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Waypoint Chronology Table */}
            <div>
              <div className="text-xs font-mono font-bold text-gray-300 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-mars-orange" />
                <span>WAYPOINT TRAVERSE CHRONOLOGY</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-mars-border text-gray-400 bg-mars-dark/60">
                      <th className="p-2">Waypoint</th>
                      <th className="p-2">Coordinates</th>
                      <th className="p-2">MOLA Elev</th>
                      <th className="p-2">Slope</th>
                      <th className="p-2">Cumulative Dist</th>
                      <th className="p-2">Cumulative Time</th>
                      <th className="p-2">O2 Burn</th>
                      <th className="p-2">Terrain Classification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-mars-border/40">
                    {activeRoute.waypoints.map((wp) => (
                      <tr key={wp.id} className="hover:bg-mars-dark/40 transition-colors">
                        <td className="p-2 font-bold text-white flex items-center gap-1">
                          <ChevronRight className="w-3 h-3 text-mars-orange" />
                          {wp.name}
                        </td>
                        <td className="p-2 text-gray-300">
                          {wp.coordinate.lat.toFixed(3)}°N, {wp.coordinate.lon.toFixed(3)}°E
                        </td>
                        <td className="p-2 text-mars-cyan">{wp.elevationMeters} m</td>
                        <td className="p-2">
                          <span className={`px-1 rounded ${wp.slopeDeg > 15 ? 'text-red-400 bg-red-950/40' : (wp.slopeDeg > 8 ? 'text-amber-400 bg-amber-950/40' : 'text-emerald-400 bg-emerald-950/40')}`}>
                            {wp.slopeDeg}°
                          </span>
                        </td>
                        <td className="p-2 text-gray-300">{wp.distanceFromStartKm} km</td>
                        <td className="p-2 text-gray-300">{wp.cumulativeTimeMin} min</td>
                        <td className="p-2 text-mars-cyan">{wp.cumulativeOxygenLiters} L</td>
                        <td className="p-2 text-gray-400 truncate max-w-[200px]" title={wp.notes}>
                          {wp.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
