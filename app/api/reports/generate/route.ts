import { NextRequest, NextResponse } from 'next/server';
import { MissionReportRequestSchema } from '@/lib/validation';
import { PLANETARY_DATASETS } from '@/lib/data/datasets';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = MissionReportRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid mission report request', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const report = {
      header: {
        reportId: `ARES-REP-${Date.now().toString(36).toUpperCase()}`,
        title: `ARES MARTIAN EVA MISSION BRIEFING: ${data.missionName.toUpperCase()}`,
        classification: 'NASA EVA MISSION PLANNING SIMULATION / NOT FOR DIRECT FLIGHT LIFE-CRITICAL USE',
        generatedAt: new Date().toISOString(),
        siteName: data.siteName,
        explorationSector: `${data.siteName} Primary Traverse Corridor`
      },
      flightPlan: {
        routeId: data.routeId,
        strategy: data.routeType,
        departureCoords: `${data.start.lat.toFixed(4)}° N, ${data.start.lon.toFixed(4)}° E`,
        objectiveCoords: `${data.destination.lat.toFixed(4)}° N, ${data.destination.lon.toFixed(4)}° E`,
        totalDistanceKm: data.metrics.distanceKm,
        estimatedDurationHours: data.metrics.durationHours,
        totalOxygenLiters: data.metrics.oxygenLiters,
        elevationGainMeters: data.metrics.elevationGainM,
        maxSlopeDeg: data.metrics.maxSlopeDeg,
        safetyIndexScore: `${data.metrics.safetyScore}/100`,
        scienceHarvestScore: `${data.metrics.scienceScore}/100`
      },
      environmentalContext: data.environment || {
        source: 'NASA Perseverance MEDA / Curiosity REMS Calibration',
        temperatureRange: '-88°C to -18°C',
        atmosphericPressure: '735 Pa',
        dustOpticalDepthTau: 0.42,
        cosmicRayDoseRate: '0.64 mGy/day'
      },
      waypoints: data.waypoints.map((wp: any, idx: number) => ({
        index: idx + 1,
        name: wp.name || `Waypoint ${idx + 1}`,
        lat: wp.coordinate?.lat,
        lon: wp.coordinate?.lon,
        elevationMeters: wp.elevationMeters,
        slopeDeg: wp.slopeDeg,
        hazardClassification: wp.hazardLevel,
        cumulativeDistanceKm: wp.distanceFromStartKm,
        cumulativeOxygenBurnL: wp.cumulativeOxygenLiters
      })),
      datasetInventory: PLANETARY_DATASETS.map(d => ({
        mission: d.mission,
        instrument: d.instrument,
        product: d.name,
        resolution: d.spatialResolution,
        datum: d.coordinateReferenceSystem,
        url: d.sourceUrl
      })),
      uncertaintyAndLimitations: [
        'Elevation and slope calculations utilize MOLA MEGDR gridded altimetry (463 m/pix horizontal resolution); sub-pixel boulder hazards require rover hazard camera verification.',
        'Metabolic and oxygen consumption estimates follow NASA-STD-3001 Vol 2 guidelines adjusted for Martian 0.38g gravity, but individual astronaut physical exertion will vary.',
        'Atmospheric and thermal conditions synthesize genuine NASA MEDA in-situ observations with planetary climate models; diurnal thermal tide variations of ±30 Pa apply.',
        'This mission report was generated using the ARES Vanguard Science-Safety Pathfinding Engine for the NASA Space Apps Challenge.'
      ]
    };

    return NextResponse.json({
      success: true,
      report
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Report generation failed' }, { status: 500 });
  }
}
