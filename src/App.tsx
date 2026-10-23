import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { HandbookDetailView } from './components/HandbookDetailView.tsx';
import { FleetConsoleView } from './components/FleetConsoleView.tsx';
import { ApprovalGateView } from './components/ApprovalGateView.tsx';
import { EconomicsModelerView } from './components/EconomicsModelerView.tsx';
import { CandidateMatrixView } from './components/CandidateMatrixView.tsx';
import { PortfolioRoadmapView } from './components/PortfolioRoadmapView.tsx';
import { TribunalAuditView } from './components/TribunalAuditView.tsx';
import { AntigravityExportModal } from './components/AntigravityExportModal.tsx';
import { BUSINESS_HANDBOOKS } from './data/handbooks.ts';
import { CANDIDATE_IDEAS } from './data/candidates.ts';
import { TRIBUNAL_CONTENDERS } from './data/tribunal.ts';
import { ApprovalItem } from './types/index.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('tribunal');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('c1'); // Default to C1 (Grok's Sub Radar - Stage 1 Winner)
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Seed sample initial approval items that demonstrate the human boundary across the Tri-Championship models
  const [approvalItems, setApprovalItems] = useState<ApprovalItem[]>([
    {
      id: 'appr-init-1',
      businessId: 'c1',
      botName: 'Alert-08',
      title: 'Sub Radar Stop-Work Alert: Apex Drywall & Framing LLC (CSLB #1049281)',
      summary: 'CSLB public registry poll detected Surety Bond #SB-99412A cancelled at 05:14 AM PST (Workers Comp Policy expired). Pre-filled GC Stop-Work Hold & COI Request ready.',
      artifactType: 'compliance_alert',
      dataPayload: {
        stateBoard: 'CSLB (California)',
        licenseNumber: '1049281',
        subcontractor: 'Apex Drywall & Framing LLC',
        statusTransition: 'ACTIVE -> SUSPENDED (BOND CANCELLED)',
        gcLiabilityExposure: '$185,000 Uninsured Sub-Tier Claim Risk'
      },
      timestamp: '06:48:12',
      status: 'pending'
    },
    {
      id: 'appr-init-2',
      businessId: 'p2',
      botName: 'PatchPrep-08',
      title: 'Catalog Exception Desk: 38 Shopify Plus GMC Price/Shipping Mismatches',
      summary: 'Detected 38 high-margin SKUs suspended in Google Merchant Center due to regional shipping table drift vs. Shopify PDP JSON-LD. Staged CSV patch ready for operator sign-off.',
      artifactType: 'catalog_patch',
      dataPayload: {
        merchantStore: 'Vanguard Outdoor Gear (Shopify Plus)',
        affectedSkus: 38,
        blockedDailyAdSpend: '$1,420/day',
        patchFormat: 'Shopify Bulk Metafield & GMC Supplemental Feed CSV'
      },
      timestamp: '07:15:33',
      status: 'pending'
    },
    {
      id: 'appr-init-3',
      businessId: 'c2',
      botName: 'Gate-10',
      title: 'Fleet Collision Lab: Staging Checkout Inventory Oversell Repro (#RACE-409)',
      summary: '8 synchronized browser workers clicked "Apply Promo + Complete Order" within a 45ms window on client staging URL. 3 workers bypassed stock decrement lock. Trace bundle ready.',
      artifactType: 'collision_trace',
      dataPayload: {
        targetEnvironment: 'https://staging-checkout.acmesaas.io',
        concurrentWorkers: 8,
        timingSkewMs: 42,
        defectClass: 'Double-Spend / Inventory Oversell Under Race Condition',
        playwrightHarAttached: true
      },
      timestamp: '08:02:19',
      status: 'pending'
    },
    {
      id: 'appr-init-4',
      businessId: 'c3',
      botName: 'FormPrep-01',
      title: 'Municipal Bid Packet Submit Gate: Hamilton County Public Works ($38,500)',
      summary: 'Pre-filled vendor compliance forms for $38,500 annex painting RFP. Bonding & COI attached. Gate: Mandatory human officer signature.',
      artifactType: 'bid_package',
      dataPayload: {
        jurisdiction: 'Hamilton County, OH',
        contractId: 'RFP-2026-084B',
        bondingLimitVerified: true,
        requiresOfficerSignature: true
      },
      timestamp: '08:19:44',
      status: 'pending'
    }
  ]);

  const pendingCount = approvalItems.filter((i) => i.status === 'pending').length;

  const handleApprove = (id: string) => {
    setApprovalItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item))
    );
  };

  const handleReject = (id: string) => {
    setApprovalItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item))
    );
  };

  const handleUpdateVerdict = (id: string, verdict: any, autoApprove?: boolean) => {
    setApprovalItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              jevAiVerdict: verdict,
              status: autoApprove ? 'approved' : item.status
            }
          : item
      )
    );
  };

  const handleAddApprovalItem = (item: ApprovalItem) => {
    setApprovalItems((prev) => [item, ...prev]);
  };

  const handleAddSampleItem = () => {
    const newItem: ApprovalItem = {
      id: `appr-sample-${Date.now()}`,
      businessId: 'c3',
      botName: 'HoldGate-08',
      title: 'Seat Sniper Slot Lock: City of Austin Commercial Electrical Final Inspection',
      summary: 'Cancelled inspection slot detected at 06:03:11 AM CST (11 days earlier than general queue). Slot held in staging session awaiting GC confirmation.',
      artifactType: 'slot_hold',
      dataPayload: {
        portal: 'Austin AB+C Permit Portal',
        permitNumber: '2026-094812-EL',
        originalDate: '2026-11-14',
        snipedDate: '2026-11-03 (09:00 AM)',
        daysSaved: 11
      },
      timestamp: new Date().toLocaleTimeString(),
      status: 'pending'
    };
    setApprovalItems((prev) => [newItem, ...prev]);
  };

  const handleExportAll = () => {
    let masterDoc = `# DECAFLEET OS: MASTER OPERATIONAL BLUEPRINT & TRI-CHAMPIONSHIP SYNTHESIS
Document ID: AUDIT-DECAFLEET-2026-10-21-REV2
Platform: 10 Persistent Cloud Browser Agents | Max Concurrency: 38,400 min/mo (8 lanes) / 4,800 min/mo (Single-Pointer Fallback) | Operator Budget: 20 Hours/Week | Capital: $0-$300

================================================================================
SECTION 0A: COMPETITION TRIBUNAL SCORECARD (7 CONTENDERS)
================================================================================
${TRIBUNAL_CONTENDERS.map((t) => `- #${t.rank} ${t.name} (${t.artifactFile}) | Score: ${t.totalScore}/100 | Badge: ${t.placementBadge}\n  Breakthrough: ${t.coreBreakthrough}`).join('\n\n')}

================================================================================
SECTION 0B: CANDIDATE SCORING MATRIX (12 PROVEN + 12 CONTRARIAN)
================================================================================
${CANDIDATE_IDEAS.map((c) => `- [${c.code}] ${c.name} (${c.category.toUpperCase()}) | Total: ${c.total}/35 | Status: ${c.statusRationale}`).join('\n')}

================================================================================
THE 6 TRI-CHAMPIONSHIP BUSINESS HANDBOOKS
================================================================================
`;

    BUSINESS_HANDBOOKS.forEach((hb) => {
      masterDoc += `
--------------------------------------------------------------------------------
${hb.code}: ${hb.name} (${hb.label})
Thesis: ${hb.oneLineThesis}
Confidence: ${hb.confidence}

1. Mechanism: ${hb.whyThisMakesMoney.mechanism}
2. Why Now: ${hb.whyNow}
3. Buyer: ${hb.buyer.icp} | Search: ${hb.buyer.whereToFind.searchString}
4. Pricing: Entry (${hb.offerAndPricing.entry.price}) | Core (${hb.offerAndPricing.core.price}) | Expansion (${hb.offerAndPricing.expansion.price})
5. Unit Economics: Core ${hb.unitEconomics.price} | Margin ${hb.unitEconomics.grossMarginPercent} | Cost ${hb.unitEconomics.costPerClient}
6. Cold Outreach Pitch:
   Subject: ${hb.first5Sales.coldPitch.subject}
   Body: ${hb.first5Sales.coldPitch.body}
--------------------------------------------------------------------------------
`;
    });

    masterDoc += `
================================================================================
SECTION 18: 4-STAGE ULTIMATE DECAFLEET-OS EXECUTION MASTER PLAN
================================================================================
1. Stage 1 (Days 1–14): Sub Radar (C1 - Ara Grok) — Zero-login public state licensing boards (CSLB, TDLR, DBPR). $149 40-Sub Roster Audit -> $399/mo retainer.
2. Stage 2 (Days 15–30): Trade Map Desk (P1 - Ara Grok) — Zero-CAC cross-sell to the exact same GC & commercial trade buyers (+$449/mo) + Claude P3 $75 No-Login Funnel Audits.
3. Stage 3 (Days 31–60): Catalog Exception Desk (P2 - GPT_Buiness) — Corporate e-commerce feed & merchandising exception desk ($1,000/mo Core).
4. Stage 4 (Day 60+): Hermes + Stagehand + DBOS Stack + Fleet Collision Lab (C2 - $1,800/mo) + Seat Sniper (C3 - $400/mo).
`;

    const blob = new Blob([masterDoc], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DecaFleet_OS_TriChampionship_Master_Blueprint.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSelectBusinessFromMatrix = (id: string) => {
    setSelectedBusinessId(id);
    setActiveTab('handbooks');
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans">
      {/* 3-Zone Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingApprovalsCount={pendingCount}
        onExportAll={() => setIsExportModalOpen(true)}
      />

      {/* Antigravity & Blueprint Export Modal */}
      <AntigravityExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        selectedBusinessId={selectedBusinessId}
        onExportMasterBlueprint={handleExportAll}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'tribunal' && (
          <TribunalAuditView
            onSelectBusiness={handleSelectBusinessFromMatrix}
            onAddApprovalItem={handleAddApprovalItem}
            onNavigateToApprovals={() => setActiveTab('approvals')}
          />
        )}

        {activeTab === 'handbooks' && (
          <HandbookDetailView
            selectedBusinessId={selectedBusinessId}
            onSelectBusiness={setSelectedBusinessId}
          />
        )}

        {activeTab === 'fleet' && (
          <FleetConsoleView
            selectedBusinessId={selectedBusinessId}
            onSelectBusiness={setSelectedBusinessId}
            onAddApprovalItem={handleAddApprovalItem}
          />
        )}

        {activeTab === 'approvals' && (
          <ApprovalGateView
            items={approvalItems}
            onApprove={handleApprove}
            onReject={handleReject}
            onAddSampleItem={handleAddSampleItem}
            onUpdateVerdict={handleUpdateVerdict}
          />
        )}

        {activeTab === 'economics' && <EconomicsModelerView />}

        {activeTab === 'matrix' && (
          <CandidateMatrixView onSelectBusiness={handleSelectBusinessFromMatrix} />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioRoadmapView onSelectBusiness={handleSelectBusinessFromMatrix} />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">DecaFleet OS</span>
            <span aria-hidden="true">·</span>
            <span>AUDIT-DECAFLEET-2026-10-21-REV2 Tri-Championship Synthesis</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>38,400 Browser-Min/Mo (8 Lanes)</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Login Public Registry Wedge</span>
            <span aria-hidden="true">·</span>
            <span>Hermes + Stagehand + DBOS Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
