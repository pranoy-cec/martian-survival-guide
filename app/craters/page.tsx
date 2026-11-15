'use client';

import React, { useState } from 'react';
import { MARS_CRATERS, MarsCrater } from '@/lib/data/marsCraters';
import {
  CircleDot,
  Search,
  Filter,
  Droplets,
  ExternalLink,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Mountain
} from 'lucide-react';
import Link from 'next/link';

export default function CratersPage() {
  const [search, setSearch] = useState('');
  const [selectedAge, setSelectedAge] = useState<'all' | 'Noachian' | 'Hesperian' | 'Amazonian'>('all');
  const [onlyIce, setOnlyIce] = useState(false);
  const [selectedCrater, setSelectedCrater] = useState<MarsCrater | null>(null);

  const filteredCraters = MARS_CRATERS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.scientificInterest.toLowerCase().includes(search.toLowerCase()) ||
      c.morphology.toLowerCase().includes(search.toLowerCase()) ||
      c.mineralsDetected.some((m) => m.toLowerCase().includes(search.toLowerCase()));

    const matchesAge = selectedAge === 'all' || c.geologicalAge === selectedAge;
    const matchesIce = !onlyIce || c.waterIceEvidence;

    return matchesSearch && matchesAge && matchesIce;
  });

  return (
    <div className="w-full h-full flex flex-col bg-mars-dark text-gray-200 overflow-y-auto p-4 space-y-4 font-mono select-none">
      {/* Top Banner */}
      <div className="p-4 bg-mars-panel border border-mars-border rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <CircleDot className="w-5 h-5 text-amber-400 animate-pulse" />
            <h1 className="text-base font-bold text-white tracking-wide">
              ROBBINS MARS CRATER DATABASE & PLANETARY NOMENCLATURE
            </h1>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
              IAU APPROVED
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Global catalog of Martian impact basins, volcanic calderas, and paleolake basins calibrated to MGS MOLA & HRSC DTMs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/map"
            className="px-3.5 py-1.5 rounded-lg bg-mars-dark border border-mars-border text-xs text-gray-200 hover:text-white hover:border-mars-cyan flex items-center gap-1.5 transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-mars-cyan" />
            <span>View on GIS Map</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 bg-mars-panel border border-mars-border rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-mars-orange absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search craters by name, mineral, or morphology (e.g. Jezero, Smectite, Paleolake)..."
            className="w-full bg-black/50 border border-mars-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-mars-cyan"
          />
        </div>

        {/* Geological Age Filter */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-mars-border text-xs">
          <span className="text-gray-400 px-1.5 text-[10px]">EPOCH:</span>
          {(['all', 'Noachian', 'Hesperian', 'Amazonian'] as const).map((age) => (
            <button
              key={age}
              onClick={() => setSelectedAge(age)}
              className={`px-2 py-0.5 rounded text-[11px] capitalize transition-all ${
                selectedAge === age
                  ? 'bg-mars-red text-white font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {age}
            </button>
          ))}
        </div>

        {/* Water Ice Toggle */}
        <button
          onClick={() => setOnlyIce(!onlyIce)}
          className={`px-3 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
            onlyIce
              ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold'
              : 'bg-black/40 text-gray-400 border-mars-border hover:text-white'
          }`}
        >
          <Droplets className="w-3.5 h-3.5 text-mars-cyan" />
          <span>Water Ice Deposits Only</span>
        </button>
      </div>

      {/* Craters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCraters.map((crater) => (
          <div
            key={crater.id}
            onClick={() => setSelectedCrater(crater)}
            className="p-4 bg-mars-panel border border-mars-border hover:border-amber-500/80 rounded-xl space-y-2.5 transition-all cursor-pointer shadow-lg hover:shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 border-b border-mars-border/50 pb-2">
                <div>
                  <h3 className="font-bold text-white text-sm hover:text-amber-400 transition-colors">
                    {crater.name}
                  </h3>
                  <span className="text-[10px] text-gray-400">
                    IAU Approved: {crater.iauApprovedYear}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      crater.geologicalAge === 'Noachian'
                        ? 'bg-red-950 text-red-300 border border-red-800'
                        : crater.geologicalAge === 'Hesperian'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {crater.geologicalAge}
                  </span>
                  {crater.waterIceEvidence && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1 font-bold">
                      <Droplets className="w-2.5 h-2.5" />
                      ICE DEPOSIT
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 bg-black/40 p-2 rounded-lg border border-mars-border/60 text-[11px] my-2">
                <div>
                  <span className="text-gray-400 block text-[9px]">DIAMETER</span>
                  <span className="font-bold text-mars-cyan">{crater.diameterKm} km</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px]">DEPTH</span>
                  <span className="font-bold text-white">{crater.depthMeters} m</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px]">RIM ELEV</span>
                  <span className="font-bold text-mars-sand">{crater.rimElevationMeters} m</span>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                {crater.scientificInterest}
              </p>
            </div>

            <div className="pt-2 border-t border-mars-border/40 text-[10px] text-gray-400 flex items-center justify-between">
              <span className="truncate max-w-[200px] text-mars-orange">
                {crater.associatedMission}
              </span>
              <span className="text-gray-500">
                {crater.latitude.toFixed(2)}°N, {crater.longitude.toFixed(2)}°E
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Crater Inspection Modal */}
      {selectedCrater && (
        <div className="fixed inset-0 z-[1200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-mars-panel border border-amber-500/60 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between border-b border-mars-border pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                  {selectedCrater.morphology} • {selectedCrater.geologicalAge} Epoch
                </span>
                <h2 className="text-base font-bold text-white mt-1">{selectedCrater.name}</h2>
              </div>
              <button
                onClick={() => setSelectedCrater(null)}
                className="text-gray-400 hover:text-white text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-black/50 p-2.5 rounded-xl border border-mars-border">
              <div>
                <span className="text-gray-400 block text-[10px]">Diameter:</span>
                <span className="text-mars-cyan font-bold text-sm">{selectedCrater.diameterKm} km</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Crater Depth:</span>
                <span className="text-white font-bold text-sm">{selectedCrater.depthMeters} m</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Rim Datum:</span>
                <span className="text-mars-orange font-bold text-sm">{selectedCrater.rimElevationMeters} m</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">IAU Approved:</span>
                <span className="text-gray-300 font-bold text-sm">{selectedCrater.iauApprovedYear}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="font-bold text-white uppercase text-[11px] text-amber-400">
                SCIENTIFIC SIGNIFICANCE & EXPLORATION VALUE
              </div>
              <p className="leading-relaxed bg-black/30 p-3 rounded-lg border border-mars-border/40">
                {selectedCrater.scientificInterest}
              </p>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="font-bold text-white uppercase text-[11px] text-mars-cyan">
                DETECTED MINERAL & SPECTRAL SIGNATURES
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCrater.mineralsDetected.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-mars-dark border border-mars-border text-[11px] text-gray-200"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-mars-border text-xs">
              <span className="text-gray-400">
                Coordinates: {selectedCrater.latitude}°N, {selectedCrater.longitude}°E
              </span>
              <button
                onClick={() => setSelectedCrater(null)}
                className="px-4 py-1.5 rounded-lg bg-mars-dark border border-mars-border text-xs text-white hover:bg-mars-red"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
