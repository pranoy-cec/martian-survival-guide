import { NextRequest } from 'next/server';
import { TerrainQuerySchema, BatchTerrainQuerySchema } from '@/lib/validation';
import { analyzeTerrainAtCoordinate } from '@/lib/engine/elevationModel';
import { apiSuccess, apiError } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if batch query or single
    if (Array.isArray(body.coordinates)) {
      const parsedBatch = BatchTerrainQuerySchema.safeParse(body);
      if (!parsedBatch.success) {
        return apiError('Invalid batch coordinates array', parsedBatch.error.format(), 400);
      }
      const classifications = parsedBatch.data.coordinates.map(c => analyzeTerrainAtCoordinate(c));
      return apiSuccess({
        type: 'BATCH_CLASSIFICATION',
        count: classifications.length,
        items: classifications
      }, {
        source: 'NASA MOLA MEGDR & USGS SIM 3292 Chronostratigraphy',
        nature: 'DERIVED_ANALYTICAL'
      });
    }

    const parsed = TerrainQuerySchema.safeParse(body);
    if (!parsed.success) {
      return apiError('Invalid coordinate parameters', parsed.error.format(), 400);
    }

    const { lat, lon } = parsed.data;
    const analysis = analyzeTerrainAtCoordinate({ lat, lon });

    return apiSuccess({
      coordinate: { lat, lon },
      classification: {
        elevationMeters: analysis.elevationMeters,
        slopeDeg: analysis.slopeDeg,
        roughnessScore: analysis.roughnessScore,
        hazardLevel: analysis.hazardLevel,
        geologicalUnit: analysis.geologicalUnit,
        geologicalAge: analysis.geologicalAge,
        confidencePercent: analysis.dataConfidence,
        waterIceEvidence: analysis.waterIceEvidence || null
      },
      traversability: {
        astronautSuitTraversable: analysis.hazardLevel !== 'IMPASSABLE',
        roverTraversable: analysis.slopeDeg < 20 && analysis.roughnessScore < 0.7,
        speedPenaltyFactor: analysis.hazardLevel === 'MODERATE' ? 0.65 : (analysis.hazardLevel === 'SEVERE' ? 0.35 : 1.0),
        primaryHazards: analysis.hazardFactors
      }
    }, {
      source: 'MGS MOLA MEGDR & USGS SIM 3292 Chronostratigraphic Map',
      crs: 'Mars MOLA Areoid Datum',
      nature: 'DERIVED_ANALYTICAL'
    });
  } catch (error: any) {
    return apiError(error.message || 'Terrain classification error', null, 500);
  }
}
