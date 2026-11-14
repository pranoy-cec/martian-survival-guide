import { NextRequest } from 'next/server';
import { RouteOptimizeRequestSchema } from '@/lib/validation';
import { generateOptimizedRoutes } from '@/lib/engine/routeOptimizer';
import { apiSuccess, apiError } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = RouteOptimizeRequestSchema.safeParse(body);

    if (!parsed.success) {
      return apiError('Invalid route optimization request', parsed.error.format(), 400);
    }

    const { start, destination, profile } = parsed.data;

    const missionProfile = profile || {
      astronautWeightKg: 80,
      spacesuitWeightKg: 140,
      roverAssisted: true,
      roverBatteryCapacityKwh: 35,
      maxEvaDurationHours: 8.0,
      primaryObjective: 'BALANCED' as const,
      weights: {
        safety: 0.35,
        science: 0.35,
        efficiency: 0.20,
        confidence: 0.10
      }
    };

    const routes = generateOptimizedRoutes(start, destination, missionProfile);

    return apiSuccess({
      startCoordinate: start,
      destinationCoordinate: destination,
      missionProfile,
      routesCount: routes.length,
      routes
    }, {
      source: 'ARES Multi-Objective A* Planetary Routing Engine',
      crs: 'Mars MOLA Areoid Datum (EPSG:4326 Equirectangular)',
      nature: 'DERIVED_ANALYTICAL',
      limitations: 'Obstacle avoidance is bounded by MOLA 463m/pixel altimetry; meter-scale boulders require rover Hazcam verification.'
    });
  } catch (error: any) {
    return apiError(error.message || 'Route optimization failed', null, 500);
  }
}
