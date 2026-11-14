'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MarsCoordinate, RouteOption, SciencePOI, TerrainAnalysis, LandingSitePreset } from '@/lib/types';
import { MapLayerState } from './LayerControl';
import { analyzeTerrainAtCoordinate } from '@/lib/engine/elevationModel';
import { SCIENCE_POIS } from '@/lib/data/sciencePOIs';
import { Crosshair, MapPin, AlertTriangle, ShieldCheck } from 'lucide-react';

interface MarsMapProps {
  selectedSite: LandingSitePreset;
  layers: MapLayerState;
  routes: RouteOption[];
  activeRoute: RouteOption | null;
  onSelectRoute: (route: RouteOption) => void;
  onSelectPOI: (poi: SciencePOI) => void;
  startPoint: MarsCoordinate;
  destinationPoint: MarsCoordinate;
  onUpdateCoordinates: (start: MarsCoordinate, dest: MarsCoordinate) => void;
}

export const MarsMap: React.FC<MarsMapProps> = ({
  selectedSite,
  layers,
  routes,
  activeRoute,
  onSelectRoute,
  onSelectPOI,
  startPoint,
  destinationPoint,
  onUpdateCoordinates
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersGroupRef = useRef<any>(null);
  const baseTileLayerRef = useRef<any>(null);

  const [cursorInfo, setCursorInfo] = useState<{
    lat: number;
    lon: number;
    elevation: number;
    slope: number;
    hazard: string;
    unit: string;
  } | null>(null);

  const [settingPoint, setSettingPoint] = useState<'START' | 'DEST' | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let L: any;
    try {
      L = require('leaflet');
      require('leaflet/dist/leaflet.css');
    } catch (e) {
      console.error('Leaflet load error:', e);
      return;
    }

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Leaflet equirectangular Martian projection setup
    const map = L.map(mapContainerRef.current, {
      center: [selectedSite.center.lat, selectedSite.center.lon],
      zoom: selectedSite.defaultZoom,
      minZoom: 2,
      maxZoom: 16,
      zoomControl: true,
      attributionControl: false
    });

    mapInstanceRef.current = map;
    layersGroupRef.current = L.layerGroup().addTo(map);

    // Mouse movement: live Martian coordinates and numerical terrain analysis
    map.on('mousemove', (e: any) => {
      const lat = Math.round(e.latlng.lat * 10000) / 10000;
      let lon = Math.round(e.latlng.lng * 10000) / 10000;
      // Normalize East longitude to 0 - 360
      const eastLon = Math.round((((lon % 360) + 360) % 360) * 10000) / 10000;

      const terrain = analyzeTerrainAtCoordinate({ lat, lon: eastLon });
      setCursorInfo({
        lat,
        lon: eastLon,
        elevation: terrain.elevationMeters,
        slope: terrain.slopeDeg,
        hazard: terrain.hazardLevel,
        unit: terrain.geologicalUnit
      });
    });

    // Map click: set start or destination
    map.on('click', (e: any) => {
      const lat = Math.round(e.latlng.lat * 10000) / 10000;
      const lon = Math.round((((e.latlng.lng % 360) + 360) % 360) * 10000) / 10000;
      const elev = analyzeTerrainAtCoordinate({ lat, lon }).elevationMeters;

      if (settingPoint === 'START') {
        onUpdateCoordinates({ lat, lon, elevation: elev }, destinationPoint);
        setSettingPoint(null);
      } else if (settingPoint === 'DEST') {
        onUpdateCoordinates(startPoint, { lat, lon, elevation: elev });
        setSettingPoint(null);
      }
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Center when Landing Site Changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView([selectedSite.center.lat, selectedSite.center.lon], selectedSite.defaultZoom);
  }, [selectedSite]);

  // Update Base Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const L = require('leaflet');

    if (baseTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(baseTileLayerRef.current);
    }

    let tileUrl = '';
    let maxNativeZoom = 7;

    if (layers.baseLayer === 'viking') {
      tileUrl = 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg';
      maxNativeZoom = 7;
    } else if (layers.baseLayer === 'mola_gray') {
      tileUrl = 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_Shade_merge_global_463m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg';
      maxNativeZoom = 7;
    } else {
      // Default: MOLA Color Shaded Relief
      tileUrl = 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg';
      maxNativeZoom = 7;
    }

    baseTileLayerRef.current = L.tileLayer(tileUrl, {
      maxZoom: 16,
      maxNativeZoom: maxNativeZoom,
      noWrap: false,
      errorTileUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0//default/default028mm/0/0/0.jpg'
    }).addTo(mapInstanceRef.current);

    baseTileLayerRef.current.bringToBack();
  }, [layers.baseLayer]);

  // Render Overlays: Routes, POIs, Hazards, Start & Destination Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !layersGroupRef.current) return;
    const L = require('leaflet');
    layersGroupRef.current.clearLayers();

    // 1. Render Departure & Destination Markers
    const startIcon = L.divIcon({
      className: 'custom-pin-start',
      html: `
        <div style="background-color: #10b981; color: white; border: 2px solid white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(16, 185, 129, 0.8); font-weight: bold; font-size: 11px;">
          EVA
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const destIcon = L.divIcon({
      className: 'custom-pin-dest',
      html: `
        <div style="background-color: #ef4444; color: white; border: 2px solid white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(239, 68, 68, 0.8); font-weight: bold; font-size: 11px;">
          OBJ
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    L.marker([startPoint.lat, startPoint.lon], { icon: startIcon })
      .bindPopup(`<b>EVA Departure Depot</b><br/>Lat: ${startPoint.lat}°<br/>Lon: ${startPoint.lon}°E<br/>Elev: ${startPoint.elevation ?? 'N/A'} m`)
      .addTo(layersGroupRef.current);

    L.marker([destinationPoint.lat, destinationPoint.lon], { icon: destIcon })
      .bindPopup(`<b>Primary Mission Objective</b><br/>Lat: ${destinationPoint.lat}°<br/>Lon: ${destinationPoint.lon}°E<br/>Elev: ${destinationPoint.elevation ?? 'N/A'} m`)
      .addTo(layersGroupRef.current);

    // 2. Render Science POIs
    if (layers.showPOIs) {
      SCIENCE_POIS.forEach(poi => {
        let pinColor = '#f59e0b'; // Gold / mineral
        let badge = 'SCI';
        if (poi.category === 'WATER_ICE') {
          pinColor = '#00f0ff';
          badge = 'H2O';
        } else if (poi.category === 'BIOSIGNATURE_CANDIDATE') {
          pinColor = '#ec4899';
          badge = 'BIO';
        } else if (poi.category === 'CRATER_RIM') {
          pinColor = '#f97316';
          badge = 'RIM';
        }

        const poiIcon = L.divIcon({
          className: 'custom-poi-marker',
          html: `
            <div style="background: ${pinColor}; color: #000; border: 1.5px solid #fff; border-radius: 6px; padding: 2px 4px; font-weight: bold; font-size: 10px; font-family: monospace; box-shadow: 0 0 12px ${pinColor}; display: flex; align-items: center; gap: 2px; cursor: pointer;">
              <span>${badge}</span>
            </div>
          `,
          iconSize: [36, 20],
          iconAnchor: [18, 10]
        });

        const marker = L.marker([poi.location.lat, poi.location.lon], { icon: poiIcon })
          .addTo(layersGroupRef.current);

        marker.on('click', () => {
          onSelectPOI(poi);
        });

        marker.bindTooltip(`<b>${poi.name}</b><br/>${poi.scientificSignificance.slice(0, 75)}...`, {
          direction: 'top',
          className: 'bg-mars-panel text-white border border-mars-border text-xs rounded p-1'
        });
      });
    }

    // 3. Render Routes
    if (routes && routes.length > 0) {
      routes.forEach(route => {
        const isSelected = activeRoute?.id === route.id;
        let color = '#f59e0b'; // Amber balanced
        let dashArray = undefined;

        if (route.type === 'SAFE') {
          color = '#10b981'; // Emerald safe
        } else if (route.type === 'SCIENTIFIC') {
          color = '#00f0ff'; // Cyan science
        }

        const polyline = L.polyline(route.pathCoordinates, {
          color: color,
          weight: isSelected ? 5 : 3,
          opacity: isSelected ? 0.95 : 0.55,
          dashArray: isSelected ? undefined : '5, 8'
        }).addTo(layersGroupRef.current);

        polyline.on('click', () => {
          onSelectRoute(route);
        });

        // Add waypoint markers if active route
        if (isSelected) {
          route.waypoints.forEach((wp, idx) => {
            if (idx === 0 || idx === route.waypoints.length - 1) return; // skip start/end already drawn

            const wpMarker = L.circleMarker([wp.coordinate.lat, wp.coordinate.lon], {
              radius: 5,
              color: '#ffffff',
              weight: 1.5,
              fillColor: wp.hazardLevel === 'SEVERE' ? '#ef4444' : (wp.hazardLevel === 'MODERATE' ? '#f59e0b' : '#10b981'),
              fillOpacity: 0.9
            }).addTo(layersGroupRef.current);

            wpMarker.bindPopup(`
              <div style="font-size: 11px; font-family: monospace;">
                <b>${wp.name}</b><br/>
                Distance: ${wp.distanceFromStartKm} km | Time: ${wp.cumulativeTimeMin} min<br/>
                Elev: ${wp.elevationMeters} m | Slope: ${wp.slopeDeg}°<br/>
                Status: <b>${wp.hazardLevel}</b><br/>
                O2 Expended: ${wp.cumulativeOxygenLiters} L
              </div>
            `);
          });
        }
      });
    }
  }, [routes, activeRoute, layers.showPOIs, startPoint, destinationPoint]);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-mars-darkest">
      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0 cursor-crosshair" />

      {/* Floating HUD: Martian Crosshair Coordinate & Altimetric Display */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-mars-panel/95 backdrop-blur-md border border-mars-border rounded-xl p-3 shadow-2xl text-xs font-mono text-gray-200 min-w-[320px] max-w-[420px] pointer-events-auto">
        <div className="flex items-center justify-between border-b border-mars-border/70 pb-2 mb-2">
          <div className="flex items-center gap-2 font-bold text-mars-orange">
            <Crosshair className="w-4 h-4 text-mars-cyan animate-spin-slow" />
            <span>MARTIAN SURFACE TELEMETRY</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSettingPoint(settingPoint === 'START' ? null : 'START')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition-all ${
                settingPoint === 'START'
                  ? 'bg-emerald-500 text-white border-white animate-pulse'
                  : 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/80'
              }`}
            >
              Set Start
            </button>
            <button
              onClick={() => setSettingPoint(settingPoint === 'DEST' ? null : 'DEST')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition-all ${
                settingPoint === 'DEST'
                  ? 'bg-red-500 text-white border-white animate-pulse'
                  : 'bg-red-950/60 text-red-300 border-red-700/60 hover:bg-red-900/80'
              }`}
            >
              Set Dest
            </button>
          </div>
        </div>

        {settingPoint && (
          <div className="mb-2 p-1.5 rounded bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[11px] flex items-center gap-1.5 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Click any location on Mars map to establish {settingPoint === 'START' ? 'EVA Departure Depot' : 'Mission Objective Terminal'}</span>
          </div>
        )}

        {cursorInfo ? (
          <div className="space-y-1.5 text-[11px]">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-400">Latitude:</span>{' '}
                <span className="font-bold text-white">{cursorInfo.lat.toFixed(4)}° N</span>
              </div>
              <div>
                <span className="text-gray-400">Longitude:</span>{' '}
                <span className="font-bold text-white">{cursorInfo.lon.toFixed(4)}° E</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-400">MOLA Elevation:</span>{' '}
                <span className="font-bold text-mars-cyan">{cursorInfo.elevation} m</span>
              </div>
              <div>
                <span className="text-gray-400">Local Slope:</span>{' '}
                <span className={`font-bold ${cursorInfo.slope > 15 ? 'text-red-400' : (cursorInfo.slope > 8 ? 'text-amber-400' : 'text-emerald-400')}`}>
                  {cursorInfo.slope}°
                </span>
              </div>
            </div>

            <div className="pt-1 border-t border-mars-border/50 flex items-center justify-between">
              <span className="text-gray-400 truncate max-w-[200px]" title={cursorInfo.unit}>
                {cursorInfo.unit}
              </span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                cursorInfo.hazard === 'NOMINAL' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                cursorInfo.hazard === 'MODERATE' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                'bg-red-950 text-red-400 border border-red-800'
              }`}>
                {cursorInfo.hazard}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center py-1">
            Hover over Martian surface to acquire real-time MOLA altimetric telemetry
          </div>
        )}
      </div>
    </div>
  );
};
