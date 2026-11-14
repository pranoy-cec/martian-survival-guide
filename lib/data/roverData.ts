export interface RoverInstrument {
  name: string;
  acronym: string;
  type: string;
  description: string;
  leadInstitution: string;
  keyMeasurements: string[];
}

export interface MarsRoverRecord {
  id: 'perseverance' | 'curiosity';
  name: string;
  formalMission: string;
  launchDate: string;
  landingDateUtc: string;
  landingSite: string;
  coordinates: {
    lat: number;
    lon: number;
    elevationMeters: number;
    crs: string;
  };
  operationalStatus: 'ACTIVE_SURFACE_OPS' | 'EXTENDED_MISSION' | 'DECOMMISSIONED';
  currentSol: number;
  totalDistanceTraversedKm: number;
  samplesCollected: number;
  instruments: RoverInstrument[];
  latestObservationSummary: {
    sol: number;
    temperatureRangeC: { min: number; max: number };
    atmosphericPressurePa: number;
    dustTau: number;
    primaryScienceTask: string;
  };
  provenance: {
    source: string;
    productPdsUrl: string;
    lastUpdatedUtc: string;
  };
}

export const MARS_ROVERS: Record<string, MarsRoverRecord> = {
  perseverance: {
    id: 'perseverance',
    name: 'Perseverance (Mars 2020)',
    formalMission: 'Mars 2020 Perseverance Rover & Ingenuity Helicopter',
    launchDate: '2020-07-30',
    landingDateUtc: '2021-02-18T20:55:00Z',
    landingSite: 'Jezero Crater (Octavia E. Butler Landing)',
    coordinates: {
      lat: 18.4447,
      lon: 77.4508,
      elevationMeters: -2560,
      crs: 'Mars IAU 2000 Areoid Datum'
    },
    operationalStatus: 'ACTIVE_SURFACE_OPS',
    currentSol: 1326,
    totalDistanceTraversedKm: 29.4,
    samplesCollected: 24,
    instruments: [
      {
        name: 'Mars Environmental Dynamics Analyzer',
        acronym: 'MEDA',
        type: 'Atmospheric Weather Suite',
        description: 'Sensors measuring wind speed/direction, pressure, relative humidity, air/ground temperature, and dust optical opacity.',
        leadInstitution: 'Centro de Astrobiología (CAB), CSIC-INTA, Spain',
        keyMeasurements: ['Air Temp (ATS)', 'Atm Pressure (PS)', 'Dust Tau (RDS)', 'Ground Temp (TIRS)']
      },
      {
        name: 'SuperCam',
        acronym: 'SuperCam',
        type: 'Laser-Induced Breakdown Spectrometer & Remote Raman',
        description: 'Fires laser pulses at distant rocks (<7m) to determine elemental composition and identify minerals.',
        leadInstitution: 'Los Alamos National Laboratory (LANL) / CNES',
        keyMeasurements: ['Elemental LIBS spectra', 'Raman mineralogy', 'Visible/IR reflectance (VISIR)']
      },
      {
        name: 'Scanning Habitable Environments with Raman & Luminescence for Organics & Chemicals',
        acronym: 'SHERLOC',
        type: 'Deep-UV Raman & Fluorescence Spectrometer',
        description: 'Detects organic molecules and minerals altered by aqueous environments with sub-millimeter spatial resolution.',
        leadInstitution: 'NASA Jet Propulsion Laboratory (JPL)',
        keyMeasurements: ['Aromatic organic detection', 'Fluorescence mapping', 'WATSON microscopic imaging']
      },
      {
        name: 'Planetary Instrument for X-ray Lithochemistry',
        acronym: 'PIXL',
        type: 'Micro-focus X-ray Fluorescence Spectrometer',
        description: 'Maps fine-scale elemental chemistry of rock textures to evaluate ancient microbial habitats.',
        leadInstitution: 'NASA Jet Propulsion Laboratory (JPL)',
        keyMeasurements: ['Sub-millimeter elemental XRF mapping', 'Rock petrography']
      },
      {
        name: 'Radar Imager for Mars\' Subsurface Experiment',
        acronym: 'RIMFAX',
        type: 'Ground-Penetrating Radar',
        description: 'Probes subterranean geologic layers up to 10+ meters beneath the rover wheels.',
        leadInstitution: 'University of Oslo / FFI, Norway',
        keyMeasurements: ['Subsurface radargrams', 'Buried crater floor stratigraphy']
      },
      {
        name: 'Mastcam-Z',
        acronym: 'Mastcam-Z',
        type: 'Multispectral Stereoscopic Mast Cameras',
        description: 'Zoomable high-resolution color and multispectral imaging for landscape morphology and rover navigation.',
        leadInstitution: 'Arizona State University (ASU)',
        keyMeasurements: ['Panoramic stereoscopy', 'Narrowband visible-to-NIR multispectral filters']
      }
    ],
    latestObservationSummary: {
      sol: 1326,
      temperatureRangeC: { min: -88, max: -18 },
      atmosphericPressurePa: 735,
      dustTau: 0.42,
      primaryScienceTask: 'Exploring Bright Angel rock unit and ancient Neretva Vallis delta margin for organic bio-essential signatures.'
    },
    provenance: {
      source: 'NASA/JPL-Caltech Mars 2020 Mission Archive & PDS Atmospheres',
      productPdsUrl: 'https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda.html',
      lastUpdatedUtc: new Date().toISOString()
    }
  },
  curiosity: {
    id: 'curiosity',
    name: 'Curiosity (Mars Science Laboratory)',
    formalMission: 'Mars Science Laboratory (MSL)',
    launchDate: '2011-11-26',
    landingDateUtc: '2012-08-06T05:17:57Z',
    landingSite: 'Gale Crater (Bradbury Landing)',
    coordinates: {
      lat: -4.5895,
      lon: 137.4417,
      elevationMeters: -4450,
      crs: 'Mars IAU 2000 Areoid Datum'
    },
    operationalStatus: 'EXTENDED_MISSION',
    currentSol: 4362,
    totalDistanceTraversedKm: 32.8,
    samplesCollected: 39,
    instruments: [
      {
        name: 'Radiation Assessment Detector',
        acronym: 'RAD',
        type: 'Energetic Charged Particle Spectrometer',
        description: 'Measures surface ionizing radiation from galactic cosmic rays (GCR) and solar energetic particles (SEP).',
        leadInstitution: 'Southwest Research Institute (SwRI) / Christian-Albrechts-Universität zu Kiel',
        keyMeasurements: ['Surface absorbed dose rate (mGy/day)', 'Dose equivalent (mSv/day)', 'Neutron flux']
      },
      {
        name: 'Rover Environmental Monitoring Station',
        acronym: 'REMS',
        type: 'Meteorological Suite',
        description: 'Monitors ambient pressure, humidity, ultraviolet radiation, wind speed, and air/ground temperature.',
        leadInstitution: 'Centro de Astrobiología (CAB), CSIC-INTA, Spain',
        keyMeasurements: ['Diurnal temperature cycle', 'Atmospheric pressure', 'UV index']
      },
      {
        name: 'Chemistry and Mineralogy',
        acronym: 'CheMin',
        type: 'X-ray Diffraction & Fluorescence Instrument',
        description: 'Identifies and quantifies mineral phases in powdered rock drill samples.',
        leadInstitution: 'NASA Ames Research Center',
        keyMeasurements: ['X-ray diffraction mineral identification', 'Clay vs sulfate quantification']
      },
      {
        name: 'Sample Analysis at Mars',
        acronym: 'SAM',
        type: 'Mass Spectrometer, Gas Chromatograph, Laser Spectrometer',
        description: 'Searches for carbon compounds, organic molecules, and isotopic ratios of light elements.',
        leadInstitution: 'NASA Goddard Space Flight Center (GSFC)',
        keyMeasurements: ['Pyrolysis gas chromatography mass spectrometry (GCMS)', 'Atmospheric methane detection']
      },
      {
        name: 'Chemistry and Camera',
        acronym: 'ChemCam',
        type: 'Laser-Induced Breakdown Spectroscopy & RMI',
        description: 'Determines elemental rock compositions from up to 7 meters away.',
        leadInstitution: 'Los Alamos National Laboratory (LANL) / IRAP',
        keyMeasurements: ['Elemental rock chemistry', 'High-res remote micro-imaging']
      }
    ],
    latestObservationSummary: {
      sol: 4362,
      temperatureRangeC: { min: -82, max: -6 },
      atmosphericPressurePa: 840,
      dustTau: 0.45,
      primaryScienceTask: 'Ascending Gediz Vallis ridge on Mount Sharp to investigate late-stage catastrophic debris flood deposits.'
    },
    provenance: {
      source: 'NASA/JPL-Caltech MSL Mission Archive & PDS Geosciences',
      productPdsUrl: 'https://pds-geosciences.wustl.edu/missions/msl/',
      lastUpdatedUtc: new Date().toISOString()
    }
  }
};
