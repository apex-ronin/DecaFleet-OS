# Changelog & Release Commit Notes

All notable architectural changes, stage executions, and Jev-AI (`jev-latest`) constitutional gate updates to **DecaFleet-OS** are documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

---

## [1.0.0] — 2026-11-01

### Summary — Stage 1 (`C1: Sub Radar`) Production Launch & Sovereign Execution Platform Separation
Release `v1.0.0` completes the surgical separation of **DecaFleet-OS** into a pure 10-bot commercial execution platform and launches **Stage 1 (`C1: Sub Radar`)** with a live 40-subcontractor multi-state statutory compliance diff (`CSLB`, `TDLR`, `DBPR`) and client-ready **\$149 Forensic Liability Audit Packet (`PKT-C1-20261101-001`)**.

### Added
- **Stage 1 (`C1 Sub Radar`) 40-Subcontractor Multi-State Roster & Diff Engine (`54d3c4d`):**
  - Expanded [`src/data/subRadarRoster.ts`](./src/data/subRadarRoster.ts) (`SUB_RADAR_LIVE_ROSTER`) to **40 commercial subcontractors** across California (`CSLB`: 16), Texas (`TDLR`: 12), and Florida (`DBPR`: 12) for target General Contractor **Sierra Pacific Commercial Builders Inc.**
  - Added baseline-vs-live state registry diff fields (`previousStatus`, `liveStatus`, `suretyBondStatus`, `workersCompStatus`, `statutoryCitation`, `estimatedLiabilityExposureUsd`, `dbosStepCheckpoint`, and `jevGate` telemetry).
  - Added `generateSubRadarAuditMarkdown()` and `SUB_RADAR_AUDIT_PACKET_META` producing the deliverable **\$149 40-Subcontractor Forensic Liability Audit Packet** and **Cold GC Outreach Tear-Sheet**.
- **Stage 1 Express + Jev-AI (`jev-latest`) Backend Endpoints (`54d3c4d`):**
  - `POST /api/sub-radar/ingest-diff` in [`server.ts`](./server.ts): Executes `BoardScout-01..04` + `DiffEngine-01..02` across all 40 subcontractors, isolates 6 statutory breaches (**\$1,820,000** uninsured umbrella exposure prevented), updates live 10-bot runtime telemetry, and adjudicates every alert + the \$149 Audit Packet through the 6-question Jev-AI (`jev-latest`) System One Confidence Gate.
  - `GET /api/sub-radar/audit-packet` in [`server.ts`](./server.ts): Serves the complete 40-subcontractor audit packet metadata, structured breach array, and rendered Markdown dossier.
- **Interactive Stage 1 Launchpad & Audit Packet Viewer (`54d3c4d`):**
  - Upgraded [`src/components/SubRadarLaunchpadView.tsx`](./src/components/SubRadarLaunchpadView.tsx) with a live 40-subcontractor registry scan & diff trigger, state filter pills (`ALL`, `CSLB`, `TDLR`, `DBPR`), severity filter pills (`BREACHES ONLY`, `RED`, `ORANGE`, `AMBER`, `GREEN`), real-time search, and an interactive **Deliverable \$149 Audit Packet + Cold GC Email Tear-Sheet** modal/panel with 1-click copy.
- **Stage 1 CLI Runner & Physical Data Artifacts (`54d3c4d`):**
  - Added [`scripts/run_sub_radar_day1_audit.ts`](./scripts/run_sub_radar_day1_audit.ts) (`npm run audit:sub-radar`) to execute the Day 1 scrape, diff, and Jev-AI gate audit from the command line.
  - Generated verified physical outputs in [`shared/data/registry_raw.json`](./shared/data/registry_raw.json), [`shared/data/compliance_breaches.json`](./shared/data/compliance_breaches.json), and [`shared/reports/sub_radar/PKT-C1-20261101-001_40_Sub_Liability_Audit.md`](./shared/reports/sub_radar/PKT-C1-20261101-001_40_Sub_Liability_Audit.md).
- **Repository Governance, Roadmap & Documentation Suite:**
  - Added [`ROADMAP.md`](./ROADMAP.md) detailing the complete 4-Stage operational timeline, gate criteria, and VM multiplexing matrix.
  - Added [`CHANGELOG.md`](./CHANGELOG.md), [`CONTRIBUTING.md`](./CONTRIBUTING.md), and [`SECURITY.md`](./SECURITY.md) enforcing Conventional Commits, Zero-Credential / No-Login boundaries, and pre-commit verification gates.
- **Persistent Browser Agent Quick-Reboot Recovery:**
  - Added `rebootDegradedBots()` in [`src/utils/calculator.ts`](./src/utils/calculator.ts) and unit tests in [`src/utils/calculator.test.ts`](./src/utils/calculator.test.ts).
  - Added `POST /api/bot-health/reboot` and `'quick_reboot'` action support in [`server.ts`](./server.ts), plus targeted and batch Quick-Reboot controls in [`src/components/BotHealthWidget.tsx`](./src/components/BotHealthWidget.tsx).

### Changed
- **Surgical Separation from Competition Engine (`de03068`):**
  - Removed all comparative AI competition research artifacts (`the_competition/`, `master_prompt_othr/`, `CandidateMatrixView.tsx`, `src/data/candidates.ts`, `src/data/tribunal.ts`, `scripts/run_full_competition_jev_audit.ts`) so `DecaFleet-OS` operates strictly as a dedicated production execution system.
  - Refocused primary navigation in [`src/App.tsx`](./src/App.tsx) and [`src/components/Header.tsx`](./src/components/Header.tsx) around **Stage 1: Sub Radar (`C1`)**, **10-Bot Fleet Console**, **Jev-AI Gate Inbox**, **6 Service Handbooks**, **4-Stage Roadmap**, and **Unit Economics Modeler**.
- **Package & Repo Hygiene:**
  - Standardized [`package.json`](./package.json) (`name: "decafleet-os"`, `version: "1.0.0"`) with `npm test`, `npm run lint`, `npm run audit:sub-radar`, and `npm run audit:master-plan` scripts.
  - Hardened [`.gitignore`](./.gitignore) and purged tracked ephemeral `.aistudio/` media artifacts and legacy competition markdown from the Git index.

---

## [0.4.0] — 2026-10-23 to 2026-10-31

### Added
- **10-Bot Fleet Health Monitoring & Stagehand Self-Healing System (`2d3ed17`):**
  - Added [`src/components/BotHealthWidget.tsx`](./src/components/BotHealthWidget.tsx) and `/api/bot-health` + `/api/bot-health/action` endpoints in [`server.ts`](./server.ts).
  - Real-time tracking for `bot-01` through `bot-10` (8 active worker lanes + 2 hot-spare failover lanes), DBOS durable step checkpoints, DOM drift detection, and Stagehand self-healing selector actions (`stagehand_heal`, `heal_all`, `recycle_session`).
  - Added deterministic fleet health aggregation helpers and unit tests in [`src/utils/calculator.ts`](./src/utils/calculator.ts) and [`src/utils/calculator.test.ts`](./src/utils/calculator.test.ts).
- **Master Plan Jev-AI Constitutional Audit Runner (`d962e1b`):**
  - Added [`scripts/run_master_plan_jev_audit.ts`](./scripts/run_master_plan_jev_audit.ts) to validate all 4 stages (`C1`, `P1`, `P3`, `P2`, `C2`, `C3`) against the Jev-AI (`jev-latest`) 6-question System One schema.

### Changed
- **Runtime Startup Script (`74fb3ce`):**
  - Updated production/dev script wiring in [`package.json`](./package.json) for consistent TypeScript server execution.

---

## [0.3.0] — 2026-10-22

### Added
- **TypeSafe AI (`jev-latest`) System One Confidence Gate (`17e97e7`):**
  - Integrated `POST https://api.typesafe.ai/v1/systemone` (`model: "jev-latest"`) in [`server.ts`](./server.ts) with 6 atomic parallel questions (`routing_intent`, `non_delegable_boundary`, `primary_evidence_verified`, `zero_login_compliant`, `payload_checksum_valid`, `blast_radius`) and deterministic local mathematical fallback when running offline.
  - Implemented the **3-Tier Constitutional Routing Policy** (`TIER_1_AUTO_DISPATCH`, `TIER_2_CO_SIGN`, `TIER_3_HARD_HUMAN_LOCK`) and interactive [`src/components/ApprovalGateView.tsx`](./src/components/ApprovalGateView.tsx).

---

## [0.2.0] — 2026-10-21

### Added
- **6 Complete 17-Section Sovereign Operator Handbooks (`41d5aa9`, `9740a8e`):**
  - Authored full 17-section operational handbooks in [`src/data/handbooks.ts`](./src/data/handbooks.ts) (`C1 Sub Radar`, `P1 Trade Map Desk`, `P2 Catalog Exception Desk`, `P3 No-Login Funnel & Ad Metadata Desk`, `C2 Fleet Collision Lab`, `C3 Seat Sniper / Municipal GovDesk`).
  - Built [`src/components/HandbookDetailView.tsx`](./src/components/HandbookDetailView.tsx), [`src/components/EconomicsModelerView.tsx`](./src/components/EconomicsModelerView.tsx), [`src/components/PortfolioRoadmapView.tsx`](./src/components/PortfolioRoadmapView.tsx), and [`src/components/AntigravityExportModal.tsx`](./src/components/AntigravityExportModal.tsx).
