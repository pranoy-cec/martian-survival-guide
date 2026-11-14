import { NextRequest } from 'next/server';
import { apiSuccess } from '@/lib/api-response';
import { NASA_MARS_MISSIONS } from '@/lib/data/nasaMissions';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const type = searchParams.get('type');

  let filtered = NASA_MARS_MISSIONS;

  if (status) {
    filtered = filtered.filter(m => m.status.toLowerCase() === status.toLowerCase());
  }

  if (type) {
    filtered = filtered.filter(m => m.type.toLowerCase() === type.toLowerCase());
  }

  return apiSuccess({
    totalCount: filtered.length,
    missions: filtered
  }, {
    source: 'NASA Mars Exploration Program Architectural Records',
    limitations: 'Mission operational milestones and instruments reflect published PDS release status.'
  });
}
