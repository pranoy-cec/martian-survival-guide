import { NextRequest } from 'next/server';
import { MARS_ROVERS } from '@/lib/data/roverData';
import { apiSuccess, apiError } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { rover: string } }
) {
  const roverKey = params.rover?.toLowerCase();
  const rover = MARS_ROVERS[roverKey];

  if (!rover) {
    return apiError(
      `Rover "${params.rover}" not found. Supported rovers: "perseverance", "curiosity".`,
      null,
      404
    );
  }

  return apiSuccess(rover, {
    source: rover.provenance.source,
    mission: rover.formalMission,
    processingLevel: 'PDS Archive Release',
    limitations: 'Traverse records and instrument health validated from NASA PDS archives.'
  });
}
