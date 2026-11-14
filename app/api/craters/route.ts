import { NextRequest, NextResponse } from 'next/server';
import { MARS_CRATERS, getCratersNear } from '@/lib/data/marsCraters';
import { apiSuccess } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latStr = searchParams.get('lat');
  const lonStr = searchParams.get('lon');
  const radiusKm = parseFloat(searchParams.get('radius') || '1000');
  const query = (searchParams.get('q') || '').toLowerCase();

  let results = MARS_CRATERS;

  if (query) {
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.scientificInterest.toLowerCase().includes(query) ||
        c.mineralsDetected.some((m) => m.toLowerCase().includes(query)) ||
        c.morphology.toLowerCase().includes(query)
    );
  } else if (latStr && lonStr) {
    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);
    if (!isNaN(lat) && !isNaN(lon)) {
      results = getCratersNear({ lat, lon }, radiusKm);
    }
  }

  return NextResponse.json(
    apiSuccess(
      {
        total: results.length,
        craters: results
      },
      {
        source: 'USGS Astrogeology / IAU Gazetteer of Planetary Nomenclature & Robbins Mars Crater Database',
        mission: 'Mars Global Reconnaissance & Rover Missions',
        nature: 'IN_SITU_OBSERVATION',
        uncertainty: 'Crater dimensions calibrated to MGS MOLA 128 px/deg DTM and HRSC stereo elevation models'
      }
    )
  );
}
