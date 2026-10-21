import React, { useState } from 'react';
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
  XCircle
} from 'lucide-react';

interface PortfolioRoadmapViewProps {
  onSelectBusiness: (id: string) => void;
}

export const PortfolioRoadmapView: React.FC<PortfolioRoadmapViewProps> = ({ onSelectBusiness }) => {
  const [velocityMode, setVelocityMode] = useState<'blitz45' | 'days12' | 'legacy365'>('blitz45');

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
      {/* Intro Header + Velocity Mode Switcher */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-900">Section 18 Portfolio Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Dual-Clock Trigger-Gate Execution</span>
              <span aria-hidden="true">·</span>
              <span>Solo Operator (20h/Wk Cap)</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <GitPullRequest className="w-5 h-5 text-slate-800" />
              <span>Portfolio Sequencing: The Dual-Clock Velocity Model</span>
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              In 2026, static 6-to-12-month calendars are dead—and launching 3 separate B2B businesses in 12 days is operational suicide. Sequence expansion strictly by <strong>State-Gate Triggers</strong>.
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
              45-Day Trigger Blitz
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
            The Architect's Verdict: Why "6–12 Months" Is Dead &amp; Why "3/6/12 Days" Fails
          </h2>
          <span className="text-xs text-slate-500 font-mono">Dual-Clock Physics</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-emerald-50/50 border border-emerald-200/70 rounded-lg space-y-2">
            <div className="font-bold text-emerald-950 flex items-center justify-between">
              <span>1. Where You Are 100% Right: The Tech Clock</span>
              <span className="font-mono text-[11px] text-emerald-800">36–48 Hours</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Waiting 90 or 180 days to build a second agent fleet in 2026 is absurd. Standing up a 10-bot browser workflow by demonstration takes <strong>36 to 48 hours</strong>, not 3 months. Platform anti-bot defenses and LLM capabilities mutate every 30 days—a static 12-month technical plan is obsolete before Month 2.
            </p>
          </div>

          <div className="p-4 bg-rose-50/50 border border-rose-200/70 rounded-lg space-y-2">
            <div className="font-bold text-rose-950 flex items-center justify-between">
              <span>2. Where I Push Back: The Buyer &amp; Ops Clock</span>
              <span className="font-mono text-[11px] text-rose-800">14-Day Minimum</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Bots compress <em>software build time</em> to hours, but they do <strong>not</strong> compress human B2B procurement trust, commercial HVAC estimator call schedules, or churn validation into 72 hours. Launching 3 different ICPs in 12 days means running 3 cold outbound campaigns, 3 sales calendars, and debugging 3 sets of broken DOM selectors at once—shattering the 20h/week human limit (34h+ required) with $0 stabilized MRR.
            </p>
          </div>

          <div className="p-4 bg-slate-900 text-slate-100 rounded-lg space-y-2">
            <div className="font-bold text-amber-400 flex items-center justify-between">
              <span>3. The Synthesis: Trigger-Gated Sprints</span>
              <span className="font-mono text-[11px] text-slate-300">Day 14 &amp; Day 30</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Replace calendar months with <strong>State-Gate Triggers</strong>. You build Fleet #1 in 36 hours, collect first cash by Day 7, and run <strong>2 weekly autonomous delivery cycles (Days 7–14)</strong> to prove zero DOM breakage. The exact day Gate 1 clears (Day 15), you spin up Fleet #2 in 48 hours.
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
              Attempting to launch P2 on Day 1, C1 on Day 4, and C2 on Day 8 forces the single human operator to conduct cold sales across SaaS VPs, blue-collar municipal painters, and enterprise DTC CMOs simultaneously. Total human workload spikes to <strong>36.5 hours/week</strong> (violating the 20h constraint), while all 10 browser slots collide during daytime scraping before night-shift scheduling is calibrated.
            </p>
          </div>
        </div>
      )}

      {/* Visual Roadmap Sequence Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stage 1 */}
        <div className="bg-white border-2 border-slate-900 rounded-lg p-6 space-y-4 shadow-sm relative">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 bg-slate-900 text-white rounded text-xs font-mono font-bold">
              {velocityMode === 'blitz45'
                ? PORTFOLIO_ROADMAP.stage1.period
                : velocityMode === 'days12'
                ? 'Day 1 – Day 3 (Premature)'
                : PORTFOLIO_ROADMAP.stage1.legacyPeriod}
            </span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold uppercase tracking-wider">Start First</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-700">Tech Build: {PORTFOLIO_ROADMAP.stage1.techBuildTime}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {PORTFOLIO_ROADMAP.stage1.name} (P2)
            </h2>
            <div className="text-xs font-mono font-semibold text-emerald-700 mt-1">
              Target: {PORTFOLIO_ROADMAP.stage1.mrrTarget}
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
            <strong>The Single Reason:</strong> {PORTFOLIO_ROADMAP.stage1.singleReason}
          </p>

          <div className="p-2.5 bg-amber-50/60 border border-amber-200/70 rounded text-[11px] text-slate-800 font-mono">
            <strong>Exit Gate to Stage 2:</strong> {PORTFOLIO_ROADMAP.stage1.unlockGate}
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Day 1–2: Build JobSpy &amp; PeopleFind skills (36h)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Day 6–7: First $1,000 cash collected via Stripe</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Day 8–14: Prove 2 autonomous delivery cycles</span>
            </div>
          </div>

          <button
            onClick={() => onSelectBusiness('p2')}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open P2 Handbook</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stage 2 */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded text-xs font-mono font-bold">
              {velocityMode === 'blitz45'
                ? PORTFOLIO_ROADMAP.stage2.period
                : velocityMode === 'days12'
                ? 'Day 4 – Day 7 (Overload)'
                : PORTFOLIO_ROADMAP.stage2.legacyPeriod}
            </span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold uppercase tracking-wider">Unlock on Gate 1</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-700">Tech Build: {PORTFOLIO_ROADMAP.stage2.techBuildTime}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {PORTFOLIO_ROADMAP.stage2.name} (C1)
            </h2>
            <div className="text-xs font-mono font-semibold text-emerald-700 mt-1">
              Target: {PORTFOLIO_ROADMAP.stage2.mrrTarget}
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
            <strong>The Single Reason:</strong> {PORTFOLIO_ROADMAP.stage2.singleReason}
          </p>

          <div className="p-2.5 bg-amber-50/60 border border-amber-200/70 rounded text-[11px] text-slate-800 font-mono">
            <strong>Exit Gate to Stage 3:</strong> {PORTFOLIO_ROADMAP.stage2.unlockGate}
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Day 15–16: Train ASP.NET portal traverser (48h)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Day 21: First $1,800/mo trade contractor signed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Day 22–30: Stabilize Tesseract OCR spec parser</span>
            </div>
          </div>

          <button
            onClick={() => onSelectBusiness('c1')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open C1 Handbook</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stage 3 */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded text-xs font-mono font-bold">
              {velocityMode === 'blitz45'
                ? PORTFOLIO_ROADMAP.stage3.period
                : velocityMode === 'days12'
                ? 'Day 8 – Day 12 (Collision)'
                : PORTFOLIO_ROADMAP.stage3.legacyPeriod}
            </span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold uppercase tracking-wider">Unlock on Gate 2</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-700">Tech Build: {PORTFOLIO_ROADMAP.stage3.techBuildTime}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {PORTFOLIO_ROADMAP.stage3.name} (C2)
            </h2>
            <div className="text-xs font-mono font-semibold text-emerald-700 mt-1">
              Target: {PORTFOLIO_ROADMAP.stage3.mrrTarget}
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
            <strong>The Single Reason:</strong> {PORTFOLIO_ROADMAP.stage3.singleReason}
          </p>

          <div className="p-2.5 bg-amber-50/60 border border-amber-200/70 rounded text-[11px] text-slate-800 font-mono">
            <strong>Scale Architecture:</strong> {PORTFOLIO_ROADMAP.stage3.unlockGate}
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Day 31–32: Deploy 00:00–06:00 geo-proxy bots</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Day 37: Close first $2,500/mo brand defense deal</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Day 45–60: Cross $30k MRR with &lt;15 total clients</span>
            </div>
          </div>

          <button
            onClick={() => onSelectBusiness('c2')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open C2 Handbook</span>
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
              <span>Live Expansion Gate Diagnostic (When Should You Launch the Next Vertical?)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Test whether your current vertical is ready for expansion or if adding a second business today will break your 20h/wk operator ceiling.
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
                <label className="font-semibold text-slate-700">Active Paying Retainer Clients (Current Vertical):</label>
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
                    <span>GATE OPEN: Deploy Next 48h Bot Fleet Now</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>GATE LOCKED: Do Not Launch Next Vertical Yet</span>
                  </>
                )}
              </div>

              {gateCheck.canExpandNow ? (
                <p className="text-xs leading-relaxed text-emerald-900">
                  Your current vertical has validated cash demand, survived {deliveryCycles} full weekly autonomous delivery cycles without DOM selector drift, and leaves {20 - currentWeeklyHours}h/week of operator bandwidth to execute cold outreach for the next vertical.
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
              <span>Tech Fleet Build Time: 48 Hours</span>
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
          <span>24-Hour VM Cluster Time-Multiplexing (How 10 Bots Run All 3 Businesses)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-900 block font-mono">00:00 – 06:00 EST · Night Shift (C2)</span>
            <p className="text-slate-600 leading-relaxed">
              <strong>TrafficReclaim (C2)</strong> occupies 6 browser slots using residential geo-proxies when rogue affiliates day-part their trademark hijacks. Zero contention with daytime B2B scraping.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-900 block font-mono">06:00 – 12:00 EST · Morning Shift (C1)</span>
            <p className="text-slate-600 leading-relaxed">
              <strong>GovDesk (C1)</strong> crawls 40 municipal ASP.NET portals as county clerks post morning RFPs, parsing PDF specs and prepping estimator alerts by 11:30 AM.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-900 block font-mono">12:00 – 20:00 EST · Afternoon Shift (P2)</span>
            <p className="text-slate-600 leading-relaxed">
              <strong>IntentPipe (P2)</strong> harvests job boards, resolves decision-makers, verifies SMTP handshakes, and syncs enriched dossiers to client CRMs before the next morning's outbound send.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
