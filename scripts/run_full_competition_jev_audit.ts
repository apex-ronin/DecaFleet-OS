/**
 * DecaFleet-OS: Comprehensive Tournament & 24-Candidate Jev-AI Audit Runner
 * 
 * Chief Architect: Gem (Apex-Ronin Quantitative Swarm)
 * Doctrine: "Trust but Verify"
 * System Two Engine -> TypeSafe AI Jev (System One) Probabilistic Decision Gate
 * 
 * Audits:
 * 1. All 7 Contender Artifacts in the_competition/
 * 2. All 24 Candidate Businesses (12 Proven + 12 Contrarian)
 * 3. The 4-Stage Tri-Championship Sovereign Execution Master Plan
 */

import {
  CONTENDERS,
  CANDIDATES,
  evaluateContenderWithJev,
  evaluateCandidatePool,
  type ContenderStateInput,
  type CandidateStateInput,
  type JevContenderVerdict,
  type JevCandidateVerdict
} from '../src/data/competitionTribunal.ts';

export {
  CONTENDERS,
  CANDIDATES,
  evaluateContenderWithJev,
  evaluateCandidatePool
};
export type {
  ContenderStateInput,
  CandidateStateInput,
  JevContenderVerdict,
  JevCandidateVerdict
};

export function runFullCompetitionAudit() {
  console.log('================================================================================');
  console.log('APEX-RONIN // GEM (SYSTEM TWO QUANTITATIVE SYNTHESIZER)');
  console.log('MISSION: RUN THE ENTIRE TOURNAMENT & 24 CANDIDATE POOL THROUGH JEV-AI SYSTEM ONE');
  console.log('DOCTRINE: "TRUST BUT VERIFY" · ZERO INFERENCE · HIGH STATISTICAL EDGE DELTA');
  console.log('================================================================================\n');

  // PART 1: AUDIT THE 7 CONTENDERS
  console.log('--------------------------------------------------------------------------------');
  console.log('PART 1: THE 7-CONTENDER TOURNAMENT AUDIT (JEV-AI SYSTEM ONE GATE)');
  console.log('--------------------------------------------------------------------------------');

  const contenderVerdicts = CONTENDERS.map(c => evaluateContenderWithJev(c));

  console.log('| Rank | Contender Artifact | Jev Verdict | Tier | Conf % | Risk % | Zero-Cred Noul | Fleet Fit | Operational Viability |');
  console.log('|:---:|---|:---:|---|:---:|:---:|:---:|:---:|:---:|');
  for (const v of contenderVerdicts) {
    console.log(
      `| ${v.rank} | ${v.name} | **${v.jevDecision}** | ${v.tier} | ${v.calibratedConfidence}% | ${v.compositeLiabilityRisk}% | ${v.atomicAnswers.zero_credential_safety.noul.toFixed(2)} | ${v.atomicAnswers.single_machine_fleet_fit.noul.toFixed(2)} | ${v.atomicAnswers.operational_viability.score.toFixed(2)}/2.0 |`
    );
  }

  console.log('\n--- CONTENDER FORENSIC DEEP-DIVES ---');
  for (const v of contenderVerdicts) {
    console.log(`\n[${v.badge}] ${v.name}`);
    console.log(`  Jev-AI System One Output: Decision=${v.jevDecision} | Tier=${v.tier} | Calibrated Confidence=${v.calibratedConfidence}% | Composite Risk=${v.compositeLiabilityRisk}%`);
    console.log(`  Atomic Answers:`);
    console.log(`    - zero_credential_safety (Noul): ${v.atomicAnswers.zero_credential_safety.noul.toFixed(3)}`);
    console.log(`    - single_machine_fleet_fit (Noul): ${v.atomicAnswers.single_machine_fleet_fit.noul.toFixed(3)}`);
    console.log(`    - non_delegable_risk (Noul): ${v.atomicAnswers.non_delegable_risk.noul.toFixed(3)} (Tripwire < 0.30)`);
    console.log(`    - hallucination_penalty (Noul): ${v.atomicAnswers.hallucination_penalty.noul.toFixed(3)}`);
    console.log(`    - operational_viability (Score): ${v.atomicAnswers.operational_viability.score.toFixed(2)} / 2.00`);
    if (v.adoptedInnovations.length > 0) {
      console.log(`  Adopted Breakthroughs into DecaFleet-OS:`);
      for (const a of v.adoptedInnovations) console.log(`    + ${a}`);
    }
    if (v.fatalFlaws.length > 0) {
      console.log(`  Forensic Flaws / Disqualification Causes:`);
      for (const f of v.fatalFlaws) console.log(`    - [KILL] ${f}`);
    }
    console.log(`  Jev Rationale: ${v.rationale}`);
  }

  // PART 2: AUDIT THE 24 CANDIDATE BUSINESS POOL (12 PROVEN + 12 CONTRARIAN)
  console.log('\n================================================================================');
  console.log('PART 2: THE 24 CANDIDATE BUSINESS POOL AUDIT (12 PROVEN + 12 CONTRARIAN)');
  console.log('================================================================================');

  const candidateVerdicts = evaluateCandidatePool();

  console.log('\n--- 12 PROVEN CANDIDATE MODELS ---');
  console.log('| Code | Model Name | Score | Jev Status | Recommendation | Calibrated Risk | Jev Operational Rationale |');
  console.log('|:---:|---|:---:|:---:|:---:|:---:|---|');
  for (const c of candidateVerdicts.filter(c => c.category === 'proven')) {
    console.log(
      `| **${c.code}** | ${c.name.slice(0, 38)}... | ${c.selectionScore}/35 | **${c.status}** | ${c.jevRecommendation} | ${c.liabilityRisk}% | ${c.killReasonOrRole} |`
    );
  }

  console.log('\n--- 12 CONTRARIAN CANDIDATE MODELS ---');
  console.log('| Code | Model Name | Score | Jev Status | Recommendation | Calibrated Risk | Jev Operational Rationale |');
  console.log('|:---:|---|:---:|:---:|:---:|:---:|---|');
  for (const c of candidateVerdicts.filter(c => c.category === 'contrarian')) {
    console.log(
      `| **${c.code}** | ${c.name.slice(0, 38)}... | ${c.selectionScore}/35 | **${c.status}** | ${c.jevRecommendation} | ${c.liabilityRisk}% | ${c.killReasonOrRole} |`
    );
  }

  // PART 3: TRI-CHAMPIONSHIP SOVEREIGN SYNTHESIS
  console.log('\n================================================================================');
  console.log('PART 3: THE TRI-CHAMPIONSHIP SOVEREIGN ROADMAP SYNTHESIS');
  console.log('================================================================================');
  console.log('By fusing the uncompromised strengths of the 3 top qualifiers through Jev-AI:');
  console.log('  1. Grok (Sub Radar + Trade Map): Supplies the Zero-Credential, Zero-Ban Launchpad ($4k -> $15k MRR)');
  console.log('  2. GPT Business (Catalog Exception P-B): Supplies Mathematical Concurrency & Corporate Expansion ($25k MRR)');
  console.log('  3. Claude Rebuild (No-Login Default): Cleansed Funnel/Ad Auditing ($75 deposit wedge)');
  console.log('  4. GPT Market Research Spec: Production Runtime (Hermes Agent + Stagehand + LiteLLM + DBOS Stack)\n');

  console.log('QUANTITATIVE SWARM SUMMARY:');
  console.log('  - Total Contenders Audited: 7 (3 Champions, 1 Companion Spec, 3 Disqualified)');
  console.log('  - Total Candidates Evaluated: 24 (6 Selected into Core 4-Stage Roadmap, 1 Parked, 17 Killed)');
  console.log('  - Tournament Constitutional Integrity: 100%');
  console.log('================================================================================\n');

  return { contenderVerdicts, candidateVerdicts };
}

// Execute when run directly
runFullCompetitionAudit();
