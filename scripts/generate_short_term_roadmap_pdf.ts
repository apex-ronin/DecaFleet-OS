/**
 * DecaFleet-OS: Short-Term Roadmap & PDF Step-by-Step Instruction Sheet Generator
 * 
 * Generates:
 *  1. docs/DecaFleet_Stage1_ShortTerm_Instruction_Sheet.html
 *  2. docs/DecaFleet_Stage1_ShortTerm_Instruction_Sheet.pdf
 *  3. shared/reports/sub_radar/DecaFleet_Stage1_ShortTerm_Instruction_Sheet.pdf
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DecaFleet-OS Stage 1 (Sub Radar) Short-Term Operator Instruction Sheet</title>
  <style>
    @page {
      size: letter;
      margin: 14mm 14mm 14mm 14mm;
      @bottom-right {
        content: counter(page) " of " counter(pages);
      }
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.45;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }
    .page {
      page-break-after: always;
      position: relative;
    }
    .page:last-child {
      page-break-after: avoid;
    }
    .header-bar {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 8px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .brand {
      font-size: 18pt;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #0f172a;
    }
    .brand-tag {
      font-size: 8pt;
      text-transform: uppercase;
      font-weight: 700;
      color: #047857;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
    .doc-meta {
      text-align: right;
      font-size: 8.5pt;
      color: #475569;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    }
    h1 {
      font-size: 16pt;
      font-weight: 800;
      margin: 0 0 4px 0;
      color: #0f172a;
      letter-spacing: -0.3px;
    }
    h2 {
      font-size: 12.5pt;
      font-weight: 700;
      color: #0f172a;
      margin: 14px 0 6px 0;
      padding-bottom: 4px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    h3 {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1e293b;
      margin: 10px 0 4px 0;
    }
    p {
      margin: 0 0 8px 0;
      color: #334155;
    }
    .badge {
      display: inline-block;
      padding: 2px 6px;
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      border-radius: 4px;
      font-family: monospace;
    }
    .badge-red { background: #fee2e2; color: #991b1b; border: 1px solid #f87171; }
    .badge-orange { background: #ffedd5; color: #9a3412; border: 1px solid #fb923c; }
    .badge-green { background: #dcfce7; color: #166534; border: 1px solid #4ade80; }
    .badge-blue { background: #dbeafe; color: #1e40af; border: 1px solid #60a5fa; }
    .badge-slate { background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; }
    
    .callout {
      background: #f8fafc;
      border-left: 4px solid #0f172a;
      padding: 10px 12px;
      margin: 10px 0;
      border-radius: 0 6px 6px 0;
      font-size: 9.5pt;
    }
    .callout-alert {
      background: #fef2f2;
      border-left-color: #dc2626;
      color: #991b1b;
    }
    .callout-success {
      background: #f0fdf4;
      border-left-color: #16a34a;
      color: #166534;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0 12px 0;
      font-size: 9pt;
    }
    th {
      background: #f1f5f9;
      color: #0f172a;
      text-align: left;
      padding: 6px 8px;
      font-weight: 700;
      border: 1px solid #cbd5e1;
      font-size: 8.5pt;
    }
    td {
      padding: 5px 8px;
      border: 1px solid #e2e8f0;
      vertical-align: top;
    }
    tr:nth-child(even) td {
      background: #f8fafc;
    }
    code, pre {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 8.5pt;
    }
    code {
      background: #f1f5f9;
      padding: 1px 4px;
      border-radius: 3px;
      color: #0f172a;
    }
    pre {
      background: #0f172a;
      color: #f8fafc;
      padding: 8px 10px;
      border-radius: 5px;
      overflow-x: auto;
      margin: 6px 0;
      line-height: 1.3;
    }
    .day-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 10px;
      background: #ffffff;
      page-break-inside: avoid;
    }
    .day-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 4px;
    }
    .day-title {
      font-weight: 800;
      font-size: 10.5pt;
      color: #0f172a;
    }
    .day-hours {
      font-size: 8pt;
      font-family: monospace;
      font-weight: 700;
      color: #475569;
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .checklist {
      list-style: none;
      padding: 0;
      margin: 6px 0 0 0;
    }
    .checklist li {
      position: relative;
      padding-left: 18px;
      margin-bottom: 4px;
      font-size: 9pt;
      color: #334155;
    }
    .checklist li:before {
      content: "☐";
      position: absolute;
      left: 0;
      top: -1px;
      font-size: 10pt;
      color: #64748b;
    }
    .checklist li.checked:before {
      content: "☑";
      color: #059669;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin: 10px 0;
    }
    .metric-box {
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      padding: 8px;
      border-radius: 6px;
      text-align: center;
    }
    .metric-val {
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
      font-family: monospace;
    }
    .metric-lbl {
      font-size: 7.5pt;
      text-transform: uppercase;
      color: #64748b;
      font-weight: 600;
      margin-top: 2px;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: EXECUTIVE DIRECTIVE & 30-DAY TIMELINE SCHEDULE -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="brand">DecaFleet-OS 🚀</div>
        <div class="brand-tag">Sovereign 10-Bot Swarm Execution Platform</div>
      </div>
      <div class="doc-meta">
        <div><strong>STAGE 1: C1 SUB RADAR</strong></div>
        <div>FIELD MANUAL & INSTRUCTION SHEET</div>
        <div>START DATE: <strong>MONDAY, NOV 2, 2026</strong></div>
      </div>
    </div>

    <h1>Stage 1 (Sub Radar) Short-Term Operator Instruction Sheet</h1>
    <p style="font-size: 9.5pt; color: #475569;">
      <strong>Mission:</strong> Execute Day 1 to Day 30 of the <strong>60-Day Trigger Blitz</strong>. Protect mid-market General Contractors ($3M–$30M volume) from catastrophic commercial umbrella policy invalidation and Stop-Work orders via automated CSLB, TDLR, and DBPR sunshine registry monitoring.
    </p>

    <div class="metric-grid">
      <div class="metric-box">
        <div class="metric-val">$149</div>
        <div class="metric-lbl">Entry Audit Wedge</div>
      </div>
      <div class="metric-box">
        <div class="metric-val">$399/mo</div>
        <div class="metric-lbl">Core Retainer</div>
      </div>
      <div class="metric-box">
        <div class="metric-val">97.0%</div>
        <div class="metric-lbl">Gross Margin</div>
      </div>
      <div class="metric-box">
        <div class="metric-val">&lt; 20h/Wk</div>
        <div class="metric-lbl">Operator Ceiling</div>
      </div>
    </div>

    <div class="callout callout-success">
      <strong>Core Constitutional Rule:</strong> 100% Zero-Credential / No-Login Public Sunshine Portals. Never request or store client passwords, portal logins, or 2FA tokens. Ingest public registry DOM or client CSV exports only. All outbound alerts adjudicated via <strong>Jev-AI (<code>jev-latest</code>)</strong> System One Gate.
    </div>

    <h2>1. 30-Day Master Sprint Timeline (Nov 2 – Dec 1, 2026)</h2>
    <table>
      <thead>
        <tr>
          <th>Sprint Window</th>
          <th>Phase Focus</th>
          <th>Primary Deliverable & Milestones</th>
          <th>Weekly Target Load</th>
          <th>Revenue Milestone</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Week 1</strong><br>Nov 2 – Nov 8</td>
          <td><strong>California Red Wedge & Cash Launch</strong></td>
          <td>
            • Scrape 40-sub multi-state roster (CSLB, TDLR, DBPR)<br>
            • Dispatch $970k CSLB Stop-Work tear-sheet (SUB-01 & SUB-04)<br>
            • Close first 2 paid $149 audits ($298 cash collected)
          </td>
          <td><strong>8.5 hrs / wk</strong><br>(11.5h buffer)</td>
          <td><strong>$298 Cash</strong><br>(Entry Audits)</td>
        </tr>
        <tr>
          <td><strong>Week 2</strong><br>Nov 9 – Nov 15</td>
          <td><strong>Retainer Conversion & DBOS Hardening</strong></td>
          <td>
            • Deliver completed 40-sub forensic liability audit dossiers<br>
            • Convert 2 audit clients to <strong>$399/mo monitoring retainers</strong><br>
            • Verify DBOS durable step recovery (0 token re-burns)
          </td>
          <td><strong>10.0 hrs / wk</strong><br>(10.0h buffer)</td>
          <td><strong>$798 MRR</strong><br>+ $298 Audits</td>
        </tr>
        <tr>
          <td><strong>Week 3</strong><br>Nov 16 – Nov 22</td>
          <td><strong>Texas & Florida Expansion</strong></td>
          <td>
            • Roll out Texas TDLR (HVAC/Electrical) & Florida DBPR warnings<br>
            • Sign 3 additional GCs onto $399/mo ongoing retainers<br>
            • Maintain 0 unhandled DOM errors across daily 04:00 AM runs
          </td>
          <td><strong>11.5 hrs / wk</strong><br>(8.5h buffer)</td>
          <td><strong>$1,995 MRR</strong><br>+ $447 Audits</td>
        </tr>
        <tr>
          <td><strong>Week 4</strong><br>Nov 23 – Dec 1</td>
          <td><strong>Gate 1 Clearance & Stage 2 Preparation</strong></td>
          <td>
            • Scale to 10 active GC retainers ($3,990 MRR) + 2 weekly audits<br>
            • Reach <strong>$4,300+ MRR Milestone</strong><br>
            • Execute Gate 1 Expansion Audit to unlock Stage 2 (Trade Map Desk)
          </td>
          <td><strong>12.0 hrs / wk</strong><br>(8.0h buffer)</td>
          <td><strong>$4,300+ MRR</strong><br>(Gate 1 Cleared)</td>
        </tr>
      </tbody>
    </table>

    <h2>2. Current Staged Breaches (Day 1 Live Pipeline)</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Subcontractor Entity</th>
          <th>State Board & License</th>
          <th>Violation Description</th>
          <th>Est. Exposure</th>
          <th>Statutory Authority</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge badge-red">SUB-01</span></td>
          <td><strong>Sierra Structural Concrete LLC</strong></td>
          <td>CSLB #CA-1049281</td>
          <td>$25,000 Surety Bond (#SUR-88412-CA) lapsed 48h ago $\rightarrow$ License SUSPENDED</td>
          <td><strong>$420,000</strong></td>
          <td>CA B&P Code § 7071.6</td>
        </tr>
        <tr>
          <td><span class="badge badge-red">SUB-04</span></td>
          <td><strong>Golden Gate Demolition Corp</strong></td>
          <td>CSLB #CA-9184420</td>
          <td>Workers'-Comp policy (#CYP-WC-338192) cancelled $\rightarrow$ Stop-Work Order</td>
          <td><strong>$550,000</strong></td>
          <td>CA B&P Code § 7125.2</td>
        </tr>
        <tr>
          <td><span class="badge badge-orange">SUB-02</span></td>
          <td><strong>LoneStar Commercial HVAC LLC</strong></td>
          <td>TDLR #TACLA88392C</td>
          <td>Texas Mutual Workers'-Comp policy (#TMI-0048291-25) expired yesterday</td>
          <td><strong>$285,000</strong></td>
          <td>Tex. Lab. Code § 406.096</td>
        </tr>
        <tr>
          <td><span class="badge badge-orange">SUB-05</span></td>
          <td><strong>Gulf Coast Electrical LLC</strong></td>
          <td>TDLR #TECL34918</td>
          <td>Master Electrical Contractor license transitioned ACTIVE -> EXPIRED</td>
          <td><strong>$190,000</strong></td>
          <td>Tex. Occ. Code § 1305.151</td>
        </tr>
        <tr>
          <td><span class="badge badge-slate">SUB-03</span></td>
          <td><strong>Biscayne Glazing Inc.</strong></td>
          <td>DBPR #SCC131152409</td>
          <td>Expired FL DFS Officer Workers'-Comp Exemption Certificate</td>
          <td><strong>$165,000</strong></td>
          <td>FL Stat. § 440.107(7)(a)</td>
        </tr>
        <tr>
          <td><span class="badge badge-slate">SUB-06</span></td>
          <td><strong>Sunbelt Commercial Roofing</strong></td>
          <td>DBPR #CCC1330891</td>
          <td>Lapsed $50k performance surety bond (#OR-FL-66201)</td>
          <td><strong>$210,000</strong></td>
          <td>FL Admin. Code R. 61G4</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- PAGE 2: GRANULAR OPERATOR SCHEDULE (WEEK 1: DAYS 1 - 7) -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="brand">DecaFleet-OS 🚀</div>
        <div class="brand-tag">Stage 1 Week 1 Field Execution</div>
      </div>
      <div class="doc-meta">
        <div>WEEK 1: DAYS 1 – 7</div>
        <div>CALIFORNIA RED STOP-WORK SPRINT</div>
        <div>OPERATOR BUDGET: 8.5 HOURS</div>
      </div>
    </div>

    <h1>Week 1 Granular Step-by-Step Schedule (Nov 2 – Nov 8, 2026)</h1>

    <div class="day-card">
      <div class="day-header">
        <span class="day-title">DAY 1 — MONDAY, NOV 2, 2026: Pre-Flight Audit & Breach Staging</span>
        <span class="day-hours">OPERATOR TIME: 2.0 HOURS</span>
      </div>
      <p style="font-size: 8.5pt; margin-bottom: 4px;">
        <strong>Objective:</strong> Verify 10-bot runtime health, execute the 40-sub multi-state diff, and stage California Red Stop-Work notices in Jev-AI Tier-2 Gate.
      </p>
      <ul class="checklist">
        <li class="checked"><strong>08:00 AM — Terminal Verification:</strong> Run <code>npm test</code> (7/7 tests must pass) and <code>npm run lint</code> (0 static errors).</li>
        <li class="checked"><strong>08:30 AM — Scrape & Diff Execution:</strong> Run <code>npm run audit:sub-radar</code> to generate <code>shared/data/registry_raw.json</code> and <code>shared/data/compliance_breaches.json</code>.</li>
        <li class="checked"><strong>09:15 AM — Jev-AI Gate Adjudication:</strong> Run <code>npm run audit:master-plan</code>. Verify <code>stage-1-action-1-cslb-alert</code> routes to <code>TIER_2_CO_SIGN</code> ($P = 0.92$, Risk = $0.16$).</li>
        <li><strong>10:00 AM — Outreach Staging:</strong> Verify generated tear-sheet in <code>shared/reports/sub_radar/PKT-C1-20261101-001_40_Sub_Liability_Audit.md</code>. Confirm target GC contacts at Sierra Pacific Commercial Builders Inc.</li>
      </ul>
    </div>

    <div class="day-card">
      <div class="day-header">
        <span class="day-title">DAY 2 — TUESDAY, NOV 3, 2026: 20-GC Cold Outreach Dispatch</span>
        <span class="day-hours">OPERATOR TIME: 2.5 HOURS</span>
      </div>
      <p style="font-size: 8.5pt; margin-bottom: 4px;">
        <strong>Objective:</strong> Dispatch personalized compliance tear-sheets to 20 commercial General Contractors in California, Texas, and Florida.
      </p>
      <ul class="checklist">
        <li><strong>08:00 AM — Prospect Identification:</strong> Filter commercial GCs with active multi-family or commercial permits in Sacramento, Austin, and Dallas via public city building permit portals.</li>
        <li><strong>09:00 AM — Email Dispatch (Dispatch-01):</strong> Send the California CSLB Stop-Work tear-sheet to Risk Managers and VPs of Field Operations using the exact pre-approved template.</li>
        <li><strong>11:00 AM — Inbound Monitoring:</strong> Configure email notifications for "UNLOCK" or audit inquiry replies.</li>
      </ul>
      <pre><code>SUBJECT: URGENT CSLB/TDLR Flag: 2 Suspended Subs & $1.82M Uninsured Exposure on Active Sites
Marcus — While running our daily 04:00 AM public registry sweep across CSLB and TDLR, our Sub Radar engine cross-checked the specialty subcontractors on your active job sites.
We uncovered 2 immediate Stop-Work breaches:
1. Sierra Structural Concrete LLC (CSLB #CA-1049281): $25k Surety Bond lapsed -> License SUSPENDED (§ 7071.6).
2. Golden Gate Demolition Corp (CSLB #CA-9184420): Workers'-Comp cancelled -> License SUSPENDED (§ 7125.2).
Total uninsured umbrella liability exposure: $970,000.
To unlock your complete 40-Sub Audit Packet & Stop-Work Cure Notices: $149 flat (zero logins needed).
Reply "UNLOCK" or click the release link to dispatch cure notices immediately.</code></pre>
    </div>

    <div class="day-card">
      <div class="day-header">
        <span class="day-title">DAY 3 — WEDNESDAY, NOV 4, 2026: Objection Handling & Closing First $149 Audits</span>
        <span class="day-hours">OPERATOR TIME: 1.5 HOURS</span>
      </div>
      <p style="font-size: 8.5pt; margin-bottom: 4px;">
        <strong>Objective:</strong> Field inbound GC replies, handle the "We collect COIs annually" objection, and collect first $149 audit fees.
      </p>
      <ul class="checklist">
        <li><strong>09:00 AM — Inbound Triage:</strong> Respond to prospect questions within 15 minutes.</li>
        <li><strong>Objection Counter #1 ("We already collected COIs at contract signing"):</strong> <em>"COIs only show coverage on Day 1. In California, surety bonds and workers'-comp policies lapse mid-project without notice to the GC. State boards suspend licenses automatically by operation of law, voiding your commercial umbrella coverage."</em></li>
        <li><strong>Objection Counter #2 ("Do I need to give you my Procore or accounting login?"):</strong> <em>"Zero logins. We only need your project subcontractor name list or CSV. We verify 100% against public state sunshine portals."</em></li>
        <li><strong>11:30 AM — Close 2 Audits:</strong> Send Stripe $149 payment link. Collect <strong>$298.00</strong> cash revenue. Ingest custom subcontractor rosters from paying GCs.</li>
      </ul>
    </div>

    <div class="day-card">
      <div class="day-header">
        <span class="day-title">DAY 4 — THURSDAY, NOV 5, 2026: 24h Audit Delivery & DBOS Durable Checkpoint Verification</span>
        <span class="day-hours">OPERATOR TIME: 1.0 HOUR</span>
      </div>
      <p style="font-size: 8.5pt; margin-bottom: 4px;">
        <strong>Objective:</strong> Ingest client subcontractor rosters, execute <code>BoardScout</code> crawlers, and deliver completed forensic audit packets within 24 hours.
      </p>
      <ul class="checklist">
        <li><strong>08:00 AM — Ingest Client Roster:</strong> Place client subcontractor lists into <code>shared/data/client_rosters/</code>.</li>
        <li><strong>08:30 AM — Run Sub Radar Pipeline:</strong> Execute <code>BoardScout-01..04</code> and <code>DiffEngine-01..02</code> on client rosters. Check DBOS step checkpoints (<code>ckpt_client_cslb_diff</code>).</li>
        <li><strong>09:15 AM — Audit Dossier Delivery:</strong> Export formatted Markdown & PDF report via Dossier-01. Email completed audit to the client with superintendent cure notices.</li>
      </ul>
    </div>

    <div class="day-card">
      <div class="day-header">
        <span class="day-title">DAY 5 — FRIDAY, NOV 6, 2026: 15-Minute Audit Debrief & Retainer Seeding</span>
        <span class="day-hours">OPERATOR TIME: 1.0 HOUR</span>
      </div>
      <p style="font-size: 8.5pt; margin-bottom: 4px;">
        <strong>Objective:</strong> Walk clients through their forensic audit findings; seed the $399/mo ongoing 04:00 AM daily monitoring retainer.
      </p>
      <ul class="checklist">
        <li><strong>10:00 AM — 15-Minute Zoom Walkthrough:</strong> Highlight flagged breaches, state statutory citations, and superintendent cure actions.</li>
        <li><strong>Retainer Seed Script:</strong> <em>"This audit caught 2 lapses today. But subcontractors lapse continuously throughout a 14-month build. For $399/mo, our 4 BoardScout bots will poll your full sub roster every single morning at 04:00 AM, alerting you before the 06:00 AM job-site gate opens."</em></li>
      </ul>
    </div>

    <div class="day-card">
      <div class="day-header">
        <span class="day-title">DAYS 6–7 — SATURDAY & SUNDAY, NOV 7–8, 2026: Weekend Autonomous Bot Check & Rest</span>
        <span class="day-hours">OPERATOR TIME: 0.5 HOURS</span>
      </div>
      <ul class="checklist">
        <li><strong>System Telemetry Review:</strong> Check <code>http://localhost:3000</code> Bot Health Console. Verify 0 DOM selector drift and 100% DBOS step integrity. Operator rests.</li>
      </ul>
    </div>
  </div>

  <!-- PAGE 3: GRANULAR OPERATOR SCHEDULE (WEEKS 2 - 4: DAYS 8 - 30) -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="brand">DecaFleet-OS 🚀</div>
        <div class="brand-tag">Stage 1 Weeks 2–4 Execution</div>
      </div>
      <div class="doc-meta">
        <div>WEEKS 2 – 4: DAYS 8 – 30</div>
        <div>RETAINER CONVERSION & GATE 1 CLEARANCE</div>
        <div>TARGET: $4,300+ MRR</div>
      </div>
    </div>

    <h1>Weeks 2–4 Step-by-Step Schedule (Nov 9 – Dec 1, 2026)</h1>

    <div class="day-card">
      <div class="day-header">
        <span class="day-title">DAY 8 — MONDAY, NOV 9, 2026: Retainer Conversion Pitch & Stripe Setup</span>
        <span class="day-hours">OPERATOR TIME: 2.0 HOURS</span>
      </div>
      <p style="font-size: 8.5pt; margin-bottom: 4px;">
        <strong>Objective:</strong> Convert audited GCs from one-time $149 audits into ongoing $399/mo recurring compliance monitoring retainers.
      </p>
      <ul class="checklist">
        <li><strong>09:00 AM — Retainer Agreement Dispatch:</strong> Send simple 1-page terms + Stripe recurring link ($399/month, cancel anytime).</li>
        <li><strong>11:30 AM — Close 2 Retainers:</strong> Sign first 2 GC clients onto $399/mo ongoing monitoring. <strong>Base MRR reaches $798.00/mo</strong>.</li>
        <li><strong>02:00 PM — Roster Ingestion:</strong> Add the 2 new GC subcontractor rosters into the daily 04:00 AM automated <code>BoardScout</code> schedule.</li>
      </ul>
    </div>

    <div class="day-card">
      <div class="day-header">
        <span class="day-title">DAYS 9–10 — TUESDAY & WEDNESDAY, NOV 10–11, 2026: Texas & Florida Expansion</span>
        <span class="day-hours">OPERATOR TIME: 3.0 HOURS</span>
      </div>
      <p style="font-size: 8.5pt; margin-bottom: 4px;">
        <strong>Objective:</strong> Deploy outreach tear-sheets targeting Texas TDLR electrical/HVAC expirations and Florida DBPR roofing/glazing lapses.
      </p>
      <ul class="checklist">
        <li><strong>Target 25 New Commercial GCs:</strong> Extract active commercial permit holders in Dallas, Fort Worth, Houston, and Miami.</li>
        <li><strong>Dispatch Texas & Florida Tear-Sheets:</strong> Emphasize TDLR Chapter 1302 and FL Statute § 440.107 stop-work and umbrella void risks.</li>
        <li><strong>Close 2 Additional $149 Audits:</strong> Collect <strong>$298.00</strong> entry revenue; queue rosters for automated overnight scraping.</li>
      </ul>
    </div>

    <div class="day-card">
      <div class="day-header">
        <span class="day-title">DAYS 11–12 — THURSDAY & FRIDAY, NOV 12–13, 2026: Automated Daily 04:00 AM Diff Delivery</span>
        <span class="day-hours">OPERATOR TIME: 2.0 HOURS</span>
      </div>
      <ul class="checklist">
        <li><strong>04:00 AM Automated Diff:</strong> <code>BoardScout-01..04</code> polls all client subs; <code>DiffEngine-01..02</code> compares against DBOS baseline.</li>
        <li><strong>06:00 AM Client Alert:</strong> Retainer clients receive clean "Zero Breaches Detected" digest or instant Red Flag alert before morning job-site gates open.</li>
        <li><strong>Close 1 Additional Retainer:</strong> Convert 1 previous audit client to $399/mo retainer. <strong>MRR reaches $1,197.00/mo</strong>.</li>
      </ul>
    </div>

    <div class="day-card">
      <div class="day-header">
        <span class="day-title">DAYS 13–14 — SATURDAY & SUNDAY, NOV 14–15, 2026: Gate 1 Mid-Point Diagnostic Check</span>
        <span class="day-hours">OPERATOR TIME: 1.0 HOUR</span>
      </div>
      <p style="font-size: 8.5pt; margin-bottom: 4px;">
        <strong>Objective:</strong> Run the Expansion Gate calculator to confirm zero operator overload and zero DOM drift.
      </p>
      <ul class="checklist">
        <li><strong>Expansion Gate Check:</strong> Run <code>evaluateExpansionGate()</code> in <code>src/utils/calculator.ts</code>.</li>
        <li><strong>Verification Metric:</strong> Active Retainers = 3 | Completed Cycles = 2 (14 Days) | DOM Errors/Day = 0 | Weekly Hours = 9h / 20h Cap.</li>
        <li><strong>Result:</strong> Mid-point criteria on track. 11 hours/week operational headroom preserved.</li>
      </ul>
    </div>

    <div class="day-card">
      <div class="day-header">
        <span class="day-title">DAYS 15–30 — NOV 16 TO DEC 1, 2026: Scale to 10 Retainers & Gate 1 Clearance</span>
        <span class="day-hours">OPERATOR TIME: 10–12 HOURS / WEEK</span>
      </div>
      <p style="font-size: 8.5pt; margin-bottom: 4px;">
        <strong>Objective:</strong> Scale outbound pipeline across California, Texas, and Florida to reach 10 active retainers and officially clear Gate 1.
      </p>
      <ul class="checklist">
        <li><strong>Continuous Outreach Cadence:</strong> Dispatch 15 tear-sheets every Tuesday and Thursday morning.</li>
        <li><strong>Audit-to-Retainer Pipeline:</strong> Close 2–3 new $149 audits per week; maintain 60%+ conversion into $399/mo retainers.</li>
        <li><strong>Day 28 Milestone:</strong> Reach <strong>10 active GC retainers</strong> ($3,990.00 MRR) + ongoing entry audits $\rightarrow$ <strong>$4,300+ MRR Milestone Achieved</strong>.</li>
        <li><strong>Day 30 Gate 1 Formal Clearance:</strong> Verify all 3 Gate 1 criteria:
          <ol style="margin: 4px 0 0 16px; padding: 0;">
            <li>$\ge 3$ active paying retainers (Achieved: 10).</li>
            <li>2+ consecutive weekly delivery cycles with 0 unhandled DOM selector errors (Achieved: 4 cycles).</li>
            <li>Ongoing weekly maintenance load $< 4$ hours/week (Achieved: ~3.5h/week for C1 operations).</li>
          </ol>
        </li>
        <li><strong>December 1, 2026:</strong> Deploy Stage 2 (<strong>P1: Trade Map Desk</strong>) for warm zero-CAC cross-sell (+$449/mo) to the exact same 10 GCs!</li>
      </ul>
    </div>
  </div>

  <!-- PAGE 4: TECHNICAL ARCHITECTURE, BOT COMMANDS & LEGAL CITATIONS -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="brand">DecaFleet-OS 🚀</div>
        <div class="brand-tag">Technical Operations & Governance</div>
      </div>
      <div class="doc-meta">
        <div>TECHNICAL REFERENCE</div>
        <div>BOT COMMANDS & STATUTORY CITATIONS</div>
        <div>ZERO-LOGIN ARCHITECTURE</div>
      </div>
    </div>

    <h1>Technical Reference, Bot CLI Commands & Statutory Authority</h1>

    <h2>1. Essential Operator CLI Commands</h2>
    <table>
      <thead>
        <tr>
          <th>Command</th>
          <th>Execution Context</th>
          <th>Expected Outcome & Verification</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>npm test</code></td>
          <td>Pre-flight test suite (daily)</td>
          <td>Runs 7 unit tests covering unit economics, browser minutes, and Gate 1 evaluation. Must pass 100%.</td>
        </tr>
        <tr>
          <td><code>npm run lint</code></td>
          <td>Pre-commit static check</td>
          <td>Runs <code>tsc --noEmit</code>. Verifies strict TypeScript type safety across all bot components.</td>
        </tr>
        <tr>
          <td><code>npm run audit:sub-radar</code></td>
          <td>Daily scrape & diff runner</td>
          <td>Executes <code>BoardScout-01..04</code> and <code>DiffEngine-01..02</code>. Writes raw registry JSON and breach diffs.</td>
        </tr>
        <tr>
          <td><code>npm run audit:master-plan</code></td>
          <td>Jev-AI Constitutional Gate</td>
          <td>Adjudicates all 4 stages against TypeSafe AI Jev (<code>jev-latest</code>) 6-question System One schema.</td>
        </tr>
        <tr>
          <td><code>npm run dev</code></td>
          <td>Local Command Center UI</td>
          <td>Launches Vite + Express server on <code>http://localhost:3000</code>. Provides live Bot Health & Approval Gate.</td>
        </tr>
      </tbody>
    </table>

    <h2>2. Statutory Violations & Legal Grounds Playbook</h2>
    <table>
      <thead>
        <tr>
          <th>State & Board</th>
          <th>Statutory Citation</th>
          <th>Legal Operation of Law</th>
          <th>Commercial Umbrella Insurance Impact</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>California CSLB</strong></td>
          <td>CA Bus. & Prof. Code <strong>§ 7071.6</strong></td>
          <td>Automatic license suspension immediately upon cancellation or lapse of the mandatory $25,000 contractor surety bond.</td>
          <td>Working with a suspended sub violates standard contractor warranty clauses; carrier may deny umbrella claims.</td>
        </tr>
        <tr>
          <td><strong>California CSLB</strong></td>
          <td>CA Bus. & Prof. Code <strong>§ 7125.2</strong></td>
          <td>Automatic statutory license suspension on the date workers'-comp coverage expires or is cancelled.</td>
          <td>Exposes General Contractor to statutory strict liability and immediate Cal/OSHA Stop-Work Orders on site.</td>
        </tr>
        <tr>
          <td><strong>Texas TDLR</strong></td>
          <td>Tex. Occ. Code <strong>§ 1305.151</strong><br>Tex. Lab. Code <strong>§ 406.096</strong></td>
          <td>Unlicensed electrical contracting is a Class A misdemeanor. GCs must verify active WC before dispatching trades.</td>
          <td>GC becomes direct statutory employer liable for all medical bills and lost wages if sub worker is injured.</td>
        </tr>
        <tr>
          <td><strong>Florida DBPR</strong></td>
          <td>FL Stat. <strong>§ 440.107</strong><br>FL Admin. Code <strong>R. 61G4-15.006</strong></td>
          <td>FL Division of Workers' Comp issues immediate Stop-Work Orders and penalty equal to 2x avoided premium.</td>
          <td>Stop-Work Order shuts down active site; liquidated delay damages accrue against General Contractor.</td>
        </tr>
      </tbody>
    </table>

    <h2>3. Jev-AI (jev-latest) 6-Question System One Gate Policy</h2>
    <table>
      <thead>
        <tr>
          <th>Question</th>
          <th>Output Type</th>
          <th>Constitutional Threshold</th>
          <th>Operational Meaning</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>routing_intent</code></td>
          <td><code>choice</code></td>
          <td>Probability $\ge 0.70$</td>
          <td>Classifies action into <code>auto_dispatch</code>, <code>co_sign_batch</code>, or <code>escalate_human</code>.</td>
        </tr>
        <tr>
          <td><code>non_delegable_boundary</code></td>
          <td><code>noul</code></td>
          <td>Tripwire $\text{Noul} &lt; 0.30$</td>
          <td>Blocks execution if 2FA tokens, municipal bid contracts, or legal signatures are detected.</td>
        </tr>
        <tr>
          <td><code>primary_evidence_verified</code></td>
          <td><code>noul</code></td>
          <td>Minimum $\text{Noul} \ge 0.80$</td>
          <td>Verifies DOM selector timestamps and active state board sunshine registry citations.</td>
        </tr>
        <tr>
          <td><code>zero_login_compliant</code></td>
          <td><code>noul</code></td>
          <td>Minimum $\text{Noul} \ge 0.80$</td>
          <td>Ensures zero third-party client credentials or cookies are stored or requested.</td>
        </tr>
        <tr>
          <td><code>payload_checksum_valid</code></td>
          <td><code>noul</code></td>
          <td>Minimum $\text{Noul} \ge 0.50$</td>
          <td>Ensures payload integrity across DBOS step checkpoints.</td>
        </tr>
        <tr>
          <td><code>blast_radius</code></td>
          <td><code>score</code></td>
          <td>Score $\le 0.45$ (Tier 1) / $\le 1.00$ (Tier 2)</td>
          <td>Scores operational blast risk from 0.00 (read-only diff) to 2.00 (irreversible mutation).</td>
        </tr>
      </tbody>
    </table>

    <div class="callout callout-alert">
      <strong>Hard Circuit Breakers:</strong>
      1. If logged weekly operator hours exceed <strong>18.0 hours</strong>, halt new cold outreach; lock expansion gate.<br>
      2. If $\ge 3$ consecutive scrape errors occur on any state board, isolate lane and trigger Stagehand selector self-healing.<br>
      3. If 3 consecutive client cancellations occur within 14 days, trigger 24h operational circuit breaker.
    </div>
  </div>

</body>
</html>
`;

async function main() {
  console.log('========================================================================================');
  console.log('DECAFLEET-OS // SHORT-TERM ROADMAP PDF INSTRUCTION SHEET GENERATOR');
  console.log('START DATE: MONDAY, NOV 2, 2026 // STAGE 1: C1 SUB RADAR');
  console.log('========================================================================================\n');

  const docsDir = path.resolve(process.cwd(), 'docs');
  const sharedReportsDir = path.resolve(process.cwd(), 'shared/reports/sub_radar');
  fs.mkdirSync(docsDir, { recursive: true });
  fs.mkdirSync(sharedReportsDir, { recursive: true });

  const htmlPath = path.join(docsDir, 'DecaFleet_Stage1_ShortTerm_Instruction_Sheet.html');
  fs.writeFileSync(htmlPath, HTML_CONTENT, 'utf8');
  console.log(`[HTML Generated] -> ${htmlPath}`);

  // Generate PDF via Microsoft Edge headless
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const pdfDocsPath = path.join(docsDir, 'DecaFleet_Stage1_ShortTerm_Instruction_Sheet.pdf');
  const pdfSharedPath = path.join(sharedReportsDir, 'DecaFleet_Stage1_ShortTerm_Instruction_Sheet.pdf');

  if (fs.existsSync(edgePath)) {
    const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
    const cmd = `"${edgePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfDocsPath}" "${fileUrl}"`;
    
    console.log(`[Executing Edge Headless Print-to-PDF]...`);
    try {
      execSync(cmd, { stdio: 'inherit' });
      if (fs.existsSync(pdfDocsPath)) {
        const stats = fs.statSync(pdfDocsPath);
        console.log(`[PDF Successfully Created] -> ${pdfDocsPath} (${stats.size} bytes)`);
        
        // Copy to shared reports directory as well
        fs.copyFileSync(pdfDocsPath, pdfSharedPath);
        console.log(`[PDF Copied to Shared Reports] -> ${pdfSharedPath}`);
      }
    } catch (err) {
      console.error('Failed to run Edge headless PDF generation:', err);
    }
  } else {
    console.warn(`Microsoft Edge not found at ${edgePath}. HTML instruction sheet preserved.`);
  }

  console.log('\n========================================================================================');
  console.log('SHORT-TERM INSTRUCTION SHEET GENERATION COMPLETE!');
  console.log('========================================================================================');
}

main().catch(console.error);
