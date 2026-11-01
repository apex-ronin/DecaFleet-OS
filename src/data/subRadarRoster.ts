export interface SubRadarSampleSub {
  id: string;
  subcontractorName: string;
  trade: string;
  stateBoard: 'CSLB (CA)' | 'TDLR (TX)' | 'DBPR (FL)';
  licenseNumber: string;
  licenseStatus: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
  bondStatus: 'ACTIVE ($25k)' | 'LAPSED' | 'ACTIVE ($50k)';
  workersComp: 'VERIFIED' | 'EXPIRED_POLICY' | 'EXEMPT_FILING_INVALID';
  lastDiffTimestamp: string;
  liabilityAlert?: string;
}

export const SUB_RADAR_LIVE_ROSTER: SubRadarSampleSub[] = [
  {
    id: 'sub-01',
    subcontractorName: 'Sierra Structural Concrete LLC',
    trade: 'Structural Concrete & Foundations',
    stateBoard: 'CSLB (CA)',
    licenseNumber: 'CA-1049281 (Class C-8)',
    licenseStatus: 'SUSPENDED',
    bondStatus: 'LAPSED',
    workersComp: 'VERIFIED',
    lastDiffTimestamp: 'Today 05:14 AM PST',
    liabilityAlert:
      'CRITICAL STOP-WORK RISK: Contractor bond ($25,000 Surety #88412) lapsed 48h ago on CSLB registry. Automatic license suspension triggered under CA Bus. & Prof. Code § 7071.6. GC commercial umbrella policy void if crew steps on site today.'
  },
  {
    id: 'sub-02',
    subcontractorName: 'LoneStar Commercial HVAC & Mechanical',
    trade: 'HVAC & Sheet Metal',
    stateBoard: 'TDLR (TX)',
    licenseNumber: 'TACLA88392C',
    licenseStatus: 'ACTIVE',
    bondStatus: 'ACTIVE ($25k)',
    workersComp: 'EXPIRED_POLICY',
    lastDiffTimestamp: 'Today 05:16 AM PST',
    liabilityAlert:
      'HIGH LIABILITY ALERT: Texas Mutual Workers-Comp certificate expired yesterday at 11:59 PM. Active 6-man crew scheduled on Job Site #4 (Austin Medical Annex).'
  },
  {
    id: 'sub-03',
    subcontractorName: 'Biscayne Glazing & Curtainwall Inc.',
    trade: 'Commercial Glass & Glazing',
    stateBoard: 'DBPR (FL)',
    licenseNumber: 'SCC131152409',
    licenseStatus: 'ACTIVE',
    bondStatus: 'ACTIVE ($50k)',
    workersComp: 'EXEMPT_FILING_INVALID',
    lastDiffTimestamp: 'Today 05:19 AM PST',
    liabilityAlert:
      'COMPLIANCE WARNING: Officer Workers-Comp Exemption expired for 2 field supervisors listed on payroll.'
  },
  {
    id: 'sub-04',
    subcontractorName: 'Pacific Rim Electrical Contractors',
    trade: 'C-10 Electrical',
    stateBoard: 'CSLB (CA)',
    licenseNumber: 'CA-9948102 (Class C-10)',
    licenseStatus: 'ACTIVE',
    bondStatus: 'ACTIVE ($25k)',
    workersComp: 'VERIFIED',
    lastDiffTimestamp: 'Today 05:21 AM PST'
  },
  {
    id: 'sub-05',
    subcontractorName: 'Vanguard Fire Suppression Systems',
    trade: 'C-16 Fire Protection',
    stateBoard: 'CSLB (CA)',
    licenseNumber: 'CA-8831044 (Class C-16)',
    licenseStatus: 'ACTIVE',
    bondStatus: 'ACTIVE ($50k)',
    workersComp: 'VERIFIED',
    lastDiffTimestamp: 'Today 05:22 AM PST'
  }
];

export const HERMES_STACK_SPEC = {
  architectureName: 'DecaFleet Sovereign Stack (Hermes + Stagehand + LiteLLM + DBOS + invisible_dots)',
  monthlyInfraCost: '$18 – $42 / month [measured]',
  browserMinuteBudget8Lane: '38,400 browser-minutes / month (8 parallel worker lanes × 160 hrs)',
  singlePointerFallbackBudget: '4,800 browser-minutes / month (1 active OS cursor fallback)',
  layers: [
    {
      layer: '1. Durable Workflow & State Recovery',
      tool: 'DBOS (Database-Oriented Operating System) + SQLite/Postgres',
      role: 'Persists every step of a 10-bot routine so if a portal times out or a session drops at step 7/9, the bot resumes from step 7 without re-burning LLM tokens.'
    },
    {
      layer: '2. Deterministic Browser & Stealth Engine',
      tool: 'Stagehand + feder-cr/invisible_playwright_mcp',
      role: 'Uses patched stealth Firefox + DOM accessibility tree selectors first (cutting vision token burn by 88%) and only falls back to screenshot vision when a government/merchant table layout shifts.'
    },
    {
      layer: '3. Multi-Model Cost Router',
      tool: 'LiteLLM Proxy + OpenRouter',
      role: 'Routes 85% of routine DOM extraction and CSV diffing to DeepSeek-V3 / Gemini 2.5 Flash ($0.12/1M tokens) while reserving frontier reasoning models strictly for final executive alert copy.'
    },
    {
      layer: '4. Executive Decision Arbiter & Human Firewall',
      tool: 'Jev-AI Constitutional Core + milind-soni/OpenMausBot Permission Broker',
      role: 'Adjudicates every external bot action via 3-Tier Constitutional Policy: Tier-1 Auto-Dispatch (staging traces/slot holds), Tier-2 1-Click Co-Sign (Sub Radar & Catalog patches), and Tier-3 Hard Human Lock (2FA/municipal bid signatures).'
    }
  ]
};
