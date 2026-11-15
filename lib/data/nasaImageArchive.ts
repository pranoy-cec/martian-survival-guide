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
  {
    id: 'PIA24836',
    title: 'Perseverance SuperCam View of Kodiak Butte Delta Clinoforms',
    description:
      'High-resolution SuperCam telescopic view of Kodiak Butte remnant showing steeply dipping Gilbert-type delta clinoform beds. This geological feature definitively proved that an ancient river debouched into a long-lived, standing body of water in Jezero Crater ~3.7 billion years ago.',
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
    id: 'PIA25328',
    title: 'Skinner Ridge Abrasion Patch and Organic Detection Target',
    description:
      'Fine-grained lacustrine mudstone rock face of the Shenandoah Formation at Skinner Ridge prior to core drilling. SHERLOC deep-UV Raman spectroscopy detected concentrated organic carbon aromatics correlated with sulfate mineral veins in this outcrop.',
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
    id: 'PIA24850',
    title: 'Perseverance First Core Sample "Montdenier" Sealed in Sample Tube',
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
    id: 'PIA24483',
    title: 'SuperCam Laser Interrogation of Basalt Target "Máaz"',
    description:
      'First laser-induced breakdown spectroscopy (LIBS) target interrogated by SuperCam on Mars. The rock exhibits vesicular basaltic volcanic texture rich in iron and magnesium.',
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
    id: 'PIA25684',
    title: 'Perseverance Deposits First Mars Sample Return Tube at Three Forks',
    description:
      'Historic drop of sample tube "Malay" at the Three Forks sample depot on the Jezero delta floor. This depot serves as a primary backup repository for the NASA-ESA Mars Sample Return campaign.',
    dateCreated: '2022-12-21',
    center: 'JPL',
    rover: 'perseverance',
    category: 'Hardware & Ingenuity',
    keywords: ['Three Forks', 'Sample Depot', 'Sample Return', 'Malay', 'WATSON'],
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25684.jpg',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA25684',
    sol: 653,
    instrument: 'Navcam & WATSON'
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
    id: 'PIA16225',
    title: 'Curiosity First 360-Degree Panorama of Gale Crater and Mount Sharp',
    description:
      'Curiosity first color 360-degree cylindrical panorama of Gale Crater floor looking south towards the 5.5-kilometer-tall layered peak of Aeolis Mons (Mount Sharp).',
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
    id: 'PIA16453',
    title: 'Curiosity ChemCam Laser Pits on Coronation Rock',
    description:
      'ChemCam Remote Micro-Imager close-up showing tiny pits blasted by laser pulses into basaltic rock target "Coronation" to vaporize mineral samples and analyze atomic emission spectra.',
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
    id: 'PIA19920',
    title: 'Curiosity Drilling at "Buckskin" Target in Marias Pass',
    description:
      'Self-portrait of Curiosity drilling at the Buckskin rock target in Marias Pass. CheMin X-ray diffraction revealed an unexpected high concentration of tridymite silica polymorphs, indicating explosive volcanism.',
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
    title: 'Opportunity Discovery of Hematite "Blueberries" at Eagle Crater',
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
    id: 'PIA13593',
    title: 'Opportunity Santa Maria Crater Rim Hydrated Sulfate Blocks',
    description:
      'Pancam false-color view of blocky ejecta on the rim of 90-meter Santa Maria Crater. CRISM orbital spectra and ground truth Pancam surveys detected hydrated magnesium and ferric sulfates freshly excavated by impact.',
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
    id: 'PIA10214',
    title: 'Spirit Wheel Trench Reveals 90% Pure Hydrothermal Silica',
    description:
      'Spirit stuck right-front wheel dragged open a trench at "Home Plate" in Gusev Crater, churning up bright white soil consisting of 90% pure amorphous opaline silica, indicating hot volcanic springs.',
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
    id: 'PIA13146',
    title: 'Spirit Columbia Hills Hydrothermal Sinter Landscape',
    description:
      'Spirit panoramic perspective from Husband Hill overlooking the inner basin of Gusev Crater. Ancient Noachian volcanic basement outcrops reveal extensive hydrothermal fumarole alteration.',
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
    id: 'PIA00407',
    title: 'Valles Marineris Grand Canyon of Mars Global Orbital Mosaic',
    description:
      'Viking Orbiter global mosaic of the 4,000-kilometer-long Valles Marineris canyon system, slicing across a fifth of Mars\' circumference and plunging down to 9 kilometers deep.',
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
      'Digital elevation mosaic of Olympus Mons, the largest volcano in the solar system, towering 22 kilometers high with a 80-kilometer summit caldera and 6-kilometer vertical basal cliffs.',
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
    id: 'PIA19808',
    title: 'MRO HiRISE Recurring Slope Lineae (RSL) Active Dark Streaks',
    description:
      'HiRISE monitoring of steep warm-season slopes in Garni Crater. Dark narrow streaks (RSL) grow downslope during warmest seasons, suggesting hydrated perchlorate brine flows.',
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
    id: 'PIA22330',
    title: 'NASA InSight Lander First Pristine Color Panorama on Elysium Planitia',
    description:
      'Instrument Deployment Camera (IDC) color mosaic from NASA InSight lander on Elysium Planitia, showing the ultra-flat volcanic sand plain where SEIS measured over 1,300 marsquakes.',
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
    title: 'NASA Mars 2020 Perseverance Mission Launch to Mars',
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
  }
];

export function searchNasaImageArchive(
  query: string,
  rover: string = 'all',
  category: string = 'all'
): NasaImageArchiveItem[] {
  const q = (query || '').toLowerCase().trim();

  return NASA_IMAGE_ARCHIVE.filter((item) => {
    // Rover filter
    if (rover !== 'all' && item.rover !== rover) {
      return false;
    }

    // Category filter
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    // Query filter
    if (!q || q === 'mars' || q === 'mars perseverance' || q === 'mars rover') {
      return true;
    }

    const matchesTitle = item.title.toLowerCase().includes(q);
    const matchesDesc = item.description.toLowerCase().includes(q);
    const matchesId = item.id.toLowerCase().includes(q);
    const matchesKeyword = item.keywords.some((k) => k.toLowerCase().includes(q));

    // Also match individual search words
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
