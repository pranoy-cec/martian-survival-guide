import { NextRequest } from 'next/server';
import { apiSuccess } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const summary = {
    module: 'ARES Marswalk Route Planning Engine',
    description: 'Explainable Multi-Objective A* Pathfinding Engine over 2.5D MOLA Elevation & CRISM/USGS Science Grids.',
    supportedStrategies: [
      { type: 'BALANCED', name: 'Balanced Expedition', description: 'Optimal trade-off between astronaut life-support margins, slope traversability, and sample yield.' },
      { type: 'SAFE', name: 'Safe Passage', description: 'Hazard-weighted route actively circumventing steep scarps (>8°) and blocky boulder fields.' },
      { type: 'SCIENTIFIC', name: 'Scientific Odyssey', description: 'Science-priority route detouring through prime astrobiological and mineralogical targets.' },
      { type: 'GEOMETRIC', name: 'Geometric Baseline', description: 'Straight Euclidean baseline. NOT terrain-optimized; serves to quantify safety gains.' }
    ],
    optimizationInputs: {
      start: '{ lat: number, lon: number, elevation?: number }',
      destination: '{ lat: number, lon: number, elevation?: number }',
      profile: {
        astronautWeightKg: 'number (default: 80)',
        spacesuitWeightKg: 'number (default: 140)',
        roverAssisted: 'boolean (default: true)',
        maxEvaDurationHours: 'number (default: 8.0)',
        weights: '{ safety: 0.35, science: 0.35, efficiency: 0.20, confidence: 0.10 }'
      }
    },
    optimizationEndpoint: 'POST /api/routes/optimize'
  };

  return apiSuccess(summary, {
    source: 'ARES Multi-Objective Planetary Pathfinding Engine v2.0',
    limitations: 'Traverse planning assumes pressurized EMU suit parameters according to NASA-STD-3001 Vol 2 guidelines.'
  });
}
