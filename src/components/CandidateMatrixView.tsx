import React, { useState, useMemo } from 'react';
import { CANDIDATE_IDEAS } from '../data/candidates.ts';
import { CandidateIdea } from '../types/index.ts';
import { CheckCircle2, XCircle, ArrowUpDown, Info, ExternalLink } from 'lucide-react';

interface CandidateMatrixViewProps {
  onSelectBusiness?: (id: string) => void;
}

export const CandidateMatrixView: React.FC<CandidateMatrixViewProps> = ({ onSelectBusiness }) => {
  const [filter, setFilter] = useState<'all' | 'proven' | 'contrarian' | 'selected' | 'killed'>('all');
  const [sortField, setSortField] = useState<keyof CandidateIdea['scores'] | 'total' | 'name'>('total');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredCandidates = useMemo(() => {
    return CANDIDATE_IDEAS.filter((c) => {
      if (filter === 'proven') return c.category === 'proven';
      if (filter === 'contrarian') return c.category === 'contrarian';
      if (filter === 'selected') return c.selected;
      if (filter === 'killed') return !c.selected;
      return true;
    }).sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;

      if (sortField === 'total') {
        valA = a.total;
        valB = b.total;
      } else if (sortField === 'name') {
        valA = a.name;
        valB = b.name;
      } else {
        valA = a.scores[sortField];
        valB = b.scores[sortField];
      }

      if (typeof valA === 'string') {
        return sortAsc
          ? (valA as string).localeCompare(valB as string)
          : (valB as string).localeCompare(valA as string);
      }
      return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [filter, sortField, sortAsc]);

  const handleSort = (field: keyof CandidateIdea['scores'] | 'total' | 'name') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Section 0: Candidate Scoring &amp; Selection Matrix (12 + 12)
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              Ruthless 7-vector scoring across 24 candidate business models (12 Proven, 12 Contrarian).
              Ideas where the 10-Bot browser fleet was merely decorative or sales cycles exceeded 7 days were killed fast.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
            {(['all', 'selected', 'proven', 'contrarian', 'killed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize cursor-pointer ${
                  filter === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'selected' ? 'Top 6 Selected' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs text-slate-600">
          <div><strong className="text-slate-900">SPD:</strong> Speed to 1st $ (5=&lt;7d)</div>
          <div><strong className="text-slate-900">CAP:</strong> Capital Eff. (5=&lt;$50)</div>
          <div><strong className="text-slate-900">MAR:</strong> Margin % (5=&gt;90%)</div>
          <div><strong className="text-slate-900">CEIL:</strong> Ceiling (5=&gt;$50k/mo)</div>
          <div><strong className="text-slate-900">DEF:</strong> Defensibility / Moat</div>
          <div><strong className="text-slate-900">FIT:</strong> Fleet Fit (Browser agent)</div>
          <div><strong className="text-slate-900">WTP:</strong> Willingness to Pay</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
              <tr>
                <th className="py-3 px-4 w-16">Code</th>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-slate-900"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Business Model Candidate</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center cursor-pointer" onClick={() => handleSort('spd')} title="Speed to First Dollar">SPD</th>
                <th className="py-3 px-3 text-center cursor-pointer" onClick={() => handleSort('cap')} title="Capital Efficiency">CAP</th>
                <th className="py-3 px-3 text-center cursor-pointer" onClick={() => handleSort('mar')} title="Gross Margin %">MAR</th>
                <th className="py-3 px-3 text-center cursor-pointer" onClick={() => handleSort('ceil')} title="Profit Ceiling">CEIL</th>
                <th className="py-3 px-3 text-center cursor-pointer" onClick={() => handleSort('def')} title="Defensibility / Moat">DEF</th>
                <th className="py-3 px-3 text-center cursor-pointer" onClick={() => handleSort('fit')} title="Fleet Fit / Browser Load-Bearing">FIT</th>
                <th className="py-3 px-3 text-center cursor-pointer" onClick={() => handleSort('wtp')} title="Buyer Willingness to Pay">WTP</th>
                <th 
                  className="py-3 px-4 text-center cursor-pointer hover:text-slate-900"
                  onClick={() => handleSort('total')}
                >
                  <div className="flex items-center justify-center gap-1 font-bold text-slate-900">
                    <span>Total</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-3 px-4">Status &amp; Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredCandidates.map((candidate) => {
                const isExpanded = expandedId === candidate.id;
                const isSelected = candidate.selected;
                return (
                  <React.Fragment key={candidate.id}>
                    <tr 
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                        isSelected ? 'bg-emerald-50/30' : ''
                      }`}
                      onClick={() => setExpandedId(isExpanded ? null : candidate.id)}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-slate-800">
                        {candidate.code}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">
                        <div className="flex items-center gap-2">
                          {isSelected ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                          <span>{candidate.name}</span>
                          <span className="text-xs text-slate-400 font-normal">
                            · {candidate.category === 'proven' ? 'Proven' : 'Contrarian'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums">{candidate.scores.spd}</td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums">{candidate.scores.cap}</td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums">{candidate.scores.mar}</td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums">{candidate.scores.ceil}</td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums">{candidate.scores.def}</td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums">{candidate.scores.fit}</td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums">{candidate.scores.wtp}</td>
                      <td className="py-3 px-4 text-center font-mono font-bold tabular-nums text-slate-900 bg-slate-50/50">
                        {candidate.total}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-600 max-w-xs truncate">
                        {candidate.statusRationale}
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-slate-50/60">
                        <td colSpan={11} className="p-4 border-t border-slate-200/60">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div className="space-y-1.5">
                              <p className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                                <Info className="w-3.5 h-3.5 text-slate-500" />
                                <span>Analysis &amp; Evaluation Notes</span>
                              </p>
                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
                                {candidate.statusRationale}
                              </p>
                            </div>
                            {isSelected && onSelectBusiness && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectBusiness(candidate.id);
                                }}
                                className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                              >
                                <span>Open Full Handbook</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
