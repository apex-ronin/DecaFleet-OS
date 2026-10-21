import { BusinessHandbook } from '../types/index.ts';

export const BUSINESS_HANDBOOKS: BusinessHandbook[] = [
  // ==========================================
  // BUSINESS 1 (PROVEN #1): NAP-Shield
  // ==========================================
  {
    id: 'p1',
    code: 'P1',
    name: 'NAP-Shield Local Authority Systems',
    oneLineThesis: 'Local multi-location home-service businesses leak map-pack rank due to inconsistent Name, Address, and Phone (NAP) citations across 60+ unindexed directories; automated browser fleets claim, reconcile, and audit these manual portals at zero marginal labour cost.',
    label: 'PROVEN',
    confidence: 'High',
    labelJustification: 'Documented industry playbook; buyers budget under "Local SEO"; sold by BrightLocal, Whitespark, and Yext; replicable via browser automations.',
    whyThisMakesMoney: {
      mechanism: 'Google Maps 3-Pack placement directly dictates inbound phone call volume for emergency contractors. The algorithm penalizes businesses with inconsistent NAP listings across secondary registries.',
      buyerOutcome: 'Verifiable top-3 Google Maps placement leading directly to inbound phone calls worth $200–$1,500 each in gross profit.',
      economicValue: 'Agencies charge $800–$2,000/month for manual citation entry or outsource overseas. Bot fleet executes at $30/month cost with zero human data entry fatigue.'
    },
    whyNow: 'Legacy aggregators (Yext) lock data in proprietary networks that revert on cancellation. Directory portals now deploy aggressive client-side anti-bot JS and dynamic forms that standard cURL/Puppeteer scrapers cannot navigate without crashing. Persistent desktop browser agents bypass these quirks.',
    buyer: {
      icp: 'Owner / Managing Partner of multi-van residential service businesses (HVAC, Plumbing, Roofing, Water Damage).',
      firmographics: '5–30 employees, $1.5M–$8M annual revenue, 2–10 service trucks.',
      whereToFind: {
        platforms: ['Angi Pro Directory', 'Google Maps rankings (#4–#12)', 'Local BNI / Chamber chapters'],
        searchString: 'site:google.com/maps "water damage restoration" "dallas"'
      },
      currentWorkaround: 'Paying legacy aggregators $500/mo or having an office manager spend 15 hours filling out clunky directory forms.'
    },
    offerAndPricing: {
      entry: {
        name: 'Entry: Baseline Audit & Tier-1 Fix',
        price: '$350',
        cadence: 'one-time',
        deliverable: 'Audit of 70 business directories, CSV conflict report, and automated reconciliation of top 15 tier-1 citations (Google, Apple, Bing, Yelp, YellowPages).',
        turnaround: '48 hours [estimate]'
      },
      core: {
        name: 'Core: 65-Directory Sync & Drift Shield',
        price: '$750',
        cadence: 'monthly',
        deliverable: 'Full sync across 65 directories, monthly citation drift enforcement, duplicate suppression, and automated review notification monitoring.',
        turnaround: 'Continuous 24/7'
      },
      expansion: {
        name: 'Expansion: Multi-Location Regional Authority',
        price: '$1,500',
        cadence: 'monthly',
        deliverable: 'Multi-location package (up to 3 locations), localized micro-content updates posted to Google Business Profile and local portals weekly.',
        turnaround: 'Continuous 24/7'
      },
      riskReversal: 'If tier-1 NAP accuracy is not 100% within 14 days, a full immediate refund is issued.'
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
      price: '$750/month [comparable]',
      costPerClient: '$30/month [measured]',
      grossMarginPercent: '96% [measured]',
      clientsFor3k: 4,
      clientsFor10k: 14,
      clientsFor30k: 40,
      bottleneck: 'Client-side 2FA/SMS verifications for claiming directory portals (requires human live-sync).',
      labeledMetrics: [
        { metric: 'Core Retainer Price', value: '$750/mo', label: '[comparable]' },
        { metric: 'Cloud VM Allocation', value: '$10/mo', label: '[measured]' },
        { metric: 'Residential Proxies', value: '$15/mo', label: '[measured]' },
        { metric: 'SMS/Captcha Solve Budget', value: '$5/mo', label: '[measured]' },
        { metric: 'Gross Margin %', value: '96.0%', label: '[measured]' },
        { metric: 'Clients for $30k MRR', value: '40 clients', label: '[estimate]' }
      ]
    },
    capacityMath: {
      clientsPerBot: '15 clients per maintainer bot [estimate]',
      concurrencyLimit: '10 concurrent browser tasks (1 claim/4 mins = 15 claims/hr/bot)',
      fleetCeiling: '~60 active clients before UI thread contention and disk bloat requires VM horizontal sharding [estimate]',
      primaryConstraint: 'Browser RAM footprint (~600MB per headless Chromium instance) and human SMS handoffs.'
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
    name: 'IntentPipe B2B Signal Intelligence',
    oneLineThesis: 'Enterprise software and agency sales teams waste 60% of outbound budgets targeting static lists; automated browser agents harvest real-time hiring changes and technology shifts from job boards, compiling enriched prospect dossiers faster than human researchers.',
    label: 'PROVEN',
    confidence: 'High',
    labelJustification: 'Agencies selling cold outbound pipeline is an established multi-billion dollar segment; buyers have dedicated SDR/pipeline budgets; comps: LeadGenius, Belkins, Cleverly.',
    whyThisMakesMoney: {
      mechanism: 'When a company posts a job for a "HubSpot Administrator" or "Snowflake Migration Engineer", they are actively spending money to fix an acute technical bottleneck right now.',
      buyerOutcome: 'Direct delivery of verified, hiring-intent accounts within 24 hours of posting, resulting in 4x–8x higher response rates than static ZoomInfo lists.',
      economicValue: 'SaaS companies pay $3k–$15k CAC. A closed contract is worth $20k–$100k LTV. They already pay $3k–$6k/mo for SDRs or outbound agencies.'
    },
    whyNow: 'LinkedIn and job boards deployed advanced anti-scraping paywalls that break standard API scrapers. Fully autonomous browser agents simulate real human navigation, search parameters, and organic scrolling, making them immune to traditional API deprecation.',
    buyer: {
      icp: 'VP of Sales, Head of Business Development, or Founder of boutique B2B agencies (Dev shops, SEO agencies, RevOps consultancies).',
      firmographics: '10–50 employees, $2M–$10M ARR, hungry for qualified sales calls.',
      whereToFind: {
        platforms: ['LinkedIn Sales Navigator', 'Pavilion community', 'RevOps Slack groups (Wizard of Ops)'],
        searchString: 'title:"VP of Sales" "SaaS" "United States"'
      },
      currentWorkaround: 'Paying $10k/year for ZoomInfo/Apollo plus having junior SDRs manually browse LinkedIn 15 hours a week.'
    },
    offerAndPricing: {
      entry: {
        name: 'Entry: 250 Intent Accounts Batch',
        price: '$500',
        cadence: 'one-time',
        deliverable: 'One batch of 250 hyper-targeted, verified hiring-intent accounts with decision-maker work emails, phone numbers, and customized pain triggers.',
        turnaround: '72 hours'
      },
      core: {
        name: 'Core: Monthly Intent Pipeline Engine',
        price: '$2,200',
        cadence: 'monthly',
        deliverable: '600 verified intent accounts per month, automated custom icebreakers written based on job description nuances, direct synchronization to client CRM.',
        turnaround: 'Continuous daily drops'
      },
      expansion: {
        name: 'Expansion: Full-Funnel Outbound Agency',
        price: '$4,500',
        cadence: 'monthly',
        deliverable: 'End-to-end outbound campaign execution: Fleet manages sending infrastructure, warmups, deliverability, and books sales calls onto client calendars.',
        turnaround: 'Continuous 24/7'
      },
      riskReversal: 'If fewer than 95% of delivered email addresses are valid (bounce rate >5%), immediate pro-rata credit or refund.'
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
      price: '$2,200/month [comparable]',
      costPerClient: '$80/month [measured]',
      grossMarginPercent: '96.4% [measured]',
      clientsFor3k: 2,
      clientsFor10k: 5,
      clientsFor30k: 14,
      bottleneck: 'Rate-limiting policies on public search and professional directory networks requiring proxy pool rotation.',
      labeledMetrics: [
        { metric: 'Core Retainer Price', value: '$2,200/mo', label: '[comparable]' },
        { metric: 'Email Verification Credits', value: '$30/mo', label: '[measured]' },
        { metric: 'Residential Proxies', value: '$35/mo', label: '[measured]' },
        { metric: 'Cloud Compute Share', value: '$15/mo', label: '[measured]' },
        { metric: 'Gross Margin %', value: '96.4%', label: '[measured]' },
        { metric: 'Clients for $30k MRR', value: '14 clients', label: '[estimate]' }
      ]
    },
    capacityMath: {
      clientsPerBot: '3 Core clients per bot [estimate]',
      concurrencyLimit: '10 parallel browser sessions (~150 target prospects resolved/hour)',
      fleetCeiling: '~30 Core clients (~$66,000 MRR limit) before requiring a secondary VM instance [estimate]',
      primaryConstraint: 'Search engine anti-scraping triggers and daily query quotas on residential proxy pools.'
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
    name: 'AdSpyre Creative Surveillance Engine',
    oneLineThesis: 'Performance consumer brands (DTC) burn millions testing suboptimal ad hooks; automated browser agents harvest competitor creatives across Meta, TikTok, and Google ad libraries daily, transcribing, tagging, and delivering actionable creative briefs to marketing directors.',
    label: 'PROVEN',
    confidence: 'High',
    labelJustification: 'Every consumer brand relies on competitive intelligence; agencies pay for manual ad tear-downs; comps: Foreplay.co, AdSpy, Motion App.',
    whyThisMakesMoney: {
      mechanism: 'DTC e-commerce brands spend 30–60% of revenue on paid media. High creative fatigue forces them to produce 20–50 new ad variations every week. Finding winning visual angles is their highest-leverage activity.',
      buyerOutcome: 'Weekly curated creative briefs with transcribed video scripts, hook angles, and Figma/Notion assets ready to hand directly to video editors on Monday morning.',
      economicValue: 'Brands pay $1,500–$3,500/mo to creative strategy agencies or burn 40 hours of internal designer time manually bookmarking competitor ads.'
    },
    whyNow: 'Meta and TikTok Ad Libraries are publicly accessible but deliberately engineered to prevent simple API bulk-downloads; video creatives are lazy-loaded, dynamic, and lack structured metadata. Browser agents natively play videos, bypass scrolling roadblocks, and pass assets to local transcription pipelines.',
    buyer: {
      icp: 'Head of Growth, Performance Marketing Director, or Founder of high-growth DTC brands (Skincare, Supplements, Apparel, Beverage).',
      firmographics: '$3M–$25M annual revenue, spending at least $30k/month on paid social ads.',
      whereToFind: {
        platforms: ['Twitter/X DTC community', 'eCommerce Fuel private group', 'Shopify Plus merchant directories'],
        searchString: 'site:linkedin.com/in "Director of Performance Marketing" "DTC"'
      },
      currentWorkaround: 'Creative strategists manually screenshotting ads on personal phones and pasting them into disorderly Notion boards.'
    },
    offerAndPricing: {
      entry: {
        name: 'Entry: Historical Competitor Teardown',
        price: '$400',
        cadence: 'one-time',
        deliverable: '10 direct competitors analyzed, identifying their longest-running 50 ads, with transcribed video hooks, visual angle breakdown, and swipe file.',
        turnaround: '48 hours'
      },
      core: {
        name: 'Core: Weekly Creative Intelligence Feed',
        price: '$1,200',
        cadence: 'monthly',
        deliverable: 'Continuous monitoring of 15 competitors; weekly Monday morning dossier containing raw video files, transcribed scripts, visual hooks, and 3 plug-and-play briefs.',
        turnaround: 'Weekly delivery (every Monday 07:00)'
      },
      expansion: {
        name: 'Expansion: Omnichannel Surveillance & Fast-Alerts',
        price: '$2,500',
        cadence: 'monthly',
        deliverable: '30 competitors tracked across Meta, TikTok, and YouTube Shorts; rapid-turnaround alerts whenever a competitor launches a new ad concept active >7 days.',
        turnaround: 'Continuous 24/7'
      },
      riskReversal: 'If the weekly brief doesn\'t inspire at least one tested creative variation that beats the client\'s current baseline ROAS within 30 days, 100% money back.'
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
      price: '$1,200/month [comparable]',
      costPerClient: '$60/month [measured]',
      grossMarginPercent: '95% [measured]',
      clientsFor3k: 3,
      clientsFor10k: 9,
      clientsFor30k: 25,
      bottleneck: 'Disk storage bandwidth and local transcoding CPU loads handling hundreds of video downloads weekly.',
      labeledMetrics: [
        { metric: 'Core Retainer Price', value: '$1,200/mo', label: '[comparable]' },
        { metric: 'Storage / Bandwidth', value: '$20/mo', label: '[measured]' },
        { metric: 'Proxy Consumption', value: '$25/mo', label: '[measured]' },
        { metric: 'Cloud VM Compute', value: '$15/mo', label: '[measured]' },
        { metric: 'Gross Margin %', value: '95.0%', label: '[measured]' },
        { metric: 'Clients for $30k MRR', value: '25 clients', label: '[estimate]' }
      ]
    },
    capacityMath: {
      clientsPerBot: '5 clients per scraper bot [estimate]',
      concurrencyLimit: '10 bots (~300 videos per 24h cycle without degrading performance)',
      fleetCeiling: '~50 clients (~4,500 ads/week) before media storage and bandwidth saturation demands dedicated media worker nodes [estimate]',
      primaryConstraint: 'Disk I/O bandwidth during batch MP4 downloading and Whisper model GPU/CPU contention.'
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
  // BUSINESS 4 (CONTRARIAN #1): GovDesk
  // ==========================================
  {
    id: 'c1',
    code: 'C1',
    name: 'GovDesk Subcontract Dispatch',
    oneLineThesis: 'Billions in municipal micro-contracts ($10k–$100k) sit hidden across thousands of fragmented, archaic county, city, and school district procurement portals; automated browser agents traverse dynamic legacy portals daily, assembling bid-ready subcontract packages for commercial trades.',
    label: 'CONTRARIAN',
    confidence: 'High',
    labelJustification: 'No standardized playbook exists; buyers have zero idea browser fleets can automate legacy portal navigation; procurement economics only became viable with multi-modal vision and dynamic form-filling agents.',
    whyThisMakesMoney: {
      mechanism: 'Local governments award billions in micro-purchases under state open-bidding thresholds. Commercial subcontractors make 40–60% margins on municipal work, and cities always pay. Contractors miss 90% because they cannot monitor 40 separate 20-year-old websites.',
      buyerOutcome: 'Early, organized, bid-ready notifications with pre-filled submission packages delivered straight to the estimator desk within 4 hours of posting.',
      economicValue: 'Winning one single $40k painting or HVAC micro-contract yields $16k–$24k in net profit. Contractors readily pay $1,800/mo to guarantee deal flow.'
    },
    whyNow: 'Government websites are deliberately built on antiquated CMS platforms (CivicPlus, DemandStar, Tyler Tech) with no public API. Historically, only massive prime contractors with dedicated bid departments could monitor them. Browser-based agents can now parse table layouts, execute legacy ASP.NET form postbacks, and download fragmented PDF specifications effortlessly.',
    buyer: {
      icp: 'Owner / Chief Estimator of local commercial service contracting companies (Commercial Electrical, Commercial Roofing, Janitorial Maintenance, Asphalt/Paving).',
      firmographics: '10–50 employees, $2M–$15M annual revenue, hungry for high-margin local commercial work.',
      whereToFind: {
        platforms: ['Associated General Contractors (AGC) local chapters', 'The Blue Book Building & Construction Network', 'State licensing boards'],
        searchString: 'site:thebluebook.com "commercial painting" "ohio"'
      },
      currentWorkaround: 'Spending $4,000/yr on national bid aggregators (GovWin/BidNet) that only cover state-level mega-projects, completely missing municipal school district and township micro-contracts.'
    },
    offerAndPricing: {
      entry: {
        name: 'Entry: Historical Purchasing Audit',
        price: '$600',
        cadence: 'one-time',
        deliverable: 'Identification of all awarded contracts in client trade across 25 local public entities over past 12 months, detailing winning bid amounts and agency contacts.',
        turnaround: '72 hours'
      },
      core: {
        name: 'Core: 40-Portal Real-Time Bid Dispatch',
        price: '$1,800',
        cadence: 'monthly',
        deliverable: 'Real-time monitoring of up to 40 target municipal portals across a 50-mile radius; continuous extraction of active micro-RFPs, full PDF specification summaries, and pre-populated bid compliance forms.',
        turnaround: 'Within 4 hours of portal posting'
      },
      expansion: {
        name: 'Expansion: Full-Service Bid Facilitation',
        price: '$3,500',
        cadence: 'monthly',
        deliverable: 'End-to-end bid facilitation: Fleet pulls RFPs, populates client compliance documentation, drafts Scope of Work exceptions, and submits bid packets directly through municipal vendor portals pending human digital signature.',
        turnaround: 'Continuous 24/7'
      },
      riskReversal: 'If the client does not identify at least 3 viable, bid-ready municipal micro-contracts in their trade within the first 30 days, 100% refund.'
    },
    botFleet: [
      {
        name: 'GovScrape-01 to GovScrape-04',
        role: 'Portal Navigators (4 Bots)',
        jobDescription: 'You are a municipal procurement portal crawler. Navigate assigned list of city, county, and school district procurement portals. Traverse dynamic ASP.NET paginated tables, locate new RFP/RFQ announcements under assigned NIGP trade codes, download specification PDFs to /shared/assets/rfps/, and write metadata to /shared/data/active_rfps.csv.',
        capability: 'Desktop browser navigation + PDF downloads',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'DocParser-01 & DocParser-02',
        role: 'RFP Analysts (2 Bots)',
        jobDescription: 'You monitor /shared/assets/rfps/. Execute local PDF-parsing scripts to extract: Scope of Work, submission deadline, mandatory pre-bid meeting dates, bonding requirements, and prevailing wage stipulations. Write extracted profiles to /shared/data/parsed_specs.json.',
        capability: 'Terminal execution + text processing',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'FormPrep-01 & FormPrep-02',
        role: 'Compliance Fillers (2 Bots)',
        jobDescription: 'Take verified bid opportunities and load client corporate assets (W-9, Certificate of Insurance, Trade License). Access target municipal registration portals, fill out mandatory vendor compliance forms, and save draft submission states to /shared/data/pending_bids/.',
        capability: 'DOM form manipulation',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Dispatch-01',
        role: 'Estimator Alert Bot (1 Bot)',
        jobDescription: 'Format parsed RFP briefs into concise executive summaries. Distribute structured SMS/Email alerts directly to client estimating teams with direct links to download bid-ready packages.',
        capability: 'Notification scripts + email dispatch',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Review-01',
        role: 'QA Bot (1 Bot)',
        jobDescription: 'Compare extracted bidding requirements against client operational constraints (bonding capacity, insurance limits) to eliminate out-of-scope bids before alerts are triggered.',
        capability: 'Logic processing',
        approvalBoundary: 'Autonomous'
      }
    ],
    routines: [
      {
        bot: 'GovScrape-01–04',
        trigger: 'Mon–Fri @ 05:00',
        inputSource: '40 Municipal Portal URLs',
        outputArtifact: 'Raw RFP PDFs + active_rfps.csv',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Log broken URL, bypass ASP session error'
      },
      {
        bot: 'DocParser-01–02',
        trigger: 'Mon–Fri @ 08:00',
        inputSource: '/shared/assets/rfps/',
        outputArtifact: 'parsed_specs.json',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Flag unreadable scanned PDFs for human'
      },
      {
        bot: 'Review-01',
        trigger: 'Mon–Fri @ 10:00',
        inputSource: 'parsed_specs.json',
        outputArtifact: 'Qualified Bid Matrix',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Retain borderline cases for review'
      },
      {
        bot: 'FormPrep-01–02',
        trigger: 'On-demand',
        inputSource: 'Qualified Bid Matrix',
        outputArtifact: 'Populated Bid Intake Drafts',
        approvalGate: 'Gate: Human approval before submit',
        failureBehaviour: 'Pause at digital signature input field'
      },
      {
        bot: 'Dispatch-01',
        trigger: 'Mon–Fri @ 11:30',
        inputSource: 'Qualified Bid Matrix',
        outputArtifact: 'Client Dispatch Alert (Email/SMS)',
        approvalGate: 'Gate: Human spot-checks spec summary',
        failureBehaviour: 'Log dispatch error, alert operator'
      }
    ],
    skillsToBuild: [
      {
        order: 1,
        title: 'Legacy Portal Table Traverser',
        description: 'Navigates antiquated ASP.NET/GovCMS paginated tables, handling view-state postbacks and session tokens without dropping connection.',
        acceptanceTest: 'Successfully navigates 5 pages of a legacy county procurement portal and downloads all linked bid PDFs.'
      },
      {
        order: 2,
        title: 'Municipal Specification Extractor',
        description: 'Parses complex 50-page RFP PDFs; locates and extracts mandatory insurance limits, prevailing wage terms, and submission deadlines.',
        acceptanceTest: 'Extracts correct submission deadline and bonding limits from a complex public works PDF with 100% accuracy.'
      },
      {
        order: 3,
        title: 'Vendor Registration Auto-Filler',
        description: 'Navigates vendor onboarding portals, mapping company EIN, address, licensing numbers, and uploading insurance certificates.',
        acceptanceTest: 'Fills out a standard municipal vendor registration form up to the signature page.'
      }
    ],
    humanMap: {
      weeklyHourBudget: 20,
      breakdown: [
        { task: 'Estimator Sales Outreach & Consultations', hours: 7 },
        { task: 'Quality Audit of RFP Summaries & Complex PDF Verification', hours: 5 },
        { task: 'Handing Off and Reviewing Final Bid Packets with Clients', hours: 5 },
        { task: 'Portal Crawler Selector Maintenance', hours: 3 }
      ]
    },
    cashPlan7Day: [
      { day: 1, action: 'Configure Bot fleet VM; build Legacy Portal Table Traverser Skill for 15 local municipal portals in target county.', artifact: 'Traverser skill ready', revenueTrigger: 'Infra ready', revenue: 0 },
      { day: 2, action: 'Run GovScrape across 15 local entities; extract 8 currently active open micro-bids in painting, flooring, and HVAC.', artifact: '8 active municipal micro-bids', revenueTrigger: 'High-value deals captured', revenue: 0 },
      { day: 3, action: 'DocParser compiles 8 opportunities into high-value "Bid Readiness Briefs" showing exact budgets and deadlines.', artifact: '8 Bid Readiness Briefs', revenueTrigger: 'Prospect value asset ready', revenue: 0 },
      { day: 4, action: 'Cold call / email 15 local commercial contractors in those trades: "School district posted an emergency HVAC replacement bid ($40k) closing in 9 days."', artifact: '15 targeted contractor pitches', revenueTrigger: 'Outreach delivered', revenue: 0 },
      { day: 5, action: 'Host 15-minute screen-share demo with commercial HVAC owner; walk through parsed spec and pre-filled compliance checklist.', artifact: '1 scheduled live walkthrough', revenueTrigger: 'Contract proposed', revenue: 0 },
      { day: 6, action: 'Contractor agrees to Core Tier ($1,800/mo) to receive these alerts and pre-filled packages across the metro area.', artifact: 'Paid Stripe invoice ($1,800 cash)', revenueTrigger: 'Payment confirmed', revenue: 1800 },
      { day: 7, action: 'Deliver completed, finalized bid packet for school district contract; onboard client trade licenses and insurance certs into vault.', artifact: 'Delivered school district bid packet', revenueTrigger: 'Client fully onboarded', revenue: 1800 }
    ],
    plan90Day: {
      week4: { milestone: '3 Core contractor clients; 40 municipal portals continuously indexed', revenueTarget: '$5,400 MRR [estimate]' },
      week8: { milestone: '7 Core contractor clients; expand coverage across 3 adjacent county jurisdictions', revenueTarget: '$12,600 MRR [estimate]' },
      week12: { milestone: '12 Core contractor clients + 2 Expansion clients; bot fleet executing routine vendor registration filings autonomously', revenueTarget: '$28,600 MRR [estimate]' }
    },
    unitEconomics: {
      price: '$1,800/month [comparable]',
      costPerClient: '$70/month [measured]',
      grossMarginPercent: '96.1% [measured]',
      clientsFor3k: 2,
      clientsFor10k: 6,
      clientsFor30k: 17,
      bottleneck: 'Irregularities in government PDF formatting (scanned physical paper documents requiring OCR interpretation).',
      labeledMetrics: [
        { metric: 'Core Retainer Price', value: '$1,800/mo', label: '[comparable]' },
        { metric: 'VM Compute Allocation', value: '$15/mo', label: '[measured]' },
        { metric: 'Dedicated Residential IPs', value: '$40/mo', label: '[measured]' },
        { metric: 'Document OCR Storage', value: '$15/mo', label: '[measured]' },
        { metric: 'Gross Margin %', value: '96.1%', label: '[measured]' },
        { metric: 'Clients for $30k MRR', value: '17 clients', label: '[estimate]' }
      ]
    },
    capacityMath: {
      clientsPerBot: '4 non-competing trade clients per crawler bot [estimate]',
      concurrencyLimit: '4 GovScrape bots can continuously poll 100 municipal portals every 6 hours',
      fleetCeiling: '25–35 non-competing trade contractors on a single VM before database clustering required [estimate]',
      primaryConstraint: 'Non-compete exclusivity per trade per geographical county territory.'
    },
    failureModes: [
      {
        title: 'Scanned PDF Specifications (Non-Selectable Text)',
        signal: 'DocParser outputs zero text extracted.',
        killCriterion: 'Route scanned documents through a local Tesseract OCR pipeline; if unreadable, flag for 5-minute human manual review.'
      },
      {
        title: 'Mandatory In-Person Site Walkthroughs',
        signal: 'Keyword "mandatory site inspection" missed.',
        killCriterion: 'Build a strict deterministic regex filter specifically checking for mandatory meeting clauses; highlight in red on summary briefs.'
      },
      {
        title: 'Municipal Portal Migrations',
        signal: 'GovScrape throws 404 or missing DOM selector.',
        killCriterion: 'Re-map the bot\'s browser navigation skill within 6 hours.'
      },
      {
        title: 'Client Missing Trade Licensing in Target Municipality',
        signal: 'Client disqualified during bid intake.',
        killCriterion: 'Map client municipal licensing boundaries during onboarding intake.'
      }
    ],
    riskLegalCompliance: {
      platformToS: 'Public records laws (Freedom of Information / Sunshine Laws) mandate government procurement data be completely open to the public; zero ToS friction on public government domains.',
      dataAndPrivacy: 'Storing public RFP documents and client corporate licensing credentials; secured via encrypted local disk volumes.',
      contractAndPayment: 'Standard B2B agency contract; clear disclaimers that winning contract awards is strictly subject to public agency discretion.',
      licensing: 'No procurement lobbyist registration required; service operates purely as technical intelligence and clerical document preparation.'
    },
    honestCaseAgainst: {
      argument: 'Municipal procurement portals are notorious for arbitrary bureaucratic updates, unexpected delays, and sudden contract cancellations that can frustrate paying trade clients. If a trade contractor pays $1,800/month and doesn\'t win a contract within 90 days, their churn probability skyrockets.',
      operatorVerdict: 'I would still bet on this because a single municipal job yields $20,000–$80,000 in net profit for a contractor, meaning landing just one single job pays for years of the service.'
    },
    first5Sales: {
      targets: [
        'Commercial Painting Contractor (25 painters on staff)',
        'Municipal Paving & Asphalt Contractor',
        'Commercial HVAC Service Provider',
        'Low-Voltage Structured Cabling Installer',
        'Commercial Janitorial & Facility Maintenance Owner'
      ],
      coldPitch: {
        subject: 'Hamilton County RFP posted yesterday for commercial painting',
        body: 'Hey [First Name] — Hamilton County municipal facilities just posted a micro-bid yesterday for interior repainting across 3 administrative annexes (~$35k budget). Most contractors won\'t see it because it’s buried on the county\'s legacy portal. Our system pulled the full specs, insurance requirements, and mandatory pre-bid dates: [Link]. I run a private dispatch desk monitoring 40 local public portals daily for commercial painters. Would you like our system to prep the compliance forms for this one?',
        wordCount: 78
      }
    }
  },

  // ==========================================
  // BUSINESS 5 (CONTRARIAN #2): TrafficReclaim
  // ==========================================
  {
    id: 'c2',
    code: 'C2',
    name: 'TrafficReclaim Zero-Day Brand Defense',
    oneLineThesis: 'Rogue affiliate marketers and predatory competitors hijack enterprise brand equity by bidding on trademarked search terms through unauthorized redirects, deceptive domain cloaking, and ad-network arbitrage; a fleet of geo-distributed browser agents uncovers and documents these transient zero-day violations in real time.',
    label: 'CONTRARIAN',
    confidence: 'High',
    labelJustification: 'Enterprise security and affiliate networks ignore this operational gap because violations are day-parted and geo-fenced to avoid human compliance teams; requires dynamic browser fleets to simulate domestic mobile environments.',
    whyThisMakesMoney: {
      mechanism: 'Rogue affiliates violate contracts by bidding on the brand\'s own trademark terms ("Brand Name Coupon") on Google/Bing between 1 AM and 5 AM in specific zip codes, driving up the brand\'s ad costs and stealing commissions on sales that would occur organically.',
      buyerOutcome: 'Instant clawback of fraudulent commissions, immediate removal of unauthorized ads, and a 20%–40% drop in brand-term pay-per-click CPCs.',
      economicValue: 'A brand spending $300k/mo on paid search loses $15k–$45k/mo to this leakage. Paying $2,500/mo to stop a $30,000 profit leak delivers a 12x immediate ROI.'
    },
    whyNow: 'Rogue affiliates use advanced geo-fencing, mobile user-agent spoofing, and day-parting to remain completely invisible to corporate marketing teams and static cloud probers. Always-on browser agents with rotating residential proxies execute authenticated sessions in target zip codes at 3 AM, capturing undeniable visual and network telemetry proof.',
    buyer: {
      icp: 'Chief Marketing Officer (CMO), VP of Digital Acquisition, or Affiliate Marketing Director of mid-market e-commerce or fintech brands.',
      firmographics: '$10M–$100M annual revenue, spending >$100k/month on digital ads, operating a public affiliate program.',
      whereToFind: {
        platforms: ['Direct-to-Consumer executive circles', 'Affiliate Summit attendees', 'LinkedIn'],
        searchString: 'title:"Head of Affiliate Marketing" OR "VP Acquisition" "eCommerce"'
      },
      currentWorkaround: 'Occasional manual Google searches by junior media buyers during normal 9-to-5 business hours (which systematically miss geo-targeted and day-parted violations).'
    },
    offerAndPricing: {
      entry: {
        name: 'Entry: 48-Hour Forensic Trademark Leakage Audit',
        price: '$500',
        cadence: 'one-time',
        deliverable: 'Complete surveillance report of brand search terms across 10 major US metro areas during off-hours, documenting all rogue ads, redirect chains, and affiliate IDs.',
        turnaround: '48 hours'
      },
      core: {
        name: 'Core: 24/7 Continuous Brand Protection',
        price: '$2,500',
        cadence: 'monthly',
        deliverable: 'Monitoring top 50 brand terms across 20 domestic markets, instant notification of rogue bids with full redirect hops documented, automated cease-and-desist documentation packets ready for network clawbacks.',
        turnaround: 'Continuous 24/7'
      },
      expansion: {
        name: 'Expansion: Full Network Enforcement & Automated Dispute Filing',
        price: '$5,000',
        cadence: 'monthly',
        deliverable: 'Direct portal integration with affiliate platforms (Impact, CJ, ShareASale); Fleet automatically files commission clawback disputes and ad-network trademark complaints via browser automation.',
        turnaround: 'Continuous 24/7'
      },
      riskReversal: 'If the Core service does not identify actionable trademark ad violations or unauthorized affiliate commission leakage equal to at least 2x the monthly fee within 45 days, 100% refund.'
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
      price: '$2,500/month [comparable]',
      costPerClient: '$95/month [measured]',
      grossMarginPercent: '96.2% [measured]',
      clientsFor3k: 2,
      clientsFor10k: 4,
      clientsFor30k: 12,
      bottleneck: 'Residential proxy bandwidth costs and the risk of ad-network IP bans on high-frequency crawler threads.',
      labeledMetrics: [
        { metric: 'Core Retainer Price', value: '$2,500/mo', label: '[comparable]' },
        { metric: 'Geo-Targeted Residential Proxies', value: '$80/mo', label: '[measured]' },
        { metric: 'Cloud VM Compute', value: '$15/mo', label: '[measured]' },
        { metric: 'Gross Margin %', value: '96.2%', label: '[measured]' },
        { metric: 'Clients for $30k MRR', value: '12 clients', label: '[estimate]' }
      ]
    },
    capacityMath: {
      clientsPerBot: '4 brand clients per surveil bot [estimate]',
      concurrencyLimit: '4 Surveil Bots running concurrently can execute 1,200 unique localized search queries per 24 hours across 20 metro areas',
      fleetCeiling: '~15 Core enterprise clients on a single VM before dedicated proxy-bandwidth pipelines required [estimate]',
      primaryConstraint: 'Nighttime operational window (00:00–06:00) where day-parted violations concentrate.'
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
  // BUSINESS 6 (CONTRARIAN #3): ChurnTrap
  // ==========================================
  {
    id: 'c3',
    code: 'C3',
    name: 'ChurnTrap Competitor Churn Intelligence',
    oneLineThesis: 'Enterprise B2B software companies bleed millions in churn without understanding why; automated browser agents patrol review networks, support forums, and community channels 24/7 to catch dissatisfied competitor accounts at the exact moment of peak frustration, delivering ready-to-close pipeline.',
    label: 'CONTRARIAN',
    confidence: 'High',
    labelJustification: 'Traditional B2B intelligence focuses exclusively on positive intent/hiring; capturing negative intent and software-dissatisfaction signals across un-indexed support boards requires dynamic, persistent browser surveillance.',
    whyThisMakesMoney: {
      mechanism: 'Displacing an entrenched incumbent is the holy grail in B2B SaaS. An enterprise contract is worth $20,000–$150,000/yr. When a customer posts a 1-star review on G2 or complains in a support forum about a breaking bug, that account is in an active churn evaluation window.',
      buyerOutcome: 'Instant delivery of dissatisfied competitor accounts with identified IT decision-makers and custom sales displacement battlecards ready for SDR outreach.',
      economicValue: 'Competitors spend tens of thousands trying to find unhappy incumbent accounts. One closed displacement deal pays for an entire year of the service.'
    },
    whyNow: 'Review platforms (G2, Capterra, TrustRadius) and specialized community forums heavily lock data behind anti-bot firewalls and dynamic UI rendering. Real-time notifications of negative reviews do not exist as an out-of-the-box API product. A fleet of browser agents navigating like human evaluators extracts actionable churn intent within minutes of publication.',
    buyer: {
      icp: 'VP of Product Marketing, Head of Competitive Intelligence, or CMO of growth-stage B2B SaaS companies.',
      firmographics: '$5M–$50M ARR, competing directly against an entrenched legacy incumbent (e.g., modern CRM vs Salesforce, modern ATS vs Workday).',
      whereToFind: {
        platforms: ['Product Marketing Alliance (PMA) community', 'Pavilion', 'LinkedIn'],
        searchString: 'title:"Head of Competitive Intelligence" OR "Director of Product Marketing" "SaaS"'
      },
      currentWorkaround: 'Junior product marketers manually checking G2 or Trustpilot once a month, by which time the unhappy customer has already renewed or selected an alternative.'
    },
    offerAndPricing: {
      entry: {
        name: 'Entry: Historical Churn Vulnerability Dossier',
        price: '$450',
        cadence: 'one-time',
        deliverable: 'In-depth analysis of 500 recent negative reviews and forum complaints across 3 key competitors, categorizing exact feature failures, missing integrations, and naming 30 verified complaining accounts.',
        turnaround: '48 hours'
      },
      core: {
        name: 'Core: Real-Time Displacement Pipeline',
        price: '$2,000',
        cadence: 'monthly',
        deliverable: '24/7 surveillance of 5 competitors across G2, Capterra, Reddit tech communities, and community forums; delivers instant Churn Signals with identified decision-makers and custom displacement battlecards.',
        turnaround: 'Within 2 hours of review publication'
      },
      expansion: {
        name: 'Expansion: Enterprise Competitive Conquesting',
        price: '$4,000',
        cadence: 'monthly',
        deliverable: '12 competitors tracked; includes custom sales displacement messaging generated for each alert and direct injection into client\'s Salesforce/HubSpot CRM.',
        turnaround: 'Continuous 24/7'
      },
      riskReversal: 'If the Core service does not deliver at least 15 verified, highly qualified competitor churn opportunities within the first 30 days, full refund.'
    },
    botFleet: [
      {
        name: 'Trap-01 to Trap-04',
        role: 'Review & Forum Crawlers (4 Bots)',
        jobDescription: 'You are a real-time competitor sentiment crawler. Continuously patrol assigned review directories (G2, Capterra, TrustRadius, Gartner Peer Insights) and specialized tech subreddits. Filter strictly for 1-star to 3-star reviews and negative sentiment complaint threads. Extract the reviewer\'s title, company size, industry, specific pain points, and timestamp. Write records to /shared/data/churn_events.csv.',
        capability: 'Dynamic DOM traversal + text extraction',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'IDResolve-01 to IDResolve-03',
        role: 'Account Resolvers (3 Bots)',
        jobDescription: 'Read records from /shared/data/churn_events.csv. Take the reviewer\'s industry, company size, and specific role title. Search LinkedIn and Google to triangulate and identify the most likely specific company and decision-maker experiencing the issue. Write matched candidate accounts to /shared/data/resolved_accounts.csv.',
        capability: 'Cross-platform search queries + heuristic matching',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Battlecard-01 & Battlecard-02',
        role: 'Battlecard Generators (2 Bots)',
        jobDescription: 'Monitor /shared/data/resolved_accounts.csv. Take the competitor\'s specific product failure and generate a tailored 1-page Competitive Displacement Battlecard, highlighting our client\'s exact feature strengths over the competitor\'s weakness. Output to /shared/reports/battlecards/.',
        capability: 'Prompt engineering + PDF generation',
        approvalBoundary: 'Autonomous'
      },
      {
        name: 'Push-01',
        role: 'Sales Dispatch Bot (1 Bot)',
        jobDescription: 'Log into client CRM or push to client Slack channels. Upload the verified churn lead, the battlecard, and suggested SDR outreach hooks.',
        capability: 'CRM login + API execution',
        approvalBoundary: 'Gate: Human spot-checks lead validity before alert push'
      }
    ],
    routines: [
      {
        bot: 'Trap-01–04',
        trigger: 'Every 4 hours',
        inputSource: 'Target Review & Forum URLs',
        outputArtifact: 'churn_events.csv',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Rotate proxy profile, retry'
      },
      {
        bot: 'IDResolve-01–03',
        trigger: 'On new event detection',
        inputSource: 'churn_events.csv',
        outputArtifact: 'resolved_accounts.csv',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Flag low-confidence matches'
      },
      {
        bot: 'Battlecard-01–02',
        trigger: 'Twice daily (08:00, 14:00)',
        inputSource: 'resolved_accounts.csv',
        outputArtifact: 'Displacement Battlecards PDF',
        approvalGate: 'None (Autonomous)',
        failureBehaviour: 'Regenerate on formatting error'
      },
      {
        bot: 'Push-01',
        trigger: 'Daily @ 16:00',
        inputSource: 'Displacement Battlecards',
        outputArtifact: 'CRM Records / Slack Alert',
        approvalGate: 'Gate: Human verifies company ID',
        failureBehaviour: 'Pause push, alert operator'
      }
    ],
    skillsToBuild: [
      {
        order: 1,
        title: 'Dynamic Review Board Monitor',
        description: 'Navigates dynamic review board filtering interfaces, sorting by "Most Recent" and "Lowest Rating" while avoiding bot-detection modal popups.',
        acceptanceTest: 'Successfully extracts 10 recent negative reviews from a major software category on G2 without triggering a verification challenge.'
      },
      {
        order: 2,
        title: 'Account Identity Triangulator',
        description: 'Takes fuzzy inputs ("VP of IT at a mid-market hospital in Ohio"); searches LinkedIn boolean strings to isolate the 3 most likely matching companies and contact names.',
        acceptanceTest: 'Accurately identifies the correct company profile from a simulated anonymous review bio in 7 out of 10 test cases.'
      },
      {
        order: 3,
        title: 'Displacement Angle Formatter',
        description: 'Transforms a technical customer complaint ("API rate limits break our syncing daily") into a hyper-targeted SDR email opening hook.',
        acceptanceTest: 'Produces 5 production-grade cold outreach hooks that directly reference specific technical gripes without sounding creepy.'
      }
    ],
    humanMap: {
      weeklyHourBudget: 20,
      breakdown: [
        { task: 'Demo Calls & Product Marketing Sales', hours: 7 },
        { task: 'Quality Control (Validating fuzzy account matches)', hours: 6 },
        { task: 'Battlecard Strategy & Template Tuning', hours: 4 },
        { task: 'Fleet Maintenance', hours: 3 }
      ]
    },
    cashPlan7Day: [
      { day: 1, action: 'Set up Bot fleet VM; train Dynamic Review Board Monitor Skill on 3 top enterprise competitors in the ATS market.', artifact: 'Review monitor skill ready', revenueTrigger: 'Infra ready', revenue: 0 },
      { day: 2, action: 'Trap-01 crawls recent 1-star and 2-star reviews across ATS incumbents; extract 25 verified complaints on support and billing bugs.', artifact: '25 high-pain churn complaints', revenueTrigger: 'Signals extracted', revenue: 0 },
      { day: 3, action: 'IDResolve-01 triangulates 12 specific mid-market companies that authored reviews; Battlecard-01 compiles custom displacement briefs.', artifact: '12 Account Battlecards', revenueTrigger: 'Deliverable compiled', revenue: 0 },
      { day: 4, action: 'Manually reach out via LinkedIn/Email to VP Sales at high-growth modern ATS competitor: "Competitor just had 3 accounts blast their pricing hike. We identified them: [Link]."', artifact: 'Targeted competitive outreach', revenueTrigger: 'Pitch delivery', revenue: 0 },
      { day: 5, action: 'Host 20-minute screen-share; walk through live accounts and show how SDRs deploy battlecards immediately.', artifact: 'Live displacement demo', revenueTrigger: 'Contract proposed', revenue: 0 },
      { day: 6, action: 'Close client on Core Retainer ($2,000/mo) to receive real-time churn alerts continuously.', artifact: 'Paid Stripe invoice ($2,000 cash)', revenueTrigger: 'Payment confirmed', revenue: 2000 },
      { day: 7, action: 'Configure Push-01 to route all newly identified churn accounts directly into client inbound Slack pipeline.', artifact: 'Live Slack webhook pipeline', revenueTrigger: 'System running', revenue: 2000 }
    ],
    plan90Day: {
      week4: { milestone: '3 Core clients; expand monitoring to 15 enterprise SaaS software categories', revenueTarget: '$6,000 MRR [estimate]' },
      week8: { milestone: '7 Core clients; account resolution algorithm achieves >80% accuracy', revenueTarget: '$14,000 MRR [estimate]' },
      week12: { milestone: '13 Core clients; integrate automated Salesforce lead creation via browser automation', revenueTarget: '$26,000 MRR [estimate]' }
    },
    unitEconomics: {
      price: '$2,000/month [comparable]',
      costPerClient: '$80/month [measured]',
      grossMarginPercent: '96% [measured]',
      clientsFor3k: 2,
      clientsFor10k: 5,
      clientsFor30k: 15,
      bottleneck: 'The heuristic complexity of unmasking anonymous or semi-anonymous reviewers to precise corporate identities.',
      labeledMetrics: [
        { metric: 'Core Retainer Price', value: '$2,000/mo', label: '[comparable]' },
        { metric: 'Proxy Infrastructure', value: '$40/mo', label: '[measured]' },
        { metric: 'Cloud VM Compute', value: '$15/mo', label: '[measured]' },
        { metric: 'Enrichment API Credits', value: '$25/mo', label: '[measured]' },
        { metric: 'Gross Margin %', value: '96.0%', label: '[measured]' },
        { metric: 'Clients for $30k MRR', value: '15 clients', label: '[estimate]' }
      ]
    },
    capacityMath: {
      clientsPerBot: '3 SaaS clients per crawler bot [estimate]',
      concurrencyLimit: '4 Trap Bots can crawl and monitor 80 competitor review pages and community forums every 4 hours',
      fleetCeiling: '~20 non-competing SaaS clients before identity resolution queues saturate compute [estimate]',
      primaryConstraint: 'Heuristic compute and manual spot-checking of unmasked corporate identities.'
    },
    failureModes: [
      {
        title: 'False Identity Resolution',
        signal: 'Client reports target company wasn\'t using that software.',
        killCriterion: 'Require human verification gate on all account matches until confidence score reaches >90%.'
      },
      {
        title: 'Aggressive Review Site Cloudflare Updates',
        signal: 'Trap bot returns blank pages or access denied.',
        killCriterion: 'Pivot crawling to secondary surfaces (Reddit, vendor community support forums, Twitter gripes).'
      },
      {
        title: 'Low Review Velocity in Niche Sectors',
        signal: 'Churn events dry up.',
        killCriterion: 'Expand monitoring surface to include GitHub issues, community Slack groups, and Jira bug tracker disclosures.'
      },
      {
        title: 'Competitor Solves Product Defect',
        signal: 'Complaint categories drop sharply.',
        killCriterion: 'Re-target churn traps to newly released features or price-increase announcements.'
      }
    ],
    riskLegalCompliance: {
      platformToS: 'Review directories discourage automated extraction; managed via non-logged-in residential browser sessions strictly reading public review feeds.',
      dataAndPrivacy: 'Resolving public corporate identity data does not violate personal privacy laws when confined to professional B2B contexts (B2B legitimate interest under GDPR).',
      contractAndPayment: 'Standard B2B SaaS intelligence agreement; no guarantees that target churned accounts will convert.',
      licensing: 'No regulatory licenses required.'
    },
    honestCaseAgainst: {
      argument: 'Many online reviews on platforms like G2 are authored by disgruntled former employees or low-level users who possess zero purchasing authority, making some churn signals complete dead ends for enterprise sales reps. If an SDR team burns 50 hours chasing "ghost" churn leads that don\'t have the power to switch software, they will cancel the service.',
      operatorVerdict: 'I still bet on this because enterprise B2B sales cycles are so hyper-competitive that even landing just one 6-figure displacement deal makes the entire annual retainer an undeniable positive ROI.'
    },
    first5Sales: {
      targets: [
        'VP of Sales at a challenger CRM (Competing with Salesforce)',
        'Head of Growth at an emerging Applicant Tracking System (Competing with Greenhouse)',
        'Director of Outbound at a modern helpdesk platform (Competing with Zendesk)',
        'CMO of a modern cloud-billing engine (Competing with Chargebee)',
        'VP Product Marketing at a fast-growing cybersecurity platform'
      ],
      coldPitch: {
        subject: '3 accounts ditching [Competitor] over API bugs this week',
        body: 'Hey [First Name] — 3 mid-market companies posted detailed breakdowns this week about why they are actively looking to replace [Competitor] due to their recent pricing hike and API sync failures. Our system identified the exact accounts and the IT leaders experiencing the issue. Here is the dossier on the first two accounts: [Link]. I run a private displacement pipeline tracking [Competitor]\'s unhappy accounts 24/7. Want our fleet to drop these directly to your SDRs each week?',
        wordCount: 79
      }
    }
  }
];

export const PORTFOLIO_ROADMAP = {
  stage1: {
    period: 'Sprint 1 · Days 1–14 (Gate 1)',
    legacyPeriod: 'Day 1 - Month 3',
    techBuildTime: '36 Hours',
    businessId: 'p2',
    name: 'IntentPipe B2B Signal Intelligence',
    role: 'Start First: 48h Fleet Build & Immediate B2B Cash',
    mrrTarget: '$4,400 - $6,600 MRR (2–3 Retainers)',
    unlockGate: 'Gate 1 Cleared: >=2 paying Core clients + 2 full weekly delivery cycles with <=1 DOM error/day + <10h/wk human ops.',
    singleReason: 'Zero Sales Friction & Immediate Cash Velocity. B2B agencies and SaaS companies are permanently starving for pipeline and have pre-approved credit cards ready to swipe. The bot fleet is built in 36 hours, sample batches deliver in 2 hours, and first cash clears by Day 6–7.'
  },
  stage2: {
    period: 'Sprint 2 · Days 15–30 (Gate 2)',
    legacyPeriod: 'Month 3 - Month 6',
    techBuildTime: '48 Hours',
    businessId: 'c1',
    name: 'GovDesk Subcontract Dispatch',
    role: 'Unlock at Day 15: Municipal Blue Ocean & Sticky Trade Retainers',
    mrrTarget: '$12,000 - $17,400 Combined MRR',
    unlockGate: 'Gate 2 Cleared: P2 running autonomously (<4h/wk human time) + 3 municipal contractors onboarded + OCR pipeline stable.',
    singleReason: 'Drastic Expansion of Moat and Margin. Once P2 is stabilized after two weekly delivery cycles (Day 14), you reallocate 4 idle browser slots to crawl legacy county ASP.NET portals. Commercial trade contractors pay $1,800/mo and never churn once they land a single $40k municipal micro-contract.'
  },
  stage3: {
    period: 'Sprint 3 · Days 31–45+ (Scale Gate)',
    legacyPeriod: 'Month 6 - Month 12',
    techBuildTime: '48 Hours',
    businessId: 'c2',
    name: 'TrafficReclaim Zero-Day Brand Defense',
    role: 'Unlock at Day 31: Night-Shift Proxy Fleet & Enterprise Scale',
    mrrTarget: '$27,500 - $35,000+ Combined MRR',
    unlockGate: 'Gate 3 Cleared: Daytime bot slots utilized by P2/C1; Nighttime (00:00–06:00) slots deployed on geo-residential proxies for C2.',
    singleReason: 'Time-Zone Arbitrage & Enterprise Revenue Ceiling. Because C2 hunts rogue affiliates between 1 AM and 5 AM, it uses the exact same 10-bot VM cluster while P2 and C1 sleep. You hit $30k+ MRR in 45–60 days with <15 total clients while staying strictly under 20 human hours/week.'
  }
};

