'use client';

import React, { useState } from 'react';
import { useMission } from '@/context/MissionContext';
import { OpenLayersMap } from '@/components/OpenLayersMap';
import { MarsGlobe } from '@/components/MarsGlobe';
import { LayerControl } from '@/components/LayerControl';
import { ElevationChart } from '@/components/ElevationChart';
import { Globe, Map as MapIcon, Compass } from 'lucide-react';

export default function MartianMapPage() {
  const {
    selectedSite,
    setSelectedSite,
    layers,
    setLayers,
    routes,
    activeRoute,
    setActiveRoute,
    setSelectedPOI,
    startPoint,
    destinationPoint,
    handleUpdateCoordinates
  } = useMission();

  const [viewMode, setViewMode] = useState<'2D_GIS' | '3D_GLOBE'>('2D_GIS');

  return (
    <div className="relative w-full h-full overflow-hidden bg-mars-darkest">
      {/* 2D vs 3D View Switcher Floating Bar */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-1 p-1 rounded-xl bg-mars-panel/90 border border-mars-border shadow-2xl backdrop-blur-md font-mono text-xs select-none">
        <button
          onClick={() => setViewMode('2D_GIS')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
            viewMode === '2D_GIS'
              ? 'bg-mars-red text-white shadow'
              : 'text-gray-400 hover:text-white hover:bg-black/40'
          }`}
        >
          <MapIcon className="w-3.5 h-3.5 text-mars-sand" />
          <span>2D GIS Map</span>
        </button>
        <button
          onClick={() => setViewMode('3D_GLOBE')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
            viewMode === '3D_GLOBE'
              ? 'bg-mars-cyan text-black shadow'
              : 'text-gray-400 hover:text-white hover:bg-black/40'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>3D NASA Globe</span>
        </button>
      </div>

      {viewMode === '2D_GIS' ? (
        <>
          {/* Full-bleed Martian OpenLayers GIS Map */}
          <OpenLayersMap
            selectedSite={selectedSite}
            layers={layers}
            routes={routes}
            activeRoute={activeRoute}
            onSelectRoute={setActiveRoute}
            onSelectPOI={setSelectedPOI}
            startPoint={startPoint}
            destinationPoint={destinationPoint}
            onUpdateCoordinates={handleUpdateCoordinates}
          />

          {/* Floating Layer Control Panel Widget */}
          <LayerControl layers={layers} onChangeLayers={setLayers} />

          {/* Bottom Floating Elevation Profile Preview */}
          {activeRoute && (
            <div className="absolute bottom-4 right-4 z-[900] hidden lg:block w-96 shadow-2xl">
              <ElevationChart route={activeRoute} />
            </div>
          )}
        </>
      ) : (
        /* Full-Screen 3D Interactive NASA Mars Globe */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-black via-mars-darkest to-black">
          <div className="w-full max-w-4xl h-full flex flex-col items-center justify-center">
            <MarsGlobe
              selectedSite={selectedSite}
              onSelectSite={setSelectedSite}
              width={640}
              height={600}
            />
          </div>
        </div>
      )}
    </div>
  );
}
