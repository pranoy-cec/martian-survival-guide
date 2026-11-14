import { NextRequest } from 'next/server';
import { apiSuccess } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const summary = {
    module: 'ARES Mission Report Generator',
    description: 'Serverless generation of comprehensive NASA astronaut EVA mission briefings and flight plan dossiers.',
    supportedExportFormats: ['JSON Dossier', 'Formatted Printable Briefing', 'GeoJSON FeatureCollection'],
    reportSections: [
      'Mission Header & Authentication Hash',
      'Flight Plan Coordinates & Metrics (Distance, Duration, O2 Burn)',
      'Operational Environment (MEDA & REMS Calibrated Baseline)',
      'Waypoint Traversal Chronology with MOLA Elevations & Slopes',
      'Hazard Breakdown & Risk Exposure Percentages',
      'Integrated Planetary Dataset Inventory (7 Missions)',
      'Scientific Provenance, Data Uncertainty, and Ethical Limitations Statement'
    ],
    generateEndpoint: 'POST /api/reports/generate'
  };

  return apiSuccess(summary, {
    source: 'ARES Mission Planning Platform'
  });
}
