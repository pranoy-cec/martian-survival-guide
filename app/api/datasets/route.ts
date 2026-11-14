import { NextRequest } from 'next/server';
import { PLANETARY_DATASETS } from '@/lib/data/datasets';
import { apiSuccess } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');
  const mission = searchParams.get('mission');

  let filtered = PLANETARY_DATASETS;

  if (type) {
    filtered = filtered.filter(d => d.type.toLowerCase().includes(type.toLowerCase()));
  }

  if (mission) {
    filtered = filtered.filter(d => d.mission.toLowerCase().includes(mission.toLowerCase()));
  }

  return apiSuccess({
    count: filtered.length,
    datasets: filtered
  }, {
    source: 'NASA Planetary Data System (PDS) & USGS Astrogeology Registry',
    crs: 'Mars MOLA Areoid Surface Datum (Radius 3396.0 km)',
    cartographicAuthority: 'IAU/IAG Working Group on Cartographic Coordinates and Rotational Elements',
    limitations: 'All 8 planetary datasets cataloged with peer-reviewed mission references.'
  });
}
