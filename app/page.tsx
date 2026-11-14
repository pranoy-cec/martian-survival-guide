'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { OpenLayersMap } from '@/components/OpenLayersMap';
import { LayerControl, MapLayerState } from '@/components/LayerControl';
import { RoutePlanner } from '@/components/RoutePlanner';
import { EnvironmentalHUD } from '@/components/EnvironmentalHUD';
import { NasaScienceExplorer } from '@/components/NasaScienceExplorer';
import { MissionControlDashboard } from '@/components/MissionControlDashboard';
import { ScienceInspector } from '@/components/ScienceInspector';
import { MissionReportModal } from '@/components/MissionReportModal';
import { ElevationChart } from '@/components/ElevationChart';
import { LANDING_SITES } from '@/lib/data/landingSites';
import {
  LandingSitePreset,
  RouteOption,
  MarsCoordinate,
  MissionProfile,
  EnvironmentalTelemetry,
  SciencePOI
} from '@/lib/types';
import { generateOptimizedRoutes } from '@/lib/engine/routeOptimizer';
import { getEnvironmentalTelemetry } from '@/lib/engine/environmentalModel';

export default function Home() {
  const [selectedSite, setSelectedSite] = useState<LandingSitePreset>(LANDING_SITES[0]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'routes' | 'environment' | 'science'>('dashboard');

  const [layers, setLayers] = useState<MapLayerState>({
    baseLayer: 'mola',
    showGeology: true,
    showHazards: true,
    showWaterIce: true,
    showPOIs: true,
    showRoutes: true,
    hazardOpacity: 0.6
  });

  const [startPoint, setStartPoint] = useState<MarsCoordinate>(LANDING_SITES[0].startPoint);
  const [destinationPoint, setDestinationPoint] = useState<MarsCoordinate>(LANDING_SITES[0].endPoint);

  const [profile, setProfile] = useState<MissionProfile>({
    astronautWeightKg: 80,
    spacesuitWeightKg: 140,
    roverAssisted: true,
    roverBatteryCapacityKwh: 35,
    maxEvaDurationHours: 8.0,
    primaryObjective: 'BALANCED',
    weights: {
      safety: 0.35,
      science: 0.35,
      efficiency: 0.20,
      confidence: 0.10
    }
  });

  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [activeRoute, setActiveRoute] = useState<RouteOption | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [telemetry, setTelemetry] = useState<EnvironmentalTelemetry | null>(null);
  const [selectedPOI, setSelectedPOI] = useState<SciencePOI | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Compute Initial Routes & Telemetry on Mount or Landing Site Change
  useEffect(() => {
    setStartPoint(selectedSite.startPoint);
    setDestinationPoint(selectedSite.endPoint);

    // Compute environmental telemetry
    const tel = getEnvironmentalTelemetry(selectedSite.name, selectedSite.center);
    setTelemetry(tel);

    // Compute routes
    const generated = generateOptimizedRoutes(selectedSite.startPoint, selectedSite.endPoint, profile);
    setRoutes(generated);
    setActiveRoute(generated[0]);
  }, [selectedSite]);

  // Re-optimize routes with updated profile
  const handleOptimize = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const generated = generateOptimizedRoutes(startPoint, destinationPoint, profile);
      setRoutes(generated);
      setActiveRoute(generated[0]);
      setIsCalculating(false);
    }, 350);
  };

  const handleUpdateCoordinates = (start: MarsCoordinate, dest: MarsCoordinate) => {
    setStartPoint(start);
    setDestinationPoint(dest);
    const generated = generateOptimizedRoutes(start, dest, profile);
    setRoutes(generated);
    setActiveRoute(generated[0]);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-mars-darkest">
      {/* Top Mission Control Header */}
      <Header
        selectedSite={selectedSite}
        onSelectSite={setSelectedSite}
        telemetry={telemetry}
        activeTab={activeTab as any}
        setActiveTab={setActiveTab as any}
      />

      {/* Main Application Workspace */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        {/* Module A: Mission Control Dashboard */}
        {activeTab === 'dashboard' && (
          <MissionControlDashboard
            selectedSite={selectedSite}
            onSelectSite={setSelectedSite}
            activeRoute={activeRoute}
            telemetry={telemetry}
            onNavigateTab={setActiveTab}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {/* Module B: Interactive Mars GIS Explorer (OpenLayers) */}
        {activeTab === 'map' && (
          <div className="relative w-full h-full">
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

            {/* Layer Control Panel Floating Widget */}
            <LayerControl layers={layers} onChangeLayers={setLayers} />

            {/* Bottom Floating Elevation Profile Preview */}
            {activeRoute && (
              <div className="absolute bottom-4 right-4 z-[900] hidden lg:block w-96">
                <ElevationChart route={activeRoute} />
              </div>
            )}
          </div>
        )}

        {/* Module E: Marswalk Route Planner */}
        {activeTab === 'routes' && (
          <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
            {/* Split View Left: Optimizer Controls & Scoring Dossier */}
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

            {/* Split View Right: Mini GIS Map & Elevation Profile */}
            <div className="hidden xl:flex w-[460px] h-full flex-col border-l border-mars-border bg-mars-panel p-3 space-y-3 overflow-y-auto">
              <div className="h-64 w-full rounded-xl overflow-hidden border border-mars-border relative">
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
        )}

        {/* Module F: Mars Environmental Intelligence HUD */}
        {activeTab === 'environment' && (
          <EnvironmentalHUD telemetry={telemetry} />
        )}

        {/* Module G: NASA Science Explorer */}
        {activeTab === 'science' && (
          <NasaScienceExplorer />
        )}

        {/* Side Drawer: Science POI Inspector */}
        <ScienceInspector poi={selectedPOI} onClose={() => setSelectedPOI(null)} />

        {/* Modal: Mission Flight Plan Briefing & JSON Report Generator */}
        <MissionReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          activeRoute={activeRoute}
          site={selectedSite}
          telemetry={telemetry}
        />
      </main>
    </div>
  );
}
