import React, { useState, useEffect, useCallback } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Wrench,
  Cpu,
  Server,
  ShieldCheck,
  Clock,
  Zap,
  PanelRightClose,
  PanelRightOpen,
  ExternalLink,
  RotateCcw,
  Bug,
  Layers,
  Database,
  Radio
} from 'lucide-react';
import { BUSINESS_HANDBOOKS } from '../data/handbooks';
import { computeFleetHealthSummary } from '../utils/calculator';

export interface BotLiveTelemetry {
  botId: string;
  lane: number;
  laneRole: 'ACTIVE_WORKER_LANE' | 'RESERVE_FAILOVER_LANE';
  healthState: 'HEALTHY' | 'HEALING' | 'DEGRADED' | 'OFFLINE';
  executionState:
    | 'ACTIVE_SCRAPE'
    | 'WAKE_GATE_SKIPPED'
    | 'DBOS_CHECKPOINTED'
    | 'WAITING_JEV_GATE'
    | 'STAGEHAND_DOM_HEALING'
    | 'DEGRADED_DOM_DRIFT'
    | 'STANDBY_RESERVE';
  uptimePercent: number;
  uptimeHours: number;
  lastHeartbeatSecondsAgo: number;
  wakeGateBypassPercent: number;
  memoryMb: number;
  cpuPercent: number;
  taskProgressPercent: number;
  dbosCheckpointId: string;
  stagehandHealsCount: number;
  customTask: string | null;
  lastActionNote: string | null;
}

export interface ApiLiveHealth {
  serviceId: string;
  name: string;
  endpoint: string;
  protocol: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'OUTAGE';
  httpCode: number;
  latencyMs: number;
  uptimePercent: number;
  modeLabel: string;
}

export interface FleetHealthPayload {
  timestamp: string;
  totalFleetProbes: number;
  totalStagehandHeals: number;
  bots: BotLiveTelemetry[];
  apis: ApiLiveHealth[];
}

interface BotHealthWidgetProps {
  mode: 'tab' | 'sidebar';
  selectedBusinessId: string;
  onSelectBusiness: (id: string) => void;
  isSidebarOpen?: boolean;
  onCloseSidebar?: () => void;
  onOpenSidebar?: () => void;
  onExpandToTab?: () => void;
  onSummaryChange?: (summary: {
    healthyBots: number;
    totalBots: number;
    avgUptimePercent: number;
    overallStatus: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL';
  }) => void;
}

function buildFallbackPayload(): FleetHealthPayload {
  const defaultStates: BotLiveTelemetry['executionState'][] = [
    'ACTIVE_SCRAPE',
    'WAKE_GATE_SKIPPED',
    'ACTIVE_SCRAPE',
    'DBOS_CHECKPOINTED',
    'ACTIVE_SCRAPE',
    'WAKE_GATE_SKIPPED',
    'WAITING_JEV_GATE',
    'ACTIVE_SCRAPE',
    'STANDBY_RESERVE',
    'STANDBY_RESERVE'
  ];

  const bots: BotLiveTelemetry[] = Array.from({ length: 10 }, (_, idx) => ({
    botId: `bot-${String(idx + 1).padStart(2, '0')}`,
    lane: idx + 1,
    laneRole: idx < 8 ? 'ACTIVE_WORKER_LANE' : 'RESERVE_FAILOVER_LANE',
    healthState: 'HEALTHY',
    executionState: defaultStates[idx],
    uptimePercent: Number((99.91 + (idx % 4) * 0.02).toFixed(2)),
    uptimeHours: Number((336 - idx * 0.5).toFixed(1)),
    lastHeartbeatSecondsAgo: 2 + (idx % 4),
    wakeGateBypassPercent: Number((85.0 + ((idx * 2.7) % 10)).toFixed(1)),
    memoryMb: 295 + idx * 14,
    cpuPercent: idx < 8 ? 22 + (idx * 3) : 4,
    taskProgressPercent: idx < 8 ? 64 + (idx * 4) : 100,
    dbosCheckpointId: `ckpt_9a4${idx}`,
    stagehandHealsCount: idx % 3,
    customTask: null,
    lastActionNote: null
  }));

  const apis: ApiLiveHealth[] = [
    {
      serviceId: 'typesafe-jev',
      name: 'TypeSafe AI System One (jev-latest)',
      endpoint: 'https://api.typesafe.ai/v1/systemone',
      protocol: 'HTTPS POST · 6-Question Atomic Gate',
      status: 'OPERATIONAL',
      httpCode: 200,
      latencyMs: 42,
      uptimePercent: 99.99,
      modeLabel: 'Calibrated Constitutional Core'
    },
    {
      serviceId: 'litellm-router',
      name: 'LiteLLM Spend & Model Router',
      endpoint: 'postgres://litellm-proxy:4000/v1/spend-cap',
      protocol: 'PostgreSQL Hard-Cap Ledger',
      status: 'OPERATIONAL',
      httpCode: 200,
      latencyMs: 16,
      uptimePercent: 99.98,
      modeLabel: '$50/mo Hard Client Cap Enforced'
    },
    {
      serviceId: 'stagehand-cdp',
      name: 'Stagehand + Playwright CDP Pool',
      endpoint: 'ws://127.0.0.1:9222/devtools/browser/deca-10',
      protocol: 'CDP WebSocket · 8 Active + 2 Reserve Lanes',
      status: 'OPERATIONAL',
      httpCode: 101,
      latencyMs: 12,
      uptimePercent: 99.96,
      modeLabel: '8/8 Worker Lanes Healthy'
    },
    {
      serviceId: 'dbos-postgres',
      name: 'DBOS Durable Workflow Checkpointer',
      endpoint: 'postgres://dbos-state:5432/decafleet_workflows',
      protocol: '@DBOS.workflow() / @DBOS.step()',
      status: 'OPERATIONAL',
      httpCode: 200,
      latencyMs: 8,
      uptimePercent: 99.99,
      modeLabel: 'Zero-Data-Loss Step Recovery'
    },
    {
      serviceId: 'public-registries',
      name: 'Zero-Login State Registries & Portals',
      endpoint: 'https://cslb.ca.gov / tdlr.texas.gov / myfloridalicense.com',
      protocol: 'TLS 1.3 · Read-Only Public Portals',
      status: 'OPERATIONAL',
      httpCode: 200,
      latencyMs: 158,
      uptimePercent: 99.86,
      modeLabel: 'Zero-Ban Public Wedge Verified'
    }
  ];

  return {
    timestamp: new Date().toISOString(),
    totalFleetProbes: 428,
    totalStagehandHeals: 19,
    bots,
    apis
  };
}

function getExecutionBadgeStyle(state: BotLiveTelemetry['executionState']) {
  switch (state) {
    case 'ACTIVE_SCRAPE':
      return {
        label: 'ACTIVE SCRAPE',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500'
      };
    case 'WAKE_GATE_SKIPPED':
      return {
        label: 'WAKE-GATE SKIPPED (0 TOKENS)',
        bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        dot: 'bg-indigo-500'
      };
    case 'DBOS_CHECKPOINTED':
      return {
        label: 'DBOS CHECKPOINTED',
        bg: 'bg-sky-50 text-sky-800 border-sky-200',
        dot: 'bg-sky-500'
      };
    case 'WAITING_JEV_GATE':
      return {
        label: 'AWAITING JEV-AI GATE',
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500'
      };
    case 'STAGEHAND_DOM_HEALING':
      return {
        label: 'STAGEHAND HEALING',
        bg: 'bg-purple-50 text-purple-800 border-purple-200',
        dot: 'bg-purple-500'
      };
    case 'DEGRADED_DOM_DRIFT':
      return {
        label: 'DOM SELECTOR DRIFT',
        bg: 'bg-rose-50 text-rose-800 border-rose-300',
        dot: 'bg-rose-600'
      };
    case 'STANDBY_RESERVE':
      return {
        label: 'RESERVE HOT-STANDBY',
        bg: 'bg-slate-100 text-slate-700 border-slate-200',
        dot: 'bg-slate-400'
      };
  }
}

export const BotHealthWidget: React.FC<BotHealthWidgetProps> = ({
  mode,
  selectedBusinessId,
  onSelectBusiness,
  isSidebarOpen = false,
  onCloseSidebar,
  onOpenSidebar,
  onExpandToTab,
  onSummaryChange
}) => {
  const [telemetry, setTelemetry] = useState<FleetHealthPayload>(() => buildFallbackPayload());
  const [isProbing, setIsProbing] = useState(false);
  const [actionBusyBot, setActionBusyBot] = useState<string | null>(null);
  const [filterLaneMode, setFilterLaneMode] = useState<'ALL' | 'WORKERS' | 'DEGRADED'>('ALL');

  const handbook =
    BUSINESS_HANDBOOKS.find((h) => h.id === selectedBusinessId) || BUSINESS_HANDBOOKS[0];

  const fetchTelemetry = useCallback(async () => {
    try {
      const res = await fetch('/api/bot-health');
      if (res.ok) {
        const data: FleetHealthPayload = await res.json();
        setTelemetry(data);
        const computed = computeFleetHealthSummary(data.bots, data.apis);
        onSummaryChange?.({
          healthyBots: computed.healthyBots,
          totalBots: computed.totalBots,
          avgUptimePercent: computed.avgUptimePercent,
          overallStatus: computed.overallStatus
        });
      }
    } catch {
      // Keep current telemetry if offline
    }
  }, [onSummaryChange]);

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 4000);
    return () => clearInterval(interval);
  }, [fetchTelemetry]);

  const triggerFleetAction = async (
    action: 'probe_all' | 'simulate_drift' | 'stagehand_heal' | 'heal_all' | 'restart_session',
    botId?: string
  ) => {
    if (botId) {
      setActionBusyBot(botId);
    } else {
      setIsProbing(true);
    }
    try {
      await fetch('/api/bot-health/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, botId })
      });
      await fetchTelemetry();
    } finally {
      setIsProbing(false);
      setActionBusyBot(null);
    }
  };

  const summary = computeFleetHealthSummary(telemetry.bots, telemetry.apis);

  // Expand grouped BotDefinition entries (e.g. "BoardScout-01 to BoardScout-04" / "(4 Bots)") into 10 individual persistent browser agents
  const expandedBotSpecs = React.useMemo(() => {
    const out: typeof handbook.botFleet = [];
    for (const def of handbook.botFleet) {
      const countMatch = def.role.match(/\((\d+)\s*Bots?\)/i);
      const count = countMatch ? Math.max(1, parseInt(countMatch[1], 10)) : 1;
      const cleanRole = def.role.replace(/\s*\(\d+\s*Bots?\)/i, '').trim();
      const basePrefixMatch = def.name.match(/^([A-Za-z]+)-01/);
      const prefix = basePrefixMatch ? basePrefixMatch[1] : def.name.split(/[\s&-]/)[0];

      if (count === 1) {
        out.push({ ...def, role: cleanRole });
      } else {
        for (let i = 1; i <= count; i++) {
          out.push({
            ...def,
            name: `${prefix}-${String(i).padStart(2, '0')}`,
            role: cleanRole
          });
        }
      }
    }
    while (out.length < 10) {
      const idx = out.length + 1;
      out.push({
        name: `ReserveBot-${String(idx).padStart(2, '0')}`,
        role: 'Hot-Standby Failover Agent',
        jobDescription: 'Maintains warm Playwright context for instant lane failover',
        capability: 'Stagehand + DBOS Checkpoint Recovery',
        approvalBoundary: 'Autonomous'
      });
    }
    return out.slice(0, 10);
  }, [handbook]);

  // Merge the 10-bot live telemetry with the selected business handbook's 10 individual bot specs
  const mergedBots = telemetry.bots.map((liveBot, idx) => {
    const spec = expandedBotSpecs[idx];
    const defaultTaskByState: Record<BotLiveTelemetry['executionState'], string> = {
      ACTIVE_SCRAPE: `Executing ${spec.role}: ${spec.capability.slice(0, 74)}`,
      WAKE_GATE_SKIPPED: `NanoClaw wakeAgent SHA-256 diff unchanged -> skipped LLM wake (0 tokens burned)`,
      DBOS_CHECKPOINTED: `Committed @DBOS.step() state to PostgreSQL (${liveBot.dbosCheckpointId})`,
      WAITING_JEV_GATE: `Staged artifact at "${spec.approvalBoundary}" -> awaiting TypeSafe jev-latest gate`,
      STAGEHAND_DOM_HEALING: `Running stagehand.act() semantic DOM recovery on target portal`,
      DEGRADED_DOM_DRIFT: `ALERT: Target portal selector drifted — awaiting Stagehand self-heal`,
      STANDBY_RESERVE: `Hot-standby failover & QA verification lane ready (${spec.role})`
    };

    return {
      ...liveBot,
      spec,
      activeTaskDescription: liveBot.customTask || defaultTaskByState[liveBot.executionState]
    };
  });

  const filteredBots = mergedBots.filter((b) => {
    if (filterLaneMode === 'WORKERS') return b.lane <= 8;
    if (filterLaneMode === 'DEGRADED') return b.healthState === 'DEGRADED';
    return true;
  });

  // ============================================================================
  // MODE 1: PERSISTENT SIDEBAR OVERLAY DRAWER
  // ============================================================================
  if (mode === 'sidebar') {
    if (!isSidebarOpen) return null;

    return (
      <aside
        aria-label="Persistent Bot Health Sidebar Overlay"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col"
      >
        {/* Drawer Header */}
        <div className="px-4 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                summary.overallStatus === 'OPTIMAL'
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-amber-400 animate-ping'
              }`}
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold tracking-tight">
                  10-Bot Live Health Overlay
                </h2>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">
                  {summary.healthyBots}/{summary.totalBots} ONLINE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {handbook.code}: {handbook.name} · Uptime {summary.avgUptimePercent}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onExpandToTab && (
              <button
                onClick={onExpandToTab}
                title="Open Full Bot Health Tab"
                className="px-2 py-1 rounded text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3 h-3" />
                Full Tab
              </button>
            )}
            {onCloseSidebar && (
              <button
                onClick={onCloseSidebar}
                aria-label="Close Bot Health Overlay"
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                <PanelRightClose className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Compact Summary Strip */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border-b border-slate-200 text-center">
          <div className="bg-white p-2 rounded border border-slate-200">
            <div className="text-[10px] font-semibold uppercase text-slate-400">
              Fleet Uptime
            </div>
            <div className="text-sm font-bold font-mono text-slate-900">
              {summary.avgUptimePercent}%
            </div>
          </div>
          <div className="bg-white p-2 rounded border border-slate-200">
            <div className="text-[10px] font-semibold uppercase text-slate-400">
              Active Lanes
            </div>
            <div className="text-sm font-bold font-mono text-indigo-700">
              {summary.activeWorkerLanes}/8 + {summary.reserveLanesReady} Rsv
            </div>
          </div>
          <div className="bg-white p-2 rounded border border-slate-200">
            <div className="text-[10px] font-semibold uppercase text-slate-400">
              API Health
            </div>
            <div className="text-sm font-bold font-mono text-emerald-700">
              {summary.operationalApis}/{summary.totalApis} ({summary.avgApiLatencyMs}ms)
            </div>
          </div>
        </div>

        {/* Quick Control Bar */}
        <div className="px-3 py-2 bg-white border-b border-slate-200 flex items-center justify-between gap-2">
          <button
            onClick={() => triggerFleetAction('probe_all')}
            disabled={isProbing}
            className="flex-1 py-1.5 px-2.5 rounded text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isProbing ? 'animate-spin' : ''}`} />
            Probe All 10 Bots
          </button>
          {summary.degradedBots > 0 ? (
            <button
              onClick={() => triggerFleetAction('heal_all')}
              className="py-1.5 px-2.5 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5" />
              Heal ({summary.degradedBots})
            </button>
          ) : (
            <button
              onClick={() => triggerFleetAction('simulate_drift', 'bot-03')}
              className="py-1.5 px-2.5 rounded text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Bug className="w-3.5 h-3.5" />
              Test Drift
            </button>
          )}
        </div>

        {/* Scrollable Content: Upstream APIs + 10 Persistent Agents */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Upstream API Pills */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Upstream API Dependencies ({summary.operationalApis}/{summary.totalApis})
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                p95 avg {summary.avgApiLatencyMs}ms
              </span>
            </div>
            <div className="space-y-1.5">
              {telemetry.apis.map((api) => (
                <div
                  key={api.serviceId}
                  className="px-2.5 py-1.5 rounded border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        api.status === 'OPERATIONAL' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <div className="truncate">
                      <div className="font-semibold text-slate-800 truncate">{api.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{api.modeLabel}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2 font-mono">
                    <div className="text-[11px] font-bold text-slate-800">{api.latencyMs}ms</div>
                    <div className="text-[10px] text-emerald-700">HTTP {api.httpCode}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 10 Persistent Agents List */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                10 Persistent Browser Agents
              </span>
              <span className="text-[10px] font-mono text-indigo-600">
                Wake-Gate Skip: {summary.avgWakeGateBypassPercent}%
              </span>
            </div>

            <div className="space-y-2">
              {mergedBots.map((bot) => {
                const badge = getExecutionBadgeStyle(bot.executionState);
                const isDegraded = bot.healthState === 'DEGRADED';

                return (
                  <div
                    key={bot.botId}
                    className={`p-2.5 rounded-lg border transition-all ${
                      isDegraded
                        ? 'bg-rose-50/60 border-rose-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white">
                          L{bot.lane}
                        </span>
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {bot.spec.name}
                        </span>
                        <span className="text-[11px] text-slate-500 truncate">
                          · {bot.spec.role}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-700 shrink-0">
                        {bot.uptimePercent}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border ${badge.bg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        {badge.label}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {bot.memoryMb}MB · CPU {bot.cpuPercent}% · {bot.lastHeartbeatSecondsAgo}s ago
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-snug mb-2">
                      {bot.activeTaskDescription}
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-100">
                      <span className="text-[10px] font-mono text-slate-500">
                        DBOS: <strong className="text-slate-700">{bot.dbosCheckpointId}</strong>
                      </span>
                      {isDegraded ? (
                        <button
                          onClick={() => triggerFleetAction('stagehand_heal', bot.botId)}
                          disabled={actionBusyBot === bot.botId}
                          className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Wrench className="w-3 h-3" />
                          Stagehand Auto-Heal
                        </button>
                      ) : (
                        <button
                          onClick={() => triggerFleetAction('simulate_drift', bot.botId)}
                          disabled={actionBusyBot === bot.botId}
                          className="px-2 py-0.5 rounded text-[10px] font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 cursor-pointer"
                        >
                          Inject Drift
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // ============================================================================
  // MODE 2: DEDICATED FULL-SCREEN 'BOT HEALTH' TAB
  // ============================================================================
  return (
    <div className="space-y-6">
      {/* Top Executive Header & Business Fleet Selector */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                  summary.overallStatus === 'OPTIMAL'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                FLEET STATUS: {summary.overallStatus}
              </span>
              <span className="text-xs font-mono text-slate-400">
                38,400 Browser-Min/Mo Cluster · 8 Active Worker Lanes + 2 Reserve Lanes
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              10-Bot Persistent Browser Agent & API Health Telemetry
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Real-time heartbeat monitor, NanoClaw <code className="text-emerald-300 font-mono">wakeAgent</code> script-gate bypass ratio, DBOS PostgreSQL checkpoint state, and upstream API latency across all 10 persistent browser agents.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => triggerFleetAction('probe_all')}
              disabled={isProbing}
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isProbing ? 'animate-spin' : ''}`} />
              Run Live Fleet Probe (#{telemetry.totalFleetProbes})
            </button>

            {summary.degradedBots > 0 ? (
              <button
                onClick={() => triggerFleetAction('heal_all')}
                className="px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5" />
                Stagehand Auto-Heal All ({summary.degradedBots})
              </button>
            ) : (
              <button
                onClick={() => triggerFleetAction('simulate_drift', 'bot-03')}
                className="px-3.5 py-2 rounded-lg text-xs font-bold bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-700/60 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Bug className="w-3.5 h-3.5" />
                Simulate DOM Drift (Bot #03)
              </button>
            )}

            {onOpenSidebar && (
              <button
                onClick={onOpenSidebar}
                className="px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PanelRightOpen className="w-3.5 h-3.5 text-emerald-400" />
                Pin Sidebar Overlay
              </button>
            )}
          </div>
        </div>

        {/* Business Fleet Switcher */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-200">Active Vertical Roster:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {BUSINESS_HANDBOOKS.map((hb) => {
              const active = hb.id === handbook.id;
              return (
                <button
                  key={hb.id}
                  onClick={() => onSelectBusiness(hb.id)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {hb.code} · {hb.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5-Card Real-Time Telemetry KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>10-BOT FLEET UPTIME</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {summary.avgUptimePercent}%
          </div>
          <div className="text-xs text-emerald-700 font-medium mt-1">
            {summary.healthyBots} / {summary.totalBots} Persistent Contexts Online
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>CONCURRENT BROWSER LANES</span>
            <Cpu className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {summary.activeWorkerLanes}/8{' '}
            <span className="text-sm font-normal text-slate-500">
              (+{summary.reserveLanesReady} Rsv)
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            38,400 Browser-Min/Mo Capacity
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>NANOCLAW WAKE-GATE SKIP</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {summary.avgWakeGateBypassPercent}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            No-change polls skipped at $0 LLM cost
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>STAGEHAND DOM AUTO-HEALS</span>
            <Wrench className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {telemetry.totalStagehandHeals}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Cached selector patches · 0 crashes
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>UPSTREAM API HEALTH</span>
            <Server className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {summary.operationalApis}/{summary.totalApis}{' '}
            <span className="text-sm font-normal text-slate-500">
              ({summary.avgApiLatencyMs}ms)
            </span>
          </div>
          <div className="text-xs text-emerald-700 font-medium mt-1">
            TypeSafe Jev-AI + DBOS + LiteLLM Ready
          </div>
        </div>
      </div>

      {/* Upstream API & Core Infrastructure Health Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/60">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Upstream API & Infrastructure Dependency Health
            </h3>
            <p className="text-xs text-slate-500">
              Live endpoint verification for TypeSafe AI System One, LiteLLM spend ledger, Stagehand CDP pool, DBOS PostgreSQL, and public registries.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Last Heartbeat: {new Date(telemetry.timestamp).toLocaleTimeString()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {telemetry.apis.map((api) => (
            <div key={api.serviceId} className="p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      api.status === 'OPERATIONAL'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        api.status === 'OPERATIONAL' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    {api.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {api.latencyMs}ms
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">{api.name}</h4>
                <p className="text-[11px] font-mono text-slate-500 break-all mb-2">
                  {api.endpoint}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-indigo-700 font-medium truncate">{api.modeLabel}</span>
                <span className="font-mono text-slate-500 shrink-0 ml-1">
                  {api.uptimePercent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10 Persistent Browser Agents Real-Time Execution Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" />
              10 Persistent Browser Agents — {handbook.name} ({handbook.code})
            </h3>
            <p className="text-xs text-slate-500">
              Lanes 1–8 execute autonomous Playwright/Stagehand routines; Lanes 9–10 provide hot-standby failover, self-healing verification, and human gate dispatch.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {(['ALL', 'WORKERS', 'DEGRADED'] as const).map((modeOption) => (
              <button
                key={modeOption}
                onClick={() => setFilterLaneMode(modeOption)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  filterLaneMode === modeOption
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {modeOption === 'ALL'
                  ? `All Bots (10)`
                  : modeOption === 'WORKERS'
                    ? `Active Lanes 1-8 (8)`
                    : `Degraded (${summary.degradedBots})`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          {filteredBots.map((bot) => {
            const badge = getExecutionBadgeStyle(bot.executionState);
            const isDegraded = bot.healthState === 'DEGRADED';

            return (
              <div
                key={bot.botId}
                className={`rounded-xl border p-4 transition-all flex flex-col justify-between ${
                  isDegraded
                    ? 'bg-rose-50/50 border-rose-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Top Row: Lane + Bot Name + Uptime Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                          bot.lane <= 8
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-200 text-slate-800'
                        }`}
                      >
                        LANE #{String(bot.lane).padStart(2, '0')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            {bot.spec.name}
                          </h4>
                          <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                            {bot.spec.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Gate Boundary: <strong className="text-slate-700">{bot.spec.approvalBoundary}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="text-right font-mono shrink-0">
                      <div className="flex items-center justify-end gap-1 text-xs font-bold text-slate-900">
                        {isDegraded ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        {bot.uptimePercent}%
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Up {bot.uptimeHours}h · HB {bot.lastHeartbeatSecondsAgo}s ago
                      </div>
                    </div>
                  </div>

                  {/* Execution Status Pill & Metrics */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${badge.bg}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                      {badge.label}
                    </span>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
                      <span>MEM: <strong className="text-slate-700">{bot.memoryMb}MB</strong></span>
                      <span>CPU: <strong className="text-slate-700">{bot.cpuPercent}%</strong></span>
                      <span>WAKE-SKIP: <strong className="text-emerald-700">{bot.wakeGateBypassPercent}%</strong></span>
                    </div>
                  </div>

                  {/* Current Task Execution Box */}
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 mb-3">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400 mb-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        Current Task Execution
                      </span>
                      <span>Progress: {bot.taskProgressPercent}%</span>
                    </div>
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      {bot.activeTaskDescription}
                    </p>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isDegraded
                            ? 'bg-rose-500'
                            : bot.lane <= 8
                              ? 'bg-indigo-600'
                              : 'bg-slate-400'
                        }`}
                        style={{ width: `${bot.taskProgressPercent}%` }}
                      />
                    </div>
                    {bot.lastActionNote && (
                      <div className="mt-2 text-[11px] font-mono text-indigo-700 bg-indigo-50/80 px-2 py-1 rounded border border-indigo-100">
                        {bot.lastActionNote}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls per Bot */}
                <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
                    <span>
                      DBOS: <strong className="text-slate-800">{bot.dbosCheckpointId}</strong>
                    </span>
                    <span>
                      Heals: <strong className="text-purple-700">{bot.stagehandHealsCount}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isDegraded ? (
                      <button
                        onClick={() => triggerFleetAction('stagehand_heal', bot.botId)}
                        disabled={actionBusyBot === bot.botId}
                        className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Wrench className="w-3 h-3" />
                        Stagehand Auto-Heal
                      </button>
                    ) : (
                      <button
                        onClick={() => triggerFleetAction('simulate_drift', bot.botId)}
                        disabled={actionBusyBot === bot.botId}
                        className="px-2.5 py-1 rounded text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Bug className="w-3 h-3" />
                        Simulate Drift
                      </button>
                    )}

                    <button
                      onClick={() => triggerFleetAction('restart_session', bot.botId)}
                      disabled={actionBusyBot === bot.botId}
                      title="Recycle Persistent Chromium Context"
                      className="px-2 py-1 rounded text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Cycle
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
