import { NextRequest, NextResponse } from 'next/server';
import { getEnvironmentalTelemetry } from '@/lib/engine/environmentalModel';
import { MarsCoordinate } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const site = searchParams.get('site') || 'Jezero Crater (Perseverance)';
    const lat = parseFloat(searchParams.get('lat') || '18.4447');
    const lon = parseFloat(searchParams.get('lon') || '77.4508');
    const solOffset = parseInt(searchParams.get('solOffset') || '0', 10);

    const coordinates: MarsCoordinate = { lat, lon };
    const telemetry = getEnvironmentalTelemetry(site, coordinates, solOffset);

    return NextResponse.json({
      success: true,
      data: telemetry,
      attribution: {
        primaryInstrument: telemetry.provenance.instrument,
        mission: telemetry.provenance.mission,
        notes: telemetry.provenance.instrumentLimitations
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Environmental telemetry error' }, { status: 500 });
  }
}
