'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
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
  { href: '/',            label: 'Mission Control',    icon: Compass,    color: 'text-mars-orange' },
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
        collapsed ? 'w-14' : 'w-52'
      }`}
    >
      {/* Nav Header Label */}
      {!collapsed && (
        <div className="px-3 pt-3 pb-1 text-[10px] uppercase tracking-wider text-gray-500 font-mono font-bold flex items-center justify-between">
          <span>NAVIGATION</span>
          <span className="text-mars-orange text-[9px]">ARES V</span>
        </div>
      )}

      {/* Nav Items — all open in the same tab */}
      <nav className="flex flex-col gap-1 p-2 flex-1 pt-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon, color }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={`group flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-xs font-mono font-medium transition-all duration-150 relative ${
                isActive
                  ? 'bg-mars-red/30 border border-mars-red/60 text-white shadow-inner font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-mars-dark border border-transparent hover:border-mars-border'
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-mars-red rounded-r-full" />
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
        className="flex items-center justify-center p-2 m-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-mars-dark border border-transparent hover:border-mars-border transition-all text-xs font-mono gap-1.5"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-[10px] tracking-wider">COLLAPSE</span>
          </>
        )}
      </button>
    </aside>
  );
};
