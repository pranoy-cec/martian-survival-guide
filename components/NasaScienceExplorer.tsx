'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  ExternalLink,
  Filter,
  Calendar,
  Camera,
  Loader2
} from 'lucide-react';

interface NasaImageItem {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  center: string;
  keywords: string[];
  imageUrl: string;
  sourceUrl: string;
  rover?: string;
  category?: string;
  sol?: number;
  instrument?: string;
}

// Sub-component for individual card displaying "NO PREVIEW" placeholder
const NasaImageCard: React.FC<{
  img: NasaImageItem;
  onSelect: (img: NasaImageItem) => void;
}> = ({ img, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(img)}
      className="group bg-mars-panel border border-mars-border rounded-xl overflow-hidden hover:border-mars-cyan cursor-pointer transition-all shadow-lg flex flex-col justify-between hover:shadow-2xl hover:-translate-y-0.5"
    >
      <div className="relative h-48 w-full bg-black overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-mars-panel/90 via-mars-dark to-black text-gray-400 p-4 text-center select-none border-b border-mars-border/30">
          <div className="w-12 h-12 rounded-xl bg-black/60 border border-mars-border flex items-center justify-center shadow-inner group-hover:border-mars-cyan/50 transition-colors">
            <Camera className="w-6 h-6 text-mars-orange/60 group-hover:text-mars-cyan transition-colors" />
          </div>
          <span className="text-xs font-bold text-gray-300 tracking-wider font-mono">NO PREVIEW</span>
          <span className="text-[10px] text-gray-500 font-mono">SCIENTIFIC DOSSIER RECORD</span>
        </div>
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-[9px] font-bold text-mars-cyan px-1.5 py-0.5 rounded border border-mars-border">
          {img.id}
        </div>
        {img.sol && (
          <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm text-[9px] font-bold text-amber-400 px-1.5 py-0.5 rounded border border-mars-border">
            Sol {img.sol}
          </div>
        )}
      </div>

      <div className="p-3 space-y-2">
        <h3 className="text-xs font-bold text-white line-clamp-2 group-hover:text-mars-cyan transition-colors">
          {img.title}
        </h3>
        <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
          {img.description}
        </p>
        <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1 border-t border-mars-border/40">
          <span className="flex items-center gap-1 text-mars-sand">
            <Calendar className="w-3 h-3" />
            {img.dateCreated ? img.dateCreated.slice(0, 10) : 'NASA Archive'}
          </span>
          <span className="font-bold text-gray-400">{img.center || 'JPL'}</span>
        </div>
      </div>
    </div>
  );
};

export const NasaScienceExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [rover, setRover] = useState<'all' | 'perseverance' | 'curiosity' | 'opportunity' | 'spirit' | 'mro'>('all');
  const [category, setCategory] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<NasaImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<NasaImageItem | null>(null);
  const [modalImgError, setModalImgError] = useState(false);

  useEffect(() => {
    setModalImgError(!selectedImage?.imageUrl || selectedImage.imageUrl.trim() === '');
  }, [selectedImage]);

  const categories = [
    'all',
    'Delta & Sediments',
    'Bedrock & Minerals',
    'Microscopic & Samples',
    'Atmosphere & Dust',
    'Hardware & Ingenuity',
    'Orbital & Basins'
  ];

  const quickPresets = [
    'All Mars',
    'Jezero Delta',
    'Kodiak Butte',
    'Mount Sharp',
    'Ingenuity',
    'Sulfate Veins',
    'Hematite Blueberries',
    'Hydrothermal Silica',
    'Valles Marineris',
    'Olympus Mons'
  ];

  const fetchNasaImages = async (searchTerm = query, targetRover = rover, targetCat = category) => {
    setLoading(true);
    try {
      const qParam = encodeURIComponent(searchTerm.trim() || 'Mars');
      const res = await fetch(
        `/api/nasa/images?q=${qParam}&rover=${targetRover}&category=${encodeURIComponent(targetCat)}&page=${page}`
      );
      const data = await res.json();

      // Robust parsing supporting top-level items or data.items or data.data
      const rawList = data.items || data.data?.items || data.data || [];
      if (Array.isArray(rawList)) {
        setImages(rawList);
      }
    } catch (e) {
      console.error('Failed to fetch NASA images', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNasaImages(query, rover, category);
  }, [rover, category, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchNasaImages(query, rover, category);
  };

  const handlePresetClick = (preset: string) => {
    const term = preset === 'All Mars' ? '' : preset;
    setQuery(term);
    setPage(1);
    fetchNasaImages(term, rover, category);
  };

  return (
    <div className="w-full h-full flex flex-col bg-mars-dark text-gray-200 overflow-y-auto p-4 space-y-4 font-mono select-none">
      {/* Top Banner */}
      <div className="p-4 bg-mars-panel border border-mars-border rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-mars-cyan animate-pulse" />
            <h1 className="text-base font-bold text-white tracking-wide">
              NASA SCIENCE EXPLORER & PLANETARY IMAGE REPOSITORY
            </h1>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              {images.length} RECORDS LOADED
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Official NASA Image & Video Library (images-api.nasa.gov) & JPL Planetary Photojournal verified scientific repository.
          </p>
        </div>

        {/* Mission / Rover Selector */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-mars-border text-xs">
          <span className="text-gray-400 px-2 text-[10px]">MISSION:</span>
          {(['all', 'perseverance', 'curiosity', 'opportunity', 'spirit', 'mro'] as const).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRover(r);
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded capitalize text-[11px] transition-all ${
                rover === r
                  ? 'bg-mars-red text-white font-bold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {r === 'mro' ? 'MRO Orbiter' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills & Quick Filter Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-mars-panel/90 border border-mars-border rounded-xl shadow-lg">
        <span className="text-[10px] text-gray-400 font-bold px-1.5 flex items-center gap-1">
          <Filter className="w-3 h-3 text-mars-orange" />
          CATEGORIES:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setPage(1);
            }}
            className={`px-2.5 py-1 rounded-lg text-[10px] transition-all capitalize ${
              category === cat
                ? 'bg-mars-orange text-black font-bold shadow'
                : 'bg-black/40 text-gray-400 hover:text-white border border-mars-border/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Input Bar with Quick Presets */}
      <div className="space-y-2">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-mars-orange absolute left-3 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search NASA Mars mission imagery, instruments, or minerals (e.g. Jezero crater delta, SuperCam, olivine)..."
              className="w-full bg-mars-panel border border-mars-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-mars-cyan"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange text-white text-xs font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Query NASA</span>
          </button>
        </form>

        {/* Quick Search Preset Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
          <span className="text-gray-400">Quick Tags:</span>
          {quickPresets.map((tag) => (
            <button
              key={tag}
              onClick={() => handlePresetClick(tag)}
              className="px-2 py-0.5 rounded bg-black/40 border border-mars-border/60 text-gray-300 hover:text-white hover:border-mars-cyan transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Image Results Grid */}
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-400 space-y-3">
          <Loader2 className="w-8 h-8 text-mars-orange animate-spin" />
          <p className="text-xs">Connecting to NASA Image & Video Library and Photojournal Archives...</p>
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <NasaImageCard key={img.id} img={img} onSelect={setSelectedImage} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-500 text-xs space-y-2">
          <p>No NASA imagery found matching the specified parameters.</p>
          <button
            onClick={() => handlePresetClick('All Mars')}
            className="px-3 py-1 rounded bg-mars-red text-white font-bold"
          >
            Reset Filters & View All
          </button>
        </div>
      )}

      {/* Selected Image Deep-Dive Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[1200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-mars-panel border border-mars-cyan/60 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-mars-border pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-mars-cyan/10 text-mars-cyan border border-mars-cyan/40">
                  NASA Planetary Archive • {selectedImage.id}
                </span>
                <h2 className="text-base font-bold text-white mt-1.5">{selectedImage.title}</h2>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-400 hover:text-white text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="w-full max-h-96 min-h-[16rem] bg-black rounded-xl overflow-hidden flex items-center justify-center border border-mars-border/60">
              {modalImgError || !selectedImage.imageUrl ? (
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-2 select-none">
                  <div className="w-16 h-16 rounded-2xl bg-mars-dark/90 border border-mars-border flex items-center justify-center">
                    <Camera className="w-8 h-8 text-mars-orange/60" />
                  </div>
                  <span className="text-sm font-bold text-gray-200 tracking-wider font-mono">NO PREVIEW AVAILABLE</span>
                  <p className="text-xs text-gray-400 max-w-sm font-mono">
                    Optical camera preview unavailable for this observation. Full instrument telemetry and parameters are preserved below.
                  </p>
                </div>
              ) : (
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="max-h-96 max-w-full object-contain"
                  onError={() => setModalImgError(true)}
                />
              )}
            </div>

            <div className="space-y-3 text-xs text-gray-300">
              <div>
                <div className="text-[11px] font-bold text-white uppercase text-mars-orange mb-1">
                  SCIENTIFIC OBSERVATION & DESCRIPTIVE CONTEXT:
                </div>
                <p className="leading-relaxed bg-black/40 p-3 rounded-lg border border-mars-border/50">
                  {selectedImage.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-black/50 p-2.5 rounded-lg border border-mars-border">
                <div>
                  <span className="text-gray-400 block text-[10px]">Date Acquired:</span>
                  <span className="text-white font-bold">{selectedImage.dateCreated?.slice(0, 10)}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">NASA Center:</span>
                  <span className="text-white font-bold">{selectedImage.center}</span>
                </div>
                {selectedImage.sol && (
                  <div>
                    <span className="text-gray-400 block text-[10px]">Mission Sol:</span>
                    <span className="text-amber-400 font-bold">Sol {selectedImage.sol}</span>
                  </div>
                )}
                {selectedImage.instrument && (
                  <div>
                    <span className="text-gray-400 block text-[10px]">Instrument:</span>
                    <span className="text-mars-cyan font-bold truncate block">
                      {selectedImage.instrument}
                    </span>
                  </div>
                )}
              </div>

              {selectedImage.keywords && selectedImage.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1.5 items-center pt-1">
                  <span className="text-[10px] text-gray-400">Keywords:</span>
                  {selectedImage.keywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-mars-dark border border-mars-border text-[10px] text-gray-300"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-mars-border">
              <a
                href={selectedImage.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-mars-cyan hover:underline flex items-center gap-1.5"
              >
                <span>View on NASA Planetary Photojournal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-1.5 rounded-lg bg-mars-dark border border-mars-border text-xs text-white hover:bg-mars-red font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
