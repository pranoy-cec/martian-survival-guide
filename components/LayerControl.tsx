'use client';

import React, { useState } from 'react';
import { Layers, Eye, EyeOff, ShieldAlert, Mountain, Sparkles, Droplets, Info } from 'lucide-react';

export interface MapLayerState {
  baseLayer: 'mola' | 'viking' | 'themis_day';
  showGeology: boolean;
  showHazards: boolean;
  showWaterIce: boolean;
  showPOIs: boolean;
  showRoutes: boolean;
  hazardOpacity: number;
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
    <div className="absolute top-4 right-4 z-[1000] w-72 bg-mars-panel/95 backdrop-blur-md border border-mars-border rounded-xl shadow-2xl text-xs overflow-hidden transition-all">
      {/* Header */}
      <div className="p-3 bg-mars-dark/80 border-b border-mars-border flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono font-semibold text-mars-orange">
          <Layers className="w-4 h-4" />
          <span>NASA MISSION LAYERS</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowLegend(!showLegend)}
            title="Toggle Legends"
            className={`p-1 rounded transition-colors ${showLegend ? 'text-mars-cyan bg-mars-cyan/10' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <Info className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-gray-200 p-1"
          >
            {collapsed ? '▼' : '▲'}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="p-3 space-y-3.5 max-h-[75vh] overflow-y-auto">
          {/* Base Layer Switcher */}
          <div>
            <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
              Primary NASA Basemap
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-black/40 p-1 rounded-lg border border-mars-border/60">
              <button
                onClick={() => update({ baseLayer: 'mola' })}
                className={`py-1.5 px-2 rounded text-[11px] font-medium transition-all ${
                  layers.baseLayer === 'mola'
                    ? 'bg-mars-red text-white shadow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                MOLA Color
              </button>
              <button
                onClick={() => update({ baseLayer: 'viking' })}
                className={`py-1.5 px-2 rounded text-[11px] font-medium transition-all ${
                  layers.baseLayer === 'viking'
                    ? 'bg-mars-red text-white shadow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Viking Visible
              </button>
              <button
                onClick={() => update({ baseLayer: 'themis_day' })}
                className={`py-1.5 px-2 rounded text-[11px] font-medium transition-all ${
                  layers.baseLayer === 'themis_day'
                    ? 'bg-mars-red text-white shadow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                THEMIS IR
              </button>
            </div>
          </div>

          {/* Overlays Toggle */}
          <div>
            <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
              Scientific & Hazard Overlays
            </label>
            <div className="space-y-1.5">
              {/* Hazards */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-mars-dark/50 border border-mars-border/40 hover:border-mars-border">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-mars-danger" />
                  <span className="text-gray-200">Slope & Roughness Hazards</span>
                </div>
                <button
                  onClick={() => update({ showHazards: !layers.showHazards })}
                  className={`p-1 rounded ${layers.showHazards ? 'text-mars-orange' : 'text-gray-500'}`}
                >
                  {layers.showHazards ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Geology */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-mars-dark/50 border border-mars-border/40 hover:border-mars-border">
                <div className="flex items-center gap-2">
                  <Mountain className="w-3.5 h-3.5 text-mars-sand" />
                  <span className="text-gray-200">USGS Geologic Units (SIM 3292)</span>
                </div>
                <button
                  onClick={() => update({ showGeology: !layers.showGeology })}
                  className={`p-1 rounded ${layers.showGeology ? 'text-mars-orange' : 'text-gray-500'}`}
                >
                  {layers.showGeology ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Water Ice */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-mars-dark/50 border border-mars-border/40 hover:border-mars-border">
                <div className="flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-mars-cyan" />
                  <span className="text-gray-200">Subsurface Water Ice (SHARAD)</span>
                </div>
                <button
                  onClick={() => update({ showWaterIce: !layers.showWaterIce })}
                  className={`p-1 rounded ${layers.showWaterIce ? 'text-mars-orange' : 'text-gray-500'}`}
                >
                  {layers.showWaterIce ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Science POIs */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-mars-dark/50 border border-mars-border/40 hover:border-mars-border">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-gray-200">Science POIs & Samples</span>
                </div>
                <button
                  onClick={() => update({ showPOIs: !layers.showPOIs })}
                  className={`p-1 rounded ${layers.showPOIs ? 'text-mars-orange' : 'text-gray-500'}`}
                >
                  {layers.showPOIs ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Legends Panel */}
          {showLegend && (
            <div className="p-2.5 bg-black/60 rounded-lg border border-mars-border/70 space-y-2 text-[11px] font-mono">
              <div className="font-semibold text-gray-300 border-b border-gray-800 pb-1">
                TERRAIN SLOPE CLASSIFICATION
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    &lt; 8° Nominal
                  </span>
                  <span className="text-gray-400">Standard EVA Walk</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    8° - 15° Caution
                  </span>
                  <span className="text-gray-400">+35% O2 Consumption</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-orange-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
                    15° - 25° Severe
                  </span>
                  <span className="text-gray-400">Slip & Tip Risk</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-red-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                    &gt; 25° Impassable
                  </span>
                  <span className="text-gray-400">Suit Instability Limit</span>
                </div>
              </div>
            </div>
          )}

          {/* Source Attribution Note */}
          <div className="text-[10px] text-gray-500 font-mono pt-1 border-t border-mars-border/40">
            Source: NASA JPL Mars Trek API • MGS MOLA • USGS Astrogeology SIM 3292
          </div>
        </div>
      )}
    </div>
  );
};
