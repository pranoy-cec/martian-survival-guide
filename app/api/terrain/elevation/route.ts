import { NextRequest, NextResponse } from 'next/server';
import { analyzeTerrainAtCoordinate, getNumericalElevation } from '@/lib/engine/elevationModel';
import { MarsCoordinate } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const latParam = searchParams.get('lat');
    const lonParam = searchParams.get('lon');

    if (latParam === null || lonParam === null) {
      return NextResponse.json(
        { error: 'Missing mandatory coordinates: "lat" and "lon" query parameters are required.' },
        { status: 400 }
      );
    }

    const lat = parseFloat(latParam);
    const lon = parseFloat(lonParam);

    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90) {
      return NextResponse.json(
        { error: 'Invalid coordinate bounds. Latitude must be between -90 and +90 degrees.' },
        { status: 400 }
      );
    }

    const coord: MarsCoordinate = { lat, lon };
    const analysis = analyzeTerrainAtCoordinate(coord);

    return NextResponse.json({
      success: true,
      data: analysis,
      meta: {
        datum: 'Mars MOLA Areoid Equipotential Elevation Datum (0m = 3396.0 km equatorial radius)',
        timestamp: new Date().toISOString(),
        missionInstruments: ['MGS MOLA (Mars Orbiter Laser Altimeter)', 'USGS SIM 3292 Geologic Map']
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal terrain analysis error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const coordinates: MarsCoordinate[] = body.coordinates;

    if (!Array.isArray(coordinates) || coordinates.length === 0) {
      return NextResponse.json(
        { error: 'Body must contain a non-empty "coordinates" array.' },
        { status: 400 }
      );
    }

    const results = coordinates.slice(0, 100).map(coord => analyzeTerrainAtCoordinate(coord));

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Batch terrain query error' }, { status: 500 });
  }
}
