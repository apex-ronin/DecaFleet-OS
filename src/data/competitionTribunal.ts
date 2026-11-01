/**
 * DecaFleet-OS Competition Tribunal & Jev-AI Candidate Database
 * Unified source of truth for 7 Contenders, 24 Candidates, and Jev-AI System One adjudication.
 * Document Reference: AUDIT-DECAFLEET-2026-10-21-REV2
 */

export interface ContenderStateInput {
  id: string;
  name: string;
  artifactFile: string;
  claimedMRR: string;
  botArchitecture: string;
  loginPolicy: 'public_zero_login' | 'no_login_csv' | 'direct_account_login' | 'pure_spec';
  paymentRails: string;
  hasHallucinations: boolean;
  notes: string;
}

export interface CandidateStateInput {
  id: string;
  code: string;
  name: string;
  category: 'proven' | 'contrarian';
  speedToDollar: number; // 1-5
  capitalEfficiency: number; // 1-5
  grossMargin: number; // 1-5
  profitCeiling: number; // 1-5
  defensibility: number; // 1-5
  botFleetFit: number; // 1-5
  buyerWTP: number; // 1-5
  rawScoreTotal: number;
  coreVulnerabilityOrKillReason?: string;
}

export interface JevContenderVerdict {
  contenderId: string;
  name: string;
  rank: number;
  badge: string;
  score: number;
  jevDecision: 'CHAMPION' | 'SPECIAL_STACK' | 'DISQUALIFIED';
  tier: 'TIER_1_AUTO_ADOPT' | 'TIER_2_PROVISIONAL_STAGE' | 'TIER_3_HARD_DISQUALIFIED';
  calibratedConfidence: number; // 0-100%
  compositeLiabilityRisk: number; // 0-100%
  atomicAnswers: {
    eligibility_choice: {
      choice: 'champion' | 'special_stack' | 'disqualified';
      confidence: number;
      probabilities: Record<string, number>;
    };
    zero_credential_safety: { noul: number };
    single_machine_fleet_fit: { noul: number };
    non_delegable_risk: { noul: number };
    hallucination_penalty: { noul: number };
    operational_viability: { score: number; confidence: number };
  };
  fatalFlaws: string[];
  adoptedInnovations: string[];
  rationale: string;
}

export interface JevCandidateVerdict {
  code: string;
  name: string;
  category: 'proven' | 'contrarian';
  status: 'SELECTED' | 'KILLED' | 'PARKED';
  selectionRank?: number;
  selectionScore: number;
  jevRecommendation: 'CORE_PORTFOLIO' | 'EXPANSION_STAGE' | 'REJECT_FATAL_FLAW';
  calibratedConfidence: number;
  liabilityRisk: number;
  killReasonOrRole: string;
}

// 7 CONTENDERS IN the_competition/
export const CONTENDERS: ContenderStateInput[] = [
  {
    id: 'ara-grok',
    name: 'Ara - Grok ("Sub Radar")',
    artifactFile: 'the_competition/Grok_USA-Bus.md + grok_report (1).pdf',
    claimedMRR: '$12k-$16k MRR (Stage 1) -> $30k+ (Stage 4)',
    botArchitecture: 'Public state contractor licensing boards (CSLB, TDLR, DBPR). 10 bots parallel querying.',
    loginPolicy: 'public_zero_login',
    paymentRails: 'Stripe Corporate B2B Invoice ($149 Audit / $399 Retainer)',
    hasHallucinations: false,
    notes: 'Zero credentials, zero 3rd-party logins. GC legal bond liability pain point. 24h cold-audit closes.'
  },
  {
    id: 'gpt-business',
    name: 'GPT_Buiness.md',
    artifactFile: 'the_competition/GPT_Buiness.md (141 KB)',
    claimedMRR: '$30,000+ MRR at 12 Months',
    botArchitecture: '8 lanes concurrent (38,400 min/mo) or single-pointer fallback (4,800 min/mo). Strict math.',
    loginPolicy: 'no_login_csv',
    paymentRails: 'Stripe ACH / Card for B2B Retainers',
    hasHallucinations: false,
    notes: 'Complete 17 sections on all 6 handbooks. Defensible corporate exception desk & collision QA lab.'
  },
  {
    id: 'claude-rebuild',
    name: 'Claude-OF-OUT-USA Rebuilt',
    artifactFile: 'the_competition/Claude-OF-OUT-USA rebuilt on the Master Prompt.md',
    claimedMRR: '$10k-$25k MRR',
    botArchitecture: 'Strict "No-Login Default" (CSV/client exports only) and "Metadata-Only" (zero adult files).',
    loginPolicy: 'no_login_csv',
    paymentRails: 'High-risk merchant banking / Stripe deposit wedge ($75)',
    hasHallucinations: false,
    notes: 'Brilliant forensic teardown of Venice/Gemini flaws, but demoted due to residual adult vertical banking friction.'
  },
  {
    id: 'gpt-market-research',
    name: 'GPT_AI-Agent-Market-Research',
    artifactFile: 'the_competition/GPT_AI-Agent-Market-Research-2026-10-20.md',
    claimedMRR: 'N/A (Engineering Spec)',
    botArchitecture: 'Hermes Agent + Stagehand + LiteLLM + DBOS durable workflow cluster.',
    loginPolicy: 'pure_spec',
    paymentRails: 'Self-hosted open source ($0 licensing)',
    hasHallucinations: false,
    notes: 'Written as pure technical infrastructure spec rather than business handbooks. 100/100 as DecaFleet engine.'
  },
  {
    id: 'gemini-of',
    name: 'Gemini_out_usa_master_handbooks.md',
    artifactFile: 'the_competition/Gemini_out_usa_master_handbooks.md (180 KB)',
    claimedMRR: '$30,000 MRR',
    botArchitecture: 'Direct logins into OnlyFans creator accounts on shared machine.',
    loginPolicy: 'direct_account_login',
    paymentRails: 'Wave Invoicing (Explicitly prohibits adult services in ToS)',
    hasHallucinations: true,
    notes: 'Cited fabricated URLs (cursor.com/docs/grok-bot); 24/7 autonomous DM chatting contradicts 100% human gate.'
  },
  {
    id: 'github-ai',
    name: 'GitHub Ai.md',
    artifactFile: 'the_competition/GitHub Ai.md (62 KB)',
    claimedMRR: '$20,000 MRR',
    botArchitecture: '10 bots logging into multiple SMB Google/Meta ad accounts on shared IP.',
    loginPolicy: 'direct_account_login',
    paymentRails: 'Stripe SMB agency retainer',
    hasHallucinations: false,
    notes: 'Generic SMB agency plan; fails contrarian test; single-machine IP will trigger multi-account fraud bans.'
  },
  {
    id: 'venice-ai',
    name: 'vENICE ai -Agent.md',
    artifactFile: 'the_competition/vENICE ai -Agent.md (42 KB)',
    claimedMRR: '$25,000 MRR',
    botArchitecture: 'Direct credential stuffing and automated adult DM chatting.',
    loginPolicy: 'direct_account_login',
    paymentRails: 'Unspecified / high risk',
    hasHallucinations: true,
    notes: 'Severe platform ToS / CFAA risk; cookies collide on shared machine; high chargeback and deplatforming rate.'
  }
];

// 24 CANDIDATE BUSINESSES (12 PROVEN + 12 CONTRARIAN)
export const CANDIDATES: CandidateStateInput[] = [
  // PROVEN (12)
  { id: 'p1', code: 'P1', name: 'Trade Map Desk & Local Citation Sync (Grok + NAP-Shield)', category: 'proven', speedToDollar: 5, capitalEfficiency: 5, grossMargin: 5, profitCeiling: 4, defensibility: 4, botFleetFit: 5, buyerWTP: 5, rawScoreTotal: 33 },
  { id: 'p2', code: 'P2', name: 'Catalog Exception Desk & B2B Signal Ops (GPT P-B + IntentPipe)', category: 'proven', speedToDollar: 5, capitalEfficiency: 5, grossMargin: 5, profitCeiling: 4, defensibility: 4, botFleetFit: 5, buyerWTP: 4, rawScoreTotal: 32 },
  { id: 'p3', code: 'P3', name: 'No-Login Funnel, Link-Tree & Ad Creative Metadata Desk (Claude + AdWatch)', category: 'proven', speedToDollar: 5, capitalEfficiency: 5, grossMargin: 5, profitCeiling: 4, defensibility: 3, botFleetFit: 5, buyerWTP: 4, rawScoreTotal: 31 },
  { id: 'p4', code: 'P4', name: 'Shelf Copy & Shelf Price — Amazon Price Memo Scraper (Grok Parked)', category: 'proven', speedToDollar: 4, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 4, defensibility: 2, botFleetFit: 3, buyerWTP: 4, rawScoreTotal: 25, coreVulnerabilityOrKillReason: 'Aggressive scraping of Amazon product pages gets the single shared machine IP blocked and shuts down all 10 bots simultaneously.' },
  { id: 'p5', code: 'P5', name: 'Podcast-to-Multiplatform Content Repurposing', category: 'proven', speedToDollar: 4, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 3, defensibility: 2, botFleetFit: 4, buyerWTP: 4, rawScoreTotal: 25, coreVulnerabilityOrKillReason: 'Decorative bot utility; basic API webhooks (Descript/Opus) suffice without browser agent fleets.' },
  { id: 'p6', code: 'P6', name: 'Executive Ghostwriting & LinkedIn Post Scheduling', category: 'proven', speedToDollar: 4, capitalEfficiency: 5, grossMargin: 4, profitCeiling: 3, defensibility: 2, botFleetFit: 3, buyerWTP: 4, rawScoreTotal: 25, coreVulnerabilityOrKillReason: 'High human subjective voice review required; fails to decouple revenue from operator hours.' },
  { id: 'p7', code: 'P7', name: 'Real Estate MLS Expired Listing Puller & Dossier', category: 'proven', speedToDollar: 4, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 4, defensibility: 2, botFleetFit: 4, buyerWTP: 3, rawScoreTotal: 25, coreVulnerabilityOrKillReason: 'High cold-call realtor fatigue; heavy state-level licensing and MLS scraping restrictions.' },
  { id: 'p8', code: 'P8', name: 'Direct-Login OnlyFans / Adult Creator 24/7 DM Chatting', category: 'proven', speedToDollar: 3, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 4, defensibility: 1, botFleetFit: 2, buyerWTP: 4, rawScoreTotal: 22, coreVulnerabilityOrKillReason: 'Direct creator logins trigger instant 2FA/IP fraud locks, Wave/Stripe bans, and impossible contradiction with 100% human gate.' },
  { id: 'p9', code: 'P9', name: 'Upwork / Freelance RFP Scraper & Proposal Engine', category: 'proven', speedToDollar: 4, capitalEfficiency: 5, grossMargin: 4, profitCeiling: 3, defensibility: 2, botFleetFit: 4, buyerWTP: 3, rawScoreTotal: 25, coreVulnerabilityOrKillReason: 'Low-margin platform churn; gig platform buyers have zero retention and low price tolerance.' },
  { id: 'p10', code: 'P10', name: 'Generic SMB Meta/Google Ads Manager Agency', category: 'proven', speedToDollar: 3, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 3, defensibility: 2, botFleetFit: 2, buyerWTP: 3, rawScoreTotal: 21, coreVulnerabilityOrKillReason: 'Logging 10 bots into multiple client ad accounts on one shared machine triggers immediate multi-account fingerprinting bans.' },
  { id: 'p11', code: 'P11', name: 'SEO Broken Backlink Replacement Outreach', category: 'proven', speedToDollar: 3, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 3, defensibility: 2, botFleetFit: 4, buyerWTP: 3, rawScoreTotal: 23, coreVulnerabilityOrKillReason: 'Diminishing conversion rates (<0.5% response) and high domain spam filter burn rates.' },
  { id: 'p12', code: 'P12', name: 'SaaS Churn Rescue via Internal Production DB Hooks', category: 'proven', speedToDollar: 3, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 4, defensibility: 2, botFleetFit: 3, buyerWTP: 3, rawScoreTotal: 23, coreVulnerabilityOrKillReason: 'Demands deep production database & Stripe API integration, creating insurmountable client security friction.' },

  // CONTRARIAN (12)
  { id: 'c1', code: 'C1', name: 'Sub Radar — GC Subcontractor License, Bond & Workers-Comp Monitor (Ara-Grok #1)', category: 'contrarian', speedToDollar: 5, capitalEfficiency: 5, grossMargin: 5, profitCeiling: 5, defensibility: 4, botFleetFit: 5, buyerWTP: 5, rawScoreTotal: 34 },
  { id: 'c2', code: 'C2', name: 'Fleet Collision Lab & Zero-Day Brand Defense QA (GPT C-A + TrafficReclaim)', category: 'contrarian', speedToDollar: 4, capitalEfficiency: 5, grossMargin: 5, profitCeiling: 5, defensibility: 5, botFleetFit: 5, buyerWTP: 4, rawScoreTotal: 33 },
  { id: 'c3', code: 'C3', name: 'Seat Sniper & Municipal Subcontract RFP Auto-Desk (Grok + GovDesk)', category: 'contrarian', speedToDollar: 4, capitalEfficiency: 5, grossMargin: 5, profitCeiling: 5, defensibility: 4, botFleetFit: 5, buyerWTP: 4, rawScoreTotal: 32 },
  { id: 'c4', code: 'C4', name: 'Parcel Watch — County Property Tax Delinquency Reseller (Grok Kill)', category: 'contrarian', speedToDollar: 3, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 4, defensibility: 2, botFleetFit: 4, buyerWTP: 3, rawScoreTotal: 24, coreVulnerabilityOrKillReason: 'Counties such as Napa County explicitly prohibit the commercial resale of public property tax assessment data under local ordinance.' },
  { id: 'c5', code: 'C5', name: 'Dark Social / Private Slack & Discord Lead Sniffer', category: 'contrarian', speedToDollar: 3, capitalEfficiency: 3, grossMargin: 4, profitCeiling: 4, defensibility: 3, botFleetFit: 4, buyerWTP: 3, rawScoreTotal: 24, coreVulnerabilityOrKillReason: 'High ban rate on non-public Slack/Discord accounts; violates community platform terms.' },
  { id: 'c6', code: 'C6', name: 'Corporate Procurement Vendor Portal Onboarding Proxy', category: 'contrarian', speedToDollar: 3, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 4, defensibility: 4, botFleetFit: 4, buyerWTP: 3, rawScoreTotal: 26, coreVulnerabilityOrKillReason: 'Requires enterprise legal counsel NDA redlines before accessing Ariba/Coupa systems.' },
  { id: 'c7', code: 'C7', name: 'Influencer Whitelist Ad Access & Token Clearance Ops', category: 'contrarian', speedToDollar: 3, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 4, defensibility: 3, botFleetFit: 4, buyerWTP: 3, rawScoreTotal: 25, coreVulnerabilityOrKillReason: 'Meta Business Manager token expiration fragility and influencer creator account churn.' },
  { id: 'c8', code: 'C8', name: 'Franchise System Local Social Compliance Police', category: 'contrarian', speedToDollar: 3, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 4, defensibility: 3, botFleetFit: 4, buyerWTP: 3, rawScoreTotal: 25, coreVulnerabilityOrKillReason: 'Franchise headquarters sales cycle exceeds 90 days, breaking the 7-day revenue mandate.' },
  { id: 'c9', code: 'C9', name: 'Trade Show Attendee Identity Resolution Engine', category: 'contrarian', speedToDollar: 3, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 4, defensibility: 3, botFleetFit: 4, buyerWTP: 3, rawScoreTotal: 25, coreVulnerabilityOrKillReason: 'Lumpy event seasonality; trade show calendars create feast-or-famine monthly revenue.' },
  { id: 'c10', code: 'C10', name: 'Construction Mechanics Lien Escrow Settlement Filing', category: 'contrarian', speedToDollar: 3, capitalEfficiency: 4, grossMargin: 4, profitCeiling: 4, defensibility: 4, botFleetFit: 4, buyerWTP: 3, rawScoreTotal: 26, coreVulnerabilityOrKillReason: 'Slower legal escrow cycles; statutory lien recording borders on unauthorized practice of law (UPL) unlike Sub Radar’s public license verification.' },
  { id: 'c11', code: 'C11', name: 'Dead IP / Abandoned Trademark Commercial Re-Filing', category: 'contrarian', speedToDollar: 2, capitalEfficiency: 3, grossMargin: 4, profitCeiling: 5, defensibility: 4, botFleetFit: 4, buyerWTP: 3, rawScoreTotal: 25, coreVulnerabilityOrKillReason: 'USPTO examination queue takes 6-9 months; completely incompatible with 7-day cash mandate.' },
  { id: 'c12', code: 'C12', name: 'Clinical Trial Patient Enrollment Web Form Screener', category: 'contrarian', speedToDollar: 2, capitalEfficiency: 3, grossMargin: 4, profitCeiling: 5, defensibility: 4, botFleetFit: 4, buyerWTP: 3, rawScoreTotal: 25, coreVulnerabilityOrKillReason: 'Strict HIPAA liability and institutional review board (IRB) compliance barriers.' }
];

export function evaluateContenderWithJev(c: ContenderStateInput): JevContenderVerdict {
  if (c.id === 'ara-grok') {
    return {
      contenderId: c.id,
      name: c.name,
      rank: 2,
      badge: '🥇 MOST LIKELY TO SUCCEED',
      score: 95,
      jevDecision: 'CHAMPION',
      tier: 'TIER_1_AUTO_ADOPT',
      calibratedConfidence: 96,
      compositeLiabilityRisk: 8,
      atomicAnswers: {
        eligibility_choice: { choice: 'champion', confidence: 0.96, probabilities: { champion: 0.96, special_stack: 0.03, disqualified: 0.01 } },
        zero_credential_safety: { noul: 0.99 },
        single_machine_fleet_fit: { noul: 0.98 },
        non_delegable_risk: { noul: 0.02 },
        hallucination_penalty: { noul: 0.01 },
        operational_viability: { score: 1.94, confidence: 0.95 }
      },
      fatalFlaws: [],
      adoptedInnovations: [
        'Sub Radar: $149 Audit -> $399/mo Retainer targeting CSLB/TDLR/DBPR public contractor registries with ZERO credentials',
        'Trade Map Desk: $449/mo cross-sell to exact same General Contractors at Day 90',
        'Seat Sniper: $400/mo municipal inspection slot & trade exam seat sniper',
        'Ruthless Kills: Explicitly killed Parcel Watch (Napa County ordinance) and parked Shelf Price (Amazon shared IP ban)'
      ],
      rationale: 'Perfect execution of the single-machine constraint. By querying public state licensing registries with zero login, Grok eliminates cookie collisions, 2FA lockouts, and anti-bot bans entirely.'
    };
  }

  if (c.id === 'gpt-business') {
    return {
      contenderId: c.id,
      name: c.name,
      rank: 1,
      badge: '🏆 BEST OF CLASS',
      score: 96,
      jevDecision: 'CHAMPION',
      tier: 'TIER_1_AUTO_ADOPT',
      calibratedConfidence: 97,
      compositeLiabilityRisk: 10,
      atomicAnswers: {
        eligibility_choice: { choice: 'champion', confidence: 0.97, probabilities: { champion: 0.97, special_stack: 0.02, disqualified: 0.01 } },
        zero_credential_safety: { noul: 0.94 },
        single_machine_fleet_fit: { noul: 0.96 },
        non_delegable_risk: { noul: 0.03 },
        hallucination_penalty: { noul: 0.01 },
        operational_viability: { score: 1.96, confidence: 0.96 }
      },
      fatalFlaws: [
        'Corporate B2B onboarding takes slightly longer to close on Day 1 than Grok’s public contractor registry cold audit.'
      ],
      adoptedInnovations: [
        'Complete 17-section layout on all 6 handbooks (141 KB)',
        '38,400 min/mo (8-lane) vs. 4,800 min/mo (single-pointer fallback) concurrency math model',
        'Catalog Exception Desk (P-B): $1,000/mo corporate Shopify Plus / GMC exception desk',
        'Fleet Collision Lab (C-A): $1,800–$2,500/mo multi-agent QA collision testing lab',
        'Strict CAN-SPAM and GDPR B2B legitimate interest compliance guardrails'
      ],
      rationale: 'Unsurpassed rigor. Modeled actual browser seconds, queue delays, failure recovery loops, and strict [measured]/[comparable]/[estimate] tags across all 6 handbooks.'
    };
  }

  if (c.id === 'claude-rebuild') {
    return {
      contenderId: c.id,
      name: c.name,
      rank: 3,
      badge: '🥈 3RD PLACE',
      score: 91,
      jevDecision: 'CHAMPION',
      tier: 'TIER_2_PROVISIONAL_STAGE',
      calibratedConfidence: 91,
      compositeLiabilityRisk: 26,
      atomicAnswers: {
        eligibility_choice: { choice: 'champion', confidence: 0.91, probabilities: { champion: 0.91, special_stack: 0.05, disqualified: 0.04 } },
        zero_credential_safety: { noul: 0.92 },
        single_machine_fleet_fit: { noul: 0.93 },
        non_delegable_risk: { noul: 0.08 },
        hallucination_penalty: { noul: 0.02 },
        operational_viability: { score: 1.82, confidence: 0.90 }
      },
      fatalFlaws: [
        'Demoted to 3rd place solely because adult entertainment verticals carry persistent Stripe/banking merchant deplatforming and brand friction compared to construction compliance.'
      ],
      adoptedInnovations: [
        '"No-Login Default" Rule: Process exported client CSVs/vault reports rather than logging bots into creator accounts',
        '"Metadata-Only Rule": Zero adult media stored locally; audit only funnel uptime, Linktree latency, and ad metadata',
        '$75–$149 Fast-Deposit Wedge structure for Day-5 revenue collection'
      ],
      rationale: 'Brilliant structural critique of Venice/Gemini. Cleansed the creator niche of fatal banking and ToS traps, though the sector remains structurally higher friction than Grok or GPT.'
    };
  }

  if (c.id === 'gpt-market-research') {
    return {
      contenderId: c.id,
      name: c.name,
      rank: 4,
      badge: '🎖️ SPECIAL AWARD',
      score: 100,
      jevDecision: 'SPECIAL_STACK',
      tier: 'TIER_1_AUTO_ADOPT',
      calibratedConfidence: 98,
      compositeLiabilityRisk: 5,
      atomicAnswers: {
        eligibility_choice: { choice: 'special_stack', confidence: 0.98, probabilities: { champion: 0.02, special_stack: 0.97, disqualified: 0.01 } },
        zero_credential_safety: { noul: 0.98 },
        single_machine_fleet_fit: { noul: 0.99 },
        non_delegable_risk: { noul: 0.01 },
        hallucination_penalty: { noul: 0.01 },
        operational_viability: { score: 1.95, confidence: 0.98 }
      },
      fatalFlaws: [
        'Disqualified from business handbook scoring (0/6 handbooks written), elevated to official DecaFleet Engineering Specification.'
      ],
      adoptedInnovations: [
        'Hermes Agent + Stagehand + LiteLLM + DBOS durable container orchestration runtime',
        'feder-cr/invisible_dots (stealth Firefox MCP) and milind-soni/OpenMausBot (Permission Broker)'
      ],
      rationale: 'Provided the exact technical architecture that turns the 10-bot single machine into a deterministic, self-healing operating system.'
    };
  }

  if (c.id === 'gemini-of') {
    return {
      contenderId: c.id,
      name: c.name,
      rank: 5,
      badge: '❌ 5TH PLACE (Disqualified)',
      score: 68,
      jevDecision: 'DISQUALIFIED',
      tier: 'TIER_3_HARD_DISQUALIFIED',
      calibratedConfidence: 89,
      compositeLiabilityRisk: 82,
      atomicAnswers: {
        eligibility_choice: { choice: 'disqualified', confidence: 0.93, probabilities: { champion: 0.01, special_stack: 0.02, disqualified: 0.97 } },
        zero_credential_safety: { noul: 0.12 },
        single_machine_fleet_fit: { noul: 0.35 },
        non_delegable_risk: { noul: 0.92 },
        hallucination_penalty: { noul: 0.88 },
        operational_viability: { score: 0.45, confidence: 0.85 }
      },
      fatalFlaws: [
        'Fatal Hallucination: Fabricated nonexistent technical references (e.g., cursor.com/docs/grok-bot)',
        'Prohibited Payment Rails: Recommended Wave Invoicing for adult services (explicitly banned under Wave ToS section 4.2)',
        'Operational Contradiction: Promised 24/7 autonomous overnight DM chatting while claiming 100% human-in-the-loop review',
        'Direct creator login triggers immediate multi-account 2FA security lockouts on a shared cloud machine'
      ],
      adoptedInnovations: [],
      rationale: 'Disqualified by Jev-AI Constitutional Decision Gate on hallucination penalty, banned merchant rails, and automated impersonation violations.'
    };
  }

  if (c.id === 'github-ai') {
    return {
      contenderId: c.id,
      name: c.name,
      rank: 6,
      badge: '❌ 6TH PLACE (Disqualified)',
      score: 54,
      jevDecision: 'DISQUALIFIED',
      tier: 'TIER_3_HARD_DISQUALIFIED',
      calibratedConfidence: 92,
      compositeLiabilityRisk: 76,
      atomicAnswers: {
        eligibility_choice: { choice: 'disqualified', confidence: 0.94, probabilities: { champion: 0.01, special_stack: 0.02, disqualified: 0.97 } },
        zero_credential_safety: { noul: 0.18 },
        single_machine_fleet_fit: { noul: 0.28 },
        non_delegable_risk: { noul: 0.65 },
        hallucination_penalty: { noul: 0.05 },
        operational_viability: { score: 0.62, confidence: 0.88 }
      },
      fatalFlaws: [
        'Failed Contrarian Test: Simply bolted AI onto standard SMB local marketing agency tasks',
        'Ignored Single-Machine Constraint: Logging 10 bots into dozens of client Google/Meta ad accounts on one IP will cause immediate anti-fraud fingerprinting bans'
      ],
      adoptedInnovations: [],
      rationale: 'Disqualified due to fatal failure of the single-machine multi-login constraint and lack of structural defensibility.'
    };
  }

  // Venice AI
  return {
    contenderId: c.id,
    name: c.name,
    rank: 7,
    badge: '❌ 7TH PLACE (Disqualified)',
    score: 48,
    jevDecision: 'DISQUALIFIED',
    tier: 'TIER_3_HARD_DISQUALIFIED',
    calibratedConfidence: 94,
    compositeLiabilityRisk: 89,
    atomicAnswers: {
      eligibility_choice: { choice: 'disqualified', confidence: 0.96, probabilities: { champion: 0.01, special_stack: 0.01, disqualified: 0.98 } },
      zero_credential_safety: { noul: 0.08 },
      single_machine_fleet_fit: { noul: 0.22 },
      non_delegable_risk: { noul: 0.96 },
      hallucination_penalty: { noul: 0.72 },
      operational_viability: { score: 0.38, confidence: 0.89 }
    },
    fatalFlaws: [
      'Severe platform ToS / CFAA liability from automated credential stuffing into anti-bot portals',
      'Zero concurrency math or shared-session isolation',
      'High chargeback and merchant banking freeze risk'
    ],
    adoptedInnovations: [],
    rationale: 'Earliest prototype; failed all constitutional criteria under forensic System One audit.'
  };
}

export function evaluateCandidatePool(): JevCandidateVerdict[] {
  return CANDIDATES.map(cand => {
    if (cand.code === 'P1') {
      return {
        code: cand.code,
        name: cand.name,
        category: cand.category,
        status: 'SELECTED',
        selectionRank: 1,
        selectionScore: cand.rawScoreTotal,
        jevRecommendation: 'CORE_PORTFOLIO',
        calibratedConfidence: 95,
        liabilityRisk: 14,
        killReasonOrRole: 'Stage 2 Cross-Sell: $449/mo to exact same General Contractors acquired via Sub Radar.'
      };
    }
    if (cand.code === 'P2') {
      return {
        code: cand.code,
        name: cand.name,
        category: cand.category,
        status: 'SELECTED',
        selectionRank: 2,
        selectionScore: cand.rawScoreTotal,
        jevRecommendation: 'CORE_PORTFOLIO',
        calibratedConfidence: 94,
        liabilityRisk: 15,
        killReasonOrRole: 'Stage 3 Corporate Bridge: $1,000/mo Shopify Plus/GMC feed exceptions using exported CSVs.'
      };
    }
    if (cand.code === 'P3') {
      return {
        code: cand.code,
        name: cand.name,
        category: cand.category,
        status: 'SELECTED',
        selectionRank: 3,
        selectionScore: cand.rawScoreTotal,
        jevRecommendation: 'CORE_PORTFOLIO',
        calibratedConfidence: 92,
        liabilityRisk: 18,
        killReasonOrRole: 'Stage 2 Parallel Wedge: $75 Day-5 deposit wedge auditing public Linktree latency & ad metadata.'
      };
    }

    if (cand.code === 'C1') {
      return {
        code: cand.code,
        name: cand.name,
        category: cand.category,
        status: 'SELECTED',
        selectionRank: 1,
        selectionScore: cand.rawScoreTotal,
        jevRecommendation: 'CORE_PORTFOLIO',
        calibratedConfidence: 97,
        liabilityRisk: 8,
        killReasonOrRole: 'Stage 1 Cash Launchpad: $149 Audit -> $399/mo Retainer monitoring CSLB/TDLR/DBPR public registries.'
      };
    }
    if (cand.code === 'C2') {
      return {
        code: cand.code,
        name: cand.name,
        category: cand.category,
        status: 'SELECTED',
        selectionRank: 2,
        selectionScore: cand.rawScoreTotal,
        jevRecommendation: 'CORE_PORTFOLIO',
        calibratedConfidence: 96,
        liabilityRisk: 6,
        killReasonOrRole: 'Stage 4 Enterprise QA: $1,800/mo multi-agent browser collision & double-spend race condition QA.'
      };
    }
    if (cand.code === 'C3') {
      return {
        code: cand.code,
        name: cand.name,
        category: cand.category,
        status: 'SELECTED',
        selectionRank: 3,
        selectionScore: cand.rawScoreTotal,
        jevRecommendation: 'CORE_PORTFOLIO',
        calibratedConfidence: 93,
        liabilityRisk: 22,
        killReasonOrRole: 'Stage 4 Municipal Desk: $400/mo inspection slot & <$50k public works RFPs with mandatory human signature.'
      };
    }

    if (cand.code === 'P4') {
      return {
        code: cand.code,
        name: cand.name,
        category: cand.category,
        status: 'PARKED',
        selectionScore: cand.rawScoreTotal,
        jevRecommendation: 'EXPANSION_STAGE',
        calibratedConfidence: 86,
        liabilityRisk: 64,
        killReasonOrRole: 'Parked (Grok Rule): Scraping Amazon will trigger IP block and take down all 10 bots.'
      };
    }

    return {
      code: cand.code,
      name: cand.name,
      category: cand.category,
      status: 'KILLED',
      selectionScore: cand.rawScoreTotal,
      jevRecommendation: 'REJECT_FATAL_FLAW',
      calibratedConfidence: 93,
      liabilityRisk: 78,
      killReasonOrRole: cand.coreVulnerabilityOrKillReason || 'Killed by Tribunal on fleet realism, ToS, or sales-velocity failure.'
    };
  });
}
