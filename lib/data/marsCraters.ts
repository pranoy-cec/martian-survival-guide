import { MarsCoordinate } from '../types';

export interface MarsCrater {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  diameterKm: number;
  depthMeters: number;
  rimElevationMeters: number;
  geologicalAge: 'Noachian' | 'Hesperian' | 'Amazonian';
  morphology:
    | 'Complex with Central Peak'
    | 'Degraded Multi-Ring Basin'
    | 'Fresh Simple Bowl'
    | 'Ice-Filled Perennial Mound'
    | 'Sedimentary Paleolake Basin'
    | 'Layered Sulfate Mound';
  scientificInterest: string;
  associatedMission: string;
  iauApprovedYear: number;
  waterIceEvidence: boolean;
  mineralsDetected: string[];
}

export const MARS_CRATERS: MarsCrater[] = [
  {
    id: 'jezero',
    name: 'Jezero Crater',
    latitude: 18.4447,
    longitude: 77.4508,
    diameterKm: 49.0,
    depthMeters: 1050,
    rimElevationMeters: -1900,
    geologicalAge: 'Noachian',
    morphology: 'Sedimentary Paleolake Basin',
    scientificInterest: 'Ancient open-basin paleolake with well-preserved river delta, clay smectites, olivine-carbonate lithology, and cached Mars Sample Return tubes.',
    associatedMission: 'Mars 2020 Perseverance Rover & Ingenuity Helicopter',
    iauApprovedYear: 2007,
    waterIceEvidence: false,
    mineralsDetected: ['Fe/Mg Smectite Clays', 'Olivine Fo60-80', 'Magnesite Carbonate', 'Hydrated Silica']
  },
  {
    id: 'gale',
    name: 'Gale Crater',
    latitude: -4.5895,
    longitude: 137.4417,
    diameterKm: 154.0,
    depthMeters: 5500,
    rimElevationMeters: -2000,
    geologicalAge: 'Noachian',
    morphology: 'Layered Sulfate Mound',
    scientificInterest: 'Central stratified sedimentary mound (Aeolis Mons / Mt. Sharp) recording Mars transition from wet clay-rich warm climate to arid sulfate-bearing Amazonian epoch.',
    associatedMission: 'Mars Science Laboratory Curiosity Rover',
    iauApprovedYear: 1973,
    waterIceEvidence: false,
    mineralsDetected: ['Nontronite', 'Bassinite', 'Hematite', 'Jarosite', 'Amorphous Silicates']
  },
  {
    id: 'gusev',
    name: 'Gusev Crater',
    latitude: -14.5684,
    longitude: 175.4726,
    diameterKm: 166.0,
    depthMeters: 2100,
    rimElevationMeters: -1100,
    geologicalAge: 'Noachian',
    morphology: 'Sedimentary Paleolake Basin',
    scientificInterest: 'Catastrophic channel Ma\'adim Vallis debouched into Gusev. Columbia Hills revealed ancient volcanic hydrothermal silica sinter deposits indicative of hot springs.',
    associatedMission: 'Mars Exploration Rover Spirit',
    iauApprovedYear: 1976,
    waterIceEvidence: false,
    mineralsDetected: ['Opaline Silica', 'Goethite', 'Hematite', 'Olivine Basalts']
  },
  {
    id: 'korolev',
    name: 'Korolev Crater',
    latitude: 72.77,
    longitude: 164.58,
    diameterKm: 81.4,
    depthMeters: 2000,
    rimElevationMeters: -1900,
    geologicalAge: 'Hesperian',
    morphology: 'Ice-Filled Perennial Mound',
    scientificInterest: 'Spectacular natural cold trap holding a 1.8 km thick perennial domical mound of pure water ice (~2,200 km³ volume), stable year-round in Vastitas Borealis.',
    associatedMission: 'Mars Express HRSC & Trace Gas Orbiter (ESA/Roscosmos)',
    iauApprovedYear: 1973,
    waterIceEvidence: true,
    mineralsDetected: ['Pure Water Ice (98%)', 'Silicate Dust Contaminants']
  },
  {
    id: 'victoria',
    name: 'Victoria Crater',
    latitude: -2.05,
    longitude: 354.49,
    diameterKm: 0.75,
    depthMeters: 75,
    rimElevationMeters: -1400,
    geologicalAge: 'Amazonian',
    morphology: 'Fresh Simple Bowl',
    scientificInterest: 'Cabrillo and Cape Verde promontories exposed meter-scale sulfate cross-bedding and eolian dune stratigraphy (Burns Formation) investigated by Opportunity.',
    associatedMission: 'Mars Exploration Rover Opportunity',
    iauApprovedYear: 2008,
    waterIceEvidence: false,
    mineralsDetected: ['Jarosite', 'Hematite Spherules ("Blueberries")', 'Kieserite']
  },
  {
    id: 'endeavour',
    name: 'Endeavour Crater',
    latitude: -2.28,
    longitude: 354.77,
    diameterKm: 22.0,
    depthMeters: 300,
    rimElevationMeters: -1300,
    geologicalAge: 'Noachian',
    morphology: 'Degraded Multi-Ring Basin',
    scientificInterest: 'Excavated ancient Noachian crust at Cape York and Matijevic Hill, exposing smectite clay veins formed in neutral pH water before the acidic sulfate era.',
    associatedMission: 'Mars Exploration Rover Opportunity',
    iauApprovedYear: 2008,
    waterIceEvidence: false,
    mineralsDetected: ['Smectite Clays', 'Calcium Sulfate Veins (Gypsum)', 'Al-rich Phyllosilicates']
  },
  {
    id: 'belva',
    name: 'Belva Crater',
    latitude: 18.51,
    longitude: 77.37,
    diameterKm: 0.90,
    depthMeters: 80,
    rimElevationMeters: -2480,
    geologicalAge: 'Amazonian',
    morphology: 'Fresh Simple Bowl',
    scientificInterest: 'Impact into Jezero delta fan deposits, providing Perseverance Mastcam-Z with a cross-sectional view of delta foresets and large fluvial boulder conglomerates.',
    associatedMission: 'Mars 2020 Perseverance Rover',
    iauApprovedYear: 2021,
    waterIceEvidence: false,
    mineralsDetected: ['Deltaic Sandstone', 'Fluvial Boulders', 'Carbonate Matrices']
  },
  {
    id: 'schiaparelli',
    name: 'Schiaparelli Crater',
    latitude: -2.70,
    longitude: 16.70,
    diameterKm: 461.0,
    depthMeters: 2000,
    rimElevationMeters: 1800,
    geologicalAge: 'Noachian',
    morphology: 'Degraded Multi-Ring Basin',
    scientificInterest: 'Giant impact basin in Sinus Sabaeus quadrangle. Features thick layered sedimentary sequences deposited in lake or windblown environments.',
    associatedMission: 'Viking Orbiter & MGS MOLA',
    iauApprovedYear: 1973,
    waterIceEvidence: false,
    mineralsDetected: ['Layered Hydrated Silicates', 'Basaltic Sand Sheets']
  },
  {
    id: 'huygens',
    name: 'Huygens Crater',
    latitude: -13.96,
    longitude: 55.58,
    diameterKm: 467.0,
    depthMeters: 3000,
    rimElevationMeters: 2200,
    geologicalAge: 'Noachian',
    morphology: 'Degraded Multi-Ring Basin',
    scientificInterest: 'Rim and central uplift expose early Martian crust with iron/magnesium smectite clays and excavated carbonate minerals detected by CRISM.',
    associatedMission: 'Mars Reconnaissance Orbiter CRISM',
    iauApprovedYear: 1973,
    waterIceEvidence: false,
    mineralsDetected: ['Fe-Smectite', 'Carbonates', 'Excavated Low-Ca Pyroxene']
  },
  {
    id: 'holden',
    name: 'Holden Crater',
    latitude: -26.04,
    longitude: 326.02,
    diameterKm: 153.8,
    depthMeters: 2500,
    rimElevationMeters: -1800,
    geologicalAge: 'Noachian',
    morphology: 'Complex with Central Peak',
    scientificInterest: 'Crosscut by catastrophic flood channel Uzboi Vallis; preserves mega-breccia beds overlain by layered phyllosilicate lacustrine sediments.',
    associatedMission: 'Candidate MSL and Mars 2020 Landing Site',
    iauApprovedYear: 1973,
    waterIceEvidence: false,
    mineralsDetected: ['Smectite Clays', 'Megabreccia', 'Chlorite-group Silicates']
  },
  {
    id: 'eberswalde',
    name: 'Eberswalde Crater',
    latitude: -23.86,
    longitude: 326.75,
    diameterKm: 65.3,
    depthMeters: 800,
    rimElevationMeters: -1400,
    geologicalAge: 'Noachian',
    morphology: 'Complex with Central Peak',
    scientificInterest: 'Hosts Mars\' premier textbook inverted bird-foot river delta with sinuous meandering distributary channels preserved by lithified resistant caprock.',
    associatedMission: 'High-Priority NASA Mars Sample Return Exploration Site',
    iauApprovedYear: 2006,
    waterIceEvidence: false,
    mineralsDetected: ['Fe/Mg Phyllosilicates', 'Hydrated Silica', 'Detrital Quartz Analogues']
  },
  {
    id: 'newton',
    name: 'Newton Crater',
    latitude: -40.52,
    longitude: 201.94,
    diameterKm: 298.0,
    depthMeters: 3200,
    rimElevationMeters: -1200,
    geologicalAge: 'Noachian',
    morphology: 'Degraded Multi-Ring Basin',
    scientificInterest: 'Gullies on sun-facing crater walls display active Recurring Slope Lineae (RSL) that advance down steep slopes in warmest Martian seasons.',
    associatedMission: 'MRO HiRISE Dynamic Martian Surface Monitoring',
    iauApprovedYear: 1973,
    waterIceEvidence: true,
    mineralsDetected: ['Hydrated Perchlorate Salts', 'Basaltic Sand', 'Gypsum']
  },
  {
    id: 'hellas-basin',
    name: 'Hellas Impact Basin',
    latitude: -42.70,
    longitude: 70.00,
    diameterKm: 2300.0,
    depthMeters: 7152,
    rimElevationMeters: 2000,
    geologicalAge: 'Noachian',
    morphology: 'Degraded Multi-Ring Basin',
    scientificInterest: 'Deepest point on Mars (7,152 m below datum); atmospheric surface pressure exceeds 1,155 Pa, high enough for liquid water to theoretically not boil at 0°C.',
    associatedMission: 'Mars Global Surveyor, Mars Express HRSC, Viking',
    iauApprovedYear: 1973,
    waterIceEvidence: true,
    mineralsDetected: ['Debris-Covered Glaciers (LDA)', 'Hydrated Silicates', 'Carbonates']
  },
  {
    id: 'argyre-basin',
    name: 'Argyre Impact Basin',
    latitude: -49.70,
    longitude: 316.00,
    diameterKm: 892.0,
    depthMeters: 5200,
    rimElevationMeters: 1500,
    geologicalAge: 'Noachian',
    morphology: 'Degraded Multi-Ring Basin',
    scientificInterest: 'Southern impact basin surrounded by Charitum and Nereidum Montes; extensive evidence for glacial, periglacial, and braided glacial outwash valley systems.',
    associatedMission: 'Mars Reconnaissance Orbiter & Mars Odyssey THEMIS',
    iauApprovedYear: 1973,
    waterIceEvidence: true,
    mineralsDetected: ['Glacial Ice Core Moraines', 'Smectites', 'Serpentine']
  },
  {
    id: 'santa-maria',
    name: 'Santa Maria Crater',
    latitude: -2.17,
    longitude: 354.55,
    diameterKm: 0.09,
    depthMeters: 12,
    rimElevationMeters: -1390,
    geologicalAge: 'Amazonian',
    morphology: 'Fresh Simple Bowl',
    scientificInterest: 'Sharp-rimmed impact crater visited by Opportunity during solar conjunction. Rim revealed freshly exposed hydrated sulfate blocks.',
    associatedMission: 'Mars Exploration Rover Opportunity',
    iauApprovedYear: 2011,
    waterIceEvidence: false,
    mineralsDetected: ['Hydrated Polyhydrated Sulfates', 'Hematite']
  },
  {
    id: 'zunil',
    name: 'Zunil Crater',
    latitude: 7.70,
    longitude: 166.00,
    diameterKm: 10.4,
    depthMeters: 900,
    rimElevationMeters: -1100,
    geologicalAge: 'Amazonian',
    morphology: 'Complex with Central Peak',
    scientificInterest: 'Extremely fresh rayed crater formed <10 Ma; produced millions of secondary impact craters spanning 1,600 km across the Cerberus Plains.',
    associatedMission: 'MRO HiRISE & THEMIS',
    iauApprovedYear: 2003,
    waterIceEvidence: false,
    mineralsDetected: ['Unaltered Pyroxene', 'Impact Glass', 'High-Ca Basalt']
  },
  {
    id: 'mojave',
    name: 'Mojave Crater',
    latitude: 7.50,
    longitude: 327.00,
    diameterKm: 58.0,
    depthMeters: 2600,
    rimElevationMeters: -1200,
    geologicalAge: 'Amazonian',
    morphology: 'Complex with Central Peak',
    scientificInterest: 'Displays extraordinary alluvial fans, debris flows, and braided terrace networks formed by impact-induced melting of subsurface ice.',
    associatedMission: 'MRO HiRISE & Mars Odyssey THEMIS',
    iauApprovedYear: 2006,
    waterIceEvidence: true,
    mineralsDetected: ['Impact Melt Deposits', 'Pyroxene', 'Hydrated Clays in Breccia']
  },
  {
    id: 'louth',
    name: 'Louth Crater',
    latitude: 70.41,
    longitude: 103.20,
    diameterKm: 36.3,
    depthMeters: 1400,
    rimElevationMeters: -2800,
    geologicalAge: 'Amazonian',
    morphology: 'Ice-Filled Perennial Mound',
    scientificInterest: 'Southernmost crater in Vastitas Borealis containing a permanent dome of pure water ice in its center, sustained by micro-climatic thermal inertia.',
    associatedMission: 'MRO CRISM & Mars Odyssey THEMIS',
    iauApprovedYear: 2007,
    waterIceEvidence: true,
    mineralsDetected: ['Surface Water Ice Frost', 'Basaltic Regolith']
  },
  {
    id: 'cassini',
    name: 'Cassini Crater',
    latitude: 23.36,
    longitude: 32.11,
    diameterKm: 412.0,
    depthMeters: 2100,
    rimElevationMeters: -800,
    geologicalAge: 'Noachian',
    morphology: 'Degraded Multi-Ring Basin',
    scientificInterest: 'Major Arabia Terra basin showing evidence of deep lacustrine sediment fill, deltaic deposits, and layered phyllosilicates.',
    associatedMission: 'Mars Express OMEGA & MGS MOLA',
    iauApprovedYear: 1973,
    waterIceEvidence: false,
    mineralsDetected: ['Fe/Mg Clays', 'Hydrated Sulfates', 'Carbonate Traces']
  },
  {
    id: 'kaiser',
    name: 'Kaiser Crater',
    latitude: -46.60,
    longitude: 19.10,
    diameterKm: 207.0,
    depthMeters: 2400,
    rimElevationMeters: 1400,
    geologicalAge: 'Noachian',
    morphology: 'Degraded Multi-Ring Basin',
    scientificInterest: 'Famous for spectacular dark barchan and longitudinal sand dune fields in the Noachis quadrangle; seasonal CO2 geysers carve spiders on dunes.',
    associatedMission: 'MRO HiRISE Active Dune Monitoring',
    iauApprovedYear: 1973,
    waterIceEvidence: false,
    mineralsDetected: ['Dark Olivine Sands', 'Seasonal Dry Ice Frost (CO2)']
  }
];

export function getCratersNear(coord: MarsCoordinate, radiusKm: number = 500): MarsCrater[] {
  return MARS_CRATERS.filter((crater) => {
    // Great circle distance estimation on Mars (R = 3389.5 km)
    const lat1 = (coord.lat * Math.PI) / 180;
    const lat2 = (crater.latitude * Math.PI) / 180;
    const dLat = lat2 - lat1;
    const dLon = ((crater.longitude - coord.lon) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = 3389.5 * c;
    return dist <= radiusKm;
  });
}
