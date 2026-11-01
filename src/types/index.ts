export type BusinessType = 'PROVEN' | 'CONTRARIAN';
export type ConfidenceLevel = 'High' | 'Med' | 'Low';

export interface BotDefinition {
  name: string;
  role: string;
  jobDescription: string;
  capability: string;
  approvalBoundary: string;
}

export interface RoutineDefinition {
  bot: string;
  trigger: string;
  inputSource: string;
  outputArtifact: string;
  approvalGate: string;
  failureBehaviour: string;
}

export interface SkillDefinition {
  order: number;
  title: string;
  description: string;
  acceptanceTest: string;
}

export interface TierPricing {
  name: string;
  price: string;
  cadence: 'one-time' | 'monthly';
  deliverable: string;
  turnaround: string;
}

export interface FailureMode {
  title: string;
  signal: string;
  killCriterion: string;
}

export interface DayMilestone {
  day: number;
  action: string;
  artifact: string;
  revenueTrigger: string;
  revenue: number;
}

export interface BusinessHandbook {
  id: string;
  code: string; // P1, P2, P3, C1, C2, C3
  name: string;
  oneLineThesis: string;
  label: BusinessType;
  confidence: ConfidenceLevel;
  labelJustification: string;
  whyThisMakesMoney: {
    mechanism: string;
    buyerOutcome: string;
    economicValue: string;
  };
  whyNow: string;
  buyer: {
    icp: string;
    firmographics: string;
    whereToFind: {
      platforms: string[];
      searchString: string;
    };
    currentWorkaround: string;
  };
  offerAndPricing: {
    entry: TierPricing;
    core: TierPricing;
    expansion: TierPricing;
    riskReversal: string;
  };
  botFleet: BotDefinition[];
  routines: RoutineDefinition[];
  skillsToBuild: SkillDefinition[];
  humanMap: {
    weeklyHourBudget: number;
    breakdown: { task: string; hours: number }[];
  };
  cashPlan7Day: DayMilestone[];
  plan90Day: {
    week4: { milestone: string; revenueTarget: string };
    week8: { milestone: string; revenueTarget: string };
    week12: { milestone: string; revenueTarget: string };
  };
  unitEconomics: {
    price: string;
    costPerClient: string;
    grossMarginPercent: string;
    clientsFor3k: number;
    clientsFor10k: number;
    clientsFor30k: number;
    bottleneck: string;
    labeledMetrics: { metric: string; value: string; label: '[measured]' | '[comparable]' | '[estimate]' }[];
  };
  capacityMath: {
    clientsPerBot: string;
    concurrencyLimit: string;
    fleetCeiling: string;
    primaryConstraint: string;
  };
  failureModes: FailureMode[];
  riskLegalCompliance: {
    platformToS: string;
    dataAndPrivacy: string;
    contractAndPayment: string;
    licensing: string;
  };
  honestCaseAgainst: {
    argument: string;
    operatorVerdict: string;
  };
  first5Sales: {
    targets: string[];
    coldPitch: {
      subject: string;
      body: string;
      wordCount: number;
    };
  };
}

export interface SimulatedLog {
  id: string;
  timestamp: string;
  bot: string;
  level: 'info' | 'warn' | 'success' | 'gate';
  message: string;
  artifactUrl?: string;
}

export interface SystemOneTelemetry {
  model: string;
  atomicAnswers: {
    routing_intent: {
      type: 'choice';
      choice: 'auto_dispatch' | 'co_sign_batch' | 'escalate_human' | 'reject_malformed';
      confidence: number;
      probabilities: Record<string, number>;
    };
    non_delegable_boundary: { type: 'noul'; noul: number };
    primary_evidence_verified: { type: 'noul'; noul: number };
    zero_login_compliant: { type: 'noul'; noul: number };
    payload_checksum_valid: { type: 'noul'; noul: number };
    blast_radius: {
      type: 'score';
      score: number;
      confidence: number;
      probabilities: Record<string, number>;
    };
  };
  compositeLiabilityRisk: number;
  gatingTriggered: {
    isGated: boolean;
    gateReason: string;
    policyThresholdApplied: string;
  };
}

export interface JevAiVerdict {
  itemId: string;
  tier: 'TIER_1_AUTO_DISPATCH' | 'TIER_2_CO_SIGN' | 'TIER_3_HARD_HUMAN_LOCK';
  decision: 'APPROVE' | 'REJECT' | 'ESCALATE_TO_HUMAN';
  confidenceScore: number;
  riskScore: number;
  constitutionalChecks: {
    rule: string;
    passed: boolean;
    detail: string;
  }[];
  rationale: string;
  recommendedAction: string;
  timeSavedMinutes: number;
  evaluatedBy: string;
  evaluatedAt: string;
  systemOne?: SystemOneTelemetry;
}

export interface ApprovalItem {
  id: string;
  businessId: string;
  botName: string;
  title: string;
  summary: string;
  artifactType:
    | 'sms_verification'
    | 'email_draft'
    | 'bid_package'
    | 'legal_dispute'
    | 'review_response'
    | 'lead_batch'
    | 'compliance_alert'
    | 'catalog_patch'
    | 'collision_trace'
    | 'slot_hold';
  dataPayload: Record<string, any>;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  jevAiVerdict?: JevAiVerdict;
}
