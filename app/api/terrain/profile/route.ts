import { NextRequest } from 'next/server';
import { ProfileQuerySchema } from '@/lib/validation';
import { analyzeTerrainAtCoordinate, calculateMartianDistanceKm } from '@/lib/engine/elevationModel';
import { apiSuccess, apiError } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ProfileQuerySchema.safeParse(body);

    if (!parsed.success) {
      return apiError('Invalid profile request format', parsed.error.format(), 400);
    }

    const { start, destination, steps } = parsed.data;
    const totalDistKm = calculateMartianDistanceKm(start, destination);

    const profilePoints: any[] = [];
    let elevGain = 0;
    let elevLoss = 0;
    let maxSlope = 0;
    let prevElev: number | null = null;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const lat = start.lat + (destination.lat - start.lat) * t;
      const lon = start.lon + (destination.lon - start.lon) * t;
      const distFromStartKm = Math.round(totalDistKm * t * 100) / 100;

      const terrain = analyzeTerrainAtCoordinate({ lat, lon });

      if (prevElev !== null) {
        const diff = terrain.elevationMeters - prevElev;
        if (diff > 0) elevGain += diff;
        else elevLoss += Math.abs(diff);
      }
      prevElev = terrain.elevationMeters;

      if (terrain.slopeDeg > maxSlope) {
        maxSlope = terrain.slopeDeg;
      }

      profilePoints.push({
        step: i,
        distanceKm: distFromStartKm,
        lat: Math.round(lat * 10000) / 10000,
        lon: Math.round(lon * 10000) / 10000,
        elevationMeters: terrain.elevationMeters,
        slopeDeg: terrain.slopeDeg,
        roughnessScore: terrain.roughnessScore,
        hazardLevel: terrain.hazardLevel,
        geologicalUnit: terrain.geologicalUnit
      });
    }

    return apiSuccess({
      totalDistanceKm: Math.round(totalDistKm * 100) / 100,
      elevationGainMeters: Math.round(elevGain),
      elevationLossMeters: Math.round(elevLoss),
      maxSlopeDeg: maxSlope,
      stepsCount: profilePoints.length,
      profile: profilePoints
    }, {
      source: 'MGS MOLA (Mars Orbiter Laser Altimeter) 128 pix/deg MEGDR Altimetry',
      crs: 'NASA MOLA MEGDR Mars Areoid Datum',
      nature: 'DERIVED_ANALYTICAL',
      limitations: 'Calculated along great-circle corridor; slope sampled at intermediate nodes.'
    });
  } catch (error: any) {
    return apiError(error.message || 'Profile computation error', null, 500);
  }
}
