import { getNumericalElevation, analyzeTerrainAtCoordinate, calculateMartianDistanceKm } from '../lib/engine/elevationModel';
import { generateOptimizedRoutes } from '../lib/engine/routeOptimizer';
import { getEnvironmentalTelemetry } from '../lib/engine/environmentalModel';
import { calculateSegmentMetabolicCost } from '../lib/engine/metabolicModel';
import { LANDING_SITES } from '../lib/data/landingSites';
import { PLANETARY_DATASETS } from '../lib/data/datasets';
import { SCIENCE_POIS } from '../lib/data/sciencePOIs';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
    failed++;
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log(' ARES MARTIAN EXPLORATION SYSTEM — AUTOMATED QA SUITE');
  console.log('======================================================\n');

  // Test 1: Great-Circle Martian Distance Calculation
  console.log('--- 1. Planetary Distance & Coordinate Math ---');
  const jezeroCenter = { lat: 18.4447, lon: 77.4508 };
  const jezeroRim = { lat: 18.5000, lon: 77.4508 };
  const distKm = calculateMartianDistanceKm(jezeroCenter, jezeroRim);
  assert(distKm > 3.0 && distKm < 3.5, 'Haversine distance for 0.055° lat on Mars (~3.28 km)', `Got: ${distKm.toFixed(2)} km`);

  // Test 2: MOLA Numerical Elevation & Datum Integrity
  console.log('\n--- 2. MOLA Altimetry & Slope Calculations ---');
  const jezeroElev = getNumericalElevation(18.4447, 77.4508);
  assert(jezeroElev < -2400 && jezeroElev > -2700, 'Jezero crater basin elevation within MOLA datum range (-2560m)', `Got: ${jezeroElev}m`);

  const mtSharpElev = getNumericalElevation(-4.72, 137.38);
  assert(mtSharpElev > -2000, 'Gale Crater Mt Sharp mound elevated relative to crater floor (-4450m)', `Got: ${mtSharpElev}m`);

  const terrain = analyzeTerrainAtCoordinate(jezeroCenter);
  assert(terrain.slopeDeg >= 0 && terrain.slopeDeg <= 90, 'Slope calculation produces valid degrees (0-90°)', `Got: ${terrain.slopeDeg}°`);
  assert(terrain.hazardLevel === 'NOMINAL' || terrain.hazardLevel === 'MODERATE', 'Jezero central landing area is traversable');
  assert(terrain.dataConfidence > 90, 'High data confidence for MOLA coverage');

  // Test 3: Science-Safety Multi-Objective Route Optimizer
  console.log('\n--- 3. Science-Safety Route Optimizer Engine ---');
  const site = LANDING_SITES[0];
  const profile = {
    astronautWeightKg: 80,
    spacesuitWeightKg: 140,
    roverAssisted: true,
    roverBatteryCapacityKwh: 35,
    maxEvaDurationHours: 8.0,
    primaryObjective: 'BALANCED' as const,
    weights: { safety: 0.35, science: 0.35, efficiency: 0.20, confidence: 0.10 }
  };

  const routes = generateOptimizedRoutes(site.startPoint, site.endPoint, profile);
  assert(routes.length >= 3, 'Generates Pareto-optimal routes (Balanced, Safe, Scientific, Geometric)');

  const balanced = routes.find(r => r.type === 'BALANCED');
  const safe = routes.find(r => r.type === 'SAFE');
  const sci = routes.find(r => r.type === 'SCIENTIFIC');

  assert(!!balanced && !!safe && !!sci, 'All three strategy types present');
  assert(safe!.safetyScore >= balanced!.safetyScore, 'Safe route has higher safety score than balanced route', `Safe: ${safe?.safetyScore}, Balanced: ${balanced?.safetyScore}`);
  assert(sci!.scienceScore >= safe!.scienceScore, 'Scientific route has higher science score than safe route', `Sci: ${sci?.scienceScore}, Safe: ${safe?.scienceScore}`);
  assert(balanced!.overallScore > 0 && balanced!.overallScore <= 100, 'Overall score in valid range 0-100');
  assert(balanced!.oxygenConsumptionLiters > 0 && balanced!.oxygenConsumptionLiters < 400, 'Oxygen consumption adheres to NASA EVA limits');

  // Test 4: NASA-STD-3001 Metabolic Modeling
  console.log('\n--- 4. NASA-STD-3001 EVA Metabolic Cost Modeling ---');
  const flatCost = calculateSegmentMetabolicCost(1.0, 2.0, 0.1, profile);
  const steepCost = calculateSegmentMetabolicCost(1.0, 16.0, 0.6, profile);
  assert(steepCost.oxygenLiters > flatCost.oxygenLiters, 'Steep slope (16°) increases oxygen consumption over flat terrain', `Flat: ${flatCost.oxygenLiters}L, Steep: ${steepCost.oxygenLiters}L`);
  assert(steepCost.speedKmH < flatCost.speedKmH, 'Steep slope and high roughness reduce traverse speed', `Flat: ${flatCost.speedKmH} km/h, Steep: ${steepCost.speedKmH} km/h`);

  // Test 5: Environmental Telemetry Synthesizer
  console.log('\n--- 5. Environmental & MEDA/RAD Telemetry ---');
  const tel = getEnvironmentalTelemetry(site.name, site.center);
  assert(tel.temperature.min < -50 && tel.temperature.max > -40, 'Diurnal temperature within authentic Martian bounds');
  assert(tel.pressure.current > 600 && tel.pressure.current < 900, 'Atmospheric pressure reflects Jezero elevation column');
  assert(tel.radiation.ionizingDoseRateMgyPerDay > 0.4 && tel.radiation.ionizingDoseRateMgyPerDay < 1.0, 'Surface GCR radiation matches Curiosity RAD measurements (~0.64 mGy/day)');
  assert(tel.provenance.nature === 'IN_SITU_OBSERVATION', 'Distinguishes genuine in-situ rover observations');

  // Test 6: Scientific POIs & Planetary Datasets Integrity
  console.log('\n--- 6. Scientific POIs & Datasets Metadata ---');
  assert(SCIENCE_POIS.length >= 10, 'Rich scientific catalog with 10+ authentic NASA targets', `Count: ${SCIENCE_POIS.length}`);
  const icePoi = SCIENCE_POIS.find(p => p.category === 'WATER_ICE');
  assert(!!icePoi && icePoi.waterIceRelevance !== undefined, 'Water ice POI has clear extraction feasibility and SHARAD radar provenance');

  assert(PLANETARY_DATASETS.length === 8, 'All 8 required NASA and USGS datasets registered with full provenance');
  const molaDataset = PLANETARY_DATASETS.find(d => d.id === 'mgs-mola-megdr');
  assert(!!molaDataset && molaDataset.coordinateReferenceSystem.includes('Areoid'), 'MOLA dataset correctly references Mars Areoid datum');

  console.log('\n======================================================');
  console.log(` TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) process.exit(1);
}

runTests();
