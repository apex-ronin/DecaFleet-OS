import React, { useState } from 'react';
import { BUSINESS_HANDBOOKS } from '../data/handbooks.ts';
import { 
  calculateUnitEconomics, 
  calculateTargetClients, 
  calculateCapacityUtilization, 
  calculateHumanHours 
} from '../utils/calculator.ts';
import { 
  DollarSign, 
  Sliders, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Cpu, 
  Clock, 
  Scale 
} from 'lucide-react';

export const EconomicsModelerView: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('p2'); // Default to IntentPipe
  const [clientCount, setClientCount] = useState<number>(10);
  const [customPrice, setCustomPrice] = useState<number>(2200);
  const [customCost, setCustomCost] = useState<number>(80);
  const [clientsPerBot, setClientsPerBot] = useState<number>(3);
  const [hoursPerClient, setHoursPerClient] = useState<number>(0.5);

  const handbook = BUSINESS_HANDBOOKS.find((b) => b.id === selectedId) || BUSINESS_HANDBOOKS[1];

  // Update presets when switching business
  const handleSelectBusiness = (id: string) => {
    setSelectedId(id);
    const b = BUSINESS_HANDBOOKS.find((item) => item.id === id);
    if (!b) return;

    if (id === 'p1') {
      setCustomPrice(750);
      setCustomCost(30);
      setClientsPerBot(15);
      setHoursPerClient(0.3);
    } else if (id === 'p2') {
      setCustomPrice(2200);
      setCustomCost(80);
      setClientsPerBot(3);
      setHoursPerClient(0.5);
    } else if (id === 'p3') {
      setCustomPrice(1200);
      setCustomCost(60);
      setClientsPerBot(5);
      setHoursPerClient(0.4);
    } else if (id === 'c1') {
      setCustomPrice(1800);
      setCustomCost(70);
      setClientsPerBot(4);
      setHoursPerClient(0.5);
    } else if (id === 'c2') {
      setCustomPrice(2500);
      setCustomCost(95);
      setClientsPerBot(4);
      setHoursPerClient(0.4);
    } else if (id === 'c3') {
      setCustomPrice(2000);
      setCustomCost(80);
      setClientsPerBot(3);
      setHoursPerClient(0.5);
    }
  };

  const economics = calculateUnitEconomics(customPrice, customCost, clientCount);
  const target3k = calculateTargetClients(3000, customPrice);
  const target10k = calculateTargetClients(10000, customPrice);
  const target30k = calculateTargetClients(30000, customPrice);

  const capacity = calculateCapacityUtilization(clientCount, clientsPerBot, 10);
  const humanHours = calculateHumanHours(clientCount, 6, hoursPerClient, 20);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-900">Financial Modeling Engine</span>
              <span aria-hidden="true">·</span>
              <span>Unit Economics &amp; Hardware Capacity Math</span>
              <span aria-hidden="true">·</span>
              <span>20h/Week Operator Budget Enforcement</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sliders className="w-5 h-5 text-slate-800" />
              <span>Unit Economics, Margin &amp; Fleet Capacity Modeler</span>
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Model client volume, recurring revenue, residential proxy consumption, bot concurrency saturation, and the operator's non-negotiable 20-hour weekly cap.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 font-medium">Preset:</span>
            <select
              value={selectedId}
              onChange={(e) => handleSelectBusiness(e.target.value)}
              className="text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
            >
              {BUSINESS_HANDBOOKS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.code}: {b.name.split(' ')[0]} {b.name.split(' ')[1] || ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MRR */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Monthly Recurring Revenue (MRR)
          </span>
          <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
            ${economics.mrr.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500">
            {clientCount} clients × ${customPrice}/mo
          </div>
        </div>

        {/* Net Gross Profit */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Net Gross Profit (95%+ Target)
          </span>
          <div className="text-2xl font-mono font-bold text-emerald-700 tabular-nums">
            ${economics.grossProfit.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-800 font-medium">
            Margin: <strong>{economics.grossMarginPercent}%</strong> [measured]
          </div>
        </div>

        {/* Fleet Concurrency */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Bot Fleet Concurrency
          </span>
          <div className={`text-2xl font-mono font-bold tabular-nums ${
            capacity.isSaturated ? 'text-rose-600' : 'text-slate-900'
          }`}>
            {capacity.botsNeeded} / 10 Bots
          </div>
          <div className="text-xs text-slate-500">
            {capacity.utilizationPercent}% cluster capacity used
          </div>
        </div>

        {/* Human Operator Hours */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Weekly Operator Workload
          </span>
          <div className={`text-2xl font-mono font-bold tabular-nums ${
            humanHours.isOverBudget ? 'text-rose-600' : 'text-slate-900'
          }`}>
            {humanHours.totalHours} <span className="text-sm font-normal text-slate-500">h / week</span>
          </div>
          <div className={`text-xs font-medium ${
            humanHours.isOverBudget ? 'text-rose-700 font-bold' : 'text-emerald-700'
          }`}>
            {humanHours.isOverBudget 
              ? `EXCEEDS 20h CAP by ${Math.abs(humanHours.delta)}h!` 
              : `${humanHours.delta}h buffer remaining under 20h cap`}
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Controls + Target Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-700" />
            <span>Interactive Operational Levers</span>
          </h2>

          <div className="space-y-5">
            {/* Slider 1: Active Retainer Clients */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-800">
                  Active Retainer Clients:
                </label>
                <span className="font-mono font-bold text-slate-900 text-sm">{clientCount} Clients</span>
              </div>
              <input
                type="range"
                min="1"
                max="45"
                value={clientCount}
                onChange={(e) => setClientCount(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>1 Client</span>
                <span>14 Clients ($30k goal)</span>
                <span>45 Clients (Fleet limit)</span>
              </div>
            </div>

            {/* Slider 2: Retainer Price */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-800">
                  Monthly Retainer Price:
                </label>
                <span className="font-mono font-bold text-slate-900 text-sm">${customPrice} / mo</span>
              </div>
              <input
                type="range"
                min="350"
                max="4500"
                step="50"
                value={customPrice}
                onChange={(e) => setCustomPrice(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>$350 (Entry)</span>
                <span>$2,200 (Core B2B)</span>
                <span>$4,500 (Expansion)</span>
              </div>
            </div>

            {/* Slider 3: Cost per Client */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-800">
                  Cost Per Client (Proxies + VM Compute + Verification):
                </label>
                <span className="font-mono font-bold text-slate-900 text-sm">${customCost} / mo</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={customCost}
                onChange={(e) => setCustomCost(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>$20 (Low proxy)</span>
                <span>$80 (Standard residential)</span>
                <span>$150 (Heavy video/OCR)</span>
              </div>
            </div>

            {/* Warning alert if saturated */}
            {capacity.isSaturated && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Hardware Concurrency Saturation Alert:</strong> At {clientCount} clients, the fleet requires {capacity.botsNeeded} concurrent browser instances, exceeding the 10-bot shared VM limit. At this volume, horizontal VM sharding or staggering scheduled cron windows is mandatory.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Target Milestones Card (1 col) */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-700" />
            <span>Path to $30k MRR Goal</span>
          </h2>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">$3,000 MRR Milestone</span>
                <span className="font-mono font-bold text-slate-900">{target3k} Clients Needed</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Achievable in Month 1 via standard outreach scripts.
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">$10,000 MRR Milestone</span>
                <span className="font-mono font-bold text-slate-900">{target10k} Clients Needed</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Achievable in Month 3; human weekly hours ~11h/wk.
              </div>
            </div>

            <div className="p-3 bg-slate-900 text-white rounded-lg space-y-1 p-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-amber-400">$30,000 MRR Annual Target</span>
                <span className="font-mono font-bold text-white text-sm">{target30k} Clients Needed</span>
              </div>
              <div className="text-[11px] text-slate-300">
                12-month goal reached with zero employees, under 20h/week.
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-900 space-y-1">
            <strong>The 5x Revenue Multiplier Law:</strong>
            <p className="text-[11px] leading-relaxed">
              Because 10 persistent browser agents execute the routine labour, taking revenue from $6k to $30k requires scaling compute and proxy pools, NOT human working hours.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Across All 6 Handbooks */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-slate-700" />
          <span>Cross-Handbook Unit Economics Matrix (All 6 Models Compared)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
              <tr>
                <th className="py-2.5 px-3">Model</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Core Retainer</th>
                <th className="py-2.5 px-3">Variable Cost</th>
                <th className="py-2.5 px-3">Gross Margin</th>
                <th className="py-2.5 px-3 text-center">Clients for $10k</th>
                <th className="py-2.5 px-3 text-center">Clients for $30k</th>
                <th className="py-2.5 px-3">Primary Constraint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BUSINESS_HANDBOOKS.map((b) => (
                <tr 
                  key={b.id} 
                  className={`hover:bg-slate-50 cursor-pointer ${b.id === selectedId ? 'bg-slate-50/80 font-medium' : ''}`}
                  onClick={() => handleSelectBusiness(b.id)}
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {b.code} ({b.name.split(' ')[0]})
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {b.label}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{b.unitEconomics.price.split(' ')[0]}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{b.unitEconomics.costPerClient.split(' ')[0]}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-emerald-700 tabular-nums">
                    {b.unitEconomics.grossMarginPercent.split(' ')[0]}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono tabular-nums font-bold">{b.unitEconomics.clientsFor10k}</td>
                  <td className="py-2.5 px-3 text-center font-mono tabular-nums font-bold text-slate-900">{b.unitEconomics.clientsFor30k}</td>
                  <td className="py-2.5 px-3 text-xs text-slate-500 max-w-xs truncate">{b.unitEconomics.bottleneck}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
