import { CandidateIdea } from '../types/index.ts';

export const CANDIDATE_IDEAS: CandidateIdea[] = [
  // PROVEN MODELS (12) — Synthesized from GPT_Buiness, Ara-Grok & Claude Rebuild
  {
    id: 'p1',
    code: 'P1',
    name: 'Trade Map Desk & Local Citation Sync (Grok + NAP-Shield)',
    category: 'proven',
    scores: { spd: 5, cap: 5, mar: 5, ceil: 4, def: 4, fit: 5, wtp: 5 },
    total: 33,
    selected: true,
    rank: 1,
    statusRationale:
      'Selected (#1 Proven — Stage 2 Cross-Sell). Directly cross-sells at $449/mo to the exact same General Contractors acquired via Grok’s Sub Radar. Eliminates manual directory form friction across 50+ trade registries.'
  },
  {
    id: 'p2',
    code: 'P2',
    name: 'Catalog Exception Desk & B2B Signal Ops (GPT P-B + IntentPipe)',
    category: 'proven',
    scores: { spd: 5, cap: 5, mar: 5, ceil: 4, def: 4, fit: 5, wtp: 4 },
    total: 32,
    selected: true,
    rank: 2,
    statusRationale:
      'Selected (#2 Proven — GPT Best-of-Class P-B). Corporate e-commerce & B2B teams pay $1,000–$2,200/mo to resolve daily merchant feed exceptions and hiring-intent signals using exported CSVs ("No-Login Default").'
  },
  {
    id: 'p3',
    code: 'P3',
    name: 'No-Login Funnel, Link-Tree & Ad Creative Metadata Desk (Claude + AdWatch)',
    category: 'proven',
    scores: { spd: 5, cap: 5, mar: 5, ceil: 4, def: 3, fit: 5, wtp: 4 },
    total: 31,
    selected: true,
    rank: 3,
    statusRationale:
      'Selected (#3 Proven — Claude Rebuild Synthesis). Enforces the strict "No-Login Default" and "Metadata-Only" rules: audits public funnel uptime, link-trees, and Meta/TikTok Ad Libraries with a fast $75–$149 Day-5 deposit wedge.'
  },
  {
    id: 'p4',
    code: 'P4',
    name: 'Shelf Copy & Shelf Price — Amazon Price Memo Scraper (Grok Parked)',
    category: 'proven',
    scores: { spd: 4, cap: 4, mar: 4, ceil: 4, def: 2, fit: 3, wtp: 4 },
    total: 25,
    selected: false,
    statusRationale:
      'Killed / Parked (Ara-Grok Tribunal Rule): Aggressive scraping of Amazon product pages gets the single shared machine IP blocked and shuts down all 10 bots simultaneously.'
  },
  {
    id: 'p5',
    code: 'P5',
    name: 'Podcast-to-Multiplatform Content Repurposing',
    category: 'proven',
    scores: { spd: 4, cap: 4, mar: 4, ceil: 3, def: 2, fit: 4, wtp: 4 },
    total: 25,
    selected: false,
    statusRationale:
      'Killed: Decorative bot utility; basic API webhooks (Descript/Opus) suffice without browser agent fleets.'
  },
  {
    id: 'p6',
    code: 'P6',
    name: 'Executive Ghostwriting & LinkedIn Post Scheduling',
    category: 'proven',
    scores: { spd: 4, cap: 5, mar: 4, ceil: 3, def: 2, fit: 3, wtp: 4 },
    total: 25,
    selected: false,
    statusRationale:
      'Killed: High human subjective voice review required; does not decouple revenue from operator hours.'
  },
  {
    id: 'p7',
    code: 'P7',
    name: 'Real Estate MLS Expired Listing Puller & Dossier',
    category: 'proven',
    scores: { spd: 4, cap: 4, mar: 4, ceil: 4, def: 2, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale:
      'Killed: High cold-call realtor fatigue; heavy state-level licensing and MLS data access restrictions.'
  },
  {
    id: 'p8',
    code: 'P8',
    name: 'Direct-Login OnlyFans / Adult Creator 24/7 DM Chatting (Gemini/Venice DQ)',
    category: 'proven',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 1, fit: 2, wtp: 4 },
    total: 22,
    selected: false,
    statusRationale:
      'Killed by Tribunal (Fatal ToS & Banking Trap): Direct creator logins trigger instant 2FA/IP fraud locks, Wave/Stripe merchant bans, and an impossible contradiction between 24/7 overnight DMs and 100% human approval gates.'
  },
  {
    id: 'p9',
    code: 'P9',
    name: 'Upwork / Freelance RFP Scraper & Proposal Engine',
    category: 'proven',
    scores: { spd: 4, cap: 5, mar: 4, ceil: 3, def: 2, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale:
      'Killed: Low-margin platform churn; clients on gig platforms have low retention and low price tolerance.'
  },
  {
    id: 'p10',
    code: 'P10',
    name: 'Generic SMB Meta/Google Ads Manager Agency (GitHub AI DQ)',
    category: 'proven',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 3, def: 2, fit: 2, wtp: 3 },
    total: 21,
    selected: false,
    statusRationale:
      'Killed by Tribunal (GitHub AI 54/100 DQ): Logging 10 bots into multiple client ad accounts on one shared machine triggers immediate multi-account fingerprinting bans.'
  },
  {
    id: 'p11',
    code: 'P11',
    name: 'SEO Broken Backlink Replacement Outreach',
    category: 'proven',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 3, def: 2, fit: 4, wtp: 3 },
    total: 23,
    selected: false,
    statusRationale:
      'Killed: Diminishing conversion rates industry-wide (<0.5% response) and high spam filter burn rates.'
  },
  {
    id: 'p12',
    code: 'P12',
    name: 'SaaS Churn Rescue via Internal Production DB Hooks',
    category: 'proven',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 2, fit: 3, wtp: 3 },
    total: 23,
    selected: false,
    statusRationale:
      'Killed: Demands deep internal production database and Stripe API integration, creating high client security friction.'
  },

  // CONTRARIAN MODELS (12) — Synthesized from Ara-Grok, GPT_Buiness & DecaFleet
  {
    id: 'c1',
    code: 'C1',
    name: 'Sub Radar — GC Subcontractor License, Bond & Workers-Comp Monitor (Ara-Grok #1)',
    category: 'contrarian',
    scores: { spd: 5, cap: 5, mar: 5, ceil: 5, def: 4, fit: 5, wtp: 5 },
    total: 34,
    selected: true,
    rank: 1,
    statusRationale:
      'Selected (#1 Contrarian & Overall Most Likely to Succeed — 95/100). Queries 100% public state licensing boards (CSLB, TDLR, DBPR). Zero client credentials, zero 3rd-party logins, zero ban risk. $149 Audit -> $399/mo retainer.'
  },
  {
    id: 'c2',
    code: 'C2',
    name: 'Fleet Collision Lab & Zero-Day Brand Defense QA (GPT C-A + TrafficReclaim)',
    category: 'contrarian',
    scores: { spd: 4, cap: 5, mar: 5, ceil: 5, def: 5, fit: 5, wtp: 4 },
    total: 33,
    selected: true,
    rank: 2,
    statusRationale:
      'Selected (#2 Contrarian — GPT Best-of-Class C-A Synthesis). Uses the 10-bot cluster to run multi-agent browser collision QA, staging regression tests, and night-shift SERP hijack clawbacks at $1,800–$3,500/mo.'
  },
  {
    id: 'c3',
    code: 'C3',
    name: 'Seat Sniper & Municipal Subcontract RFP Auto-Desk (Grok + GovDesk)',
    category: 'contrarian',
    scores: { spd: 4, cap: 5, mar: 5, ceil: 5, def: 4, fit: 5, wtp: 4 },
    total: 32,
    selected: true,
    rank: 3,
    statusRationale:
      'Selected (#3 Contrarian — Grok Seat Sniper + GovDesk). Monitors public municipal portals for cancelled inspection slots, trade exam seats ($400/mo), and <$50k county subcontract RFPs ($1,400/mo) with zero anti-bot friction.'
  },
  {
    id: 'c4',
    code: 'C4',
    name: 'Parcel Watch — County Property Tax Delinquency Reseller (Grok Kill)',
    category: 'contrarian',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 2, fit: 4, wtp: 3 },
    total: 24,
    selected: false,
    statusRationale:
      'Killed (Ara-Grok Tribunal Rule): Counties such as Napa County explicitly prohibit the commercial resale of public property tax assessment data under local ordinance.'
  },
  {
    id: 'c5',
    code: 'C5',
    name: 'Dark Social / Private Slack & Discord Lead Sniffer',
    category: 'contrarian',
    scores: { spd: 3, cap: 3, mar: 4, ceil: 4, def: 3, fit: 4, wtp: 3 },
    total: 24,
    selected: false,
    statusRationale:
      'Killed: High ban rate on non-public Slack/Discord accounts; violates community platform terms.'
  },
  {
    id: 'c6',
    code: 'C6',
    name: 'Corporate Procurement Vendor Portal Onboarding Proxy',
    category: 'contrarian',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 4, fit: 4, wtp: 3 },
    total: 26,
    selected: false,
    statusRationale:
      'Killed: Requires enterprise legal counsel NDA redlines before accessing Ariba/Coupa systems.'
  },
  {
    id: 'c7',
    code: 'C7',
    name: 'Influencer Whitelist Ad Access & Token Clearance Ops',
    category: 'contrarian',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 3, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale:
      'Killed: Meta Business Manager token expiration fragility and influencer creator account churn.'
  },
  {
    id: 'c8',
    code: 'C8',
    name: 'Franchise System Local Social Compliance Police',
    category: 'contrarian',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 3, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale:
      'Killed: Franchise headquarters sales cycle exceeds 90 days, breaking the 7-day revenue mandate.'
  },
  {
    id: 'c9',
    code: 'C9',
    name: 'Trade Show Attendee Identity Resolution Engine',
    category: 'contrarian',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 3, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale:
      'Killed: Lumpy event seasonality; trade show calendars create feast-or-famine monthly revenue.'
  },
  {
    id: 'c10',
    code: 'C10',
    name: 'Construction Mechanics Lien Escrow Settlement Filing',
    category: 'contrarian',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 4, fit: 4, wtp: 3 },
    total: 26,
    selected: false,
    statusRationale:
      'Killed: Slower legal escrow cycles; statutory lien recording borders on unauthorized practice of law (UPL) unlike Sub Radar’s public license verification.'
  },
  {
    id: 'c11',
    code: 'C11',
    name: 'Dead IP / Abandoned Trademark Commercial Re-Filing',
    category: 'contrarian',
    scores: { spd: 2, cap: 3, mar: 4, ceil: 5, def: 4, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale:
      'Killed: USPTO examination queue takes 6-9 months; completely incompatible with 7-day cash mandate.'
  },
  {
    id: 'c12',
    code: 'C12',
    name: 'Clinical Trial Patient Enrollment Web Form Screener',
    category: 'contrarian',
    scores: { spd: 2, cap: 3, mar: 4, ceil: 5, def: 4, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale:
      'Killed: Strict HIPAA liability and institutional review board (IRB) compliance barriers.'
  }
];
