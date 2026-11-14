export interface NasaMarsMission {
  id: string;
  name: string;
  agency: string;
  type: 'ROVER' | 'ORBITER' | 'LANDER' | 'SAMPLE_RETURN_CONCEPT';
  status: 'ACTIVE' | 'COMPLETED' | 'CONCEPT';
  launchYear: number;
  landingArrivalYear: number;
  destinationSector: string;
  primaryScientificGoals: string[];
  instrumentsCount: number;
  pdsArchiveUrl: string;
}

export const NASA_MARS_MISSIONS: NasaMarsMission[] = [
  {
    id: 'mars-2020',
    name: 'Mars 2020 (Perseverance & Ingenuity)',
    agency: 'NASA / JPL-Caltech',
    type: 'ROVER',
    status: 'ACTIVE',
    launchYear: 2020,
    landingArrivalYear: 2021,
    destinationSector: 'Jezero Crater (18.44°N, 77.45°E)',
    primaryScientificGoals: [
      'Search for signs of ancient biosignatures in lacustrine delta mudstones',
      'Collect and seal a diverse set of rock core samples for Mars Sample Return',
      'Demonstrate in-situ oxygen production from CO2 atmosphere via MOXIE',
      'Pioneer aerial flight in the thin Martian atmosphere with Ingenuity helicopter'
    ],
    instrumentsCount: 7,
    pdsArchiveUrl: 'https://pds-geosciences.wustl.edu/missions/mars2020/'
  },
  {
    id: 'msl-curiosity',
    name: 'Mars Science Laboratory (Curiosity)',
    agency: 'NASA / JPL-Caltech',
    type: 'ROVER',
    status: 'ACTIVE',
    launchYear: 2011,
    landingArrivalYear: 2012,
    destinationSector: 'Gale Crater & Mount Sharp (-4.59°S, 137.44°E)',
    primaryScientificGoals: [
      'Assess whether Mars ever had an environment capable of supporting microbial life',
      'Investigate Martian paleoclimates and the clay-to-sulfate transition sequence',
      'Quantify the broad spectrum of surface cosmic radiation for future human missions'
    ],
    instrumentsCount: 10,
    pdsArchiveUrl: 'https://pds-geosciences.wustl.edu/missions/msl/'
  },
  {
    id: 'mro',
    name: 'Mars Reconnaissance Orbiter (MRO)',
    agency: 'NASA / JPL-Caltech',
    type: 'ORBITER',
    status: 'ACTIVE',
    launchYear: 2005,
    landingArrivalYear: 2006,
    destinationSector: 'Global Polar Sun-Synchronous Orbit (300 km altitude)',
    primaryScientificGoals: [
      'Map surface features at sub-meter scale with HiRISE (30 cm/pix)',
      'Detect hydrated minerals and water-related alterations via CRISM imaging spectrometer',
      'Probe subsurface ice layers and buried geology with SHARAD radar',
      'Serve as primary high-bandwidth telecommunications relay for surface assets'
    ],
    instrumentsCount: 6,
    pdsArchiveUrl: 'https://pds-geosciences.wustl.edu/missions/mro/'
  },
  {
    id: 'odyssey',
    name: '2001 Mars Odyssey',
    agency: 'NASA / JPL-Caltech',
    type: 'ORBITER',
    status: 'ACTIVE',
    launchYear: 2001,
    landingArrivalYear: 2001,
    destinationSector: 'Global Circular Orbit (400 km altitude)',
    primaryScientificGoals: [
      'Map global mineralogy and thermal inertia using THEMIS multispectral infrared',
      'Detect hydrogen in the upper meter of regolith with GRS neutron spectrometer',
      'Longest-operating spacecraft in orbit around another planet'
    ],
    instrumentsCount: 3,
    pdsArchiveUrl: 'https://pds-geosciences.wustl.edu/missions/odyssey/'
  },
  {
    id: 'mgs',
    name: 'Mars Global Surveyor (MGS)',
    agency: 'NASA / GSFC & JPL',
    type: 'ORBITER',
    status: 'COMPLETED',
    launchYear: 1996,
    landingArrivalYear: 1997,
    destinationSector: 'Global Mapping Orbit (1997-2006)',
    primaryScientificGoals: [
      'Construct the definitive global topography of Mars using MOLA laser altimetry',
      'Identify surface hematite deposits with TES thermal emission spectrometer',
      'Discovered remanent crustal magnetic fields in the southern highlands'
    ],
    instrumentsCount: 5,
    pdsArchiveUrl: 'https://pds-geosciences.wustl.edu/missions/mgs/'
  },
  {
    id: 'viking-program',
    name: 'Viking 1 & Viking 2 (Orbiters & Landers)',
    agency: 'NASA / Langley & JPL',
    type: 'LANDER',
    status: 'COMPLETED',
    launchYear: 1975,
    landingArrivalYear: 1976,
    destinationSector: 'Chryse Planitia (Viking 1) & Utopia Planitia (Viking 2)',
    primaryScientificGoals: [
      'First successful operational landings on the surface of Mars',
      'Conducted biological metabolism and gas exchange experiments in Martian soil',
      'Provided panoramic color photography and long-term surface weather stations'
    ],
    instrumentsCount: 8,
    pdsArchiveUrl: 'https://pds-imaging.jpl.nasa.gov/volumes/viking.html'
  }
];
