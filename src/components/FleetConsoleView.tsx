import React, { useState, useEffect, useRef } from 'react';
import { BUSINESS_HANDBOOKS } from '../data/handbooks.ts';
import { SimulatedLog, ApprovalItem } from '../types/index.ts';
import { 
  Bot, 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle, 
  AlertCircle, 
  Cpu, 
  Layers, 
  Clock 
} from 'lucide-react';

interface FleetConsoleViewProps {
  selectedBusinessId: string;
  onSelectBusiness: (id: string) => void;
  onAddApprovalItem: (item: ApprovalItem) => void;
}

export const FleetConsoleView: React.FC<FleetConsoleViewProps> = ({
  selectedBusinessId,
  onSelectBusiness,
  onAddApprovalItem
}) => {
  const handbook = BUSINESS_HANDBOOKS.find((b) => b.id === selectedBusinessId) || BUSINESS_HANDBOOKS[0];

  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<SimulatedLog[]>([
    {
      id: 'init-1',
      timestamp: '00:00:01',
      bot: 'Orchestrator-01',
      level: 'info',
      message: 'DecaFleet runtime initialized on 10-core cloud node. /shared/data/ volume mounted.'
    },
    {
      id: 'init-2',
      timestamp: '00:00:02',
      bot: 'System',
      level: 'info',
      message: `Loaded fleet profile for ${handbook.code}: ${handbook.name}. Max concurrency: 10 browser tabs.`
    }
  ]);

  const [botStates, setBotStates] = useState<Record<string, 'idle' | 'running' | 'waiting_approval' | 'completed'>>({});
  const logTerminalRef = useRef<HTMLDivElement>(null);

  // Initialize bot states
  useEffect(() => {
    const initial: Record<string, 'idle' | 'running' | 'waiting_approval' | 'completed'> = {};
    handbook.botFleet.forEach((bot) => {
      initial[bot.name] = 'idle';
    });
    setBotStates(initial);
  }, [handbook]);

  // Auto-scroll logs
  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [logs]);

  const activeRoutine = handbook.routines[selectedRoutineIndex] || handbook.routines[0];

  // Routine execution simulation
  const handleStartRoutine = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setCurrentStep(1);

    const botName = activeRoutine.bot.split('–')[0].trim();
    setBotStates((prev) => ({ ...prev, [botName]: 'running' }));

    const now = () => new Date().toISOString().substring(11, 19);

    // Step 1: Launch
    setLogs((prev) => [
      ...prev,
      {
        id: `step-1-${Date.now()}`,
        timestamp: now(),
        bot: botName,
        level: 'info',
        message: `Trigger received: "${activeRoutine.trigger}". Initializing headless Chromium session with residential proxy profile...`
      }
    ]);

    // Step 2 (after 1s): Navigation & DOM parsing
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        {
          id: `step-2-${Date.now()}`,
          timestamp: now(),
          bot: botName,
          level: 'info',
          message: `Navigated to target portal. Input Source: [${activeRoutine.inputSource}]. Extracting DOM tree nodes and form schemas...`
        }
      ]);
      setCurrentStep(2);
    }, 1100);

    // Step 3 (after 2.2s): Action & Data processing
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        {
          id: `step-3-${Date.now()}`,
          timestamp: now(),
          bot: botName,
          level: 'info',
          message: `Parsed response. Writing payload artifact to ${activeRoutine.outputArtifact}. Enforcing validation rules...`
        }
      ]);
      setCurrentStep(3);
    }, 2300);

    // Step 4 (after 3.5s): Check Approval Gate
    setTimeout(() => {
      const hasGate = activeRoutine.approvalGate.toLowerCase().includes('gate') || 
                      activeRoutine.approvalGate.toLowerCase().includes('human');

      if (hasGate) {
        setBotStates((prev) => ({ ...prev, [botName]: 'waiting_approval' }));
        setLogs((prev) => [
          ...prev,
          {
            id: `step-gate-${Date.now()}`,
            timestamp: now(),
            bot: botName,
            level: 'gate',
            message: `APPROVAL GATE HIT: "${activeRoutine.approvalGate}". Execution paused. Dispatched payload to Human Approval Gate Inbox.`
          }
        ]);

        // Push real approval item to parent
        onAddApprovalItem({
          id: `appr-${Date.now()}`,
          businessId: handbook.id,
          botName,
          title: `${activeRoutine.bot}: ${activeRoutine.approvalGate}`,
          summary: `Routine produced artifact [${activeRoutine.outputArtifact}]. Requires human review before final dispatch.`,
          artifactType: handbook.id === 'p1' ? 'sms_verification' : handbook.id === 'c1' ? 'bid_package' : handbook.id === 'c2' ? 'legal_dispute' : 'lead_batch',
          dataPayload: {
            routineTrigger: activeRoutine.trigger,
            artifact: activeRoutine.outputArtifact,
            botRole: botName,
            businessCode: handbook.code
          },
          timestamp: new Date().toLocaleTimeString(),
          status: 'pending'
        });
      } else {
        setBotStates((prev) => ({ ...prev, [botName]: 'completed' }));
        setLogs((prev) => [
          ...prev,
          {
            id: `step-done-${Date.now()}`,
            timestamp: now(),
            bot: botName,
            level: 'success',
            message: `Autonomous routine completed successfully without human gate. Artifact written to ${activeRoutine.outputArtifact}.`
          }
        ]);
      }

      setIsExecuting(false);
      setCurrentStep(4);
    }, 3600);
  };

  const handleClearLogs = () => {
    setLogs([
      {
        id: `clear-${Date.now()}`,
        timestamp: new Date().toISOString().substring(11, 19),
        bot: 'System',
        level: 'info',
        message: 'Terminal logs flushed by operator.'
      }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-mono font-bold text-slate-900">{handbook.code} Active Fleet</span>
              <span aria-hidden="true">·</span>
              <span>10 Cloud VM Browser Bots</span>
              <span aria-hidden="true">·</span>
              <span>Single Host Node (/shared/data/)</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              10-Bot Cloud Fleet Console &amp; Routine Execution Simulator
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Trigger, inspect, and simulate any of the 10 persistent browser agents running automated routines. 
              External actions and high-liability submissions halt automatically at human approval gates.
            </p>
          </div>

          {/* Business Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 font-medium">Model:</span>
            <select
              value={selectedBusinessId}
              onChange={(e) => onSelectBusiness(e.target.value)}
              className="text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
            >
              {BUSINESS_HANDBOOKS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.code} - {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Routine Dispatch Control Bar */}
      <div className="bg-slate-900 text-slate-100 rounded-lg p-4 border border-slate-800 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              <span>Select Routine:</span>
            </span>
            <select
              value={selectedRoutineIndex}
              onChange={(e) => setSelectedRoutineIndex(Number(e.target.value))}
              disabled={isExecuting}
              className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded px-3 py-1.5 focus:outline-none focus:border-slate-500 cursor-pointer max-w-md truncate"
            >
              {handbook.routines.map((routine, idx) => (
                <option key={idx} value={idx}>
                  {routine.bot} | {routine.trigger} | {routine.outputArtifact}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleStartRoutine}
              disabled={isExecuting}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
                isExecuting
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isExecuting ? 'Bot Executing...' : 'Execute Selected Routine'}</span>
            </button>

            <button
              onClick={handleClearLogs}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors text-xs"
              title="Clear terminal stream"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Routine Summary Details */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
          <div><span className="text-slate-400">Trigger:</span> <span className="font-mono">{activeRoutine.trigger}</span></div>
          <div><span className="text-slate-400">Input:</span> <span className="font-mono truncate">{activeRoutine.inputSource}</span></div>
          <div><span className="text-slate-400">Artifact:</span> <span className="font-mono text-emerald-400 truncate">{activeRoutine.outputArtifact}</span></div>
          <div><span className="text-slate-400">Gate:</span> <span className="font-medium text-amber-400">{activeRoutine.approvalGate}</span></div>
        </div>
      </div>

      {/* Grid: 10 Bot Slots (Visual Hardware Matrix) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-700 uppercase tracking-wider">
            Active 10-Agent Allocation ({handbook.code})
          </span>
          <span>10 Max Concurrent Browser Instances</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {handbook.botFleet.map((bot, idx) => {
            const rawStatus = botStates[bot.name] || 'idle';
            const statusConfig = {
              idle: { label: 'Idle / Scheduled', color: 'text-slate-400', bg: 'bg-slate-100', border: 'border-slate-200' },
              running: { label: 'Active in Browser', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-300 animate-pulse' },
              waiting_approval: { label: 'Gate: Awaiting Human', color: 'text-amber-800', bg: 'bg-amber-50', border: 'border-amber-300' },
              completed: { label: 'Routine Finished', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-300' },
            }[rawStatus];

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-lg border transition-all ${statusConfig.border} ${statusConfig.bg}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-slate-700" />
                    <span className="font-mono text-xs font-bold text-slate-900 truncate">
                      {bot.name}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono font-semibold uppercase ${statusConfig.color}`}>
                    {rawStatus === 'waiting_approval' ? 'Gate' : rawStatus}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 font-medium truncate mb-2">
                  {bot.role}
                </div>

                <div className="text-[10px] text-slate-500 space-y-1 pt-1.5 border-t border-slate-200/60 font-mono">
                  <div className="truncate">Cap: {bot.capability}</div>
                  <div className="truncate text-slate-700">Gate: {bot.approvalBoundary}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated Live Terminal & Browser Stream */}
      <div className="bg-slate-950 text-slate-100 rounded-lg border border-slate-800 shadow-md overflow-hidden font-mono text-xs">
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-200">
              Live Fleet IPC Stream (/var/log/decafleet.log)
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>RAM: 3.2 GB / 16 GB</span>
            <span aria-hidden="true">·</span>
            <span>Concurrency: {isExecuting ? '1 Active' : '0 Active'} / 10 Max</span>
          </div>
        </div>

        <div
          ref={logTerminalRef}
          className="p-4 h-64 overflow-y-auto space-y-2 leading-relaxed select-text"
        >
          {logs.map((log) => {
            const levelColor = {
              info: 'text-slate-300',
              warn: 'text-amber-400',
              success: 'text-emerald-400 font-semibold',
              gate: 'text-amber-300 font-bold bg-amber-950/60 p-1 rounded border border-amber-800/80 block'
            }[log.level];

            return (
              <div key={log.id} className="flex items-start gap-2 text-[11px]">
                <span className="text-slate-500 shrink-0 font-mono">[{log.timestamp}]</span>
                <span className="text-cyan-400 font-bold shrink-0">&lt;{log.bot}&gt;</span>
                <span className={`${levelColor} break-words`}>{log.message}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
