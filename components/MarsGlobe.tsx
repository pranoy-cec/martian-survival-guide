'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { LANDING_SITES } from '@/lib/data/landingSites';
import { MARS_CRATERS } from '@/lib/data/marsCraters';
import { LandingSitePreset } from '@/lib/types';
import { RotateCw, Plus, Minus, RefreshCw } from 'lucide-react';

interface MarsGlobeProps {
  selectedSite: LandingSitePreset;
  onSelectSite: (site: LandingSitePreset) => void;
  width?: number;
  height?: number;
}

type GlobeTextureMode = 'VIKING_RGB' | 'MOLA_ELEVATION';

// Convert Lat/Lon to 3D Cartesian coordinates on sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Procedural 1024x512 high-detail Mars albedo texture generator
function generateProceduralMarsCanvas(mode: GlobeTextureMode): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const w = canvas.width;
  const h = canvas.height;

  // Latitudinal base gradient
  for (let y = 0; y < h; y++) {
    const lat = 90 - (y / h) * 180;
    const absLat = Math.abs(lat);

    let color = '';
    if (mode === 'VIKING_RGB') {
      if (absLat > 76) {
        const t = (absLat - 76) / 14;
        color = `rgb(${Math.round(210 + 45 * t)},${Math.round(215 + 40 * t)},${Math.round(220 + 35 * t)})`;
      } else if (lat > 20) {
        color = '#b05932'; // Northern smooth lowlands
      } else if (lat < -15) {
        color = '#99401b'; // Southern cratered highlands
      } else {
        color = '#c6663a'; // Equatorial belt
      }
    } else {
      // MOLA Topography hypsometric elevation
      if (absLat > 78) {
        color = '#e0f2fe';
      } else if (lat > 25) {
        color = '#0284c7';
      } else if (lat < -20) {
        color = '#eab308';
      } else {
        color = '#f97316';
      }
    }

    ctx.fillStyle = color;
    ctx.fillRect(0, y, w, 1);
  }

  // Major Mars Albedo Features (Equirectangular)
  const drawFeature = (cLon: number, cLat: number, rLon: number, rLat: number, col: string) => {
    const x = ((cLon % 360) / 360) * w;
    const y = ((90 - cLat) / 180) * h;
    const rx = (rLon / 360) * w;
    const ry = (rLat / 180) * h;

    const grad = ctx.createRadialGradient(x, y, 1, x, y, Math.max(rx, ry));
    grad.addColorStop(0, col);
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();

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
    // Syrtis Major Planum (dark volcanic basalt)
    drawFeature(70, 9, 26, 20, 'rgba(42, 18, 10, 0.75)');
    // Sinus Sabaeus / Meridiani
    drawFeature(340, -5, 42, 11, 'rgba(48, 20, 12, 0.65)');
    // Acidalia Planitia
    drawFeature(330, 48, 32, 22, 'rgba(55, 25, 15, 0.55)');
    // Hellas Basin (huge bright impact depression)
    drawFeature(70, -42, 32, 28, 'rgba(235, 172, 128, 0.65)');
    // Argyre Basin
    drawFeature(316, -50, 20, 18, 'rgba(220, 155, 115, 0.55)');
    // Valles Marineris canyon
    drawFeature(285, -12, 45, 7, 'rgba(32, 10, 6, 0.85)');
    // Tharsis Bulge & Olympus Mons
    drawFeature(226, 18.6, 12, 12, 'rgba(240, 175, 130, 0.85)');
    drawFeature(250, 0, 40, 30, 'rgba(215, 130, 85, 0.45)');
    // Polar Caps
    drawFeature(0, 86, 180, 8, 'rgba(255, 255, 255, 0.95)');
    drawFeature(0, -87, 180, 7, 'rgba(255, 255, 255, 0.92)');
  } else {
    // MOLA Topo features
    drawFeature(70, -42, 32, 28, 'rgba(76, 29, 149, 0.85)');
    drawFeature(316, -50, 20, 18, 'rgba(30, 58, 138, 0.75)');
    drawFeature(180, 50, 180, 28, 'rgba(3, 105, 161, 0.6)');
    drawFeature(226, 18.6, 14, 14, 'rgba(255, 255, 255, 0.95)');
    drawFeature(285, -12, 45, 7, 'rgba(59, 130, 246, 0.85)');
  }

  return canvas;
}

export const MarsGlobe: React.FC<MarsGlobeProps> = ({
  selectedSite,
  onSelectSite,
  width = 240,
  height = 240
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const marsMeshRef = useRef<THREE.Mesh | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const cratersGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Rotation & Zoom State
  const isDraggingRef = useRef<boolean>(false);
  const prevPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotationRef = useRef<{ x: number; y: number }>({
    x: (selectedSite.center.lat * Math.PI) / 180 * 0.7,
    y: ((-selectedSite.center.lon - 90) * Math.PI) / 180
  });

  const [mode, setMode] = useState<GlobeTextureMode>('VIKING_RGB');
  const [showCraters, setShowCraters] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  const GLOBE_RADIUS = 1.35;
  const MIN_CAMERA_DIST = 1.85;
  const MAX_CAMERA_DIST = 5.2;
  const DEFAULT_CAMERA_DIST = 3.5;

  // Center smoothly on selected site
  const centerOnSite = useCallback((site: LandingSitePreset) => {
    targetRotationRef.current = {
      x: ((site.center.lat * Math.PI) / 180) * 0.7,
      y: ((-site.center.lon - 90) * Math.PI) / 180
    };
  }, []);

  useEffect(() => {
    centerOnSite(selectedSite);
  }, [selectedSite, centerOnSite]);

  // Build Landing Site 3D Markers
  const buildLandingSites = useCallback((currentSiteId: string): THREE.Group => {
    const group = new THREE.Group();

    LANDING_SITES.forEach((site) => {
      const pos = latLonToVector3(site.center.lat, site.center.lon, GLOBE_RADIUS * 1.015);
      const isSelected = site.id === currentSiteId;

      // Pin Mesh
      const pinGeo = new THREE.SphereGeometry(isSelected ? 0.04 : 0.026, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: isSelected ? 0x00f0ff : 0xef4444
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      group.add(pinMesh);

      // Selected site pulse ring
      if (isSelected) {
        const ringGeo = new THREE.RingGeometry(0.055, 0.075, 32);
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
  }, [GLOBE_RADIUS]);

  // Build Crater Rings Layer
  const buildCraters = useCallback((): THREE.Group => {
    const group = new THREE.Group();

    MARS_CRATERS.forEach((crater) => {
      const pos = latLonToVector3(crater.latitude, crater.longitude, GLOBE_RADIUS * 1.006);
      const ringRadius = Math.max(0.02, (crater.diameterKm / 3389.5) * GLOBE_RADIUS * 0.38);

      const ringGeo = new THREE.RingGeometry(ringRadius * 0.88, ringRadius, 20);
      const ringMat = new THREE.MeshBasicMaterial({
        color: crater.waterIceEvidence ? 0x38bdf8 : 0xf59e0b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.55
      });

      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(pos.clone().multiplyScalar(2));
      group.add(ringMesh);
    });

    return group;
  }, [GLOBE_RADIUS]);

  // Texture update
  const applyTexture = useCallback((newMode: GlobeTextureMode) => {
    if (!marsMeshRef.current) return;

    // Apply procedural texture
    const canvas = generateProceduralMarsCanvas(newMode);
    const canvasTex = new THREE.CanvasTexture(canvas);
    canvasTex.colorSpace = THREE.SRGBColorSpace;
    canvasTex.generateMipmaps = true;

    const mat = marsMeshRef.current.material as THREE.MeshStandardMaterial;
    mat.map = canvasTex;
    mat.needsUpdate = true;

    // Load NASA Viking / MOLA texture asynchronously
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    const nasaUrl =
      newMode === 'VIKING_RGB'
        ? 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/0/0/0.jpg'
        : 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0//default/default028mm/0/0/0.jpg';

    loader.load(
      nasaUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        if (marsMeshRef.current) {
          (marsMeshRef.current.material as THREE.MeshStandardMaterial).map = tex;
          (marsMeshRef.current.material as THREE.MeshStandardMaterial).needsUpdate = true;
        }
      },
      undefined,
      () => {
        // Keep procedural fallback
      }
    );
  }, []);

  // Main Three.js setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = DEFAULT_CAMERA_DIST;
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    // Sun Lighting
    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x27272a, 0.7);
    scene.add(ambientLight);

    // Mars Sphere Mesh
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
    const canvasTex = new THREE.CanvasTexture(generateProceduralMarsCanvas(mode));
    canvasTex.colorSpace = THREE.SRGBColorSpace;

    const marsMat = new THREE.MeshStandardMaterial({
      map: canvasTex,
      roughness: 0.88,
      metalness: 0.05
    });
    const marsMesh = new THREE.Mesh(sphereGeo, marsMat);
    scene.add(marsMesh);
    marsMeshRef.current = marsMesh;

    // Initial position
    marsMesh.rotation.x = ((selectedSite.center.lat * Math.PI) / 180) * 0.7;
    marsMesh.rotation.y = ((-selectedSite.center.lon - 90) * Math.PI) / 180;

    // Atmospheric Glow Shell
    const atmoGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.025, 32, 32);
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
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
          gl_FragColor = vec4(0.92, 0.45, 0.22, 1.0) * intensity * 0.8;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    scene.add(atmoMesh);

    // Craters Layer
    const cratersGroup = buildCraters();
    marsMesh.add(cratersGroup);
    cratersGroupRef.current = cratersGroup;
    cratersGroup.visible = showCraters;

    // Landing Sites Layer
    const markersGroup = buildLandingSites(selectedSite.id);
    marsMesh.add(markersGroup);
    markersGroupRef.current = markersGroup;

    // Background texture update
    applyTexture(mode);

    // Animation Loop
    const animate = () => {
      if (marsMeshRef.current) {
        if (!isDraggingRef.current) {
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
  }, [width, height]);

  // Mode change
  useEffect(() => {
    applyTexture(mode);
  }, [mode, applyTexture]);

  // Craters visibility toggle
  useEffect(() => {
    if (cratersGroupRef.current) cratersGroupRef.current.visible = showCraters;
  }, [showCraters]);

  // Selected site update
  useEffect(() => {
    if (!marsMeshRef.current) return;
    if (markersGroupRef.current) {
      marsMeshRef.current.remove(markersGroupRef.current);
    }
    const newMarkers = buildLandingSites(selectedSite.id);
    marsMeshRef.current.add(newMarkers);
    markersGroupRef.current = newMarkers;
  }, [selectedSite, buildLandingSites]);

  // Pointer Drag Handlers (Rotation)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    setAutoRotate(false);
    prevPointerRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !marsMeshRef.current) return;

    const deltaX = e.clientX - prevPointerRef.current.x;
    const deltaY = e.clientY - prevPointerRef.current.y;
    prevPointerRef.current = { x: e.clientX, y: e.clientY };

    targetRotationRef.current.y += deltaX * 0.008;
    targetRotationRef.current.x = Math.max(
      -1.3,
      Math.min(1.3, targetRotationRef.current.x + deltaY * 0.008)
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

    const zoomDelta = e.deltaY * 0.003;
    const newZ = Math.max(
      MIN_CAMERA_DIST,
      Math.min(MAX_CAMERA_DIST, cameraRef.current.position.z + zoomDelta)
    );
    cameraRef.current.position.z = newZ;
    setZoomLevel(parseFloat((DEFAULT_CAMERA_DIST / newZ).toFixed(1)));
  };

  const handleZoomIn = () => {
    if (!cameraRef.current) return;
    const newZ = Math.max(MIN_CAMERA_DIST, cameraRef.current.position.z - 0.4);
    cameraRef.current.position.z = newZ;
    setZoomLevel(parseFloat((DEFAULT_CAMERA_DIST / newZ).toFixed(1)));
  };

  const handleZoomOut = () => {
    if (!cameraRef.current) return;
    const newZ = Math.min(MAX_CAMERA_DIST, cameraRef.current.position.z + 0.4);
    cameraRef.current.position.z = newZ;
    setZoomLevel(parseFloat((DEFAULT_CAMERA_DIST / newZ).toFixed(1)));
  };

  const handleReset = () => {
    centerOnSite(selectedSite);
    if (cameraRef.current) {
      cameraRef.current.position.z = DEFAULT_CAMERA_DIST;
      setZoomLevel(1.0);
    }
    setAutoRotate(true);
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Compact Top Toolbar */}
      <div className="w-full flex items-center justify-between gap-1 mb-1.5 text-[10px] font-mono">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMode('VIKING_RGB')}
            className={`px-1.5 py-0.5 rounded border transition-all ${
              mode === 'VIKING_RGB'
                ? 'bg-mars-red/40 text-mars-sand border-mars-red font-bold'
                : 'bg-black/40 text-gray-400 border-mars-border hover:text-white'
            }`}
            title="NASA Viking Visual RGB"
          >
            Viking
          </button>
          <button
            onClick={() => setMode('MOLA_ELEVATION')}
            className={`px-1.5 py-0.5 rounded border transition-all ${
              mode === 'MOLA_ELEVATION'
                ? 'bg-mars-cyan/40 text-mars-cyan border-mars-cyan font-bold'
                : 'bg-black/40 text-gray-400 border-mars-border hover:text-white'
            }`}
            title="NASA MOLA Elevation Topography"
          >
            MOLA
          </button>
          <button
            onClick={() => setShowCraters(!showCraters)}
            className={`px-1 py-0.5 rounded border transition-all ${
              showCraters
                ? 'bg-amber-950/60 text-amber-300 border-amber-600'
                : 'bg-black/40 text-gray-500 border-mars-border'
            }`}
            title="Toggle Craters"
          >
            Craters
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1 rounded border transition-all ${
              autoRotate
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : 'bg-black/40 text-gray-500 border-mars-border'
            }`}
            title="Toggle Auto-Rotation"
          >
            <RotateCw className="w-3 h-3" />
          </button>
          <button
            onClick={handleReset}
            className="p-1 rounded border bg-black/40 text-gray-400 border-mars-border hover:text-white"
            title="Recenter on Active Sector"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-black/50 border border-mars-border/60">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="cursor-grab active:cursor-grabbing touch-none block"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
        />

        {/* Minimal Zoom Controls overlay */}
        <div className="absolute bottom-1.5 right-1.5 flex flex-col gap-1 z-10">
          <button
            onClick={handleZoomIn}
            className="p-1 rounded bg-black/75 border border-mars-border text-gray-300 hover:text-white transition-all shadow"
            title="Zoom In"
          >
            <Plus className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 rounded bg-black/75 border border-mars-border text-gray-300 hover:text-white transition-all shadow"
            title="Zoom Out"
          >
            <Minus className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Zoom factor HUD */}
        <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 border border-mars-border/80 text-[8px] font-mono text-mars-cyan">
          {zoomLevel}x
        </div>
      </div>
    </div>
  );
};
