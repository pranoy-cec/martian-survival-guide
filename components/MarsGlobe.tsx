'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { LANDING_SITES } from '@/lib/data/landingSites';
import { MARS_CRATERS } from '@/lib/data/marsCraters';
import { LandingSitePreset } from '@/lib/types';
import {
  RotateCw,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  RefreshCw,
  Layers,
  MapPin,
  CircleDot,
  Globe as GlobeIcon
} from 'lucide-react';

interface MarsGlobeProps {
  selectedSite: LandingSitePreset;
  onSelectSite: (site: LandingSitePreset) => void;
  width?: number;
  height?: number;
}

type GlobeTextureMode = 'VIKING_RGB' | 'MOLA_ELEVATION' | 'THEMIS_THERMAL';

// Convert Lat/Lon to 3D Cartesian coordinates on a sphere of radius R
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Generate procedural 2048x1024 high-resolution Mars surface canvas
function generateProceduralMarsCanvas(mode: GlobeTextureMode): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const w = canvas.width;
  const h = canvas.height;

  // Base background gradient by latitude
  for (let y = 0; y < h; y++) {
    const lat = 90 - (y / h) * 180;
    const absLat = Math.abs(lat);

    let color = '';
    if (mode === 'VIKING_RGB') {
      // Natural Mars rust and basalt tones
      if (absLat > 75) {
        // Polar ice caps
        const t = (absLat - 75) / 15;
        const r = Math.round(200 + 55 * t);
        const g = Math.round(205 + 50 * t);
        const b = Math.round(210 + 45 * t);
        color = `rgb(${r},${g},${b})`;
      } else if (lat > 20) {
        // Northern lowlands (Vastitas Borealis): darker, smoother
        color = '#b05932';
      } else if (lat < -10) {
        // Southern cratered highlands: heavily cratered reddish-ochre
        color = '#9e4620';
      } else {
        // Equatorial belt
        color = '#c6663a';
      }
    } else if (mode === 'MOLA_ELEVATION') {
      // Hypsometric elevation color ramp (-8000m deep blue/purple to +21000m white)
      if (absLat > 78) {
        color = '#e0f2fe';
      } else if (lat > 25) {
        // Northern lowlands: deep blue / cyan
        color = '#0284c7';
      } else if (lat < -20) {
        // Southern highlands: ochre / yellow / green
        color = '#eab308';
      } else {
        color = '#f97316';
      }
    } else {
      // THEMIS Thermal Infrared
      color = absLat > 75 ? '#38bdf8' : '#78350f';
    }

    ctx.fillStyle = color;
    ctx.fillRect(0, y, w, 1);
  }

  // Draw major Mars geographic albedo features (equirectangular mapping)
  const drawAlbedoRegion = (
    cLon: number,
    cLat: number,
    rLonDeg: number,
    rLatDeg: number,
    fillColor: string
  ) => {
    const x = ((cLon % 360) / 360) * w;
    const y = ((90 - cLat) / 180) * h;
    const rx = (rLonDeg / 360) * w;
    const ry = (rLatDeg / 180) * h;

    const grad = ctx.createRadialGradient(x, y, 2, x, y, Math.max(rx, ry));
    grad.addColorStop(0, fillColor);
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();

    // Handle wrap-around near prime meridian
    if (x - rx < 0) {
      ctx.beginPath();
      ctx.ellipse(x + w, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    if (x + rx > w) {
      ctx.beginPath();
      ctx.ellipse(x - w, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  if (mode === 'VIKING_RGB') {
    // Syrtis Major (dark basaltic volcanic shield)
    drawAlbedoRegion(70, 9, 28, 22, 'rgba(45, 20, 12, 0.75)');
    // Sinus Sabaeus & Meridiani (dark equatorial belt)
    drawAlbedoRegion(340, -5, 45, 12, 'rgba(50, 22, 14, 0.65)');
    // Acidalia Planitia (dark northern lowland basin)
    drawAlbedoRegion(330, 48, 35, 25, 'rgba(60, 28, 18, 0.55)');
    // Utopia Planitia
    drawAlbedoRegion(118, 45, 40, 22, 'rgba(75, 34, 20, 0.45)');
    // Hellas Basin (huge bright dusty impact depression)
    drawAlbedoRegion(70, -42, 35, 30, 'rgba(235, 170, 125, 0.65)');
    // Argyre Basin
    drawAlbedoRegion(316, -50, 22, 20, 'rgba(220, 155, 115, 0.55)');
    // Valles Marineris (massive canyon system)
    drawAlbedoRegion(285, -12, 50, 8, 'rgba(35, 12, 8, 0.85)');
    // Tharsis Bulge (bright elevated dust mantling)
    drawAlbedoRegion(250, 0, 45, 35, 'rgba(215, 130, 85, 0.45)');
    // Olympus Mons (prominent volcanic caldera)
    drawAlbedoRegion(226, 18.6, 10, 10, 'rgba(240, 175, 130, 0.85)');
    // Elysium Mons
    drawAlbedoRegion(147, 25, 12, 12, 'rgba(220, 150, 105, 0.65)');
    // North Polar Ice Cap (Planum Boreum - brilliant white perennial ice)
    drawAlbedoRegion(0, 86, 180, 8, 'rgba(255, 255, 255, 0.95)');
    // South Polar Ice Cap (Planum Australe)
    drawAlbedoRegion(0, -87, 180, 7, 'rgba(255, 255, 255, 0.92)');
  } else if (mode === 'MOLA_ELEVATION') {
    // MOLA Topography hypsometric features
    // Hellas (-8000m deep impact basin) -> dark purple/blue
    drawAlbedoRegion(70, -42, 35, 30, 'rgba(76, 29, 149, 0.85)');
    // Argyre Basin (-5000m) -> deep blue
    drawAlbedoRegion(316, -50, 22, 20, 'rgba(30, 58, 138, 0.75)');
    // Northern lowlands (-4000m)
    drawAlbedoRegion(180, 50, 180, 30, 'rgba(3, 105, 161, 0.6)');
    // Tharsis Montes & Olympus Mons (+21000m) -> bright white / red
    drawAlbedoRegion(226, 18.6, 14, 14, 'rgba(255, 255, 255, 0.95)');
    drawAlbedoRegion(250, 0, 40, 30, 'rgba(239, 68, 68, 0.8)');
    // Valles Marineris canyon trough (-7000m)
    drawAlbedoRegion(285, -12, 48, 7, 'rgba(59, 130, 246, 0.85)');
  } else {
    // THEMIS Infrared Thermal Inertia
    drawAlbedoRegion(70, 9, 30, 25, 'rgba(249, 115, 22, 0.75)');
    drawAlbedoRegion(285, -12, 45, 10, 'rgba(234, 179, 8, 0.75)');
    drawAlbedoRegion(70, -42, 35, 30, 'rgba(14, 165, 233, 0.75)');
  }

  // Micro-texture cratering noise across surface
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 14;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  return canvas;
}

export const MarsGlobe: React.FC<MarsGlobeProps> = ({
  selectedSite,
  onSelectSite,
  width = 280,
  height = 280
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const marsMeshRef = useRef<THREE.Mesh | null>(null);
  const atmosphereMeshRef = useRef<THREE.Mesh | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const cratersGroupRef = useRef<THREE.Group | null>(null);
  const graticuleGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Interaction State
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotationRef = useRef<{ x: number; y: number }>({
    x: (selectedSite.center.lat * Math.PI) / 180,
    y: ((-selectedSite.center.lon - 90) * Math.PI) / 180
  });

  const [mode, setMode] = useState<GlobeTextureMode>('VIKING_RGB');
  const [showCraters, setShowCraters] = useState<boolean>(true);
  const [showSites, setShowSites] = useState<boolean>(true);
  const [showGraticule, setShowGraticule] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);

  const GLOBE_RADIUS = 1.6;

  // Zoom distance boundaries
  const MIN_CAMERA_DIST = 2.1; // Max zoom in (~3.5x)
  const MAX_CAMERA_DIST = 7.0; // Max zoom out (~0.8x)
  const DEFAULT_CAMERA_DIST = 4.2;

  // Smoothly center on selected site
  const centerOnSite = useCallback((site: LandingSitePreset) => {
    const latRad = (site.center.lat * Math.PI) / 180;
    const lonRad = ((-site.center.lon - 90) * Math.PI) / 180;

    targetRotationRef.current = {
      x: latRad * 0.75,
      y: lonRad
    };
  }, []);

  useEffect(() => {
    centerOnSite(selectedSite);
  }, [selectedSite, centerOnSite]);

  // Build Graticule (Lat/Lon Grid)
  const buildGraticule = useCallback((): THREE.Group => {
    const group = new THREE.Group();
    const material = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.18
    });

    const r = GLOBE_RADIUS * 1.002;

    // Latitude parallels: [-60, -30, 0, 30, 60]
    [-60, -30, 0, 30, 60].forEach((lat) => {
      const points: THREE.Vector3[] = [];
      const latRad = (lat * Math.PI) / 180;
      const cosLat = Math.cos(latRad);
      const sinLat = Math.sin(latRad);

      for (let lon = 0; lon <= 360; lon += 5) {
        const lonRad = (lon * Math.PI) / 180;
        points.push(
          new THREE.Vector3(
            -r * cosLat * Math.cos(lonRad),
            r * sinLat,
            r * cosLat * Math.sin(lonRad)
          )
        );
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      group.add(line);
    });

    // Longitude meridians every 45 degrees
    for (let lon = 0; lon < 360; lon += 45) {
      const points: THREE.Vector3[] = [];
      const lonRad = (lon * Math.PI) / 180;

      for (let lat = -90; lat <= 90; lat += 5) {
        const latRad = (lat * Math.PI) / 180;
        points.push(
          new THREE.Vector3(
            -r * Math.cos(latRad) * Math.cos(lonRad),
            r * Math.sin(latRad),
            r * Math.cos(latRad) * Math.sin(lonRad)
          )
        );
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      group.add(line);
    }

    return group;
  }, []);

  // Build Landing Site 3D Markers
  const buildLandingSites = useCallback(
    (currentSiteId: string): THREE.Group => {
      const group = new THREE.Group();

      LANDING_SITES.forEach((site) => {
        const pos = latLonToVector3(site.center.lat, site.center.lon, GLOBE_RADIUS * 1.015);
        const isSelected = site.id === currentSiteId;

        // Pin Beacon Sphere
        const pinGeo = new THREE.SphereGeometry(isSelected ? 0.045 : 0.03, 16, 16);
        const pinMat = new THREE.MeshBasicMaterial({
          color: isSelected ? 0x00f0ff : 0xef4444
        });
        const pinMesh = new THREE.Mesh(pinGeo, pinMat);
        pinMesh.position.copy(pos);
        pinMesh.name = `site_${site.id}`;
        group.add(pinMesh);

        // Pulsing Ring for Selected Site
        if (isSelected) {
          const ringGeo = new THREE.RingGeometry(0.065, 0.085, 32);
          const ringMat = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.position.copy(pos.clone().multiplyScalar(1.002));
          ringMesh.lookAt(pos.clone().multiplyScalar(2));
          group.add(ringMesh);
        }
      });

      return group;
    },
    []
  );

  // Build Craters 3D Rings Layer
  const buildCraters = useCallback((): THREE.Group => {
    const group = new THREE.Group();

    MARS_CRATERS.forEach((crater) => {
      const pos = latLonToVector3(crater.latitude, crater.longitude, GLOBE_RADIUS * 1.008);
      // Normalized ring radius based on actual crater diameter in km
      const ringRadius = Math.max(0.025, (crater.diameterKm / 3389.5) * GLOBE_RADIUS * 0.4);

      const ringGeo = new THREE.RingGeometry(ringRadius * 0.9, ringRadius, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: crater.waterIceEvidence ? 0x38bdf8 : 0xf59e0b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: crater.waterIceEvidence ? 0.75 : 0.55
      });

      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(pos.clone().multiplyScalar(2));
      group.add(ringMesh);
    });

    return group;
  }, []);

  // Update or Switch Texture
  const updateGlobeTexture = useCallback(
    (newMode: GlobeTextureMode) => {
      if (!marsMeshRef.current) return;

      // 1. Instantly apply high-resolution procedural texture
      const proceduralCanvas = generateProceduralMarsCanvas(newMode);
      const canvasTexture = new THREE.CanvasTexture(proceduralCanvas);
      canvasTexture.colorSpace = THREE.SRGBColorSpace;
      canvasTexture.minFilter = THREE.LinearMipmapLinearFilter;
      canvasTexture.generateMipmaps = true;

      const mat = marsMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.map = canvasTexture;
      mat.needsUpdate = true;

      // 2. Fetch NASA high-resolution tile mirror in background
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin('anonymous');

      let nasaTextureUrl = '';
      if (newMode === 'VIKING_RGB') {
        nasaTextureUrl =
          'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/0/0/0.jpg';
      } else if (newMode === 'MOLA_ELEVATION') {
        nasaTextureUrl =
          'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0//default/default028mm/0/0/0.jpg';
      }

      if (nasaTextureUrl) {
        loader.load(
          nasaTextureUrl,
          (nasaTex) => {
            nasaTex.colorSpace = THREE.SRGBColorSpace;
            nasaTex.minFilter = THREE.LinearMipmapLinearFilter;
            nasaTex.generateMipmaps = true;
            if (marsMeshRef.current) {
              const currentMat = marsMeshRef.current.material as THREE.MeshStandardMaterial;
              currentMat.map = nasaTex;
              currentMat.needsUpdate = true;
            }
          },
          undefined,
          () => {
            // Keep procedural texture on network error
          }
        );
      }
    },
    []
  );

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const currentWidth = isFullscreen ? Math.min(window.innerWidth - 48, 720) : width;
    const currentHeight = isFullscreen ? Math.min(window.innerHeight - 120, 720) : height;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, currentWidth / currentHeight, 0.1, 100);
    camera.position.z = DEFAULT_CAMERA_DIST;
    cameraRef.current = camera;

    // 3. Renderer with antialiasing and High-DPI support
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(currentWidth, currentHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // 4. Lighting (Simulating Sun in space)
    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    sunLight.position.set(6, 3, 5);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x27272a, 0.7);
    scene.add(ambientLight);

    const limbLight = new THREE.DirectionalLight(0x38bdf8, 0.4);
    limbLight.position.set(-6, -2, -4);
    scene.add(limbLight);

    // 5. Mars Sphere Mesh
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const proceduralCanvas = generateProceduralMarsCanvas(mode);
    const texture = new THREE.CanvasTexture(proceduralCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;

    const marsMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.88,
      metalness: 0.05
    });

    const marsMesh = new THREE.Mesh(sphereGeo, marsMat);
    scene.add(marsMesh);
    marsMeshRef.current = marsMesh;

    // Initial orientation
    marsMesh.rotation.x = (selectedSite.center.lat * Math.PI) / 180 * 0.75;
    marsMesh.rotation.y = ((-selectedSite.center.lon - 90) * Math.PI) / 180;

    // 6. Atmospheric Glow Shell (Mars Rayleigh Scattering Limb)
    const atmoGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.025, 48, 48);
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(0.92, 0.45, 0.22, 1.0) * intensity * 0.85;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    scene.add(atmoMesh);
    atmosphereMeshRef.current = atmoMesh;

    // 7. Graticule
    const graticuleGroup = buildGraticule();
    marsMesh.add(graticuleGroup);
    graticuleGroupRef.current = graticuleGroup;
    graticuleGroup.visible = showGraticule;

    // 8. Craters
    const cratersGroup = buildCraters();
    marsMesh.add(cratersGroup);
    cratersGroupRef.current = cratersGroup;
    cratersGroup.visible = showCraters;

    // 9. Landing Sites
    const markersGroup = buildLandingSites(selectedSite.id);
    marsMesh.add(markersGroup);
    markersGroupRef.current = markersGroup;
    markersGroup.visible = showSites;

    // Trigger texture fetch in background
    updateGlobeTexture(mode);

    // Render loop
    const animate = () => {
      if (marsMeshRef.current) {
        if (!isDraggingRef.current) {
          // Smoothly interpolate towards target rotation
          marsMeshRef.current.rotation.y = THREE.MathUtils.lerp(
            marsMeshRef.current.rotation.y,
            targetRotationRef.current.y,
            0.05
          );
          marsMeshRef.current.rotation.x = THREE.MathUtils.lerp(
            marsMeshRef.current.rotation.x,
            targetRotationRef.current.x,
            0.05
          );

          // Auto-rotate if enabled
          if (autoRotate) {
            targetRotationRef.current.y += 0.0018;
          }
        }
      }

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      sphereGeo.dispose();
      marsMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
    };
  }, [width, height, isFullscreen]);

  // Sync mode changes
  useEffect(() => {
    updateGlobeTexture(mode);
  }, [mode, updateGlobeTexture]);

  // Sync layer toggles
  useEffect(() => {
    if (cratersGroupRef.current) cratersGroupRef.current.visible = showCraters;
  }, [showCraters]);

  useEffect(() => {
    if (markersGroupRef.current) markersGroupRef.current.visible = showSites;
  }, [showSites]);

  useEffect(() => {
    if (graticuleGroupRef.current) graticuleGroupRef.current.visible = showGraticule;
  }, [showGraticule]);

  // Sync selected site markers
  useEffect(() => {
    if (!marsMeshRef.current) return;
    if (markersGroupRef.current) {
      marsMeshRef.current.remove(markersGroupRef.current);
    }
    const newMarkers = buildLandingSites(selectedSite.id);
    marsMeshRef.current.add(newMarkers);
    markersGroupRef.current = newMarkers;
    newMarkers.visible = showSites;
  }, [selectedSite, buildLandingSites, showSites]);

  // Mouse & Touch Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    setAutoRotate(false);
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !marsMeshRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

    // Apply rotation
    targetRotationRef.current.y += deltaX * 0.007;
    targetRotationRef.current.x = Math.max(
      -1.35,
      Math.min(1.35, targetRotationRef.current.x + deltaY * 0.007)
    );
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  // Zoom Handler via Mouse Wheel
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!cameraRef.current) return;

    const zoomDelta = e.deltaY * 0.0035;
    const newZ = Math.max(MIN_CAMERA_DIST, Math.min(MAX_CAMERA_DIST, cameraRef.current.position.z + zoomDelta));
    cameraRef.current.position.z = newZ;

    // Update UI Zoom Level display (1.0x at DEFAULT_CAMERA_DIST)
    const factor = (DEFAULT_CAMERA_DIST / newZ).toFixed(1);
    setZoomLevel(parseFloat(factor));
  };

  const handleZoomIn = () => {
    if (!cameraRef.current) return;
    const newZ = Math.max(MIN_CAMERA_DIST, cameraRef.current.position.z - 0.45);
    cameraRef.current.position.z = newZ;
    setZoomLevel(parseFloat((DEFAULT_CAMERA_DIST / newZ).toFixed(1)));
  };

  const handleZoomOut = () => {
    if (!cameraRef.current) return;
    const newZ = Math.min(MAX_CAMERA_DIST, cameraRef.current.position.z + 0.45);
    cameraRef.current.position.z = newZ;
    setZoomLevel(parseFloat((DEFAULT_CAMERA_DIST / newZ).toFixed(1)));
  };

  const handleResetView = () => {
    centerOnSite(selectedSite);
    if (cameraRef.current) {
      cameraRef.current.position.z = DEFAULT_CAMERA_DIST;
      setZoomLevel(1.0);
    }
    setAutoRotate(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center p-2 rounded-xl bg-black/60 border border-mars-border/80 shadow-2xl select-none transition-all ${
        isFullscreen ? 'fixed inset-4 z-[1300] bg-black/95 p-6 backdrop-blur-md' : 'w-full'
      }`}
    >
      {/* Top Controls Toolbar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-1 mb-2 px-1 text-[10px] font-mono z-10">
        {/* Layer Mode Switcher */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMode('VIKING_RGB')}
            className={`px-2 py-0.5 rounded border transition-all ${
              mode === 'VIKING_RGB'
                ? 'bg-mars-red/40 text-mars-sand border-mars-red font-bold'
                : 'bg-black/40 text-gray-400 border-mars-border hover:text-white'
            }`}
            title="NASA Viking Color RGB Visual Mosaic"
          >
            Viking RGB
          </button>
          <button
            onClick={() => setMode('MOLA_ELEVATION')}
            className={`px-2 py-0.5 rounded border transition-all ${
              mode === 'MOLA_ELEVATION'
                ? 'bg-mars-cyan/40 text-mars-cyan border-mars-cyan font-bold'
                : 'bg-black/40 text-gray-400 border-mars-border hover:text-white'
            }`}
            title="NASA MOLA Hypsometric Topography"
          >
            MOLA Topo
          </button>
          <button
            onClick={() => setMode('THEMIS_THERMAL')}
            className={`px-2 py-0.5 rounded border transition-all ${
              mode === 'THEMIS_THERMAL'
                ? 'bg-amber-950/60 text-amber-300 border-amber-600 font-bold'
                : 'bg-black/40 text-gray-400 border-mars-border hover:text-white'
            }`}
            title="THEMIS Thermal Infrared Inertia"
          >
            Thermal IR
          </button>
        </div>

        {/* Feature Toggles & Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSites(!showSites)}
            className={`p-1 rounded border transition-all ${
              showSites
                ? 'bg-mars-cyan/30 text-mars-cyan border-mars-cyan/60'
                : 'bg-black/40 text-gray-500 border-mars-border'
            }`}
            title="Toggle Landing Sites Layer"
          >
            <MapPin className="w-3 h-3" />
          </button>

          <button
            onClick={() => setShowCraters(!showCraters)}
            className={`p-1 rounded border transition-all ${
              showCraters
                ? 'bg-amber-950/60 text-amber-300 border-amber-600/60'
                : 'bg-black/40 text-gray-500 border-mars-border'
            }`}
            title={`Toggle Craters Layer (${MARS_CRATERS.length} craters)`}
          >
            <CircleDot className="w-3 h-3" />
          </button>

          <button
            onClick={() => setShowGraticule(!showGraticule)}
            className={`p-1 rounded border transition-all ${
              showGraticule
                ? 'bg-purple-950/60 text-purple-300 border-purple-600/60'
                : 'bg-black/40 text-gray-500 border-mars-border'
            }`}
            title="Toggle Lat/Lon Graticule Grid"
          >
            <GlobeIcon className="w-3 h-3" />
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1 rounded border transition-all ${
              autoRotate
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/60'
                : 'bg-black/40 text-gray-500 border-mars-border'
            }`}
            title="Toggle Auto-Rotation"
          >
            <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 rounded border bg-black/40 text-gray-400 border-mars-border hover:text-white"
            title={isFullscreen ? 'Exit Full View' : 'Expand 3D Globe'}
          >
            {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div className="relative flex items-center justify-center overflow-hidden rounded-lg">
        <canvas
          ref={canvasRef}
          width={isFullscreen ? 680 : width}
          height={isFullscreen ? 680 : height}
          className="cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
        />

        {/* Floating Zoom & Reset Buttons overlay on Globe */}
        <div className="absolute bottom-2 right-2 flex flex-col gap-1 z-20">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg bg-black/75 border border-mars-border text-gray-300 hover:text-white hover:bg-mars-dark transition-all shadow-md"
            title="Zoom In"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg bg-black/75 border border-mars-border text-gray-300 hover:text-white hover:bg-mars-dark transition-all shadow-md"
            title="Zoom Out"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={handleResetView}
            className="p-1.5 rounded-lg bg-black/75 border border-mars-border text-gray-300 hover:text-white hover:bg-mars-dark transition-all shadow-md"
            title="Reset to Selected Site View"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>

        {/* Zoom Factor HUD Pill */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-mars-border text-[9px] font-mono text-mars-cyan">
          {zoomLevel}x ZOOM
        </div>
      </div>

      {/* Bottom Info Status Bar */}
      <div className="w-full text-[10px] font-mono text-gray-400 mt-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-mars-cyan animate-pulse" />
          <span className="text-white font-bold tracking-wider">{selectedSite.name.toUpperCase()}</span>
          <span className="text-gray-500 hidden sm:inline">({selectedSite.historicMission})</span>
        </div>
        <div className="text-gray-400 flex items-center gap-2">
          <span className="text-mars-orange font-bold">
            {selectedSite.center.lat}°N, {selectedSite.center.lon}°E
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300">{selectedSite.elevationMeters}m MOLA</span>
        </div>
      </div>

      {/* Fullscreen Close button */}
      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 px-3 py-1 rounded bg-mars-red text-white text-xs font-mono font-bold shadow-lg"
        >
          ✕ Close Full View
        </button>
      )}
    </div>
  );
};
