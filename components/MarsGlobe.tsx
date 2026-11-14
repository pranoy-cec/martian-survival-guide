'use client';

import React, { useEffect, useRef } from 'react';
import { LANDING_SITES } from '@/lib/data/landingSites';
import { LandingSitePreset } from '@/lib/types';

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
  const rotationRef = useRef<number>(selectedSite.center.lon);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Align rotation towards the selected site when changed
    rotationRef.current = selectedSite.center.lon;
  }, [selectedSite]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let autoRotate = true;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const radius = width * 0.42;
      const centerX = width / 2;
      const centerY = height / 2;

      // Outer Atmospheric Glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, radius * 0.9, centerX, centerY, radius * 1.25);
      glowGrad.addColorStop(0, 'rgba(231, 111, 81, 0.4)');
      glowGrad.addColorStop(0.5, 'rgba(193, 68, 14, 0.15)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Mars Sphere Base
      const sphereGrad = ctx.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.35,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      sphereGrad.addColorStop(0, '#e76f51');
      sphereGrad.addColorStop(0.4, '#c1440e');
      sphereGrad.addColorStop(0.75, '#8b2606');
      sphereGrad.addColorStop(1, '#1b0803');

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Draw Mars Features & Lat/Lon Lines
      const rot = (rotationRef.current * Math.PI) / 180;

      // Draw Graticule lines
      ctx.strokeStyle = 'rgba(244, 162, 97, 0.12)';
      ctx.lineWidth = 1;

      // Parallels (latitude)
      [-60, -30, 0, 30, 60].forEach(lat => {
        const latRad = (lat * Math.PI) / 180;
        const y = centerY - Math.sin(latRad) * radius;
        const rParallel = Math.cos(latRad) * radius;
        ctx.beginPath();
        ctx.ellipse(centerX, y, rParallel, rParallel * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Meridians (longitude)
      for (let lon = 0; lon < 360; lon += 45) {
        const lonRad = (lon * Math.PI) / 180 - rot;
        const cosLon = Math.cos(lonRad);
        const sinLon = Math.sin(lonRad);

        if (cosLon > 0) { // Visible on front hemisphere
          ctx.beginPath();
          ctx.ellipse(centerX + sinLon * radius * 0.9, centerY, radius * 0.15 * Math.abs(cosLon), radius, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw Major Topographic Shading (Tharsis volcanoes & Hellas Basin)
      const olympusLon = (226.2 * Math.PI) / 180 - rot;
      if (Math.cos(olympusLon) > 0) {
        const ox = centerX + Math.sin(olympusLon) * radius * 0.85;
        const oy = centerY - Math.sin((18.65 * Math.PI) / 180) * radius;
        ctx.fillStyle = 'rgba(255, 200, 150, 0.35)';
        ctx.beginPath();
        ctx.arc(ox, oy, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Landing Sites / Exploration Sectors
      LANDING_SITES.forEach(site => {
        const siteLonRad = (site.center.lon * Math.PI) / 180 - rot;
        const cosLon = Math.cos(siteLonRad);

        // Visible on front hemisphere
        if (cosLon > 0.05) {
          const latRad = (site.center.lat * Math.PI) / 180;
          const x = centerX + Math.sin(siteLonRad) * Math.cos(latRad) * radius;
          const y = centerY - Math.sin(latRad) * radius;

          const isSelected = site.id === selectedSite.id;

          // Pulse ring
          if (isSelected) {
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 7 + Math.sin(Date.now() / 250) * 2, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Pin marker
          ctx.fillStyle = isSelected ? '#00f0ff' : '#f4a261';
          ctx.beginPath();
          ctx.arc(x, y, isSelected ? 4 : 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Label
          if (isSelected || cosLon > 0.6) {
            ctx.font = '9px monospace';
            ctx.fillStyle = isSelected ? '#00f0ff' : 'rgba(255, 255, 255, 0.7)';
            ctx.fillText(site.name.split(' ')[0], x + 6, y - 4);
          }
        }
      });

      // Shadow overlay on limb
      const shadowGrad = ctx.createRadialGradient(
        centerX - radius * 0.2,
        centerY - radius * 0.2,
        radius * 0.6,
        centerX,
        centerY,
        radius
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadowGrad.addColorStop(0.85, 'rgba(0, 0, 0, 0.45)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Subtle slow auto-rotation
      if (autoRotate) {
        rotationRef.current = (rotationRef.current + 0.15) % 360;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [selectedSite, width, height]);

  return (
    <div className="relative flex flex-col items-center justify-center p-2 rounded-xl bg-black/40 border border-mars-border/60">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-pointer"
        onClick={() => {
          // Cycle through landing sites on click
          const currentIndex = LANDING_SITES.findIndex(s => s.id === selectedSite.id);
          const nextSite = LANDING_SITES[(currentIndex + 1) % LANDING_SITES.length];
          onSelectSite(nextSite);
        }}
        title="Click globe to cycle Martian exploration sectors"
      />
      <div className="text-[10px] font-mono text-gray-400 mt-1 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-mars-cyan animate-pulse" />
        <span>PLANETARY TARGET: {selectedSite.name.toUpperCase()}</span>
      </div>
    </div>
  );
};
