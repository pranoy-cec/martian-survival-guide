'use client';

import React from 'react';
import { NasaScienceExplorer } from '@/components/NasaScienceExplorer';

export default function ScienceExplorerPage() {
  return (
    <div className="w-full h-full overflow-hidden bg-mars-darkest">
      <NasaScienceExplorer />
    </div>
  );
}
