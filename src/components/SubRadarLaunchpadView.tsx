import React, { useState } from 'react';
import {
  SUB_RADAR_LIVE_ROSTER,
  HERMES_STACK_SPEC
} from '../data/subRadarRoster.ts';
import { ApprovalItem } from '../types/index.ts';
import {
  ShieldCheck,
  AlertTriangle,
  Cpu,
  ArrowRight,
  Copy,
  Check,
  Send,
  Zap,
  Layers
} from 'lucide-react';

interface SubRadarLaunchpadViewProps {
  onSelectBusiness: (businessId: string) => void;
  onAddApprovalItem: (item: ApprovalItem) => void;
  onNavigateToApprovals: () => void;
  onNavigateToRoadmap: () => void;
}

export const SubRadarLaunchpadView: React.FC<SubRadarLaunchpadViewProps> = ({
  onSelectBusiness,
  onAddApprovalItem,
  onNavigateToApprovals,
  onNavigateToRoadmap
}) => {
  const [stateFilter, setStateFilter] = useState<string>('ALL');
  const [copiedStack, setCopiedStack] = useState<boolean>(false);
  const [dispatchedAlertIds, setDispatchedAlertIds] = useState<string[]>([]);

  const filteredSubs = SUB_RADAR_LIVE_ROSTER.filter((s) =>
    stateFilter === 'ALL' ? true : s.stateBoard.includes(stateFilter)
  );

  const handleDispatchSubRadarAlert = (sub: (typeof SUB_RADAR_LIVE_ROSTER)[0]) => {
    const newItem: ApprovalItem = {
      id: `subradar-${sub.id}-${Date.now()}`,
      businessId: 'c1',
      botName: 'Dispatch-01 (Sub Radar)',
      title: `CSLB/State Registry Stop-Work Alert: ${sub.subcontractorName} (${sub.licenseNumber})`,
      summary:
        sub.liabilityAlert ||
        `Public state board diff detected status change for ${sub.subcontractorName}. Gate: Operator approval before sending $149 Audit / $399 Retainer alert to General Contractor.`,
      artifactType: 'compliance_alert',
      dataPayload: {
        subcontractor: sub.subcontractorName,
        trade: sub.trade,
        stateRegistry: sub.stateBoard,
        licenseNumber: sub.licenseNumber,
        licenseStatus: sub.licenseStatus,
        bondStatus: sub.bondStatus,
        workersComp: sub.workersComp,
        offerWedge: '$149 40-Sub Roster Audit -> $399/mo Daily Sub Radar Retainer'
      },
      timestamp: new Date().toLocaleTimeString(),
      status: 'pending'
    };
    onAddApprovalItem(newItem);
    setDispatchedAlertIds((prev) => [...prev, sub.id]);
  };

  const stackYaml = `# DecaFleet-OS Sovereign Production Stack
# Architecture: Hermes Agent + Stagehand + LiteLLM + DBOS + invisible_playwright_mcp
version: "3.9"
services:
  litellm-router:
    image: ghcr.io/berriai/litellm:main-latest
    ports: ["4000:4000"]
    environment:
      - OPENROUTER_API_KEY=\${OPENROUTER_API_KEY}
      - LITELLM_MASTER_KEY=sk-decafleet-sovereign
    command: ["--config", "/app/litellm_config.yaml", "--detailed_debug"]

  dbos-state-engine:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: decafleet_dbos
      POSTGRES_USER: operator
      POSTGRES_PASSWORD: sovereign_local_only
    volumes:
      - ./shared/dbos_data:/var/lib/postgresql/data

  stagehand-stealth-workers:
    build: ./workers/stagehand-invisible-dots
    environment:
      - LITELLM_PROXY_URL=http://litellm-router:4000
      - DBOS_DATABASE_URL=postgresql://operator:sovereign_local_only@dbos-state-engine:5432/decafleet_dbos
      - MAX_CONCURRENT_LANES=8 # 38,400 browser-min/month capacity (2 hot-spare lanes)
      - SINGLE_POINTER_FALLBACK_LOCK=false
      - HUMAN_PERMISSION_BROKER_WEBHOOK=http://localhost:3000/api/jev-ai/evaluate`;

  const handleCopyStack = () => {
    navigator.clipboard.writeText(stackYaml);
    setCopiedStack(true);
    setTimeout(() => setCopiedStack(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Stage 1 Hero Command Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-6 border border-slate-800 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
              <Zap className="w-4 h-4" />
              <span>STAGE 1 EXECUTION LAUNCHPAD · ZERO-CREDENTIAL PUBLIC REGISTRY WEDGE</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              DecaFleet-OS Sovereign Execution Command Center
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Immediate execution engine starting with{' '}
              <strong className="text-emerald-400">C1: Sub Radar ($149 Audit &rarr; $399/mo GC Retainer)</strong>, expanding into{' '}
              <strong className="text-white">P1: Trade Map Desk (+$449/mo Zero-CAC Cross-Sell)</strong>,{' '}
              <strong className="text-white">P2: Catalog Exception Desk ($1,000/mo)</strong>, and{' '}
              <strong className="text-amber-300">C2/C3 Enterprise QA &amp; Municipal Auto-Desk</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectBusiness('c1')}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Open C1: Sub Radar Handbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateToRoadmap}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>View 4-Stage Execution Roadmap</span>
            </button>
          </div>
        </div>

        {/* 4-Stage Execution Sequence Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-5">
          <div
            onClick={() => onSelectBusiness('c1')}
            className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-500/40 cursor-pointer hover:border-emerald-400 transition-colors"
          >
            <div className="text-xs font-mono text-emerald-400 font-semibold">
              STAGE 1 · WEEKS 1–4 ($4k+ MRR)
            </div>
            <div className="text-base font-bold text-white mt-0.5">C1: Sub Radar</div>
            <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">
              Queries <strong>100% public state contractor licensing boards (CSLB, TDLR, DBPR)</strong>. Zero client credentials, zero logins, zero ban risk. $149 Audit &rarr; $399/mo GC retainer.
            </p>
          </div>

          <div
            onClick={() => onSelectBusiness('p1')}
            className="p-4 rounded-lg bg-slate-800/90 border border-slate-700 cursor-pointer hover:border-slate-500 transition-colors"
          >
            <div className="text-xs font-mono text-sky-400 font-semibold">
              STAGE 2 · MONTHS 2–3 ($15k+ MRR)
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              P1: Trade Map + P3: Funnel Desk
            </div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Zero-CAC cross-sell of <strong>Trade Map Desk ($449/mo)</strong> to existing Sub Radar GCs + <strong>$75 No-Login Funnel &amp; Metadata Audits (P3)</strong>.
            </p>
          </div>

          <div
            onClick={() => onSelectBusiness('p2')}
            className="p-4 rounded-lg bg-slate-800/90 border border-slate-700 cursor-pointer hover:border-slate-500 transition-colors"
          >
            <div className="text-xs font-mono text-amber-400 font-semibold">
              STAGE 3 · MONTHS 4–6 ($25k+ MRR)
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              P2: Catalog Exception Desk
            </div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Corporate Shopify Plus / GMC feed exception resolution at <strong>$1,000/mo</strong> using exported CSV feeds and storefront DOM diffs.
            </p>
          </div>

          <div
            onClick={() => onSelectBusiness('c2')}
            className="p-4 rounded-lg bg-slate-800/90 border border-slate-700 cursor-pointer hover:border-slate-500 transition-colors"
          >
            <div className="text-xs font-mono text-purple-400 font-semibold">
              STAGE 4 · MONTH 6+ ($32.5k+ MRR)
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              C2: Collision Lab + C3: Seat Sniper
            </div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              8-lane multi-agent checkout collision QA (<strong>$1,800/mo</strong>) + 15-minute municipal inspection slot &amp; micro-RFP sniper (<strong>$400–$1,400/mo</strong>).
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: Interactive "Sub Radar" Public Registry Monitor */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>STAGE 1 LIVE OPERATIONS · C1 SUB RADAR REGISTRY MONITOR</span>
            </div>
            <h2 className="text-base font-bold mt-0.5">
              1. Zero-Credential Public State Contractor Registry Diff (CSLB · TDLR · DBPR)
            </h2>
            <p className="text-xs text-slate-300">
              BoardScout-01–04 daily public state licensing board poll for a General Contractor&apos;s 40-subcontractor roster. Queue any breach directly to the Jev-AI Human Gate.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {['ALL', 'CSLB', 'TDLR', 'DBPR'].map((st) => (
              <button
                key={st}
                onClick={() => setStateFilter(st)}
                className={`px-2.5 py-1 text-xs font-mono font-semibold rounded cursor-pointer ${
                  stateFilter === st
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">Subcontractor Entity</th>
                <th className="py-3 px-3">Trade</th>
                <th className="py-3 px-3">State Board &amp; License #</th>
                <th className="py-3 px-3">License Status</th>
                <th className="py-3 px-3">Surety Bond</th>
                <th className="py-3 px-3">Workers-Comp</th>
                <th className="py-3 px-4 text-right">Jev-AI Gate Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredSubs.map((sub) => {
                const hasBreach = Boolean(sub.liabilityAlert);
                const isDispatched = dispatchedAlertIds.includes(sub.id);
                return (
                  <React.Fragment key={sub.id}>
                    <tr className={hasBreach ? 'bg-rose-50/40' : 'hover:bg-slate-50'}>
                      <td className="py-3 px-4 font-bold text-slate-900">{sub.subcontractorName}</td>
                      <td className="py-3 px-3 text-slate-600">{sub.trade}</td>
                      <td className="py-3 px-3 font-mono text-slate-700">
                        {sub.stateBoard} · {sub.licenseNumber}
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold">
                        <span
                          className={
                            sub.licenseStatus === 'ACTIVE' ? 'text-emerald-700' : 'text-rose-700'
                          }
                        >
                          {sub.licenseStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold">
                        <span
                          className={
                            sub.bondStatus.includes('ACTIVE') ? 'text-emerald-700' : 'text-rose-700'
                          }
                        >
                          {sub.bondStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold">
                        <span
                          className={
                            sub.workersComp === 'VERIFIED' ? 'text-emerald-700' : 'text-amber-700'
                          }
                        >
                          {sub.workersComp}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {hasBreach ? (
                          isDispatched ? (
                            <button
                              onClick={onNavigateToApprovals}
                              className="px-2.5 py-1 bg-amber-100 text-amber-900 font-semibold rounded text-[11px] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                              <span>Queued in Jev-AI Gate &rarr;</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDispatchSubRadarAlert(sub)}
                              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded text-[11px] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Send className="w-3 h-3" />
                              <span>Queue $149 Audit Alert</span>
                            </button>
                          )
                        ) : (
                          <span className="text-slate-400 font-mono">Compliant</span>
                        )}
                      </td>
                    </tr>
                    {sub.liabilityAlert && (
                      <tr className="bg-rose-50/70 border-b border-rose-200">
                        <td colSpan={7} className="py-2 px-4 text-xs text-rose-900 flex items-center gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>{sub.liabilityAlert}</span>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Production Engineering Stack (Hermes + LiteLLM + Stagehand + DBOS) */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <Cpu className="w-4 h-4 text-slate-800" />
              <span>PRODUCTION CONTAINER ORCHESTRATION RUNTIME</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              2. {HERMES_STACK_SPEC.architectureName}
            </h2>
          </div>

          <button
            onClick={handleCopyStack}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md flex items-center gap-1.5 cursor-pointer self-start"
          >
            {copiedStack ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedStack ? 'Copied docker-compose.yml' : 'Copy Stack docker-compose.yml'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HERMES_STACK_SPEC.layers.map((l, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <div className="text-xs font-bold text-slate-900">{l.layer}</div>
              <div className="text-xs font-mono text-emerald-700 font-semibold">{l.tool}</div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">{l.role}</p>
            </div>
          ))}
        </div>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed">
          {stackYaml}
        </pre>
      </div>
    </div>
  );
};
