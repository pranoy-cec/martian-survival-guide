'use client';

import React from 'react';
import { useMission } from '@/context/MissionContext';
import { OpenLayersMap } from '@/components/OpenLayersMap';
import { LayerControl } from '@/components/LayerControl';
import { ElevationChart } from '@/components/ElevationChart';

export default function MartianMapPage() {
  const {
    selectedSite,
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

  return (
    <div className="relative w-full h-full overflow-hidden bg-mars-darkest">
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
    </div>
  );
}
