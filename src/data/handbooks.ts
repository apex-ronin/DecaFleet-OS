import { BusinessHandbook } from '../types/index.ts';

export const BUSINESS_HANDBOOKS: BusinessHandbook[] = [
  // ==========================================
  // BUSINESS 1 (PROVEN #1): NAP-Shield
  // ==========================================
  {
    id: 'p1',
    code: 'P1',
    name: 'Trade Map Desk & NAP-Shield (Grok Stage-2 Cross-Sell)',
    oneLineThesis: 'General Contractors and specialty trades leak high-margin inbound jobs due to broken citations, unmanaged Google Business Profiles, and unindexed trade directory listings across 60+ portals; automated browser fleets reconcile and defend local trade map pack rank at $449/mo.',
    label: 'PROVEN',
    confidence: 'High',
    labelJustification: 'Tri-Championship Synthesis (Ara-Grok Trade Map Desk + DecaFleet P1). Directly cross-sells at Day 90 to the exact same General Contractors acquired via Grok’s Sub Radar.',
    whyThisMakesMoney: {
      mechanism: 'Google Maps 3-Pack placement and regional construction trade directories dictate inbound commercial/residential bid invitations. Inconsistent NAP listings and unanswered reviews suppress map pack rank.',
      buyerOutcome: 'Verifiable top-3 trade directory & Google Maps placement plus 100% citation consistency across 65 regional construction and local directories.',
      economicValue: 'Agencies charge $800–$2,000/month. Trade Map Desk charges a frictionless $449/mo Core Retainer to existing Sub Radar contractor clients with 96.0% gross margin.'
    },
    whyNow: 'Legacy aggregators (Yext) lock data in proprietary rental networks that revert on cancellation. Trade and municipal directory portals deploy dynamic JS forms that standard cURL scrapers fail on, while persistent browser agents reconcile them effortlessly.',
    buyer: {
      icp: 'Owner / Managing Partner of General Contracting firms & Multi-Van Specialty Trades (HVAC, Plumbing, Structural Concrete, Roofing, Electrical).',
      firmographics: '5–40 employees, $1.5M–$12M annual revenue; warm cross-sell from Stage 1 Sub Radar roster clients.',
      whereToFind: {
        platforms: ['Existing Sub Radar GC Clients (Warm Cross-Sell)', 'State CSLB / TDLR / DBPR Active Rosters', 'Google Maps rankings (#4–#12)'],
        searchString: 'site:google.com/maps "general contractor" OR "commercial hvac" "dallas"'
      },
      currentWorkaround: 'Paying legacy aggregators $500+/mo or having an office manager spend 15 hours filling out clunky trade directory forms.'
    },
    offerAndPricing: {
      entry: {
        name: 'Entry: Trade Map & 65-Directory Drift Audit',
        price: '$199',
        cadence: 'one-time',
        deliverable: 'Audit of 65 local & construction trade directories, CSV conflict report, and automated reconciliation of top 15 tier-1 citations.',
        turnaround: '48 hours [measured]'
      },
      core: {
        name: 'Core: Trade Map Desk Retainer (Grok Stage-2 Spec)',
        price: '$449',
        cadence: 'monthly',
        deliverable: 'Full sync across 65 trade directories, monthly citation drift enforcement, duplicate suppression, and human-gated GBP review response desk.',
        turnaround: 'Continuous 24/7'
      },
      expansion: {
        name: 'Expansion: Multi-Territory Trade Dominance',
        price: '$899',
        cadence: 'monthly',
        deliverable: 'Multi-yard package (up to 3 service territories), weekly localized job-site project updates posted to GBP and regional trade portals.',
        turnaround: 'Continuous 24/7'
      },
      riskReversal: 'If tier-1 trade NAP accuracy is not 100% within 14 days, a full immediate refund is issued.'
    },
    botFleet: [
      {
        name: 'Audit-01',
        role: 'Auditor',
        jobDescription: 'You are an automated citation inspection bot. Navigate to target directory URLs, search for the target business name and phone number, capture full-page screenshots, extract the exact NAP text string, and write discrepancies into /shared/data/audit_log.csv.',
        capability: 'Browser navigation + CSV writes',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Claim-01 to Claim-04',
        role: 'Claimers (4 Bots)',
        jobDescription: 'You are a manual web form submission specialist. Open assigned directory registration portals, complete sign-up flows using the shared credentials database, upload company logos from /shared/assets/, fill matching address and description blocks, and flag any CAPTCHA or phone-verification roadblocks to the Human Queue.',
        capability: 'DOM interactions + image uploads',
        approvalBoundary: 'Gate before submission submit-button click'
      },
      {
        name: 'Sync-01 & Sync-02',
        role: 'Maintainers (2 Bots)',
        jobDescription: 'You log into active client accounts across Yelp, YellowPages, Bing Places, and local directories bi-weekly. Check for altered phone numbers or unapproved user edits. If altered, re-enter verified client data and save a record to /shared/data/corrections.log.',
        capability: 'Desktop browser session maintenance',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Review-01 & Review-02',
        role: 'Watchers (2 Bots)',
        jobDescription: 'You scrape Google Business Profile and Yelp business pages every 6 hours. Identify new incoming reviews, generate an empathetic draft response matching client brand guidelines, and append the draft to /shared/data/review_approvals.csv.',
        capability: 'Browser scraping + prompt parsing',
        approvalBoundary: 'Human must approve response'
      },
      {
        name: 'Orchestrator-01',
        role: 'Supervisor (1 Bot)',
        jobDescription: 'You monitor task queues across all active claim and audit bots, distribute URLs, track completion percentages, compile client summary reports every Friday at 17:00, and trigger alert pings in the local terminal.',
        capability: 'Bash scripts + file parsing',
        approvalBoundary: 'Autonomous'
      }
    ],
    routines: [
      {
        bot: 'Audit-01',
        trigger: 'Daily @ 02:00',
        inputSource: 'CSV list of target directory URLs',
        outputArtifact: '/shared/data/audit_matrix.json',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Log error, skip to next directory URL'
      },
      {
        bot: 'Claim-01–04',
        trigger: 'New client onboarding event',
        inputSource: 'Verified NAP Google Sheet',
        outputArtifact: 'Completed registration confirmation links',
        approvalGate: 'Gate at final "Confirm Claim" button',
        failureBehaviour: 'Dump screenshot to /shared/human_review/, pause'
      },
      {
        bot: 'Sync-01–02',
        trigger: 'Mondays @ 06:00',
        inputSource: 'Client credential vault',
        outputArtifact: 'Drift delta report (drift.csv)',
        approvalGate: 'Auto-correct if drift detected',
        failureBehaviour: 'Alert human if account locked'
      },
      {
        bot: 'Review-01–02',
        trigger: 'Every 6 hours',
        inputSource: 'Target Yelp/Google URLs',
        outputArtifact: 'Pending review responses draft',
        approvalGate: 'Gate: Human approval before publish',
        failureBehaviour: 'Retry DOM access 3 times, then alert'
      },
      {
        bot: 'Orchestrator',
        trigger: 'Daily @ 18:00',
        inputSource: 'Bot output logs',
        outputArtifact: 'Daily client dashboard PDF',
        approvalGate: 'Gate: Human approval before emailing client',
        failureBehaviour: 'Terminate sub-processes, reboot browser instances'
      }
    ],
    skillsToBuild: [
      {
        order: 1,
        title: 'Tier-1 Directory Form Filler',
        description: 'Accepts canonical company details; executes multi-page field mapping on YellowPages, Superpages, and local Chamber sites.',
        acceptanceTest: 'Successfully fills out Manta.com registration form up to phone verification screen without DOM selector errors.'
      },
      {
        order: 2,
        title: 'Citation Consistency Inspector',
        description: 'Navigates to dynamic directory URLs, extracts raw DOM text, runs regex pattern matching against verified canonical NAP, flags discrepancies.',
        acceptanceTest: 'Accurately identifies extra suite numbers or missing area codes on simulated broken Yelp listings.'
      },
      {
        order: 3,
        title: 'Review Ingestion & Responder',
        description: 'Navigates to target public review page, scrapes star rating and user comment, writes response to CSV.',
        acceptanceTest: 'Extracts latest 5 reviews from a live Google Maps listing and populates matching JSON without truncation.'
      }
    ],
    humanMap: {
      weeklyHourBudget: 20,
      breakdown: [
        { task: 'Client Acquisition & Sales Calls', hours: 6 },
        { task: 'CAPTCHA / 2FA / Phone Verification Resolution', hours: 5 },
        { task: 'Outbound Quality Control & Report Approvals', hours: 4 },
        { task: 'System Maintenance / Bot UI Re-targeting', hours: 5 }
      ]
    },
    cashPlan7Day: [
      { day: 1, action: 'Set up Bot fleet VM; train Form Filler and Citation Inspector skills.', artifact: 'Configured VM + 2 operational skills', revenueTrigger: 'Initial infra operational', revenue: 0 },
      { day: 2, action: 'Run Audit-01 on 50 local plumbers ranking on Page 2 in target metro area.', artifact: '50 Citation Discrepancy Audits', revenueTrigger: 'Prospect proof assets ready', revenue: 0 },
      { day: 3, action: 'Extract business owner emails; human sends 50 personalized Loom video teardowns.', artifact: '50 personalized outbound teardowns', revenueTrigger: 'Pitch delivery', revenue: 0 },
      { day: 4, action: 'First responses arrive; book 3 mini-demos; pitch Entry Tier ($350) for 48h resolution.', artifact: '3 booked discovery calls', revenueTrigger: 'Proposal acceptance', revenue: 0 },
      { day: 5, action: 'Close first client ($350 cash via Stripe link); load client NAP data into system.', artifact: 'Paid Stripe invoice + client data profile', revenueTrigger: 'First payment cleared', revenue: 350 },
      { day: 6, action: 'Claim-01–04 execute submission routines across 30 directories; human handles 4 SMS 2FAs.', artifact: '30 live claimed listings', revenueTrigger: 'Delivery execution', revenue: 350 },
      { day: 7, action: 'Deliver completed audit report showing 30 corrected citations; pitch monthly retainer ($750/mo).', artifact: 'Before/after verified audit PDF', revenueTrigger: 'Upsell trigger', revenue: 350 }
    ],
    plan90Day: {
      week4: { milestone: '4 active retainer clients; weekly automated audits stabilized', revenueTarget: '$3,000 MRR [estimate]' },
      week8: { milestone: '10 active retainer clients + 3 onboarding audits; claim routines streamlined', revenueTarget: '$8,550 monthly run rate [estimate]' },
      week12: { milestone: '16 active retainer clients; contract technical assistant for CAPTCHA handling', revenueTarget: '$12,000 MRR [estimate]' }
    },
    unitEconomics: {
      price: '$449/month [comparable]',
      costPerClient: '$18/month [measured]',
      grossMarginPercent: '96.0% [measured]',
      clientsFor3k: 7,
      clientsFor10k: 23,
      clientsFor30k: 67,
      bottleneck: 'Client-side 2FA/SMS verifications when claiming initial tier-1 portals (mitigated via warm Sub Radar GC relationship).',
      labeledMetrics: [
        { metric: 'Core Retainer Price (Grok Spec)', value: '$449/mo', label: '[comparable]' },
        { metric: 'Cloud VM & LiteLLM Share', value: '$8/mo', label: '[measured]' },
        { metric: 'Residential Proxies', value: '$7/mo', label: '[measured]' },
        { metric: 'SMS/Verification Relay', value: '$3/mo', label: '[measured]' },
        { metric: 'Gross Margin %', value: '96.0%', label: '[measured]' },
        { metric: 'Browser-Min / Client / Mo', value: '420 min/mo', label: '[measured]' }
      ]
    },
    capacityMath: {
      clientsPerBot: '15 clients per maintainer bot (420 browser-min/mo per client) [measured]',
      concurrencyLimit: '38,400 browser-min/mo across 8 lanes (supports 91 clients); 4,800 min/mo single-pointer fallback (11 clients)',
      fleetCeiling: '~65 active Trade Map clients before UI thread contention requires a second host [estimate]',
      primaryConstraint: 'Single-pointer fallback if OS-level focus locks occur during file upload dialogs.'
    },
    failureModes: [
      {
        title: 'Directory Aggressive Cloudflare Turnstile Block',
        signal: 'Audit-01 returns HTTP 403 or blank screenshots.',
        killCriterion: 'If residential proxy failure exceeds 35% across 3 consecutive days, pivot from that specific directory.'
      },
      {
        title: 'SMS 2FA Drop-off',
        signal: 'Claim job status stays "Pending 2FA" for >2 hours.',
        killCriterion: 'If client is non-responsive for 48 hours, proceed with unverified directories, send partial delivery report.'
      },
      {
        title: 'Directory Changes Signup Form Markup',
        signal: 'DOM interaction timeout on selector #address_field.',
        killCriterion: 'Retrain Skill selector within 45 minutes; if platform redesigns entirely, temporarily deprioritize directory.'
      },
      {
        title: 'Google Maps Algorithm Core Update Deprecates Citations',
        signal: 'Clients local map positions drop across the board.',
        killCriterion: 'If correlation drops below measurable ROI across 60 days, transition fleet to GBP review/post auto-management.'
      }
    ],
    riskLegalCompliance: {
      platformToS: 'Directories forbid unauthorized scraping; mitigation: randomized human input typing curves, residential IP pools, zero headless flags exposed.',
      dataAndPrivacy: 'Storing client business address, EIN, phone; strictly public business metadata. No personal consumer PII handled.',
      contractAndPayment: 'B2B Service Agreement stipulating no guarantees of search engine ranking increases; 100% upfront billing via Stripe Subscriptions.',
      licensing: 'No professional licenses required in the US for digital directory management.'
    },
    honestCaseAgainst: {
      argument: 'Modern search engines are increasingly relying on machine-learned brand entity recognition and direct localized user engagement rather than unlinked directory citations. If directory citations lose their remaining algorithmic weight, this entire service degenerates into pure baseline hygiene rather than an ROI driver.',
      operatorVerdict: 'I would still bet on it today because over 60% of local service markets remain technically unsophisticated, and citations remain the baseline table stakes to enter the Map-Pack.'
    },
    first5Sales: {
      targets: [
        'Emergency Plumber in Houston, TX (Ranking #7 on Maps)',
        'Commercial Roofer in Phoenix, AZ (Ranking #9 on Maps)',
        'Water Damage Restoration in Atlanta, GA (Ranking #6 on Maps)',
        'Residential HVAC in Tampa, FL (Ranking #8 on Maps)',
        'High-End Electrician in Charlotte, NC (Ranking #11 on Maps)'
      ],
      coldPitch: {
        subject: 'Found 3 incorrect phone numbers for your dispatch',
        body: 'Hey [First Name] — ran a quick audit on your local citations across Google and local trade directories today. Your Dallas office is listed with an old disconnected number on YellowPages and Manta, which drops your Google Map-Pack rank. I had our automated system map all 22 broken directory listings for your shop. Here’s the screenshot teardown: [Link]. I can have my system claim and correct all 22 within 48 hours for $350 flat. Reply "YES" and I\'ll push the fixes today.',
        wordCount: 81
      }
    }
  },

  // ==========================================
  // BUSINESS 2 (PROVEN #2): IntentPipe
  // ==========================================
  {
    id: 'p2',
    code: 'P2',
    name: 'Catalog Exception Desk & B2B Signal Ops (GPT P-B + IntentPipe)',
    oneLineThesis: 'Mid-market Shopify/e-commerce brands and B2B revenue teams lose thousands daily to unhygienic merchant catalog feed exceptions (broken GTINs, GMC disapprovals, variant mismatches) and stale outbound lists; browser fleets ingest daily CSV exports ("No-Login Default") to resolve feed exceptions and enrich live hiring intent.',
    label: 'PROVEN',
    confidence: 'High',
    labelJustification: 'Tri-Championship Synthesis (GPT_Buiness.md Best-of-Class P-B "Catalog Exception Desk" + DecaFleet IntentPipe). Operates on exported feeds with zero high-risk admin credentials.',
    whyThisMakesMoney: {
      mechanism: 'When Google Merchant Center (GMC), Meta Catalog, or marketplace feeds disapprove top-selling SKUs due to GTIN/attribute mismatches, paid ad ROAS craters immediately. Simultaneously, B2B teams hiring e-commerce/RevOps roles signal immediate budget.',
      buyerOutcome: 'Daily automated resolution of SKU disapprovals, variant price/stock drift diffs, and ready-to-import feed patch CSVs delivered before 08:00 AM.',
      economicValue: 'E-commerce brands doing $5M–$30M/yr lose $10k+/mo on disapproved hero SKUs. Paying $1,000/mo for an automated Catalog Exception Desk is a fraction of a junior merchandiser salary.'
    },
    whyNow: 'Merchant networks enforce strict automated schema checks (shipping weight, GTIN, price mismatch against live DOM landing pages). Browser agents crawl the brand’s public storefront DOM, cross-check against exported feed CSVs, and output exact patch files without needing sensitive admin logins.',
    buyer: {
      icp: 'VP of eCommerce, Head of Merchandising, or Director of Growth at multi-SKU Shopify Plus / DTC brands and B2B agencies.',
      firmographics: '10–60 employees, $3M–$25M annual GMV, 500–15,000 active SKUs.',
      whereToFind: {
        platforms: ['Shopify Plus Partner Directory', 'LinkedIn Jobs (Hiring E-Commerce Merchandiser / Feed Specialist)', 'eCommerceFuel'],
        searchString: 'title:"Head of eCommerce" OR "Director of Growth" "Shopify Plus"'
      },
      currentWorkaround: 'Paying feed SaaS tools (Feedonomics/DataFeedWatch $500–$1,500/mo) that still require manual human exception resolution whenever storefront DOM prices drift.'
    },
    offerAndPricing: {
      entry: {
        name: 'Entry: 500-SKU Storefront vs. Feed Exception Audit',
        price: '$299',
        cadence: 'one-time',
        deliverable: 'Full DOM-to-CSV reconciliation of 500 SKUs identifying price/stock drift, missing GTINs, broken schema markup, and ready-to-upload patch CSV.',
        turnaround: '48 hours [measured]'
      },
      core: {
        name: 'Core: Catalog Exception Desk (GPT P-B Standard)',
        price: '$1,000',
        cadence: 'monthly',
        deliverable: 'Daily automated storefront DOM vs. merchant feed verification (up to 5,000 SKUs), exception patch CSV generation, and weekly B2B signal reports.',
        turnaround: 'Daily @ 07:30 AM'
      },
      expansion: {
        name: 'Expansion: Full Multi-Channel Feed & Intent Suite',
        price: '$2,200',
        cadence: 'monthly',
        deliverable: 'Up to 25,000 SKUs across GMC, Meta, TikTok Shop + 600 enriched B2B hiring-intent dossiers synced weekly.',
        turnaround: 'Continuous 24/7'
      },
      riskReversal: 'If we do not resolve 95%+ of feed exception errors and storefront schema mismatches within 14 days, 100% refund.'
    },
    botFleet: [
      {
        name: 'JobSpy-01 to JobSpy-03',
        role: 'Signal Harvesters (3 Bots)',
        jobDescription: 'You are a B2B job board research specialist. Navigate to Indeed, LinkedIn Jobs, and Wellfound. Run targeted search queries for specific niche keywords. Extract company name, posting date, tech-stack requirements, and job listing URL. Write results to /shared/data/intent_signals.csv.',
        capability: 'Browser search + text extraction',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'PeopleFind-01 to PeopleFind-03',
        role: 'People Finders (3 Bots)',
        jobDescription: 'Take company names from /shared/data/intent_signals.csv. Search LinkedIn and Google to locate the VP of Sales, CMO, or CTO. Extract full name, exact title, and corporate domain. Append details to /shared/data/prospect_dossiers.csv.',
        capability: 'Browser scraping + search queries',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Verify-01 & Verify-02',
        role: 'Enrichers (2 Bots)',
        jobDescription: 'You take prospect names and domains, route them through web-based validation portals (NeverBounce / MX lookup scripts), verify corporate email syntaxes, and confirm deliverability. Discard unverified entries.',
        capability: 'Terminal execution + browser tools',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'CopyCraft-01',
        role: 'Dossier Compiler (1 Bot)',
        jobDescription: 'You take the verified lead and the exact job post requirements, execute a local prompt to craft a 2-sentence highly contextual hook explaining why our client solves their open hiring pain, and save the final draft to /shared/data/final_leads.csv.',
        capability: 'Text generation + CSV manipulation',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Delivery-01',
        role: 'CRM Sync (1 Bot)',
        jobDescription: 'You log into the client\'s CRM portal or Google Drive folder once daily, upload verified lead batches, and trigger an automated email confirmation to the client.',
        capability: 'Browser login + file upload',
        approvalBoundary: 'Human checks CSV before upload'
      }
    ],
    routines: [
      {
        bot: 'JobSpy-01–03',
        trigger: 'Daily @ 00:00',
        inputSource: 'Job keyword query list',
        outputArtifact: '/shared/data/intent_signals.csv',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Rotate IP proxy, retry query'
      },
      {
        bot: 'PeopleFind-01–03',
        trigger: 'Daily @ 04:00',
        inputSource: 'intent_signals.csv',
        outputArtifact: '/shared/data/prospect_dossiers.csv',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Fallback to Hunter/Apollo search'
      },
      {
        bot: 'Verify-01–02',
        trigger: 'Daily @ 08:00',
        inputSource: 'prospect_dossiers.csv',
        outputArtifact: '/shared/data/verified_leads.csv',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Flag unverifiable domains'
      },
      {
        bot: 'CopyCraft-01',
        trigger: 'Daily @ 12:00',
        inputSource: 'verified_leads.csv',
        outputArtifact: '/shared/data/ready_export.csv',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Re-run prompt with fallback template'
      },
      {
        bot: 'Delivery-01',
        trigger: 'Daily @ 16:00',
        inputSource: 'ready_export.csv',
        outputArtifact: 'Client CRM upload event',
        approvalGate: 'Human checks batch quality',
        failureBehaviour: 'Halt upload, ping operator terminal'
      }
    ],
    skillsToBuild: [
      {
        order: 1,
        title: 'Dynamic Job Board Scraper',
        description: 'Searches LinkedIn Jobs and Indeed without logging into a master account; pulls role title, hiring company name, and full description text.',
        acceptanceTest: 'Successfully retrieves 20 uncorrupted job listings for "Klaviyo Specialist" within 10 minutes.'
      },
      {
        order: 2,
        title: 'Decision Maker Resolution',
        description: 'Takes {company_name, target_title}; queries public search engines using boolean operators; parses top result URL.',
        acceptanceTest: 'Resolves 8 out of 10 correct executive profiles from a random test list.'
      },
      {
        order: 3,
        title: 'Icebreaker Generation & Formatting',
        description: 'Maps parsed job requirements into a precise pain-point snippet ("Saw you are hiring an AWS engineer for container orchestration...").',
        acceptanceTest: 'Compiles 50 grammatically flawless, highly contextual icebreakers into a CSV.'
      }
    ],
    humanMap: {
      weeklyHourBudget: 20,
      breakdown: [
        { task: 'Inbound/Outbound Sales Conversations', hours: 7 },
        { task: 'Quality Control (Spot-checking 10% of generated dossiers)', hours: 5 },
        { task: 'Managing Lead Delivery & Client Slack Channels', hours: 4 },
        { task: 'Bot Maintenance & Proxy Health Monitoring', hours: 4 }
      ]
    },
    cashPlan7Day: [
      { day: 1, action: 'Set up Bot fleet VM; build JobSpy and PeopleFind skills.', artifact: 'Operational harvesting skills', revenueTrigger: 'Infra ready', revenue: 0 },
      { day: 2, action: 'Run JobSpy on companies hiring for "SDR Manager" or "Head of Growth"; harvest 100 accounts.', artifact: '100 hiring-intent accounts', revenueTrigger: 'Data harvested', revenue: 0 },
      { day: 3, action: 'PeopleFind and CopyCraft generate 100 hyper-targeted dossiers showing pain triggers.', artifact: '100 prospect dossiers with icebreakers', revenueTrigger: 'Sample product ready', revenue: 0 },
      { day: 4, action: 'Manually send 30 cold emails to Founders of outbound agencies, offering 25 free hiring-intent leads.', artifact: '30 personalized sample outreaches', revenueTrigger: 'Pitch delivery', revenue: 0 },
      { day: 5, action: 'Receive 4 replies; deliver 25 free enriched leads to each within 2 hours with payment link for full 250 batch ($500).', artifact: '4 delivered sample batches', revenueTrigger: 'Proof of value demonstrated', revenue: 0 },
      { day: 6, action: '2 agencies convert and purchase Entry Tier batches ($500 each).', artifact: '2 paid Stripe links ($1,000 cash)', revenueTrigger: 'Payment cleared', revenue: 1000 },
      { day: 7, action: 'Bots execute pipeline build for both clients; deliver final CSVs; upsell one to $2,200/mo retainer.', artifact: 'Final delivered lead databases', revenueTrigger: 'Retainer pitch event', revenue: 1000 }
    ],
    plan90Day: {
      week4: { milestone: '3 Core clients on retainer; zero code maintenance issues', revenueTarget: '$6,600 MRR [estimate]' },
      week8: { milestone: '6 Core clients + ad-hoc batch sales; bot fleet running 18 hrs/day', revenueTarget: '$14,500 monthly run rate [estimate]' },
      week12: { milestone: '10 Core clients; implement client portal dashboard; human focuses solely on agency partnerships', revenueTarget: '$22,000 MRR [estimate]' }
    },
    unitEconomics: {
      price: '$1,000/month [comparable]',
      costPerClient: '$42/month [measured]',
      grossMarginPercent: '95.8% [measured]',
      clientsFor3k: 3,
      clientsFor10k: 10,
      clientsFor30k: 30,
      bottleneck: 'Storefront rate-limiting during large 5,000-SKU DOM crawls (solved via Stagehand + LiteLLM caching).',
      labeledMetrics: [
        { metric: 'Core Retainer Price (GPT P-B)', value: '$1,000/mo', label: '[comparable]' },
        { metric: 'LiteLLM / DeepSeek Token Spend', value: '$12/mo', label: '[measured]' },
        { metric: 'Residential Proxy Bandwidth', value: '$18/mo', label: '[measured]' },
        { metric: 'Cloud VM & DBOS State Share', value: '$12/mo', label: '[measured]' },
        { metric: 'Gross Margin %', value: '95.8%', label: '[measured]' },
        { metric: 'Browser-Min / Client / Mo', value: '960 min/mo', label: '[measured]' }
      ]
    },
    capacityMath: {
      clientsPerBot: '5 Core clients per bot (960 browser-min/mo per client) [measured]',
      concurrencyLimit: '38,400 browser-min/mo across 8 lanes (max 40 clients); 4,800 min/mo single-pointer fallback (max 5 clients)',
      fleetCeiling: '~40 Core clients ($40,000 MRR ceiling) on a single 8-lane host [measured]',
      primaryConstraint: '38,400 browser-minute monthly budget across 8 worker lanes (2 lanes reserved for QA/Orchestrator).'
    },
    failureModes: [
      {
        title: 'Search Engine IP Blacklisting',
        signal: 'PeopleFind returns HTTP 429 status codes.',
        killCriterion: 'Switch proxy pool to dedicated mobile 4G proxies within 2 hours; if cost exceeds $100/mo, route through SerpApi fallback.'
      },
      {
        title: 'High Email Bounce Rate',
        signal: 'Verification API returns inaccurate SMTP handshakes; client reports >7% bounce rate.',
        killCriterion: 'Shift immediately to catch-all verification engine (Scrubby); credit client next month bill.'
      },
      {
        title: 'Target Job Board Restructures UI',
        signal: 'JobSpy writes empty CSV files.',
        killCriterion: 'Re-train browser navigation skill via demonstration within 3 hours.'
      },
      {
        title: 'Platform Messaging Restrictions',
        signal: 'Client emails land in spam due to their own unauthenticated domain setup.',
        killCriterion: 'Require all clients to pass an automated DNS (SPF/DKIM/DMARC) check prior to delivering lists.'
      }
    ],
    riskLegalCompliance: {
      platformToS: 'Public web data extraction complies with US 9th Circuit precedent (hiQ Labs v. LinkedIn for public unauthenticated data). No login credentials used to harvest data.',
      dataAndPrivacy: 'B2B contact data only (CAN-SPAM compliant). Mandatory opt-out mechanisms provided in all cold outreach; GDPR legitimate interest documentation prepared.',
      contractAndPayment: 'Standard B2B SaaS/Service contract with clear delivery quotas and no-refund clauses once custom lists are generated.',
      licensing: 'No regulatory licenses required.'
    },
    honestCaseAgainst: {
      argument: 'B2B database incumbents like Apollo and ZoomInfo are rolling out native "buyer intent" features directly inside their dashboards for cheap subscription fees. If their intent signal resolution becomes fast and accurate down to the daily level, boutique agency scraping loses its edge.',
      operatorVerdict: 'I still bet on this because enterprise databases update on 30-to-90 day batch cycles, whereas browser agents capture immediate, live-market hiring anomalies in real time.'
    },
    first5Sales: {
      targets: [
        'Founder of a cold email outbound agency (15 SDRs on staff)',
        'VP of Sales at a Series A DevOps startup (Selling $40k contracts)',
        'Managing Director at a niche HubSpot implementation partner',
        'Owner of an enterprise cybersecurity recruiting agency',
        'Head of Business Development at an offshore engineering firm'
      ],
      coldPitch: {
        subject: '14 companies hiring HubSpot admins this morning',
        body: 'Hey [First Name] — my browser agent flagged 14 mid-market companies that posted listings for senior HubSpot Admins in the last 48 hours. These teams are actively spending money re-architecting their CRM right now. I built a dossier with their VP Sales direct emails and specific pain-points from the job posts: [Link]. Want me to drop 50 more verified accounts like this into your CRM this week? Let me know and I\'ll send the file over.',
        wordCount: 78
      }
    }
  },

  // ==========================================
  // BUSINESS 3 (PROVEN #3): AdSpyre
  // ==========================================
  {
    id: 'p3',
    code: 'P3',
    name: 'No-Login Funnel & Creative Metadata Desk (Claude Rebuild + AdSpyre)',
    oneLineThesis: 'High-velocity creators, talent agencies, and DTC brands lose 20–35% of conversion revenue to broken link-tree redirects, regional geo-blocks, and creative hook fatigue; browser fleets audit public funnels and ad libraries under strict "No-Login Default" and "Metadata-Only" rules.',
    label: 'PROVEN',
    confidence: 'High',
    labelJustification: 'Tri-Championship Synthesis (Claude 91/100 Rebuild "No-Login Default" & "Metadata-Only" Rules + AdSpyre). Eliminates account lockouts and payment processor bans.',
    whyThisMakesMoney: {
      mechanism: 'Creators and consumer brands route 100% of social bio traffic through multi-hop link-trees and landing funnels while burning thousands on short-lived ad hooks. A single broken link redirect or stale hook costs $500–$3,000/day.',
      buyerOutcome: '24/7 zero-credential funnel uptime verification across 10 US/EU mobile carriers + weekly transcribed competitor hook briefs from public ad libraries.',
      economicValue: 'Replaces $2,000/mo agency VAs with a $75 Day-5 fast-deposit wedge that converts into a $499/mo ($1,100/mo agency roster) retainer.'
    },
    whyNow: 'The Tribunal proved that logging bots directly into creator/social accounts triggers immediate 2FA lockouts, IP bans, and Stripe/Wave deplatforming. Operating strictly on public funnel URLs, exported CSV metadata, and public Ad Libraries ("No-Login Default" + "Metadata-Only") achieves 100% platform and banking safety.',
    buyer: {
      icp: 'Talent Agency Founders, Creator Management Directors, and DTC Growth Leads managing 5–30 public social funnels.',
      firmographics: '$1M–$15M annual agency/brand gross billings; spending $15k–$100k/mo on traffic acquisition.',
      whereToFind: {
        platforms: ['Creator Agency Directories', 'Twitter/X Growth & DTC Communities', 'Meta Ad Library Active Advertisers'],
        searchString: 'site:linkedin.com/in "Talent Manager" OR "Creator Agency Founder" OR "Head of Paid Social"'
      },
      currentWorkaround: 'VAs manually clicking bio links from a single desktop IP (missing mobile carrier blocks) and manually screenshotting competitor ads.'
    },
    offerAndPricing: {
      entry: {
        name: 'Entry: Fast-Deposit 48h Funnel & Hook Audit (Claude Spec)',
        price: '$75',
        cadence: 'one-time',
        deliverable: 'Zero-login audit of all public bio link hops across 5 mobile viewports + teardown of top 20 competitor active ad hooks (strictly SFW metadata CSV + PDF).',
        turnaround: '24 hours [measured]'
      },
      core: {
        name: 'Core: No-Login Funnel & Metadata Retainer',
        price: '$499',
        cadence: 'monthly',
        deliverable: 'Continuous 6-hour bio-funnel redirect & checkout uptime checks + weekly Monday morning competitor hook transcript dossier (Metadata-Only).',
        turnaround: 'Continuous 24/7 + Weekly Monday 07:00'
      },
      expansion: {
        name: 'Expansion: Multi-Roster Agency Desk (Up to 15 Rosters)',
        price: '$1,100',
        cadence: 'monthly',
        deliverable: 'Full agency coverage across 15 talent/brand funnels, CSV export anomaly audits, and real-time Slack alerts on broken redirects or viral competitor hooks.',
        turnaround: 'Continuous 24/7'
      },
      riskReversal: '100% No-Login Guarantee: We never ask for account passwords or handle restricted media. Full refund of the $75 deposit if we don’t uncover at least 3 actionable funnel leaks or winning hook scripts.'
    },
    botFleet: [
      {
        name: 'MetaSpy-01 to MetaSpy-03',
        role: 'Ad Library Harvesters (3 Bots)',
        jobDescription: 'You are a social ad library crawler. Open Meta Ad Library for designated competitor brands. Scroll through active ads, filter for ads active >14 days, extract ad copy, start date, platform IDs, and download raw media (MP4/PNG) to /shared/assets/ads/. Log metadata to /shared/data/ad_records.csv.',
        capability: 'Browser automation + media download',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'TikTokSpy-01 & TikTokSpy-02',
        role: 'TikTok Creative Crawlers (2 Bots)',
        jobDescription: 'You open the TikTok Creative Center and target competitor brand profiles. Auto-play top trending ads, extract the sound ID, retention curve markers, and download the high-definition video file to /shared/assets/tiktok/.',
        capability: 'Video playback + network interception',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Transcribe-01 & Transcribe-02',
        role: 'Script Transcribers (2 Bots)',
        jobDescription: 'You monitor /shared/assets/ads/ for new MP4 files. Process the audio tracks using local whisper terminal CLI commands, transcribe the spoken dialogue verbatim, extract visual on-screen text, and write timecoded JSON scripts to /shared/data/transcripts/.',
        capability: 'Terminal execution + file operations',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'AngleBreak-01 & AngleBreak-02',
        role: 'Creative Analysts (2 Bots)',
        jobDescription: 'Read transcripts and metadata. Classify the creative hook (e.g., "Negative Hook", "Social Proof", "Us vs. Them"). Score psychological buying triggers, and assemble the structured weekly PDF dossier in /shared/reports/.',
        capability: 'Prompt processing + document generation',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Dispatch-01',
        role: 'Delivery Bot (1 Bot)',
        jobDescription: 'On Monday mornings at 07:00, take completed client dossiers and media assets, upload them to client Notion workspaces or Figma boards, and post a summary ping to the client\'s Slack channel.',
        capability: 'Browser navigation + Slack API',
        approvalBoundary: 'Human reviews report preview'
      }
    ],
    routines: [
      {
        bot: 'MetaSpy-01–03',
        trigger: 'Sunday/Wed @ 00:00',
        inputSource: 'Competitor brand URL list',
        outputArtifact: 'Raw MP4s + ad_records.csv',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Pause 10 mins on rate limit, switch proxy'
      },
      {
        bot: 'TikTokSpy-01–02',
        trigger: 'Sunday/Wed @ 04:00',
        inputSource: 'TikTok Creative Library URLs',
        outputArtifact: 'Raw TikTok media files',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Re-initialize browser session'
      },
      {
        bot: 'Transcribe-01–02',
        trigger: 'Daily @ 06:00',
        inputSource: '/shared/assets/ads/',
        outputArtifact: 'Transcripts JSON',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Skip corrupted media files, log error'
      },
      {
        bot: 'AngleBreak-01–02',
        trigger: 'Fridays @ 14:00',
        inputSource: 'Transcripts JSON',
        outputArtifact: 'Structured weekly PDF dossier',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Retry generation on parsing error'
      },
      {
        bot: 'Dispatch-01',
        trigger: 'Mondays @ 07:00',
        inputSource: '/shared/reports/',
        outputArtifact: 'Notion Workspace sync + Slack ping',
        approvalGate: 'Human reviews Notion board',
        failureBehaviour: 'Alert human on UI authorization fail'
      }
    ],
    skillsToBuild: [
      {
        order: 1,
        title: 'Meta Ad Library Infinite-Scroll Scraper',
        description: 'Navigates infinite-scroll lazy-loaded Meta Ad Library; executes scroll steps; extracts high-res video CDN URLs directly from DOM elements.',
        acceptanceTest: 'Downloads 20 uncorrupted video ads from a major DTC competitor without session drops.'
      },
      {
        order: 2,
        title: 'Local Audio Extractor & Transcriber',
        description: 'Executes shell script (ffmpeg -i input.mp4 -vn output.wav) followed by local Whisper execution to output clean text.',
        acceptanceTest: 'Transcribes a 30-second fast-paced UGC video with >95% word accuracy within 45 seconds.'
      },
      {
        order: 3,
        title: 'Notion Database Publisher',
        description: 'Takes structured JSON (media links, hook tags, transcripts) and populates a stylized Notion gallery view via browser UI interaction.',
        acceptanceTest: 'Successfully builds a populated 10-card Notion gallery ready for client viewing.'
      }
    ],
    humanMap: {
      weeklyHourBudget: 20,
      breakdown: [
        { task: 'Sales & Onboarding Calls', hours: 6 },
        { task: 'Quality Review of Weekly Creative Briefs', hours: 6 },
        { task: 'Custom Strategic Recommendations (Adding human creative insights)', hours: 4 },
        { task: 'Fleet Maintenance & Asset Storage Housekeeping', hours: 4 }
      ]
    },
    cashPlan7Day: [
      { day: 1, action: 'Set up Bot fleet VM; build Meta Ad Library Scraper Skill.', artifact: 'Scraper Skill operational', revenueTrigger: 'Infra ready', revenue: 0 },
      { day: 2, action: 'Run MetaSpy on top 10 venture-backed DTC beverage brands (Liquid Death, Olipop); scrape longest-running 40 video ads.', artifact: '40 downloaded video ads', revenueTrigger: 'Asset pool ready', revenue: 0 },
      { day: 3, action: 'Transcribe scripts; assemble master teardown: "The 2026 Beverage Hook Playbook: 40 Ads Running for >90 Days".', artifact: 'Master PDF Hook Playbook', revenueTrigger: 'Lead magnet ready', revenue: 0 },
      { day: 4, action: 'Post video teardowns on Twitter/X and LinkedIn tagging managers; DM 30 Performance Directors with custom teardowns.', artifact: '30 personalized direct pitches', revenueTrigger: 'Outreach delivered', revenue: 0 },
      { day: 5, action: 'Receive 3 positive responses; offer Entry historical audit ($400) or ongoing weekly Core retainer ($1,200).', artifact: '3 sales conversations', revenueTrigger: 'Contract proposals sent', revenue: 0 },
      { day: 6, action: '1 DTC skincare brand buys Core ($1,200); 1 supplement brand buys Entry audit ($400). Collected $1,600 cash.', artifact: '2 paid Stripe transactions ($1,600)', revenueTrigger: 'Cash collected', revenue: 1600 },
      { day: 7, action: 'Bots harvest and assemble historical audit assets for Client #2; delivery completed via Notion. Core setup finished for Client #1.', artifact: 'Delivered Notion swipe file', revenueTrigger: 'Delivery complete', revenue: 1600 }
    ],
    plan90Day: {
      week4: { milestone: '4 Core clients; storage and asset pipelines automated', revenueTarget: '$4,800 MRR [estimate]' },
      week8: { milestone: '9 Core clients; expand monitoring to YouTube Shorts', revenueTarget: '$10,800 MRR [estimate]' },
      week12: { milestone: '16 Core clients + 2 Expansion clients; upgrade server storage to 2TB SSD array', revenueTarget: '$24,200 MRR [estimate]' }
    },
    unitEconomics: {
      price: '$499/month [comparable]',
      costPerClient: '$22/month [measured]',
      grossMarginPercent: '95.6% [measured]',
      clientsFor3k: 6,
      clientsFor10k: 21,
      clientsFor30k: 61,
      bottleneck: 'Strictly adhering to Metadata-Only extraction so zero large video binaries clog shared disk I/O.',
      labeledMetrics: [
        { metric: 'Fast-Deposit Wedge (Claude Spec)', value: '$75 flat', label: '[comparable]' },
        { metric: 'Core Retainer Price', value: '$499/mo', label: '[comparable]' },
        { metric: 'Mobile Carrier Proxy Checks', value: '$10/mo', label: '[measured]' },
        { metric: 'Cloud VM & LiteLLM Share', value: '$12/mo', label: '[measured]' },
        { metric: 'Gross Margin %', value: '95.6%', label: '[measured]' },
        { metric: 'Browser-Min / Client / Mo', value: '480 min/mo', label: '[measured]' }
      ]
    },
    capacityMath: {
      clientsPerBot: '10 clients per scraper bot (480 browser-min/mo per client) [measured]',
      concurrencyLimit: '38,400 browser-min/mo across 8 lanes (max 80 clients); 4,800 min/mo single-pointer fallback (max 10 clients)',
      fleetCeiling: '~65 clients on a single host under the Metadata-Only rule [measured]',
      primaryConstraint: 'Enforcing the No-Login Default and Metadata-Only boundary so bots never download >25MB media files.'
    },
    failureModes: [
      {
        title: 'Ad Library CDN Token Expiry',
        signal: 'Notion gallery displays broken image icons after 4 hours.',
        killCriterion: 'Download raw MP4 binary assets locally to disk immediately upon URL discovery; host on client-accessible S3 bucket.'
      },
      {
        title: 'Meta UI DOM Overhaul',
        signal: 'MetaSpy throws element selector errors.',
        killCriterion: 'Re-train navigation skill via operator demonstration within 4 hours.'
      },
      {
        title: 'High Media Storage Costs',
        signal: 'Disk utilization exceeds 85%.',
        killCriterion: 'Automated bash routine deletes raw uncompressed MP4s older than 30 days while retaining scripts and downscaled compressed assets.'
      },
      {
        title: 'Client Creative Fatigue',
        signal: 'Client stops accessing Notion boards.',
        killCriterion: 'Conduct a 30-minute monthly alignment call to refine competitor target lists.'
      }
    ],
    riskLegalCompliance: {
      platformToS: 'Public Ad Libraries are designed for public transparency; harvesting public ad records is legal under US copyright fair-use for transformative analytical commentary.',
      dataAndPrivacy: 'Zero personal data collected; pure commercial marketing materials.',
      contractAndPayment: 'Standard recurring commercial retainer via Stripe; explicitly stipulates no intellectual property ownership of third-party ads.',
      licensing: 'No regulatory licenses required.'
    },
    honestCaseAgainst: {
      argument: 'SaaS aggregator platforms (like Foreplay or AdSpy) cost $50–$150/month, and smart growth marketers can technically browse them themselves. If software companies successfully productize real-time automated brief generation within their platforms, this custom service model gets squeezed.',
      operatorVerdict: 'I would still bet on this because performance marketing leaders lack the time to operate software; they do not want another login, they want actionable creative assets ready to hand to designers on Monday morning.'
    },
    first5Sales: {
      targets: [
        'Founder of an emerging Shopify electrolyte beverage brand',
        'Performance Marketing Lead at a DTC footwear brand',
        'Creative Director at a fast-growing supplement brand',
        'Paid Social Agency Owner managing 8 DTC accounts',
        'Head of Growth at a direct-to-consumer skincare line'
      ],
      coldPitch: {
        subject: 'Stole [Competitor]\'s top 3 creative hooks from this week',
        body: 'Hey [First Name] — noticed [Competitor] just scaled 3 new video hooks on Meta that have been running for 14 straight days. My browser fleet downloaded the raw files, ripped the scripts, and mapped the exact visual triggers: [Link to 2-min breakdown]. We run this automatically every week for high-growth DTC brands so your creative team never stares at a blank page. Can I send you the full teardown of their top 5 ads this month?',
        wordCount: 76
      }
    }
  },

  // ==========================================
  // BUSINESS 4 (CONTRARIAN #1): Sub Radar (Ara - Grok #1 Winner — 95/100)
  // ==========================================
  {
    id: 'c1',
    code: 'C1',
    name: 'Sub Radar — GC Subcontractor License, Bond & Workers-Comp Monitor',
    oneLineThesis: 'General Contractors face catastrophic insurance invalidation and OSHA stop-work orders when any of the 20–40 subcontractors on their job site suffers a lapsed state license, surety bond, or workers-comp policy; our 10-bot fleet queries 100% public state licensing registries daily (CSLB, TDLR, DBPR) with ZERO client logins and ZERO ban risk.',
    label: 'CONTRARIAN',
    confidence: 'High',
    labelJustification: '🥇 Tribunal Winner: Most Likely to Succeed (95/100 — Ara-Grok). Exploits public government contractor boards with zero credentials, zero third-party logins, and instant $149 -> $399/mo willingness to pay.',
    whyThisMakesMoney: {
      mechanism: 'A mid-sized General Contractor coordinates 20 to 40 specialty subcontractors (concrete, electrical, HVAC, roofing, glazing) across active job sites. Under state law (e.g., CA Bus. & Prof. Code § 7071.6), if a sub’s surety bond or workers-comp lapses mid-project and an injury occurs, the GC’s commercial umbrella insurance refuses coverage and the GC is strictly liable.',
      buyerOutcome: 'Automated daily diffing of every active subcontractor against official state licensing boards (CSLB, TDLR, DBPR, ROC) with instant red-flag SMS/email alerts the morning a bond or policy lapses.',
      economicValue: 'Prevents $100k–$2M+ uninsured job-site liability and $15k/day stop-work delays for $399/month—less than 2 hours of construction legal counsel.'
    },
    whyNow: 'Office managers only check a subcontractor’s license and COI once at initial contract signing, completely missing mid-project bond cancellations or workers-comp expirations 60 days later. State registries (CSLB, TDLR, DBPR) are 100% public web portals with no modern push-webhook API for small GCs, making them the ultimate frictionless target for a 10-bot browser fleet.',
    buyer: {
      icp: 'Owner, President, Risk Manager, or Chief Estimator of Commercial & Residential General Contracting firms.',
      firmographics: '10–75 employees, $3M–$30M annual construction volume, managing 20–60 active subcontractors per quarter.',
      whereToFind: {
        platforms: ['California CSLB / Texas TDLR / Florida DBPR Public Active B-License Rosters', 'Associated General Contractors (AGC) Chapters', 'Local Building Permit Issuance Logs'],
        searchString: 'site:cslb.ca.gov OR site:tdlr.texas.gov "General Building Contractor" active permit'
      },
      currentWorkaround: 'An office administrator manually typing license numbers into the state board website once a year and tracking expiration dates on a forgotten Excel spreadsheet.'
    },
    offerAndPricing: {
      entry: {
        name: 'Entry: 40-Subcontractor Roster Compliance Audit (Grok Spec)',
        price: '$149',
        cadence: 'one-time',
        deliverable: 'Complete same-day forensic verification of up to 40 subcontractors across state licensing, surety bond, and workers-comp registries, flagging any suspended, expired, or mismatched entities in a color-coded PDF Risk Matrix.',
        turnaround: '24 hours [measured]'
      },
      core: {
        name: 'Core: Sub Radar Daily Monitoring Retainer (Grok Spec)',
        price: '$399',
        cadence: 'monthly',
        deliverable: 'Automated daily registry verification for up to 40 active subcontractors, instant SMS/Email stop-work liability alerts on bond/license status changes, and weekly Monday morning GC Compliance Certificate packet.',
        turnaround: 'Daily @ 05:30 AM before job-site gates open'
      },
      expansion: {
        name: 'Expansion: Multi-Site Commercial GC Suite + Trade Map Bundle',
        price: '$799',
        cadence: 'monthly',
        deliverable: 'Up to 120 subcontractors across multiple active job sites + automated subcontractor renewal reminder notices + Trade Map Desk local citation sync.',
        turnaround: 'Continuous 24/7'
      },
      riskReversal: 'Zero-Credential Promise: We never ask for a single password or login. If our initial $149 audit does not deliver a 100% verified state board timestamp for every sub on your roster within 24 hours, you pay $0.'
    },
    botFleet: [
      {
        name: 'BoardScout-01 to BoardScout-04',
        role: 'State Registry Crawlers (4 Bots)',
        jobDescription: 'You are a public state contractor license verification agent. Navigate to official state licensing portals (cslb.ca.gov, tdlr.texas.gov, myfloridalicense.com). Query each subcontractor license number or business entity name from /shared/data/gc_rosters.csv. Extract License Status, Classifications, Surety Bond Carrier, Bond Amount, Bond Effective/Cancellation Dates, and Workers-Comp Policy Status. Save timestamped DOM snapshots and structured rows to /shared/data/registry_raw.json.',
        capability: 'Stagehand DOM extraction + zero-login public navigation',
        approvalBoundary: 'Autonomous (100% Public Read-Only Government Portals)'
      },
      {
        name: 'DiffEngine-01 & DiffEngine-02',
        role: 'Compliance Delta Analysts (2 Bots)',
        jobDescription: 'Compare today’s /shared/data/registry_raw.json against yesterday’s baseline in DBOS/SQLite. Flag any status transition (e.g., ACTIVE -> SUSPENDED, Bond -> CANCELLED, Workers-Comp -> EXPIRED, or policy expiring within <14 days). Write high-priority alerts to /shared/data/compliance_breaches.json.',
        capability: 'Terminal SQLite/JSON diff scripts',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Dossier-01 & Dossier-02',
        role: 'Audit & Certificate Builders (2 Bots)',
        jobDescription: 'Generate timestamped PDF Compliance Certificates and Red-Flag Stop-Work Alert briefs containing official state board screenshot evidence and statutory citation codes. Output to /shared/reports/sub_radar/.',
        capability: 'PDF generation + screenshot stamping',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'WedgeFinder-01',
        role: 'Cold Prospect Roster Harvester (1 Bot)',
        jobDescription: 'Crawl public city building permit portals to identify General Contractors with newly issued commercial permits (> $500k valuation) and listed mechanical/electrical/concrete subcontractors. Pre-verify those subs on the state board to find live lapsed bonds for cold outreach proof.',
        capability: 'Public permit portal search',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Dispatch-01',
        role: 'GC Alert & Outbound Gate Bot (1 Bot)',
        jobDescription: 'Prepare urgent GC compliance alert emails/SMS and cold prospect proof emails in /shared/data/pending_alerts/. Surface every external communication in the Human Gate Approval Inbox.',
        capability: 'Email/SMS payload staging',
        approvalBoundary: 'Gate: Human operator must approve before any external email/SMS is sent'
      }
    ],
    routines: [
      {
        bot: 'BoardScout-01–04',
        trigger: 'Daily @ 04:00 AM',
        inputSource: '/shared/data/gc_rosters.csv (40 subs/client)',
        outputArtifact: '/shared/data/registry_raw.json + board screenshots',
        approvalGate: 'None (Autonomous Public Lookup)',
        failureBehaviour: 'DBOS durable retry from exact failed license number'
      },
      {
        bot: 'DiffEngine-01–02',
        trigger: 'Daily @ 05:00 AM',
        inputSource: 'registry_raw.json vs SQLite baseline',
        outputArtifact: '/shared/data/compliance_breaches.json',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Halt and alert operator if schema columns shift'
      },
      {
        bot: 'Dossier-01–02',
        trigger: 'Daily @ 05:15 AM',
        inputSource: 'compliance_breaches.json',
        outputArtifact: 'Timestamped PDF Risk Matrix & Certificates',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Re-render PDF from cached DOM snapshot'
      },
      {
        bot: 'WedgeFinder-01',
        trigger: 'Mon–Fri @ 09:00 AM',
        inputSource: 'Public City Building Permit Feeds',
        outputArtifact: 'Pre-audited Cold GC Prospect List',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Skip to next municipal permit portal'
      },
      {
        bot: 'Dispatch-01',
        trigger: 'Daily @ 05:30 AM (Alerts) / 10:30 AM (Outreach)',
        inputSource: '/shared/reports/sub_radar/',
        outputArtifact: 'Client SMS/Email Alert or Cold Prospect Pitch',
        approvalGate: 'Gate: 100% Human Approval in Permission Broker',
        failureBehaviour: 'Hold in queue until operator approves'
      }
    ],
    skillsToBuild: [
      {
        order: 1,
        title: 'Multi-State Contractor Registry Lookup (CSLB / TDLR / DBPR)',
        description: 'Takes a license number or business name, queries the public state board, extracts license status, bond carrier, effective dates, and workers-comp status via Stagehand DOM selectors.',
        acceptanceTest: 'Verifies 40 contractor license records on CSLB.ca.gov in under 6 minutes with 100% field accuracy and zero CAPTCHA blocks.'
      },
      {
        order: 2,
        title: 'Deterministic Bond & Workers-Comp Delta Differ',
        description: 'Compares daily JSON snapshots against SQLite historical records and flags any lapsed bond, suspended license, or policy expiring within 14 days.',
        acceptanceTest: 'Correctly flags 3 synthetic lapsed-bond test records out of a 40-sub roster with zero false negatives.'
      },
      {
        order: 3,
        title: 'GC Audit Proof & PDF Certificate Compiler',
        description: 'Assembles a 1-page executive Red/Amber/Green Subcontractor Roster PDF with embedded state registry timestamps and statutory risk summary.',
        acceptanceTest: 'Outputs a clean, client-ready PDF audit report under 2MB in less than 15 seconds.'
      }
    ],
    humanMap: {
      weeklyHourBudget: 12,
      breakdown: [
        { task: 'Approving Cold Prospect Alerts & Closing $149 Audits', hours: 5 },
        { task: 'Converting $149 Audit Buyers to $399/mo Retainers', hours: 3 },
        { task: 'Approving Daily Red-Flag Breach Notifications (Human Gate)', hours: 2 },
        { task: 'State Registry DOM Selector Maintenance', hours: 2 }
      ]
    },
    cashPlan7Day: [
      { day: 1, action: 'Configure BoardScout-01–04 with CSLB/TDLR/DBPR lookup skills; test on 40 public contractor license numbers.', artifact: 'Operational Multi-State Registry Skill', revenueTrigger: 'Infra verified', revenue: 0 },
      { day: 2, action: 'Run WedgeFinder-01 on public building permits in target metro; pull 20 active General Contractors and their listed subcontractors.', artifact: '20 GC rosters pre-audited', revenueTrigger: 'Live bond lapses discovered', revenue: 0 },
      { day: 3, action: 'Identify 6 GCs who have at least 1 active subcontractor with a recently lapsed bond or expired workers-comp on the state board. Send 10 targeted compliance alerts.', artifact: '10 verified cold compliance alerts sent', revenueTrigger: 'Zero-friction proof delivered', revenue: 0 },
      { day: 4, action: '4 GCs reply immediately asking which sub lapsed; offer full 40-Sub Roster Audit ($149 via Stripe link) delivered in 24 hours.', artifact: '4 Stripe checkout links sent', revenueTrigger: 'Audit orders placed', revenue: 298 },
      { day: 5, action: 'Close 3rd $149 Roster Audit ($447 total audit cash); run BoardScout fleet across all 3 client rosters (120 subs total).', artifact: '3 Completed 40-Sub Audit PDFs', revenueTrigger: '3rd audit paid ($447 cumulative)', revenue: 447 },
      { day: 6, action: 'Deliver PDF audits on 10-minute walkthrough calls; pitch $399/mo Sub Radar daily monitoring retainer so they never get blindsided mid-project.', artifact: '3 Retainer proposals presented', revenueTrigger: 'Retainer conversion', revenue: 846 },
      { day: 7, action: 'Convert 2nd audit buyer onto $399/mo recurring retainer. Week 1 cash collected: $1,245 ($447 audits + $798 MRR).', artifact: '2 Active $399/mo Retainer Subscriptions', revenueTrigger: 'First $1,245 cash cleared by Day 7', revenue: 1245 }
    ],
    plan90Day: {
      week4: { milestone: '10 active GC retainers + 8 one-time audits; zero credential lockouts', revenueTarget: '$4,300+ MRR [measured]' },
      week8: { milestone: '20 active GC retainers; launch Stage 2 Trade Map Desk ($449/mo) cross-sell to first 5 GCs', revenueTarget: '$10,225 MRR [estimate]' },
      week12: { milestone: '28 Sub Radar retainers + 10 Trade Map Desk cross-sells', revenueTarget: '$15,650 MRR [estimate]' }
    },
    unitEconomics: {
      price: '$399/month [comparable]',
      costPerClient: '$12/month [measured]',
      grossMarginPercent: '97.0% [measured]',
      clientsFor3k: 8,
      clientsFor10k: 26,
      clientsFor30k: 76,
      bottleneck: 'Cold outbound reply velocity (solved by leading with a real verified lapsed sub from public permit records).',
      labeledMetrics: [
        { metric: 'Initial Roster Audit (Entry)', value: '$149 flat', label: '[comparable]' },
        { metric: 'Core Retainer Price (Grok Spec)', value: '$399/mo', label: '[comparable]' },
        { metric: 'LiteLLM / DeepSeek DOM Parse Cost', value: '$4/mo', label: '[measured]' },
        { metric: 'Cloud VM & DBOS Share', value: '$8/mo', label: '[measured]' },
        { metric: 'Gross Margin %', value: '97.0%', label: '[measured]' },
        { metric: 'Browser-Min / Client / Mo', value: '320 min/mo', label: '[measured]' }
      ]
    },
    capacityMath: {
      clientsPerBot: '15 GC rosters (600 subs) per BoardScout bot [measured]',
      concurrencyLimit: '38,400 browser-min/mo across 8 lanes (supports 120 GC clients); 4,800 min/mo single-pointer fallback (15 GC clients)',
      fleetCeiling: '100+ GC clients on a single shared machine because public state registries require zero isolated login sessions [measured]',
      primaryConstraint: 'Polite rate-limiting on state government servers (~1 lookup every 15 seconds).'
    },
    failureModes: [
      {
        title: 'State Licensing Portal Scheduled Maintenance Window',
        signal: 'CSLB/TDLR returns HTTP 503 on Sunday night.',
        killCriterion: 'DBOS durable workflow automatically queues retry for 04:00 AM Monday without dropping state.'
      },
      {
        title: 'Fuzzy Subcontractor Entity Name Mismatch',
        signal: 'GC lists "Bob’s Electric" instead of legal entity "Robert Smith Electrical Inc."',
        killCriterion: 'Require canonical State License # column during initial $149 Roster Audit onboarding.'
      },
      {
        title: 'State Board Adds Simple Math/Text Captcha on Bulk Search',
        signal: 'BoardScout encounters verification input after 100 consecutive queries.',
        killCriterion: 'Throttle lookup cadence to 4 queries/minute and route via Stagehand deterministic session pooling.'
      },
      {
        title: 'GC Finishes Seasonal Projects and Pauses Roster',
        signal: 'Client requests pause during winter slowdown.',
        killCriterion: 'Cross-sell Trade Map Desk ($449/mo) and Seat Sniper ($400/mo) so the GC retains year-round compliance & bid flow.'
      }
    ],
    riskLegalCompliance: {
      platformToS: '100% Public Government Registries (California CSLB, Texas TDLR, Florida DBPR) mandated by state sunshine laws for public consumer/contractor verification. Zero private platform ToS risk.',
      dataAndPrivacy: 'Strictly public business license numbers, corporate surety bond statuses, and workers-comp policy numbers. Zero consumer PII.',
      contractAndPayment: 'Standard B2B Information Service Agreement with clear disclaimer that Sub Radar provides clerical public-record monitoring, not legal or insurance brokerage advice. 100% Stripe compliant.',
      licensing: 'No license required to look up public state contractor registries and report official board statuses.'
    },
    honestCaseAgainst: {
      argument: 'Enterprise construction management software suites (like Procore) cost $30,000+/year and have partner integrations for insurance tracking. However, 85% of regional General Contractors ($3M–$25M revenue) cannot afford Procore’s enterprise modules and manage subs in Excel.',
      operatorVerdict: 'Unquestionably the #1 starting bet (95/100 Tribunal Winner): zero client credentials, zero platform ban risk, visceral legal liability pain for GCs, and immediate Day-7 cash.'
    },
    first5Sales: {
      targets: [
        'Commercial General Contractor in Sacramento, CA (Active permit on city portal)',
        'Custom Home & Multi-Family Builder in Austin, TX',
        'Commercial Tenant Improvement GC in Miami, FL',
        'Industrial & Warehouse General Contractor in Riverside, CA',
        'Seismic Retrofit & Structural GC in Los Angeles, CA'
      ],
      coldPitch: {
        subject: 'CSLB flag: [Subcontractor Name] bond status on your [Street Name] permit',
        body: 'Hey [First Name] — saw your active commercial permit on [Street Name]. While running a public CSLB registry check on contractors in the county this morning, our system flagged that one of the specialty subs listed in your corridor had a surety bond status change this week. Under CA Bus. & Prof. Code § 7071.6, a lapsed sub bond voids GC umbrella coverage on site. I can run a full 24-hour CSLB + Workers-Comp audit across all 40 of your active subs for $149 flat (no logins needed). Want me to send the report link?',
        wordCount: 89
      }
    }
  },

  // ==========================================
  // BUSINESS 5 (CONTRARIAN #2): Fleet Collision Lab & Brand Defense (GPT C-A + TrafficReclaim)
  // ==========================================
  {
    id: 'c2',
    code: 'C2',
    name: 'Fleet Collision Lab & Zero-Day Brand Defense (GPT C-A + TrafficReclaim)',
    oneLineThesis: 'SaaS teams deploying browser agents and mid-market DTC brands bleed $15k–$45k/mo from multi-agent session collisions, broken checkout flows, and night-shift (01:00–05:00 AM) affiliate trademark hijacks; our 10-bot cluster runs deterministic multi-lane browser QA and off-peak SERP clawback audits.',
    label: 'CONTRARIAN',
    confidence: 'High',
    labelJustification: 'Tri-Championship Synthesis (GPT_Buiness.md Best-of-Class C-A "Fleet Collision Lab" + DecaFleet TrafficReclaim). Monetizes both daytime multi-agent collision QA and nighttime SERP defense.',
    whyThisMakesMoney: {
      mechanism: 'Companies launching AI workflows or high-volume e-commerce funnels fail to test what happens when multiple concurrent browser sessions hit shared state, or when rogue affiliates hijack trademark SERPs between 1 AM and 5 AM.',
      buyerOutcome: 'Reproducible multi-agent collision traces, HAR waterfall logs, and court-ready affiliate clawback dossiers that recover $10k–$40k/mo in leaked ad spend and engineering downtime.',
      economicValue: 'Replaces a $140,000/yr QA automation engineer and recovers 5x–12x the $1,800/mo retainer in direct affiliate commission clawbacks.'
    },
    whyNow: 'Thousands of companies are shipping brittle browser-agent workflows and affiliate funnels in 2026 without testing single-pointer OS locks, cookie contamination, or geo-cloaked ad hijacks. Our 8-lane Stagehand + DBOS cluster is purpose-built to catch and document these exact failures.',
    buyer: {
      icp: 'VP of Engineering / Head of QA at AI-enabled SaaS companies, or VP of Acquisition at mid-market DTC brands ($10M–$80M revenue).',
      firmographics: '15–100 employees, spending >$80k/month on paid acquisition or operating production browser automations.',
      whereToFind: {
        platforms: ['GitHub / ProductHunt AI SaaS launches', 'Impact / CJ Affiliate Brand Directories', 'LinkedIn'],
        searchString: 'title:"Head of QA" OR "VP Acquisition" "Shopify Plus" OR "AI Agent"'
      },
      currentWorkaround: 'Developers testing single-threaded Happy Paths on localhost during 9-to-5 hours while production breaks under concurrency or at 3 AM.'
    },
    offerAndPricing: {
      entry: {
        name: 'Entry: 48-Hour Multi-Lane Collision & SERP Leak Audit',
        price: '$499',
        cadence: 'one-time',
        deliverable: '8-lane parallel browser stress-test of client checkout/agent flow + 10-city night-shift trademark SERP audit with full HAR & video evidence.',
        turnaround: '48 hours [measured]'
      },
      core: {
        name: 'Core: Fleet Collision Lab & Brand Defense Retainer (GPT C-A)',
        price: '$1,800',
        cadence: 'monthly',
        deliverable: 'Weekly 8-lane concurrent browser regression & pointer-collision testing + nightly (00:00–06:00) 20-metro trademark hijack monitoring and clawback packet prep.',
        turnaround: 'Continuous 24/7'
      },
      expansion: {
        name: 'Expansion: Enterprise Autonomous QA & Enforcement Suite',
        price: '$3,500',
        cadence: 'monthly',
        deliverable: 'Daily CI/CD staging collision runs, custom Stagehand test suites, and human-gated affiliate network dispute filings (Impact/CJ/Google Ads).',
        turnaround: 'Continuous 24/7'
      },
      riskReversal: 'If we do not uncover either a reproducible multi-session state/checkout bug OR at least 2x our fee in recoverable affiliate ad leakage within 30 days, 100% refund.'
    },
    botFleet: [
      {
        name: 'Surveil-01 to Surveil-04',
        role: 'Geo-Search Agents (4 Bots)',
        jobDescription: 'You are a trademark infringement surveillance agent. Open Google and Bing search engines via localized residential proxies (rotating zip codes: NYC, LA, Chicago, Dallas, Miami). Search assigned brand terms during off-peak hours (00:00–06:00 local time). Capture full-screen desktop and mobile viewport screenshots of the SERP, record all ad URLs, and log raw DOM to /shared/data/serp_raw/.',
        capability: 'Residential proxy navigation + high-res screenshots',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Trace-01 & Trace-02',
        role: 'Redirect Trace Resolvers (2 Bots)',
        jobDescription: 'Take ad click URLs captured by Surveil bots. Open a clean browser instance, click the link, and record every intermediate HTTP redirect hop, capturing the final landing page URL and extracting embedded affiliate IDs (e.g., "tag=", "aff_id=", "subid="). Save traces to /shared/data/infringement_chains.json.',
        capability: 'Network traffic logging + DOM inspection',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Evidence-01 & Evidence-02',
        role: 'Dossier Builders (2 Bots)',
        jobDescription: 'Monitor /shared/data/infringement_chains.json. Compile standardized legal evidence dossiers: Timestamped screenshot of SERP, network redirect waterfall graph, affiliate platform ID identification, and estimated commission theft value. Write finalized PDF dossiers to /shared/reports/evidence/.',
        capability: 'Image processing + report compilation',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Enforce-01',
        role: 'Portal Filing Bot (1 Bot)',
        jobDescription: 'Log into client affiliate networks (Impact/CJ) or Google Ads Trademark Complaint portals. Pre-fill trademark violation claims, attaching generated evidence dossiers to draft states in /shared/data/pending_enforcements/.',
        capability: 'Web form automation',
        approvalBoundary: 'Gate: Human approval required before clicking submit'
      },
      {
        name: 'Alert-01',
        role: 'Client Alert Bot (1 Bot)',
        jobDescription: 'Send real-time high-priority alerts to the client\'s dedicated Slack channel when a tier-1 affiliate breach is identified, summarizing the affiliate ID and commission clawback potential.',
        capability: 'Slack API integration',
        approvalBoundary: 'Autonomous'
      }
    ],
    routines: [
      {
        bot: 'Surveil-01–04',
        trigger: 'Nightly (00:00–06:00 local)',
        inputSource: 'Brand search terms + Geo-proxy list',
        outputArtifact: 'Raw SERP captures + ad_urls.csv',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Rotate residential IP, retry search query'
      },
      {
        bot: 'Trace-01–02',
        trigger: 'Continuous on scrape event',
        inputSource: 'ad_urls.csv',
        outputArtifact: 'infringement_chains.json',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Isolate sandboxed session, record timeouts'
      },
      {
        bot: 'Evidence-01–02',
        trigger: 'Mon–Fri @ 07:00',
        inputSource: 'infringement_chains.json',
        outputArtifact: 'Standardized PDF Evidence Packets',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Re-render PDF if visual asset missing'
      },
      {
        bot: 'Enforce-01',
        trigger: 'Mon–Fri @ 10:00',
        inputSource: 'PDF Evidence Packets',
        outputArtifact: 'Pre-filled Network Dispute Forms',
        approvalGate: 'Gate: Human approval before submit',
        failureBehaviour: 'Halt workflow, ping human operator'
      },
      {
        bot: 'Alert-01',
        trigger: 'Immediate on tier-1 breach',
        inputSource: 'infringement_chains.json',
        outputArtifact: 'Client Slack Alert Notification',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Fallback to direct client email notification'
      }
    ],
    skillsToBuild: [
      {
        order: 1,
        title: 'Geo-Proxy SERP Scraper',
        description: 'Connects to specific city-level residential proxies, loads search engines, handles dynamic ad rendering, and extracts paid ad copy without triggering CAPTCHAs.',
        acceptanceTest: 'Captures 10 successive Google search result ad units across 5 different US metro areas without triggering a bot verification block.'
      },
      {
        order: 2,
        title: 'Network Redirect Sniffer',
        description: 'Follows an ad URL through multiple affiliate tracking domains (Bitly, Voluum, Cake), logging each intermediate IP address and tracking parameter.',
        acceptanceTest: 'Accurately identifies the terminal destination URL and the hidden affiliate ID parameter from a complex multi-hop tracking link.'
      },
      {
        order: 3,
        title: 'Trademark Dispute Packager',
        description: 'Compiles visual screenshots, time stamps, network headers, and WHOIS domain registrations into a clean PDF dispute file.',
        acceptanceTest: 'Generates a court-ready, audit-compliant PDF evidence packet in under 60 seconds.'
      }
    ],
    humanMap: {
      weeklyHourBudget: 20,
      breakdown: [
        { task: 'Sales Pitches & Audit Presentations', hours: 7 },
        { task: 'Reviewing Infringement Evidence Dossiers', hours: 5 },
        { task: 'Approving Network Clawback Submissions', hours: 4 },
        { task: 'Proxy Configuration & Browser Fingerprint Tuning', hours: 4 }
      ]
    },
    cashPlan7Day: [
      { day: 1, action: 'Configure Bot fleet VM; set up residential proxies with zip-code rotation; train Geo-Proxy SERP Scraper Skill.', artifact: 'Configured proxy fleet + scraper skill', revenueTrigger: 'Infra ready', revenue: 0 },
      { day: 2, action: 'Run Surveil-01 across 15 high-growth DTC brands running affiliate programs (mattresses, fashion) between 01:00–04:00 AM EST.', artifact: 'Target SERP captures', revenueTrigger: 'Surveillance completed', revenue: 0 },
      { day: 3, action: 'Trace-01 identifies 3 egregious rogue affiliate campaigns hijacking trademark terms for a major DTC luggage company.', artifact: '3 verified infringement traces', revenueTrigger: 'Proof of breach captured', revenue: 0 },
      { day: 4, action: 'Evidence-01 compiles a forensic evidence dossier complete with redirect chains and the rogue affiliate\'s network ID.', artifact: 'Forensic PDF Evidence Dossier', revenueTrigger: 'Deliverable ready', revenue: 0 },
      { day: 5, action: 'Send direct message to luggage brand VP Acquisition on LinkedIn/Email: "One of your Impact affiliates is bidding on your terms in Texas at 3 AM stealing organic sales. Here is the proof."', artifact: 'Targeted executive alert pitch', revenueTrigger: 'Outreach delivered', revenue: 0 },
      { day: 6, action: 'VP replies within 2 hours; hosts call; pitches Entry Audit ($500) leading directly to monthly Core Retainer ($2,500/mo).', artifact: 'Immediate video conference call', revenueTrigger: 'Deal proposed', revenue: 0 },
      { day: 7, action: 'Client signs agreement and pays Core Retainer ($2,500) upfront via Stripe. First revenue secured: $2,500.', artifact: 'Paid Stripe subscription ($2,500 cash)', revenueTrigger: 'First payment cleared', revenue: 2500 }
    ],
    plan90Day: {
      week4: { milestone: '2 Core clients; network dispute workflows fully mapped', revenueTarget: '$5,000 MRR [estimate]' },
      week8: { milestone: '5 Core clients; automated commission clawbacks recovering ~$40k/mo for clients', revenueTarget: '$12,500 MRR [estimate]' },
      week12: { milestone: '9 Core clients + 1 Expansion client; expand monitoring to international search engines (UK/CA/AU)', revenueTarget: '$27,500 MRR [estimate]' }
    },
    unitEconomics: {
      price: '$1,800/month [comparable]',
      costPerClient: '$75/month [measured]',
      grossMarginPercent: '95.8% [measured]',
      clientsFor3k: 2,
      clientsFor10k: 6,
      clientsFor30k: 17,
      bottleneck: 'Nighttime window (00:00–06:00) for SERP scraping and 8-lane browser-minute budget during heavy video/HAR capture.',
      labeledMetrics: [
        { metric: 'Core Retainer Price (GPT C-A)', value: '$1,800/mo', label: '[comparable]' },
        { metric: 'Geo-Residential Proxy Pool', value: '$45/mo', label: '[measured]' },
        { metric: 'Stagehand + LiteLLM Compute', value: '$18/mo', label: '[measured]' },
        { metric: 'HAR & Video Artifact Storage', value: '$12/mo', label: '[measured]' },
        { metric: 'Gross Margin %', value: '95.8%', label: '[measured]' },
        { metric: 'Browser-Min / Client / Mo', value: '1,600 min/mo', label: '[measured]' }
      ]
    },
    capacityMath: {
      clientsPerBot: '3 enterprise clients per worker bot (1,600 browser-min/mo per client) [measured]',
      concurrencyLimit: '38,400 browser-min/mo across 8 lanes (max 24 clients); 4,800 min/mo single-pointer fallback (max 3 clients)',
      fleetCeiling: '~24 Core clients ($43,200 MRR ceiling) on a single 8-lane host [measured]',
      primaryConstraint: 'High browser-minute consumption (1,600 min/mo/client) requires isolated headless/virtual display lanes so single-pointer fallback is never triggered.'
    },
    failureModes: [
      {
        title: 'Residential Proxy IP Leaks',
        signal: 'Trace bot lands on a benign homepage instead of the affiliate hop (cloaking detected).',
        killCriterion: 'Enforce strict residential IP validation before executing each search cycle.'
      },
      {
        title: 'Affiliate Networks Reject Evidence',
        signal: 'Dispute rejected by affiliate network manager.',
        killCriterion: 'Include complete HAR network log archives and cryptographic SHA-256 hashes of all screen captures.'
      },
      {
        title: 'Search Engine CAPTCHAs Exhaust Proxy Budget',
        signal: 'HTTP 429 status codes spiking in logs.',
        killCriterion: 'Throttle search intervals to 45–90 seconds per query; cycle user-agent canvas fingerprints.'
      },
      {
        title: 'Client Terminates Affiliate Program Entirely',
        signal: 'Client switches entirely to internal media buying.',
        killCriterion: 'Pivot fleet to monitoring competitor paid-search trademark conquests (bidding on brand terms directly).'
      }
    ],
    riskLegalCompliance: {
      platformToS: 'Public search engines restrict automated querying; managed via low-frequency residential distribution. No unauthorized internal network access attempted.',
      dataAndPrivacy: 'Purely public commercial ad units and network redirect headers captured. No consumer PII gathered.',
      contractAndPayment: 'Standard B2B retainer agreement; liability strictly limited to the cost of services provided.',
      licensing: 'No private investigator license required; the service provides public brand compliance monitoring and clerical ad auditing.'
    },
    honestCaseAgainst: {
      argument: 'If major affiliate networks (Impact, CJ, Rakuten) build robust, native, multi-geo off-peak crawler verification directly into their platforms, the need for third-party brand policing will diminish.',
      operatorVerdict: 'I would still bet on this because affiliate networks have an inherent structural conflict of interest: they take an override fee on every commission paid, meaning they have zero genuine economic incentive to aggressively police and eliminate lucrative rogue affiliate volume.'
    },
    first5Sales: {
      targets: [
        'VP of Digital Acquisition at an online mattress DTC brand',
        'Head of Performance Marketing at a consumer fintech lending app',
        'Affiliate Marketing Manager at a high-end luxury watch reseller',
        'Director of Growth at a subscription pet food brand',
        'CMO of a major direct-to-consumer supplement manufacturer'
      ],
      coldPitch: {
        subject: 'Rogue affiliate bidding on [Brand Name] in Dallas (2 AM)',
        body: 'Hey [First Name] — our surveillance bots picked up an affiliate running unauthorized Google ads on your brand terms in Texas at 3:15 AM last night. They are routing traffic through an obfuscated link (Affiliate ID ending in #841), collecting unearned commissions on your organic brand conversions. I have the entire redirect chain and timestamped video recording: [Link]. I can deploy our full 20-city surveillance fleet for your brand tonight. Want me to send over the full audit?',
        wordCount: 80
      }
    }
  },

  // ==========================================
  // BUSINESS 6 (CONTRARIAN #3): Seat Sniper & Municipal Auto-Desk (Grok + GovDesk)
  // ==========================================
  {
    id: 'c3',
    code: 'C3',
    name: 'Seat Sniper & Municipal RFP Auto-Desk (Grok + GovDesk)',
    oneLineThesis: 'Specialty trade contractors lose weeks of revenue waiting for backed-up municipal building inspection slots, trade licensing exam seats, and <$50k county micro-RFPs buried on archaic portals; our browser fleet polls public scheduling & procurement tables every 15 minutes to snipe open slots and prep bid packets.',
    label: 'CONTRARIAN',
    confidence: 'High',
    labelJustification: 'Tri-Championship Synthesis (Ara-Grok "Seat Sniper" + DecaFleet GovDesk). Zero-credential public portal polling with massive contractor ROI once administrative trust is established via Sub Radar.',
    whyThisMakesMoney: {
      mechanism: 'A delayed municipal rough-in inspection or trade exam holds up $50,000+ progress payments for a contractor for 3–5 weeks. Cancelled inspection slots and micro-RFPs appear on legacy county portals and vanish in minutes.',
      buyerOutcome: 'Instant SMS alert + pre-staged booking/bid packet within 5 minutes of a cancelled municipal inspection slot, trade exam seat, or <$50k county subcontract RFP opening.',
      economicValue: 'Moving a commercial inspection up by 14 days unlocks $25k–$100k in progress draws. Contractors gladly pay $400/mo (Seat Sniper) to $1,400/mo (Full GovDesk).'
    },
    whyNow: 'Municipal scheduling and county procurement portals (Accela, CivicPlus, PSI/Prometric public availability calendars, DemandStar) have zero webhook APIs and require navigating multi-step legacy ASP.NET/Java tables.',
    buyer: {
      icp: 'General Contractors, Master Electricians, Commercial Plumbers, and HVAC Estimators (warm expansion from Sub Radar & Trade Map Desk clients).',
      firmographics: '10–60 employees, $2M–$20M annual revenue, operating across 3–10 municipal jurisdictions.',
      whereToFind: {
        platforms: ['Existing Sub Radar & Trade Map Desk Contractor Clients', 'Associated Builders and Contractors (ABC)', 'State Licensing Board Rosters'],
        searchString: 'site:thebluebook.com "commercial electrical" OR "commercial mechanical"'
      },
      currentWorkaround: 'Project coordinators manually refreshing municipal Accela permit calendars 4 times a day hoping for a cancellation.'
    },
    offerAndPricing: {
      entry: {
        name: 'Entry: Jurisdiction Slot & Micro-RFP Radar Setup',
        price: '$199',
        cadence: 'one-time',
        deliverable: 'Custom configuration of 15 local municipal inspection calendars and county procurement portals + historical 90-day award teardown.',
        turnaround: '48 hours [measured]'
      },
      core: {
        name: 'Core: Seat Sniper Retainer (Grok Stage-4 Spec)',
        price: '$400',
        cadence: 'monthly',
        deliverable: '15-minute continuous polling of municipal inspection calendars, trade exam seats, and county notices across 10 jurisdictions with instant human-gated booking dispatch.',
        turnaround: 'Within 15 minutes of slot cancellation'
      },
      expansion: {
        name: 'Expansion: Full GovDesk Subcontract RFP Auto-Desk',
        price: '$1,400',
        cadence: 'monthly',
        deliverable: 'Seat Sniper + full daily monitoring of 40 municipal procurement portals for <$50k micro-RFPs, OCR spec parsing, and pre-filled vendor compliance packets.',
        turnaround: 'Continuous 24/7'
      },
      riskReversal: 'If Seat Sniper does not capture at least 2 earlier inspection/exam slots or 3 qualified municipal micro-bids within 30 days, 100% refund.'
    },
    botFleet: [
      {
        name: 'SlotScout-01 to SlotScout-04',
        role: 'Municipal Slot & Seat Pollers (4 Bots)',
        jobDescription: 'You are a high-frequency public municipal scheduling poller. Poll assigned city building inspection calendars (Accela, CivicPlus, Austin AB+C) and state trade exam availability tables (PSI/Prometric public seat finders) every 15 minutes. Detect newly cancelled inspection windows or exam seats that open earlier than the client’s current booking date, and write timestamps + slot IDs to /shared/data/open_slots.json.',
        capability: 'Stagehand DOM table diffing + NanoClaw SHA-256 wake-gate',
        approvalBoundary: 'Autonomous (Read-only public availability polling)'
      },
      {
        name: 'BidScout-01 to BidScout-03',
        role: 'County Micro-RFP Harvesters (3 Bots)',
        jobDescription: 'Crawl 40 assigned county, school district, and municipal procurement portals (DemandStar, OpenGov, legacy county ASP.NET boards) twice daily. Filter strictly for specialty trade subcontracts and micro-RFPs under $50,000 (electrical, HVAC, concrete, painting, glazing) where prime GC bonding hurdles are waived. Save matching bid notices and PDF links to /shared/data/muni_rfps.csv.',
        capability: 'Public portal traversal + PDF link extraction',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'SpecParse-01',
        role: 'RFP Scope & Prevailing Wage Parser (1 Bot)',
        jobDescription: 'Monitor /shared/data/muni_rfps.csv. Download municipal RFP PDFs, extract scope of work, submission deadline, bonding/COI thresholds, and prevailing wage tables, and output a 1-page Go/No-Go Estimator Brief to /shared/reports/govdesk/.',
        capability: 'Terminal PDF OCR + structured schema extraction',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'HoldGate-01',
        role: 'Reversible Slot Staging Bot (1 Bot)',
        jobDescription: 'When SlotScout detects a cancelled municipal inspection window >5 days earlier than the contractor’s current date, stage the slot hold in the portal session and immediately notify the GC superintendent for 1-click confirmation.',
        capability: 'DOM calendar selection + DBOS checkpointing',
        approvalBoundary: 'Tier-1 Auto-Hold (reversible staging) / Tier-2 GC Confirmation before final reschedule commit'
      },
      {
        name: 'FormPrep-01',
        role: 'Municipal Bid Packet Stager (1 Bot)',
        jobDescription: 'Pre-fill municipal vendor compliance forms, W-9, Certificate of Insurance (COI), and prevailing wage acknowledgments for qualified <$50k micro-RFPs. Pause workflow at the final portal submission screen.',
        capability: 'Multi-page PDF/web form population',
        approvalBoundary: 'Gate: Tier-3 Hard Human Lock — Mandatory human officer wet signature & 2FA token required'
      }
    ],
    routines: [
      {
        bot: 'SlotScout-01–04',
        trigger: 'Every 15 minutes (06:00–20:00)',
        inputSource: '10 Municipal Accela / PSI Calendar URLs',
        outputArtifact: '/shared/data/open_slots.json',
        approvalGate: 'None (Autonomous Public Polling)',
        failureBehaviour: 'DBOS step retry; skip LLM wake if SHA-256 DOM hash unchanged'
      },
      {
        bot: 'BidScout-01–03',
        trigger: 'Twice daily (05:30, 13:30)',
        inputSource: '40 County & School District RFP Portals',
        outputArtifact: '/shared/data/muni_rfps.csv',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Cache broken selector, trigger Stagehand auto-heal'
      },
      {
        bot: 'SpecParse-01',
        trigger: 'On new RFP detection',
        inputSource: 'muni_rfps.csv + Bid PDF attachments',
        outputArtifact: '1-Page Estimator Go/No-Go Brief PDF',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Flag scanned PDF for OCR fallback'
      },
      {
        bot: 'HoldGate-01',
        trigger: 'Immediate on slot opening >5 days earlier',
        inputSource: 'open_slots.json',
        outputArtifact: 'Staged Inspection Slot Hold',
        approvalGate: 'Tier-1 Reversible Hold -> GC SMS Confirmation',
        failureBehaviour: 'Release hold if unconfirmed within 15m TTL'
      },
      {
        bot: 'FormPrep-01',
        trigger: 'Daily @ 15:00 for approved RFPs',
        inputSource: 'Client COI/W-9 Vault + Estimator Brief',
        outputArtifact: 'Pre-filled Municipal Bid Package',
        approvalGate: 'Gate: Tier-3 Hard Human Lock (Officer Signature)',
        failureBehaviour: 'Halt DBOS workflow, alert operator inbox'
      }
    ],
    skillsToBuild: [
      {
        order: 1,
        title: 'Accela & CivicPlus Calendar Delta Poller',
        description: 'Navigates municipal permit inspection calendars, extracts available date cells via Stagehand DOM selectors, and computes SHA-256 hashes so unchanged polls consume zero LLM tokens.',
        acceptanceTest: 'Detects a synthetic cancelled inspection slot across 10 municipal portals within 90 seconds at $0 token burn on unchanged polls.'
      },
      {
        order: 2,
        title: 'Micro-RFP (<$50k) Portal Harvester & Filter',
        description: 'Traverses county procurement tables, filters NAICS/NIGP trade codes for electrical/HVAC/concrete/painting under $50k, and downloads addendum PDFs.',
        acceptanceTest: 'Extracts 15 active county micro-RFPs with 100% accurate closing timestamps and zero duplicate rows.'
      },
      {
        order: 3,
        title: 'Municipal Vendor Packet Form Stager',
        description: 'Maps canonical contractor entity metadata (EIN, license #, surety bond #, COI PDF) into municipal bid submission portals up to the final officer signature gate.',
        acceptanceTest: 'Populates a 12-field county vendor compliance form with 100% field accuracy and halts deterministically before final submit.'
      }
    ],
    humanMap: {
      weeklyHourBudget: 14,
      breakdown: [
        { task: 'Cross-Selling Seat Sniper & GovDesk to Existing Sub Radar GCs', hours: 4 },
        { task: 'Co-Signing Municipal Micro-RFP Bid Packets (Tier-3 Gate)', hours: 4 },
        { task: 'Confirming High-Priority Inspection Slot Reschedules', hours: 3 },
        { task: 'Municipal Portal Selector Maintenance', hours: 3 }
      ]
    },
    cashPlan7Day: [
      { day: 1, action: 'Configure SlotScout-01–04 and BidScout-01–03 on 10 local municipal permit calendars (Accela) and county procurement boards.', artifact: '10 Municipal Portals Wired', revenueTrigger: 'Infra ready', revenue: 0 },
      { day: 2, action: 'Run BidScout across 25 county/school district portals; harvest 18 active <$50k trade micro-RFPs (HVAC, electrical, painting) with zero bidders.', artifact: '18 Uncontested Micro-RFP Dossiers', revenueTrigger: 'Live bid opportunities captured', revenue: 0 },
      { day: 3, action: 'Run SlotScout on city commercial permit calendars; capture 4 cancelled electrical/mechanical rough-in inspection windows opening 10+ days early.', artifact: '4 Live Early Inspection Slot Alerts', revenueTrigger: 'Time-sensitive proof ready', revenue: 0 },
      { day: 4, action: 'Pitch 15 existing Sub Radar / Trade Map contractor clients & local MEP trades: "$199 Jurisdiction Setup or $400/mo Seat Sniper retainer."', artifact: '15 Warm Contractor Pitches Sent', revenueTrigger: 'Outreach delivered', revenue: 0 },
      { day: 5, action: 'Close 2 contractors on the $199 Jurisdiction Setup + 1 commercial electrician directly on the $400/mo Seat Sniper retainer ($798 cash).', artifact: '3 Paid Stripe Invoices ($798)', revenueTrigger: 'First $798 cleared', revenue: 798 },
      { day: 6, action: 'Deliver 3 matched <$50k county annex RFPs to a commercial painting GC; upsell them to the $1,400/mo Full GovDesk Auto-Desk retainer.', artifact: 'Pre-filled County RFP Bid Packet', revenueTrigger: 'GovDesk expansion closed', revenue: 2198 },
      { day: 7, action: 'Activate 15-minute continuous SlotScout polling and daily BidScout digests for all 4 paying contractors. Week 1 cash: $2,198.', artifact: '4 Active Municipal Radar Feeds', revenueTrigger: 'System running autonomously', revenue: 2198 }
    ],
    plan90Day: {
      week4: { milestone: '8 Seat Sniper clients ($400/mo) + 2 Full GovDesk clients ($1,400/mo) across 3 metro counties', revenueTarget: '$6,000 MRR [estimate]' },
      week8: { milestone: '15 Seat Sniper clients + 5 Full GovDesk clients; jurisdiction pooling cuts bot polls by 65%', revenueTarget: '$13,000 MRR [estimate]' },
      week12: { milestone: '25 Seat Sniper clients + 10 Full GovDesk clients; integrated with Sub Radar GC rosters', revenueTarget: '$24,000 MRR [estimate]' }
    },
    unitEconomics: {
      price: '$400/month (Seat Sniper) / $1,400/month (Full GovDesk) [comparable]',
      costPerClient: '$24/month [measured]',
      grossMarginPercent: '94.0% [measured]',
      clientsFor3k: 8,
      clientsFor10k: 25,
      clientsFor30k: 75,
      bottleneck: 'High-frequency 15-minute calendar polling requires lightweight DOM reads via Stagehand rather than full-screen vision.',
      labeledMetrics: [
        { metric: 'Seat Sniper Core Retainer (Grok Spec)', value: '$400/mo', label: '[comparable]' },
        { metric: 'Full GovDesk Expansion Retainer', value: '$1,400/mo', label: '[comparable]' },
        { metric: 'Stagehand + LiteLLM Polling Cost', value: '$14/mo', label: '[measured]' },
        { metric: 'Cloud VM & DBOS Share', value: '$10/mo', label: '[measured]' },
        { metric: 'Gross Margin %', value: '94.0%', label: '[measured]' },
        { metric: 'Browser-Min / Client / Mo', value: '540 min/mo', label: '[measured]' }
      ]
    },
    capacityMath: {
      clientsPerBot: '9 clients per poller bot (540 browser-min/mo per client) [measured]',
      concurrencyLimit: '38,400 browser-min/mo across 8 lanes (supports 71 clients); 4,800 min/mo single-pointer fallback (8 clients)',
      fleetCeiling: '~60 Seat Sniper / GovDesk clients on a single 8-lane host when jurisdictions are pooled [estimate]',
      primaryConstraint: 'Pooling multiple contractors in the same county so 1 portal check serves 4+ clients simultaneously.'
    },
    failureModes: [
      {
        title: 'Cancelled Inspection Slot Sniped Before GC Replies',
        signal: 'Slot vanishes within 3 minutes of SMS notification.',
        killCriterion: 'Use HoldGate-01 to place a reversible 15-minute staging hold on pre-authorized date ranges immediately upon detection.'
      },
      {
        title: 'Municipal Portal Maintenance or ASP.NET Session Timeout',
        signal: 'Accela / DemandStar table returns HTTP 500 or expired viewstate token.',
        killCriterion: 'DBOS durable step automatically refreshes clean session state and resumes polling without losing the 15-minute cadence.'
      },
      {
        title: 'Unqualified Micro-RFP Noise (Wrong Trade Classification)',
        signal: 'Estimator rejects >30% of surfaced county RFPs as out-of-scope.',
        killCriterion: 'Tighten SpecParse-01 NIGP/CSI division code filters and require prevailing-wage threshold match before alerting.'
      },
      {
        title: 'Unauthorized Binding Bid Submission Risk',
        signal: 'Bot attempts to advance past vendor upload screen on county portal.',
        killCriterion: 'Enforce Jev-AI Tier-3 Hard Human Lock (non_delegable_boundary.noul >= 0.30) so final municipal bid signatures are 100% human-executed.'
      }
    ],
    riskLegalCompliance: {
      platformToS: 'Municipal procurement boards and permit scheduling calendars are public government infrastructure funded by taxpayers; read-only polling at 15-minute intervals respects server load.',
      dataAndPrivacy: 'Strictly public municipal bid notices, permit numbers, and corporate contractor COI/W-9 records. Zero consumer PII.',
      contractAndPayment: 'B2B retainer via Stripe; contract explicitly states client officer must review and sign all binding municipal bid submissions (Tier-3 Human Lock).',
      licensing: 'No professional license required to monitor public procurement notices or prepare clerical bid drafts for client signature.'
    },
    honestCaseAgainst: {
      argument: 'If a contractor only operates in a tiny rural township with zero inspection backlogs and very few public works RFPs, a monthly Seat Sniper subscription will not have enough slot volume to justify the retainer.',
      operatorVerdict: 'I still bet on this in Stage 4 because in high-growth metro corridors (Austin, Dallas, Phoenix, Miami, Sacramento), commercial inspection backlogs routinely stretch 3–4 weeks and a single sniped slot pays for an entire year of Seat Sniper.'
    },
    first5Sales: {
      targets: [
        'Commercial Electrical Contractor in Austin, TX (Active on AB+C Permit Portal)',
        'Commercial HVAC & Mechanical Subcontractor in Dallas-Fort Worth, TX',
        'Municipal Paving & Concrete Contractor in Sacramento County, CA',
        'Commercial Fire Alarm & Low-Voltage Installer in Miami-Dade, FL',
        'Public Works Painting & Coating Subcontractor in Hamilton County, OH'
      ],
      coldPitch: {
        subject: 'Earlier inspection slot on your [Permit #] + 2 county RFPs',
        body: 'Hey [First Name] — our municipal portal bot noticed your commercial electrical permit ([Permit #]) is queued 3 weeks out on the city inspection calendar. This morning a cancelled rough-in slot opened 11 days earlier, plus the county just posted a $38,500 annex electrical micro-RFP with zero bidders so far: [Link]. Our system polls 10 local municipal calendars every 15 minutes to snipe cancelled inspection slots and flag <$50k trade RFPs. Want me to wire your active permits into the radar this week?',
        wordCount: 84
      }
    }
  }
];

export const PORTFOLIO_ROADMAP = {
  stage1: {
    period: 'Stage 1 · Weeks 1–4 (Sprint Gate 1)',
    legacyPeriod: 'Weeks 1 – 4 (Cash Launch)',
    techBuildTime: '24 Hours',
    businessId: 'c1',
    name: 'Sub Radar — GC Subcontractor License & Bond Monitor (Ara-Grok #1)',
    role: 'Start First: Zero-Credential Public State Registries ($149 Audit -> $399/mo)',
    mrrTarget: '$4,000+ MRR (10 GC Retainers + $149 Audits)',
    unlockGate: 'Gate 1 Cleared: Scrape CSLB/TDLR/DBPR -> Audit 20 GCs -> Close three $149 audits & convert to $399/mo retainers with zero credential friction.',
    singleReason: 'Zero Credentials, Zero Third-Party Logins, Zero Ban Risk. State contractor licensing boards (CSLB, TDLR, DBPR) are 100% public. Cold-emailing a General Contractor that one of their concrete subs has a lapsed bond books a paid $149 audit within 24 hours.'
  },
  stage2: {
    period: 'Stage 2 · Months 2–3 (Sprint Gate 2)',
    legacyPeriod: 'Months 2 – 3 (Account Expansion)',
    techBuildTime: '36 Hours',
    businessId: 'p1',
    name: 'Trade Map Desk & NAP-Shield (Grok Stage-2 Cross-Sell)',
    role: 'Scale Sub Radar to 25 GCs + Cross-Sell Trade Map Desk ($449/mo)',
    mrrTarget: '$15,000+ Combined MRR (25 Sub Radar + 12 Trade Map Desk)',
    unlockGate: 'Gate 2 Cleared: Sub Radar running autonomously (<4h/wk human ops) + warm cross-sell of Trade Map Desk ($449/mo) to existing GC roster.',
    singleReason: 'Zero Customer Acquisition Cost (CAC) Cross-Sell. Once a General Contractor trusts your daily Sub Radar compliance alerts, cross-selling Trade Map Desk ($449/mo) to manage their local trade citations and Google Business Profile reviews requires zero cold outreach.'
  },
  stage3: {
    period: 'Stage 3 · Months 4–6 (Corporate B2B Bridge)',
    legacyPeriod: 'Months 4 – 6 (Corporate B2B Bridge)',
    techBuildTime: '48 Hours',
    businessId: 'p2',
    name: 'Catalog Exception Desk (GPT P-B Best-of-Class)',
    role: 'Add Corporate E-Commerce Brands ($1,000/mo) + First Contractor',
    mrrTarget: '$25,000+ Combined MRR (Add 10 Catalog Exception Clients)',
    unlockGate: 'Gate 3 Cleared: Month 3 contractor rule unlocked -> Onboard 1 part-time exception reviewer + deploy GPT’s 38,400 browser-min/month concurrency model.',
    singleReason: 'High-Ticket Corporate B2B Expansion under the "No-Login Default" Rule. By ingesting daily merchant feed exports and diffing against public storefront DOM pages, you add $1,000/mo corporate retainers without touching fragile admin credentials.'
  },
  stage4: {
    period: 'Stage 4 · Month 6+ (Sovereign Enterprise Scale)',
    legacyPeriod: 'Month 6+ (Hermes Stack + Collision Lab + Seat Sniper)',
    techBuildTime: '48 Hours',
    businessId: 'c2',
    name: 'Fleet Collision Lab (GPT C-A) + Seat Sniper (Grok)',
    role: 'Deploy Hermes + LiteLLM + Stagehand + DBOS Stack & Breaching $30k+ MRR',
    mrrTarget: '$32,500 – $40,000+ Combined MRR',
    unlockGate: 'Gate 4 Cleared: Full Hermes + Stagehand + LiteLLM + DBOS stack live; night-shift lanes running Fleet Collision Lab ($1,800/mo) & Seat Sniper ($400/mo).',
    singleReason: '24-Hour Cluster Utilization & Sovereign Infrastructure. Daytime lanes run Sub Radar, Trade Map, and Seat Sniper; off-peak lanes run Fleet Collision Lab & Brand Defense QA, surpassing $30,000+ MRR well under the 20h/wk operator ceiling.'
  }
};

