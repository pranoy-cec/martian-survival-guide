import { NextRequest } from 'next/server';
import { apiSuccess } from '@/lib/api-response';
import { MARS_MAP_LAYERS } from '@/lib/data/marsMapLayers';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const summary = {
    title: 'ARES Planetary GIS Map Services',
    description: 'Verified NASA JPL Mars Trek and USGS Astrogeology planetary mapping services.',
    standardCrs: 'urn:ogc:def:crs:OGC:1.3:CRS84 (Equirectangular / Plate Carrée Mars Sphere R=3396.19km)',
    supportedServiceTypes: ['WMTS 1.0.0', 'XYZ Tile Service', 'GeoJSON Vector Layers'],
    availableLayersCount: MARS_MAP_LAYERS.length,
    layersEndpoint: '/api/maps/layers',
    planetaryProjectionsNote: 'Martian cartography utilizes spherical equirectangular coordinates (lat -90 to +90, lon -180 to +180 or 0 to 360 East). Never project Martian datasets using Earth Web Mercator.'
  };

  return apiSuccess(summary, {
    source: 'NASA JPL Mars Trek API & USGS Planetary Mapping Node'
  });
}
