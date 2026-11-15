'use client';

import React from 'react';
import { useMission } from '@/context/MissionContext';
import { EnvironmentalHUD } from '@/components/EnvironmentalHUD';

export default function EnvironmentPage() {
  const { telemetry } = useMission();

  return (
    <div className="w-full h-full overflow-hidden bg-mars-darkest">
      <EnvironmentalHUD telemetry={telemetry} />
    </div>
  );
}
