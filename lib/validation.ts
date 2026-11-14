import { z } from 'zod';

export const MarsCoordinateSchema = z.object({
  lat: z.number().min(-90).max(90),
  lon: z.number(), // will be normalized to 0-360 East in engine
  elevation: z.number().optional()
});

export const TerrainQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number()
});

export const BatchTerrainQuerySchema = z.object({
  coordinates: z.array(MarsCoordinateSchema).min(1).max(250)
});

export const ProfileQuerySchema = z.object({
  start: MarsCoordinateSchema,
  destination: MarsCoordinateSchema,
  steps: z.number().min(5).max(100).default(25)
});

export const MissionWeightsSchema = z.object({
  safety: z.number().min(0).max(1).default(0.35),
  science: z.number().min(0).max(1).default(0.35),
  efficiency: z.number().min(0).max(1).default(0.20),
  confidence: z.number().min(0).max(1).default(0.10)
});

export const MissionProfileSchema = z.object({
  astronautWeightKg: z.number().min(40).max(150).default(80),
  spacesuitWeightKg: z.number().min(50).max(250).default(140),
  roverAssisted: z.boolean().default(true),
  roverBatteryCapacityKwh: z.number().min(5).max(100).default(35),
  maxEvaDurationHours: z.number().min(1).max(24).default(8.0),
  primaryObjective: z.enum(['SAFETY_FIRST', 'SCIENCE_MAX', 'RESOURCE_EFFICIENCY', 'BALANCED']).default('BALANCED'),
  weights: MissionWeightsSchema.default({
    safety: 0.35,
    science: 0.35,
    efficiency: 0.20,
    confidence: 0.10
  })
});

export const RouteOptimizeRequestSchema = z.object({
  start: MarsCoordinateSchema,
  destination: MarsCoordinateSchema,
  profile: MissionProfileSchema.optional()
});

export const EnvironmentQuerySchema = z.object({
  site: z.string().optional().default('Jezero Crater (Perseverance)'),
  lat: z.coerce.number().min(-90).max(90).optional().default(18.4447),
  lon: z.coerce.number().optional().default(77.4508),
  solOffset: z.coerce.number().optional().default(0)
});

export const NasaImagesQuerySchema = z.object({
  q: z.string().min(1).default('Mars Perseverance'),
  rover: z.enum(['perseverance', 'curiosity', 'opportunity', 'spirit', 'all']).default('all'),
  page: z.coerce.number().min(1).max(50).default(1)
});

export const MissionReportRequestSchema = z.object({
  missionName: z.string().min(1).default('ARES Ares-1 Primary EVA Walk'),
  siteName: z.string().min(1),
  start: MarsCoordinateSchema,
  destination: MarsCoordinateSchema,
  routeId: z.string(),
  routeType: z.enum(['SAFE', 'SCIENTIFIC', 'BALANCED']),
  metrics: z.object({
    distanceKm: z.number(),
    durationHours: z.number(),
    elevationGainM: z.number(),
    maxSlopeDeg: z.number(),
    oxygenLiters: z.number(),
    safetyScore: z.number(),
    scienceScore: z.number()
  }),
  waypoints: z.array(z.any()),
  environment: z.any().optional()
});
