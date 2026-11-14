import { NextRequest } from 'next/server';
import { apiSuccess } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const info = {
    module: 'ARES Terrain Intelligence System',
    description: 'Quantitative 2.5D numerical elevation and slope analysis based on NASA MOLA MEGDR gridded laser altimetry.',
    datum: 'Mars MOLA Areoid Equipotential Datum (0m = 3,396.0 km equatorial radius)',
    slopeRule: 'Scientific Law: Slopes are calculated exclusively from numerical spatial elevation gradients (dz/dx, dz/dy) across calibrated spatial distances. Never derived from RGB color images.',
    endpoints: {
      elevation: '/api/terrain/elevation?lat={lat}&lon={lon}',
      slope: '/api/terrain/slope?lat={lat}&lon={lon}',
      profile: 'POST /api/terrain/profile (body: { start, destination, steps })',
      classify: 'POST /api/terrain/classify (body: { lat, lon })'
    }
  };

  return apiSuccess(info, {
    source: 'NASA GSFC / MGS MOLA MEGDR Topography'
  });
}
