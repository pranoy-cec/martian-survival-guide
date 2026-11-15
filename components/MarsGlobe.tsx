'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LANDING_SITES } from '@/lib/data/landingSites';
import { MARS_CRATERS } from '@/lib/data/marsCraters';
import { LandingSitePreset } from '@/lib/types';
import { RotateCw, Compass, Eye, Sparkles } from 'lucide-react';

interface MarsGlobeProps {
  selectedSite: LandingSitePreset;
  onSelectSite: (site: LandingSitePreset) => void;
  width?: number;
  height?: number;
}

export const MarsGlobe: React.FC<MarsGlobeProps> = ({
  selectedSite,
  onSelectSite,
  width = 280,
  height = 280
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotLonRef = useRef<number>(selectedSite.center.lon);
  const rotLatRef = useRef<number>(Math.max(-45, Math.min(45, selectedSite.center.lat * 0.5)));
  const animFrameRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const autoRotateRef = useRef<boolean>(true);
  const dragDistanceRef = useRef<number>(0);

  const [globeMode, setGlobeMode] = useState<'NATURAL_VIKING' | 'MOLA_ELEVATION'>('NATURAL_VIKING');
  const [showCraters, setShowCraters] = useState<boolean>(true);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);

  // Sync orientation when user picks a site from dropdown
  useEffect(() => {
    rotLonRef.current = selectedSite.center.lon;
    rotLatRef.current = Math.max(-45, Math.min(45, selectedSite.center.lat * 0.5));
  }, [selectedSite]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Try loading NASA Viking Global Mosaic texture image for photorealism
    const nasaVikingImg = new Image();
    nasaVikingImg.crossOrigin = 'anonymous';
    // NASA Viking high-res MDIM 2.1 global texture mirror
    nasaVikingImg.src =
      'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/0/0/0.jpg';
    let imgLoaded = false;
    nasaVikingImg.onload = () => {
      imgLoaded = true;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const radius = width * 0.43;
      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Space background stars & subtle glow
      // Outer Atmospheric Rayleigh Limb Glow (Martian thin CO2 atmosphere with dust haze)
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.94,
        centerX,
        centerY,
        radius * 1.28
      );
      if (globeMode === 'NATURAL_VIKING') {
        glowGrad.addColorStop(0, 'rgba(230, 115, 80, 0.45)');
        glowGrad.addColorStop(0.35, 'rgba(120, 180, 240, 0.22)'); // Blue Rayleigh haze on Mars limb!
        glowGrad.addColorStop(0.7, 'rgba(193, 68, 14, 0.08)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
        glowGrad.addColorStop(0.5, 'rgba(147, 51, 234, 0.15)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.28, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Sphere Clipping
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      // Photorealistic Shading Gradient (Simulating Sun from Top-Left)
      const sunOffsetX = -radius * 0.35;
      const sunOffsetY = -radius * 0.35;
      const sphereGrad = ctx.createRadialGradient(
        centerX + sunOffsetX,
        centerY + sunOffsetY,
        radius * 0.05,
        centerX,
        centerY,
        radius
      );

      if (globeMode === 'NATURAL_VIKING') {
        sphereGrad.addColorStop(0, '#e5805e'); // Sunlit Martian basaltic dust
        sphereGrad.addColorStop(0.35, '#c95a28');
        sphereGrad.addColorStop(0.7, '#8b2e0b');
        sphereGrad.addColorStop(1, '#1f0904'); // Dark terminator
      } else {
        // MOLA Hypsometric Elevation Ramp
        sphereGrad.addColorStop(0, '#f97316');
        sphereGrad.addColorStop(0.35, '#eab308');
        sphereGrad.addColorStop(0.65, '#06b6d4');
        sphereGrad.addColorStop(1, '#1e1b4b');
      }

      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // 3. Render NASA Texture if loaded, or High-Fidelity Planetary Features
      const rotLonRad = (rotLonRef.current * Math.PI) / 180;
      const rotLatRad = (rotLatRef.current * Math.PI) / 180;

      if (imgLoaded && nasaVikingImg.naturalWidth > 0 && globeMode === 'NATURAL_VIKING') {
        ctx.globalAlpha = 0.55;
        // Project texture map across visible hemisphere using longitudinal scroll
        const texOffset = ((rotLonRef.current % 360) / 360) * nasaVikingImg.naturalWidth;
        ctx.drawImage(
          nasaVikingImg,
          texOffset,
          0,
          nasaVikingImg.naturalWidth / 2,
          nasaVikingImg.naturalHeight,
          centerX - radius,
          centerY - radius,
          radius * 2,
          radius * 2
        );
        ctx.globalAlpha = 1.0;
      }

      // Procedural Albedo Markings (Syrtis Major, Hellas, Sinus Sabaeus, Valles Marineris)
      // These guarantee authentic features even if tile server has network latency
      const drawFeature = (
        fLat: number,
        fLon: number,
        fRadiusKm: number,
        color: string,
        shape: 'circle' | 'chasm' | 'icecap'
      ) => {
        const dLon = ((fLon - rotLonRef.current) * Math.PI) / 180;
        const latRad = (fLat * Math.PI) / 180;

        // Orthographic projection formulas with pitch tilt
        const cosLat = Math.cos(latRad);
        const sinLat = Math.sin(latRad);
        const cosPitch = Math.cos(rotLatRad);
        const sinPitch = Math.sin(rotLatRad);

        const xNorm = cosLat * Math.sin(dLon);
        const yNorm = sinLat * cosPitch - cosLat * Math.cos(dLon) * sinPitch;
        const zNorm = sinLat * sinPitch + cosLat * Math.cos(dLon) * cosPitch;

        // Only draw if on front hemisphere
        if (zNorm > 0.05) {
          const px = centerX + xNorm * radius;
          const py = centerY - yNorm * radius;
          const rPx = Math.max(3, (fRadiusKm / 3389.5) * radius * zNorm);

          ctx.fillStyle = color;
          ctx.beginPath();
          if (shape === 'chasm') {
            ctx.ellipse(px, py, rPx * 2.8, rPx * 0.45, (25 * Math.PI) / 180, 0, Math.PI * 2);
          } else if (shape === 'icecap') {
            ctx.ellipse(px, py, rPx * 1.8, rPx * 0.6, 0, 0, Math.PI * 2);
          } else {
            ctx.arc(px, py, rPx, 0, Math.PI * 2);
          }
          ctx.fill();
        }
      };

      // Syrtis Major (dark basaltic volcanic shield)
      drawFeature(9.2, 70.0, 650, 'rgba(40, 15, 8, 0.48)', 'circle');
      // Sinus Sabaeus & Meridiani (dark equatorial belt)
      drawFeature(-2.0, 345.0, 950, 'rgba(45, 18, 10, 0.42)', 'chasm');
      // Hellas Basin (huge bright impact depression)
      drawFeature(-42.7, 70.0, 1100, 'rgba(235, 175, 130, 0.45)', 'circle');
      // Argyre Basin
      drawFeature(-49.7, 316.0, 500, 'rgba(225, 160, 120, 0.35)', 'circle');
      // Valles Marineris (massive canyon)
      drawFeature(-10.0, 290.0, 1600, 'rgba(30, 10, 5, 0.55)', 'chasm');
      // Tharsis Montes & Olympus Mons
      drawFeature(18.65, 226.2, 350, 'rgba(255, 195, 140, 0.55)', 'circle');
      drawFeature(0.0, 248.0, 450, 'rgba(220, 140, 95, 0.4)', 'circle');
      // North Polar Ice Cap (Planum Boreum - bright white water/dry ice)
      drawFeature(85.0, 0.0, 550, 'rgba(255, 255, 255, 0.88)', 'icecap');
      // South Polar Ice Cap (Planum Australe)
      drawFeature(-85.0, 0.0, 420, 'rgba(255, 255, 255, 0.82)', 'icecap');

      // 4. Coordinate Graticule (Parallels and Meridians)
      ctx.strokeStyle =
        globeMode === 'NATURAL_VIKING'
          ? 'rgba(255, 215, 180, 0.12)'
          : 'rgba(0, 240, 255, 0.18)';
      ctx.lineWidth = 1;

      // Parallels
      [-60, -30, 0, 30, 60].forEach((lat) => {
        const latRad = (lat * Math.PI) / 180;
        const sinLat = Math.sin(latRad);
        const cosLat = Math.cos(latRad);
        const yNorm = sinLat * Math.cos(rotLatRad);
        const y = centerY - yNorm * radius;
        const rParallel = cosLat * radius;
        if (Math.abs(yNorm) < 0.98) {
          ctx.beginPath();
          ctx.ellipse(
            centerX,
            y,
            rParallel,
            Math.max(1, rParallel * 0.28 * Math.cos(rotLatRad)),
            0,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }
      });

      // Meridians
      for (let lon = 0; lon < 360; lon += 45) {
        const dLon = ((lon - rotLonRef.current) * Math.PI) / 180;
        const cosLon = Math.cos(dLon);
        if (cosLon > 0) {
          ctx.beginPath();
          ctx.ellipse(
            centerX + Math.sin(dLon) * radius * 0.95,
            centerY,
            radius * 0.12 * Math.abs(cosLon),
            radius,
            0,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }
      }

      // 5. Craters Layer
      if (showCraters) {
        MARS_CRATERS.forEach((crater) => {
          const dLon = ((crater.longitude - rotLonRef.current) * Math.PI) / 180;
          const latRad = (crater.latitude * Math.PI) / 180;
          const cosLat = Math.cos(latRad);
          const sinLat = Math.sin(latRad);
          const xNorm = cosLat * Math.sin(dLon);
          const yNorm = sinLat * Math.cos(rotLatRad) - cosLat * Math.cos(dLon) * Math.sin(rotLatRad);
          const zNorm = sinLat * Math.sin(rotLatRad) + cosLat * Math.cos(dLon) * Math.cos(rotLatRad);

          if (zNorm > 0.15) {
            const cx = centerX + xNorm * radius;
            const cy = centerY - yNorm * radius;
            const rPx = Math.max(1.8, (crater.diameterKm / 3389.5) * radius * zNorm * 0.6);

            // Crater Rim Outline
            ctx.strokeStyle = crater.waterIceEvidence
              ? 'rgba(0, 240, 255, 0.65)'
              : 'rgba(245, 158, 11, 0.55)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(cx, cy, rPx, 0, Math.PI * 2);
            ctx.stroke();

            // Label prominent craters
            if (crater.diameterKm >= 80 && zNorm > 0.4) {
              ctx.font = '8px monospace';
              ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
              ctx.fillText(crater.name.replace(' Crater', ''), cx + rPx + 3, cy + 2);
            }
          }
        });
      }

      // 6. NASA Landing Sites & Exploration Sectors
      LANDING_SITES.forEach((site) => {
        const dLon = ((site.center.lon - rotLonRef.current) * Math.PI) / 180;
        const latRad = (site.center.lat * Math.PI) / 180;
        const cosLat = Math.cos(latRad);
        const sinLat = Math.sin(latRad);
        const xNorm = cosLat * Math.sin(dLon);
        const yNorm = sinLat * Math.cos(rotLatRad) - cosLat * Math.cos(dLon) * Math.sin(rotLatRad);
        const zNorm = sinLat * Math.sin(rotLatRad) + cosLat * Math.cos(dLon) * Math.cos(rotLatRad);

        if (zNorm > 0.08) {
          const sx = centerX + xNorm * radius;
          const sy = centerY - yNorm * radius;
          const isSelected = site.id === selectedSite.id;

          // Pulse ring for selected site
          if (isSelected) {
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.arc(sx, sy, 8 + Math.sin(Date.now() / 240) * 3, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Target Pin
          ctx.fillStyle = isSelected ? '#00f0ff' : '#ef4444';
          ctx.beginPath();
          ctx.arc(sx, sy, isSelected ? 4.5 : 3.0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Label
          if (isSelected || zNorm > 0.5) {
            ctx.font = 'bold 9px monospace';
            ctx.fillStyle = isSelected ? '#00f0ff' : 'rgba(255, 255, 255, 0.85)';
            ctx.fillText(site.name.split(' ')[0], sx + 7, sy - 4);
          }
        }
      });

      // 7. Spherical Shadow / Day-Night Terminator
      const shadowGrad = ctx.createRadialGradient(
        centerX - radius * 0.25,
        centerY - radius * 0.25,
        radius * 0.45,
        centerX,
        centerY,
        radius
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadowGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.35)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.88)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Auto rotation
      if (autoRotateRef.current && !isDraggingRef.current) {
        rotLonRef.current = (rotLonRef.current + 0.12) % 360;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [selectedSite, width, height, globeMode, showCraters]);

  // Pointer Drag Handlers for responsive mouse and touch 3D rotation
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    autoRotateRef.current = false;
    setIsAutoRotating(false);
    dragDistanceRef.current = 0;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    dragDistanceRef.current += Math.hypot(dx, dy);

    // Update rotation with mouse drag
    rotLonRef.current = (rotLonRef.current - dx * 0.75 + 360) % 360;
    rotLatRef.current = Math.max(-65, Math.min(65, rotLatRef.current + dy * 0.45));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  const handleCanvasClick = () => {
    // Only cycle sites if user clicked WITHOUT dragging!
    if (dragDistanceRef.current < 6) {
      const currentIndex = LANDING_SITES.findIndex((s) => s.id === selectedSite.id);
      const nextSite = LANDING_SITES[(currentIndex + 1) % LANDING_SITES.length];
      onSelectSite(nextSite);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2 rounded-xl bg-black/40 border border-mars-border/60">
      {/* Globe Mode & Overlay Controls Toolbar */}
      <div className="w-full flex items-center justify-between mb-2 px-1 text-[10px] font-mono">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setGlobeMode(globeMode === 'NATURAL_VIKING' ? 'MOLA_ELEVATION' : 'NATURAL_VIKING')}
            className={`px-2 py-0.5 rounded border transition-all ${
              globeMode === 'NATURAL_VIKING'
                ? 'bg-mars-rust/40 text-mars-orange border-mars-orange/60'
                : 'bg-mars-cyan/20 text-mars-cyan border-mars-cyan/60'
            }`}
            title="Toggle between NASA Viking Visual & MOLA Hypsometric Altimetry"
          >
            {globeMode === 'NATURAL_VIKING' ? 'NASA Viking RGB' : 'MOLA Hypsometry'}
          </button>
          <button
            onClick={() => setShowCraters(!showCraters)}
            className={`px-1.5 py-0.5 rounded border transition-all ${
              showCraters
                ? 'bg-amber-950/60 text-amber-300 border-amber-600/60'
                : 'bg-black/40 text-gray-400 border-mars-border'
            }`}
            title="Toggle Crater Rings & Robbins Database"
          >
            Craters ({MARS_CRATERS.length})
          </button>
        </div>

        <button
          onClick={() => {
            const nextVal = !autoRotateRef.current;
            autoRotateRef.current = nextVal;
            setIsAutoRotating(nextVal);
          }}
          className={`p-1 rounded border transition-all ${
            isAutoRotating
              ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/60'
              : 'bg-black/40 text-gray-400 border-mars-border'
          }`}
          title="Toggle Auto-Rotation"
        >
          <RotateCw className={`w-3 h-3 ${isAutoRotating ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleCanvasClick}
        title="Click to cycle sectors; Click and drag with mouse to freely rotate 3D Mars globe"
      />

      <div className="w-full text-[10px] font-mono text-gray-400 mt-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-mars-cyan animate-pulse" />
          <span className="text-white font-bold">{selectedSite.name.toUpperCase()}</span>
        </div>
        <div className="text-gray-500">
          <span>{Math.round(rotLonRef.current)}°E, {Math.round(rotLatRef.current)}°N</span>
        </div>
      </div>
    </div>
  );
};
