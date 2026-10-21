import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { HandbookDetailView } from './components/HandbookDetailView.tsx';
import { FleetConsoleView } from './components/FleetConsoleView.tsx';
import { ApprovalGateView } from './components/ApprovalGateView.tsx';
import { EconomicsModelerView } from './components/EconomicsModelerView.tsx';
import { CandidateMatrixView } from './components/CandidateMatrixView.tsx';
import { PortfolioRoadmapView } from './components/PortfolioRoadmapView.tsx';
import { AntigravityExportModal } from './components/AntigravityExportModal.tsx';
import { BUSINESS_HANDBOOKS } from './data/handbooks.ts';
import { CANDIDATE_IDEAS } from './data/candidates.ts';
import { ApprovalItem } from './types/index.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('handbooks');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('p2'); // Default to P2 (IntentPipe - Start with this)
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Seed sample initial approval items that demonstrate the human boundary
  const [approvalItems, setApprovalItems] = useState<ApprovalItem[]>([
    {
      id: 'appr-init-1',
      businessId: 'p1',
      botName: 'Claim-02',
      title: 'SMS 2FA Code Forward: Manta Directory Verification',
      summary: 'Directory portal sent an SMS challenge to the client dispatch number. Code 849201 entered. Awaiting operator approval to push submission.',
      artifactType: 'sms_verification',
      dataPayload: {
        portalUrl: 'https://manta.com/claim/account_id=9841',
        businessName: 'Apex Emergency Plumbing',
        forwardedCode: '849201',
        timestamp: '19:42:10'
      },
      timestamp: '19:42:10',
      status: 'pending'
    },
    {
      id: 'appr-init-2',
      businessId: 'p2',
      botName: 'Delivery-01',
      title: 'Outbound Batch Release: 14 HubSpot Admin Accounts',
      summary: 'Verified 14 mid-market accounts hiring for HubSpot Admins this morning. Custom 2-sentence icebreakers generated. Gate: Operator quality check.',
      artifactType: 'lead_batch',
      dataPayload: {
        batchSize: 14,
        averageConfidence: '98.2%',
        exportDestination: 'Client HubSpot Pipeline (API)',
        firstLeadSample: 'VP Sales at StackLogic Inc.'
      },
      timestamp: '18:15:33',
      status: 'pending'
    },
    {
      id: 'appr-init-3',
      businessId: 'c1',
      botName: 'FormPrep-01',
      title: 'Municipal Bid Packet Submit Gate: Hamilton County Public Works',
      summary: 'Pre-filled vendor compliance forms for $35,000 interior annex painting. Insurance certs attached. Gate: Operator signature authorization.',
      artifactType: 'bid_package',
      dataPayload: {
        jurisdiction: 'Hamilton County, OH',
        contractId: 'RFP-2026-084B',
        bondingLimitVerified: true,
        estimatedMargin: '48.5%'
      },
      timestamp: '17:30:19',
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

  const handleAddApprovalItem = (item: ApprovalItem) => {
    setApprovalItems((prev) => [item, ...prev]);
  };

  const handleAddSampleItem = () => {
    const newItem: ApprovalItem = {
      id: `appr-sample-${Date.now()}`,
      businessId: 'c2',
      botName: 'Enforce-01',
      title: 'Trademark Cease & Desist Filing: Impact Affiliate #8491',
      summary: 'Detected day-parted bidding on client trademark terms in Dallas, TX at 03:14 AM. Pre-filled network dispute form ready.',
      artifactType: 'legal_dispute',
      dataPayload: {
        network: 'Impact Radius',
        affiliateId: '#8491',
        estimatedClawbackValue: '$4,280.00',
        redirectHops: ['google.com/ad', 'bit.ly/deal', 'targetbrand.com']
      },
      timestamp: new Date().toLocaleTimeString(),
      status: 'pending'
    };
    setApprovalItems((prev) => [newItem, ...prev]);
  };

  const handleExportAll = () => {
    let masterDoc = `# DECAFLEET OS: MASTER OPERATIONAL BLUEPRINT & 6 BUSINESS HANDBOOKS
Platform: 10 Persistent Cloud Browser Agents | Max Concurrency: 10 | Operator Budget: 20 Hours/Week | Capital: $0-$300

================================================================================
SECTION 0: CANDIDATE SCORING MATRIX (12 PROVEN + 12 CONTRARIAN)
================================================================================
${CANDIDATE_IDEAS.map((c) => `- [${c.code}] ${c.name} (${c.category.toUpperCase()}) | Total: ${c.total}/35 | Status: ${c.statusRationale}`).join('\n')}

================================================================================
THE 6 BUSINESS HANDBOOKS
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
SECTION 18: PORTFOLIO ROADMAP (DAY 1 TO MONTH 12)
================================================================================
1. Start with P2 (IntentPipe): Fastest route to Day-7 cash and agency validation.
2. Add C1 (GovDesk) at 90 Days: High-ticket municipal blue ocean with sticky contractor retainers ($1,800/mo).
3. Add C2 (TrafficReclaim) at 6 Months: High-ticket enterprise brand defense ($2,500–$5,000/mo).
`;

    const blob = new Blob([masterDoc], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DecaFleet_OS_Master_Blueprint_6_Handbooks.md`;
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
            <span>6 Autonomous Handbooks &amp; 10-Bot Cloud Control Architecture</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Solo Operator (20h/wk max)</span>
            <span aria-hidden="true">·</span>
            <span>Zero Employees</span>
            <span aria-hidden="true">·</span>
            <span>$30k MRR Target Path</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
