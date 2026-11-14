import { NextRequest } from 'next/server';
import { TerrainQuerySchema } from '@/lib/validation';
import { analyzeTerrainAtCoordinate } from '@/lib/engine/elevationModel';
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
    const terrain = analyzeTerrainAtCoordinate({ lat, lon });

    return apiSuccess({
      coordinate: { lat, lon },
      elevationMeters: terrain.elevationMeters,
      slopeDeg: terrain.slopeDeg,
      roughnessScore: terrain.roughnessScore,
      hazardLevel: terrain.hazardLevel,
      hazardFactors: terrain.hazardFactors,
      suitMaxStabilitySlopeDeg: terrain.maxTraversableSlopeDeg,
      isTraversableBySuit: terrain.hazardLevel !== 'IMPASSABLE'
    }, {
      source: 'MGS MOLA (Mars Orbiter Laser Altimeter) MEGDR',
      instrument: 'Laser Altimeter 1064nm Pulsed Diode',
      crs: 'Mars Areoid Equipotential Datum',
      resolution: '463 meters/pixel spatial differential',
      nature: 'DERIVED_ANALYTICAL',
      limitations: 'Calculated using 50m spatial differential step; sub-pixel micro-boulder slopes require in-situ rover Hazcam validation.'
    });
  } catch (error: any) {
    return apiError(error.message || 'Slope calculation error', null, 500);
  }
}
