import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Terminal,
  ChevronDown,
  ChevronRight,
  Zap,
  DollarSign
} from 'lucide-react';

export const ShortTermScheduleView: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState<1 | 2 | 3 | 4>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1); // Day 1 expanded by default

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const scheduleDays = [
    // WEEK 1
    {
      week: 1,
      day: 1,
      dateStr: 'Monday, Nov 2, 2026',
      title: 'Pre-Flight Verification & California Red Breach Staging',
      hoursBudget: 2.0,
      focus: 'Execute 40-sub multi-state scrape & stage California CSLB Red Stop-Work breach alerts in Jev-AI Tier-2 Gate.',
      isToday: true,
      commands: ['npm test', 'npm run lint', 'npm run audit:sub-radar', 'npm run audit:master-plan'],
      statutoryCitations: ['CA Bus. & Prof. Code § 7071.6', 'CA Bus. & Prof. Code § 7125.2'],
      checklist: [
        'Run test suite (npm test) and TypeScript static check (npm run lint) — verify 7/7 unit tests pass.',
        'Execute BoardScout-01..04 + DiffEngine-01..02 via npm run audit:sub-radar across California CSLB, Texas TDLR, and Florida DBPR.',
        'Review flagged Red Stop-Work breaches: SUB-01 Sierra Structural Concrete LLC ($25k bond lapsed, $420k exposure) and SUB-04 Golden Gate Demolition Corp (WC cancelled, $550k exposure).',
        'Run Master Plan Jev-AI System One audit (npm run audit:master-plan) — verify Stage 1 alert routes to TIER_2_CO_SIGN (P=0.92, Risk=0.16).',
        'Review deliverable $149 40-Sub Liability Audit Packet (PKT-C1-20261101-001) in shared/reports/sub_radar/.'
      ],
      tearSheetCopy: `Subject: URGENT CSLB/TDLR Flag: 2 Suspended Subs & $1.82M Uninsured Exposure on Sierra Pacific Active Sites
To: VP of Field Operations / Risk Manager — Sierra Pacific Commercial Builders Inc.

Marcus —

While running our daily public contractor registry sweep across California CSLB, Texas TDLR, and Florida DBPR this morning (04:12 AM PST), our Sub Radar engine cross-checked the 40 specialty subcontractors listed on your active Sacramento, Austin, Dallas, and Brickell building permits.

We uncovered 6 active compliance breaches that occurred AFTER your initial contract COI sign-off — including 2 immediate Stop-Work / Umbrella-Voiding events:

1. [CRITICAL STOP-WORK · CSLB #CA-1049281] Sierra Structural Concrete LLC (Sacramento Logistic Hub):
   $25,000 Surety Bond (#SUR-88412-CA) lapsed 48h ago. License automatically SUSPENDED under CA Bus. & Prof. Code § 7071.6.
2. [CRITICAL STOP-WORK · CSLB #CA-9184420] Golden Gate Demolition & Abatement Corp (Sacramento Logistic Hub):
   Workers-Comp policy (#CYP-WC-338192) cancelled 48h ago; automatic license suspension imposed under CA B&P Code § 7125.2.
3. [HIGH LIABILITY · TDLR #TACLA88392C] LoneStar Commercial HVAC & Mechanical (Austin Medical Annex):
   Texas Mutual Workers-Comp policy (#TMI-0048291-25) expired yesterday ahead of today's 6-man chiller rigging.
4. [HIGH LIABILITY · TDLR #TECL34918] Gulf Coast High-Voltage Electrical LLC (Dallas Cold-Storage):
   Master Electrical Contractor license transitioned ACTIVE -> EXPIRED overnight on TDLR.

Attached is your complete 40-Subcontractor Forensic Liability Audit Packet (with live state board DOM timestamps and statutory citations).

• To unlock the full 40-Subcontractor Audit & Stop-Work Cure Notices today: $149 flat (Stripe link attached — zero logins or passwords required).
• To keep our 4 BoardScout bots polling all 40 subs every morning at 04:00 AM before your job-site gates open: $399/mo retainer.

Reply "UNLOCK" or click the co-signed release link below and we will dispatch the cure notices to your project superintendents immediately.`
    },
    {
      week: 1,
      day: 2,
      dateStr: 'Tuesday, Nov 3, 2026',
      title: '20-GC Cold Outreach Dispatch & Lead Staging',
      hoursBudget: 2.5,
      focus: 'Dispatch personalized compliance tear-sheets to 20 commercial General Contractors across California, Texas, and Florida.',
      isToday: false,
      commands: ['npm run audit:sub-radar', 'npm run dev'],
      statutoryCitations: ['CA Bus. & Prof. Code § 7071.6', 'Tex. Lab. Code § 406.096'],
      checklist: [
        'Extract 20 commercial General Contractors with active commercial building permits in Sacramento CA, Austin TX, and Dallas TX via municipal permit portals.',
        'Stage individual breach snippets for each GC in Dispatch-01 queue.',
        'Send pre-approved California CSLB Stop-Work cold emails to VPs of Field Operations and Risk Managers.',
        'Log sent pitches in CRM tracking sheet; set auto-reminders for 24h follow-ups.'
      ]
    },
    {
      week: 1,
      day: 3,
      dateStr: 'Wednesday, Nov 4, 2026',
      title: 'Inbound Response Triage & Closing First $149 Audits',
      hoursBudget: 1.5,
      focus: 'Field GC replies, overcome the "we collect annual COIs" objection, and collect first $149 audit fees.',
      isToday: false,
      commands: [],
      statutoryCitations: ['CA Bus. & Prof. Code § 7125.2'],
      checklist: [
        'Monitor inbound inbox; respond to all audit requests within 15 minutes.',
        'Deliver Objection Counter: Explain why annual COIs are static snapshots and do not protect against mid-build policy cancellations.',
        'Send Stripe checkout link ($149 flat, zero login requirements).',
        'Close first 2 paid $149 40-Sub Audits ($298.00 revenue collected via Stripe).',
        'Ingest the 2 paying GCs\' active subcontractor rosters into shared/data/client_rosters/.'
      ]
    },
    {
      week: 1,
      day: 4,
      dateStr: 'Thursday, Nov 5, 2026',
      title: '24h Audit Execution & DBOS Durable Checkpointing',
      hoursBudget: 1.0,
      focus: 'Run BoardScout-01..04 on paying GCs\' rosters; deliver branded 40-sub liability dossiers within 24 hours.',
      isToday: false,
      commands: ['npm run audit:sub-radar'],
      statutoryCitations: ['CA B&P Code § 7071.6', 'DBOS ckpt_client_diff'],
      checklist: [
        'Run BoardScout-01..04 scrapers across client rosters; checkpoint steps in DBOS (ckpt_cslb_scrape).',
        'DiffEngine-01 compiles custom deltas and highlights statutory breaches.',
        'Dossier-01 formats complete branded Audit Packets and superintendent cure notices.',
        'Email final PDF/Markdown audit dossiers to both client Risk Managers within 24 hours.'
      ]
    },
    {
      week: 1,
      day: 5,
      dateStr: 'Friday, Nov 6, 2026',
      title: '15-Minute Audit Debrief & Retainer Seeding',
      hoursBudget: 1.0,
      focus: 'Conduct 15-minute executive walkthrough calls with both audited GCs; seed the $399/mo monitoring retainer.',
      isToday: false,
      commands: [],
      statutoryCitations: ['CA B&P Code § 7071.6', 'Commercial Umbrella Warranty Clauses'],
      checklist: [
        'Host 15-minute Zoom/phone debrief walkthroughs showing highlighted breaches and uninsured umbrella exposures.',
        'Demonstrate how subcontractor surety bonds lapse silently mid-project without notification to the GC.',
        'Seed Retainer Pitch: "For $399/mo, our 4 BoardScout bots monitor your full sub roster every single morning at 04:00 AM before job-site gates open."',
        'Send follow-up email with 1-page retainer agreement and recurring Stripe link.'
      ]
    },
    {
      week: 1,
      day: 6,
      dateStr: 'Saturday & Sunday, Nov 7–8, 2026',
      title: 'Weekend Autonomous Telemetry Review & Operator Rest',
      hoursBudget: 0.5,
      focus: 'Verify 0 DOM selector drift and 100% DBOS step integrity on localhost:3000. Operator rests.',
      isToday: false,
      commands: ['npm test'],
      statutoryCitations: ['Fleet Health Telemetry'],
      checklist: [
        'Check Bot Health Console at http://localhost:3000 — confirm all 10 bots report HEALTHY.',
        'Confirm 0 unhandled DOM selector errors across the last 7 days.',
        'Total Week 1 operator load: 8.5 hours (leaves 11.5 hours headroom under the 20h cap).'
      ]
    },

    // WEEK 2
    {
      week: 2,
      day: 8,
      dateStr: 'Monday, Nov 9, 2026',
      title: 'Retainer Agreement Conversion & Recurring Billing Setup',
      hoursBudget: 2.0,
      focus: 'Convert both audited GCs into recurring $399/mo daily compliance monitoring retainers.',
      isToday: false,
      commands: [],
      statutoryCitations: ['Contractor Master Service Agreement'],
      checklist: [
        'Follow up on 1-page retainer agreements sent Friday.',
        'Sign first 2 General Contractors onto $399/mo recurring retainers. Base MRR reaches $798.00/mo.',
        'Add client sub rosters to the daily 04:00 AM automated BoardScout schedule.',
        'Configure daily 06:00 AM automated email digests to site superintendents.'
      ]
    },
    {
      week: 2,
      day: 9,
      dateStr: 'Tuesday & Wednesday, Nov 10–11, 2026',
      title: 'Texas TDLR & Florida DBPR Outreach Expansion',
      hoursBudget: 3.0,
      focus: 'Dispatch 25 targeted tear-sheets focusing on Texas HVAC/Electrical and Florida roofing/glazing breaches.',
      isToday: false,
      commands: ['npm run audit:sub-radar'],
      statutoryCitations: ['Tex. Occ. Code § 1305.151', 'FL Stat. § 440.107'],
      checklist: [
        'Extract 25 commercial GCs in Dallas, Houston, and Miami.',
        'Dispatch Texas tear-sheets emphasizing TDLR Chapter 1302 and electrical license expirations (SUB-02 & SUB-05).',
        'Dispatch Florida tear-sheets highlighting DFS officer WC exemption expirations (SUB-03 & SUB-06).',
        'Close 2 additional $149 one-time audits ($298 cash collected).'
      ]
    },
    {
      week: 2,
      day: 11,
      dateStr: 'Thursday & Friday, Nov 12–13, 2026',
      title: 'Automated 04:00 AM Morning Diff Reports & 3rd Retainer Close',
      hoursBudget: 2.0,
      focus: 'Deliver automated morning digests to active retainers; convert 3rd GC to $399/mo ongoing retainer.',
      isToday: false,
      commands: ['npm run audit:sub-radar'],
      statutoryCitations: ['DBOS Durable Scheduling'],
      checklist: [
        'Verify automated 04:00 AM sunshine registry polling delivers clean digests to active retainers by 06:00 AM.',
        'Close 3rd ongoing $399/mo GC retainer. Base MRR reaches $1,197.00/mo.',
        'Deliver completed audit packets for newly closed Texas and Florida GCs within 24 hours.'
      ]
    },
    {
      week: 2,
      day: 13,
      dateStr: 'Saturday & Sunday, Nov 14–15, 2026',
      title: 'Gate 1 Mid-Point Health Check & Capacity Review',
      hoursBudget: 1.0,
      focus: 'Run expansion gate simulator; confirm 0 DOM selector errors across 2 consecutive weekly delivery cycles.',
      isToday: false,
      commands: ['npm test'],
      statutoryCitations: ['Gate 1 Expansion Criteria'],
      checklist: [
        'Run evaluateExpansionGate() in calculator.ts.',
        'Verify Active Retainers = 3 | Completed Cycles = 2 (14 Days) | DOM Errors/Day = 0 | Weekly Hours = 9h / 20h Cap.',
        'Total Week 2 operator hours: 10.0 hours (50% headroom under 20h cap).'
      ]
    },

    // WEEKS 3 & 4
    {
      week: 3,
      day: 15,
      dateStr: 'Monday – Sunday, Nov 16–22, 2026',
      title: 'Scale Outbound Pipeline & Retainer Stacking',
      hoursBudget: 11.5,
      focus: 'Maintain bi-weekly outreach cadence (15 tear-sheets every Tue/Thu); sign 3 additional $399/mo retainers.',
      isToday: false,
      commands: ['npm run audit:sub-radar'],
      statutoryCitations: ['CSLB', 'TDLR', 'DBPR'],
      checklist: [
        'Send 30 personalized compliance tear-sheets across California, Texas, and Florida.',
        'Close 3 new $149 forensic audits ($447 entry cash).',
        'Convert 3 audited GCs to $399/mo retainers. Active Retainers reach 6 clients ($2,394/mo MRR).',
        'Verify Stagehand self-healing handles any minor portal DOM attribute changes autonomously.'
      ]
    },
    {
      week: 4,
      day: 22,
      dateStr: 'Monday – Tuesday, Nov 23 – Dec 1, 2026',
      title: 'Gate 1 Formal Clearance & Stage 2 Preparation',
      hoursBudget: 12.0,
      focus: 'Scale to 10 active GC retainers ($3,990 MRR) + entry audits to breach $4,300+ MRR Milestone and clear Gate 1.',
      isToday: false,
      commands: ['npm test', 'npm run audit:master-plan'],
      statutoryCitations: ['Gate 1 Clearance Checklist'],
      checklist: [
        'Close remaining retainer prospects to reach 10 active paying GC retainers ($3,990.00 MRR).',
        'Add ongoing entry audit revenue ($300–$600/mo) to surpass the $4,300+ MRR Milestone.',
        'Conduct formal Gate 1 Clearance Audit: confirm >= 3 retainers (10 achieved), 4 consecutive clean delivery cycles, and ongoing ops load under 4h/week.',
        'December 1, 2026: Unlock Stage 2 (P1: Trade Map Desk) to cross-sell citation defense (+$449/mo) to the exact same 10 GCs!'
      ]
    }
  ];

  const currentWeekDays = scheduleDays.filter((d) => d.week === activeWeek);

  return (
    <div className="space-y-6">
      {/* Top Banner: PDF Instruction Sheet Download & Today Indicator */}
      <div className="bg-slate-900 text-white rounded-lg p-6 shadow-md border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                TODAY: MONDAY, NOV 2, 2026 (DAY 1)
              </span>
              <span className="text-xs text-slate-400 font-mono">Stage 1: C1 Sub Radar Launch</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span>Stage 1 Short-Term Operational Schedule & Execution Field Manual</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Granular day-by-day roadmap executing the <strong>60-Day Trigger Blitz</strong>. Protects General Contractors from statutory Stop-Work breaches and umbrella policy invalidation, scaling from <strong>$0 to $4,300+ MRR</strong> under the strict 20h/week operator cap.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <a
              href="/api/sub-radar/instruction-sheet-pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Written PDF (310 KB)</span>
            </a>
            <a
              href="#day-1"
              onClick={() => {
                setActiveWeek(1);
                setExpandedDay(1);
              }}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Jump to Today (Day 1)</span>
            </a>
          </div>
        </div>

        {/* Quick Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-800 text-xs">
          <div className="bg-slate-800/60 p-2.5 rounded border border-slate-700/60">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Entry Wedge</span>
            <span className="font-bold text-white text-sm font-mono">$149 Flat</span>
            <span className="text-slate-400 block text-[10px]">24h 40-Sub Audit Packet</span>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded border border-slate-700/60">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Core Retainer</span>
            <span className="font-bold text-white text-sm font-mono">$399 / Month</span>
            <span className="text-slate-400 block text-[10px]">04:00 AM Daily Registry Scrape</span>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded border border-slate-700/60">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Gate 1 Target</span>
            <span className="font-bold text-emerald-400 text-sm font-mono">$4,300+ MRR</span>
            <span className="text-slate-400 block text-[10px]">10 GCs + Monthly Audits</span>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded border border-slate-700/60">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Operator Cap</span>
            <span className="font-bold text-amber-400 text-sm font-mono">&lt; 20h / Week</span>
            <span className="text-slate-400 block text-[10px]">Enforced Human Ceiling</span>
          </div>
        </div>
      </div>

      {/* Week Selector Tabs */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveWeek(1)}
            className={`px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
              activeWeek === 1
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Week 1 (Days 1–7): California Red Wedge &amp; Cash Launch ($298)</span>
          </button>
          <button
            onClick={() => setActiveWeek(2)}
            className={`px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
              activeWeek === 2
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Week 2 (Days 8–14): Retainer Conversion &amp; DBOS ($798 MRR)</span>
          </button>
          <button
            onClick={() => setActiveWeek(3)}
            className={`px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
              activeWeek === 3
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Week 3 (Days 15–21): Texas &amp; Florida Expansion ($1,995 MRR)</span>
          </button>
          <button
            onClick={() => setActiveWeek(4)}
            className={`px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
              activeWeek === 4
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Week 4 (Days 22–30): Gate 1 Clearance ($4,300+ MRR)</span>
          </button>
        </div>
      </div>

      {/* Day Cards for Selected Week */}
      <div className="space-y-4">
        {currentWeekDays.map((d) => {
          const isExpanded = expandedDay === d.day;
          return (
            <div
              key={d.day}
              id={`day-${d.day}`}
              className={`bg-white border rounded-lg shadow-xs transition-all ${
                d.isToday ? 'border-2 border-emerald-600 ring-2 ring-emerald-100' : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => setExpandedDay(isExpanded ? null : d.day)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {d.isToday && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                        Active Today
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                      Day {d.day} · {d.dateStr}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>{d.title}</span>
                  </h3>
                  <p className="text-xs text-slate-600">{d.focus}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded text-xs font-mono text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{d.hoursBudget}h Budget</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Card Body (Expanded) */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/30 space-y-4 text-xs">
                  {/* CLI Command Chips */}
                  {d.commands.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-slate-600" />
                        <span>Executable Bot Commands:</span>
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {d.commands.map((cmd) => (
                          <span
                            key={cmd}
                            className="px-2.5 py-1 rounded bg-slate-900 text-slate-100 font-mono text-[11px] font-semibold"
                          >
                            {cmd}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Checklist */}
                  <div className="space-y-2">
                    <span className="font-semibold text-slate-800 block">Step-by-Step Operator Checklist:</span>
                    <div className="space-y-1.5">
                      {d.checklist.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded border border-slate-200/80">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-slate-700 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Statutory Citations */}
                  {d.statutoryCitations && d.statutoryCitations.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="font-semibold text-slate-600">Statutory Grounds:</span>
                      {d.statutoryCitations.map((cite) => (
                        <span
                          key={cite}
                          className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded font-mono text-[11px]"
                        >
                          {cite}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Outreach Tear-Sheet Copy Area (Day 1 & Day 2) */}
                  {d.tearSheetCopy && (
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span>Pre-Approved Cold Outreach Tear-Sheet:</span>
                        </span>
                        <button
                          onClick={() => handleCopy(`tearsheet-${d.day}`, d.tearSheetCopy!)}
                          className="px-2.5 py-1 text-[11px] font-medium bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedId === `tearsheet-${d.day}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 font-semibold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Pitch Text</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-3 bg-slate-900 text-slate-100 rounded text-[11px] font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                        {d.tearSheetCopy}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Expansion Gate Status Widget */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-900 text-sm">Gate 1 Clearance Verification Checklist</span>
          </div>
          <p className="text-xs text-slate-600">
            Must fulfill all 3 criteria before unlocking Stage 2 (P1: Trade Map Desk) on December 1, 2026.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 bg-slate-100 rounded border border-slate-200">
            <span className="text-slate-500">Retainers: </span>
            <span className="font-bold text-slate-900">&ge; 3 Required (10 Target)</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 rounded border border-slate-200">
            <span className="text-slate-500">DOM Errors: </span>
            <span className="font-bold text-emerald-700">0 / Day (14 Days)</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 rounded border border-slate-200">
            <span className="text-slate-500">Weekly Ops: </span>
            <span className="font-bold text-slate-900">&lt; 4h/wk Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
