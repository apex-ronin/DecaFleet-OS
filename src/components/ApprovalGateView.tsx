import React, { useState } from 'react';
import { ApprovalItem, JevAiVerdict } from '../types/index.ts';
import {
  ShieldAlert,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  FileCheck,
  Send,
  MessageSquare,
  Smartphone,
  PlusCircle,
  Check,
  Cpu,
  Zap,
  Lock,
  Terminal,
  Copy,
  RefreshCw
} from 'lucide-react';

interface ApprovalGateViewProps {
  items: ApprovalItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onAddSampleItem: () => void;
  onUpdateVerdict?: (id: string, verdict: JevAiVerdict, autoApprove?: boolean) => void;
}

const JEV_AI_WIRING_SNIPPET = `// workers/jev-ai-arbiter/typesafe_systemone_gate.ts
// Official TypeSafe AI System One (jev-latest) + DBOS Confidence-Gated Routing
// Docs: https://docs.typesafe.ai/patterns/confidence-routing
import { TypeSafeClient, choice, noul, score } from '@typesafe-ai/sdk';
import { DBOS } from '@dbos-inc/dbos-sdk';

const typesafe = new TypeSafeClient(); // Reads process.env.TYPESAFE_API_KEY

export class JevAiSystemOneGate {
  @DBOS.workflow()
  static async evaluateAndRoute(item: BotGatePayload) {
    // Best Practice #1: Ask 6 atomic, parallel questions in one POST /v1/systemone call
    const { answers } = await typesafe.systemOne({
      model: 'jev-latest',
      state: { gateItem: item },
      questions: {
        routing_intent: choice('Which execution path should handle this bot gate artifact?', {
          auto_dispatch: 'Staging HAR trace or reversible public slot hold with zero liability',
          co_sign_batch: 'Verified compliance alert, catalog CSV patch, or outbound batch',
          escalate_human: 'Requires 2FA OTP token, municipal bid signature, or legal C&D filing',
          reject_malformed: 'Missing checksums or unverified primary source'
        }),
        non_delegable_boundary: noul('Does this action require a 2FA code, municipal signature, or legal filing?'),
        primary_evidence_verified: noul('Does dataPayload contain a verifiable primary source ID, HAR trace, or diff?'),
        zero_login_compliant: noul('Does this avoid logging into banned or shared-credential third-party accounts?'),
        payload_checksum_valid: noul('Are all required fields in dataPayload populated and complete?'),
        blast_radius: score('How severe is the blast radius if executed automatically?', [
          'Reversible staging trace or temporary public slot hold',
          'External client notification, compliance alert, or catalog CSV diff',
          'Irreversible legal filing, binding municipal bid, or 2FA credential submission'
        ])
      }
    });

    // Best Practice #2: Composite Scoring in deterministic code
    const compositeRisk =
      0.45 * answers.non_delegable_boundary.noul +
      0.30 * (answers.blast_radius.score / 2.0) +
      0.15 * (1 - answers.primary_evidence_verified.noul) +
      0.10 * (1 - answers.zero_login_compliant.noul);

    const winProb = answers.routing_intent.probabilities[answers.routing_intent.choice] ?? 0;

    // Best Practice #3: Confidence-Gated Routing & Policy-per-Action
    // Gate A: 0.60 Uncertainty Floor OR Non-Delegable Tripwire (noul >= 0.30) -> Human Lock
    if (answers.routing_intent.confidence < 0.60 || answers.non_delegable_boundary.noul >= 0.30) {
      const token = await DBOS.recv<HumanApprovalToken>(item.id, 86400);
      return { tier: 'TIER_3_HARD_HUMAN_LOCK', status: token.approved ? 'APPROVED' : 'ABORTED' };
    }

    // Gate B: High-Confidence Low-Stakes (P >= 0.85, Evidence Noul >= 0.90, Risk <= 0.15) -> Auto-Dispatch
    if (answers.routing_intent.choice === 'auto_dispatch' && winProb >= 0.85 && compositeRisk <= 0.15) {
      await DBOS.invoke(StagehandWorker).commitStagedAction(item.id);
      return { tier: 'TIER_1_AUTO_DISPATCH', status: 'AUTO_DISPATCHED' };
    }

    // Gate C: Medium-Stakes Verified (P >= 0.70, Risk <= 0.50) -> Stage 1-Click Co-Sign Batch
    await OpenMausBotBroker.enqueueCoSignBatch(item, answers);
    return { tier: 'TIER_2_CO_SIGN', status: 'STAGED_FOR_1_CLICK_COSIGN' };
  }
}`;

export const ApprovalGateView: React.FC<ApprovalGateViewProps> = ({
  items,
  onApprove,
  onReject,
  onAddSampleItem,
  onUpdateVerdict
}) => {
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(items[0] || null);
  const [smsInput, setSmsInput] = useState('849201');
  const [autonomyMode, setAutonomyMode] = useState<'shadow' | 'constitutional_autopilot'>('constitutional_autopilot');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [showWiringSpec, setShowWiringSpec] = useState<boolean>(false);
  const [copiedWiring, setCopiedWiring] = useState<boolean>(false);
  const [localVerdicts, setLocalVerdicts] = useState<Record<string, JevAiVerdict>>({});

  const getVerdict = (item: ApprovalItem): JevAiVerdict | undefined => {
    return item.jevAiVerdict || localVerdicts[item.id];
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const pendingCount = items.filter((i) => i.status === 'pending').length;

  const coSignReadyItems = items.filter((i) => {
    const v = getVerdict(i);
    return i.status === 'pending' && v && v.tier === 'TIER_2_CO_SIGN' && v.decision === 'APPROVE';
  });

  const totalTimeSavedMinutes = Object.values(localVerdicts).reduce(
    (acc, v) => acc + (v.timeSavedMinutes || 0),
    0
  );

  const handleRunJevAiBatch = async () => {
    const pendingItems = items.filter((i) => i.status === 'pending');
    if (pendingItems.length === 0) return;

    setIsEvaluating(true);
    try {
      const response = await fetch('/api/jev-ai/evaluate-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: pendingItems,
          autonomyPolicy: autonomyMode
        })
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate queue with Jev-AI');
      }

      const data = await response.json();
      const decisions: JevAiVerdict[] = data.decisions || [];

      const nextVerdicts: Record<string, JevAiVerdict> = { ...localVerdicts };
      decisions.forEach((verdict) => {
        nextVerdicts[verdict.itemId] = verdict;
        const shouldAutoApprove =
          autonomyMode === 'constitutional_autopilot' &&
          verdict.tier === 'TIER_1_AUTO_DISPATCH' &&
          verdict.decision === 'APPROVE';

        if (shouldAutoApprove) {
          onApprove(verdict.itemId);
        }
        if (onUpdateVerdict) {
          onUpdateVerdict(verdict.itemId, verdict, shouldAutoApprove);
        }
      });

      setLocalVerdicts(nextVerdicts);

      if (selectedItem && nextVerdicts[selectedItem.id]) {
        const v = nextVerdicts[selectedItem.id];
        const autoApproved =
          autonomyMode === 'constitutional_autopilot' &&
          v.tier === 'TIER_1_AUTO_DISPATCH' &&
          v.decision === 'APPROVE';
        setSelectedItem((prev) =>
          prev
            ? {
                ...prev,
                status: autoApproved ? 'approved' : prev.status,
                jevAiVerdict: v
              }
            : null
        );
      }
    } catch (err) {
      console.error('Jev-AI batch error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRunSingleJevAi = async (item: ApprovalItem) => {
    setIsEvaluating(true);
    try {
      const response = await fetch('/api/jev-ai/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item,
          autonomyPolicy: autonomyMode
        })
      });
      if (!response.ok) throw new Error('Failed Jev-AI evaluation');
      const data = await response.json();
      const verdict: JevAiVerdict = data.decision;
      if (verdict) {
        setLocalVerdicts((prev) => ({ ...prev, [item.id]: verdict }));
        const shouldAutoApprove =
          autonomyMode === 'constitutional_autopilot' &&
          verdict.tier === 'TIER_1_AUTO_DISPATCH' &&
          verdict.decision === 'APPROVE';
        if (shouldAutoApprove && item.status === 'pending') {
          onApprove(item.id);
        }
        if (onUpdateVerdict) {
          onUpdateVerdict(item.id, verdict, shouldAutoApprove);
        }
        setSelectedItem((prev) =>
          prev && prev.id === item.id
            ? {
                ...prev,
                status: shouldAutoApprove ? 'approved' : prev.status,
                jevAiVerdict: verdict
              }
            : prev
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleBatchReleaseCoSign = () => {
    coSignReadyItems.forEach((item) => {
      onApprove(item.id);
    });
    if (selectedItem && coSignReadyItems.some((c) => c.id === selectedItem.id)) {
      setSelectedItem((prev) => (prev ? { ...prev, status: 'approved' } : null));
    }
  };

  const handleCopyWiring = () => {
    navigator.clipboard.writeText(JEV_AI_WIRING_SNIPPET);
    setCopiedWiring(true);
    setTimeout(() => setCopiedWiring(false), 2000);
  };

  const selectedVerdict = selectedItem ? getVerdict(selectedItem) : undefined;

  return (
    <div className="space-y-6">
      {/* Jev-AI Executive Decision Arbiter Control Plane */}
      <div className="bg-slate-900 text-slate-100 border border-slate-800 rounded-lg p-6 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
              <Cpu className="w-4 h-4" />
              <span>BOT-00 EXECUTIVE ARBITER · JEV-AI CONSTITUTIONAL DECISION ENGINE</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Jev-AI Decision Firewall &amp; Human Gate Inbox ({pendingCount} Pending)
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Instead of forcing the human operator to inspect every JSON payload manually, <strong>Jev-AI</strong> sits between the 10 Stagehand/DBOS worker bots and the OpenMausBot Permission Broker—adjudicating actions across a strict <strong>3-Tier Constitutional Policy</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setShowWiringSpec(!showWiringSpec)}
              className="px-3 py-1.5 text-xs font-mono font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showWiringSpec ? 'Hide Jev-AI Code Architecture' : 'View Jev-AI Wiring Spec'}</span>
            </button>

            <button
              onClick={onAddSampleItem}
              className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate Tier-1 Slot Hold</span>
            </button>

            <button
              onClick={handleRunJevAiBatch}
              disabled={isEvaluating || pendingCount === 0}
              className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isEvaluating ? 'animate-spin' : ''}`} />
              <span>
                {isEvaluating
                  ? 'Jev-AI Adjudicating Queue...'
                  : `Run Jev-AI Arbiter (${pendingCount} Pending)`}
              </span>
            </button>
          </div>
        </div>

        {/* 3-Tier Policy Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-800">
          <div className="p-3.5 bg-slate-800/80 border border-emerald-500/30 rounded-lg space-y-1">
            <div className="flex items-center justify-between font-mono font-bold text-emerald-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                TIER 1: AUTO-DISPATCH
              </span>
              <span>Conf ≥ 95% · Risk ≤ 15</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Jev-AI Decides 100% Autonomously:</strong> Staging collision traces (C2), reversible municipal slot holds (C3), and read-only registry re-polls. Zero human clicks.
            </p>
          </div>

          <div className="p-3.5 bg-slate-800/80 border border-amber-500/30 rounded-lg space-y-1">
            <div className="flex items-center justify-between font-mono font-bold text-amber-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                TIER 2: PRE-ADJUDICATED CO-SIGN
              </span>
              <span>Conf 80–94% · 1-Click Batch</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Jev-AI Audits &amp; Stages Batch:</strong> Sub Radar GC stop-work alerts (C1), Shopify GMC CSV patches (P2), and cold email batches. Jev-AI verifies checksums for 5-second Co-Sign.
            </p>
          </div>

          <div className="p-3.5 bg-slate-800/80 border border-rose-500/30 rounded-lg space-y-1">
            <div className="flex items-center justify-between font-mono font-bold text-rose-400">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                TIER 3: HARD HUMAN LOCK
              </span>
              <span>Non-Delegable Firewall</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Mandatory Human Signature:</strong> Client SMS/2FA codes, legally binding municipal bid submissions, and trademark C&amp;D filings. Jev-AI pre-checks fields and halts DBOS.
            </p>
          </div>
        </div>

        {/* Policy Mode Bar + Co-Sign Batch Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">Jev-AI Execution Policy:</span>
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => setAutonomyMode('constitutional_autopilot')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer transition-colors ${
                  autonomyMode === 'constitutional_autopilot'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Constitutional Auto-Pilot (Auto-Approve Tier 1)
              </button>
              <button
                onClick={() => setAutonomyMode('shadow')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer transition-colors ${
                  autonomyMode === 'shadow'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Shadow Advisory Mode (Recommend Only)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {totalTimeSavedMinutes > 0 && (
              <span className="font-mono text-emerald-400">
                Operator Time Saved: <strong>{totalTimeSavedMinutes} mins</strong>
              </span>
            )}
            {coSignReadyItems.length > 0 && (
              <button
                onClick={handleBatchReleaseCoSign}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>
                  1-Click Release All {coSignReadyItems.length} Jev-AI Tier-2 Co-Sign Item
                  {coSignReadyItems.length === 1 ? '' : 's'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Jev-AI Code Architecture Blueprint */}
        {showWiringSpec && (
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-emerald-400 font-bold">
                HOW TO WIRE JEV-AI INTO DBOS + STAGEHAND + OPENMAUSBOT (TYPESCRIPT MIDDLEWARE)
              </div>
              <button
                onClick={handleCopyWiring}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              >
                {copiedWiring ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Middleware</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy TypeScript Arbiter</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
              {JEV_AI_WIRING_SNIPPET}
            </pre>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-lg px-5 py-3 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
          {(['pending', 'approved', 'rejected', 'all'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 font-medium rounded capitalize cursor-pointer ${
                filter === tab
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
              {tab === 'pending' && pendingCount > 0 && (
                <span className="ml-1.5 text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400">
          Showing {filteredItems.length} gate record{filteredItems.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Main Grid: List and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Items List */}
        <div className="lg:col-span-1 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-slate-500 space-y-2">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
              <div className="text-sm font-semibold text-slate-900">Queue is Clear</div>
              <p className="text-xs text-slate-500">
                All external bot actions have been inspected and released. Fleet is operating autonomously.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const verdict = getVerdict(item);
              const typeIcon: Record<ApprovalItem['artifactType'], React.ElementType> = {
                sms_verification: Smartphone,
                email_draft: MessageSquare,
                bid_package: FileCheck,
                legal_dispute: ShieldAlert,
                review_response: MessageSquare,
                lead_batch: Send,
                compliance_alert: ShieldAlert,
                catalog_patch: FileCheck,
                collision_trace: Eye,
                slot_hold: Clock
              };
              const Icon = typeIcon[item.artifactType] || FileCheck;

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50 shadow-xs ring-1 ring-slate-900'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-slate-600" />
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {item.botName}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                        item.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : item.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-900 line-clamp-1 mb-1">
                    {item.title}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2">
                    {item.summary}
                  </p>

                  {/* Jev-AI Verdict Pill if evaluated */}
                  {verdict && (
                    <div
                      className={`mb-2 px-2 py-1 rounded text-[10px] font-mono font-semibold flex items-center justify-between ${
                        verdict.tier === 'TIER_1_AUTO_DISPATCH'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : verdict.tier === 'TIER_2_CO_SIGN'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      <span>Jev-AI: {verdict.tier.replace('TIER_', 'T').replace(/_/g, ' ')}</span>
                      <span>Conf {verdict.confidenceScore}%</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{item.timestamp}</span>
                    <span className="capitalize">{item.artifactType.replace('_', ' ')}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Item Inspection & Jev-AI Adjudication Card */}
        <div className="lg:col-span-2">
          {selectedItem ? (
            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-mono font-bold text-slate-900">{selectedItem.botName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{selectedItem.artifactType.replace('_', ' ')}</span>
                    <span aria-hidden="true">·</span>
                    <span>Received: {selectedItem.timestamp}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedItem.title}</h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleRunSingleJevAi(selectedItem)}
                    disabled={isEvaluating}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Cpu className="w-3.5 h-3.5 text-amber-800" />
                    <span>{selectedVerdict ? 'Re-Run Jev-AI' : 'Ask Jev-AI to Adjudicate'}</span>
                  </button>

                  {selectedItem.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          onReject(selectedItem.id);
                          setSelectedItem((prev) => (prev ? { ...prev, status: 'rejected' } : null));
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => {
                          onApprove(selectedItem.id);
                          setSelectedItem((prev) => (prev ? { ...prev, status: 'approved' } : null));
                        }}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Approve &amp; Dispatch</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Status Banner */}
              {selectedItem.status !== 'pending' && (
                <div
                  className={`p-3 rounded-lg text-xs font-semibold flex items-center justify-between gap-2 ${
                    selectedItem.status === 'approved'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {selectedItem.status === 'approved' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>
                      This item has been {selectedItem.status.toUpperCase()}{' '}
                      {selectedVerdict?.tier === 'TIER_1_AUTO_DISPATCH' &&
                      autonomyMode === 'constitutional_autopilot'
                        ? 'autonomously by Jev-AI (Tier-1 Green-Light Policy).'
                        : 'by the operator.'}
                    </span>
                  </div>
                </div>
              )}

              {/* Jev-AI Constitutional Adjudication Card */}
              {selectedVerdict ? (
                <div className="p-5 bg-slate-900 text-slate-100 rounded-lg border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                        Jev-AI Constitutional Audit Verdict
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          selectedVerdict.tier === 'TIER_1_AUTO_DISPATCH'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : selectedVerdict.tier === 'TIER_2_CO_SIGN'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {selectedVerdict.tier}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-800 rounded text-slate-200">
                        Confidence: {selectedVerdict.confidenceScore}%
                      </span>
                      <span className="px-2 py-0.5 bg-slate-800 rounded text-slate-200">
                        Risk: {selectedVerdict.riskScore}/100
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="text-slate-300 leading-relaxed">
                      <strong className="text-white">Executive Rationale:</strong>{' '}
                      {selectedVerdict.rationale}
                    </div>
                    <div className="text-emerald-300 font-mono">
                      <strong>Recommended Action:</strong> {selectedVerdict.recommendedAction} (Saves ~
                      {selectedVerdict.timeSavedMinutes}m operator review)
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <div className="text-[11px] font-mono uppercase text-slate-400">
                      Constitutional Policy Checks:
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      {selectedVerdict.constitutionalChecks.map((chk, idx) => (
                        <div
                          key={idx}
                          className="p-2 bg-slate-950 rounded border border-slate-800 flex items-start gap-2 text-xs"
                        >
                          {chk.passed ? (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-semibold text-white">{chk.rule}:</span>{' '}
                            <span className="text-slate-300">{chk.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg flex items-center justify-between gap-4 text-xs text-amber-950">
                  <div>
                    <strong>Jev-AI Ready to Adjudicate:</strong> Click{' '}
                    <span className="font-semibold">"Ask Jev-AI to Adjudicate"</span> or{' '}
                    <span className="font-semibold">"Run Jev-AI Arbiter"</span> above to run the 3-Tier
                    Constitutional Policy check on this payload.
                  </div>
                  <button
                    onClick={() => handleRunSingleJevAi(selectedItem)}
                    disabled={isEvaluating}
                    className="px-3 py-1.5 bg-slate-900 text-white font-semibold rounded-md shrink-0 cursor-pointer"
                  >
                    Run Jev-AI Now
                  </button>
                </div>
              )}

              {/* Artifact Inspection Body */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Artifact Verification Details
                </span>

                {selectedItem.artifactType === 'sms_verification' && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                    <div className="text-xs text-slate-700">
                      <strong>Client SMS 2FA Challenge (Tier-3 Hard Human Lock):</strong> The directory
                      portal sent a one-time verification code to the client's registered dispatch
                      mobile number.
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-semibold text-slate-900">
                        Received SMS Code:
                      </label>
                      <input
                        type="text"
                        value={smsInput}
                        onChange={(e) => setSmsInput(e.target.value)}
                        className="font-mono text-sm font-bold bg-white border border-slate-300 rounded px-3 py-1 w-32 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                      <span className="text-xs text-slate-500">Auto-filled from client forward</span>
                    </div>
                  </div>
                )}

                {selectedItem.artifactType === 'bid_package' && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                    <div className="font-semibold text-slate-900">
                      Subcontract Compliance Specification Summary (Tier-3 Hard Human Lock):
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Hamilton County Public Works: Interior Repainting Annex 3. Bonding limit
                      required: $50,000. Prevailing wage documentation attached. Client W-9 and
                      Certificate of Insurance injected into form fields.
                    </p>
                  </div>
                )}

                {/* Raw JSON Payload */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-500">
                    Bot IPC Payload Snapshot:
                  </span>
                  <pre className="p-3 bg-slate-950 text-slate-200 rounded-lg font-mono text-xs overflow-x-auto">
                    {JSON.stringify(selectedItem.dataPayload, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-12 text-center text-slate-500">
              <Eye className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-700">Select an Item to Inspect</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Choose any pending gate approval item from the list to review the artifact, run Jev-AI
                Constitutional Adjudication, and release the bot fleet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
