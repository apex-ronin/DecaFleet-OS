import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateUnitEconomics,
  calculateTargetClients,
  calculateCapacityUtilization,
  calculateHumanHours,
  computeTotalScore,
  evaluateExpansionGate
} from './calculator.ts';

test('calculateUnitEconomics computes revenue, costs, and gross margin accurately', () => {
  // Test P2: IntentPipe ($2200 price, $80 cost, 5 clients)
  const result = calculateUnitEconomics(2200, 80, 5);
  assert.equal(result.mrr, 11000);
  assert.equal(result.totalCost, 400);
  assert.equal(result.grossProfit, 10600);
  assert.equal(result.grossMarginPercent, 96.4);

  // Test zero clients edge case
  const zeroResult = calculateUnitEconomics(2200, 80, 0);
  assert.equal(zeroResult.mrr, 0);
  assert.equal(zeroResult.grossProfit, 0);
  assert.equal(zeroResult.grossMarginPercent, 0);
});

test('calculateTargetClients calculates client volume thresholds correctly', () => {
  // $30,000 MRR at $2,200/mo -> 14 clients
  assert.equal(calculateTargetClients(30000, 2200), 14);
  // $10,000 MRR at $750/mo -> 14 clients
  assert.equal(calculateTargetClients(10000, 750), 14);
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

test('computeTotalScore correctly sums the 7 candidate vectors', () => {
  const scores = { spd: 4, cap: 5, mar: 5, ceil: 5, def: 4, fit: 5, wtp: 5 };
  assert.equal(computeTotalScore(scores), 33);
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

