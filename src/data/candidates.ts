import { CandidateIdea } from '../types/index.ts';

export const CANDIDATE_IDEAS: CandidateIdea[] = [
  // PROVEN MODELS (12)
  {
    id: 'p1',
    code: 'P1',
    name: 'Programmatic Local Citation & Directory Sync',
    category: 'proven',
    scores: { spd: 5, cap: 5, mar: 5, ceil: 4, def: 3, fit: 5, wtp: 5 },
    total: 32,
    selected: true,
    rank: 1,
    statusRationale: 'Selected (#1 Proven). Rapid day-by-day cash conversion, massive manual form friction that bots eliminate effortlessly, verified budget line in Local SEO.'
  },
  {
    id: 'p2',
    code: 'P2',
    name: 'B2B Job Board Lead-Scraping & Cold Outbound Ops',
    category: 'proven',
    scores: { spd: 5, cap: 4, mar: 5, ceil: 4, def: 3, fit: 5, wtp: 5 },
    total: 31,
    selected: true,
    rank: 2,
    statusRationale: 'Selected (#2 Proven). Immediate willingness to pay from B2B founders starved for pipeline; live hiring intent converts at 4x-8x static databases.'
  },
  {
    id: 'p3',
    code: 'P3',
    name: 'Competitor Ad Scraping & Creative Intelligence Feed',
    category: 'proven',
    scores: { spd: 4, cap: 5, mar: 5, ceil: 4, def: 3, fit: 5, wtp: 4 },
    total: 30,
    selected: true,
    rank: 3,
    statusRationale: 'Selected (#3 Proven). Direct-to-Consumer brands burn millions on creative fatigue; browser bots download dynamic ad libraries and transcribe video hooks at scale.'
  },
  {
    id: 'p4',
    code: 'P4',
    name: 'E-commerce Price Intelligence / MAP Breach Alerts',
    category: 'proven',
    scores: { spd: 4, cap: 4, mar: 4, ceil: 4, def: 3, fit: 5, wtp: 4 },
    total: 28,
    selected: false,
    statusRationale: 'Killed: Slower enterprise sales cycles (>45 days) and long vendor procurement questionnaires.'
  },
  {
    id: 'p5',
    code: 'P5',
    name: 'Podcast-to-Multiplatform Content Repurposing',
    category: 'proven',
    scores: { spd: 4, cap: 4, mar: 4, ceil: 3, def: 2, fit: 4, wtp: 4 },
    total: 25,
    selected: false,
    statusRationale: 'Killed: Decorative bot utility; basic API webhooks (Descript/Opus) suffice without browser agent fleets.'
  },
  {
    id: 'p6',
    code: 'P6',
    name: 'Executive Ghostwriting & LinkedIn Post Scheduling',
    category: 'proven',
    scores: { spd: 4, cap: 5, mar: 4, ceil: 3, def: 2, fit: 3, wtp: 4 },
    total: 25,
    selected: false,
    statusRationale: 'Killed: High human subjective voice review required; does not decouple revenue from operator hours.'
  },
  {
    id: 'p7',
    code: 'P7',
    name: 'Real Estate MLS Expired Listing Puller & Dossier',
    category: 'proven',
    scores: { spd: 4, cap: 4, mar: 4, ceil: 4, def: 2, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale: 'Killed: High cold-call realtor fatigue; heavy state-level licensing and MLS data access restrictions.'
  },
  {
    id: 'p8',
    code: 'P8',
    name: 'Amazon Seller Review Dispute & Case Management',
    category: 'proven',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 3, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale: 'Killed: Aggressive Amazon seller account suspension risks when logging in via third-party browser profiles.'
  },
  {
    id: 'p9',
    code: 'P9',
    name: 'Upwork / Freelance RFP Scraper & Proposal Engine',
    category: 'proven',
    scores: { spd: 4, cap: 5, mar: 4, ceil: 3, def: 2, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale: 'Killed: Low-margin platform churn; clients on gig platforms have low retention and low price tolerance.'
  },
  {
    id: 'p10',
    code: 'P10',
    name: 'Local Google Business Profile Review & Audit Monitor',
    category: 'proven',
    scores: { spd: 4, cap: 5, mar: 4, ceil: 3, def: 2, fit: 4, wtp: 4 },
    total: 26,
    selected: false,
    statusRationale: 'Subsumed into P1: NAP-Shield incorporates GBP review and post monitoring directly as expansion modules.'
  },
  {
    id: 'p11',
    code: 'P11',
    name: 'SEO Broken Backlink Replacement Outreach',
    category: 'proven',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 3, def: 2, fit: 4, wtp: 3 },
    total: 23,
    selected: false,
    statusRationale: 'Killed: Diminishing conversion rates industry-wide (<0.5% response) and high spam filter burn rates.'
  },
  {
    id: 'p12',
    code: 'P12',
    name: 'SaaS Churn Rescue & Downgrade Re-engagement Scraper',
    category: 'proven',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 2, fit: 3, wtp: 3 },
    total: 23,
    selected: false,
    statusRationale: 'Killed: Demands deep internal production database and Stripe API integration, creating high client security friction.'
  },

  // CONTRARIAN MODELS (12)
  {
    id: 'c1',
    code: 'C1',
    name: 'RFP/Subcontractor Auto-Desk for Local Gov Portals',
    category: 'contrarian',
    scores: { spd: 4, cap: 5, mar: 5, ceil: 5, def: 4, fit: 5, wtp: 5 },
    total: 33,
    selected: true,
    rank: 1,
    statusRationale: 'Selected (#1 Contrarian). Huge non-commoditized blue ocean; unifies thousands of 20-year-old ASP.NET county portals where trade contractors make 50% margins.'
  },
  {
    id: 'c2',
    code: 'C2',
    name: 'Stolen Brand Traffic & Affiliate Hijack Recovery Engine',
    category: 'contrarian',
    scores: { spd: 4, cap: 5, mar: 5, ceil: 5, def: 4, fit: 5, wtp: 4 },
    total: 32,
    selected: true,
    rank: 2,
    statusRationale: 'Selected (#2 Contrarian). Exploits day-parted/geo-cloaked zero-day trademark bidding; solves a massive multi-thousand dollar profit leak for enterprise DTC brands.'
  },
  {
    id: 'c3',
    code: 'C3',
    name: 'Niche SaaS Churn Intel via Deep Review Audit Traps',
    category: 'contrarian',
    scores: { spd: 4, cap: 5, mar: 5, ceil: 5, def: 4, fit: 4, wtp: 4 },
    total: 31,
    selected: true,
    rank: 3,
    statusRationale: 'Selected (#3 Contrarian). Shifts B2B sales from static positive hiring intent to negative competitor dissatisfaction, arming challenger SaaS SDRs with instant displacement battlecards.'
  },
  {
    id: 'c4',
    code: 'C4',
    name: 'Bureaucracy Clearance & Commercial Permit Expediting',
    category: 'contrarian',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 5, def: 4, fit: 5, wtp: 4 },
    total: 29,
    selected: false,
    statusRationale: 'Killed: High regional in-person variances; many county clerks still require physical blueprints over the counter.'
  },
  {
    id: 'c5',
    code: 'C5',
    name: 'Dark Social / Private Slack & Discord Lead Sniffer',
    category: 'contrarian',
    scores: { spd: 3, cap: 3, mar: 4, ceil: 4, def: 3, fit: 4, wtp: 3 },
    total: 24,
    selected: false,
    statusRationale: 'Killed: High ban rate on non-public Slack/Discord accounts; violates community platform terms.'
  },
  {
    id: 'c6',
    code: 'C6',
    name: 'Corporate Procurement Vendor Portal Onboarding Proxy',
    category: 'contrarian',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 4, fit: 4, wtp: 3 },
    total: 26,
    selected: false,
    statusRationale: 'Killed: Requires enterprise legal counsel NDA redlines before accessing Ariba/Coupa systems.'
  },
  {
    id: 'c7',
    code: 'C7',
    name: 'Influencer Whitelist Ad Access & Token Clearance Ops',
    category: 'contrarian',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 3, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale: 'Killed: Meta Business Manager token expiration fragility and influencer creator account churn.'
  },
  {
    id: 'c8',
    code: 'C8',
    name: 'Franchise System Local Social Compliance Police',
    category: 'contrarian',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 3, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale: 'Killed: Franchise headquarters sales cycle exceeds 90 days, breaking the 7-day revenue mandate.'
  },
  {
    id: 'c9',
    code: 'C9',
    name: 'Trade Show Attendee Identity Resolution Engine',
    category: 'contrarian',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 3, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale: 'Killed: Lumpy event seasonality; trade show calendars create feast-or-famine monthly revenue.'
  },
  {
    id: 'c10',
    code: 'C10',
    name: 'Construction Mechanics Lien Tracking & Alert Engine',
    category: 'contrarian',
    scores: { spd: 3, cap: 4, mar: 4, ceil: 4, def: 4, fit: 4, wtp: 3 },
    total: 26,
    selected: false,
    statusRationale: 'Killed: Slower legal escrow cycles; title and escrow attorneys take 60-90 days to close settlements.'
  },
  {
    id: 'c11',
    code: 'C11',
    name: 'Dead IP / Abandoned Trademark Commercial Re-Filing',
    category: 'contrarian',
    scores: { spd: 2, cap: 3, mar: 4, ceil: 5, def: 4, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale: 'Killed: PTO examination queue takes 6-9 months; completely incompatible with 7-day cash mandate.'
  },
  {
    id: 'c12',
    code: 'C12',
    name: 'Clinical Trial Patient Enrollment Web Form Screener',
    category: 'contrarian',
    scores: { spd: 2, cap: 3, mar: 4, ceil: 5, def: 4, fit: 4, wtp: 3 },
    total: 25,
    selected: false,
    statusRationale: 'Killed: Strict HIPAA liability and institutional review board (IRB) compliance barriers.'
  }
];
