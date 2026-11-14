'use client';

import React, { useState } from 'react';
import {
  Layers,
  Eye,
  EyeOff,
  ShieldAlert,
  Mountain,
  Sparkles,
  Droplets,
  CircleDot,
  Grid,
  Info,
  Sliders
} from 'lucide-react';

export interface MapLayerState {
  baseLayer: 'mola' | 'viking' | 'mola_gray';
  showGeology: boolean;
  showHazards: boolean;
  showWaterIce: boolean;
  showCraters: boolean;
  showPOIs: boolean;
  showRoutes: boolean;
  showGraticule: boolean;
  layerOpacity: number;
}

interface LayerControlProps {
  layers: MapLayerState;
  onChangeLayers: (layers: MapLayerState) => void;
}

export const LayerControl: React.FC<LayerControlProps> = ({ layers, onChangeLayers }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const update = (partial: Partial<MapLayerState>) => {
    onChangeLayers({ ...layers, ...partial });
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] w-76 bg-mars-panel/95 backdrop-blur-md border border-mars-border rounded-xl shadow-2xl text-xs overflow-hidden transition-all">
      {/* Header */}
      <div className="p-3 bg-mars-dark/80 border-b border-mars-border flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono font-semibold text-mars-orange">
          <Layers className="w-4 h-4 text-mars-cyan" />
          <span>NASA MISSION LAYERS</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowLegend(!showLegend)}
            title="Toggle Legends"
            className={`p-1 rounded transition-colors ${
              showLegend ? 'text-mars-cyan bg-mars-cyan/10' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Info className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-gray-200 p-1 font-mono"
          >
            {collapsed ? '▼' : '▲'}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="p-3 space-y-3.5 max-h-[75vh] overflow-y-auto font-mono">
          {/* Base Layer Switcher */}
          <div>
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
              NASA JPL Mars Trek Basemap
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-black/40 p-1 rounded-lg border border-mars-border/60">
              <button
                onClick={() => update({ baseLayer: 'mola' })}
                className={`py-1.5 px-2 rounded text-[10px] font-medium transition-all ${
                  layers.baseLayer === 'mola'
                    ? 'bg-mars-red text-white shadow font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                title="MOLA Global Color Shaded Relief Altimetry (463m)"
              >
                MOLA Color
              </button>
              <button
                onClick={() => update({ baseLayer: 'viking' })}
                className={`py-1.5 px-2 rounded text-[10px] font-medium transition-all ${
                  layers.baseLayer === 'viking'
                    ? 'bg-mars-red text-white shadow font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                title="Viking Orbiter MDIM 2.1 Color Mosaic (232m)"
              >
                Viking RGB
              </button>
              <button
                onClick={() => update({ baseLayer: 'mola_gray' })}
                className={`py-1.5 px-2 rounded text-[10px] font-medium transition-all ${
                  layers.baseLayer === 'mola_gray'
                    ? 'bg-mars-red text-white shadow font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                title="MOLA Shaded Relief Monochromatic Terrain"
              >
                MOLA Shade
              </button>
            </div>
          </div>

          {/* Scientific & Hazard Overlays */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                Geological & Tactical Overlays
              </label>
              <span className="text-[9px] text-mars-cyan">Live Render</span>
            </div>

            <div className="space-y-1.5">
              {/* USGS Geology */}
              <div
                className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                  layers.showGeology
                    ? 'bg-mars-dark/80 border-mars-orange/60'
                    : 'bg-mars-dark/40 border-mars-border/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mountain className="w-3.5 h-3.5 text-mars-sand" />
                  <span className="text-gray-200 text-[11px]">USGS Geologic Units (SIM 3292)</span>
                </div>
                <button
                  onClick={() => update({ showGeology: !layers.showGeology })}
                  className={`p-1 rounded ${layers.showGeology ? 'text-mars-orange' : 'text-gray-500'}`}
                >
                  {layers.showGeology ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Slope & Hazards */}
              <div
                className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                  layers.showHazards
                    ? 'bg-mars-dark/80 border-red-500/60'
                    : 'bg-mars-dark/40 border-mars-border/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-mars-danger" />
                  <span className="text-gray-200 text-[11px]">Slope & Escarpment Hazards (&gt;15°)</span>
                </div>
                <button
                  onClick={() => update({ showHazards: !layers.showHazards })}
                  className={`p-1 rounded ${layers.showHazards ? 'text-mars-orange' : 'text-gray-500'}`}
                >
                  {layers.showHazards ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* SHARAD Subsurface Water Ice */}
              <div
                className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                  layers.showWaterIce
                    ? 'bg-mars-dark/80 border-cyan-500/60'
                    : 'bg-mars-dark/40 border-mars-border/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-mars-cyan" />
                  <span className="text-gray-200 text-[11px]">Subsurface Water Ice (SHARAD)</span>
                </div>
                <button
                  onClick={() => update({ showWaterIce: !layers.showWaterIce })}
                  className={`p-1 rounded ${layers.showWaterIce ? 'text-mars-orange' : 'text-gray-500'}`}
                >
                  {layers.showWaterIce ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Robbins/IAU Craters */}
              <div
                className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                  layers.showCraters
                    ? 'bg-mars-dark/80 border-amber-500/60'
                    : 'bg-mars-dark/40 border-mars-border/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CircleDot className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-gray-200 text-[11px]">Robbins Crater Catalog</span>
                </div>
                <button
                  onClick={() => update({ showCraters: !layers.showCraters })}
                  className={`p-1 rounded ${layers.showCraters ? 'text-mars-orange' : 'text-gray-500'}`}
                >
                  {layers.showCraters ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Science POIs */}
              <div
                className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                  layers.showPOIs
                    ? 'bg-mars-dark/80 border-purple-500/60'
                    : 'bg-mars-dark/40 border-mars-border/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-gray-200 text-[11px]">Science POIs & Samples</span>
                </div>
                <button
                  onClick={() => update({ showPOIs: !layers.showPOIs })}
                  className={`p-1 rounded ${layers.showPOIs ? 'text-mars-orange' : 'text-gray-500'}`}
                >
                  {layers.showPOIs ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Coordinate Graticule Grid */}
              <div
                className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                  layers.showGraticule
                    ? 'bg-mars-dark/80 border-gray-500/60'
                    : 'bg-mars-dark/40 border-mars-border/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Grid className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-200 text-[11px]">Lat/Lon Coordinate Graticule</span>
                </div>
                <button
                  onClick={() => update({ showGraticule: !layers.showGraticule })}
                  className={`p-1 rounded ${layers.showGraticule ? 'text-mars-orange' : 'text-gray-500'}`}
                >
                  {layers.showGraticule ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Overlay Opacity Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <Sliders className="w-3 h-3 text-mars-cyan" />
                OVERLAY OPACITY
              </span>
              <span className="text-white font-bold">{Math.round((layers.layerOpacity || 0.65) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={layers.layerOpacity || 0.65}
              onChange={(e) => update({ layerOpacity: parseFloat(e.target.value) })}
              className="w-full accent-mars-orange h-1.5 bg-black/60 rounded-lg cursor-pointer"
            />
          </div>

          {/* Interactive Legends Panel */}
          {showLegend && (
            <div className="p-2.5 bg-black/70 rounded-lg border border-mars-border/80 space-y-2 text-[10px] font-mono">
              <div className="font-semibold text-gray-300 border-b border-gray-800 pb-1 flex justify-between">
                <span>USGS SIM 3292 GEOLOGY & HAZARD KEY</span>
                <span className="text-mars-cyan">EPSG:4326</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#e76f51]">
                    <span className="w-2.5 h-2.5 rounded bg-[#e76f51] inline-block" />
                    HNd: Delta Fan
                  </span>
                  <span className="text-gray-400">Clay / Organic Target</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#2a9d8f]">
                    <span className="w-2.5 h-2.5 rounded bg-[#2a9d8f] inline-block" />
                    Nf: Floor Cumulate
                  </span>
                  <span className="text-gray-400">Igneous / Carbonate</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#e63946]">
                    <span className="w-2.5 h-2.5 rounded bg-[#e63946] inline-block" />
                    c: Rim Scarps
                  </span>
                  <span className="text-red-400 font-bold">Slope Hazard &gt;15°</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#00f0ff]">
                    <span className="w-2.5 h-2.5 rounded bg-[#00f0ff] inline-block" />
                    SHARAD Pure Ice
                  </span>
                  <span className="text-cyan-300">dielectric = 3.15</span>
                </div>
              </div>
            </div>
          )}

          {/* Source Attribution Note */}
          <div className="text-[9px] text-gray-500 font-mono pt-1 border-t border-mars-border/40">
            NASA JPL Mars Trek WMTS • USGS Astrogeology SIM 3292 • MRO SHARAD / CRISM
          </div>
        </div>
      )}
    </div>
  );
};
