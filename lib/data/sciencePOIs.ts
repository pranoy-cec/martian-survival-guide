import { SciencePOI } from '../types';

export const SCIENCE_POIS: SciencePOI[] = [
  // Jezero Crater (Perseverance & Ingenuity)
  {
    id: 'jezero-kodiak-butte',
    name: 'Kodiak Butte (Delta Remnant)',
    location: { lat: 18.4215, lon: 77.4280, elevation: -2535 },
    category: 'GEOLOGICAL_CONTACT',
    mission: 'Mars 2020 Perseverance',
    sol: 105,
    description: 'Isolated erosional hill west of the crater landing site displaying definitive Gilbert-type delta clinoforms (bottomset, topset, and steeply dipping foreset beds). Proves the existence of a perennial, sustained ancient lake system.',
    scientificSignificance: 'Establishes high-energy river discharge into a tranquil lake ~3.7 Ga. Key target to evaluate depositional dynamics and ancient lacustrine water levels.',
    geologicUnit: 'Hesperian Jezero Western Delta Front (Hjf)',
    mineralSignatures: ['Smectite clays', 'Iron/Magnesium Carbonates', 'Olivine-rich sandstones'],
    biosignaturePotential: 'HIGH',
    sampleRecommendation: 'Fine-grained bottomset mudstones for concentrated organic matter preservation.',
    nasaImage: {
      url: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24836.jpg',
      caption: 'SuperCam remote micro-imager view of Kodiak Butte showing distinct sedimentary delta beds.',
      credit: 'NASA/JPL-Caltech/LANL/CNES/CNRS',
      instrument: 'SuperCam RMI & Mastcam-Z'
    }
  },
  {
    id: 'jezero-skinner-ridge',
    name: 'Skinner Ridge (Delta Scarp)',
    location: { lat: 18.4412, lon: 77.4105, elevation: -2510 },
    category: 'BIOSIGNATURE_CANDIDATE',
    mission: 'Mars 2020 Perseverance',
    sol: 480,
    description: 'Prominent rock outcrop in the delta front where Perseverance collected core sample "Swift Run". Composed of fine-grained mudstones deposited in a low-energy environment ideal for trapping biosignatures.',
    scientificSignificance: 'Highest concentration of preserved organic aromatics detected by SHERLOC Raman and deep-UV fluorescence spectrometer.',
    geologicUnit: 'Shenandoah Formation, Jezero Delta (Hjs)',
    mineralSignatures: ['Magnesium Sulfate', 'Smectite Clay', 'Aromatic Hydrocarbon Residues'],
    biosignaturePotential: 'HIGH',
    sampleRecommendation: 'Sample sealed in return tube #12; prime candidate for Earth return examination.',
    nasaImage: {
      url: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25328.jpg',
      caption: 'Mastcam-Z enhanced color mosaic of Skinner Ridge rock face prior to abrasion.',
      credit: 'NASA/JPL-Caltech/ASU/MSSS',
      instrument: 'Mastcam-Z'
    }
  },
  {
    id: 'jezero-wildcat-ridge',
    name: 'Wildcat Ridge (Hydrated Sulfate Matrix)',
    location: { lat: 18.4398, lon: 77.4085, elevation: -2505 },
    category: 'MINERAL',
    mission: 'Mars 2020 Perseverance',
    sol: 504,
    description: 'Steep siltstone outcrop formed as mud settled in an evaporating lake. Abrasion target "Hazeltop" exposed a rich matrix of calcium and magnesium sulfates intergrown with iron oxides.',
    scientificSignificance: 'Sulfate evaporites crystallize rapidly, encapsulating organic molecules, microfossils, and fluid inclusions with minimal degradation.',
    geologicUnit: 'Shenandoah Formation (Hjs)',
    mineralSignatures: ['Anhydrite / Gypsum (CaSO4)', 'Jarosite', 'Fe-smectite', 'Carbonates'],
    biosignaturePotential: 'HIGH',
    sampleRecommendation: 'Essential evaporite core for isotopic sulfur-oxygen fractionation analysis.',
    nasaImage: {
      url: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25424.jpg',
      caption: 'SHERLOC WATSON close-up of Hazeltop abrasion patch showing sulfate veins and grains.',
      credit: 'NASA/JPL-Caltech',
      instrument: 'SHERLOC / WATSON'
    }
  },
  {
    id: 'jezero-seitah-dunes',
    name: 'Séítah Unit (Olivine-Cumulate Floor)',
    location: { lat: 18.3980, lon: 77.5250, elevation: -2570 },
    category: 'CRATER_RIM',
    mission: 'Mars 2020 Perseverance',
    sol: 215,
    description: 'Fractured, blocky igneous floor consisting of coarse-grained cumulate olivine and pyroxene with intercumulate carbonate cement. Traversing this area posed severe rover wheel entrapment hazards due to wind-blown megaripples.',
    scientificSignificance: 'Provides pristine radiometric crystallization ages for the Jezero impact basin floor and reveals extensive deep groundwater interaction.',
    geologicUnit: 'Noachian-Hesperian Floor Fractured Igneous (NHi)',
    mineralSignatures: ['Coarse Olivine (Fo55)', 'Augite', 'Siderite/Magnesite Carbonate'],
    biosignaturePotential: 'LOW',
    sampleRecommendation: 'Zircon and igneous mineral crystals for definitive uranium-lead radiometric dating.',
    nasaImage: {
      url: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24923.jpg',
      caption: 'Perseverance Mastcam-Z panorama of South Séítah layered olivine cumulates and sand ripples.',
      credit: 'NASA/JPL-Caltech/ASU',
      instrument: 'Mastcam-Z'
    }
  },
  {
    id: 'jezero-belva-crater',
    name: 'Belva Impact Crater (Sub-surface Window)',
    location: { lat: 18.4550, lon: 77.4420, elevation: -2470 },
    category: 'CRATER_RIM',
    mission: 'Mars 2020 Perseverance',
    sol: 745,
    description: 'Large 1 km wide impact crater excavated into the delta deposits. Steep crater walls provide a 3D cross-section into the underlying deltaic architecture and boulder conglomerates.',
    scientificSignificance: 'Reveals catastrophic flash-flood megaboulders (>2 m diameter) transported into Jezero during the late stage of delta evolution.',
    geologicUnit: 'Delta Conglomerate / Boulder Beds (Hjb)',
    mineralSignatures: ['Basaltic Andesite', 'Al-clays', 'Silica-rich chert clasts'],
    biosignaturePotential: 'MEDIUM',
    sampleRecommendation: 'Inspect boulder clasts sourced from the distant highlands outside Jezero.',
    nasaImage: {
      url: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25828.jpg',
      caption: 'Billion-pixel panorama of Belva Crater interior showing steeply tilted impact blocks.',
      credit: 'NASA/JPL-Caltech/ASU/MSSS',
      instrument: 'Mastcam-Z'
    }
  },

  // Gale Crater (Curiosity)
  {
    id: 'gale-yellowknife-bay',
    name: 'Yellowknife Bay (Sheepbed Mudstone)',
    location: { lat: -4.5910, lon: 137.4430, elevation: -4465 },
    category: 'BIOSIGNATURE_CANDIDATE',
    mission: 'Mars Science Laboratory Curiosity',
    sol: 182,
    description: 'Ancient freshwater lake bed where Curiosity discovered that Mars once had conditions capable of supporting microbial life (neutral pH, low salinity, key bio-essential elements: C, H, N, O, P, S).',
    scientificSignificance: 'First definitive proof of a habitable Martian environment. SAM instrument detected chlorinated hydrocarbons released upon thermal extraction.',
    geologicUnit: 'Sheepbed Member, Yellowknife Bay Formation',
    mineralSignatures: ['Ferrian Saponite (Smectite Clay)', 'Magnetite', 'Calcium Sulfate Veins'],
    biosignaturePotential: 'HIGH',
    sampleRecommendation: 'Fine-grained mudstone core for volatile preservation tests.',
    nasaImage: {
      url: 'https://photojournal.jpl.nasa.gov/jpeg/PIA16837.jpg',
      caption: 'Curiosity self-portrait at "John Klein" drill site in Yellowknife Bay.',
      credit: 'NASA/JPL-Caltech/MSSS',
      instrument: 'MAHLI'
    }
  },
  {
    id: 'gale-vera-rubin-ridge',
    name: 'Vera Rubin Ridge (Hematite Crest)',
    location: { lat: -4.6450, lon: 137.4020, elevation: -4180 },
    category: 'MINERAL',
    mission: 'Mars Science Laboratory Curiosity',
    sol: 1800,
    description: 'Erosional resistant ridge standing 200 m above surrounding terrain, enriched in crystalline gray and red hematite formed by groundwater redox reactions at the interface between distinct fluid bodies.',
    scientificSignificance: 'Reveals changing groundwater chemistry as ancient Gale Crater lakes dried up.',
    geologicUnit: 'Murray Formation Upper Member',
    mineralSignatures: ['Crystalline Hematite', 'Jarosite', 'Akaganeite'],
    biosignaturePotential: 'MEDIUM',
    sampleRecommendation: 'Sample hematite crystals to date iron-oxidizing fluid events.',
    nasaImage: {
      url: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22222.jpg',
      caption: 'Curiosity MAHLI image of iron-rich bedrock on the crest of Vera Rubin Ridge.',
      credit: 'NASA/JPL-Caltech/MSSS',
      instrument: 'MAHLI'
    }
  },
  {
    id: 'gale-sulfate-canyon',
    name: 'Mount Sharp Gediz Vallis Ridge',
    location: { lat: -4.6750, lon: 137.3850, elevation: -3950 },
    category: 'GEOLOGICAL_CONTACT',
    mission: 'Mars Science Laboratory Curiosity',
    sol: 3800,
    description: 'Steep debris channel filled with coarse boulders transported down Mount Sharp slopes by late-stage catastrophic debris flows, cutting through the sulfate-bearing unit.',
    scientificSignificance: 'Proves liquid water was active in Gale Crater much later than previously assumed, long after Mars transitioned into its cold, hyper-arid climate.',
    geologicUnit: 'Gediz Vallis Channel Fill (Agv)',
    mineralSignatures: ['Hydrated Magnesium Sulfates (Kieserite/Starkeyite)', 'Gypsum'],
    biosignaturePotential: 'MEDIUM',
    sampleRecommendation: 'Sample pristine boulder wash for preserved alpine hydrologic relics.',
    nasaImage: {
      url: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25980.jpg',
      caption: 'Curiosity Mastcam view of towering Gediz Vallis Ridge boulder deposit.',
      credit: 'NASA/JPL-Caltech/MSSS',
      instrument: 'Mastcam'
    }
  },

  // Utopia Planitia (Subsurface Pure Ice)
  {
    id: 'utopia-ice-lens',
    name: 'Utopia Pure Subsurface Glacial Ice Sheet',
    location: { lat: 46.720, lon: 117.520, elevation: -4150 },
    category: 'WATER_ICE',
    mission: 'MRO SHARAD / Viking 2 Ground Truth',
    sol: 1200,
    description: 'Extensive sheet of 50-85% pure water ice buried under only 1-10 meters of desiccated regolith, confirmed via SHARAD dielectric permittivity sounding (dielectric constant ~3.15).',
    scientificSignificance: 'Primary In-Situ Resource Utilization (ISRU) target for human Mars expeditions. Total estimated water volume exceeds 14,300 cubic kilometers (comparable to Lake Superior).',
    geologicUnit: 'Amazonian Utopia Scalloped Mantle (Aum)',
    mineralSignatures: ['Subsurface Water Ice (H2O)', 'Basaltic Regolith Overburden'],
    waterIceRelevance: 'Pure water ice accessible via shallow mechanical auger drilling (<3 m depth). Low salinity, optimal for human electrolysis and life-support purification.',
    biosignaturePotential: 'HIGH',
    sampleRecommendation: 'Cryogenic core extraction to search for dormant psychrophilic microbes.',
    nasaImage: {
      url: 'https://photojournal.jpl.nasa.gov/jpeg/PIA21133.jpg',
      caption: 'SHARAD radar radargram and HiRISE image showing scalloped periglacial depressions in Utopia Planitia.',
      credit: 'NASA/JPL-Caltech/Univ. of Rome/Univ. of Texas',
      instrument: 'MRO SHARAD & HiRISE'
    }
  },

  // Valles Marineris (Candor Chasma ILD)
  {
    id: 'candor-sulfate-stacks',
    name: 'Candor Chasma Interior Layered Deposits',
    location: { lat: -6.520, lon: 284.380, elevation: -3820 },
    category: 'MINERAL',
    mission: 'MRO CRISM / HiRISE',
    description: 'Spectacular multi-kilometer rhythmic beds of mono- and poly-hydrated sulfates (kieserite and epsomite) exposed along monumental 4 km tall layered mesas.',
    scientificSignificance: 'Represents one of the largest sulfate sinks in the solar system. Cyclic bedding provides an astronomical climate cycle record (obliquity variations).',
    geologicUnit: 'Hesperian Interior Layered Deposits (Hild)',
    mineralSignatures: ['Polyhydrated MgSO4', 'Kieserite', 'Jarosite', 'Hematite'],
    waterIceRelevance: 'Bound mineral crystal water represents 15-20% by mass of the rock matrix, extractable via low-temperature thermal processing (~250°C).',
    biosignaturePotential: 'MEDIUM',
    sampleRecommendation: 'Sample rhythmic dark and light layers to establish Martian orbital milankovitch pacing.',
    nasaImage: {
      url: 'https://photojournal.jpl.nasa.gov/jpeg/PIA17983.jpg',
      caption: 'HiRISE false-color image of rhythmic sulfate-rich layers in Candor Chasma.',
      credit: 'NASA/JPL-Caltech/Univ. of Arizona',
      instrument: 'HiRISE & CRISM'
    }
  },

  // Olympus Mons
  {
    id: 'olympus-lava-tube-skylight',
    name: 'Olympus Flank Lava Tube Skylight (Cave Entrance)',
    location: { lat: 18.680, lon: 226.230, elevation: 8490 },
    category: 'GEOLOGICAL_CONTACT',
    mission: 'Mars Odyssey THEMIS / MRO HiRISE',
    description: 'Sub-circular collapsed skylight ~120 m across leading into a massive subterranean volcanic lava tube conduit. Deep shadows indicate a floor depth >80 m.',
    scientificSignificance: 'Offers natural, complete radiation shielding against cosmic rays and solar energetic particles. Pristine interior insulated from Martian diurnal temperature extremes (-50°C year-round stable).',
    geologicUnit: 'Amazonian Basaltic Volcanic Flank (Aob)',
    mineralSignatures: ['Tholeiitic Basalt', 'Volcanic Glass', 'Subterranean Sulfate Condensates'],
    biosignaturePotential: 'HIGH',
    sampleRecommendation: 'Inspect cave floor speleothems and sheltered rock varnish for endolithic life.',
    nasaImage: {
      url: 'https://photojournal.jpl.nasa.gov/jpeg/PIA10006.jpg',
      caption: 'HiRISE high-resolution view of a deep volcanic skylight pit crater on the slopes of Olympus Mons.',
      credit: 'NASA/JPL-Caltech/Univ. of Arizona',
      instrument: 'HiRISE'
    }
  },

  // Meridiani Planum
  {
    id: 'meridiani-eagle-crater',
    name: 'Eagle Crater & Burns Cliff Outcrop',
    location: { lat: -0.191, lon: 354.471, elevation: -1405 },
    category: 'HISTORIC_LANDING_SITE',
    mission: 'Mars Exploration Rover Opportunity',
    sol: 1,
    description: 'Impact crater where Opportunity rover scored a "hole-in-one" landing, directly revealing sulfur-rich bedrock outcrops and spherical hematite concretions (Martian blueberries).',
    scientificSignificance: 'Confirmed that early Mars had wet, acidic groundwater that repeatedly saturated and evaporated across hundreds of square kilometers.',
    geologicUnit: 'Burns Formation Upper Evaporite Member',
    mineralSignatures: ['Hematite Blueberries', 'Jarosite', 'Magnesium Sulfate'],
    biosignaturePotential: 'MEDIUM',
    sampleRecommendation: 'In-situ examination of concentric crystalline growth layers in hematite concretions.',
    nasaImage: {
      url: 'https://photojournal.jpl.nasa.gov/jpeg/PIA05476.jpg',
      caption: 'Opportunity Microscopic Imager view of hematite spherules resting on sulfur-rich bedrock.',
      credit: 'NASA/JPL-Caltech/Cornell/USGS',
      instrument: 'Microscopic Imager'
    }
  }
];
