import { NextResponse } from 'next/server';

export interface ApiMetadata {
  source?: string;
  mission?: string;
  instrument?: string;
  processingLevel?: string;
  crs?: string;
  resolution?: string;
  limitations?: string;
  uncertainty?: string;
  nature?: 'IN_SITU_OBSERVATION' | 'CALIBRATED_ARCHIVE' | 'CALIBRATED_HISTORICAL' | 'PLANETARY_CLIMATE_MODEL' | 'DERIVED_ANALYTICAL';
  [key: string]: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  metadata?: ApiMetadata;
  source?: string;
  timestamp: string;
  error?: string;
  details?: any;
}

export function apiSuccess<T>(data: T, metadata?: ApiMetadata, status = 200) {
  const body: ApiResponse<T> = {
    success: true,
    data,
    metadata,
    source: metadata?.source || 'NASA Planetary Science Data System / USGS Astrogeology',
    timestamp: new Date().toISOString()
  };
  return NextResponse.json(body, { status });
}

export function apiError(message: string, details?: any, status = 400) {
  const body: ApiResponse<null> = {
    success: false,
    error: message,
    details,
    timestamp: new Date().toISOString()
  };
  return NextResponse.json(body, { status });
}
