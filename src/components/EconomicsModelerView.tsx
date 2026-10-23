import React, { useState } from 'react';
import { BUSINESS_HANDBOOKS } from '../data/handbooks.ts';
import {
  calculateUnitEconomics,
  calculateTargetClients,
  calculateCapacityUtilization,
  calculateBrowserMinuteBudget,
  calculateHumanHours
} from '../utils/calculator.ts';
import {
  Sliders,
  AlertTriangle,
  TrendingUp,
  Cpu,
  Scale
} from 'lucide-react';

export const EconomicsModelerView: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('c1'); // Default to C1: Grok Sub Radar (#1 Most Likely to Succeed)
  const [clientCount, setClientCount] = useState<number>(25);
  const [customPrice, setCustomPrice] = useState<number>(399);
  const [customCost, setCustomCost] = useState<number>(12);
  const [clientsPerBot, setClientsPerBot] = useState<number>(15);
  const [hoursPerClient, setHoursPerClient] = useState<number>(0.25);
  const [browserMinsPerClient, setBrowserMinsPerClient] = useState<number>(320);
  const [singlePointerFallback, setSinglePointerFallback] = useState<boolean>(false);

  // Update presets when switching business
  const handleSelectBusiness = (id: string) => {
    setSelectedId(id);
    if (id === 'c1') {
      // Grok Sub Radar ($399/mo, $12 cost, 320 browser-min/mo)
      setCustomPrice(399);
      setCustomCost(12);
      setClientsPerBot(15);
      setHoursPerClient(0.25);
      setBrowserMinsPerClient(320);
      setClientCount(25);
    } else if (id === 'p1') {
      // Grok Stage-2 Cross-Sell: Trade Map Desk ($449/mo, $18 cost, 420 browser-min/mo)
      setCustomPrice(449);
      setCustomCost(18);
      setClientsPerBot(15);
      setHoursPerClient(0.3);
      setBrowserMinsPerClient(420);
      setClientCount(20);
    } else if (id === 'p2') {
      // GPT Best-of-Class P-B: Catalog Exception Desk ($1,000/mo, $42 cost, 960 browser-min/mo)
      setCustomPrice(1000);
      setCustomCost(42);
      setClientsPerBot(5);
      setHoursPerClient(0.4);
      setBrowserMinsPerClient(960);
      setClientCount(15);
    } else if (id === 'p3') {
      // Claude Rebuild: No-Login Funnel & Metadata Desk ($499/mo, $22 cost, 480 browser-min/mo)
      setCustomPrice(499);
      setCustomCost(22);
      setClientsPerBot(10);
      setHoursPerClient(0.35);
      setBrowserMinsPerClient(480);
      setClientCount(20);
    } else if (id === 'c2') {
      // GPT C-A + TrafficReclaim: Fleet Collision Lab ($1,800/mo, $75 cost, 1,600 browser-min/mo)
      setCustomPrice(1800);
      setCustomCost(75);
      setClientsPerBot(3);
      setHoursPerClient(0.5);
      setBrowserMinsPerClient(1600);
      setClientCount(12);
    } else if (id === 'c3') {
      // Grok Seat Sniper ($400/mo, $24 cost, 540 browser-min/mo)
      setCustomPrice(400);
      setCustomCost(24);
      setClientsPerBot(9);
      setHoursPerClient(0.3);
      setBrowserMinsPerClient(540);
      setClientCount(20);
    }
  };

  const economics = calculateUnitEconomics(customPrice, customCost, clientCount);
  const target3k = calculateTargetClients(3000, customPrice);
  const target10k = calculateTargetClients(10000, customPrice);
  const target30k = calculateTargetClients(30000, customPrice);

  const capacity = calculateCapacityUtilization(clientCount, clientsPerBot, 10);
  const browserBudget = calculateBrowserMinuteBudget(
    clientCount,
    browserMinsPerClient,
    singlePointerFallback,
    8
  );
  const humanHours = calculateHumanHours(clientCount, 5, hoursPerClient, 20);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-900">GPT_Buiness (96/100) + Ara-Grok (95/100) Quantitative Engine</span>
              <span aria-hidden="true">·</span>
              <span>38,400 Min/Mo 8-Lane vs. 4,800 Min/Mo Single-Pointer Math</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sliders className="w-5 h-5 text-slate-800" />
              <span>Unit Economics, Browser-Minute Concurrency &amp; Capacity Modeler</span>
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Model client volume, recurring revenue, GPT&apos;s <strong>38,400 browser-minute/month</strong> 8-lane concurrency budget (and <strong>4,800 min/mo</strong> single-pointer fallback), and the 20-hour weekly operator ceiling.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 font-medium">Model Preset:</span>
            <select
              value={selectedId}
              onChange={(e) => handleSelectBusiness(e.target.value)}
              className="text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
            >
              {BUSINESS_HANDBOOKS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.code}: {b.name}
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
            {clientCount} clients × ${customPrice}/mo [comparable]
          </div>
        </div>

        {/* Net Gross Profit */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Net Gross Profit (94%+ Target)
          </span>
          <div className="text-2xl font-mono font-bold text-emerald-700 tabular-nums">
            ${economics.grossProfit.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-800 font-medium">
            Margin: <strong>{economics.grossMarginPercent}%</strong> [measured]
          </div>
        </div>

        {/* GPT Browser-Minute Concurrency Budget */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Browser-Min / Mo ({singlePointerFallback ? '1-Lane Lock' : '8 Lanes'})
          </span>
          <div
            className={`text-2xl font-mono font-bold tabular-nums ${
              browserBudget.isPointerBottleNecked ? 'text-rose-600' : 'text-slate-900'
            }`}
          >
            {browserBudget.requiredMinutes.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-500">
              / {browserBudget.totalAvailableMinutes.toLocaleString()}m
            </span>
          </div>
          <div className="text-xs text-slate-500">
            {browserBudget.utilizationPercent}% of {browserBudget.effectiveLanes}-lane budget (Max {browserBudget.maxClientsSupported} clients)
          </div>
        </div>

        {/* Human Operator Hours */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Weekly Operator Workload
          </span>
          <div
            className={`text-2xl font-mono font-bold tabular-nums ${
              humanHours.isOverBudget ? 'text-rose-600' : 'text-slate-900'
            }`}
          >
            {humanHours.totalHours} <span className="text-sm font-normal text-slate-500">h / week</span>
          </div>
          <div
            className={`text-xs font-medium ${
              humanHours.isOverBudget ? 'text-rose-700 font-bold' : 'text-emerald-700'
            }`}
          >
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-700" />
              <span>Interactive Operational &amp; Concurrency Levers</span>
            </h2>

            {/* GPT Single-Pointer Fallback Toggle */}
            <button
              onClick={() => setSinglePointerFallback(!singlePointerFallback)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold border transition-colors cursor-pointer ${
                singlePointerFallback
                  ? 'bg-rose-600 text-white border-rose-700'
                  : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              {singlePointerFallback
                ? '⚠️ Single-Pointer Fallback Active (4,800 min/mo)'
                : '✓ 8-Lane Headless/Virtual Display Mode (38,400 min/mo)'}
            </button>
          </div>

          <div className="space-y-5">
            {/* Slider 1: Active Retainer Clients */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-800">Active Retainer Clients:</label>
                <span className="font-mono font-bold text-slate-900 text-sm">{clientCount} Clients</span>
              </div>
              <input
                type="range"
                min="1"
                max="80"
                value={clientCount}
                onChange={(e) => setClientCount(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>1 Client</span>
                <span>25 Clients (Stage 2 Target)</span>
                <span>80 Clients (Sub Radar Scale)</span>
              </div>
            </div>

            {/* Slider 2: Retainer Price */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-800">Monthly Retainer Price:</label>
                <span className="font-mono font-bold text-slate-900 text-sm">${customPrice} / mo</span>
              </div>
              <input
                type="range"
                min="149"
                max="3500"
                step="50"
                value={customPrice}
                onChange={(e) => setCustomPrice(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>$399 (Grok Sub Radar)</span>
                <span>$1,000 (GPT Catalog Desk)</span>
                <span>$3,500 (Enterprise QA)</span>
              </div>
            </div>

            {/* Slider 3: Browser-Minutes Per Client Per Month */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-800">
                  Browser-Minutes Per Client / Month (GPT Concurrency Spec):
                </label>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {browserMinsPerClient} min/mo [measured]
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="2400"
                step="50"
                value={browserMinsPerClient}
                onChange={(e) => setBrowserMinsPerClient(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>320m (Sub Radar Public Lookup)</span>
                <span>960m (Catalog Exception Crawl)</span>
                <span>1,600m (Multi-Agent Collision QA)</span>
              </div>
            </div>

            {/* Warning alert if pointer-bottlenecked or saturated */}
            {(browserBudget.isPointerBottleNecked || capacity.isSaturated) && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong>GPT Concurrency Saturation Alert:</strong> At {clientCount} clients × {browserMinsPerClient} min/mo ({browserBudget.requiredMinutes.toLocaleString()} required browser-minutes), you exceed the{' '}
                  <strong>{browserBudget.totalAvailableMinutes.toLocaleString()} min/mo</strong> budget of{' '}
                  {singlePointerFallback
                    ? 'Single-Pointer OS Fallback Mode (max ' + browserBudget.maxClientsSupported + ' clients).'
                    : 'the 8-lane shared machine (max ' + browserBudget.maxClientsSupported + ' clients).'}
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
                <span className="font-semibold text-slate-700">$3,000 MRR (Stage 1 Target)</span>
                <span className="font-mono font-bold text-slate-900">{target3k} Clients Needed</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Weeks 1–4 via Grok&apos;s zero-credential Sub Radar ($149 audit &rarr; $399/mo).
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">$10,000 MRR (Stage 2 Target)</span>
                <span className="font-mono font-bold text-slate-900">{target10k} Clients Needed</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Months 2–3 by scaling Sub Radar + cross-selling Trade Map Desk ($449/mo).
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 text-white rounded-lg space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-amber-400">$30,000 MRR Sovereign Goal</span>
                <span className="font-mono font-bold text-white text-sm">{target30k} Clients Needed</span>
              </div>
              <div className="text-[11px] text-slate-300">
                Reached in Stages 3–4 by blending Sub Radar ($399), Trade Map ($449), GPT Catalog Desk ($1,000), and Collision Lab ($1,800).
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-900 space-y-1">
            <strong>Why Zero-Credential Public Data Wins:</strong>
            <p className="text-[11px] leading-relaxed">
              Because Sub Radar (C1) and Seat Sniper (C3) query 100% public government registries with zero logins, all 8 worker lanes run in parallel without cookie collisions or IP bans.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Across All 6 Synthesized Handbooks */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-slate-700" />
          <span>Tri-Championship Unit Economics &amp; Concurrency Matrix (All 6 Handbooks)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
              <tr>
                <th className="py-2.5 px-3">Model</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Entry Audit</th>
                <th className="py-2.5 px-3">Core Retainer</th>
                <th className="py-2.5 px-3">Variable Cost</th>
                <th className="py-2.5 px-3">Gross Margin</th>
                <th className="py-2.5 px-3 text-center">Clients for $10k</th>
                <th className="py-2.5 px-3">Primary Concurrency Constraint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BUSINESS_HANDBOOKS.map((b) => (
                <tr
                  key={b.id}
                  className={`hover:bg-slate-50 cursor-pointer ${
                    b.id === selectedId ? 'bg-slate-50/80 font-medium' : ''
                  }`}
                  onClick={() => handleSelectBusiness(b.id)}
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {b.code}: {b.name.split('—')[0]}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{b.label}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{b.offerAndPricing.entry.price}</td>
                  <td className="py-2.5 px-3 font-mono font-bold tabular-nums">
                    {b.unitEconomics.price.split(' ')[0]}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">
                    {b.unitEconomics.costPerClient.split(' ')[0]}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-emerald-700 tabular-nums">
                    {b.unitEconomics.grossMarginPercent.split(' ')[0]}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono tabular-nums font-bold">
                    {b.unitEconomics.clientsFor10k}
                  </td>
                  <td className="py-2.5 px-3 text-xs text-slate-500 max-w-xs truncate">
                    {b.capacityMath.concurrencyLimit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
