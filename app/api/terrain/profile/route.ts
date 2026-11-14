import { NextRequest, NextResponse } from 'next/server';
import { ProfileQuerySchema } from '@/lib/validation';
import { getNumericalElevation, analyzeTerrainAtCoordinate, calculateMartianDistanceKm } from '@/lib/engine/elevationModel';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ProfileQuerySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid profile request format', details: parsed.error.format() },
        { status: 400 }
      );
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

    return NextResponse.json({
      success: true,
      meta: {
        totalDistanceKm: Math.round(totalDistKm * 100) / 100,
        elevationGainMeters: Math.round(elevGain),
        elevationLossMeters: Math.round(elevLoss),
        maxSlopeDeg: maxSlope,
        datum: 'NASA MOLA MEGDR Mars Areoid Datum',
        dataSource: 'Mars Orbiter Laser Altimeter 128 pix/deg Altimetry'
      },
      profile: profilePoints
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Profile computation error' }, { status: 500 });
  }
}
