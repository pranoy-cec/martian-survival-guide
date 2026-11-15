'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LANDING_SITES } from '@/lib/data/landingSites';
import {
  LandingSitePreset,
  RouteOption,
  MarsCoordinate,
  MissionProfile,
  EnvironmentalTelemetry,
  SciencePOI
} from '@/lib/types';
import { MapLayerState } from '@/components/LayerControl';
import { generateOptimizedRoutes } from '@/lib/engine/routeOptimizer';
import { getEnvironmentalTelemetry } from '@/lib/engine/environmentalModel';

interface MissionContextType {
  selectedSite: LandingSitePreset;
  setSelectedSite: (site: LandingSitePreset) => void;
  telemetry: EnvironmentalTelemetry | null;
  layers: MapLayerState;
  setLayers: React.Dispatch<React.SetStateAction<MapLayerState>>;
  startPoint: MarsCoordinate;
  destinationPoint: MarsCoordinate;
  setStartPoint: (coord: MarsCoordinate) => void;
  setDestinationPoint: (coord: MarsCoordinate) => void;
  profile: MissionProfile;
  setProfile: React.Dispatch<React.SetStateAction<MissionProfile>>;
  routes: RouteOption[];
  activeRoute: RouteOption | null;
  setActiveRoute: (route: RouteOption | null) => void;
  isCalculating: boolean;
  handleOptimize: () => void;
  handleUpdateCoordinates: (start: MarsCoordinate, dest: MarsCoordinate) => void;
  selectedPOI: SciencePOI | null;
  setSelectedPOI: (poi: SciencePOI | null) => void;
  isReportOpen: boolean;
  setIsReportOpen: (open: boolean) => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const MissionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSite, setSelectedSite] = useState<LandingSitePreset>(LANDING_SITES[0]);

  const [layers, setLayers] = useState<MapLayerState>({
    baseLayer: 'mola',
    showGeology: true,
    showHazards: true,
    showWaterIce: true,
    showCraters: true,
    showPOIs: true,
    showRoutes: true,
    showGraticule: true,
    layerOpacity: 0.75
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
      efficiency: 0.2,
      confidence: 0.1
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
    setActiveRoute(generated[0] || null);
  }, [selectedSite]);

  // Re-optimize routes with updated profile
  const handleOptimize = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const generated = generateOptimizedRoutes(startPoint, destinationPoint, profile);
      setRoutes(generated);
      setActiveRoute(generated[0] || null);
      setIsCalculating(false);
    }, 350);
  };

  const handleUpdateCoordinates = (start: MarsCoordinate, dest: MarsCoordinate) => {
    setStartPoint(start);
    setDestinationPoint(dest);
    const generated = generateOptimizedRoutes(start, dest, profile);
    setRoutes(generated);
    setActiveRoute(generated[0] || null);
  };

  return (
    <MissionContext.Provider
      value={{
        selectedSite,
        setSelectedSite,
        telemetry,
        layers,
        setLayers,
        startPoint,
        destinationPoint,
        setStartPoint,
        setDestinationPoint,
        profile,
        setProfile,
        routes,
        activeRoute,
        setActiveRoute,
        isCalculating,
        handleOptimize,
        handleUpdateCoordinates,
        selectedPOI,
        setSelectedPOI,
        isReportOpen,
        setIsReportOpen
      }}
    >
      {children}
    </MissionContext.Provider>
  );
};

export const useMission = () => {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return context;
};
