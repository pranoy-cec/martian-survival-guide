export interface MarsMapLayerMetadata {
  id: string;
  name: string;
  shortName: string;
  category: 'BASEMAP_ELEVATION' | 'BASEMAP_VISIBLE' | 'BASEMAP_INFRARED' | 'GEOLOGY' | 'HIGH_RES_TARGET' | 'SUBSURFACE';
  serviceType: 'WMTS' | 'XYZ' | 'WMS' | 'VECTOR_GEOJSON';
  endpointUrl: string;
  tileMatrixSet?: string;
  projection: 'EPSG:4326 (Equirectangular / Plate Carrée)' | 'Simple Cylindrical Mars Sphere' | 'IAU 2000 Mars';
  crs: string;
  spatialResolution: string;
  nativeMinZoom: number;
  nativeMaxZoom: number;
  geographicBounds: {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
  };
  mission: string;
  instrument: string;
  processingLevel: string;
  attribution: string;
  description: string;
  scientificUtility: string;
  knownLimitations: string;
  isLiveServiceVerified: boolean;
}

export const MARS_MAP_LAYERS: MarsMapLayerMetadata[] = [
  {
    id: 'Mars_MGS_MOLA_ClrShade_merge_global_463m',
    name: 'MOLA Color Shaded Relief Global Merge (463m)',
    shortName: 'MOLA Color Shaded Relief',
    category: 'BASEMAP_ELEVATION',
    serviceType: 'WMTS',
    endpointUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
    tileMatrixSet: 'default028mm',
    projection: 'EPSG:4326 (Equirectangular / Plate Carrée)',
    crs: 'urn:ogc:def:crs:OGC:1.3:CRS84 (Mars Sphere R=3396.19km)',
    spatialResolution: '463 meters/pixel (128 pixels/degree at equator)',
    nativeMinZoom: 0,
    nativeMaxZoom: 7,
    geographicBounds: { minLat: -90, maxLat: 90, minLon: -180, maxLon: 180 },
    mission: 'Mars Global Surveyor (NASA/GSFC)',
    instrument: 'Mars Orbiter Laser Altimeter (MOLA)',
    processingLevel: 'PDS Level 4 Precision Altimetric Gridded Product',
    attribution: 'NASA / JPL / GSFC / Mars Trek',
    description: 'Global colorized topographic shaded relief derived from over 600 million laser altimetry pulses, referenced to the Mars Areoid datum.',
    scientificUtility: 'Baseline regional topographic slope, basin delineations, and landing sector elevation gradients.',
    knownLimitations: 'Micro-scale relief (<400m) is smoothed out; steep crater walls display interpolation artifacts.',
    isLiveServiceVerified: true
  },
  {
    id: 'Mars_Viking_MDIM21_ClrMosaic_global_232m',
    name: 'Viking MDIM 2.1 Colorized Global Controlled Mosaic (232m)',
    shortName: 'Viking Visible Color Mosaic',
    category: 'BASEMAP_VISIBLE',
    serviceType: 'WMTS',
    endpointUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
    tileMatrixSet: 'default028mm',
    projection: 'EPSG:4326 (Equirectangular / Plate Carrée)',
    crs: 'IAU 2000 Mars System',
    spatialResolution: '232 meters/pixel (256 pixels/degree)',
    nativeMinZoom: 0,
    nativeMaxZoom: 7,
    geographicBounds: { minLat: -90, maxLat: 90, minLon: -180, maxLon: 180 },
    mission: 'Viking Orbiters 1 & 2 (NASA/USGS)',
    instrument: 'Visual Imaging Subsystem (VIS)',
    processingLevel: 'PDS Level 5 Photometrically Controlled Orthomosaic',
    attribution: 'NASA / USGS Astrogeology / Mars Trek',
    description: 'Photometrically normalized visible light mosaic synthesizing red and violet filter exposures with enhanced color balance.',
    scientificUtility: 'Global albedo boundary mapping, wind streak orientations, and surface dust mantle distribution.',
    knownLimitations: 'Acquired during varied lighting phases; horizontal geometric errors up to ±200m relative to MOLA control network.',
    isLiveServiceVerified: true
  },
  {
    id: 'Mars_MO_THEMIS-IR-Day_mosaic_global_100m_v2',
    name: 'THEMIS Daytime Infrared Controlled Global Mosaic v2 (100m)',
    shortName: 'THEMIS Daytime Thermal IR',
    category: 'BASEMAP_INFRARED',
    serviceType: 'WMTS',
    endpointUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MO_THEMIS-IR-Day_mosaic_global_100m_v2/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
    tileMatrixSet: 'default028mm',
    projection: 'EPSG:4326 (Equirectangular / Plate Carrée)',
    crs: 'Simple Cylindrical Mars Sphere',
    spatialResolution: '100 meters/pixel',
    nativeMinZoom: 0,
    nativeMaxZoom: 8,
    geographicBounds: { minLat: -90, maxLat: 90, minLon: -180, maxLon: 180 },
    mission: '2001 Mars Odyssey (NASA/ASU)',
    instrument: 'Thermal Emission Imaging System (THEMIS)',
    processingLevel: 'Level 5 Brightness Temperature & Thermal Inertia Product',
    attribution: 'NASA / JPL / ASU / Mars Trek',
    description: 'Thermal infrared daytime mosaic recorded in Band 9 (12.57 µm). Thermal inertia variations distinguish bedrock, block fields, and fine dust.',
    scientificUtility: 'Identifies high thermal inertia bedrock exposures (candidate exploration waypoints) versus low-inertia drift sand traps.',
    knownLimitations: 'Thermal contrast is seasonal and dependent on solar incidence; dust haze during perihelion attenuates surface signal.',
    isLiveServiceVerified: true
  },
  {
    id: 'Mars_MRO_CTX_Controlled_Mosaic',
    name: 'MRO Context Camera (CTX) Controlled Global Exploration Mosaic (6m)',
    shortName: 'MRO CTX High-Res Mosaic',
    category: 'HIGH_RES_TARGET',
    serviceType: 'XYZ',
    endpointUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MRO_CTX_mosaic_global_6m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
    projection: 'EPSG:4326 (Equirectangular / Plate Carrée)',
    crs: 'Equirectangular Mars Sphere (R=3396190m)',
    spatialResolution: '6.0 meters/pixel',
    nativeMinZoom: 8,
    nativeMaxZoom: 14,
    geographicBounds: { minLat: -88, maxLat: 88, minLon: -180, maxLon: 180 },
    mission: 'Mars Reconnaissance Orbiter (NASA/JPL/MSSS)',
    instrument: 'Context Camera (CTX)',
    processingLevel: 'PDS Level 3 Radiometrically Calibrated Ortho-mosaic',
    attribution: 'NASA / JPL-Caltech / MSSS / Murray Lab',
    description: 'High-resolution controlled mosaic covering over 99% of Mars at 6 meters per pixel, resolving individual dunes, gullies, and crater ejecta.',
    scientificUtility: 'Meter-scale hazard avoidance, obstacle detection, and detailed geologic contact mapping for rover/astronaut traversals.',
    knownLimitations: 'Mosaic seams display contrast variations due to distinct atmospheric dust opacities during different observation sols.',
    isLiveServiceVerified: true
  },
  {
    id: 'USGS_SIM_3292_Geology_Global',
    name: 'USGS Scientific Investigations Map 3292 (Global Geologic Map of Mars)',
    shortName: 'USGS Geologic Units (Tanaka et al., 2014)',
    category: 'GEOLOGY',
    serviceType: 'VECTOR_GEOJSON',
    endpointUrl: '/api/usgs/geology',
    projection: 'EPSG:4326 (Equirectangular / Plate Carrée)',
    crs: 'Mars Simple Cylindrical',
    spatialResolution: '1:20,000,000 Cartographic Scale (Vector Outlines)',
    nativeMinZoom: 1,
    nativeMaxZoom: 12,
    geographicBounds: { minLat: -90, maxLat: 90, minLon: -180, maxLon: 180 },
    mission: 'USGS Astrogeology Science Center / Multi-Mission Synthesis',
    instrument: 'MOLA, THEMIS, TES, HRSC, CTX Cross-Correlation',
    processingLevel: 'Peer-Reviewed Scientific Map (Pamphlet 2014-1182)',
    attribution: 'U.S. Geological Survey (Tanaka et al., 2014)',
    description: 'Authoritative chronostratigraphic classification dividing Martian terrain into Noachian, Hesperian, and Amazonian stratigraphic systems.',
    scientificUtility: 'Determines geologic age, formation origin, rock hardness, and astrobiological sample priority.',
    knownLimitations: 'Global regional unit boundaries are generalized; local outcrops <10 km may belong to unmapped subunit lithologies.',
    isLiveServiceVerified: true
  },
  {
    id: 'MRO_SHARAD_Subsurface_Ice_Grid',
    name: 'MRO SHARAD Ground-Penetrating Radar Subsurface Water Ice Grid',
    shortName: 'SHARAD Water Ice Reservoir',
    category: 'SUBSURFACE',
    serviceType: 'VECTOR_GEOJSON',
    endpointUrl: '/api/maps/subsurface-ice',
    projection: 'EPSG:4326 (Equirectangular / Plate Carrée)',
    crs: 'Mars Planetocentric',
    spatialResolution: '15m vertical resolution in ice, 300m along-track',
    nativeMinZoom: 4,
    nativeMaxZoom: 12,
    geographicBounds: { minLat: 35, maxLat: 65, minLon: 80, maxLon: 140 },
    mission: 'Mars Reconnaissance Orbiter (NASA/ASI)',
    instrument: 'Shallow Radar (SHARAD)',
    processingLevel: 'Level 5 Migrated Radargram Dielectric Permittivity Maps',
    attribution: 'NASA / JPL / Italian Space Agency / Univ. of Rome',
    description: 'Subsurface sounding radar identifying 50-85% pure glacial water-ice sheets buried under 1-10m of desiccated regolith in Utopia Planitia and Arcadia Planitia.',
    scientificUtility: 'In-Situ Resource Utilization (ISRU) water extraction targeting and cryopreserved astrobiology core drilling.',
    knownLimitations: 'Surface clutter and surface roughness can produce radar echoes resembling subsurface reflectors.',
    isLiveServiceVerified: true
  }
];
