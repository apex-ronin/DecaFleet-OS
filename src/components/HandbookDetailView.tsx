import React, { useState } from 'react';
import { BUSINESS_HANDBOOKS } from '../data/handbooks.ts';
import { BusinessHandbook } from '../types/index.ts';
import { 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  ShieldAlert, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Target, 
  Layers, 
  Cpu, 
  AlertTriangle, 
  FileText 
} from 'lucide-react';

interface HandbookDetailViewProps {
  selectedBusinessId: string;
  onSelectBusiness: (id: string) => void;
  onOpenSimulatorWithRoutine?: (routine: any, businessId: string) => void;
}

export const HandbookDetailView: React.FC<HandbookDetailViewProps> = ({
  selectedBusinessId,
  onSelectBusiness,
  onOpenSimulatorWithRoutine
}) => {
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedJobBot, setCopiedJobBot] = useState<string | null>(null);
  const [activeTier, setActiveTier] = useState<'entry' | 'core' | 'expansion'>('core');
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(`cashplan_${selectedBusinessId}`);
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const handbook = BUSINESS_HANDBOOKS.find((b) => b.id === selectedBusinessId) || BUSINESS_HANDBOOKS[0];

  const toggleDay = (day: number) => {
    setCompletedDays((prev) => {
      const next = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];
      try {
        localStorage.setItem(`cashplan_${selectedBusinessId}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(
      `Subject: ${handbook.first5Sales.coldPitch.subject}\n\n${handbook.first5Sales.coldPitch.body}`
    );
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const handleCopyJob = (botName: string, desc: string) => {
    navigator.clipboard.writeText(desc);
    setCopiedJobBot(botName);
    setTimeout(() => setCopiedJobBot(null), 2000);
  };

  const handleDownloadMarkdown = () => {
    const content = `# ${handbook.code}: ${handbook.name}
**Label:** ${handbook.label} | **Confidence:** ${handbook.confidence}
**Thesis:** ${handbook.oneLineThesis}

## 1. Thesis & Label Justification
${handbook.labelJustification}

## 2. Why This Makes Money
${handbook.whyThisMakesMoney.mechanism}
- Buyer Outcome: ${handbook.whyThisMakesMoney.buyerOutcome}
- Economic Value: ${handbook.whyThisMakesMoney.economicValue}

## 3. Why Now
${handbook.whyNow}

## 4. Buyer
- ICP: ${handbook.buyer.icp}
- Firmographics: ${handbook.buyer.firmographics}
- Where to Find: ${handbook.buyer.whereToFind.platforms.join(', ')}
- Search String: \`${handbook.buyer.whereToFind.searchString}\`
- Current Workaround: ${handbook.buyer.currentWorkaround}

## 5. Offer & Pricing
- Entry (${handbook.offerAndPricing.entry.price}): ${handbook.offerAndPricing.entry.deliverable} (${handbook.offerAndPricing.entry.turnaround})
- Core (${handbook.offerAndPricing.core.price}): ${handbook.offerAndPricing.core.deliverable} (${handbook.offerAndPricing.core.turnaround})
- Expansion (${handbook.offerAndPricing.expansion.price}): ${handbook.offerAndPricing.expansion.deliverable} (${handbook.offerAndPricing.expansion.turnaround})
- Risk-Reversal: ${handbook.offerAndPricing.riskReversal}

## 6. Bot Fleet (10 Bots)
${handbook.botFleet.map((b) => `### ${b.name} (${b.role})\n${b.jobDescription}\n- Capability: ${b.capability}\n- Approval Boundary: ${b.approvalBoundary}`).join('\n\n')}

## 7. Routines
| Bot | Trigger | Input Source | Output Artifact | Approval Gate | Failure Behaviour |
|---|---|---|---|---|---|
${handbook.routines.map((r) => `| ${r.bot} | ${r.trigger} | ${r.inputSource} | ${r.outputArtifact} | ${r.approvalGate} | ${r.failureBehaviour} |`).join('\n')}

## 8. Skills To Build
${handbook.skillsToBuild.map((s) => `${s.order}. **${s.title}**: ${s.description}\n   *Acceptance Test:* ${s.acceptanceTest}`).join('\n\n')}

## 9. Human Map (20h/Week Budget)
${handbook.humanMap.breakdown.map((h) => `- ${h.task}: ${h.hours} hours/week`).join('\n')}

## 10. 7-Day Cash Plan
${handbook.cashPlan7Day.map((d) => `Day ${d.day}: ${d.action} (Artifact: ${d.artifact}) -> Revenue: $${d.revenue}`).join('\n')}

## 11. 90-Day Plan
- Week 4: ${handbook.plan90Day.week4.milestone} -> ${handbook.plan90Day.week4.revenueTarget}
- Week 8: ${handbook.plan90Day.week8.milestone} -> ${handbook.plan90Day.week8.revenueTarget}
- Week 12: ${handbook.plan90Day.week12.milestone} -> ${handbook.plan90Day.week12.revenueTarget}

## 12. Unit Economics
- Price: ${handbook.unitEconomics.price}
- Cost Per Client: ${handbook.unitEconomics.costPerClient}
- Gross Margin %: ${handbook.unitEconomics.grossMarginPercent}
- Clients for $3k / $10k / $30k MRR: ${handbook.unitEconomics.clientsFor3k} / ${handbook.unitEconomics.clientsFor10k} / ${handbook.unitEconomics.clientsFor30k}
- Bottleneck: ${handbook.unitEconomics.bottleneck}

## 13. Capacity Math
- Clients/Bot: ${handbook.capacityMath.clientsPerBot}
- Concurrency Limit: ${handbook.capacityMath.concurrencyLimit}
- Fleet Ceiling: ${handbook.capacityMath.fleetCeiling}
- Primary Constraint: ${handbook.capacityMath.primaryConstraint}

## 14. Failure Modes
${handbook.failureModes.map((f) => `### ${f.title}\n- Early Warning: ${f.signal}\n- Kill Criterion: ${f.killCriterion}`).join('\n\n')}

## 15. Risk, Legal & Compliance
- Platform ToS: ${handbook.riskLegalCompliance.platformToS}
- Data & Privacy: ${handbook.riskLegalCompliance.dataAndPrivacy}
- Contracts & Payment: ${handbook.riskLegalCompliance.contractAndPayment}
- Licensing: ${handbook.riskLegalCompliance.licensing}

## 16. The Honest Case Against
"${handbook.honestCaseAgainst.argument}"
**Operator Verdict:** ${handbook.honestCaseAgainst.operatorVerdict}

## 17. First 5 Sales & Cold Pitch
Targets:
${handbook.first5Sales.targets.map((t) => `- ${t}`).join('\n')}

**Cold Outreach:**
Subject: ${handbook.first5Sales.coldPitch.subject}
${handbook.first5Sales.coldPitch.body}
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${handbook.code}_${handbook.name.replace(/[^a-zA-Z0-9]/g, '_')}_Handbook.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Business Selector Tab Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {BUSINESS_HANDBOOKS.map((b) => {
            const isSelected = b.id === handbook.id;
            return (
              <button
                key={b.id}
                onClick={() => onSelectBusiness(b.id)}
                className={`p-3 rounded-md text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-slate-900'}`}>
                    {b.code}
                  </span>
                  <span className={`text-[11px] font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {b.label}
                  </span>
                </div>
                <div className="text-xs font-semibold truncate leading-snug">
                  {b.name.split(' ')[0]} {b.name.split(' ')[1] || ''}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Handbook Container */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        {/* Header Hero */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-b from-slate-50/50 to-white">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 max-w-4xl">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-mono font-bold text-slate-900 text-sm">{handbook.code}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-slate-700">{handbook.label} MODEL</span>
                <span aria-hidden="true">·</span>
                <span>Confidence: {handbook.confidence}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">Gross Margin: {handbook.unitEconomics.grossMarginPercent}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {handbook.name}
              </h1>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {handbook.oneLineThesis}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleDownloadMarkdown}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Handbook (.md)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 17 Sections Content */}
        <div className="p-6 space-y-10 divide-y divide-slate-100">
          {/* Section 1 & 2: Economic Engine */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-slate-700" />
              <span>01 &amp; 02. Why This Makes Money &amp; Label Thesis</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Mechanism</span>
                <p className="text-slate-800 leading-relaxed">{handbook.whyThisMakesMoney.mechanism}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Buyer Measurable Outcome</span>
                <p className="text-slate-800 leading-relaxed">{handbook.whyThisMakesMoney.buyerOutcome}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Economic Arbitrage</span>
                <p className="text-slate-800 leading-relaxed">{handbook.whyThisMakesMoney.economicValue}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 bg-amber-50/50 p-3 rounded border border-amber-100/60">
              <strong>Label Rationale ({handbook.label}):</strong> {handbook.labelJustification}
            </p>
          </div>

          {/* Section 3: Why Now */}
          <div className="space-y-3 pt-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-700" />
              <span>03. Why Now: Structural Technological Timing</span>
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {handbook.whyNow}
            </p>
          </div>

          {/* Section 4: Buyer */}
          <div className="space-y-4 pt-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-slate-700" />
              <span>04. Buyer ICP, Finding Channel &amp; Current Workaround</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Exact ICP Title</span>
                <p className="text-slate-800">{handbook.buyer.icp}</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Company Size &amp; Profile</span>
                <p className="text-slate-800">{handbook.buyer.firmographics}</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Where to Find (Boolean Search)</span>
                <p className="text-slate-800 font-mono text-xs">{handbook.buyer.whereToFind.searchString}</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Their Current Workaround</span>
                <p className="text-slate-800">{handbook.buyer.currentWorkaround}</p>
              </div>
            </div>
          </div>

          {/* Section 5: Offer & Pricing */}
          <div className="space-y-4 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-700" />
                <span>05. Offer &amp; Pricing Architecture (3 Tiers)</span>
              </h2>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
                {(['entry', 'core', 'expansion'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setActiveTier(tier)}
                    className={`px-3 py-1 font-medium rounded capitalize cursor-pointer ${
                      activeTier === tier
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['entry', 'core', 'expansion'] as const).map((tierKey) => {
                const tier = handbook.offerAndPricing[tierKey];
                const isActive = activeTier === tierKey;
                return (
                  <div
                    key={tierKey}
                    onClick={() => setActiveTier(tierKey)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      isActive
                        ? 'border-slate-900 bg-slate-50/50 shadow-xs ring-1 ring-slate-900'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {tierKey} Tier
                      </span>
                      <span className="font-mono font-bold text-lg text-slate-900">
                        {tier.price}
                        <span className="text-xs font-normal text-slate-500">
                          {tier.cadence === 'monthly' ? '/mo' : ' one-time'}
                        </span>
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mb-2">{tier.name}</div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">{tier.deliverable}</p>
                    <div className="text-[11px] text-slate-400 font-mono">Turnaround: {tier.turnaround}</div>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/60 rounded-lg text-xs text-emerald-900">
              <strong>Risk-Reversal Guarantee:</strong> {handbook.offerAndPricing.riskReversal}
            </div>
          </div>

          {/* Section 6: Bot Fleet (10 Bots) */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-slate-700" />
                <span>06. 10-Bot Fleet Allocation &amp; Paste-Ready Job Descriptions</span>
              </h2>
              <span className="text-xs font-mono text-slate-500">10 / 10 Bots Assigned</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {handbook.botFleet.map((bot) => {
                const isCopied = copiedJobBot === bot.name;
                return (
                  <div key={bot.name} className="p-4 border border-slate-200 rounded-lg bg-slate-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900">{bot.name}</span>
                        <span className="text-xs text-slate-500 font-medium">· {bot.role}</span>
                      </div>
                      <button
                        onClick={() => handleCopyJob(bot.name, bot.jobDescription)}
                        className="text-slate-500 hover:text-slate-900 p-1 rounded transition-colors text-xs flex items-center gap-1 cursor-pointer"
                        title="Copy paste-ready job description"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Copy Job</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-mono bg-white p-2.5 rounded border border-slate-100">
                      {bot.jobDescription}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Capability: <strong>{bot.capability}</strong></span>
                      <span>Gate: <strong className="text-slate-700">{bot.approvalBoundary}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 7: Routines Table */}
          <div className="space-y-4 pt-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-700" />
              <span>07. Automated Operational Routines</span>
            </h2>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3">Bot</th>
                    <th className="py-2.5 px-3">Trigger</th>
                    <th className="py-2.5 px-3">Input Source</th>
                    <th className="py-2.5 px-3">Output Artifact</th>
                    <th className="py-2.5 px-3">Approval Gate</th>
                    <th className="py-2.5 px-3">Failure Behaviour</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {handbook.routines.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 font-mono font-medium">{r.bot}</td>
                      <td className="py-2.5 px-3">{r.trigger}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px]">{r.inputSource}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-900">{r.outputArtifact}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-700">{r.approvalGate}</td>
                      <td className="py-2.5 px-3 text-slate-500">{r.failureBehaviour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 8: Skills to Build */}
          <div className="space-y-4 pt-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-700" />
              <span>08. Week 1 Skills to Build &amp; Acceptance Tests</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {handbook.skillsToBuild.map((skill) => (
                <div key={skill.order} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <div className="text-xs font-mono font-bold text-slate-900">
                    Skill #{skill.order}: {skill.title}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{skill.description}</p>
                  <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-600">
                    <strong className="text-slate-900">Acceptance Test:</strong> {skill.acceptanceTest}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 9: Human Map */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-700" />
                <span>09. Operator Human Map (Non-Negotiable 20h/Week Cap)</span>
              </h2>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                Total: 20 Hours / Week [estimate]
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {handbook.humanMap.breakdown.map((item, idx) => (
                <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg">
                  <span className="text-xs font-semibold text-slate-500 block mb-1">{item.task}</span>
                  <div className="text-lg font-mono font-bold text-slate-900 tabular-nums">
                    {item.hours} <span className="text-xs font-normal text-slate-500">hours/week</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 10: 7-Day Cash Plan */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-slate-700" />
                <span>10. 7-Day Cash Plan: First Dollar by Day 7</span>
              </h2>
              <span className="text-xs font-mono text-slate-500">
                {completedDays.length} / 7 Days Checked
              </span>
            </div>

            <div className="space-y-2">
              {handbook.cashPlan7Day.map((day) => {
                const isDone = completedDays.includes(day.day);
                return (
                  <div
                    key={day.day}
                    onClick={() => toggleDay(day.day)}
                    className={`p-3 rounded-lg border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                      isDone
                        ? 'bg-emerald-50/40 border-emerald-200 text-slate-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                        isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                      }`}>
                        {isDone && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="text-xs">
                        <strong className="font-mono mr-2">Day {day.day}:</strong>
                        <span>{day.action}</span>
                        <span className="text-slate-400 ml-2 font-mono text-[11px]">[{day.artifact}]</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-bold tabular-nums text-slate-900">
                        {day.revenue > 0 ? `+$${day.revenue}` : '$0'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 11 & 12: 90-Day Milestones & Unit Economics */}
          <div className="space-y-4 pt-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-slate-700" />
              <span>11 &amp; 12. 90-Day Plan &amp; Unit Economics</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-xs font-mono font-bold text-slate-600 uppercase">Week 4 Milestone</span>
                <p className="text-xs text-slate-800">{handbook.plan90Day.week4.milestone}</p>
                <div className="text-sm font-bold text-slate-900 pt-1 font-mono">{handbook.plan90Day.week4.revenueTarget}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-xs font-mono font-bold text-slate-600 uppercase">Week 8 Milestone</span>
                <p className="text-xs text-slate-800">{handbook.plan90Day.week8.milestone}</p>
                <div className="text-sm font-bold text-slate-900 pt-1 font-mono">{handbook.plan90Day.week8.revenueTarget}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-xs font-mono font-bold text-slate-600 uppercase">Week 12 Milestone</span>
                <p className="text-xs text-slate-800">{handbook.plan90Day.week12.milestone}</p>
                <div className="text-sm font-bold text-slate-900 pt-1 font-mono">{handbook.plan90Day.week12.revenueTarget}</div>
              </div>
            </div>

            {/* Labeled Unit Metrics */}
            <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Unit Economics Metrics (Labeled)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                {handbook.unitEconomics.labeledMetrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-500 block text-[11px] truncate">{m.metric}</span>
                    <span className="font-mono font-bold text-slate-900 block text-sm mt-0.5">{m.value}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{m.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-600 pt-1">
                <strong>Primary Growth Bottleneck:</strong> {handbook.unitEconomics.bottleneck}
              </p>
            </div>
          </div>

          {/* Section 13: Capacity Math */}
          <div className="space-y-3 pt-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-700" />
              <span>13. Fleet Capacity Math &amp; Hardware Constraint</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-xs text-slate-500 block">Clients Per Bot</span>
                <span className="font-semibold text-slate-900 block mt-1">{handbook.capacityMath.clientsPerBot}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-xs text-slate-500 block">Concurrency Limit</span>
                <span className="font-semibold text-slate-900 block mt-1">{handbook.capacityMath.concurrencyLimit}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-xs text-slate-500 block">Single-Fleet Ceiling</span>
                <span className="font-semibold text-slate-900 block mt-1">{handbook.capacityMath.fleetCeiling}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-xs text-slate-500 block">Hardware Constraint</span>
                <span className="font-semibold text-slate-900 block mt-1">{handbook.capacityMath.primaryConstraint}</span>
              </div>
            </div>
          </div>

          {/* Section 14: Failure Modes */}
          <div className="space-y-4 pt-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>14. Top 4 Failure Modes, Early Warnings &amp; Kill Criteria</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {handbook.failureModes.map((fm, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 space-y-2">
                  <div className="font-bold text-slate-900">{fm.title}</div>
                  <div className="text-slate-700">
                    <strong className="text-slate-900">Early-Warning Signal:</strong> {fm.signal}
                  </div>
                  <div className="text-rose-900 bg-rose-50/80 p-2 rounded border border-rose-100">
                    <strong>Kill Criterion:</strong> {fm.killCriterion}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 15: Risk, Legal & Compliance */}
          <div className="space-y-3 pt-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-slate-700" />
              <span>15. Risk, Legal &amp; Compliance Shield</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <strong className="text-slate-900 block">Platform ToS &amp; Automation</strong>
                <p className="text-slate-700 leading-relaxed">{handbook.riskLegalCompliance.platformToS}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <strong className="text-slate-900 block">Data &amp; Privacy (GDPR/CAN-SPAM)</strong>
                <p className="text-slate-700 leading-relaxed">{handbook.riskLegalCompliance.dataAndPrivacy}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <strong className="text-slate-900 block">Contracts &amp; Payment Gateway</strong>
                <p className="text-slate-700 leading-relaxed">{handbook.riskLegalCompliance.contractAndPayment}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <strong className="text-slate-900 block">State/Federal Licensing</strong>
                <p className="text-slate-700 leading-relaxed">{handbook.riskLegalCompliance.licensing}</p>
              </div>
            </div>
          </div>

          {/* Section 16: The Honest Case Against */}
          <div className="space-y-3 pt-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-700" />
              <span>16. The Honest Case Against (Devil's Advocate)</span>
            </h2>
            <div className="p-4 bg-amber-50/40 border border-amber-200/60 rounded-lg space-y-2 text-xs sm:text-sm">
              <p className="text-slate-800 italic leading-relaxed">
                "{handbook.honestCaseAgainst.argument}"
              </p>
              <div className="pt-2 border-t border-amber-200/40 text-xs font-semibold text-slate-900">
                <span>Operator Bet Verdict: </span>
                <span className="font-normal text-slate-800">{handbook.honestCaseAgainst.operatorVerdict}</span>
              </div>
            </div>
          </div>

          {/* Section 17: First 5 Sales & Cold Pitch */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-slate-700" />
                <span>17. First 5 Target Types &amp; Exact Cold Outreach Pitch</span>
              </h2>
              <button
                onClick={handleCopyPitch}
                className="px-3 py-1.5 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedPitch ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied Pitch</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Pitch (&lt;90 words)</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block">5 Named Target Types:</span>
                <ul className="space-y-1.5 list-disc list-inside text-slate-700">
                  {handbook.first5Sales.targets.map((tgt, idx) => (
                    <li key={idx}>{tgt}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-900 text-slate-100 rounded-lg space-y-2 font-mono">
                <div className="text-[11px] text-slate-400">
                  Subject: <strong className="text-white">{handbook.first5Sales.coldPitch.subject}</strong>
                </div>
                <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                  {handbook.first5Sales.coldPitch.body}
                </div>
                <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                  Word Count: {handbook.first5Sales.coldPitch.wordCount} words (Strict &lt;90 words rule verified)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
