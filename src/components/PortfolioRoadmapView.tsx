import React, { useState } from 'react';
import { ShortTermScheduleView } from './ShortTermScheduleView.tsx';
import { PORTFOLIO_ROADMAP } from '../data/handbooks.ts';
import { evaluateExpansionGate } from '../utils/calculator.ts';
import {
  GitPullRequest,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sliders,
  XCircle,
  Cpu,
  Calendar,
  Layers
} from 'lucide-react';

interface PortfolioRoadmapViewProps {
  onSelectBusiness: (id: string) => void;
}

export const PortfolioRoadmapView: React.FC<PortfolioRoadmapViewProps> = ({ onSelectBusiness }) => {
  const [velocityMode, setVelocityMode] = useState<'blitz45' | 'days12' | 'legacy365'>('blitz45');
  const [roadmapViewMode, setRoadmapViewMode] = useState<'short_term' | 'macro_stages'>('short_term');

  // Interactive Expansion Gate Simulator state
  const [retainerClients, setRetainerClients] = useState<number>(3);
  const [deliveryCycles, setDeliveryCycles] = useState<number>(2);
  const [domErrorsPerDay, setDomErrorsPerDay] = useState<number>(0);
  const [currentWeeklyHours, setCurrentWeeklyHours] = useState<number>(9);

  const gateCheck = evaluateExpansionGate({
    activeVerticals: 1,
    currentRetainerClients: retainerClients,
    completedDeliveryCycles: deliveryCycles,
    unhandledDomErrorsPerDay: domErrorsPerDay,
    weeklySalesAndOpsHours: currentWeeklyHours,
    maxWeeklyHours: 20
  });

  const handleLoadPreset = (mode: 'premature' | 'ready') => {
    if (mode === 'premature') {
      setRetainerClients(1);
      setDeliveryCycles(0);
      setDomErrorsPerDay(4);
      setCurrentWeeklyHours(15);
    } else {
      setRetainerClients(3);
      setDeliveryCycles(2);
      setDomErrorsPerDay(0);
      setCurrentWeeklyHours(9);
    }
  };

  return (
    <div className="space-y-6">
      {/* View Switcher: Short-Term Operational Schedule vs 4-Stage Macro Architecture */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setRoadmapViewMode('short_term')}
          className={`px-4 py-2 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
            roadmapViewMode === 'short_term'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>Stage 1 Short-Term Schedule (Starting Today: Nov 2, 2026)</span>
        </button>
        <button
          onClick={() => setRoadmapViewMode('macro_stages')}
          className={`px-4 py-2 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
            roadmapViewMode === 'macro_stages'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 text-blue-400" />
          <span>4-Stage Long-Term Master Plan &amp; Expansion Gate</span>
        </button>
      </div>

      {roadmapViewMode === 'short_term' ? (
        <ShortTermScheduleView />
      ) : (
        <div className="space-y-6">
      {/* Intro Header + Velocity Mode Switcher */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-900">Section 18 Portfolio Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Tri-Championship 4-Stage Master Plan</span>
              <span aria-hidden="true">·</span>
              <span>Solo Operator (20h/Wk Cap)</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <GitPullRequest className="w-5 h-5 text-slate-800" />
              <span>Portfolio Sequencing: The 4-Stage DecaFleet Execution Master Plan</span>
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Synthesizing <strong>Ara - Grok's</strong> zero-login GC compliance wedge (Sub Radar + Trade Map Cross-Sell) with <strong>GPT_Buiness's</strong> corporate exception desks and <strong>Hermes + Stagehand + DBOS</strong> self-healing infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs shrink-0">
            <button
              onClick={() => setVelocityMode('blitz45')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                velocityMode === 'blitz45'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              60-Day Trigger Blitz
            </button>
            <button
              onClick={() => setVelocityMode('days12')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                velocityMode === 'days12'
                  ? 'bg-white text-rose-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              12-Day Stress Test
            </button>
            <button
              onClick={() => setVelocityMode('legacy365')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                velocityMode === 'legacy365'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Legacy 12-Mo View
            </button>
          </div>
        </div>
      </div>

      {/* Architect Pushback: Tech Clock vs. Buyer & Ops Clock */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            The Architect's Verdict: Why Stage 1 + Stage 2 Share the Exact Same Buyer List
          </h2>
          <span className="text-xs text-slate-500 font-mono">Zero-Login First · Dual-Clock Physics</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-emerald-50/50 border border-emerald-200/70 rounded-lg space-y-2">
            <div className="font-bold text-emerald-950 flex items-center justify-between">
              <span>1. Stage 1 Zero-Ban Wedge (Sub Radar)</span>
              <span className="font-mono text-[11px] text-emerald-800">24h Build · $0 API</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Instead of fighting LinkedIn/Amazon IP blocks on Day 1, <strong>Sub Radar (C1)</strong> queries public state contractor registries (CSLB, TDLR, DBPR). Zero client logins, zero 2FA interruptions, and immediate $149 Roster Audit cash that converts into $399/mo monitoring.
            </p>
          </div>

          <div className="p-4 bg-blue-50/50 border border-blue-200/70 rounded-lg space-y-2">
            <div className="font-bold text-blue-950 flex items-center justify-between">
              <span>2. Stage 2 Zero-CAC Cross-Sell (Trade Map)</span>
              <span className="font-mono text-[11px] text-blue-800">+$449/mo Upsell</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Launching a second business to a brand-new ICP doubles sales overhead. Instead, <strong>Trade Map Desk (P1)</strong> sells to the <em>exact same Commercial &amp; Trade Contractors</em> already paying for Sub Radar—lifting LTV from $399/mo to $848/mo with zero extra cold outreach.
            </p>
          </div>

          <div className="p-4 bg-slate-900 text-slate-100 rounded-lg space-y-2">
            <div className="font-bold text-amber-400 flex items-center justify-between">
              <span>3. Stage 3 &amp; 4 High-Ticket Scale (GPT + Hermes)</span>
              <span className="font-mono text-[11px] text-slate-300">$1k–$1.8k/mo Deals</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Once contractor cashflow hits $12k+ MRR, unlock <strong>Catalog Exception Desk (P2)</strong> at $1,000/mo and <strong>Fleet Collision Lab (C2)</strong> at $1,800/mo—backed by the <strong>Hermes + Stagehand + DBOS</strong> self-healing container stack.
            </p>
          </div>
        </div>
      </div>

      {/* Conditional Mode Warning if 12-Day Stress Test is Selected */}
      {velocityMode === 'days12' && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3 text-xs text-rose-900">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-sm">
              12-Day Multi-Launch Failure Mode Simulation Active
            </div>
            <p className="leading-relaxed">
              Attempting to launch Sub Radar on Day 1, Catalog Exception Desk on Day 4, and Fleet Collision Lab on Day 8 forces the single human operator to conduct cold sales across commercial GCs, Shopify Plus Merchandising Managers, and SaaS QA VPs simultaneously. Total human workload spikes to <strong>36.5 hours/week</strong> (violating the 20h constraint), while single-pointer fallback collisions stall uncalibrated browser workers.
            </p>
          </div>
        </div>
      )}

      {/* Visual 4-Stage Roadmap Sequence Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Stage 1 */}
        <div className="bg-white border-2 border-slate-900 rounded-lg p-5 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-slate-900 text-white rounded text-xs font-mono font-bold">
                {velocityMode === 'blitz45'
                  ? PORTFOLIO_ROADMAP.stage1.period
                  : velocityMode === 'days12'
                  ? 'Day 1 – Day 3'
                  : PORTFOLIO_ROADMAP.stage1.legacyPeriod}
              </span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-bold uppercase tracking-wider text-emerald-700">Stage 1 Wedge</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-700">Build: {PORTFOLIO_ROADMAP.stage1.techBuildTime}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                {PORTFOLIO_ROADMAP.stage1.name} (C1)
              </h2>
              <div className="text-xs font-mono font-semibold text-emerald-700 mt-1">
                Target: {PORTFOLIO_ROADMAP.stage1.mrrTarget}
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
              <strong>Why First:</strong> {PORTFOLIO_ROADMAP.stage1.singleReason}
            </p>

            <div className="p-2.5 bg-amber-50/60 border border-amber-200/70 rounded text-[11px] text-slate-800 font-mono">
              <strong>Unlock Gate 1:</strong> {PORTFOLIO_ROADMAP.stage1.unlockGate}
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Day 1–2: Train CSLB/TDLR/DBPR crawlers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Day 4: First $149 40-Sub Roster Audit sold</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Day 7–14: Convert to $399/mo retainers</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectBusiness('c1')}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open C1 Sub Radar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stage 2 */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded text-xs font-mono font-bold">
                {velocityMode === 'blitz45'
                  ? PORTFOLIO_ROADMAP.stage2.period
                  : velocityMode === 'days12'
                  ? 'Day 4 – Day 6'
                  : PORTFOLIO_ROADMAP.stage2.legacyPeriod}
              </span>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-bold uppercase tracking-wider text-blue-700">Stage 2 Cross-Sell</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-700">Build: {PORTFOLIO_ROADMAP.stage2.techBuildTime}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                {PORTFOLIO_ROADMAP.stage2.name} (P1)
              </h2>
              <div className="text-xs font-mono font-semibold text-emerald-700 mt-1">
                Target: {PORTFOLIO_ROADMAP.stage2.mrrTarget}
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
              <strong>Why Second:</strong> {PORTFOLIO_ROADMAP.stage2.singleReason}
            </p>

            <div className="p-2.5 bg-amber-50/60 border border-amber-200/70 rounded text-[11px] text-slate-800 font-mono">
              <strong>Unlock Gate 2:</strong> {PORTFOLIO_ROADMAP.stage2.unlockGate}
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Day 15–16: Train GBP &amp; 40-directory auditors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Day 20: Upsell existing Sub Radar GCs (+$449/mo)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Day 25: Add Claude P3 $75 Metadata Audits</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectBusiness('p1')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open P1 Trade Map Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stage 3 */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded text-xs font-mono font-bold">
                {velocityMode === 'blitz45'
                  ? PORTFOLIO_ROADMAP.stage3.period
                  : velocityMode === 'days12'
                  ? 'Day 7 – Day 9'
                  : PORTFOLIO_ROADMAP.stage3.legacyPeriod}
              </span>
              <Award className="w-4 h-4 text-purple-600" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-bold uppercase tracking-wider text-purple-700">Stage 3 Corporate</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-700">Build: {PORTFOLIO_ROADMAP.stage3.techBuildTime}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                {PORTFOLIO_ROADMAP.stage3.name} (P2)
              </h2>
              <div className="text-xs font-mono font-semibold text-emerald-700 mt-1">
                Target: {PORTFOLIO_ROADMAP.stage3.mrrTarget}
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
              <strong>Why Third:</strong> {PORTFOLIO_ROADMAP.stage3.singleReason}
            </p>

            <div className="p-2.5 bg-amber-50/60 border border-amber-200/70 rounded text-[11px] text-slate-800 font-mono">
              <strong>Unlock Gate 3:</strong> {PORTFOLIO_ROADMAP.stage3.unlockGate}
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Day 31–33: Deploy FeedScout &amp; MarginGuard</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Day 36: Close $299 500-SKU Exception Triage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Day 42: Convert to $1,000/mo Core Desk</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectBusiness('p2')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open P2 Catalog Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stage 4 */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded text-xs font-mono font-bold">
                {velocityMode === 'blitz45'
                  ? PORTFOLIO_ROADMAP.stage4.period
                  : velocityMode === 'days12'
                  ? 'Day 10 – Day 12'
                  : PORTFOLIO_ROADMAP.stage4.legacyPeriod}
              </span>
              <Cpu className="w-4 h-4 text-emerald-600" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-bold uppercase tracking-wider text-slate-700">Stage 4 Ceiling</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-700">Build: {PORTFOLIO_ROADMAP.stage4.techBuildTime}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                {PORTFOLIO_ROADMAP.stage4.name} (C2 + C3)
              </h2>
              <div className="text-xs font-mono font-semibold text-emerald-700 mt-1">
                Target: {PORTFOLIO_ROADMAP.stage4.mrrTarget}
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
              <strong>Why Fourth:</strong> {PORTFOLIO_ROADMAP.stage4.singleReason}
            </p>

            <div className="p-2.5 bg-amber-50/60 border border-amber-200/70 rounded text-[11px] text-slate-800 font-mono">
              <strong>Scale Architecture:</strong> {PORTFOLIO_ROADMAP.stage4.unlockGate}
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Migrate runtime to Hermes + Stagehand + DBOS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Launch C2 Fleet Collision Lab ($1,800/mo)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Add C3 Seat Sniper &amp; GovDesk ($400–$1,500/mo)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectBusiness('c2')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open C2 Collision Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Expansion Gate Readiness Simulator */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-slate-700" />
              <span>Live Expansion Gate Diagnostic (When Should You Unlock the Next Stage?)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Test whether your current vertical is ready for expansion or if adding the next stage today will break your 20h/wk operator ceiling.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleLoadPreset('premature')}
              className="px-2.5 py-1 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 cursor-pointer"
            >
              Simulate Day-3 Premature Jump
            </button>
            <button
              onClick={() => handleLoadPreset('ready')}
              className="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 cursor-pointer"
            >
              Simulate Day-14 Gate Cleared
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sliders */}
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="font-semibold text-slate-700">Active Paying Retainer Clients (Current Stage):</label>
                <span className="font-mono font-bold text-slate-900">{retainerClients} Clients</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={retainerClients}
                onChange={(e) => setRetainerClients(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="font-semibold text-slate-700">Completed Weekly Autonomous Delivery Cycles:</label>
                <span className="font-mono font-bold text-slate-900">{deliveryCycles} Cycles ({deliveryCycles * 7} Days)</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                value={deliveryCycles}
                onChange={(e) => setDeliveryCycles(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="font-semibold text-slate-700">Unhandled DOM / Proxy Errors Per Day:</label>
                <span className="font-mono font-bold text-slate-900">{domErrorsPerDay} Errors/Day</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={domErrorsPerDay}
                onChange={(e) => setDomErrorsPerDay(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="font-semibold text-slate-700">Current Weekly Operator Hours (Sales + QA):</label>
                <span className="font-mono font-bold text-slate-900">{currentWeeklyHours}h / 20h Cap</span>
              </div>
              <input
                type="range"
                min="4"
                max="20"
                value={currentWeeklyHours}
                onChange={(e) => setCurrentWeeklyHours(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>
          </div>

          {/* Diagnostic Result */}
          <div className={`p-5 rounded-lg border flex flex-col justify-between ${
            gateCheck.canExpandNow
              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
              : 'bg-rose-50/60 border-rose-200 text-rose-950'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold tracking-wider">
                  Expansion Gate Status
                </span>
                <span className="text-xs font-mono font-bold">
                  Projected Load: {gateCheck.projectedHours}h / 20h Cap
                </span>
              </div>

              <div className="text-lg font-bold flex items-center gap-2">
                {gateCheck.canExpandNow ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>GATE OPEN: Deploy Next Stage Fleet Now</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>GATE LOCKED: Do Not Launch Next Stage Yet</span>
                  </>
                )}
              </div>

              {gateCheck.canExpandNow ? (
                <p className="text-xs leading-relaxed text-emerald-900">
                  Your current stage has validated cash demand, survived {deliveryCycles} full weekly autonomous delivery cycles without DOM selector drift, and leaves {20 - currentWeeklyHours}h/week of operator bandwidth to execute the next stage launch.
                </p>
              ) : (
                <div className="space-y-1.5 text-xs">
                  <div className="font-semibold">Active Blockers Preventing Premature Expansion:</div>
                  <ul className="space-y-1 list-disc list-inside text-rose-900">
                    {gateCheck.blockers.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono">
              <span>Stagehand + DBOS Build Time: 24–48 Hours</span>
              <span>
                {gateCheck.canExpandNow
                  ? 'Ready for immediate deployment'
                  : `Est. Stabilization Window: ~${gateCheck.recommendedWaitDays} Days`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 24-Hour VM Cluster Multiplexing */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-700" />
          <span>24-Hour VM Cluster Time-Multiplexing (38,400 Browser-Minutes/Month Budget)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-900 block font-mono">00:00 – 06:00 EST · Night Shift (C1 &amp; C3)</span>
            <p className="text-slate-600 leading-relaxed">
              <strong>Sub Radar (C1)</strong> and <strong>Seat Sniper (C3)</strong> poll state licensing boards (CSLB, TDLR, DBPR) and municipal inspection release windows at midnight when government databases refresh batch records.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-900 block font-mono">06:00 – 14:00 EST · Morning Shift (P2 &amp; P1)</span>
            <p className="text-slate-600 leading-relaxed">
              <strong>Catalog Exception Desk (P2)</strong> audits Shopify/Merchant Center feeds before morning ad spend peaks, while <strong>Trade Map Desk (P1)</strong> runs 40-directory NAP citation sweeps.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-900 block font-mono">14:00 – 22:00 EST · Afternoon Shift (C2 &amp; P3)</span>
            <p className="text-slate-600 leading-relaxed">
              <strong>Fleet Collision Lab (C2)</strong> executes synchronized 8-worker staging race-condition suites for SaaS engineering teams, and <strong>No-Login Funnel Desk (P3)</strong> captures unauthenticated checkout diffs.
            </p>
          </div>
        </div>
      </div>
        </div>
      )}
    </div>
  );
};
