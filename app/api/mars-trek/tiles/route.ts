import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const layer = searchParams.get('layer') || 'mola';

  // Authentic NASA JPL Mars Trek WMTS Layer specifications
  const LAYER_SPECS: Record<string, any> = {
    'mola': {
      id: 'Mars_MGS_MOLA_ClrShade_merge_global_463m',
      name: 'MOLA Color Shaded Relief (Mars Global Surveyor)',
      resolution: '463 meters/pixel',
      instrument: 'Mars Orbiter Laser Altimeter (MOLA)',
      mission: 'Mars Global Surveyor (NASA/JPL/GSFC)',
      type: 'Topography / Altimetric Shading',
      wmtsUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
      maxZoom: 7,
      attribution: 'NASA / JPL / GSFC / Mars Trek'
    },
    'viking': {
      id: 'Mars_Viking_MDIM21_ClrMosaic_global_232m',
      name: 'Viking MDIM 2.1 Colorized Global Mosaic',
      resolution: '232 meters/pixel',
      instrument: 'Viking Visual Imaging Subsystem (VIS)',
      mission: 'Viking Orbiters 1 & 2 (NASA/USGS)',
      type: 'Visible Optical Mosaic',
      wmtsUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
      maxZoom: 7,
      attribution: 'NASA / USGS / Mars Trek'
    },
    'themis_day': {
      id: 'Mars_MO_THEMIS-IR-Day_mosaic_global_100m_v2',
      name: 'THEMIS Daytime Infrared Global Mosaic',
      resolution: '100 meters/pixel',
      instrument: 'Thermal Emission Imaging System (THEMIS)',
      mission: '2001 Mars Odyssey (NASA/ASU)',
      type: 'Infrared Thermal / Rock Abundance',
      wmtsUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MO_THEMIS-IR-Day_mosaic_global_100m_v2/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
      maxZoom: 8,
      attribution: 'NASA / JPL / ASU / Mars Trek'
    }
  };

  const spec = LAYER_SPECS[layer] || LAYER_SPECS['mola'];

  return NextResponse.json({
    success: true,
    layer: spec,
    availableLayers: Object.keys(LAYER_SPECS).map(k => ({
      key: k,
      name: LAYER_SPECS[k].name,
      instrument: LAYER_SPECS[k].instrument,
      mission: LAYER_SPECS[k].mission
    }))
  });
}
