import React from 'react';
import {
  Terminal,
  BookOpen,
  Cpu,
  ShieldAlert,
  Calculator,
  Layers,
  Code2,
  Zap,
  Activity,
  PanelRightOpen,
  PanelRightClose
} from 'lucide-react';

export type ActiveTab =
  | 'launchpad'
  | 'handbooks'
  | 'fleet'
  | 'health'
  | 'approvals'
  | 'economics'
  | 'portfolio';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingApprovalsCount: number;
  onExportAll: () => void;
  isHealthSidebarOpen: boolean;
  onToggleHealthSidebar: () => void;
  botHealthSummary: {
    healthyBots: number;
    totalBots: number;
    avgUptimePercent: number;
    overallStatus: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL';
  };
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  pendingApprovalsCount,
  onExportAll,
  isHealthSidebarOpen,
  onToggleHealthSidebar,
  botHealthSummary
}) => {
  const navItems: {
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: number;
    liveBadge?: string;
  }[] = [
    { id: 'launchpad', label: 'Stage 1: Sub Radar Live', icon: Zap },
    { id: 'handbooks', label: 'Operating Handbooks (6)', icon: BookOpen },
    { id: 'fleet', label: '10-Bot Fleet & Scheduler', icon: Cpu },
    {
      id: 'health',
      label: 'Bot Health',
      icon: Activity,
      liveBadge: `${botHealthSummary.healthyBots}/${botHealthSummary.totalBots}`
    },
    { id: 'approvals', label: 'Jev-AI Human Gate', icon: ShieldAlert, badge: pendingApprovalsCount },
    { id: 'economics', label: 'MRR & Browser Budget', icon: Calculator },
    { id: 'portfolio', label: '4-Stage Roadmap & Gate', icon: Layers }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          {/* Brand Identity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs">
                <Terminal className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold tracking-tight text-slate-900">
                    DecaFleet OS
                  </h1>
                  <span className="text-[11px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
                    SOVEREIGN EXECUTION · JEV-AI GATED
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  10-Bot Browser Cluster · Stage 1 Sub Radar ($399/mo) &rarr; Stage 4 Enterprise ($32.5k+ MRR)
                </p>
              </div>
            </div>
          </div>

          {/* Right Zone: Live Bot Health Overlay Drawer Toggle & Antigravity Export */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={onToggleHealthSidebar}
              aria-label="Toggle Persistent Bot Health Sidebar"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                isHealthSidebarOpen
                  ? 'bg-emerald-950 text-emerald-200 border-emerald-700'
                  : botHealthSummary.overallStatus === 'OPTIMAL'
                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  botHealthSummary.overallStatus === 'OPTIMAL'
                    ? 'bg-emerald-500 animate-pulse'
                    : 'bg-amber-500 animate-ping'
                }`}
              />
              <span className="font-mono font-bold">
                {botHealthSummary.healthyBots}/{botHealthSummary.totalBots} Bots ·{' '}
                {botHealthSummary.avgUptimePercent}%
              </span>
              {isHealthSidebarOpen ? (
                <PanelRightClose className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <PanelRightOpen className="w-3.5 h-3.5 text-emerald-700" />
              )}
            </button>

            <button
              onClick={onExportAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer shadow-xs"
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export Blueprint</span>
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar -mb-px pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex items-center gap-2 px-3.5 py-2.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/40'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span>{item.label}</span>
                {item.liveBadge && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      botHealthSummary.overallStatus === 'OPTIMAL'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.liveBadge}
                  </span>
                )}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
