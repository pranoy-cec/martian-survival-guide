'use client';

import React from 'react';
import { useMission } from '@/context/MissionContext';
import { MissionControlDashboard } from '@/components/MissionControlDashboard';

export default function HomePage() {
  const {
    selectedSite,
    setSelectedSite,
    activeRoute,
    telemetry,
    setIsReportOpen
  } = useMission();

  return (
    <div className="w-full h-full overflow-hidden">
      <MissionControlDashboard
        selectedSite={selectedSite}
        onSelectSite={setSelectedSite}
        activeRoute={activeRoute}
        telemetry={telemetry}
        onOpenReport={() => setIsReportOpen(true)}
      />
    </div>
  );
}
