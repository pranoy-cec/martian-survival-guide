export interface NasaImageArchiveItem {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  center: string;
  rover: 'perseverance' | 'curiosity' | 'opportunity' | 'spirit' | 'mro' | 'insight';
  category:
    | 'Delta & Sediments'
    | 'Bedrock & Minerals'
    | 'Microscopic & Samples'
    | 'Atmosphere & Dust'
    | 'Hardware & Ingenuity'
    | 'Orbital & Basins';
  keywords: string[];
  imageUrl: string;
  sourceUrl: string;
  sol?: number;
  instrument?: string;
}

export const NASA_IMAGE_ARCHIVE: NasaImageArchiveItem[] = [
  // ═══════════════════════════════════════════════════════
  // CATEGORY: Delta & Sediments (12 unique entries)
  // ═══════════════════════════════════════════════════════
  {
    id: 'PIA24836',
    title: 'Perseverance SuperCam View of Kodiak Butte Delta Clinoforms',
    description:
      'High-resolution SuperCam telescopic view of Kodiak Butte remnant showing steeply dipping Gilbert-type delta clinoform beds. This geological feature definitively proved an ancient river debouched into a long-lived, standing body of water in Jezero Crater ~3.7 billion years ago.',
    dateCreated: '2021-10-07',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Delta & Sediments',
    keywords: ['Perseverance', 'Jezero', 'SuperCam', 'Delta', 'Kodiak Butte', 'Clinoforms', 'Sedimentology'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24836.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24836',
    sol: 75,
    instrument: 'SuperCam Remote Micro-Imager'
  },
  {
    id: 'PIA24487',
    title: 'Perseverance 360-Degree Landing Panorama at Van Zyl Overlook',
    description:
      'Full-circle high-resolution multispectral panorama acquired by Mastcam-Z from Van Zyl Overlook across the floor of Jezero Crater towards the 60-meter-tall delta scarp and distant crater rim.',
    dateCreated: '2021-03-05',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Delta & Sediments',
    keywords: ['Perseverance', 'Van Zyl Overlook', 'Panorama', 'Mastcam-Z', 'Jezero Scarp'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24487.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24487',
    sol: 15,
    instrument: 'Mastcam-Z'
  },
  {
    id: 'PIA24925',
    title: 'Belva Crater Impact Rim and Fluvial Conglomerate Boulders',
    description:
      'Perseverance mosaic of Belva Crater—a 0.9-kilometer-wide impact crater that punched into the delta fan, revealing dramatic tilted sedimentary cross-beds and meter-scale rounded boulders carried by raging floods.',
    dateCreated: '2022-04-22',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Delta & Sediments',
    keywords: ['Belva Crater', 'Conglomerate', 'Fluvial Boulders', 'Jezero Delta', 'Mastcam-Z'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24925.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24925',
    sol: 417,
    instrument: 'Mastcam-Z'
  },
  {
    id: 'PIA25287',
    title: 'Enchanted Lake Fine-Grained Lacustrine Mudstone Stratigraphy',
    description:
      'Perseverance Mastcam-Z perspective of Enchanted Lake outcrop at the base of the delta scarp. Thinly laminated horizontal mudstone layers indicate calm lacustrine deposition ideal for fossilizing micro-organisms.',
    dateCreated: '2022-05-18',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Delta & Sediments',
    keywords: ['Enchanted Lake', 'Laminated Mudstone', 'Delta Bottomsets', 'Jezero', 'Astrobiology'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25287.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25287',
    sol: 441,
    instrument: 'Mastcam-Z'
  },
  {
    id: 'PIA07997',
    title: 'Opportunity Victoria Crater Duck Bay Cliff Promontory',
    description:
      'Pancam panoramic mosaic looking across the 750-meter-wide Victoria Crater from Duck Bay, showcasing ancient cross-bedded sulfate dunes of the Burns Formation preserved in dramatic 70-meter cliffs.',
    dateCreated: '2006-10-06',
    center: 'JPL',
    rover: 'opportunity',
    category: 'Delta & Sediments',
    keywords: ['Victoria Crater', 'Duck Bay', 'Opportunity', 'Burns Formation', 'Pancam'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA07997.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA07997',
    sol: 952,
    instrument: 'Pancam'
  },
  {
    id: 'PIA04591',
    title: 'Opportunity Burns Cliff Spectacular Cross-Bedded Sandstone',
    description:
      'Opportunity Pancam mosaic of Burns Cliff inside Endurance Crater. The layered sulfate bedrock exhibits meter-scale festoon cross-bedding formed by migrating sand dunes in ancient groundwater-fed playas.',
    dateCreated: '2004-11-18',
    center: 'JPL',
    rover: 'opportunity',
    category: 'Delta & Sediments',
    keywords: ['Burns Cliff', 'Endurance Crater', 'Cross-Bedding', 'Opportunity', 'Pancam'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA04591.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA04591',
    sol: 287,
    instrument: 'Pancam'
  },
  {
    id: 'PIA03240',
    title: 'MRO HiRISE Ancient Inverted Meandering River Channels at Eberswalde',
    description:
      'HiRISE image of the Eberswalde Crater delta showing sinuous inverted river channels preserved as elevated ridges after wind deflated the softer surrounding crater sediments.',
    dateCreated: '2007-09-20',
    center: 'JPL',
    rover: 'mro',
    category: 'Delta & Sediments',
    keywords: ['Eberswalde', 'HiRISE', 'Inverted Channel', 'Fluvial Meander', 'MRO'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA03240.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA03240',
    instrument: 'MRO HiRISE'
  },
  {
    id: 'PIA25580',
    title: 'Jezero Delta Front Face Stacked Turbidite Sequences',
    description:
      'Mastcam-Z wide-field mosaic of the main delta front exposure, capturing stacked turbidite and traction current bedsets that record repeated episodic flood pulses entering an ancient lake some 3.6 billion years ago.',
    dateCreated: '2022-08-01',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Delta & Sediments',
    keywords: ['Jezero', 'Turbidite', 'Delta Front', 'Flood', 'Mastcam-Z', 'Stratigraphy'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25580.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25580',
    sol: 526,
    instrument: 'Mastcam-Z'
  },
  {
    id: 'PIA25757',
    title: 'Curvilinear Unit Pebble Conglomerate at Rocky Top Waypoint',
    description:
      'Close-up Mastcam-Z mosaic of rounded pebble conglomerate at Rocky Top — the distal fan-toe deposit of the Jezero delta system — implying high-energy stream transport of clasts across tens of kilometers.',
    dateCreated: '2023-01-30',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Delta & Sediments',
    keywords: ['Rocky Top', 'Conglomerate', 'Pebble', 'Curvilinear Unit', 'Jezero', 'Mastcam-Z'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25757.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25757',
    sol: 700,
    instrument: 'Mastcam-Z'
  },
  {
    id: 'PIA26274',
    title: 'Bright Angel Fine-Grained Layered Mudstone Outcrop',
    description:
      'Perseverance views bright light-toned laminated mudstones at the Bright Angel location near Neretva Vallis outlet channel. These fine sediments may preserve organic molecules and microbial biosignatures from an ancient Jezero lake.',
    dateCreated: '2024-05-10',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Delta & Sediments',
    keywords: ['Bright Angel', 'Mudstone', 'Laminated', 'Neretva Vallis', 'Jezero', 'Biosignatures'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA26274.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA26274',
    sol: 1143,
    instrument: 'Mastcam-Z'
  },
  {
    id: 'PIA22101',
    title: 'Curiosity Vera Rubin Ridge Sulfate-Clay Transition Zone',
    description:
      'Curiosity mosaic of the Vera Rubin Ridge/Glen Torridon transition—a critical stratigraphic boundary marking where ancient Mars shifted from a wetter clay-forming environment to an evaporitic sulfate-bearing one.',
    dateCreated: '2019-02-08',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Delta & Sediments',
    keywords: ['Vera Rubin Ridge', 'Sulfate', 'Clay', 'Transition Zone', 'Curiosity', 'Gale'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22101.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA22101',
    sol: 2302,
    instrument: 'Mastcam'
  },
  {
    id: 'PIA21718',
    title: 'Curiosity Naukluft Plateau Thin-Bedded Sandstone Pavement',
    description:
      'Curiosity looks across the Naukluft Plateau pavement—a wind-polished surface of thin-bedded sandstone recording ancient aeolian dune migration cycles on the lower slopes of Mount Sharp.',
    dateCreated: '2017-04-04',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Delta & Sediments',
    keywords: ['Naukluft Plateau', 'Sandstone', 'Aeolian', 'Mount Sharp', 'Curiosity'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA21718.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA21718',
    sol: 1668,
    instrument: 'Mastcam'
  },

  // ═══════════════════════════════════════════════════════
  // CATEGORY: Bedrock & Minerals (12 unique entries)
  // ═══════════════════════════════════════════════════════
  {
    id: 'PIA25424',
    title: 'Hazeltop Abrasion Patch Evaporite Sulfate Vein Networks',
    description:
      'WATSON microscopic close-up of the Hazeltop abrasion target in Wildcat Ridge. Interwoven white calcium sulfate veins cut across darker iron-bearing lacustrine mudstones, indicating late-stage diagenetic groundwater percolation.',
    dateCreated: '2022-09-12',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Bedrock & Minerals',
    keywords: ['SHERLOC', 'WATSON', 'Hazeltop', 'Sulfate', 'Veins', 'Wildcat Ridge', 'Jezero'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25424.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25424',
    sol: 556,
    instrument: 'SHERLOC WATSON Camera'
  },
  {
    id: 'PIA24483',
    title: 'SuperCam Laser Interrogation of Basalt Target Máaz',
    description:
      'First laser-induced breakdown spectroscopy (LIBS) target interrogated by SuperCam on Mars. The rock exhibits vesicular basaltic volcanic texture rich in iron and magnesium — a remnant of Jezero Crater\'s ancient volcanic floor.',
    dateCreated: '2021-03-10',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Bedrock & Minerals',
    keywords: ['SuperCam', 'Máaz', 'LIBS', 'Laser', 'Basalt', 'Perseverance'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24483.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24483',
    sol: 21,
    instrument: 'SuperCam LIBS'
  },
  {
    id: 'PIA16453',
    title: 'Curiosity ChemCam Laser Pits on Coronation Rock',
    description:
      'ChemCam Remote Micro-Imager close-up showing tiny pits blasted by laser pulses into basaltic rock target Coronation to vaporize mineral samples and analyze atomic emission spectra.',
    dateCreated: '2012-08-19',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Bedrock & Minerals',
    keywords: ['ChemCam', 'Coronation', 'Laser Spectroscopy', 'LIBS', 'Curiosity'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA16453.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA16453',
    sol: 13,
    instrument: 'ChemCam RMI'
  },
  {
    id: 'PIA19920',
    title: 'Curiosity Drilling at Buckskin Target in Marias Pass',
    description:
      'Self-portrait of Curiosity drilling at the Buckskin rock target in Marias Pass. CheMin X-ray diffraction revealed an unexpected high concentration of tridymite silica polymorphs, indicating explosive volcanism in Gale Crater\'s past.',
    dateCreated: '2015-08-05',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Bedrock & Minerals',
    keywords: ['Curiosity', 'Buckskin', 'Marias Pass', 'Tridymite', 'Silica', 'MAHLI'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA19920.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA19920',
    sol: 1065,
    instrument: 'MAHLI'
  },
  {
    id: 'PIA22228',
    title: 'Vera Rubin Ridge Laminated Red Hematite Escarpment',
    description:
      'Curiosity perspective of Vera Rubin Ridge showing fractured resistant bedrock beds rich in gray and red crystalline hematite. The ridge resisted billions of years of wind erosion due to iron mineral cementation.',
    dateCreated: '2018-01-23',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Bedrock & Minerals',
    keywords: ['Vera Rubin Ridge', 'Hematite', 'Iron Oxide', 'Mount Sharp', 'Curiosity'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22228.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA22228',
    sol: 1943,
    instrument: 'Mastcam'
  },
  {
    id: 'PIA10214',
    title: 'Spirit Wheel Trench Reveals 90% Pure Hydrothermal Silica',
    description:
      'Spirit\'s stuck right-front wheel dragged open a trench at Home Plate in Gusev Crater, churning up bright white soil consisting of 90% pure amorphous opaline silica, indicating ancient hot volcanic springs.',
    dateCreated: '2007-12-10',
    center: 'JPL',
    rover: 'spirit',
    category: 'Bedrock & Minerals',
    keywords: ['Spirit', 'Home Plate', 'Silica', 'Hydrothermal', 'Gusev Crater', 'Pancam'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA10214.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA10214',
    sol: 1150,
    instrument: 'Pancam'
  },
  {
    id: 'PIA13593',
    title: 'Opportunity Santa Maria Crater Rim Hydrated Sulfate Blocks',
    description:
      'Pancam false-color view of blocky ejecta on the rim of 90-meter Santa Maria Crater. CRISM orbital spectra and ground-truth Pancam surveys detected hydrated magnesium and ferric sulfates freshly excavated by impact.',
    dateCreated: '2011-01-19',
    center: 'JPL',
    rover: 'opportunity',
    category: 'Bedrock & Minerals',
    keywords: ['Santa Maria Crater', 'Hydrated Sulfates', 'Opportunity', 'Ejecta', 'Pancam'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA13593.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA13593',
    sol: 2465,
    instrument: 'Pancam'
  },
  {
    id: 'PIA25625',
    title: 'Perseverance Wildcat Ridge Carbonate-Rich Vein Exposure',
    description:
      'Mastcam-Z image of bright magnesium carbonate veins cutting across dark olivine-bearing basalt at Wildcat Ridge. PIXL X-ray fluorescence confirmed elevated Mg and Ca, suggesting ancient hydrothermal fluid flow.',
    dateCreated: '2022-10-01',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Bedrock & Minerals',
    keywords: ['Wildcat Ridge', 'Carbonate', 'Olivine', 'PIXL', 'Basalt', 'Jezero'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25625.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25625',
    sol: 586,
    instrument: 'PIXL Micro X-ray Fluorescence'
  },
  {
    id: 'PIA24048',
    title: 'Curiosity Murray Formation Sulfate-Bearing Nodular Concretions',
    description:
      'Curiosity MAHLI close-up of resistant pale concretions weathering out of the Murray mudstone formation on the Greenheugh Pediment. CheMin identified the spheroids as calcium sulfate (gypsum) precipitated from groundwater.',
    dateCreated: '2020-03-21',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Bedrock & Minerals',
    keywords: ['Murray Formation', 'Concretions', 'Sulfate', 'Gypsum', 'Curiosity', 'MAHLI'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24048.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24048',
    sol: 2718,
    instrument: 'MAHLI'
  },
  {
    id: 'PIA26069',
    title: 'Perseverance Thorofare Ridge Hexagonal Polygonal Fracture Terrain',
    description:
      'Mastcam-Z mosaic of polygonal fracture networks on the Thorofare Ridge outcrop. These desiccation-crack polygons formed as ancient lake-bottom muds dried and cracked, potentially trapping biosignatures at the polygon margins.',
    dateCreated: '2023-08-04',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Bedrock & Minerals',
    keywords: ['Thorofare Ridge', 'Polygon Fractures', 'Desiccation Cracks', 'Biosignatures', 'Jezero'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA26069.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA26069',
    sol: 892,
    instrument: 'Mastcam-Z'
  },
  {
    id: 'PIA21254',
    title: 'Curiosity Silica-Rich Opaline White Rocks at Mast Point',
    description:
      'Curiosity ChemCam passive spectral survey of bright silica-rich float rocks near Mast Point. High SiO2 concentrations match a hydrothermal spring environment similar to Yellowstone\'s hot pools.',
    dateCreated: '2016-11-06',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Bedrock & Minerals',
    keywords: ['Silica', 'Opaline', 'ChemCam', 'Hydrothermal', 'Mast Point', 'Curiosity'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA21254.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA21254',
    sol: 1510,
    instrument: 'ChemCam RMI'
  },
  {
    id: 'PIA25421',
    title: 'Perseverance PIXL Closeup of Yori Pass Sulfate Mineral Veins',
    description:
      'PIXL micro-X-ray fluorescence chemical map of the Yori Pass abrasion patch, revealing sub-millimeter-scale intergrowths of calcium and magnesium sulfate minerals precipitated from warm brines in fractured Jezero mudstone.',
    dateCreated: '2022-09-07',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Bedrock & Minerals',
    keywords: ['PIXL', 'Yori Pass', 'Sulfate', 'Chemical Map', 'Jezero', 'Brines'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25421.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25421',
    sol: 553,
    instrument: 'PIXL'
  },

  // ═══════════════════════════════════════════════════════
  // CATEGORY: Microscopic & Samples (10 unique entries)
  // ═══════════════════════════════════════════════════════
  {
    id: 'PIA25328',
    title: 'Skinner Ridge Abrasion Patch and Organic Detection Target',
    description:
      'Fine-grained lacustrine mudstone rock face of the Shenandoah Formation at Skinner Ridge prior to core drilling. SHERLOC deep-UV Raman spectroscopy detected concentrated organic carbon aromatics correlated with sulfate mineral veins.',
    dateCreated: '2022-07-15',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Microscopic & Samples',
    keywords: ['Perseverance', 'Mastcam-Z', 'Skinner Ridge', 'Astrobiology', 'Organics', 'Shenandoah'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25328.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25328',
    sol: 498,
    instrument: 'Mastcam-Z'
  },
  {
    id: 'PIA24850',
    title: 'Perseverance First Core Sample Montdenier Sealed in Sample Tube',
    description:
      'Perseverance CacheCam inspection view inside the rover belly showing the Montdenier rock core securely captured inside titanium sample tube serial #220. The core was drilled from the olivine-bearing basaltic floor of Jezero Crater.',
    dateCreated: '2021-09-08',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Microscopic & Samples',
    keywords: ['Perseverance', 'Montdenier', 'Sample Return', 'CacheCam', 'Tube 220', 'Igneous'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24850.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24850',
    sol: 196,
    instrument: 'CacheCam System'
  },
  {
    id: 'PIA16837',
    title: 'Curiosity Self-Portrait at John Klein Mudstone Drill Site',
    description:
      'Full self-portrait of the Curiosity Mars rover at the John Klein drill site in Yellowknife Bay, Gale Crater. Powder drilled from Sheepbed mudstone contained key elements of life (CHNOPS) and proved ancient Mars was habitable.',
    dateCreated: '2013-05-10',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Microscopic & Samples',
    keywords: ['Curiosity', 'John Klein', 'Yellowknife Bay', 'Habitability', 'MAHLI', 'Gale'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA16837.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA16837',
    sol: 270,
    instrument: 'MAHLI Hand Lens Imager'
  },
  {
    id: 'PIA23267',
    title: 'Curiosity Self-Portrait at Glen Etive in Clay-Bearing Unit',
    description:
      'Curiosity 360-degree selfie at the Glen Etive drill site in Glen Torridon. This sector demonstrated the highest concentration of phyllosilicate smectite clays ever encountered by any surface rover on Mars.',
    dateCreated: '2019-10-25',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Microscopic & Samples',
    keywords: ['Glen Etive', 'Glen Torridon', 'Smectite Clays', 'Curiosity', 'MAHLI'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA23267.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA23267',
    sol: 2553,
    instrument: 'MAHLI Hand Lens Imager'
  },
  {
    id: 'PIA05541',
    title: 'Opportunity Discovery of Hematite Blueberries at Eagle Crater',
    description:
      'Microscopic Imager view of millimeter-sized spherical hematite concretions (dubbed "blueberries") peppering the sulfate bedrock of Eagle Crater, Meridiani Planum. Concretions grew inside liquid water-soaked sediment.',
    dateCreated: '2004-03-03',
    center: 'JPL',
    rover: 'opportunity',
    category: 'Microscopic & Samples',
    keywords: ['Opportunity', 'Blueberries', 'Hematite', 'Eagle Crater', 'Microscopic Imager'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA05541.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA05541',
    sol: 38,
    instrument: 'Microscopic Imager'
  },
  {
    id: 'PIA25769',
    title: 'Perseverance SHERLOC UV Raman Spectrum Organic Compounds',
    description:
      'False-color SHERLOC deep-UV fluorescence map of the Yori Pass sample target reveals bright aromatic organic compound hotspots co-located with sulfate-rich mineral veins, the strongest organic detection to date on Mars.',
    dateCreated: '2023-02-11',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Microscopic & Samples',
    keywords: ['SHERLOC', 'Raman', 'Organics', 'Fluorescence', 'Yori Pass', 'Astrobiology'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25769.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25769',
    sol: 715,
    instrument: 'SHERLOC UV Raman'
  },
  {
    id: 'PIA25684',
    title: 'Perseverance Deposits First Sample Return Tube at Three Forks',
    description:
      'Historic drop of sample tube Malay at the Three Forks sample depot on the Jezero delta floor. This depot serves as a primary backup repository for the NASA-ESA Mars Sample Return campaign, with 10 tubes strategically cached.',
    dateCreated: '2022-12-21',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Microscopic & Samples',
    keywords: ['Three Forks', 'Sample Depot', 'Sample Return', 'Malay', 'WATSON'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25684.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25684',
    sol: 653,
    instrument: 'Navcam & WATSON'
  },
  {
    id: 'PIA26092',
    title: 'Perseverance Sample Tube Merak Chalcedony-Bearing Carbonate',
    description:
      'CacheCam view of the Merak sample tube interior after core extraction at the Otis Peak target. SHERLOC detected carbonate and chalcedony in this ancient igneous sample, hinting at low-temperature fluid alteration.',
    dateCreated: '2023-09-05',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Microscopic & Samples',
    keywords: ['Merak', 'Sample Tube', 'Chalcedony', 'Carbonate', 'CacheCam', 'Igneous'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA26092.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA26092',
    sol: 924,
    instrument: 'CacheCam'
  },
  {
    id: 'PIA22694',
    title: 'Curiosity MAHLI View of Confident Hills Drill Powder',
    description:
      'MAHLI hand lens imager captures pale gray drill powder produced from Confident Hills in the Murray formation. CheMin analysis of this powder detected jarosite and hematite — minerals that form in acidic water.',
    dateCreated: '2018-05-18',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Microscopic & Samples',
    keywords: ['Confident Hills', 'Drill Powder', 'Jarosite', 'Hematite', 'CheMin', 'MAHLI'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22694.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA22694',
    sol: 2070,
    instrument: 'MAHLI'
  },
  {
    id: 'PIA09920',
    title: 'Opportunity CRISM-Coordinated Ground Truth Mineral Spectra',
    description:
      'Opportunity Pancam false-color close-up of layered sulfate-rich outcrop at Cape Victoria inside Victoria Crater. This exposure provided critical ground truth for correlating the CRISM orbital mineral mapping with surface observations.',
    dateCreated: '2008-04-16',
    center: 'JPL',
    rover: 'opportunity',
    category: 'Microscopic & Samples',
    keywords: ['Cape Victoria', 'CRISM', 'Ground Truth', 'Sulfate', 'Victoria Crater', 'Opportunity'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA09920.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA09920',
    sol: 1486,
    instrument: 'Pancam'
  },

  // ═══════════════════════════════════════════════════════
  // CATEGORY: Atmosphere & Dust (10 unique entries)
  // ═══════════════════════════════════════════════════════
  {
    id: 'PIA17931',
    title: 'Curiosity Crosses Dingo Gap Sand Dune into Moonlight Valley',
    description:
      'Curiosity front hazard avoidance camera view as the 1-ton rover crested the 1-meter-tall Dingo Gap sand dune, charting a safe traverse route into the smooth valley beyond.',
    dateCreated: '2014-02-06',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Atmosphere & Dust',
    keywords: ['Dingo Gap', 'Dune Traverse', 'Curiosity', 'Hazcam', 'Gale'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA17931.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA17931',
    sol: 535,
    instrument: 'Front Hazcam'
  },
  {
    id: 'PIA20316',
    title: 'Namib Sand Dune Dark Basaltic Ripples in Bagnold Field',
    description:
      'Curiosity Mastcam view of the 5-meter-tall Namib Dune slip face in the Bagnold Dune Field. Active eolian grain saltation creates giant meter-scale dark sand ripples unique to the thin Martian atmosphere.',
    dateCreated: '2015-12-18',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Atmosphere & Dust',
    keywords: ['Bagnold Dunes', 'Namib Dune', 'Sand Ripples', 'Eolian', 'Curiosity'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA20316.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA20316',
    sol: 1192,
    instrument: 'Mastcam-100'
  },
  {
    id: 'PIA19808',
    title: 'MRO HiRISE Recurring Slope Lineae Active Dark Streaks',
    description:
      'HiRISE monitoring of steep warm-season slopes in Garni Crater. Dark narrow streaks (RSL) grow downslope during warmest seasons, suggesting hydrated perchlorate brine seepage triggered by seasonal temperature cycles.',
    dateCreated: '2015-09-28',
    center: 'JPL',
    rover: 'mro',
    category: 'Atmosphere & Dust',
    keywords: ['RSL', 'Recurring Slope Lineae', 'HiRISE', 'Brine', 'Water', 'MRO'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA19808.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA19808',
    instrument: 'MRO HiRISE'
  },
  {
    id: 'PIA24111',
    title: 'Curiosity Dust Devil Vortex Crossing Gale Crater Floor',
    description:
      'Curiosity Navcam sequence catches a towering dust devil vortex drifting across the flat crater floor near Gale basin center. REMS meteorological sensors measured a 4 Pa pressure drop as the vortex passed within 100 meters.',
    dateCreated: '2020-07-21',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Atmosphere & Dust',
    keywords: ['Dust Devil', 'Vortex', 'REMS', 'Gale Crater', 'Navcam', 'Meteorology'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24111.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24111',
    sol: 2847,
    instrument: 'Navcam'
  },
  {
    id: 'PIA24681-meda',
    title: 'Perseverance MEDA Meteorology First Day Atmospheric Measurements',
    description:
      'Perseverance onboard MEDA weather station recorded the first full sol of atmospheric data: temperature −17°C to −79°C, wind speeds up to 7 m/s, and UV radiation flux — vital for crew life-support planning.',
    dateCreated: '2021-02-23',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Atmosphere & Dust',
    keywords: ['MEDA', 'Meteorology', 'Temperature', 'Wind', 'UV Radiation', 'Jezero'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24681.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24681',
    sol: 5,
    instrument: 'MEDA Weather Station'
  },
  {
    id: 'PIA22222',
    title: 'Mars 2018 Global Dust Storm from MRO MARCI Camera',
    description:
      'MRO MARCI wide-angle camera global map composite during the 2018 planet-encircling dust event (PEDE) that ended the Opportunity rover mission. Total optical depth exceeded tau 8.0, cutting solar power to near zero.',
    dateCreated: '2018-07-01',
    center: 'JPL',
    rover: 'mro',
    category: 'Atmosphere & Dust',
    keywords: ['Global Dust Storm', 'PEDE', 'MARCI', 'MRO', 'Opportunity', 'Optical Depth'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22222.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA22222',
    instrument: 'MARCI Wide-Angle Camera'
  },
  {
    id: 'PIA25969',
    title: 'Perseverance MEDA RDS Dust Particle Size Distribution Sol 450',
    description:
      'MEDA Radiation and Dust Sensor (RDS) composite sky image showing the angular distribution of suspended aerosols during a moderate regional dust storm. Dust optical depth 0.72 — a critical parameter for Mars power budgets.',
    dateCreated: '2022-07-01',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Atmosphere & Dust',
    keywords: ['MEDA RDS', 'Aerosol', 'Dust Storm', 'Optical Depth', 'Perseverance', 'Power Budget'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25969.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25969',
    sol: 450,
    instrument: 'MEDA RDS'
  },
  {
    id: 'PIA21146',
    title: 'Curiosity Sunrise View of Dust-Laden Martian Sky at Murray Buttes',
    description:
      'Curiosity Mastcam color panorama of Martian sunrise over Murray Buttes, showing characteristic pinkish-tan dust-scattering atmosphere. The Sun appears roughly 70% the size as seen from Earth at this solar longitude.',
    dateCreated: '2016-09-10',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Atmosphere & Dust',
    keywords: ['Murray Buttes', 'Sunrise', 'Dust Scattering', 'Atmosphere', 'Curiosity'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA21146.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA21146',
    sol: 1454,
    instrument: 'Mastcam'
  },
  {
    id: 'PIA24681',
    title: 'Perseverance MOXIE Oxygen Production First Run on Mars',
    description:
      'Engineers monitor the first successful run of MOXIE (Mars Oxygen In-Situ Resource Utilization Experiment) aboard Perseverance, which produced 5.4 grams of oxygen from Martian CO₂ atmosphere — equivalent to 10 minutes of breathable air.',
    dateCreated: '2021-04-22',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Atmosphere & Dust',
    keywords: ['MOXIE', 'Oxygen', 'ISRU', 'CO2', 'Life Support', 'Perseverance'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24681.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24681',
    sol: 60,
    instrument: 'MOXIE Instrument'
  },
  {
    id: 'PIA18077',
    title: 'Curiosity REMS Wind Sensor Booms on Mast',
    description:
      'Mastcam close-up of Curiosity\'s meteorological mast showing the REMS (Rover Environmental Monitoring Station) wind sensor booms, humidity sensor, and UV photodiodes that have recorded over 4,000 sols of Martian atmospheric data.',
    dateCreated: '2014-07-05',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Atmosphere & Dust',
    keywords: ['REMS', 'Wind Sensor', 'Meteorology', 'Humidity', 'UV', 'Curiosity'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA18077.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA18077',
    sol: 672,
    instrument: 'Mastcam'
  },

  // ═══════════════════════════════════════════════════════
  // CATEGORY: Hardware & Ingenuity (11 unique entries)
  // ═══════════════════════════════════════════════════════
  {
    id: 'PIA24653',
    title: 'Ingenuity Mars Helicopter First Historic Powered Flight on Mars',
    description:
      'Perseverance Mastcam-Z captured the Ingenuity Mars Helicopter hovering 3 meters above Wright Brothers Field on Sol 58. This marked humanity\'s first powered, controlled flight on another planet, opening aerial planetary exploration.',
    dateCreated: '2021-04-19',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Hardware & Ingenuity',
    keywords: ['Ingenuity', 'Helicopter', 'Flight 1', 'Perseverance', 'Aeronautics', 'Jezero'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24653.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24653',
    sol: 58,
    instrument: 'Mastcam-Z Stereo Pair'
  },
  {
    id: 'PIA24479',
    title: 'Perseverance Descent Stage Sky Crane Terminal Maneuver',
    description:
      'Dramatic view captured by cameras aboard the Descent Stage rocket backpack looking down on Perseverance suspended by 21-foot nylon bridles moments before touchdown in Jezero Crater on February 18, 2021.',
    dateCreated: '2021-02-19',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Hardware & Ingenuity',
    keywords: ['Sky Crane', 'Landing', 'EDL', 'Touchdown', 'Perseverance', 'Jezero'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24479.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24479',
    sol: 0,
    instrument: 'EDL Descent Stage Downlooker'
  },
  {
    id: 'PIA25018',
    title: 'Ingenuity Flight 25 Record-Breaking 704-Meter Scout Traverse',
    description:
      'Ingenuity color navigation camera snapshot looking down at the rugged fractured crater floor terrain during its record-shattering 704-meter flight scouting traverse routes for Perseverance.',
    dateCreated: '2022-04-18',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Hardware & Ingenuity',
    keywords: ['Ingenuity', 'Flight 25', 'Aerial Scout', 'RTE Camera', 'Séítah'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25018.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25018',
    sol: 412,
    instrument: 'Ingenuity Color RTE Camera'
  },
  {
    id: 'PIA22330',
    title: 'NASA InSight Lander First Pristine Color Panorama on Elysium Planitia',
    description:
      'Instrument Deployment Camera (IDC) color mosaic from NASA InSight lander on Elysium Planitia, showing the ultra-flat volcanic sand plain where SEIS measured over 1,300 marsquakes spanning a 4-year mission.',
    dateCreated: '2018-12-07',
    center: 'JPL',
    rover: 'insight',
    category: 'Hardware & Ingenuity',
    keywords: ['InSight', 'Elysium Planitia', 'Seismometer', 'SEIS', 'IDC Camera'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22330.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA22330',
    sol: 10,
    instrument: 'Instrument Deployment Camera'
  },
  {
    id: 'PIA23962',
    title: 'NASA Mars 2020 Perseverance Mission Atlas V Launch',
    description:
      'United Launch Alliance Atlas V 541 rocket lifts off from Space Launch Complex 41 at Cape Canaveral carrying the Perseverance rover and Ingenuity helicopter towards their Jezero Crater destination.',
    dateCreated: '2020-07-30',
    center: 'KSC',
    rover: 'perseverance',
    category: 'Hardware & Ingenuity',
    keywords: ['Launch', 'Atlas V', 'Cape Canaveral', 'Mars 2020', 'Perseverance'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA23962.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA23962',
    instrument: 'KSC Launch Imagery'
  },
  {
    id: 'PIA25547',
    title: 'Ingenuity Sol 621 High-Altitude Recon Flight 48 Selfie',
    description:
      'Ingenuity\'s downward-facing navigation camera selfie taken at peak altitude during Flight 48, showing the helicopter\'s shadow on the Jezero crater floor during a long-duration reconnaissance sortie over Belva Crater.',
    dateCreated: '2022-11-18',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Hardware & Ingenuity',
    keywords: ['Ingenuity', 'Flight 48', 'High Altitude', 'NavCam', 'Belva Crater'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25547.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25547',
    sol: 621,
    instrument: 'Ingenuity Navigation Camera'
  },
  {
    id: 'PIA24926',
    title: 'Perseverance PIXL Instrument Arm Deployment at Citadelle',
    description:
      'Mastcam-Z image of Perseverance\'s 2.1-meter robotic arm fully extended with the PIXL turret pressed against the Citadelle outcrop for micro X-ray fluorescence element mapping at sub-millimeter spatial resolution.',
    dateCreated: '2022-04-27',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Hardware & Ingenuity',
    keywords: ['PIXL', 'Robotic Arm', 'Turret', 'Citadelle', 'Instrument Deployment'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24926.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24926',
    sol: 419,
    instrument: 'Mastcam-Z'
  },
  {
    id: 'PIA24524',
    title: 'Perseverance Full Body Self-Portrait at Rochette Drill Site',
    description:
      'Composite 62-image WATSON self-portrait of the Perseverance rover at the Rochette drill site showing both successfully cored bore holes. The orange and gray dust patterns on the rover deck reveal months of Martian weathering.',
    dateCreated: '2021-09-26',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Hardware & Ingenuity',
    keywords: ['Perseverance', 'Selfie', 'Rochette', 'Drill', 'WATSON', 'Self-Portrait'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24524.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24524',
    sol: 216,
    instrument: 'SHERLOC WATSON Camera'
  },
  {
    id: 'PIA23764',
    title: 'InSight SEIS Seismometer Dome Deployed on Mars',
    description:
      'InSight Instrument Deployment Camera image of the Wind and Thermal Shield (WTS) dome fully deployed over the SEIS seismometer, protecting it from wind and temperature swings that would mask faint marsquake signals.',
    dateCreated: '2019-02-02',
    center: 'JPL',
    rover: 'insight',
    category: 'Hardware & Ingenuity',
    keywords: ['InSight', 'SEIS', 'Wind Shield', 'Seismometer', 'Marsquake', 'Deployment'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA23764.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA23764',
    sol: 66,
    instrument: 'Instrument Deployment Camera'
  },
  {
    id: 'PIA09930',
    title: 'Curiosity ChemCam Mast Unit and Remote Micro-Imager Assembled',
    description:
      'Pre-launch laboratory image of Curiosity\'s ChemCam mast unit showing the telescope-laser assembly and 4.5-cm aperture Remote Micro-Imager. At full power the 1067-nm IR laser vaporizes rock targets at up to 7 meters range.',
    dateCreated: '2011-03-15',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Hardware & Ingenuity',
    keywords: ['ChemCam', 'Laser', 'Remote Micro-Imager', 'Assembly', 'Curiosity', 'JPL'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA09930.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA09930',
    instrument: 'ChemCam Pre-launch'
  },
  {
    id: 'PIA25290',
    title: 'Perseverance Abrading Rock Surface with Drill Bit',
    description:
      'Navcam time-lapse still of Perseverance\'s rotary-percussive drill grinding a 5-cm abraded patch into Jezero delta mudstone, exposing unweathered interior mineral chemistry for SHERLOC and PIXL analysis.',
    dateCreated: '2022-06-01',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Hardware & Ingenuity',
    keywords: ['Drill', 'Abrasion', 'Rotary Percussive', 'Navcam', 'Jezero', 'Instrument'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25290.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25290',
    sol: 462,
    instrument: 'Navcam'
  },

  // ═══════════════════════════════════════════════════════
  // CATEGORY: Orbital & Basins (10 unique entries)
  // ═══════════════════════════════════════════════════════
  {
    id: 'PIA00407',
    title: 'Valles Marineris Grand Canyon of Mars Global Orbital Mosaic',
    description:
      'Viking Orbiter global mosaic of the 4,000-kilometer-long Valles Marineris canyon system, slicing across a fifth of Mars\' circumference and plunging down to 9 kilometers deep — the largest known tectonic rift valley in the solar system.',
    dateCreated: '1998-04-14',
    center: 'JPL',
    rover: 'mro',
    category: 'Orbital & Basins',
    keywords: ['Valles Marineris', 'Grand Canyon', 'Tectonic Chasma', 'Candor', 'Viking'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA00407.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA00407',
    instrument: 'Viking Orbiter Camera'
  },
  {
    id: 'PIA01466',
    title: 'Olympus Mons Summit Caldera Complex and Basal Scarp',
    description:
      'Digital elevation mosaic of Olympus Mons, the largest volcano in the solar system, towering 22 kilometers high with a 80-kilometer summit caldera and 6-kilometer vertical basal cliffs surrounding its 600-km-wide base.',
    dateCreated: '1999-06-22',
    center: 'JPL',
    rover: 'mro',
    category: 'Orbital & Basins',
    keywords: ['Olympus Mons', 'Caldera', 'Shield Volcano', 'Tharsis', 'MGS MOLA'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA01466.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA01466',
    instrument: 'MGS MOLA & Viking'
  },
  {
    id: 'PIA16225',
    title: 'Curiosity First 360-Degree Panorama of Gale Crater and Mount Sharp',
    description:
      'Curiosity first color 360-degree cylindrical panorama of Gale Crater floor looking south towards the 5.5-kilometer-tall layered peak of Aeolis Mons (Mount Sharp), which records 3+ billion years of Mars climate change.',
    dateCreated: '2012-08-09',
    center: 'JPL',
    rover: 'curiosity',
    category: 'Orbital & Basins',
    keywords: ['Curiosity', 'Mount Sharp', 'Aeolis Mons', 'Gale Crater', 'Mastcam'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA16225.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA16225',
    sol: 3,
    instrument: 'Mastcam'
  },
  {
    id: 'PIA13146',
    title: 'Spirit Columbia Hills Hydrothermal Sinter Landscape',
    description:
      'Spirit panoramic perspective from Husband Hill overlooking the inner basin of Gusev Crater. Ancient Noachian volcanic basement outcrops reveal extensive hydrothermal fumarole alteration that could have supported chemotrophic life.',
    dateCreated: '2005-08-25',
    center: 'JPL',
    rover: 'spirit',
    category: 'Orbital & Basins',
    keywords: ['Columbia Hills', 'Husband Hill', 'Spirit', 'Gusev', 'Pancam'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA13146.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA13146',
    sol: 582,
    instrument: 'Pancam'
  },
  {
    id: 'PIA22924',
    title: 'MRO CRISM False-Color Phyllosilicate Map of Mawrth Vallis',
    description:
      'MRO CRISM near-infrared spectral composite of Mawrth Vallis, the most ancient (Phyllosian-era) clay-rich valley on Mars. Bright colors indicate Fe/Mg smectite clays that formed in neutral pH water over 4 billion years ago.',
    dateCreated: '2018-04-05',
    center: 'JPL',
    rover: 'mro',
    category: 'Orbital & Basins',
    keywords: ['Mawrth Vallis', 'CRISM', 'Phyllosilicate', 'Clay Minerals', 'MRO', 'Noachian'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22924.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA22924',
    instrument: 'MRO CRISM'
  },
  {
    id: 'PIA21715',
    title: 'MRO HiRISE Jezero Crater Delta Fan True-Color',
    description:
      'HiRISE color image of the fan-shaped sedimentary delta of Jezero Crater from orbit, revealing the multi-lobed fluvial delta system and the ancient shoreline of a lake that once held as much water as Lake Tahoe.',
    dateCreated: '2017-05-21',
    center: 'JPL',
    rover: 'mro',
    category: 'Orbital & Basins',
    keywords: ['Jezero', 'Delta Fan', 'HiRISE', 'Lake Shoreline', 'MRO', 'Color'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA21715.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA21715',
    instrument: 'MRO HiRISE'
  },
  {
    id: 'PIA23498',
    title: 'MRO Context Camera Global Map of Mars Polar Layered Deposits',
    description:
      'CTX global mosaic of the north polar layered deposits (NPLD), a stack of water ice and dust layers that records 5 million years of Martian climate oscillations driven by obliquity cycles — Mars\' own ice core record.',
    dateCreated: '2019-07-10',
    center: 'JPL',
    rover: 'mro',
    category: 'Orbital & Basins',
    keywords: ['Polar Layered Deposits', 'CTX', 'Ice Cap', 'Climate Record', 'NPLD', 'MRO'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA23498.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA23498',
    instrument: 'MRO CTX'
  },
  {
    id: 'PIA25703',
    title: 'MRO HiRISE Hellas Basin Ice-Filled Craters in Winter',
    description:
      'HiRISE color mosaic of the floor of 2,300-km-wide Hellas Basin—the deepest impact basin on Mars—during southern winter. Dark CO₂ frost spots and bright water-ice rings decorate kilometer-scale craters in the basin interior.',
    dateCreated: '2022-07-15',
    center: 'JPL',
    rover: 'mro',
    category: 'Orbital & Basins',
    keywords: ['Hellas Basin', 'HiRISE', 'CO2 Frost', 'Water Ice', 'Winter', 'Impact Basin'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25703.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25703',
    instrument: 'MRO HiRISE'
  },
  {
    id: 'PIA19672',
    title: 'MRO THEMIS Thermal Inertia Map of Gale Crater',
    description:
      'THEMIS thermal infrared mosaic of Gale Crater coloring rocks by thermal inertia—a measure of how fast surfaces heat and cool. High-inertia bedrock exposures (yellow-red) guided Curiosity\'s traverse planning.',
    dateCreated: '2015-05-27',
    center: 'JPL',
    rover: 'mro',
    category: 'Orbital & Basins',
    keywords: ['THEMIS', 'Thermal Inertia', 'Gale Crater', 'Bedrock', 'MRO', 'Infrared'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA19672.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA19672',
    instrument: 'THEMIS Thermal Infrared'
  },
  {
    id: 'PIA24543',
    title: 'Mars Reconnaissance Orbiter View of Perseverance Landing Ellipse',
    description:
      'MRO HiRISE image taken days before landing showing the 7.7 × 6.6 km landing ellipse within Jezero Crater. The delta, ancient shoreline, and primary science waypoints are all visible in this pre-landing site reconnaissance view.',
    dateCreated: '2021-02-11',
    center: 'JPL',
    rover: 'mro',
    category: 'Orbital & Basins',
    keywords: ['Landing Ellipse', 'HiRISE', 'MRO', 'Jezero', 'Site Reconnaissance', 'Mars 2020'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24543.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24543',
    instrument: 'MRO HiRISE'
  }
];

// Normalize category string for case-insensitive comparison
function normalizeCategory(cat: string): string {
  return cat.toLowerCase().replace(/\s*&\s*/g, ' & ').trim();
}

export function searchNasaImageArchive(
  query: string,
  rover: string = 'all',
  category: string = 'all'
): NasaImageArchiveItem[] {
  const q = (query || '').toLowerCase().trim();
  const normalizedCat = normalizeCategory(category);

  return NASA_IMAGE_ARCHIVE.filter((item) => {
    // Rover filter
    if (rover !== 'all' && item.rover !== rover) {
      return false;
    }

    // Category filter — normalize both sides to handle case/spacing differences
    if (normalizedCat !== 'all' && normalizeCategory(item.category) !== normalizedCat) {
      return false;
    }

    // Query filter — empty / broad queries return everything in the filtered set
    if (!q || q === 'mars' || q === 'mars perseverance' || q === 'mars rover' || q === 'mars curiosity') {
      return true;
    }

    const matchesTitle = item.title.toLowerCase().includes(q);
    const matchesDesc = item.description.toLowerCase().includes(q);
    const matchesId = item.id.toLowerCase().includes(q);
    const matchesKeyword = item.keywords.some((k) => k.toLowerCase().includes(q));

    // Also match individual search words (length > 2)
    const queryWords = q.split(/\s+/).filter((w) => w.length > 2);
    const matchesWords =
      queryWords.length > 0 &&
      queryWords.some(
        (w) =>
          item.title.toLowerCase().includes(w) ||
          item.description.toLowerCase().includes(w) ||
          item.keywords.some((k) => k.toLowerCase().includes(w))
      );

    return matchesTitle || matchesDesc || matchesId || matchesKeyword || matchesWords;
  });
}
