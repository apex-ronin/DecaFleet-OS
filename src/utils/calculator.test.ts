import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateUnitEconomics,
  calculateTargetClients,
  calculateCapacityUtilization,
  calculateBrowserMinuteBudget,
  calculateHumanHours,
  evaluateExpansionGate,
  computeFleetHealthSummary
} from './calculator.ts';

test('calculateUnitEconomics computes revenue, costs, and gross margin accurately', () => {
  // Test Sub Radar ($399 price, $12 cost, 25 clients)
  const subRadar = calculateUnitEconomics(399, 12, 25);
  assert.equal(subRadar.mrr, 9975);
  assert.equal(subRadar.totalCost, 300);
  assert.equal(subRadar.grossProfit, 9675);
  assert.equal(subRadar.grossMarginPercent, 97);

  // Test zero clients edge case
  const zeroResult = calculateUnitEconomics(2200, 80, 0);
  assert.equal(zeroResult.mrr, 0);
  assert.equal(zeroResult.grossProfit, 0);
  assert.equal(zeroResult.grossMarginPercent, 0);
});

test('calculateTargetClients calculates client volume thresholds correctly', () => {
  // $30,000 MRR at $2,200/mo -> 14 clients
  assert.equal(calculateTargetClients(30000, 2200), 14);
  // $10,000 MRR at $399/mo (Sub Radar) -> 26 clients
  assert.equal(calculateTargetClients(10000, 399), 26);
  // $30,000 MRR at $1,800/mo -> 17 clients
  assert.equal(calculateTargetClients(30000, 1800), 17);
  // Edge cases
  assert.equal(calculateTargetClients(0, 1800), 0);
  assert.equal(calculateTargetClients(10000, 0), 0);
});

test('calculateCapacityUtilization computes fleet capacity accurately', () => {
  // 6 clients, 3 clients per bot -> 2 bots needed out of 10 -> 20%
  const u1 = calculateCapacityUtilization(6, 3, 10);
  assert.equal(u1.botsNeeded, 2);
  assert.equal(u1.utilizationPercent, 20);
  assert.equal(u1.isSaturated, false);

  // 35 clients, 3 clients per bot -> 12 bots needed out of 10 -> saturated
  const u2 = calculateCapacityUtilization(35, 3, 10);
  assert.equal(u2.botsNeeded, 12);
  assert.equal(u2.isSaturated, true);
});

test('calculateBrowserMinuteBudget models 38,400 min/mo 8-lane vs 4,800 min/mo single-pointer fallback', () => {
  // 8-Lane Standard Mode: 20 clients * 600 mins/mo = 12,000 / 38,400 mins (31.3% utilization)
  const multiLane = calculateBrowserMinuteBudget(20, 600, false, 8);
  assert.equal(multiLane.totalAvailableMinutes, 38400);
  assert.equal(multiLane.requiredMinutes, 12000);
  assert.equal(multiLane.utilizationPercent, 31.3);
  assert.equal(multiLane.maxClientsSupported, 64);
  assert.equal(multiLane.isPointerBottleNecked, false);

  // Single-Pointer Fallback Mode (4,800 min/mo): 20 clients * 600 mins/mo = 12,000 / 4,800 -> bottlenecked!
  const singlePointer = calculateBrowserMinuteBudget(20, 600, true, 8);
  assert.equal(singlePointer.totalAvailableMinutes, 4800);
  assert.equal(singlePointer.maxClientsSupported, 8);
  assert.equal(singlePointer.isPointerBottleNecked, true);
});

test('calculateHumanHours enforces the 20 hour weekly ceiling', () => {
  // 10 clients at 0.5h marginal + 6h base = 11h (within 20h limit)
  const h1 = calculateHumanHours(10, 6, 0.5, 20);
  assert.equal(h1.totalHours, 11);
  assert.equal(h1.isOverBudget, false);
  assert.equal(h1.delta, 9);

  // 30 clients at 0.5h marginal + 6h base = 21h (over 20h limit)
  const h2 = calculateHumanHours(30, 6, 0.5, 20);
  assert.equal(h2.totalHours, 21);
  assert.equal(h2.isOverBudget, true);
  assert.equal(h2.delta, -1);
});

test('evaluateExpansionGate blocks premature Day-3 expansion and passes when Trigger Gates clear', () => {
  // Premature Day-3 attempt: 1 client, 0 full cycles, 4 DOM errors/day, 14h/wk already used
  const premature = evaluateExpansionGate({
    activeVerticals: 1,
    currentRetainerClients: 1,
    completedDeliveryCycles: 0,
    unhandledDomErrorsPerDay: 4,
    weeklySalesAndOpsHours: 14,
    maxWeeklyHours: 20
  });
  assert.equal(premature.canExpandNow, false);
  assert.equal(premature.blockers.length, 4);
  assert.equal(premature.projectedHours, 22);

  // Trigger Gate cleared at Day 14: 3 clients, 2 full weekly cycles, 0 DOM errors, 9h/wk used
  const ready = evaluateExpansionGate({
    activeVerticals: 1,
    currentRetainerClients: 3,
    completedDeliveryCycles: 2,
    unhandledDomErrorsPerDay: 0,
    weeklySalesAndOpsHours: 9,
    maxWeeklyHours: 20
  });
  assert.equal(ready.canExpandNow, true);
  assert.equal(ready.blockers.length, 0);
  assert.equal(ready.projectedHours, 17);
});

test('computeFleetHealthSummary aggregates 10-bot uptime, lanes, and API health status', () => {
  const bots = Array.from({ length: 10 }, (_, idx) => ({
    botId: `bot-${String(idx + 1).padStart(2, '0')}`,
    lane: idx + 1,
    healthState: 'HEALTHY' as const,
    uptimePercent: 99.9,
    wakeGateBypassPercent: 88.0,
    memoryMb: 320
  }));

  const apis = [
    { serviceId: 'typesafe-jev', status: 'OPERATIONAL' as const, latencyMs: 42, uptimePercent: 99.99 },
    { serviceId: 'litellm-router', status: 'OPERATIONAL' as const, latencyMs: 18, uptimePercent: 99.98 },
    { serviceId: 'stagehand-cdp', status: 'OPERATIONAL' as const, latencyMs: 11, uptimePercent: 99.95 },
    { serviceId: 'dbos-postgres', status: 'OPERATIONAL' as const, latencyMs: 7, uptimePercent: 99.99 },
    { serviceId: 'public-registries', status: 'OPERATIONAL' as const, latencyMs: 162, uptimePercent: 99.85 }
  ];

  const optimal = computeFleetHealthSummary(bots, apis);
  assert.equal(optimal.overallStatus, 'OPTIMAL');
  assert.equal(optimal.totalBots, 10);
  assert.equal(optimal.healthyBots, 10);
  assert.equal(optimal.degradedBots, 0);
  assert.equal(optimal.activeWorkerLanes, 8);
  assert.equal(optimal.reserveLanesReady, 2);
  assert.equal(optimal.avgUptimePercent, 99.9);
  assert.equal(optimal.avgWakeGateBypassPercent, 88);
  assert.equal(optimal.operationalApis, 5);
  assert.equal(optimal.avgApiLatencyMs, 48);

  // Degrade 1 bot on lane 3 -> DEGRADED overall status and 7 active worker lanes
  const withDegradedBot = bots.map((b, i) =>
    i === 2 ? { ...b, healthState: 'DEGRADED' as const, uptimePercent: 96.5 } : b
  );
  const degradedSummary = computeFleetHealthSummary(withDegradedBot, apis);
  assert.equal(degradedSummary.overallStatus, 'DEGRADED');
  assert.equal(degradedSummary.healthyBots, 9);
  assert.equal(degradedSummary.degradedBots, 1);
  assert.equal(degradedSummary.activeWorkerLanes, 7);
});
