import { NextRequest } from 'next/server';
import { EnvironmentQuerySchema } from '@/lib/validation';
import { getEnvironmentalTelemetry } from '@/lib/engine/environmentalModel';
import { apiSuccess, apiError } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const parsed = EnvironmentQuerySchema.safeParse(searchParams);

    if (!parsed.success) {
      return apiError('Invalid query parameters', parsed.error.format(), 400);
    }

    const { site, lat, lon, solOffset } = parsed.data;
    const telemetry = getEnvironmentalTelemetry(site, { lat, lon }, solOffset);

    return apiSuccess(telemetry, {
      source: `${telemetry.provenance.instrument} (${telemetry.provenance.mission})`,
      mission: telemetry.provenance.mission,
      instrument: telemetry.provenance.instrument,
      nature: telemetry.provenance.nature,
      limitations: telemetry.provenance.instrumentLimitations,
      uncertainty: telemetry.provenance.uncertaintyStatement
    });
  } catch (error: any) {
    return apiError(error.message || 'Environmental telemetry error', null, 500);
  }
}
