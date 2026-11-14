import { NextRequest, NextResponse } from 'next/server';
import { SCIENCE_POIS } from '@/lib/data/sciencePOIs';
import { calculateMartianDistanceKm } from '@/lib/engine/elevationModel';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const latParam = searchParams.get('lat');
    const lonParam = searchParams.get('lon');
    const radiusKm = parseFloat(searchParams.get('radius') || '100');

    let filtered = SCIENCE_POIS;

    if (category && category !== 'ALL') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (latParam !== null && lonParam !== null) {
      const center = { lat: parseFloat(latParam), lon: parseFloat(lonParam) };
      filtered = filtered.map(poi => ({
        ...poi,
        distanceFromQueryKm: Math.round(calculateMartianDistanceKm(center, poi.location) * 10) / 10
      })).sort((a: any, b: any) => a.distanceFromQueryKm - b.distanceFromQueryKm);

      if (radiusKm > 0) {
        filtered = filtered.filter((p: any) => p.distanceFromQueryKm <= radiusKm);
      }
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      data: filtered,
      meta: {
        sourceMissions: ['Mars 2020 Perseverance', 'MSL Curiosity', 'MRO CRISM/HiRISE', 'Odyssey THEMIS', 'MER Opportunity'],
        totalCatalogued: SCIENCE_POIS.length
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Science POI catalog error' }, { status: 500 });
  }
}
