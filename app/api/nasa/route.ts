import { NextRequest, NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/api-response';
import { NASA_MARS_MISSIONS } from '@/lib/data/nasaMissions';
import { PLANETARY_DATASETS } from '@/lib/data/datasets';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const summary = {
    title: 'NASA Planetary Science Data Integration Hub',
    description: 'ARES gateway to authentic NASA Planetary Data System (PDS), JPL Mars Trek, and NASA Open Data APIs.',
    activeMissionsCount: NASA_MARS_MISSIONS.filter(m => m.status === 'ACTIVE').length,
    totalMissionsCataloged: NASA_MARS_MISSIONS.length,
    registeredDatasetsCount: PLANETARY_DATASETS.length,
    endpoints: {
      imageSearch: '/api/nasa/images?q={query}&rover={perseverance|curiosity|all}&page={page}',
      missions: '/api/nasa/missions',
      datasets: '/api/datasets',
      mapLayers: '/api/maps/layers'
    },
    primaryDataSources: [
      { name: 'NASA Image and Video Library API', url: 'https://images-api.nasa.gov' },
      { name: 'NASA JPL Mars Trek WMTS Services', url: 'https://trek.nasa.gov/mars/' },
      { name: 'NASA Planetary Data System (PDS) Geosciences Node', url: 'https://pds-geosciences.wustl.edu/' },
      { name: 'USGS Astrogeology Mars Mapping Portal', url: 'https://astrogeology.usgs.gov/' }
    ]
  };

  return apiSuccess(summary, {
    source: 'NASA Planetary Data System & JPL Mars Exploration Program',
    limitations: 'All queries are routed through rate-limited serverless caches to protect external NASA endpoints.'
  });
}
