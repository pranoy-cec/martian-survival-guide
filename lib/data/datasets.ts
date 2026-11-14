export interface PlanetaryDataset {
  id: string;
  name: string;
  provider: 'NASA/JPL' | 'USGS Astrogeology' | 'NASA/GSFC' | 'ESA/DLR';
  mission: string;
  instrument: string;
  productIdentifier: string;
  acquisitionDate: string;
  processingLevel: string;
  spatialResolution: string;
  coordinateReferenceSystem: string;
  type: 'Altimetry' | 'Visible Optical' | 'Infrared Thermal' | 'Geologic Map' | 'Radar Sounding' | 'In-Situ Atmospheric';
  units: string;
  knownLimitations: string;
  sourceUrl: string;
  liveTileUrl?: string;
  status: 'ACTIVE_ONLINE' | 'CALIBRATED_ARCHIVE' | 'SYNTHETIC_MODEL';
}

export const PLANETARY_DATASETS: PlanetaryDataset[] = [
  {
    id: 'mgs-mola-megdr',
    name: 'MOLA Mission Experiment Gridded Data Record (MEGDR)',
    provider: 'NASA/GSFC',
    mission: 'Mars Global Surveyor (MGS)',
    instrument: 'Mars Orbiter Laser Altimeter (MOLA)',
    productIdentifier: 'MEGDR128_TOPOGRAPHY_V1',
    acquisitionDate: '1999-03-01 to 2001-06-30',
    processingLevel: 'PDS Level 4 Derived Gridded Topography',
    spatialResolution: '128 pixels/degree (~463 meters at equator)',
    coordinateReferenceSystem: 'IAU 2000 Mars Planetocentric / Areoid Datum (0m = 3396.0 km equatorial)',
    type: 'Altimetry',
    units: 'Meters relative to Mars areoid',
    knownLimitations: 'Horizontal accuracy ~100m, vertical precision ~1m. Narrow valleys and micro-craters (<400m) are smoothed out.',
    sourceUrl: 'https://pds-geosciences.wustl.edu/missions/mgs/mola.html',
    liveTileUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
    status: 'ACTIVE_ONLINE'
  },
  {
    id: 'mro-ctx-mosaic',
    name: 'MRO Context Camera (CTX) Global Controlled Mosaic',
    provider: 'NASA/JPL',
    mission: 'Mars Reconnaissance Orbiter (MRO)',
    instrument: 'Context Camera (CTX)',
    productIdentifier: 'MRO-M-CTX-2-EDR-L0-V1.0 / Murray Lab Mosaic',
    acquisitionDate: '2006-09-24 to 2024-Present',
    processingLevel: 'PDS Level 3 Radiometrically Calibrated Orthorectified Mosaic',
    spatialResolution: '6.0 meters/pixel',
    coordinateReferenceSystem: 'Equirectangular Mars Sphere (R=3396190m)',
    type: 'Visible Optical',
    units: 'Reflectance (I/F)',
    knownLimitations: 'Variable solar incidence and phase angle across seamlines; atmospheric dust haze in perihelion images.',
    sourceUrl: 'https://murray-lab.caltech.edu/CTX/',
    status: 'ACTIVE_ONLINE'
  },
  {
    id: 'mo-themis-ir-day',
    name: 'THEMIS Daytime Infrared Controlled Global Mosaic v2',
    provider: 'NASA/JPL',
    mission: '2001 Mars Odyssey',
    instrument: 'Thermal Emission Imaging System (THEMIS)',
    productIdentifier: 'ODY-M-THM-5-DDR-V1.0',
    acquisitionDate: '2002-02-19 to 2018-12-31',
    processingLevel: 'Level 5 Thermal Inertia & Brightness Temperature Mosaic',
    spatialResolution: '100 meters/pixel',
    coordinateReferenceSystem: 'Equirectangular Mars Equator',
    type: 'Infrared Thermal',
    units: 'Kelvin (Brightness Temperature at Band 9, 12.57 µm)',
    knownLimitations: 'Reflects diurnal heat retention; high rock abundance appears warm, fine dust appears cool in daytime.',
    sourceUrl: 'https://themis.asu.edu/maps',
    liveTileUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MO_THEMIS-IR-Day_mosaic_global_100m_v2/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
    status: 'ACTIVE_ONLINE'
  },
  {
    id: 'viking-mdim-21',
    name: 'Viking Orbiter Mars Digital Image Mosaic 2.1 (MDIM 2.1)',
    provider: 'USGS Astrogeology',
    mission: 'Viking Orbiters 1 & 2',
    instrument: 'Visual Imaging Subsystem (VIS)',
    productIdentifier: 'VO1/VO2-M-VIS-5-DIM-V2.1',
    acquisitionDate: '1976-06-19 to 1980-08-07',
    processingLevel: 'PDS Level 5 Photometrically Normalized Controlled Mosaic',
    spatialResolution: '232 meters/pixel (1/256 degree)',
    coordinateReferenceSystem: 'Mars IAU/IAG 2000 System',
    type: 'Visible Optical',
    units: 'Normalized visual albedo',
    knownLimitations: 'Acquired under varied lighting and atmospheric dust levels; geographic positional accuracy ±200m relative to MOLA.',
    sourceUrl: 'https://astrogeology.usgs.gov/search/map/Mars/Viking/MDIM21',
    liveTileUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
    status: 'ACTIVE_ONLINE'
  },
  {
    id: 'usgs-sim-3292',
    name: 'Geologic Map of Mars (USGS Scientific Investigations Map 3292)',
    provider: 'USGS Astrogeology',
    mission: 'Multi-Mission Synthesis (Tanaka et al., 2014)',
    instrument: 'MOLA, THEMIS, TES, HRSC, CTX Cross-Correlation',
    productIdentifier: 'USGS SIM 3292 / Pamphlet 2014-1182',
    acquisitionDate: 'Published 2014-07-14',
    processingLevel: 'Peer-Reviewed Chronostratigraphic Classification (1:20,000,000)',
    spatialResolution: 'Vector Polygons / 1:20M Cartographic Scale',
    coordinateReferenceSystem: 'Simple Cylindrical (Equirectangular) Mars',
    type: 'Geologic Map',
    units: 'Stratigraphic Units (Noachian, Hesperian, Amazonian Systems)',
    knownLimitations: 'Global regional unit boundaries generalized; local outcrops smaller than 10 km may belong to unmapped subunit lithologies.',
    sourceUrl: 'https://pubs.usgs.gov/sim/3292/',
    status: 'CALIBRATED_ARCHIVE'
  },
  {
    id: 'mars2020-meda',
    name: 'Mars Environmental Dynamics Analyzer (MEDA) In-Situ Record',
    provider: 'NASA/JPL',
    mission: 'Mars 2020 Perseverance',
    instrument: 'MEDA (ATS, PS, RDS, TIRS, HS, WS, SES)',
    productIdentifier: 'M2020-MEDA-2-EDR-V1.0',
    acquisitionDate: 'Sol 0 (Feb 2021) to Sol 1320+ (Present)',
    processingLevel: 'Calibrated Physical Units (CODMAC Level 3/4)',
    spatialResolution: 'In-Situ Point Measurement at Jezero Crater Floor (18.4447°N, 77.4508°E)',
    coordinateReferenceSystem: 'Local Mars Rover Surface Frame',
    type: 'In-Situ Atmospheric',
    units: 'Temperature (°C), Pressure (Pa), Dust Tau, UV (W/m²), Wind (m/s)',
    knownLimitations: 'Point measurements valid within Jezero basin boundary; convective plumes introduce high-frequency fluctuations.',
    sourceUrl: 'https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda.html',
    status: 'ACTIVE_ONLINE'
  },
  {
    id: 'msl-rad-gcr',
    name: 'Curiosity Radiation Assessment Detector (RAD) Surface Dose Rate',
    provider: 'NASA/JPL',
    mission: 'Mars Science Laboratory Curiosity',
    instrument: 'Radiation Assessment Detector (RAD)',
    productIdentifier: 'MSL-M-RAD-3-RDR-V1.0',
    acquisitionDate: 'Sol 13 (Aug 2012) to Present',
    processingLevel: 'Derived Dosimetric Quantities',
    spatialResolution: 'Gale Crater Traverse Track (-4.59°S, 137.44°E)',
    coordinateReferenceSystem: 'Surface Track Frame',
    type: 'In-Situ Atmospheric',
    units: 'mGy/day (Absorbed dose in silicon / tissue equivalent)',
    knownLimitations: 'Diurnal variation influenced by atmospheric column mass; coronal mass ejections (CMEs) cause unpredictable transient dose spikes.',
    sourceUrl: 'https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/MSL/rad.html',
    status: 'ACTIVE_ONLINE'
  },
  {
    id: 'mro-sharad-ice',
    name: 'Shallow Radar (SHARAD) Subsurface Dielectric sounding',
    provider: 'NASA/JPL',
    mission: 'Mars Reconnaissance Orbiter (MRO)',
    instrument: 'Shallow Radar (SHARAD)',
    productIdentifier: 'MRO-M-SHARAD-5-RADARGRAM-V1.0',
    acquisitionDate: '2006 to Present',
    processingLevel: 'Migrated Radar Profile (15-25 MHz)',
    spatialResolution: 'Vertical resolution ~15m in ice, along-track ~300m',
    coordinateReferenceSystem: 'Orbital Nadir Tracks',
    type: 'Radar Sounding',
    units: 'Relative Echo Power / Dielectric Permittivity (~3.15 for pure H2O ice)',
    knownLimitations: 'Surface clutter and surface roughness can create false subsurface reflections; radar fails to penetrate high-conductivity clay layers.',
    sourceUrl: 'https://pds-geosciences.wustl.edu/missions/mro/sharad.htm',
    status: 'CALIBRATED_ARCHIVE'
  }
];
