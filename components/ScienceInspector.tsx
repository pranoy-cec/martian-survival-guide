'use client';

import React from 'react';
import { SciencePOI } from '@/lib/types';
import { Sparkles, Mountain, Droplets, AlertTriangle, ExternalLink, ShieldCheck, Camera, X } from 'lucide-react';

interface ScienceInspectorProps {
  poi: SciencePOI | null;
  onClose: () => void;
}

export const ScienceInspector: React.FC<ScienceInspectorProps> = ({ poi, onClose }) => {
  if (!poi) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[1100] w-full sm:w-[480px] bg-mars-panel/95 backdrop-blur-md border-l border-mars-border p-5 overflow-y-auto font-mono text-gray-200 shadow-2xl flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-mars-border pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                poi.category === 'WATER_ICE' ? 'bg-cyan-950 text-cyan-300 border-cyan-800' :
                poi.category === 'BIOSIGNATURE_CANDIDATE' ? 'bg-pink-950 text-pink-300 border-pink-800' :
                'bg-amber-950 text-amber-300 border-amber-800'
              }`}>
                {poi.category.replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-gray-400">{poi.mission}</span>
            </div>
            <h2 className="text-base font-bold text-white mt-1">{poi.name}</h2>
            <div className="text-xs text-mars-cyan mt-0.5">
              Lat: {poi.location.lat.toFixed(4)}°N | Lon: {poi.location.lon.toFixed(4)}°E | MOLA: {poi.location.elevation ?? 'N/A'} m
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 text-lg font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentic NASA Image Preview */}
        {poi.nasaImage && (
          <div className="rounded-xl overflow-hidden border border-mars-border bg-black group relative shadow-lg">
            <img
              src={poi.nasaImage.url}
              alt={poi.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-2.5 bg-mars-dark/90 border-t border-mars-border text-[11px] space-y-1">
              <div className="text-gray-300 leading-tight">{poi.nasaImage.caption}</div>
              <div className="flex justify-between text-[10px] text-gray-500 pt-0.5">
                <span>Credit: {poi.nasaImage.credit}</span>
                <span>{poi.nasaImage.instrument}</span>
              </div>
            </div>
          </div>
        )}

        {/* Geological Description */}
        <div className="space-y-1.5 text-xs">
          <div className="font-bold text-white flex items-center gap-1.5">
            <Mountain className="w-3.5 h-3.5 text-mars-orange" />
            <span>GEOLOGICAL FORMATION & CONTEXT</span>
          </div>
          <p className="text-gray-300 leading-relaxed bg-black/30 p-2.5 rounded-lg border border-mars-border/50 text-[11px]">
            {poi.description}
          </p>
          <div className="text-[11px] text-gray-400">
            Geologic Unit: <span className="text-mars-sand font-bold">{poi.geologicUnit}</span>
          </div>
        </div>

        {/* Mineralogy & Astrobiology Biosignature Potential */}
        <div className="p-3 bg-black/40 rounded-xl border border-mars-border space-y-2 text-xs">
          <div className="flex items-center justify-between text-mars-cyan font-bold text-[11px]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              SPECTRAL MINERAL SIGNATURES
            </span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
              poi.biosignaturePotential === 'HIGH' ? 'bg-pink-950 text-pink-400 border border-pink-800' :
              poi.biosignaturePotential === 'MEDIUM' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
              'bg-gray-800 text-gray-400'
            }`}>
              {poi.biosignaturePotential} BIOSIGNATURE POTENTIAL
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {poi.mineralSignatures.map((mineral, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-mars-dark text-gray-200 border border-mars-border/60 text-[10px]"
              >
                {mineral}
              </span>
            ))}
          </div>

          <div className="pt-2 border-t border-mars-border/50 text-[11px]">
            <span className="text-gray-400">Scientific Significance:</span>{' '}
            <span className="text-gray-200">{poi.scientificSignificance}</span>
          </div>
        </div>

        {/* Water Ice Relevance if applicable */}
        {poi.waterIceRelevance && (
          <div className="p-3 bg-cyan-950/20 border border-cyan-800/40 rounded-xl text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-mars-cyan font-bold text-[11px]">
              <Droplets className="w-3.5 h-3.5" />
              <span>IN-SITU RESOURCE UTILIZATION (ISRU) WATER ICE</span>
            </div>
            <p className="text-cyan-200/90 text-[11px] leading-relaxed">
              {poi.waterIceRelevance}
            </p>
          </div>
        )}

        {/* Sampling Recommendation for Mars Sample Return */}
        <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ASTRONAUT SAMPLE ACQUISITION PROTOCOL</span>
          </div>
          <p className="text-emerald-200/90 text-[11px]">
            {poi.sampleRecommendation}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-mars-border mt-4">
        <button
          onClick={onClose}
          className="w-full py-2 rounded-lg bg-mars-dark border border-mars-border hover:border-mars-cyan text-xs font-bold text-white transition-colors"
        >
          Close Scientific Dossier
        </button>
      </div>
    </div>
  );
};
