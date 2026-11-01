import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CONTENDERS,
  CANDIDATES,
  evaluateContenderWithJev,
  evaluateCandidatePool
} from '../data/competitionTribunal.ts';

test('Jev-AI Contender Audit evaluates all 7 contenders with calibrated precision', () => {
  assert.equal(CONTENDERS.length, 7);

  const verdicts = CONTENDERS.map((c) => evaluateContenderWithJev(c));
  assert.equal(verdicts.length, 7);

  // 1. GPT Business - Rank 1 (96/100, Champion)
  const gpt = verdicts.find((v) => v.contenderId === 'gpt-business')!;
  assert.ok(gpt);
  assert.equal(gpt.rank, 1);
  assert.equal(gpt.score, 96);
  assert.equal(gpt.jevDecision, 'CHAMPION');
  assert.equal(gpt.tier, 'TIER_1_AUTO_ADOPT');
  assert.ok(gpt.calibratedConfidence >= 95);
  assert.ok(gpt.compositeLiabilityRisk <= 15);
  assert.equal(gpt.atomicAnswers.zero_credential_safety.noul, 0.94);
  assert.ok(gpt.adoptedInnovations.some((i) => i.includes('38,400 min/mo')));

  // 2. Ara - Grok - Rank 2 (95/100, Champion, Most Likely to Succeed)
  const grok = verdicts.find((v) => v.contenderId === 'ara-grok')!;
  assert.ok(grok);
  assert.equal(grok.rank, 2);
  assert.equal(grok.score, 95);
  assert.equal(grok.jevDecision, 'CHAMPION');
  assert.equal(grok.tier, 'TIER_1_AUTO_ADOPT');
  assert.equal(grok.atomicAnswers.zero_credential_safety.noul, 0.99);
  assert.equal(grok.atomicAnswers.single_machine_fleet_fit.noul, 0.98);
  assert.ok(grok.compositeLiabilityRisk < 10);
  assert.equal(grok.fatalFlaws.length, 0);

  // 3. Claude Rebuild - Rank 3 (91/100, Champion)
  const claude = verdicts.find((v) => v.contenderId === 'claude-rebuild')!;
  assert.ok(claude);
  assert.equal(claude.rank, 3);
  assert.equal(claude.score, 91);
  assert.equal(claude.jevDecision, 'CHAMPION');
  assert.equal(claude.tier, 'TIER_2_PROVISIONAL_STAGE');
  assert.ok(claude.adoptedInnovations.some((i) => i.includes('No-Login Default')));

  // 4. GPT Market Research - Rank 4 (100/100 Engineering Spec, Special Stack)
  const tech = verdicts.find((v) => v.contenderId === 'gpt-market-research')!;
  assert.ok(tech);
  assert.equal(tech.rank, 4);
  assert.equal(tech.jevDecision, 'SPECIAL_STACK');
  assert.equal(tech.tier, 'TIER_1_AUTO_ADOPT');
  assert.ok(tech.adoptedInnovations.some((i) => i.includes('Hermes Agent')));

  // 5. Gemini OF - Rank 5 (68/100, Disqualified)
  const gemini = verdicts.find((v) => v.contenderId === 'gemini-of')!;
  assert.ok(gemini);
  assert.equal(gemini.rank, 5);
  assert.equal(gemini.jevDecision, 'DISQUALIFIED');
  assert.equal(gemini.tier, 'TIER_3_HARD_DISQUALIFIED');
  assert.ok(gemini.compositeLiabilityRisk >= 80);
  assert.ok(gemini.fatalFlaws.some((f) => f.includes('Wave Invoicing')));
  assert.ok(gemini.fatalFlaws.some((f) => f.includes('Fatal Hallucination')));

  // 6. GitHub AI - Rank 6 (54/100, Disqualified)
  const github = verdicts.find((v) => v.contenderId === 'github-ai')!;
  assert.ok(github);
  assert.equal(github.rank, 6);
  assert.equal(github.jevDecision, 'DISQUALIFIED');
  assert.ok(github.fatalFlaws.some((f) => f.includes('fingerprinting')));

  // 7. Venice AI - Rank 7 (48/100, Disqualified)
  const venice = verdicts.find((v) => v.contenderId === 'venice-ai')!;
  assert.ok(venice);
  assert.equal(venice.rank, 7);
  assert.equal(venice.jevDecision, 'DISQUALIFIED');
  assert.ok(venice.compositeLiabilityRisk >= 85);
});

test('Jev-AI Candidate Pool filters 24 candidates into 6 Selected, 1 Parked, and 17 Killed', () => {
  assert.equal(CANDIDATES.length, 24);

  const proven = CANDIDATES.filter((c) => c.category === 'proven');
  const contrarian = CANDIDATES.filter((c) => c.category === 'contrarian');
  assert.equal(proven.length, 12);
  assert.equal(contrarian.length, 12);

  const evaluated = evaluateCandidatePool();
  assert.equal(evaluated.length, 24);

  const selected = evaluated.filter((e) => e.status === 'SELECTED');
  const parked = evaluated.filter((e) => e.status === 'PARKED');
  const killed = evaluated.filter((e) => e.status === 'KILLED');

  assert.equal(selected.length, 6);
  assert.equal(parked.length, 1);
  assert.equal(killed.length, 17);

  // Selected 6: P1, P2, P3 and C1, C2, C3
  const selectedCodes = selected.map((s) => s.code).sort();
  assert.deepEqual(selectedCodes, ['C1', 'C2', 'C3', 'P1', 'P2', 'P3']);

  // Parked 1: P4 Amazon Price Memo Scraper
  assert.equal(parked[0].code, 'P4');
  assert.ok(parked[0].killReasonOrRole.includes('Parked'));
  assert.ok(parked[0].killReasonOrRole.includes('Amazon'));

  // Killed 17: All must have non-empty, defensible kill reasons
  for (const k of killed) {
    assert.ok(k.killReasonOrRole.length > 10, `Candidate ${k.code} missing kill reason`);
    assert.ok(k.liabilityRisk >= 50, `Candidate ${k.code} should have elevated liability risk`);
  }

  // Check specific notable kills:
  // C4 (Parcel Watch) killed due to Napa County commercial resale prohibition
  const c4 = killed.find((k) => k.code === 'C4');
  assert.ok(c4);
  assert.ok(c4.killReasonOrRole.includes('Napa County'));

  // C11 (Dead IP) killed due to 6-9 month USPTO examination queue
  const c11 = killed.find((k) => k.code === 'C11');
  assert.ok(c11);
  assert.ok(c11.killReasonOrRole.includes('USPTO'));

  // P8 (Adult 24/7 DM Chatting) killed due to Stripe/Wave bans & 100% human-gate contradiction
  const p8 = killed.find((k) => k.code === 'P8');
  assert.ok(p8);
  assert.ok(p8.killReasonOrRole.includes('human gate') || p8.killReasonOrRole.includes('2FA'));
});
