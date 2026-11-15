'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Map as MapIcon,
  Sparkles,
  Activity,
  Atom,
  CircleDot,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/map',         label: 'Martian GIS Map',    icon: MapIcon,    color: 'text-mars-cyan' },
  { href: '/routes',      label: 'Route Optimizer',    icon: Sparkles,   color: 'text-mars-orange' },
  { href: '/environment', label: 'Atmosphere & MEDA',  icon: Activity,   color: 'text-emerald-400' },
  { href: '/science',     label: 'Science Dossier',    icon: Atom,       color: 'text-purple-400' },
  { href: '/craters',     label: 'Crater Archive',     icon: CircleDot,  color: 'text-amber-400' },
  { href: '/briefing',    label: 'Flight Briefing',    icon: FileText,   color: 'text-mars-sand' },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex flex-col bg-mars-panel border-r border-mars-border z-20 transition-all duration-300 select-none shrink-0 ${
        collapsed ? 'w-14' : 'w-48'
      }`}
    >
      {/* Nav Items */}
      <nav className="flex flex-col gap-1 p-2 flex-1 pt-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon, color }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className={`group flex items-center gap-2.5 px-2 py-2.5 rounded-lg text-xs font-mono font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-mars-red/30 border border-mars-red/60 text-white shadow-inner'
                  : 'text-gray-400 hover:text-white hover:bg-mars-dark border border-transparent hover:border-mars-border'
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <span className="absolute left-0 w-1 h-6 bg-mars-red rounded-r-full" />
              )}
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-mars-orange' : color + ' opacity-80 group-hover:opacity-100'
                }`}
              />
              {!collapsed && (
                <span className="truncate leading-tight">{label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="border-t border-mars-border mx-2 my-1" />

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="flex items-center justify-center p-2 m-2 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-mars-dark border border-transparent hover:border-mars-border transition-all text-xs font-mono gap-1.5"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-[10px]">COLLAPSE</span>
          </>
        )}
      </button>
    </aside>
  );
};
