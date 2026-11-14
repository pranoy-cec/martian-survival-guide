import { NextRequest } from 'next/server';
import { analyzeTerrainAtCoordinate } from '@/lib/engine/elevationModel';
import { TerrainQuerySchema, BatchTerrainQuerySchema } from '@/lib/validation';
import { apiSuccess, apiError } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const parsed = TerrainQuerySchema.safeParse(searchParams);

    if (!parsed.success) {
      return apiError('Missing or invalid "lat" and "lon" parameters.', parsed.error.format(), 400);
    }

    const { lat, lon } = parsed.data;
    const analysis = analyzeTerrainAtCoordinate({ lat, lon });

    return apiSuccess(analysis, {
      source: 'MGS MOLA (Mars Orbiter Laser Altimeter) MEGDR',
      instrument: 'MOLA Laser Altimeter',
      crs: 'Mars MOLA Areoid Equipotential Elevation Datum (0m = 3396.0 km equatorial radius)',
      resolution: '463 meters/pixel',
      nature: 'DERIVED_ANALYTICAL',
      limitations: 'Calculated using numerical elevation differences; sub-pixel boulders require rover Hazcam validation.'
    });
  } catch (error: any) {
    return apiError(error.message || 'Internal terrain analysis error', null, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = BatchTerrainQuerySchema.safeParse(body);

    if (!parsed.success) {
      return apiError('Body must contain a non-empty "coordinates" array.', parsed.error.format(), 400);
    }

    const results = parsed.data.coordinates.map(coord => analyzeTerrainAtCoordinate(coord));

    return apiSuccess({
      count: results.length,
      coordinates: results
    }, {
      source: 'MGS MOLA MEGDR Altimetry Grids',
      crs: 'Mars MOLA Areoid Datum',
      nature: 'DERIVED_ANALYTICAL'
    });
  } catch (error: any) {
    return apiError(error.message || 'Batch terrain query error', null, 500);
  }
}
