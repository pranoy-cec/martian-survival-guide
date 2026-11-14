import { NextRequest, NextResponse } from 'next/server';
import { PLANETARY_DATASETS } from '@/lib/data/datasets';

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

  return NextResponse.json({
    success: true,
    count: filtered.length,
    datasets: filtered,
    metadata: {
      standardDatum: 'Mars MOLA Areoid Equipotential Surface (Radius 3396.0 km)',
      cartographicAuthority: 'IAU/IAG Working Group on Cartographic Coordinates and Rotational Elements',
      updated: '2026-Mission-Epoch'
    }
  });
}
