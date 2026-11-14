import { LandingSitePreset } from '../types';

export const LANDING_SITES: LandingSitePreset[] = [
  {
    id: 'jezero-crater',
    name: 'Jezero Crater & Neretva Vallis',
    formalDesignation: 'Mars 2020 Perseverance Mission Primary Exploration Sector',
    center: { lat: 18.4447, lon: 77.4508, elevation: -2560 },
    defaultZoom: 12,
    geologicContext: 'Ancient open-basin lake fed by Neretva Vallis inlet channel ~3.7 Ga. Preserves clay-rich fan delta deposits, olivine-carbonate lithology, and crater rim basement.',
    historicMission: 'Mars 2020 Perseverance Rover & Ingenuity Helicopter (NASA/JPL)',
    elevationMeters: -2560,
    keyScienceGoals: [
      'Astrobiology & biosignature candidate sampling in delta bottomsets',
      'Constrain Hesperian-Noachian aqueous history through carbonate minerals',
      'Ingenuity aerial reconnaissance calibration for traversability'
    ],
    startPoint: { lat: 18.380, lon: 77.580, elevation: -2580 }, // Octavia E. Butler Landing / Séítah base
    endPoint: { lat: 18.460, lon: 77.410, elevation: -2490 }   // Upper Delta / Jezero Rim scarp
  },
  {
    id: 'gale-crater',
    name: 'Gale Crater & Mount Sharp',
    formalDesignation: 'Mars Science Laboratory Curiosity Sector (Aeolis Mons)',
    center: { lat: -4.5895, lon: 137.4417, elevation: -4450 },
    defaultZoom: 11,
    geologicContext: 'Central mound of stratified sedimentary deposits rising 5.5 km above crater floor, transitioning from clay-bearing units through sulfate-bearing units into upper Amazonian dust mantles.',
    historicMission: 'Mars Science Laboratory Curiosity Rover (NASA/JPL)',
    elevationMeters: -4450,
    keyScienceGoals: [
      'Document habitability gradient across clay-to-sulfate transition',
      'Trace ancient lacustrine and fluvial environments in Yellowknife Bay',
      'Investigate modern methane variations and surface radiation dynamics'
    ],
    startPoint: { lat: -4.590, lon: 137.440, elevation: -4460 }, // Bradbury Landing
    endPoint: { lat: -4.680, lon: 137.370, elevation: -3900 }   // Sulfate-Bearing Unit on Mt Sharp
  },
  {
    id: 'valles-marineris',
    name: 'Valles Marineris (Candor Chasma)',
    formalDesignation: 'Grand Canyon of Mars - Interior Layered Deposits (ILD)',
    center: { lat: -6.500, lon: 284.400, elevation: -3800 }, // ~ -75.6°
    defaultZoom: 9,
    geologicContext: 'Gigantic tectonic rift system displaying 7-9 km deep canyon walls with thick stacks of rhythmic sulfate-rich interior layered deposits and active slope streaks.',
    historicMission: 'Viking Orbiter, Mars Global Surveyor, MRO CTX/HiRISE',
    elevationMeters: -3800,
    keyScienceGoals: [
      'Sample multi-kilometer stratigraphic record of Martian aqueous sulfates',
      'Examine tectonic fault scarps and canyon mass-wasting hazards',
      'Assess deep canyon atmospheric pressure shielding for astronaut radiation mitigation'
    ],
    startPoint: { lat: -6.400, lon: 284.300, elevation: -3700 },
    endPoint: { lat: -6.650, lon: 284.600, elevation: -4100 }
  },
  {
    id: 'olympus-mons',
    name: 'Olympus Mons Basal Scarp',
    formalDesignation: 'Tharsis Volcanic Province - Western Aureole & Lava Tubes',
    center: { lat: 18.650, lon: 226.200, elevation: 8500 }, // ~ -133.8°
    defaultZoom: 8,
    geologicContext: 'Largest volcano in the solar system, bordered by a 6-8 km high near-vertical basal scarp. Flanks exhibit basaltic lava channels, skylights, and collapsed lava tubes.',
    historicMission: 'Mariner 9, Viking, Mars Odyssey, Mars Express HRSC',
    elevationMeters: 8500,
    keyScienceGoals: [
      'Locate intact lava tube skylights for subterranean radiation-shielded habitat placement',
      'Inspect young Amazonian basaltic flows and volcanic degassing volatiles',
      'Map severe terrain hazards along catastrophic collapse aureoles'
    ],
    startPoint: { lat: 18.500, lon: 226.050, elevation: 8300 },
    endPoint: { lat: 18.750, lon: 226.400, elevation: 9200 }
  },
  {
    id: 'meridiani-planum',
    name: 'Meridiani Planum (Opportunity Site)',
    formalDesignation: 'Hematite Spherule Plains & Burns Cliff Formation',
    center: { lat: -0.190, lon: 354.470, elevation: -1400 },
    defaultZoom: 12,
    geologicContext: 'Expansive sulfate-rich sedimentary plain characterized by gray crystalline hematite spherules (blueberries) formed in acidic groundwater conditions.',
    historicMission: 'Mars Exploration Rover Opportunity (NASA/JPL)',
    elevationMeters: -1400,
    keyScienceGoals: [
      'Evaluate ancient acidic groundwater diagenesis and jarosite mineralogy',
      'Study long-term rover mobility in active basaltic ripple and sand dune fields',
      'Validate orbital MGS TES hematite signatures with ground truth samples'
    ],
    startPoint: { lat: -0.190, lon: 354.470, elevation: -1410 }, // Eagle Crater
    endPoint: { lat: -0.210, lon: 354.510, elevation: -1380 }   // Endurance Crater
  },
  {
    id: 'utopia-planitia',
    name: 'Utopia Planitia Ice Reservoir',
    formalDesignation: 'Northern Lowlands Subsurface Glacial Ice Sheet',
    center: { lat: 46.700, lon: 117.500, elevation: -4150 },
    defaultZoom: 9,
    geologicContext: 'Extensive scalloped depressions indicating periglacial thermokarst. MRO SHARAD radar data mapped a 80-170 m thick subsurface pure water-ice deposit beneath 1-10 m of regolith.',
    historicMission: 'Viking 2 Lander & MRO SHARAD Subsurface Sounding',
    elevationMeters: -4150,
    keyScienceGoals: [
      'Direct extraction and ISRU processing of pure glacial water ice for rocket propellant and life support',
      'Drill core sampling for cryopreserved organic molecules and biosignatures',
      'Monitor permafrost sublimational hazards and thermal ground contraction fractures'
    ],
    startPoint: { lat: 46.550, lon: 117.300, elevation: -4160 },
    endPoint: { lat: 46.850, lon: 117.750, elevation: -4120 }
  }
];
