import React from 'react';
import { Bot, ShieldAlert, BookOpen, BarChart3, Sliders, GitPullRequest, Download, Scale } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingApprovalsCount: number;
  onExportAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  pendingApprovalsCount,
  onExportAll
}) => {
  const navItems = [
    { id: 'tribunal', label: 'Tribunal Audit', icon: Scale },
    { id: 'handbooks', label: '6 Handbooks', icon: BookOpen },
    { id: 'fleet', label: '10-Bot Console', icon: Bot },
    { 
      id: 'approvals', 
      label: pendingApprovalsCount > 0 ? `Human Gate (${pendingApprovalsCount})` : 'Human Gate', 
      icon: ShieldAlert,
      highlight: pendingApprovalsCount > 0
    },
    { id: 'economics', label: 'Economics & Capacity', icon: Sliders },
    { id: 'matrix', label: '12+12 Matrix', icon: BarChart3 },
    { id: 'portfolio', label: '4-Stage Roadmap', icon: GitPullRequest },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('handbooks')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap block">
                DecaFleet OS
              </span>
              <span className="text-xs text-slate-400 block -mt-0.5">
                Tri-Championship Agent Enterprise
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  } ${item.highlight ? 'text-amber-400 font-semibold' : ''}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onExportAll}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Export to Antigravity or Download Blueprint"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export / Antigravity</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-800/80 -mx-4 px-4 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap shrink-0 flex items-center gap-1 ${
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                } ${item.highlight ? 'text-amber-400' : ''}`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
