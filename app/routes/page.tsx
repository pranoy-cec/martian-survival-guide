'use client';

import React from 'react';
import { useMission } from '@/context/MissionContext';
import { RoutePlanner } from '@/components/RoutePlanner';
import { OpenLayersMap } from '@/components/OpenLayersMap';
import { ElevationChart } from '@/components/ElevationChart';

export default function RouteOptimizerPage() {
  const {
    selectedSite,
    layers,
    routes,
    activeRoute,
    setActiveRoute,
    startPoint,
    destinationPoint,
    handleUpdateCoordinates,
    profile,
    setProfile,
    handleOptimize,
    isCalculating,
    setSelectedPOI
  } = useMission();

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden bg-mars-darkest">
      {/* Split View Left: Route Planner Optimizer Controls & Scoring Breakdown */}
      <div className="flex-1 h-full overflow-hidden">
        <RoutePlanner
          routes={routes}
          activeRoute={activeRoute}
          onSelectRoute={setActiveRoute}
          startPoint={startPoint}
          destinationPoint={destinationPoint}
          onUpdateCoordinates={handleUpdateCoordinates}
          profile={profile}
          onChangeProfile={setProfile}
          onOptimize={handleOptimize}
          isCalculating={isCalculating}
          onSelectPOI={setSelectedPOI}
        />
      </div>

      {/* Split View Right: Mini GIS Map & Elevation Profile Preview */}
      <div className="hidden xl:flex w-[480px] h-full flex-col border-l border-mars-border bg-mars-panel p-3 space-y-3 overflow-y-auto">
        <div className="h-64 w-full rounded-xl overflow-hidden border border-mars-border relative shadow-lg">
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
        </div>

        {activeRoute && (
          <div className="flex-1">
            <ElevationChart route={activeRoute} />
          </div>
        )}
      </div>
    </div>
  );
}
