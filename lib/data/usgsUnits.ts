export type USGSGeologicUnit = {
  symbol: string;
  name: string;
  age: 'Noachian' | 'Hesperian' | 'Amazonian' | 'Mixed';
  color: string;
  description: string;
  roughnessHazard: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  scienceInterest: number; // 0 to 100
  rockTypes: string[];
};

export const USGS_GEOLOGIC_UNITS: Record<string, USGSGeologicUnit> = {
  'Hjf': {
    symbol: 'Hjf',
    name: 'Jezero Western Delta Front Member',
    age: 'Hesperian',
    color: '#e76f51',
    description: 'Fine-to-coarse layered deltaic sedimentary rocks deposited into ancient Lake Jezero. High biosignature potential in fine mudstones.',
    roughnessHazard: 'MEDIUM',
    scienceInterest: 95,
    rockTypes: ['Smectite mudstone', 'Foreset sandstones', 'Carbonate-cemented siltstone']
  },
  'Hjs': {
    symbol: 'Hjs',
    name: 'Shenandoah Formation Delta Topset',
    age: 'Hesperian',
    color: '#f4a261',
    description: 'Flat-lying topset sedimentary beds representing river channel and floodplain facies. Moderate slopes, nominal traverse difficulty.',
    roughnessHazard: 'LOW',
    scienceInterest: 90,
    rockTypes: ['Sulfate-rich siltstone', 'Silica-bearing sandstones']
  },
  'NHi': {
    symbol: 'NHi',
    name: 'Jezero Floor Fractured Olivine-Cumulate',
    age: 'Noachian',
    color: '#2a9d8f',
    description: 'Igneous floor cumulate rocks characterized by polygonal fractures, boulder fields, and dangerous windblown sand megaripples.',
    roughnessHazard: 'HIGH',
    scienceInterest: 80,
    rockTypes: ['Olivine basalt', 'Pyroxenite cumulates', 'Secondary carbonate veins']
  },
  'c': {
    symbol: 'c',
    name: 'Impact Crater Rim and Ejecta Facies',
    age: 'Mixed',
    color: '#e63946',
    description: 'Chaotic blocky ejecta blankets and steep crater rim scarps. Severe slope hazards (>20°) and high density of wheel-damaging boulders.',
    roughnessHazard: 'EXTREME',
    scienceInterest: 85,
    rockTypes: ['Impact breccia', 'Melt sheets', 'Excavated basement lithologies']
  },
  'eHv': {
    symbol: 'eHv',
    name: 'Early Hesperian Volcanic Ridged Plains',
    age: 'Hesperian',
    color: '#b5838d',
    description: 'Extensive flood basalt lava flows displaying compressional wrinkle ridges. Ideal for long-range rover traverses due to gentle topography.',
    roughnessHazard: 'LOW',
    scienceInterest: 65,
    rockTypes: ['Tholeiitic flood basalt', 'Plagioclase-phyric lavas']
  },
  'Aum': {
    symbol: 'Aum',
    name: 'Utopia Scalloped Mantle (Permafrost)',
    age: 'Amazonian',
    color: '#00b4d8',
    description: 'Sublimation-scalloped volatile-rich permafrost mantle. Overlies massive 50-85% pure subsurface glacial ice sheets. High ISRU resource value.',
    roughnessHazard: 'MEDIUM',
    scienceInterest: 98,
    rockTypes: ['Subsurface pure water ice', 'Periglacial regolith lag', 'Sublimation thermokarst pits']
  },
  'Hild': {
    symbol: 'Hild',
    name: 'Interior Layered Deposits (Candor Chasma)',
    age: 'Hesperian',
    color: '#9b5de5',
    description: 'Gigantic layered sulfate stacks in Valles Marineris. High mineral hydration content, steep canyon walls with active landslide hazards.',
    roughnessHazard: 'HIGH',
    scienceInterest: 92,
    rockTypes: ['Polyhydrated magnesium sulfate', 'Kieserite', 'Monohydrated sulfates']
  },
  'mNh': {
    symbol: 'mNh',
    name: 'Middle Noachian Highland Terrain',
    age: 'Noachian',
    color: '#6c757d',
    description: 'Heavily cratered, ancient Martian crust dissected by branched valley networks. Preserves early planetary magnetic field and aqueous alteration.',
    roughnessHazard: 'HIGH',
    scienceInterest: 88,
    rockTypes: ['Anorthositic crust', 'Fe/Mg smectite clays', 'Hydrothermal alteration minerals']
  }
};
