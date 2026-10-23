export interface ScoreBreakdown {
  spd: number;
  cap: number;
  mar: number;
  ceil: number;
  def: number;
  fit: number;
  wtp: number;
}

/**
 * Calculates unit economics for a business given price, variable cost, and client count.
 */
export function calculateUnitEconomics(
  price: number,
  costPerClient: number,
  clientCount: number
) {
  const safeClients = Math.max(0, clientCount);
  const mrr = safeClients * price;
  const totalCost = safeClients * costPerClient;
  const grossProfit = mrr - totalCost;
  const grossMarginPercent = mrr > 0 ? (grossProfit / mrr) * 100 : 0;

  return {
    mrr,
    totalCost,
    grossProfit,
    grossMarginPercent: Number(grossMarginPercent.toFixed(1))
  };
}

/**
 * Calculates number of clients required to reach a specific MRR target.
 */
export function calculateTargetClients(targetMrr: number, price: number): number {
  if (price <= 0 || targetMrr <= 0) return 0;
  return Math.ceil(targetMrr / price);
}

/**
 * Computes bot fleet capacity utilization across a 10-bot shared cluster.
 */
export function calculateCapacityUtilization(
  clientCount: number,
  clientsPerBot: number,
  totalBots: number = 10
) {
  if (clientsPerBot <= 0 || totalBots <= 0) {
    return { utilizationPercent: 0, botsNeeded: 0, isSaturated: false };
  }
  const botsNeeded = Math.ceil(clientCount / clientsPerBot);
  const rawUtilization = (botsNeeded / totalBots) * 100;
  const utilizationPercent = Math.min(100, Math.round(rawUtilization));
  const isSaturated = botsNeeded > totalBots;

  return {
    utilizationPercent,
    botsNeeded,
    isSaturated
  };
}

/**
 * GPT_Buiness.md Quantitative Browser-Minute Concurrency Model:
 * - Standard 8-Lane Mode: 8 active worker lanes * 4,800 browser-min/month = 38,400 browser-min/month (2 bots reserved for Orchestrator/QA).
 * - Single-Pointer Fallback Mode: 1 active OS cursor lane = 4,800 browser-min/month on shared desktop.
 */
export function calculateBrowserMinuteBudget(
  clientCount: number,
  browserMinsPerClientPerMonth: number,
  singlePointerFallback: boolean = false,
  activeLanes: number = 8
) {
  const minsPerLanePerMonth = 4800; // 160 active hours/month * 30 mins/hr effective duty cycle
  const effectiveLanes = singlePointerFallback ? 1 : Math.max(1, Math.min(10, activeLanes));
  const totalAvailableMinutes = effectiveLanes * minsPerLanePerMonth; // 38,400 (8 lanes) or 4,800 (1 lane fallback)
  const requiredMinutes = Math.max(0, clientCount) * Math.max(1, browserMinsPerClientPerMonth);
  const utilizationPercent = Number(((requiredMinutes / totalAvailableMinutes) * 100).toFixed(1));
  const maxClientsSupported = Math.floor(totalAvailableMinutes / Math.max(1, browserMinsPerClientPerMonth));
  const isPointerBottleNecked = requiredMinutes > totalAvailableMinutes;

  return {
    effectiveLanes,
    totalAvailableMinutes,
    requiredMinutes,
    utilizationPercent,
    maxClientsSupported,
    isPointerBottleNecked
  };
}

/**
 * Calculates estimated operator human weekly hours with fixed overhead and per-client marginal time.
 */
export function calculateHumanHours(
  clientCount: number,
  baseHours: number = 6,
  hoursPerClient: number = 0.5,
  maxBudget: number = 20
) {
  const totalHours = Number((baseHours + clientCount * hoursPerClient).toFixed(1));
  const isOverBudget = totalHours > maxBudget;
  const delta = Number((maxBudget - totalHours).toFixed(1));

  return {
    totalHours,
    isOverBudget,
    delta
  };
}

/**
 * Computes the total candidate score across the 7 decision vectors.
 */
export function computeTotalScore(scores: ScoreBreakdown): number {
  return (
    scores.spd +
    scores.cap +
    scores.mar +
    scores.ceil +
    scores.def +
    scores.fit +
    scores.wtp
  );
}

export interface ExpansionGateInput {
  activeVerticals: number;
  currentRetainerClients: number;
  completedDeliveryCycles: number; // e.g., 1 cycle = 7 days of autonomous run
  unhandledDomErrorsPerDay: number;
  weeklySalesAndOpsHours: number;
  maxWeeklyHours?: number;
}

/**
 * Evaluates whether the solo operator should spin up the next vertical fleet.
 * Enforces Dual-Clock physics: Tech builds take 48h, but Market/Ops expansion
 * requires 2+ autonomous delivery cycles, <=1 unhandled DOM error/day, and headroom under the 20h/wk cap.
 */
export function evaluateExpansionGate(input: ExpansionGateInput) {
  const maxHours = input.maxWeeklyHours ?? 20;
  const newVerticalSetupAndSalesHours = 8; // 8h/wk to cold-close + configure a new ICP
  const projectedHours = Number((input.weeklySalesAndOpsHours + newVerticalSetupAndSalesHours).toFixed(1));

  const blockers: string[] = [];

  if (input.currentRetainerClients < 2) {
    blockers.push('Insufficient cash validation (<2 paying retainer clients in current vertical).');
  }
  if (input.completedDeliveryCycles < 2) {
    blockers.push('Zero retention proof (<2 full weekly autonomous delivery cycles completed).');
  }
  if (input.unhandledDomErrorsPerDay > 1) {
    blockers.push(`Fleet unstable (${input.unhandledDomErrorsPerDay} unhandled DOM/proxy errors/day; must be <=1).`);
  }
  if (projectedHours > maxHours) {
    blockers.push(`Operator hour breach: adding a vertical pushes workload to ${projectedHours}h/wk (cap: ${maxHours}h).`);
  }

  return {
    canExpandNow: blockers.length === 0,
    projectedHours,
    blockers,
    recommendedWaitDays: blockers.length === 0 ? 0 : Math.max(7, (2 - input.completedDeliveryCycles) * 7)
  };
}
