import React, { useState } from 'react';
import { ApprovalItem } from '../types/index.ts';
import { 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock, 
  FileCheck, 
  Send, 
  MessageSquare, 
  Smartphone, 
  PlusCircle, 
  Check 
} from 'lucide-react';

interface ApprovalGateViewProps {
  items: ApprovalItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onAddSampleItem: () => void;
}

export const ApprovalGateView: React.FC<ApprovalGateViewProps> = ({
  items,
  onApprove,
  onReject,
  onAddSampleItem
}) => {
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [smsInput, setSmsInput] = useState('849201');

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const pendingCount = items.filter((i) => i.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-900">Operator Firewall</span>
              <span aria-hidden="true">·</span>
              <span>Approval Gating Protocol</span>
              <span aria-hidden="true">·</span>
              <span>20h/Week Operator Budget</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span>Human Approval Gate Inbox ({pendingCount} Action{pendingCount === 1 ? '' : 's'} Required)</span>
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Bots handle 98% of the browser labour. Critical external actions—signing contracts, submitting bids, resolving client 2FA/SMS, and sending cold outbound—halt here for mandatory human sign-off.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onAddSampleItem}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Simulate Inbound Gate</span>
            </button>
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            {(['pending', 'approved', 'rejected', 'all'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 font-medium rounded capitalize cursor-pointer ${
                  filter === tab
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
                {tab === 'pending' && pendingCount > 0 && (
                  <span className="ml-1.5 text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400">
            Showing {filteredItems.length} gate record{filteredItems.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Main Grid: List and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Items List */}
        <div className="lg:col-span-1 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-slate-500 space-y-2">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
              <div className="text-sm font-semibold text-slate-900">Queue is Clear</div>
              <p className="text-xs text-slate-500">
                All external bot actions have been inspected and released. Fleet is operating autonomously.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const typeIcon = {
                sms_verification: Smartphone,
                email_draft: MessageSquare,
                bid_package: FileCheck,
                legal_dispute: ShieldAlert,
                review_response: MessageSquare,
                lead_batch: Send,
              }[item.artifactType] || FileCheck;
              const Icon = typeIcon;

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50 shadow-xs ring-1 ring-slate-900'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-slate-600" />
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {item.botName}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                      item.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : item.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-900 line-clamp-1 mb-1">
                    {item.title}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{item.timestamp}</span>
                    <span className="capitalize">{item.artifactType.replace('_', ' ')}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Item Inspection & Action Panel */}
        <div className="lg:col-span-2">
          {selectedItem ? (
            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-xs">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-mono font-bold text-slate-900">{selectedItem.botName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{selectedItem.artifactType.replace('_', ' ')}</span>
                    <span aria-hidden="true">·</span>
                    <span>Received: {selectedItem.timestamp}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {selectedItem.title}
                  </h2>
                </div>

                {selectedItem.status === 'pending' && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onReject(selectedItem.id);
                        setSelectedItem((prev) => prev ? { ...prev, status: 'rejected' } : null);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject &amp; Abort</span>
                    </button>
                    <button
                      onClick={() => {
                        onApprove(selectedItem.id);
                        setSelectedItem((prev) => prev ? { ...prev, status: 'approved' } : null);
                      }}
                      className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Approve &amp; Dispatch</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Status Banner */}
              {selectedItem.status !== 'pending' && (
                <div className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                  selectedItem.status === 'approved'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {selectedItem.status === 'approved' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  )}
                  <span>This item has been {selectedItem.status.toUpperCase()} by the operator.</span>
                </div>
              )}

              {/* Artifact Inspection Body */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Artifact Verification Details
                </span>

                {selectedItem.artifactType === 'sms_verification' && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                    <div className="text-xs text-slate-700">
                      <strong>Client SMS 2FA Challenge:</strong> The directory portal sent a one-time verification code to the client's registered dispatch mobile number.
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-semibold text-slate-900">
                        Received SMS Code:
                      </label>
                      <input
                        type="text"
                        value={smsInput}
                        onChange={(e) => setSmsInput(e.target.value)}
                        className="font-mono text-sm font-bold bg-white border border-slate-300 rounded px-3 py-1 w-32 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                      <span className="text-xs text-slate-500">Auto-filled from client forward</span>
                    </div>
                  </div>
                )}

                {selectedItem.artifactType === 'bid_package' && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                    <div className="font-semibold text-slate-900">
                      Subcontract Compliance Specification Summary:
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Hamilton County Public Works: Interior Repainting Annex 3. Bonding limit required: $50,000. Prevailing wage documentation attached. Client W-9 and Certificate of Insurance injected into form fields.
                    </p>
                    <div className="pt-2 text-amber-900 font-medium">
                      Operator Sign-off Gate: Confirming client licenses are valid in Ohio before clicking digital submission.
                    </div>
                  </div>
                )}

                {selectedItem.artifactType === 'legal_dispute' && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                    <div className="font-semibold text-slate-900">
                      Trademark Infringement Evidence Dossier:
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Captured at 03:14:22 AM in Dallas, TX. Affiliate ID: #8491. Redirect chain: Google Ad -&gt; bit.ly/promo -&gt; cake-network.com/aff_c -&gt; Target Brand Homepage.
                    </p>
                    <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-slate-800">
                      SHA-256 Checksum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </div>
                  </div>
                )}

                {/* Raw JSON Payload */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-500">
                    Bot IPC Payload Snapshot:
                  </span>
                  <pre className="p-3 bg-slate-950 text-slate-200 rounded-lg font-mono text-xs overflow-x-auto">
                    {JSON.stringify(selectedItem.dataPayload, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-12 text-center text-slate-500">
              <Eye className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-700">Select an Item to Inspect</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Choose any pending gate approval item from the list to review the artifact, verify compliance, and release the bot fleet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
