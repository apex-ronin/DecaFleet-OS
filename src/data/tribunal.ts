export interface ContenderAudit {
  id: string;
  name: string;
  artifactFile: string;
  placementBadge: string;
  rank: number;
  totalScore: number;
  scores: {
    promptCompliance: number; // out of 20
    fleetRealism: number; // out of 25
    cashAndEconomics: number; // out of 20
    legalAndToS: number; // out of 20
    grounding: number; // out of 15
  };
  status: 'CHAMPION' | 'SPECIAL_STACK' | 'DISQUALIFIED';
  coreBreakthrough: string;
  adoptedIntoDecaFleet: string[];
  forensicFlawsOrKills: string[];
}

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

export const TRIBUNAL_CONTENDERS: ContenderAudit[] = [
  {
    id: 'gpt-business',
    name: 'GPT_Buiness.md',
    artifactFile: 'the_competition/GPT_Buiness.md (141 KB)',
    placementBadge: '🏆 BEST OF CLASS (Supreme Quantitative Modeling)',
    rank: 1,
    totalScore: 96,
    scores: {
      promptCompliance: 20,
      fleetRealism: 24,
      cashAndEconomics: 18,
      legalAndToS: 20,
      grounding: 14
    },
    status: 'CHAMPION',
    coreBreakthrough:
      'Complete 17-section documentation across all 6 handbooks (141 KB) with rigorous browser-minute concurrency math (38,400 browser-min/month across 8 lanes; 4,800 min/mo single-pointer fallback) and strict [measured]/[comparable]/[estimate] tagging.',
    adoptedIntoDecaFleet: [
      '38,400 min/mo (8-lane) vs. 4,800 min/mo (Single-Pointer Fallback) Concurrency Math Engine',
      'Catalog Exception Desk (P-B): $1,000/mo corporate Shopify/e-commerce feed exception desk (Stage 3)',
      'Fleet Collision Lab (C-A): $1,800–$2,500/mo multi-agent QA & browser collision testing lab (Stage 4)',
      'Strict CAN-SPAM, GDPR B2B legitimate interest, and municipal licensing compliance guardrails'
    ],
    forensicFlawsOrKills: [
      'Corporate B2B feed onboarding takes slightly longer to close on Day 1 than Grok’s zero-credential public contractor registry audit.'
    ]
  },
  {
    id: 'ara-grok',
    name: 'Ara - Grok ("Sub Radar")',
    artifactFile: 'the_competition/Grok_USA-Bus + grok_report (1).pdf',
    placementBadge: '🥇 MOST LIKELY TO SUCCEED (Fastest Cash & Zero-Credential Moat)',
    rank: 2,
    totalScore: 95,
    scores: {
      promptCompliance: 18,
      fleetRealism: 25,
      cashAndEconomics: 20,
      legalAndToS: 20,
      grounding: 12
    },
    status: 'CHAMPION',
    coreBreakthrough:
      'Solves the single-machine 10-bot paradox by targeting 100% public state contractor licensing registries (CSLB, TDLR, DBPR). Requires ZERO client credentials, ZERO third-party logins, and ZERO risk of bot deplatforming or cookie collisions.',
    adoptedIntoDecaFleet: [
      'Sub Radar (Stage 1 Launchpad): $149 Initial GC Subcontractor Roster Audit -> $399/mo Sticky Retainer monitoring 40 subs per job site for lapsed bonds/workers-comp',
      'Trade Map Desk (Stage 2 Cross-Sell at Day 90): $449/mo local trade citations & GBP review desk sold to the exact same General Contractors',
      'Seat Sniper (Stage 4 Expansion): $400/mo municipal inspection slot & trade exam seat sniper',
      'Ruthless Kills Adopted: Killed "Parcel Watch" (Napa County commercial tax data resale ban) and parked "Shelf Copy/Price" (Amazon shared IP ban risk)'
    ],
    forensicFlawsOrKills: [
      'Slightly condensed prose in sections 14–16 compared to GPT’s 141 KB tome, now expanded to full 17-section depth in DecaFleet-OS.'
    ]
  },
  {
    id: 'claude-rebuild',
    name: 'Claude-OF-OUT-USA Rebuilt',
    artifactFile: 'the_competition/Claude-OF-OUT-USA rebuilt on the Master Prompt.md',
    placementBadge: '🥈 RUNNER-UP (Best Niche Safety Re-Architecture)',
    rank: 3,
    totalScore: 91,
    scores: {
      promptCompliance: 19,
      fleetRealism: 23,
      cashAndEconomics: 19,
      legalAndToS: 17,
      grounding: 13
    },
    status: 'CHAMPION',
    coreBreakthrough:
      'Forensic destruction of flawed creator-agency blueprints by introducing the mandatory "No-Login Default" (ingest exported CSVs rather than logging into protected accounts) and "Metadata-Only" rules (zero adult media files on disk) plus a fast $75 Day-5 deposit wedge.',
    adoptedIntoDecaFleet: [
      '"No-Login Default" Architectural Law: Bots operate on client CSV/feed exports or public registries rather than storing fragile 2FA session cookies',
      '"Metadata-Only Rule": Zero high-risk media/video storage; strictly SFW telemetry, funnel uptime, and link-tree auditing',
      '$75–$149 Fast-Deposit Wedge structure for Day-5 to Day-7 first revenue collection'
    ],
    forensicFlawsOrKills: [
      'Demoted to 3rd behind Grok & GPT solely because adult creator verticals carry residual Stripe/merchant banking deplatforming risk compared to construction compliance.'
    ]
  },
  {
    id: 'gpt-market-research',
    name: 'GPT_AI-Agent-Market-Research',
    artifactFile: 'the_competition/GPT_AI-Agent-Market-Research-2026-10-20.md',
    placementBadge: '🎖️ SPECIAL AWARD (100/100 Production Engineering Stack)',
    rank: 4,
    totalScore: 100,
    scores: {
      promptCompliance: 0,
      fleetRealism: 25,
      cashAndEconomics: 0,
      legalAndToS: 0,
      grounding: 15
    },
    status: 'SPECIAL_STACK',
    coreBreakthrough:
      'Definitive production runtime specification for DecaFleet-OS: Hermes Agent + LiteLLM (token cost routing) + Stagehand (deterministic DOM/accessibility actions) + DBOS (durable workflow recovery).',
    adoptedIntoDecaFleet: [
      'Hermes Agent + Stagehand + LiteLLM + DBOS production stack paired with feder-cr/invisible_dots (stealth Firefox MCP) and milind-soni/OpenMausBot (Permission Broker)'
    ],
    forensicFlawsOrKills: [
      'Disqualified from business handbook scoring (0/6 handbooks written), elevated to official Companion Engineering Spec.'
    ]
  },
  {
    id: 'gemini-of',
    name: 'Gemini_out_usa_master_handbooks.md',
    artifactFile: 'the_competition/Gemini_out_usa_master_handbooks.md',
    placementBadge: '❌ 5th Place (Disqualified — Hallucinations & ToS Contradictions)',
    rank: 5,
    totalScore: 68,
    scores: {
      promptCompliance: 18,
      fleetRealism: 14,
      cashAndEconomics: 15,
      legalAndToS: 7,
      grounding: 4
    },
    status: 'DISQUALIFIED',
    coreBreakthrough: 'Structured 17-section layout, but fatally compromised by operational and legal contradictions.',
    adoptedIntoDecaFleet: [],
    forensicFlawsOrKills: [
      'Fatal Hallucination: Cited non-existent URLs (e.g., cursor.com/docs/grok-bot).',
      'Prohibited Payment Rails: Recommended Wave Invoicing for adult creator services (explicitly banned under Wave ToS).',
      'Operational Contradiction: Promised 24/7 autonomous overnight DM fan chatting while simultaneously claiming 100% human-in-the-loop approval before every external message.'
    ]
  },
  {
    id: 'github-ai',
    name: 'GitHub Ai.md',
    artifactFile: 'the_competition/GitHub Ai.md',
    placementBadge: '❌ 6th Place (Disqualified — Generic SMB Agency)',
    rank: 6,
    totalScore: 54,
    scores: {
      promptCompliance: 14,
      fleetRealism: 13,
      cashAndEconomics: 12,
      legalAndToS: 9,
      grounding: 6
    },
    status: 'DISQUALIFIED',
    coreBreakthrough: 'Standard local marketing agency playbook.',
    adoptedIntoDecaFleet: [],
    forensicFlawsOrKills: [
      'Failed Contrarian Test: Bolted AI onto generic SMB lead gen without exploiting structural browser-agent gaps.',
      'Ignored Single-Machine Constraint: Assumed 10 bots could simultaneously log into dozens of client Google/Meta ad accounts on one shared IP without triggering instant security lockouts.'
    ]
  },
  {
    id: 'venice-ai',
    name: 'vENICE ai -Agent.md',
    artifactFile: 'the_competition/vENICE ai -Agent.md',
    placementBadge: '❌ 7th Place (Disqualified — High-Risk Prototype)',
    rank: 7,
    totalScore: 48,
    scores: {
      promptCompliance: 12,
      fleetRealism: 11,
      cashAndEconomics: 12,
      legalAndToS: 5,
      grounding: 3
    },
    status: 'DISQUALIFIED',
    coreBreakthrough: 'Originated the early creative spark before forensic audit.',
    adoptedIntoDecaFleet: [],
    forensicFlawsOrKills: [
      'Severe platform ToS & CFAA exposure from direct credential-stuffing into anti-bot protected portals.',
      'No concurrency math or shared-computer session isolation strategy.'
    ]
  }
];

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
      role: 'Routes 85% of routine DOM extraction and CSV diffing to DeepSeek-V3 / Gemini 2.5 Flash ($0.12/1M tokens) while reserving Grok / Claude Sonnet strictly for final executive alert copy.'
    },
    {
      layer: '4. Executive Decision Arbiter & Human Firewall',
      tool: 'Jev-AI Constitutional Core + milind-soni/OpenMausBot Permission Broker',
      role: 'Adjudicates every external bot action via 3-Tier Constitutional Policy: Tier-1 Auto-Dispatch (staging traces/slot holds), Tier-2 1-Click Co-Sign (Sub Radar & Catalog patches), and Tier-3 Hard Human Lock (2FA/municipal bid signatures).'
    }
  ]
};
