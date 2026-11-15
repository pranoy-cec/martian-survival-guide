'use client';

import React from 'react';
import { useMission } from '@/context/MissionContext';
import { Header } from '@/components/Header';
import { ScienceInspector } from '@/components/ScienceInspector';
import { MissionReportModal } from '@/components/MissionReportModal';

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const {
    selectedSite,
    setSelectedSite,
    telemetry,
    selectedPOI,
    setSelectedPOI,
    isReportOpen,
    setIsReportOpen,
    activeRoute
  } = useMission();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-mars-darkest">
      {/* Global Navigation Header with Page Links */}
      <Header
        selectedSite={selectedSite}
        onSelectSite={setSelectedSite}
        telemetry={telemetry}
      />

      {/* Main Page Workspace */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        {children}

        {/* Global Science POI Inspector Drawer */}
        <ScienceInspector poi={selectedPOI} onClose={() => setSelectedPOI(null)} />

        {/* Global Mission Flight Plan Briefing & JSON Report Generator Modal */}
        <MissionReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          activeRoute={activeRoute}
          site={selectedSite}
          telemetry={telemetry}
        />
      </main>
    </div>
  );
};
