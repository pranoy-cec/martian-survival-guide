'use client';

import React, { useState, useEffect } from 'react';
import { Search, Sparkles, ExternalLink, Filter, Calendar, Camera, Info, Loader2 } from 'lucide-react';

interface NasaImageItem {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  center: string;
  keywords: string[];
  imageUrl: string;
  sourceUrl: string;
}

export const NasaScienceExplorer: React.FC = () => {
  const [query, setQuery] = useState('Mars Perseverance delta');
  const [rover, setRover] = useState<'all' | 'perseverance' | 'curiosity' | 'opportunity'>('perseverance');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<NasaImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<NasaImageItem | null>(null);

  const fetchNasaImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/nasa/images?q=${encodeURIComponent(query)}&rover=${rover}&page=${page}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setImages(data.items);
      }
    } catch (e) {
      console.error('Failed to fetch NASA images', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNasaImages();
  }, [rover, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchNasaImages();
  };

  return (
    <div className="w-full h-full flex flex-col bg-mars-dark text-gray-200 overflow-y-auto p-4 space-y-4 font-mono">
      {/* Top Banner */}
      <div className="p-4 bg-mars-panel border border-mars-border rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-mars-cyan animate-pulse" />
            <h2 className="text-base font-bold text-white tracking-wide">
              NASA SCIENCE EXPLORER & PLANETARY IMAGE REPOSITORY
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Live query integration with the official NASA Image and Video Library (images-api.nasa.gov) and PDS archives.
          </p>
        </div>

        {/* Rover Selector */}
        <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-lg border border-mars-border text-xs">
          <span className="text-gray-400 px-2">MISSION:</span>
          {(['all', 'perseverance', 'curiosity', 'opportunity'] as const).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRover(r);
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded capitalize transition-all ${
                rover === r
                  ? 'bg-mars-red text-white font-bold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
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

      {/* Image Results Grid */}
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-400 space-y-3">
          <Loader2 className="w-8 h-8 text-mars-orange animate-spin" />
          <p className="text-xs">Connecting to NASA Image & Video Library API...</p>
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group bg-mars-panel border border-mars-border rounded-xl overflow-hidden hover:border-mars-cyan cursor-pointer transition-all shadow-lg flex flex-col justify-between"
            >
              <div className="relative h-44 w-full bg-black overflow-hidden">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-[10px] text-gray-300 px-1.5 py-0.5 rounded border border-mars-border">
                  {img.id.slice(0, 10)}
                </div>
              </div>

              <div className="p-3 space-y-1.5">
                <h3 className="text-xs font-bold text-white line-clamp-2 group-hover:text-mars-cyan transition-colors">
                  {img.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-mars-orange" />
                    {img.dateCreated ? img.dateCreated.slice(0, 10) : 'NASA Archive'}
                  </span>
                  <span>{img.center}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-500 text-xs">
          No NASA imagery found matching the specified search parameters.
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-mars-border/60 text-xs">
        <span className="text-gray-400">Page {page} of Mars Image Results</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1 || loading}
            className="px-3 py-1 rounded bg-mars-panel border border-mars-border text-gray-300 hover:text-white disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={loading || images.length < 12}
            className="px-3 py-1 rounded bg-mars-panel border border-mars-border text-gray-300 hover:text-white disabled:opacity-40"
          >
            Next Page
          </button>
        </div>
      </div>

      {/* Selected Image Deep-Dive Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[1200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-mars-panel border border-mars-cyan/60 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-mars-border pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-mars-cyan/10 text-mars-cyan border border-mars-cyan/40">
                  NASA Planetary Archive • {selectedImage.id}
                </span>
                <h3 className="text-sm font-bold text-white mt-1">{selectedImage.title}</h3>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-400 hover:text-white text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="w-full max-h-80 bg-black rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-80 max-w-full object-contain"
              />
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <p className="leading-relaxed">{selectedImage.description}</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-black/40 p-2.5 rounded-lg border border-mars-border">
                <div>
                  <span className="text-gray-400">Date Acquired:</span>{' '}
                  <span className="text-white font-bold">{selectedImage.dateCreated?.slice(0, 10)}</span>
                </div>
                <div>
                  <span className="text-gray-400">NASA Center:</span>{' '}
                  <span className="text-white font-bold">{selectedImage.center}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-mars-border">
              <a
                href={selectedImage.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-mars-cyan hover:underline flex items-center gap-1"
              >
                <span>View on NASA Image Library</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedImage(null)}
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
};
