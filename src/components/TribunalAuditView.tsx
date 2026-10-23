import React, { useState } from 'react';
import {
  TRIBUNAL_CONTENDERS,
  SUB_RADAR_LIVE_ROSTER,
  HERMES_STACK_SPEC
} from '../data/tribunal.ts';
import { ApprovalItem } from '../types/index.ts';
import {
  Award,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Cpu,
  ArrowRight,
  Copy,
  Check,
  Send
} from 'lucide-react';

interface TribunalAuditViewProps {
  onSelectBusiness: (businessId: string) => void;
  onAddApprovalItem: (item: ApprovalItem) => void;
  onNavigateToApprovals: () => void;
}

export const TribunalAuditView: React.FC<TribunalAuditViewProps> = ({
  onSelectBusiness,
  onAddApprovalItem,
  onNavigateToApprovals
}) => {
  const [selectedContenderId, setSelectedContenderId] = useState<string>('ara-grok');
  const [stateFilter, setStateFilter] = useState<string>('ALL');
  const [copiedStack, setCopiedStack] = useState<boolean>(false);
  const [dispatchedAlertIds, setDispatchedAlertIds] = useState<string[]>([]);

  const selectedContender =
    TRIBUNAL_CONTENDERS.find((c) => c.id === selectedContenderId) || TRIBUNAL_CONTENDERS[1];

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
      artifactType: 'email_draft',
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

  const stackYaml = `# DecaFleet-OS Sovereign Production Stack (GPT_AI-Agent-Market-Research 100/100 Spec)
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
      - HUMAN_PERMISSION_BROKER_WEBHOOK=http://localhost:3000/api/gate`;

  const handleCopyStack = () => {
    navigator.clipboard.writeText(stackYaml);
    setCopiedStack(true);
    setTimeout(() => setCopiedStack(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-6 border border-slate-800 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
              <Award className="w-4 h-4" />
              <span>DOCUMENT ID: AUDIT-DECAFLEET-2026-10-21-REV2 · APEX-RONIN SWARM TRIBUNAL</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              The Competition Tribunal &amp; Tri-Championship Synthesis
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Forensic audit of all 7 contender architectures, integrating{' '}
              <strong className="text-white">GPT_Buiness.md (96/100 Best of Class)</strong>,{' '}
              <strong className="text-emerald-400">Ara - Grok &ldquo;Sub Radar&rdquo; (95/100 Most Likely to Succeed)</strong>,{' '}
              <strong className="text-white">Claude Rebuild (91/100 No-Login Default)</strong>, and the{' '}
              <strong className="text-amber-300">Hermes + LiteLLM + Stagehand + DBOS (100/100 Stack)</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectBusiness('c1')}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Open C1: Grok Sub Radar Handbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSelectBusiness('p2')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              Open P2: GPT Catalog Exception Desk
            </button>
          </div>
        </div>

        {/* The Tri-Championship Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-5">
          <div className="p-4 rounded-lg bg-slate-800/90 border border-slate-700">
            <div className="text-xs font-mono text-amber-400 font-semibold">🏆 BEST OF CLASS (96 / 100)</div>
            <div className="text-base font-bold text-white mt-0.5">GPT_Buiness.md</div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              141 KB complete 17-section math, <strong>38,400 browser-min/mo</strong> (8 lanes) vs.{' '}
              <strong>4,800 min/mo</strong> single-pointer fallback, Catalog Exception Desk (P-B) &amp; Fleet Collision Lab (C-A).
            </p>
          </div>

          <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-500/40">
            <div className="text-xs font-mono text-emerald-400 font-semibold">
              🥇 MOST LIKELY TO SUCCEED (95 / 100)
            </div>
            <div className="text-base font-bold text-white mt-0.5">Ara - Grok (&ldquo;Sub Radar&rdquo;)</div>
            <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">
              Targets <strong>100% public state contractor licensing boards (CSLB, TDLR, DBPR)</strong>. Zero client credentials, zero logins, zero ban risk. $149 Audit &rarr; $399/mo GC retainer.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/90 border border-slate-700">
            <div className="text-xs font-mono text-sky-400 font-semibold">🥈 3RD PLACE (91 / 100)</div>
            <div className="text-base font-bold text-white mt-0.5">Claude-OF-OUT-USA Rebuilt</div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Created the mandatory <strong>&ldquo;No-Login Default&rdquo;</strong> and{' '}
              <strong>&ldquo;Metadata-Only&rdquo;</strong> doctrines plus the fast $75 Day-5 deposit wedge.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/90 border border-slate-700">
            <div className="text-xs font-mono text-purple-400 font-semibold">🎖️ SPECIAL STACK (100 / 100)</div>
            <div className="text-base font-bold text-white mt-0.5">GPT Market Research</div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Mandatory production engineering stack: <strong>Hermes Agent + LiteLLM + Stagehand + DBOS</strong> paired with stealth MCP workers.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: 7-Contender Forensic Scorecard Matrix */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              1. 7-Contender Tribunal Scorecard Matrix
            </h2>
            <p className="text-xs text-slate-500">
              Click any contender row to inspect what was integrated into DecaFleet-OS vs. what was forensically killed.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Weights: Schema (20%) · Fleet Realism (25%) · 7-Day Cash (20%) · Legal/ToS (20%) · Grounding (15%)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">Contender Artifact</th>
                <th className="py-3 px-3 text-center">Schema (20)</th>
                <th className="py-3 px-3 text-center">Fleet Realism (25)</th>
                <th className="py-3 px-3 text-center">7-Day Cash (20)</th>
                <th className="py-3 px-3 text-center">Legal &amp; ToS (20)</th>
                <th className="py-3 px-3 text-center">Grounding (15)</th>
                <th className="py-3 px-4 text-right">Total Score</th>
                <th className="py-3 px-4">Tribunal Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {TRIBUNAL_CONTENDERS.map((c) => {
                const isSelected = c.id === selectedContenderId;
                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedContenderId(c.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold">{c.name}</td>
                    <td className="py-3 px-3 text-center font-mono">
                      {c.status === 'SPECIAL_STACK' ? 'N/A' : `${c.scores.promptCompliance}/20`}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-semibold">
                      {c.scores.fleetRealism}/25
                    </td>
                    <td className="py-3 px-3 text-center font-mono">
                      {c.status === 'SPECIAL_STACK' ? 'N/A' : `${c.scores.cashAndEconomics}/20`}
                    </td>
                    <td className="py-3 px-3 text-center font-mono">
                      {c.status === 'SPECIAL_STACK' ? 'N/A' : `${c.scores.legalAndToS}/20`}
                    </td>
                    <td className="py-3 px-3 text-center font-mono">{c.scores.grounding}/15</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-sm">
                      {c.status === 'SPECIAL_STACK' ? '100 (Tech)' : `${c.totalScore} / 100`}
                    </td>
                    <td className="py-3 px-4 font-medium">{c.placementBadge}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Contender Forensic Drawer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                Forensic Inspection: {selectedContender.artifactFile}
              </span>
              <span className="text-xs font-bold text-slate-900">
                {selectedContender.placementBadge}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{selectedContender.name}</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedContender.coreBreakthrough}
            </p>

            {selectedContender.adoptedIntoDecaFleet.length > 0 && (
              <div className="pt-2">
                <div className="text-xs font-bold text-emerald-800 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Adopted Directly into DecaFleet-OS Production Codebase:</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {selectedContender.adoptedIntoDecaFleet.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2">
            <div className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Forensic Audit Notes / Disqualification Traps Avoided:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
              {selectedContender.forensicFlawsOrKills.map((flaw, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">&bull;</span>
                  <span>{flaw}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 2: Interactive Ara-Grok "Sub Radar" Public Registry Monitor */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>STAGE 1 LAUNCHPAD · ARA-GROK &ldquo;SUB RADAR&rdquo; LIVE ENGINE</span>
            </div>
            <h2 className="text-base font-bold mt-0.5">
              2. Zero-Credential Public State Contractor Registry Diff (CSLB · TDLR · DBPR)
            </h2>
            <p className="text-xs text-slate-300">
              Simulates BoardScout-01–04 querying public state licensing boards for a General Contractor&apos;s subcontractor roster. Zero client logins required.
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
                <th className="py-3 px-4 text-right">Human Gate Action</th>
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
                              <span>Queued in Human Gate &rarr;</span>
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

      {/* SECTION 3: Production Engineering Stack (Hermes + LiteLLM + Stagehand + DBOS) */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <Cpu className="w-4 h-4 text-slate-800" />
              <span>COMPANION ENGINEERING SPEC (100 / 100 SPECIAL AWARD)</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              3. {HERMES_STACK_SPEC.architectureName}
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
