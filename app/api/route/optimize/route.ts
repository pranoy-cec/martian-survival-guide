import { NextRequest, NextResponse } from 'next/server';
import { generateOptimizedRoutes } from '@/lib/engine/routeOptimizer';
import { MarsCoordinate, MissionProfile } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { start, destination, profile } = body;

    if (!start || typeof start.lat !== 'number' || typeof start.lon !== 'number') {
      return NextResponse.json(
        { error: 'Missing or invalid "start" coordinate {lat, lon}.' },
        { status: 400 }
      );
    }

    if (!destination || typeof destination.lat !== 'number' || typeof destination.lon !== 'number') {
      return NextResponse.json(
        { error: 'Missing or invalid "destination" coordinate {lat, lon}.' },
        { status: 400 }
      );
    }

    // Default mission profile if not provided
    const missionProfile: MissionProfile = profile || {
      astronautWeightKg: 80,
      spacesuitWeightKg: 140,
      roverAssisted: true,
      roverBatteryCapacityKwh: 35,
      maxEvaDurationHours: 8.0,
      primaryObjective: 'BALANCED',
      weights: {
        safety: 0.35,
        science: 0.35,
        efficiency: 0.20,
        confidence: 0.10
      }
    };

    const routes = generateOptimizedRoutes(start, destination, missionProfile);

    return NextResponse.json({
      success: true,
      meta: {
        algorithm: 'Multi-Objective A* Graph Search over Mars MOLA Elevation & CRISM/USGS Science Grids',
        evaluator: 'ARES Vanguard Science-Safety Route Engine v2.0',
        timestamp: new Date().toISOString(),
        disclaimer: 'NASA Mission Planning Research Tool. For astronaut simulation and EVA operations planning.'
      },
      routes
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Route optimization error' }, { status: 500 });
  }
}
