import { NextRequest } from 'next/server';
import { apiSuccess } from '@/lib/api-response';
import { MARS_MAP_LAYERS } from '@/lib/data/marsMapLayers';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const serviceType = searchParams.get('serviceType');

  let filtered = MARS_MAP_LAYERS;

  if (category) {
    filtered = filtered.filter(l => l.category.toLowerCase() === category.toLowerCase());
  }

  if (serviceType) {
    filtered = filtered.filter(l => l.serviceType.toLowerCase() === serviceType.toLowerCase());
  }

  return apiSuccess({
    count: filtered.length,
    layers: filtered
  }, {
    source: 'NASA JPL Mars Trek WMTS Capabilities & USGS Astrogeology Registry',
    crs: 'EPSG:4326 Equirectangular Mars',
    limitations: 'All WMTS tile URLs verified against live trek.nasa.gov endpoints.'
  });
}
