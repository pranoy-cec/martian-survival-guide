import { LandingSitePreset } from '../types';

export const LANDING_SITES: LandingSitePreset[] = [
  {
    id: 'jezero-crater',
    name: 'Jezero Crater & Neretva Vallis',
    formalDesignation: 'Mars 2020 Perseverance Mission Primary Exploration Sector',
    center: { lat: 18.4447, lon: 77.4508, elevation: -2560 },
    defaultZoom: 12,
    geologicContext:
      'Ancient open-basin lake fed by Neretva Vallis inlet channel ~3.7 Ga. Preserves clay-rich fan delta deposits, olivine-carbonate lithology, and crater rim basement.',
    historicMission: 'Mars 2020 Perseverance Rover & Ingenuity Helicopter (NASA/JPL)',
    elevationMeters: -2560,
    keyScienceGoals: [
      'Astrobiology & biosignature candidate sampling in delta bottomsets',
      'Constrain Hesperian-Noachian aqueous history through carbonate minerals',
      'Ingenuity aerial reconnaissance calibration for traversability'
    ],
    startPoint: { lat: 18.38, lon: 77.58, elevation: -2580 }, // Octavia E. Butler Landing / Séítah base
    endPoint: { lat: 18.46, lon: 77.41, elevation: -2490 }, // Upper Delta / Jezero Rim scarp
    chronostratigraphy: [
      {
        formationName: 'Shenandoah Formation (Delta Topsets)',
        epoch: 'Early Hesperian',
        ageGa: 3.65,
        lithology: 'Cross-bedded sandstone and conglomeratic channels',
        layerThicknessM: 45,
        depositionalEnvironment: 'Prograding fluvial distributary channels into ancient Lake Jezero',
        sampleEvidence: 'Cached core "Coulettes" and "Hazeltop" showing rounded fluvial pebbles'
      },
      {
        formationName: 'Hawksbill Gap Member (Delta Bottomsets)',
        epoch: 'Late Noachian',
        ageGa: 3.75,
        lithology: 'Fine-grained smectite mudstones and siltstones',
        layerThicknessM: 65,
        depositionalEnvironment: 'Quiet deep-water lacustrine settling with maximum organic preservation potential',
        sampleEvidence: 'Cached core "Wildcat Ridge" with high Raman luminescence and aromatic organics'
      },
      {
        formationName: 'Séítah Formation (Crater Floor Cumulate)',
        epoch: 'Early Noachian',
        ageGa: 3.92,
        lithology: 'Poikilitic olivine-pyroxene cumulate igneous rocks with carbonate alteration',
        layerThicknessM: 120,
        depositionalEnvironment: 'Thick differentiated magma lake or ultramafic volcanic cumulate',
        sampleEvidence: 'Cached core "Salette" and "Dourbes" containing euhedral olivine crystals'
      }
    ],
    crismMineralogy: [
      {
        name: 'Fe/Mg Smectite (Nontronite/Saponite)',
        formula: '(Ca,Na)0.3(Fe,Mg)2(Si,Al)4O10(OH)2·nH2O',
        spectralCategory: 'Phyllosilicates',
        instrument: 'CRISM',
        abundanceLevel: 'ABUNDANT',
        scientificImplication: 'Formed by low-temperature aqueous alteration of basaltic ash in neutral to alkaline lake waters'
      },
      {
        name: 'Magnesium Carbonate (Magnesite)',
        formula: 'MgCO3',
        spectralCategory: 'Carbonates',
        instrument: 'SuperCam',
        abundanceLevel: 'DOMINANT',
        scientificImplication: 'Records neutral paleolake pH and drawdown of early Martian atmospheric CO2'
      },
      {
        name: 'Forsteritic Olivine (Fo60-80)',
        formula: '(Mg,Fe)2SiO4',
        spectralCategory: 'Mafic Silicates',
        instrument: 'Sherloc',
        abundanceLevel: 'DOMINANT',
        scientificImplication: 'Deep-seated mantle melting or thick effusive volcanic cumulate flow'
      },
      {
        name: 'Hydrated Silica / Opal-A',
        formula: 'SiO2·nH2O',
        spectralCategory: 'Silica/Halides',
        instrument: 'Sherloc',
        abundanceLevel: 'ACCESSORY',
        scientificImplication: 'Exceptional terrestrial analog for rapid cellular fossilization and biosignature entombment'
      }
    ],
    cachedSampleTubes: [
      {
        tubeId: 'ST-220-M',
        coreName: 'Montdenier',
        sol: 196,
        rockType: 'Basaltic Cumulate',
        coreLengthMm: 59.8,
        sampleContext: 'Roubion outcrop on the fractured crater floor; preserves early igneous chronology',
        targetAstrobiologyScore: 72
      },
      {
        tubeId: 'ST-222-S',
        coreName: 'Salette',
        sol: 262,
        rockType: 'Olivine-Carbonate Cumulate',
        coreLengthMm: 62.4,
        sampleContext: 'Séítah South olivine unit; contains liquid water alteration carbonates',
        targetAstrobiologyScore: 88
      },
      {
        tubeId: 'ST-224-W',
        coreName: 'Wildcat Ridge',
        sol: 529,
        rockType: 'Fine Lacustrine Mudstone',
        coreLengthMm: 61.2,
        sampleContext: 'Hawksbill Gap delta bottomset; highest detected organic carbon and sulfate spatial correlation',
        targetAstrobiologyScore: 98
      },
      {
        tubeId: 'ST-228-B',
        coreName: 'Bearwallow',
        sol: 645,
        rockType: 'Coarse Deltaic Sandstone',
        coreLengthMm: 63.5,
        sampleContext: 'Yori Pass topset delta facies; high energy river pebbles in fine matrix',
        targetAstrobiologyScore: 84
      }
    ],
    astrobiologyAssessment: {
      habitabilityGrade: 'A+',
      preservationWindow: 'Late Noachian to Early Hesperian lacustrine delta bottomset mudstones (~3.8 to 3.6 Ga)',
      taphonomyNotes:
        'Sub-lacustrine smectite clays adsorb organic macromolecules and shield them from cosmic radiation degradation. Inverted delta caprocks prevent deflation.',
      radiationDegradationDepthM: 1.8
    },
    geotechnicalProperties: {
      regolithBearingCapacityKPa: 125,
      soilInternalFrictionAngleDeg: 34.2,
      rockAbundancePercent: 6.8,
      wheelSlipHazardLevel: 'MODERATE',
      meanThermalInertia: 310
    },
    pdsDataArchives: [
      {
        archiveId: 'M2020-MEDA-3-EDR-V1.0',
        instrument: 'MEDA Sensor Suite',
        datasetTitle: 'Mars 2020 Perseverance Atmospheric Calibrated Science Telemetry',
        pdsVolumeUrl: 'https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda.html'
      },
      {
        archiveId: 'M2020-MCZ-2-EDR-V1.0',
        instrument: 'Mastcam-Z Multispectral Stereo Imager',
        datasetTitle: 'Raw Calibrated Color Multispectral Surface Imaging at Jezero',
        pdsVolumeUrl: 'https://pds-imaging.jpl.nasa.gov/volumes/m2020.html'
      },
      {
        archiveId: 'MGS-M-MOLA-3-PEDR-L2-V1.0',
        instrument: 'Mars Orbiter Laser Altimeter',
        datasetTitle: 'MOLA Precision Experiment Data Record Topography Profile',
        pdsVolumeUrl: 'https://pds-geosciences.wustl.edu/missions/mgs/mola.html'
      }
    ]
  },
  {
    id: 'gale-crater',
    name: 'Gale Crater & Mount Sharp',
    formalDesignation: 'Mars Science Laboratory Curiosity Sector (Aeolis Mons)',
    center: { lat: -4.5895, lon: 137.4417, elevation: -4450 },
    defaultZoom: 11,
    geologicContext:
      'Central mound of stratified sedimentary deposits rising 5.5 km above crater floor, transitioning from clay-bearing units through sulfate-bearing units into upper Amazonian dust mantles.',
    historicMission: 'Mars Science Laboratory Curiosity Rover (NASA/JPL)',
    elevationMeters: -4450,
    keyScienceGoals: [
      'Document habitability gradient across clay-to-sulfate transition',
      'Trace ancient lacustrine and fluvial environments in Yellowknife Bay',
      'Investigate modern methane variations and surface radiation dynamics'
    ],
    startPoint: { lat: -4.59, lon: 137.44, elevation: -4460 }, // Bradbury Landing
    endPoint: { lat: -4.68, lon: 137.37, elevation: -3900 }, // Sulfate-Bearing Unit on Mt Sharp
    chronostratigraphy: [
      {
        formationName: 'Sulfate-Bearing Unit (Mt Sharp)',
        epoch: 'Early Hesperian',
        ageGa: 3.45,
        lithology: 'Layered polyhydrated magnesium sulfates and halite-bearing mudstones',
        layerThicknessM: 600,
        depositionalEnvironment: 'Evaporating playa lakes and hyper-arid dune environments',
        sampleEvidence: 'CheMin X-ray diffraction detected kieserite and polyhydrated sulfates'
      },
      {
        formationName: 'Murray Formation (Clay-Bearing Glen Torridon)',
        epoch: 'Late Noachian',
        ageGa: 3.70,
        lithology: 'Laminated mudstones rich in ferromagnesian smectites',
        layerThicknessM: 350,
        depositionalEnvironment: 'Long-lived, neutral pH perennial lake with habitable redox gradients',
        sampleEvidence: 'SAM pyrolysis evolved diverse chlorinated hydrocarbons and thiophenic ring molecules'
      },
      {
        formationName: 'Stimson Formation (Eolian Dune Caprock)',
        epoch: 'Amazonian',
        ageGa: 2.80,
        lithology: 'Cross-bedded lithified basaltic sand dunes with silica halos',
        layerThicknessM: 40,
        depositionalEnvironment: 'Post-lake dry dune migration with localized fracture fluid silica precipitation',
        sampleEvidence: 'Sample "Big Sky" and "Greenhorn" showing tridymite silica polymorphs'
      }
    ],
    crismMineralogy: [
      {
        name: 'Ferric Smectite (Nontronite)',
        formula: 'Na0.3Fe2(Si,Al)4O10(OH)2·nH2O',
        spectralCategory: 'Phyllosilicates',
        instrument: 'CheMin',
        abundanceLevel: 'DOMINANT',
        scientificImplication: 'Confirms neutral pH, low-salinity lacustrine water in Gale basin'
      },
      {
        name: 'Calcium Sulfate (Bassinite / Anhydrite)',
        formula: 'CaSO4·0.5H2O',
        spectralCategory: 'Sulfates',
        instrument: 'CheMin',
        abundanceLevel: 'ABUNDANT',
        scientificImplication: 'Post-depositional diagenetic groundwater circulation through fractures'
      },
      {
        name: 'Crystalline Gray Hematite',
        formula: 'Fe2O3',
        spectralCategory: 'Mafic Silicates',
        instrument: 'CheMin',
        abundanceLevel: 'ACCESSORY',
        scientificImplication: 'Formed in Vera Rubin Ridge by acidic oxidizing groundwater front'
      }
    ],
    cachedSampleTubes: [
      {
        tubeId: 'MSL-DRL-01',
        coreName: 'John Klein',
        sol: 182,
        rockType: 'Lacustrine Mudstone',
        coreLengthMm: 50.0,
        sampleContext: 'Yellowknife Bay; verified past habitability (CHNOPS elements present)',
        targetAstrobiologyScore: 94
      },
      {
        tubeId: 'MSL-DRL-02',
        coreName: 'Kilmarie',
        sol: 2380,
        rockType: 'Clay-Rich Glen Torridon Shale',
        coreLengthMm: 52.0,
        sampleContext: 'Highest clay mineral abundance discovered on Mars (~28 wt%)',
        targetAstrobiologyScore: 96
      }
    ],
    astrobiologyAssessment: {
      habitabilityGrade: 'A',
      preservationWindow: 'Murray Formation mudstones (~3.7 to 3.5 Ga lacustrine beds)',
      taphonomyNotes:
        'Fine-grained clay minerals protected organic macromolecules from oxidation; SAM detected organic thiophenes and benzene derivatives.',
      radiationDegradationDepthM: 2.1
    },
    geotechnicalProperties: {
      regolithBearingCapacityKPa: 140,
      soilInternalFrictionAngleDeg: 35.8,
      rockAbundancePercent: 8.5,
      wheelSlipHazardLevel: 'HIGH',
      meanThermalInertia: 340
    },
    pdsDataArchives: [
      {
        archiveId: 'MSL-M-REMS-3-EDR-V1.0',
        instrument: 'REMS Surface Weather Station',
        datasetTitle: 'Curiosity Rover Environmental Monitoring Station 10-Sol Cycles',
        pdsVolumeUrl: 'https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/MARS/curiosity/rems.html'
      },
      {
        archiveId: 'MSL-M-RAD-3-RDR-V1.0',
        instrument: 'RAD Radiation Assessment Detector',
        datasetTitle: 'Cosmic Ray and Solar Particle Radiation Surface Dose Measurements',
        pdsVolumeUrl: 'https://pds-geosciences.wustl.edu/missions/msl/rad.htm'
      }
    ]
  },
  {
    id: 'valles-marineris',
    name: 'Valles Marineris (Candor Chasma)',
    formalDesignation: 'Grand Canyon of Mars - Interior Layered Deposits (ILD)',
    center: { lat: -6.5, lon: 284.4, elevation: -3800 },
    defaultZoom: 9,
    geologicContext:
      'Gigantic tectonic rift system displaying 7-9 km deep canyon walls with thick stacks of rhythmic sulfate-rich interior layered deposits and active slope streaks.',
    historicMission: 'Viking Orbiter, Mars Global Surveyor, MRO CTX/HiRISE',
    elevationMeters: -3800,
    keyScienceGoals: [
      'Sample multi-kilometer stratigraphic record of Martian aqueous sulfates',
      'Examine tectonic fault scarps and canyon mass-wasting hazards',
      'Assess deep canyon atmospheric pressure shielding for astronaut radiation mitigation'
    ],
    startPoint: { lat: -6.4, lon: 284.3, elevation: -3700 },
    endPoint: { lat: -6.65, lon: 284.6, elevation: -4100 },
    chronostratigraphy: [
      {
        formationName: 'Candor Interior Layered Deposits (ILD)',
        epoch: 'Early Hesperian',
        ageGa: 3.5,
        lithology: 'Finely rhythmic monohydrated and polyhydrated sulfate beds',
        layerThicknessM: 3200,
        depositionalEnvironment: 'Sub-ice volcanism or giant evaporitic groundwater springs in structural graben',
        sampleEvidence: 'CRISM spectra confirm kilometer-thick kieserite stacks'
      },
      {
        formationName: 'Chasma Wall Escarpment Facies',
        epoch: 'Late Noachian',
        ageGa: 3.85,
        lithology: 'Fractured basaltic crust and megabreccia tectonic talus',
        layerThicknessM: 4500,
        depositionalEnvironment: 'Catastrophic extensional rifting of Tharsis volcanic bulge',
        sampleEvidence: 'Exposed crustal cross-section down to 8 km paleodepth'
      }
    ],
    crismMineralogy: [
      {
        name: 'Kieserite (Monohydrated Mg-Sulfate)',
        formula: 'MgSO4·H2O',
        spectralCategory: 'Sulfates',
        instrument: 'CRISM',
        abundanceLevel: 'DOMINANT',
        scientificImplication: 'Diagnostic signature of intensive evaporation under hyper-arid Martian atmosphere'
      },
      {
        name: 'Hydrated Ferric Sulfate (Copiapite/Jarosite)',
        formula: 'Fe2+Fe43+(SO4)6(OH)2·20H2O',
        spectralCategory: 'Sulfates',
        instrument: 'OMEGA',
        abundanceLevel: 'ABUNDANT',
        scientificImplication: 'Extremely acidic aqueous geochemical environment during late stage evaporation'
      }
    ],
    astrobiologyAssessment: {
      habitabilityGrade: 'B+',
      preservationWindow: 'Interior sulfate crystals can trap microscopic brine fluid inclusions',
      taphonomyNotes:
        'Sulfate evaporite crystals on Earth trap halophilic microorganisms and nucleic acids for tens of millions of years.',
      radiationDegradationDepthM: 1.2
    },
    geotechnicalProperties: {
      regolithBearingCapacityKPa: 220,
      soilInternalFrictionAngleDeg: 38.5,
      rockAbundancePercent: 18.2,
      wheelSlipHazardLevel: 'CRITICAL',
      meanThermalInertia: 385
    },
    pdsDataArchives: [
      {
        archiveId: 'MRO-M-CRISM-3-RDR-V1.0',
        instrument: 'CRISM Imaging Spectrometer',
        datasetTitle: 'Targeted Hyperspectral Observation of Candor Chasma ILD',
        pdsVolumeUrl: 'https://pds-geosciences.wustl.edu/missions/mro/crism.htm'
      }
    ]
  },
  {
    id: 'olympus-mons',
    name: 'Olympus Mons Basal Scarp',
    formalDesignation: 'Tharsis Volcanic Province - Western Aureole & Lava Tubes',
    center: { lat: 18.65, lon: 226.2, elevation: 8500 },
    defaultZoom: 8,
    geologicContext:
      'Largest volcano in the solar system, bordered by a 6-8 km high near-vertical basal scarp. Flanks exhibit basaltic lava channels, skylights, and collapsed lava tubes.',
    historicMission: 'Mariner 9, Viking, Mars Odyssey, Mars Express HRSC',
    elevationMeters: 8500,
    keyScienceGoals: [
      'Locate intact lava tube skylights for subterranean radiation-shielded habitat placement',
      'Inspect young Amazonian basaltic flows and volcanic degassing volatiles',
      'Map severe terrain hazards along catastrophic collapse aureoles'
    ],
    startPoint: { lat: 18.5, lon: 226.05, elevation: 8300 },
    endPoint: { lat: 18.75, lon: 226.4, elevation: 9200 },
    chronostratigraphy: [
      {
        formationName: 'Olympus Flank Basalt Flows',
        epoch: 'Amazonian',
        ageGa: 0.25,
        lithology: 'Pahoehoe and a\'a basaltic flows with intact pyroxene and olivine',
        layerThicknessM: 800,
        depositionalEnvironment: 'Low-viscosity effusive shield volcanism over a stationary mantle plume',
        sampleEvidence: 'Unweathered pristine basalt with minimal oxidation crust'
      }
    ],
    crismMineralogy: [
      {
        name: 'Clinopyroxene (Augite)',
        formula: '(Ca,Na)(Mg,Fe,Al,Ti)(Si,Al)2O6',
        spectralCategory: 'Mafic Silicates',
        instrument: 'CRISM',
        abundanceLevel: 'DOMINANT',
        scientificImplication: 'Primary mantle-derived anhydrous basaltic magma'
      }
    ],
    astrobiologyAssessment: {
      habitabilityGrade: 'C',
      preservationWindow: 'Intact lava tube interiors offering pristine radiation-shielded subsurfaces',
      taphonomyNotes: 'Subterranean lava tube environments protect from solar UV and galactic cosmic rays.',
      radiationDegradationDepthM: 0.2
    },
    geotechnicalProperties: {
      regolithBearingCapacityKPa: 310,
      soilInternalFrictionAngleDeg: 42.0,
      rockAbundancePercent: 24.5,
      wheelSlipHazardLevel: 'CRITICAL',
      meanThermalInertia: 420
    },
    pdsDataArchives: [
      {
        archiveId: 'MEX-M-HRSC-3-RDR-V1.0',
        instrument: 'HRSC High Resolution Stereo Camera',
        datasetTitle: 'High Resolution Digital Terrain Model of Olympus Mons Aureole',
        pdsVolumeUrl: 'https://pds-geosciences.wustl.edu/missions/mex/hrsc.htm'
      }
    ]
  },
  {
    id: 'meridiani-planum',
    name: 'Meridiani Planum (Opportunity Site)',
    formalDesignation: 'Hematite Spherule Plains & Burns Cliff Formation',
    center: { lat: -0.19, lon: 354.47, elevation: -1400 },
    defaultZoom: 12,
    geologicContext:
      'Expansive sulfate-rich sedimentary plain characterized by gray crystalline hematite spherules (blueberries) formed in acidic groundwater conditions.',
    historicMission: 'Mars Exploration Rover Opportunity (NASA/JPL)',
    elevationMeters: -1400,
    keyScienceGoals: [
      'Evaluate ancient acidic groundwater diagenesis and jarosite mineralogy',
      'Study long-term rover mobility in active basaltic ripple and sand dune fields',
      'Validate orbital MGS TES hematite signatures with ground truth samples'
    ],
    startPoint: { lat: -0.19, lon: 354.47, elevation: -1410 }, // Eagle Crater
    endPoint: { lat: -0.21, lon: 354.51, elevation: -1380 }, // Endurance Crater
    chronostratigraphy: [
      {
        formationName: 'Burns Formation (Upper Sulfate Sandstone)',
        epoch: 'Early Hesperian',
        ageGa: 3.55,
        lithology: 'Eolian cross-bedded sulfate-rich sandstone with diagenetic hematite spherules',
        layerThicknessM: 35,
        depositionalEnvironment: 'Shifting playa sand dunes with intermittent acidic groundwater table oscillations',
        sampleEvidence: 'Opportunity microscopic imager observed embedded 1-4 mm spherical concretions'
      }
    ],
    crismMineralogy: [
      {
        name: 'Gray Crystalline Hematite',
        formula: 'alpha-Fe2O3',
        spectralCategory: 'Mafic Silicates',
        instrument: 'CheMin',
        abundanceLevel: 'DOMINANT',
        scientificImplication: 'Orbital TES marker confirmed to be diagenetic groundwater concretions'
      },
      {
        name: 'Jarosite (Hydrated Iron Potassium Sulfate)',
        formula: 'KFe3(SO4)2(OH)6',
        spectralCategory: 'Sulfates',
        instrument: 'CRISM',
        abundanceLevel: 'ABUNDANT',
        scientificImplication: 'Definitive indicator of strongly acidic (pH < 4) oxidizing liquid water'
      }
    ],
    astrobiologyAssessment: {
      habitabilityGrade: 'B',
      preservationWindow: 'Burns cliff sulfate sandstone interbeds',
      taphonomyNotes:
        'Acidic environments restrict terrestrial-like biology, but acidophilic chemolithoautotrophs thrive in terrestrial jarosite analogs (Rio Tinto).',
      radiationDegradationDepthM: 1.4
    },
    geotechnicalProperties: {
      regolithBearingCapacityKPa: 95,
      soilInternalFrictionAngleDeg: 28.5,
      rockAbundancePercent: 3.2,
      wheelSlipHazardLevel: 'HIGH',
      meanThermalInertia: 220
    },
    pdsDataArchives: [
      {
        archiveId: 'MER1-M-MI-3-EDR-V1.0',
        instrument: 'Microscopic Imager',
        datasetTitle: 'Microscopic Imaging of Meridiani Planum Concretions and Sand Grains',
        pdsVolumeUrl: 'https://pds-imaging.jpl.nasa.gov/volumes/mer.html'
      }
    ]
  },
  {
    id: 'utopia-planitia',
    name: 'Utopia Planitia Ice Reservoir',
    formalDesignation: 'Northern Lowlands Subsurface Glacial Ice Sheet',
    center: { lat: 46.7, lon: 117.5, elevation: -4150 },
    defaultZoom: 9,
    geologicContext:
      'Extensive scalloped depressions indicating periglacial thermokarst. MRO SHARAD radar data mapped a 80-170 m thick subsurface pure water-ice deposit beneath 1-10 m of regolith.',
    historicMission: 'Viking 2 Lander & MRO SHARAD Subsurface Sounding',
    elevationMeters: -4150,
    keyScienceGoals: [
      'Direct extraction and ISRU processing of pure glacial water ice for rocket propellant and life support',
      'Drill core sampling for cryopreserved organic molecules and biosignatures',
      'Calibration of ground-penetrating radar soundings for human base establishment'
    ],
    startPoint: { lat: 46.6, lon: 117.3, elevation: -4160 },
    endPoint: { lat: 46.85, lon: 117.7, elevation: -4120 },
    chronostratigraphy: [
      {
        formationName: 'Scalloped Thermokarst Permafrost Mantle',
        epoch: 'Amazonian',
        ageGa: 0.1,
        lithology: 'Sublimation regolith lag over massive 85-98% pure glacial water ice',
        layerThicknessM: 140,
        depositionalEnvironment: 'High-obliquity orbital cycle snow accumulation and subsequent sublimation lag protection',
        sampleEvidence: 'SHARAD radar dielectric constant epsilon = 3.15 perfectly matching pure water ice'
      }
    ],
    crismMineralogy: [
      {
        name: 'Pure Subsurface Water Ice (H2O)',
        formula: 'H2O (Ice Ih)',
        spectralCategory: 'Phyllosilicates',
        instrument: 'CRISM',
        abundanceLevel: 'DOMINANT',
        scientificImplication: 'Equivalent volume to Lake Superior (~14,300 km³); premier Martian ISRU resource'
      }
    ],
    astrobiologyAssessment: {
      habitabilityGrade: 'A',
      preservationWindow: 'Perennial cryogenic ice sheet (-65°C to -115°C continuous refrigeration)',
      taphonomyNotes:
        'Deep ice cores can cryopreserve viable dormant spores, viral particles, and pristine ancient organic compounds without thermal degradation.',
      radiationDegradationDepthM: 3.5
    },
    geotechnicalProperties: {
      regolithBearingCapacityKPa: 280,
      soilInternalFrictionAngleDeg: 39.0,
      rockAbundancePercent: 4.0,
      wheelSlipHazardLevel: 'LOW',
      meanThermalInertia: 480
    },
    pdsDataArchives: [
      {
        archiveId: 'MRO-M-SHARAD-5-RADARGRAM-V1.0',
        instrument: 'SHARAD Shallow Radar',
        datasetTitle: 'MRO SHARAD Radargram Profile of Utopia Planitia Massive Ice Sheets',
        pdsVolumeUrl: 'https://pds-geosciences.wustl.edu/missions/mro/sharad.htm'
      }
    ]
  }
];
