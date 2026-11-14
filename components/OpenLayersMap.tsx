'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MarsCoordinate, RouteOption, SciencePOI, LandingSitePreset } from '@/lib/types';
import { MapLayerState } from './LayerControl';
import { analyzeTerrainAtCoordinate, calculateMartianDistanceKm } from '@/lib/engine/elevationModel';
import { SCIENCE_POIS } from '@/lib/data/sciencePOIs';
import { MARS_CRATERS, getCratersNear, MarsCrater } from '@/lib/data/marsCraters';
import {
  Crosshair,
  Search,
  Ruler,
  Layers,
  Sparkles,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Compass,
  Maximize2,
  ShieldAlert,
  Droplets,
  Mountain,
  CircleDot
} from 'lucide-react';

interface OpenLayersMapProps {
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

export const OpenLayersMap: React.FC<OpenLayersMapProps> = ({
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
  const mapElementRef = useRef<HTMLDivElement>(null);
  const olMapRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const vectorLayerRef = useRef<any>(null);
  const vectorSourceRef = useRef<any>(null);

  const [cursorInfo, setCursorInfo] = useState<{
    lat: number;
    lon: number;
    elevation: number;
    slope: number;
    hazard: string;
    unit: string;
    iceProb?: number;
  } | null>(null);

  const [settingPoint, setSettingPoint] = useState<'START' | 'DEST' | null>(null);
  const [measuringMode, setMeasuringMode] = useState(false);
  const [measureStart, setMeasureStart] = useState<MarsCoordinate | null>(null);
  const [measureResult, setMeasureResult] = useState<{
    distanceKm: number;
    elevationDeltaM: number;
  } | null>(null);

  const [selectedCrater, setSelectedCrater] = useState<MarsCrater | null>(null);
  const [searchCoords, setSearchCoords] = useState({ lat: '', lon: '' });

  // Initialize OpenLayers Map (EPSG:4326 Mars Equirectangular Projection)
  useEffect(() => {
    if (typeof window === 'undefined' || !mapElementRef.current) return;

    let Map: any;
    let View: any;
    let TileLayer: any;
    let XYZ: any;
    let VectorLayer: any;
    let VectorSource: any;

    try {
      require('ol/ol.css');
      Map = require('ol/Map').default;
      View = require('ol/View').default;
      TileLayer = require('ol/layer/Tile').default;
      XYZ = require('ol/source/XYZ').default;
      VectorLayer = require('ol/layer/Vector').default;
      VectorSource = require('ol/source/Vector').default;
    } catch (e) {
      console.error('Failed to import OpenLayers modules', e);
      return;
    }

    if (olMapRef.current) {
      olMapRef.current.setTarget(null);
    }

    // Verified NASA Mars Trek Base Tile Source: MOLA Color Shaded Relief (463m)
    const molaSource = new XYZ({
      url: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
      maxZoom: 16,
      wrapX: true
    });

    const tileLayer = new TileLayer({
      source: molaSource
    });
    tileLayerRef.current = tileLayer;

    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 10,
      opacity: layers.layerOpacity || 0.75
    });
    vectorLayerRef.current = vectorLayer;

    // OpenLayers Map using Mars Equirectangular coordinates (EPSG:4326)
    const map = new Map({
      target: mapElementRef.current,
      layers: [tileLayer, vectorLayer],
      view: new View({
        projection: 'EPSG:4326',
        center: [selectedSite.center.lon, selectedSite.center.lat],
        zoom: selectedSite.defaultZoom,
        minZoom: 2,
        maxZoom: 16
      }),
      controls: [] // Custom NASA Aerospace HUD controls
    });

    olMapRef.current = map;

    // Real-time cursor movement listener: MOLA altimetry, local slope, hazard & geological unit
    map.on('pointermove', (evt: any) => {
      const coords = evt.coordinate;
      if (!coords) return;
      const lon = coords[0];
      const lat = coords[1];

      // Normalize East longitude to 0 - 360
      const normEastLon = Math.round((((lon % 360) + 360) % 360) * 10000) / 10000;
      const roundLat = Math.round(lat * 10000) / 10000;

      const terrain = analyzeTerrainAtCoordinate({ lat: roundLat, lon: normEastLon });
      setCursorInfo({
        lat: roundLat,
        lon: normEastLon,
        elevation: terrain.elevationMeters,
        slope: terrain.slopeDeg,
        hazard: terrain.hazardLevel,
        unit: terrain.geologicalUnit,
        iceProb: terrain.waterIceEvidence?.probability
      });
    });

    // Click handler: Set start/dest, measure distance, or inspect POIs / Craters / Routes
    map.on('click', (evt: any) => {
      const coords = evt.coordinate;
      if (!coords) return;
      const lon = Math.round((((coords[0] % 360) + 360) % 360) * 10000) / 10000;
      const lat = Math.round(coords[1] * 10000) / 10000;
      const elev = analyzeTerrainAtCoordinate({ lat, lon }).elevationMeters;

      if (measuringMode) {
        if (!measureStart) {
          setMeasureStart({ lat, lon, elevation: elev });
        } else {
          const dist = calculateMartianDistanceKm(measureStart, { lat, lon });
          const deltaElev = elev - (measureStart.elevation || 0);
          setMeasureResult({
            distanceKm: Math.round(dist * 100) / 100,
            elevationDeltaM: Math.round(deltaElev)
          });
        }
        return;
      }

      if (settingPoint === 'START') {
        onUpdateCoordinates({ lat, lon, elevation: elev }, destinationPoint);
        setSettingPoint(null);
      } else if (settingPoint === 'DEST') {
        onUpdateCoordinates(startPoint, { lat, lon, elevation: elev });
        setSettingPoint(null);
      } else {
        // Check if feature was clicked
        map.forEachFeatureAtPixel(evt.pixel, (feature: any) => {
          const poiData = feature.get('poiData');
          if (poiData) {
            onSelectPOI(poiData);
          }
          const craterData = feature.get('craterData');
          if (craterData) {
            setSelectedCrater(craterData);
          }
          const routeData = feature.get('routeData');
          if (routeData) {
            onSelectRoute(routeData);
          }
        });
      }
    });

    return () => {
      map.setTarget(null);
      olMapRef.current = null;
    };
  }, []);

  // Update Map View Center when landing site changes
  useEffect(() => {
    if (!olMapRef.current) return;
    const view = olMapRef.current.getView();
    view.setCenter([selectedSite.center.lon, selectedSite.center.lat]);
    view.setZoom(selectedSite.defaultZoom);
  }, [selectedSite]);

  // Update Base Tile Layer URL on user selection (MOLA Color vs Viking RGB vs MOLA Gray Shade)
  useEffect(() => {
    if (!tileLayerRef.current) return;
    const XYZ = require('ol/source/XYZ').default;

    let tileUrl =
      'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg';
    if (layers.baseLayer === 'viking') {
      tileUrl =
        'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg';
    } else if (layers.baseLayer === 'mola_gray') {
      tileUrl =
        'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_Shade_merge_global_463m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg';
    }

    const newSource = new XYZ({
      url: tileUrl,
      maxZoom: 16,
      wrapX: true
    });

    tileLayerRef.current.setSource(newSource);
  }, [layers.baseLayer]);

  // Update Layer Opacity dynamically
  useEffect(() => {
    if (vectorLayerRef.current) {
      vectorLayerRef.current.setOpacity(layers.layerOpacity || 0.75);
    }
  }, [layers.layerOpacity]);

  // Redraw All Graphical Mission Overlays: USGS Geology, Hazards, Water Ice, Craters, POIs, Routes, Graticule
  useEffect(() => {
    if (!vectorSourceRef.current) return;
    const Feature = require('ol/Feature').default;
    const Point = require('ol/geom/Point').default;
    const LineString = require('ol/geom/LineString').default;
    const Polygon = require('ol/geom/Polygon').default;
    const Style = require('ol/style/Style').default;
    const CircleStyle = require('ol/style/Circle').default;
    const Fill = require('ol/style/Fill').default;
    const Stroke = require('ol/style/Stroke').default;
    const Text = require('ol/style/Text').default;

    const source = vectorSourceRef.current;
    source.clear();

    const cLat = selectedSite.center.lat;
    const cLon = selectedSite.center.lon;

    // 1. USGS Planetary Geologic Units (SIM 3292) Layer
    if (layers.showGeology) {
      // Define sector-tailored geological formation polygons
      const geoPolygons = [
        {
          symbol: 'HNd',
          name: 'Deltaic Sedimentary Fan (Jezero Delta Member)',
          color: 'rgba(231, 111, 81, 0.45)',
          strokeColor: '#e76f51',
          coords: [
            [cLon - 0.05, cLat + 0.03],
            [cLon - 0.01, cLat + 0.07],
            [cLon + 0.04, cLat + 0.02],
            [cLon + 0.02, cLat - 0.04],
            [cLon - 0.03, cLat - 0.02],
            [cLon - 0.05, cLat + 0.03]
          ]
        },
        {
          symbol: 'Nf',
          name: 'Crater Floor Olivine-Bearing Cumulate',
          color: 'rgba(42, 157, 143, 0.35)',
          strokeColor: '#2a9d8f',
          coords: [
            [cLon - 0.03, cLat - 0.02],
            [cLon + 0.02, cLat - 0.04],
            [cLon + 0.07, cLat - 0.06],
            [cLon + 0.09, cLat - 0.12],
            [cLon + 0.01, cLat - 0.14],
            [cLon - 0.06, cLat - 0.08],
            [cLon - 0.03, cLat - 0.02]
          ]
        },
        {
          symbol: 'c',
          name: 'Impact Crater Rim Breccia & Escarpment Facies',
          color: 'rgba(230, 57, 70, 0.30)',
          strokeColor: '#e63946',
          coords: [
            [cLon - 0.11, cLat + 0.09],
            [cLon - 0.08, cLat + 0.14],
            [cLon - 0.01, cLat + 0.16],
            [cLon + 0.08, cLat + 0.13],
            [cLon + 0.14, cLat + 0.06],
            [cLon + 0.11, cLat + 0.03],
            [cLon + 0.05, cLat + 0.09],
            [cLon - 0.02, cLat + 0.12],
            [cLon - 0.07, cLat + 0.08],
            [cLon - 0.11, cLat + 0.09]
          ]
        }
      ];

      geoPolygons.forEach((poly) => {
        const polyFeature = new Feature({
          geometry: new Polygon([poly.coords]),
          name: poly.name
        });

        polyFeature.setStyle(
          new Style({
            fill: new Fill({ color: poly.color }),
            stroke: new Stroke({ color: poly.strokeColor, width: 2, lineDash: [4, 4] }),
            text: new Text({
              text: poly.symbol,
              font: 'bold 11px monospace',
              fill: new Fill({ color: '#ffffff' }),
              stroke: new Stroke({ color: '#000000', width: 3 }),
              offsetY: -6
            })
          })
        );
        source.addFeature(polyFeature);
      });
    }

    // 2. Slope & Roughness Hazard Layer (Steep Escarpments >15° and Boulder Zones)
    if (layers.showHazards) {
      const hazardBands = [
        {
          name: 'CRATER RIM ESCARPMENT HAZARD (>22°)',
          color: 'rgba(239, 68, 68, 0.40)',
          strokeColor: '#ef4444',
          coords: [
            [cLon - 0.09, cLat + 0.10],
            [cLon - 0.06, cLat + 0.13],
            [cLon + 0.01, cLat + 0.14],
            [cLon + 0.07, cLat + 0.11],
            [cLon + 0.06, cLat + 0.09],
            [cLon + 0.00, cLat + 0.12],
            [cLon - 0.05, cLat + 0.10],
            [cLon - 0.09, cLat + 0.10]
          ]
        },
        {
          name: 'STEEP DELTA SCARP (16°-20°)',
          color: 'rgba(245, 158, 11, 0.35)',
          strokeColor: '#f59e0b',
          coords: [
            [cLon - 0.045, cLat + 0.025],
            [cLon - 0.015, cLat + 0.055],
            [cLon - 0.005, cLat + 0.045],
            [cLon - 0.035, cLat + 0.018],
            [cLon - 0.045, cLat + 0.025]
          ]
        }
      ];

      hazardBands.forEach((hz) => {
        const hzFeature = new Feature({
          geometry: new Polygon([hz.coords]),
          name: hz.name
        });
        hzFeature.setStyle(
          new Style({
            fill: new Fill({ color: hz.color }),
            stroke: new Stroke({ color: hz.strokeColor, width: 2.2 }),
            text: new Text({
              text: '⚠ HAZARD >15°',
              font: 'bold 9px monospace',
              fill: new Fill({ color: '#fca5a5' }),
              stroke: new Stroke({ color: '#000000', width: 2.5 })
            })
          })
        );
        source.addFeature(hzFeature);
      });
    }

    // 3. SHARAD Subsurface Water Ice Detection Layer
    if (layers.showWaterIce) {
      const iceZones = [
        {
          name: 'SHARAD Dielectric Ice Anomaly (ε=3.15, Depth: 1.8m)',
          coords: [
            [cLon - 0.02, cLat + 0.08],
            [cLon + 0.05, cLat + 0.09],
            [cLon + 0.07, cLat + 0.05],
            [cLon + 0.03, cLat + 0.03],
            [cLon - 0.02, cLat + 0.08]
          ]
        }
      ];

      iceZones.forEach((ice) => {
        const iceFeature = new Feature({
          geometry: new Polygon([ice.coords]),
          name: ice.name
        });
        iceFeature.setStyle(
          new Style({
            fill: new Fill({ color: 'rgba(0, 240, 255, 0.28)' }),
            stroke: new Stroke({ color: '#00f0ff', width: 2, lineDash: [6, 4] }),
            text: new Text({
              text: '❄ SHARAD ICE (92% VOL)',
              font: 'bold 9px monospace',
              fill: new Fill({ color: '#00f0ff' }),
              stroke: new Stroke({ color: '#000000', width: 3 })
            })
          })
        );
        source.addFeature(iceFeature);
      });
    }

    // 4. Robbins / IAU Mars Impact Craters Layer
    if (layers.showCraters) {
      const nearbyCraters = getCratersNear(selectedSite.center, 800);
      nearbyCraters.forEach((crater) => {
        // Approximate crater rim circular footprint in degrees
        // 1 degree latitude on Mars ~ 59.16 km
        const radiusDeg = (crater.diameterKm / 2) / 59.16;
        const numSegments = 32;
        const ringCoords: [number, number][] = [];

        for (let i = 0; i <= numSegments; i++) {
          const angle = (i / numSegments) * Math.PI * 2;
          const lat = crater.latitude + Math.sin(angle) * radiusDeg;
          const lon = crater.longitude + (Math.cos(angle) * radiusDeg) / Math.cos((crater.latitude * Math.PI) / 180);
          ringCoords.push([lon, lat]);
        }

        const craterFeature = new Feature({
          geometry: new Polygon([ringCoords]),
          name: crater.name,
          craterData: crater
        });

        craterFeature.setStyle(
          new Style({
            stroke: new Stroke({
              color: crater.waterIceEvidence ? '#00f0ff' : '#f59e0b',
              width: 1.8,
              lineDash: [4, 4]
            }),
            fill: new Fill({
              color: crater.waterIceEvidence
                ? 'rgba(0, 240, 255, 0.08)'
                : 'rgba(245, 158, 11, 0.06)'
            }),
            text: new Text({
              text: `${crater.name} (${crater.diameterKm} km)`,
              font: 'bold 9px monospace',
              fill: new Fill({ color: crater.waterIceEvidence ? '#a5f3fc' : '#fde68a' }),
              stroke: new Stroke({ color: '#000000', width: 2.5 }),
              offsetY: -10
            })
          })
        );
        source.addFeature(craterFeature);
      });
    }

    // 5. Lat/Lon Coordinate Graticule Grid
    if (layers.showGraticule) {
      const minLon = Math.floor(cLon - 1.5);
      const maxLon = Math.ceil(cLon + 1.5);
      const minLat = Math.floor(cLat - 1.5);
      const maxLat = Math.ceil(cLat + 1.5);

      for (let lon = minLon; lon <= maxLon; lon += 0.25) {
        const gridLine = new Feature({
          geometry: new LineString([
            [lon, minLat - 0.5],
            [lon, maxLat + 0.5]
          ])
        });
        gridLine.setStyle(
          new Style({
            stroke: new Stroke({ color: 'rgba(255, 255, 255, 0.09)', width: 1, lineDash: [2, 6] }),
            text: new Text({
              text: `${lon.toFixed(2)}°E`,
              font: '8px monospace',
              fill: new Fill({ color: 'rgba(255, 255, 255, 0.45)' }),
              stroke: new Stroke({ color: '#000000', width: 2 }),
              offsetY: -8
            })
          })
        );
        source.addFeature(gridLine);
      }

      for (let lat = minLat; lat <= maxLat; lat += 0.25) {
        const gridLine = new Feature({
          geometry: new LineString([
            [minLon - 0.5, lat],
            [maxLon + 0.5, lat]
          ])
        });
        gridLine.setStyle(
          new Style({
            stroke: new Stroke({ color: 'rgba(255, 255, 255, 0.09)', width: 1, lineDash: [2, 6] }),
            text: new Text({
              text: `${lat.toFixed(2)}°N`,
              font: '8px monospace',
              fill: new Fill({ color: 'rgba(255, 255, 255, 0.45)' }),
              stroke: new Stroke({ color: '#000000', width: 2 }),
              offsetX: 14
            })
          })
        );
        source.addFeature(gridLine);
      }
    }

    // 6. Departure Depot Pin (EVA START)
    const startFeature = new Feature({
      geometry: new Point([startPoint.lon, startPoint.lat]),
      name: 'EVA Departure Depot'
    });
    startFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ color: '#10b981' }),
          stroke: new Stroke({ color: '#ffffff', width: 2.2 })
        }),
        text: new Text({
          text: 'EVA START',
          offsetY: -15,
          font: 'bold 10px monospace',
          fill: new Fill({ color: '#10b981' }),
          stroke: new Stroke({ color: '#000000', width: 3 })
        })
      })
    );
    source.addFeature(startFeature);

    // 7. Objective Terminal Pin
    const destFeature = new Feature({
      geometry: new Point([destinationPoint.lon, destinationPoint.lat]),
      name: 'Mission Objective Terminal'
    });
    destFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ color: '#ef4444' }),
          stroke: new Stroke({ color: '#ffffff', width: 2.2 })
        }),
        text: new Text({
          text: 'OBJECTIVE',
          offsetY: -15,
          font: 'bold 10px monospace',
          fill: new Fill({ color: '#ef4444' }),
          stroke: new Stroke({ color: '#000000', width: 3 })
        })
      })
    );
    source.addFeature(destFeature);

    // 8. Science POIs
    if (layers.showPOIs) {
      SCIENCE_POIS.forEach((poi) => {
        const poiFeature = new Feature({
          geometry: new Point([poi.location.lon, poi.location.lat]),
          name: poi.name,
          poiData: poi
        });

        let color = '#f59e0b';
        if (poi.category === 'WATER_ICE') color = '#00f0ff';
        else if (poi.category === 'BIOSIGNATURE_CANDIDATE') color = '#ec4899';

        poiFeature.setStyle(
          new Style({
            image: new CircleStyle({
              radius: 6,
              fill: new Fill({ color }),
              stroke: new Stroke({ color: '#ffffff', width: 1.8 })
            }),
            text: new Text({
              text: poi.name.split(' ')[0],
              offsetY: 13,
              font: '9px monospace',
              fill: new Fill({ color: '#ffffff' }),
              stroke: new Stroke({ color: '#000000', width: 2.5 })
            })
          })
        );
        source.addFeature(poiFeature);
      });
    }

    // 9. Strategic Routes
    if (layers.showRoutes && routes && routes.length > 0) {
      routes.forEach((route) => {
        const isSelected = activeRoute?.id === route.id;
        const coordinates = route.pathCoordinates.map(([lat, lon]) => [lon, lat]);

        const routeFeature = new Feature({
          geometry: new LineString(coordinates),
          name: route.title,
          routeData: route
        });

        let routeColor = '#f59e0b';
        if (route.type === 'SAFE') routeColor = '#10b981';
        else if (route.type === 'SCIENTIFIC') routeColor = '#00f0ff';
        else if (route.type === 'GEOMETRIC') routeColor = '#a855f7';

        routeFeature.setStyle(
          new Style({
            stroke: new Stroke({
              color: routeColor,
              width: isSelected ? 5.5 : 2.5,
              lineDash: isSelected ? undefined : [6, 8]
            })
          })
        );
        source.addFeature(routeFeature);

        // Waypoints for selected route
        if (isSelected) {
          route.waypoints.forEach((wp, idx) => {
            if (idx === 0 || idx === route.waypoints.length - 1) return;
            const wpFeature = new Feature({
              geometry: new Point([wp.coordinate.lon, wp.coordinate.lat]),
              name: wp.name
            });

            wpFeature.setStyle(
              new Style({
                image: new CircleStyle({
                  radius: 4.5,
                  fill: new Fill({ color: wp.hazardLevel === 'SEVERE' ? '#ef4444' : '#ffffff' }),
                  stroke: new Stroke({ color: routeColor, width: 2 })
                })
              })
            );
            source.addFeature(wpFeature);
          });
        }
      });
    }

    // 10. Measurement Line
    if (measuringMode && measureStart) {
      const measureFeature = new Feature({
        geometry: new Point([measureStart.lon, measureStart.lat])
      });
      measureFeature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: '#00f0ff' }),
            stroke: new Stroke({ color: '#ffffff', width: 2 })
          })
        })
      );
      source.addFeature(measureFeature);
    }
  }, [
    routes,
    activeRoute,
    layers,
    startPoint,
    destinationPoint,
    selectedSite,
    measuringMode,
    measureStart
  ]);

  // Jump to Searched Coordinates
  const handleSearchJump = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(searchCoords.lat);
    const lon = parseFloat(searchCoords.lon);
    if (isNaN(lat) || isNaN(lon) || !olMapRef.current) return;
    const view = olMapRef.current.getView();
    view.setCenter([lon, lat]);
    view.setZoom(12);
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-mars-darkest select-none">
      {/* OpenLayers Map Canvas */}
      <div ref={mapElementRef} className="w-full h-full z-0 cursor-crosshair" />

      {/* Graphical Tactical HUD Top Left Navigation Toolbar */}
      <div className="absolute top-4 left-4 z-[900] flex flex-wrap items-center gap-2 pointer-events-auto">
        {/* Search Coordinates Bar */}
        <form
          onSubmit={handleSearchJump}
          className="flex items-center gap-1.5 bg-mars-panel/95 backdrop-blur-md border border-mars-border px-2 py-1.5 rounded-lg shadow-xl text-xs font-mono"
        >
          <Search className="w-3.5 h-3.5 text-mars-orange shrink-0" />
          <input
            type="text"
            placeholder="Lat (e.g. 18.44)"
            value={searchCoords.lat}
            onChange={(e) => setSearchCoords({ ...searchCoords, lat: e.target.value })}
            className="w-20 bg-black/50 border border-mars-border/60 px-1.5 py-0.5 rounded text-white focus:outline-none focus:border-mars-cyan text-[11px]"
          />
          <input
            type="text"
            placeholder="Lon (e.g. 77.45)"
            value={searchCoords.lon}
            onChange={(e) => setSearchCoords({ ...searchCoords, lon: e.target.value })}
            className="w-20 bg-black/50 border border-mars-border/60 px-1.5 py-0.5 rounded text-white focus:outline-none focus:border-mars-cyan text-[11px]"
          />
          <button
            type="submit"
            className="px-2 py-0.5 rounded bg-mars-red text-white hover:bg-mars-rust text-[10px] font-bold"
          >
            GOTO
          </button>
        </form>

        {/* Distance Measurement Tool */}
        <button
          onClick={() => {
            setMeasuringMode(!measuringMode);
            setMeasureStart(null);
            setMeasureResult(null);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono shadow-xl transition-all ${
            measuringMode
              ? 'bg-mars-cyan text-black border-white font-bold'
              : 'bg-mars-panel/95 backdrop-blur-md border-mars-border text-gray-300 hover:text-white'
          }`}
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>
            {measuringMode
              ? measureResult
                ? `${measureResult.distanceKm} km (Δ ${measureResult.elevationDeltaM}m)`
                : 'Click 2 Points'
              : 'Measure Dist'}
          </span>
        </button>

        {/* Zoom Controls */}
        <div className="flex items-center bg-mars-panel/95 backdrop-blur-md border border-mars-border rounded-lg overflow-hidden shadow-xl">
          <button
            onClick={() => {
              if (!olMapRef.current) return;
              const view = olMapRef.current.getView();
              view.setZoom((view.getZoom() || 10) + 1);
            }}
            className="p-1.5 text-gray-300 hover:text-white hover:bg-mars-dark border-r border-mars-border"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (!olMapRef.current) return;
              const view = olMapRef.current.getView();
              view.setZoom((view.getZoom() || 10) - 1);
            }}
            className="p-1.5 text-gray-300 hover:text-white hover:bg-mars-dark"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Tactical Compass / North Arrow */}
        <div className="flex items-center gap-1 bg-mars-panel/95 backdrop-blur-md border border-mars-border px-2 py-1.5 rounded-lg text-[10px] font-mono text-gray-300 shadow-xl">
          <Compass className="w-3.5 h-3.5 text-mars-cyan" />
          <span className="font-bold text-white">NORTH ▲</span>
        </div>
      </div>

      {/* Floating Bottom Left: Real-time MOLA Altimetry & Hazard Telemetry HUD */}
      <div className="absolute bottom-4 left-4 z-[900] bg-mars-panel/95 backdrop-blur-md border border-mars-border rounded-xl p-3.5 shadow-2xl text-xs font-mono text-gray-200 min-w-[340px] max-w-[440px] pointer-events-auto">
        <div className="flex items-center justify-between border-b border-mars-border/70 pb-2 mb-2">
          <div className="flex items-center gap-2 font-bold text-mars-orange">
            <Crosshair className="w-4 h-4 text-mars-cyan animate-pulse" />
            <span>MARTIAN GIS TELEMETRY</span>
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
              Set Objective
            </button>
          </div>
        </div>

        {settingPoint && (
          <div className="mb-2 p-1.5 rounded bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[11px] flex items-center gap-1.5 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>
              Click any location on Mars to place{' '}
              {settingPoint === 'START' ? 'EVA Departure Depot' : 'Primary Objective'}
            </span>
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
                <span className="text-gray-400">MOLA Datum Elev:</span>{' '}
                <span className="font-bold text-mars-cyan">{cursorInfo.elevation} m</span>
              </div>
              <div>
                <span className="text-gray-400">Local Slope:</span>{' '}
                <span
                  className={`font-bold ${
                    cursorInfo.slope > 15
                      ? 'text-red-400'
                      : cursorInfo.slope > 8
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {cursorInfo.slope}°
                </span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-mars-border/50 flex items-center justify-between">
              <span className="text-gray-400 truncate max-w-[210px]" title={cursorInfo.unit}>
                {cursorInfo.unit}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  cursorInfo.hazard === 'NOMINAL'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : cursorInfo.hazard === 'MODERATE'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-red-950 text-red-400 border border-red-800'
                }`}
              >
                {cursorInfo.hazard}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center py-1">
            Move cursor over Martian surface to acquire MOLA altimetric telemetry
          </div>
        )}
      </div>

      {/* Selected Crater Detail Modal */}
      {selectedCrater && (
        <div className="absolute bottom-4 right-4 z-[900] bg-mars-panel/95 backdrop-blur-md border border-amber-500/60 rounded-xl p-4 shadow-2xl text-xs font-mono text-gray-200 max-w-sm pointer-events-auto">
          <div className="flex items-center justify-between border-b border-mars-border/70 pb-2 mb-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <CircleDot className="w-4 h-4" />
              <span>ROBBINS MARS CRATER ARCHIVE</span>
            </div>
            <button
              onClick={() => setSelectedCrater(null)}
              className="text-gray-400 hover:text-white font-bold px-1"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="font-bold text-white text-sm">{selectedCrater.name}</div>
            <div className="text-gray-400">{selectedCrater.morphology} • {selectedCrater.geologicalAge} Epoch</div>
            <div className="grid grid-cols-2 gap-1.5 bg-black/40 p-2 rounded border border-mars-border/60">
              <div>
                <span className="text-gray-400">Diameter:</span>{' '}
                <span className="font-bold text-mars-cyan">{selectedCrater.diameterKm} km</span>
              </div>
              <div>
                <span className="text-gray-400">Depth:</span>{' '}
                <span className="font-bold text-white">{selectedCrater.depthMeters} m</span>
              </div>
              <div>
                <span className="text-gray-400">Rim Elevation:</span>{' '}
                <span className="font-bold text-white">{selectedCrater.rimElevationMeters} m</span>
              </div>
              <div>
                <span className="text-gray-400">IAU Year:</span>{' '}
                <span className="font-bold text-gray-300">{selectedCrater.iauApprovedYear}</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed pt-1">{selectedCrater.scientificInterest}</p>
            <div className="pt-1 text-[10px] text-mars-orange">
              Mission: {selectedCrater.associatedMission}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
