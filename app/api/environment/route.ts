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
      return apiError('Invalid environmental query parameters', parsed.error.format(), 400);
    }

    const { site, lat, lon, solOffset } = parsed.data;
    const telemetry = getEnvironmentalTelemetry(site, { lat, lon }, solOffset);

    return apiSuccess({
      siteName: telemetry.siteName,
      coordinates: telemetry.coordinates,
      temporalReference: {
        sol: telemetry.sol,
        ltst: telemetry.ltst,
        solarLongitudeLs: telemetry.ls,
        seasonIndicator: telemetry.ls >= 180 && telemetry.ls <= 330 ? 'Southern Spring / Perihelion Dust Season' : 'Aphelion Cloud Belt Season'
      },
      atmosphericObservations: {
        airTemperatureC: {
          current: telemetry.temperature.current,
          diurnalMin: telemetry.temperature.min,
          diurnalMax: telemetry.temperature.max,
          groundSkinTemp: telemetry.temperature.groundTemp,
          unit: telemetry.temperature.unit,
          sensorHeightAboveGround: '1.45 meters (Boom 1 & 2)'
        },
        surfacePressurePa: {
          current: telemetry.pressure.current,
          diurnalMin: telemetry.pressure.min,
          diurnalMax: telemetry.pressure.max,
          semidiurnalTideAmplitudePa: 35,
          unit: telemetry.pressure.unit
        },
        dustConditions: {
          opticalDepthTau: telemetry.dustOpticalDepth.tau,
          hazardStatus: telemetry.dustOpticalDepth.status,
          solarArrayEfficiencyPenaltyPct: telemetry.dustOpticalDepth.solarArrayEfficiencyPenaltyPct,
          stormAlertThresholdTau: 1.5
        },
        windConditions: {
          averageSpeedMPerS: telemetry.wind.speedAvgMPerS,
          peakGustMPerS: telemetry.wind.speedMaxGustMPerS,
          directionDegrees: telemetry.wind.directionDeg
        }
      },
      radiationEnvironment: {
        uvFluxWPerM2: telemetry.radiation.uvFluxWPerM2,
        galacticCosmicRayDoseRateMgyPerDay: telemetry.radiation.ionizingDoseRateMgyPerDay,
        cumulativeSolDoseMgy: telemetry.radiation.cumulativeSolDoseMgy,
        maxSafeSingleEvaDurationHours: telemetry.radiation.safeEvaTimeHours,
        standardRadiationBaselineSource: 'MSL Curiosity RAD Silicon Detectors (Gale Crater)'
      },
      scientificProvenance: telemetry.provenance
    }, {
      source: `${telemetry.provenance.instrument} (${telemetry.provenance.mission})`,
      mission: telemetry.provenance.mission,
      instrument: telemetry.provenance.instrument,
      nature: telemetry.provenance.nature,
      limitations: telemetry.provenance.instrumentLimitations,
      uncertainty: telemetry.provenance.uncertaintyStatement
    });
  } catch (error: any) {
    return apiError(error.message || 'Environmental data retrieval error', null, 500);
  }
}
