import { NextRequest } from 'next/server';
import { apiSuccess } from '@/lib/api-response';
import { MARS_ROVERS } from '@/lib/data/roverData';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const roversList = Object.values(MARS_ROVERS).map(r => ({
    id: r.id,
    name: r.name,
    mission: r.formalMission,
    landingSite: r.landingSite,
    coordinates: r.coordinates,
    operationalStatus: r.operationalStatus,
    currentSol: r.currentSol,
    totalDistanceTraversedKm: r.totalDistanceTraversedKm,
    samplesCollected: r.samplesCollected,
    instrumentsCount: r.instruments.length,
    latestSummary: r.latestObservationSummary
  }));

  return apiSuccess({
    count: roversList.length,
    rovers: roversList
  }, {
    source: 'NASA Planetary Data System & JPL Mars Exploration Rover Archives',
    limitations: 'Odometer distances and sample counts reflect published mission updates.'
  });
}
