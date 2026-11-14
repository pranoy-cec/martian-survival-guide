export type MarsCoordinate = {
  lat: number; // degrees -90 to +90
  lon: number; // degrees -180 to +180 (or 0 to 360 East)
  elevation?: number; // meters relative to Mars MOLA areoid datum
};

export type HazardLevel = 'NOMINAL' | 'MODERATE' | 'SEVERE' | 'IMPASSABLE';

export type TerrainAnalysis = {
  coordinate: MarsCoordinate;
  elevationMeters: number;
  slopeDeg: number;
  roughnessScore: number; // 0 (smooth sand sheet) to 1 (blocky boulder field)
  geologicalUnit: string;
  geologicalAge: 'Noachian' | 'Hesperian' | 'Amazonian' | 'Unknown';
  hazardLevel: HazardLevel;
  hazardFactors: string[];
  maxTraversableSlopeDeg: number;
  dataConfidence: number; // 0 to 100%
  dataSource: string;
  waterIceEvidence?: {
    probability: number;
    depthCm: number;
    source: string;
  };
};

export type POICategory =
  | 'MINERAL'
  | 'WATER_ICE'
  | 'GEOLOGICAL_CONTACT'
  | 'CRATER_RIM'
  | 'BIOSIGNATURE_CANDIDATE'
  | 'ROVER_WAYPOINT'
  | 'HISTORIC_LANDING_SITE';

export type StratigraphicUnit = {
  formationName: string;
  epoch: 'Early Noachian' | 'Late Noachian' | 'Early Hesperian' | 'Late Hesperian' | 'Amazonian';
  ageGa: number;
  lithology: string;
  layerThicknessM: number;
  depositionalEnvironment: string;
  sampleEvidence: string;
};

export type MineralSignature = {
  name: string;
  formula: string;
  spectralCategory: 'Phyllosilicates' | 'Sulfates' | 'Carbonates' | 'Mafic Silicates' | 'Silica/Halides';
  instrument: 'CRISM' | 'OMEGA' | 'SuperCam' | 'Sherloc' | 'CheMin';
  abundanceLevel: 'DOMINANT' | 'ABUNDANT' | 'ACCESSORY' | 'TRACE';
  scientificImplication: string;
};

export type CachedSampleTube = {
  tubeId: string;
  coreName: string;
  sol: number;
  rockType: string;
  coreLengthMm: number;
  sampleContext: string;
  targetAstrobiologyScore: number; // 0 - 100
};

export type SciencePOI = {
  id: string;
  name: string;
  location: MarsCoordinate;
  category: POICategory;
  mission: string;
  sol?: number;
  description: string;
  scientificSignificance: string;
  geologicUnit: string;
  mineralSignatures: string[];
  waterIceRelevance?: string;
  biosignaturePotential: 'HIGH' | 'MEDIUM' | 'LOW' | 'INERT';
  sampleRecommendation: string;
  nasaImage?: {
    url: string;
    caption: string;
    credit: string;
    instrument: string;
  };
};

export type RouteType = 'SAFE' | 'SCIENTIFIC' | 'BALANCED' | 'GEOMETRIC';

export type RouteWaypoint = {
  id: string;
  name: string;
  coordinate: MarsCoordinate;
  elevationMeters: number;
  slopeDeg: number;
  hazardLevel: HazardLevel;
  associatedPoi?: SciencePOI;
  distanceFromStartKm: number;
  cumulativeTimeMin: number;
  cumulativeOxygenLiters: number;
  notes?: string;
};

export type RouteOption = {
  id: string;
  type: RouteType;
  title: string;
  description: string;
  pathCoordinates: [number, number][]; // [lat, lon]
  waypoints: RouteWaypoint[];
  totalDistanceKm: number;
  estimatedDurationHours: number;
  elevationGainMeters: number;
  elevationLossMeters: number;
  maxSlopeDeg: number;
  averageSlopeDeg: number;
  safetyScore: number;       // 0 - 100
  scienceScore: number;      // 0 - 100
  efficiencyScore: number;   // 0 - 100
  confidenceScore: number;   // 0 - 100
  overallScore: number;      // 0 - 100
  oxygenConsumptionLiters: number;
  energyConsumptionKwh: number;
  metabolicCostKcal: number;
  hazardBreakdown: {
    nominalFraction: number;
    moderateFraction: number;
    severeFraction: number;
    impassableFraction: number;
    steepestSectionCoords: MarsCoordinate;
    primaryHazards: string[];
  };
  scienceHighlights: {
    poiCount: number;
    poisVisited: SciencePOI[];
    keyMinerals: string[];
    sampleOpportunityScore: number;
  };
  tradeoffAnalysis: {
    advantages: string[];
    disadvantages: string[];
    recommendationReason: string;
  };
};

export type MissionProfile = {
  astronautWeightKg: number;
  spacesuitWeightKg: number;
  roverAssisted: boolean;
  roverBatteryCapacityKwh: number;
  maxEvaDurationHours: number;
  primaryObjective: 'SAFETY_FIRST' | 'SCIENCE_MAX' | 'RESOURCE_EFFICIENCY' | 'BALANCED';
  weights: {
    safety: number;
    science: number;
    efficiency: number;
    confidence: number;
  };
};

export type EnvironmentalTelemetry = {
  sol: number;
  ls: number; // Solar longitude in degrees (season indicator)
  ltst: string; // Local True Solar Time (e.g. "14:22:15")
  siteName: string;
  coordinates: MarsCoordinate;
  temperature: {
    current: number;
    min: number;
    max: number;
    groundTemp: number;
    unit: '°C';
  };
  pressure: {
    current: number;
    min: number;
    max: number;
    unit: 'Pa';
  };
  dustOpticalDepth: {
    tau: number;
    status: 'OPTIMAL' | 'MODERATE' | 'ELEVATED' | 'STORM_ALERT';
    solarArrayEfficiencyPenaltyPct: number;
  };
  radiation: {
    uvFluxWPerM2: number;
    ionizingDoseRateMgyPerDay: number;
    cumulativeSolDoseMgy: number;
    safeEvaTimeHours: number;
  };
  wind: {
    speedAvgMPerS: number;
    speedMaxGustMPerS: number;
    directionDeg: number;
  };
  // Detailed MEDA 6-Sensor Suite Telemetry
  medaSensorSuite?: {
    atsThermalGradientCPerM: number; // Air Temperature Sensors 1.45m vs 0.85m gradient
    atsLevels: { sensor: string; heightM: number; tempC: number }[];
    gtsSkinTempC: number; // Ground Temperature Sensor (IR radiometer)
    gtsThermalInertiaJ: number; // J m^-2 K^-1 s^-1/2
    psThermalTideAmplitudePa: number; // Barometric diurnal oscillation amplitude
    psKelvinWaveDetected: boolean;
    wsHorizontalVectorMPerS: number; // Wind Sensor 2-boom sonic vector
    wsVerticalVectorMPerS: number;
    wsSaltationActive: boolean; // Sand transport trigger (>15 m/s)
    rdsTau880nm: number; // Radiation and Dust Sensor at 880 nm
    rdsDiffuseRatio: number; // Diffuse to total solar irradiance fraction
    hsRelativeHumidityPct: number; // Humidity Sensor RH %
    hsWaterVaporPpmv: number; // Water vapor mixing ratio (ppmv)
    hsFrostPointC: number; // Frost condensation point
    hsFrostHazard: boolean;
  };
  atmosphericComposition?: {
    gas: string;
    percent: number;
    hazardAlert?: string;
  }[];
  provenance: {
    instrument: string;
    mission: string;
    nature: 'IN_SITU_OBSERVATION' | 'CALIBRATED_HISTORICAL' | 'PLANETARY_CLIMATE_MODEL';
    lastCalibratedUtc: string;
    instrumentLimitations: string;
    uncertaintyStatement: string;
  };
};

export type LandingSitePreset = {
  id: string;
  name: string;
  formalDesignation: string;
  center: MarsCoordinate;
  defaultZoom: number;
  geologicContext: string;
  historicMission: string;
  elevationMeters: number;
  keyScienceGoals: string[];
  startPoint: MarsCoordinate;
  endPoint: MarsCoordinate;
  // Comprehensive Science Dossier Fields
  chronostratigraphy?: StratigraphicUnit[];
  crismMineralogy?: MineralSignature[];
  cachedSampleTubes?: CachedSampleTube[];
  astrobiologyAssessment?: {
    habitabilityGrade: 'A+' | 'A' | 'B+' | 'B' | 'C';
    preservationWindow: string;
    taphonomyNotes: string;
    radiationDegradationDepthM: number;
  };
  geotechnicalProperties?: {
    regolithBearingCapacityKPa: number;
    soilInternalFrictionAngleDeg: number;
    rockAbundancePercent: number;
    wheelSlipHazardLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
    meanThermalInertia: number;
  };
  pdsDataArchives?: {
    archiveId: string;
    instrument: string;
    datasetTitle: string;
    pdsVolumeUrl: string;
  }[];
};
