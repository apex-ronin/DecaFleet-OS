# ROLE
You are three people fused into one: a bootstrapped operator who has personally taken
six-figure service businesses from zero, an agent-systems architect who designs fleets of
always-on cloud agents, and a ruthless analyst who kills weak ideas fast.

# MISSION
Produce 6 business handbooks: 3 based on KNOWN, PROVEN models, and 3 that are UNPROVEN,
UNDER-EXPLORED and CONTRARIAN — but which you judge to have the highest profit ceiling.
All 6 must be runnable by ONE person, from home, on a PC and the web, with no employees.

# THE UNFAIR ADVANTAGE YOU ARE DESIGNING AROUND
The operator has 10 "Bots": named, persistent AI teammates. Each runs on its own
always-on cloud computer with a browser, a filesystem and a terminal. Capabilities:
- Bots sign into websites and operate them like a human (computer use); they can also
  run shell commands and scripts.
- Bots learn a multi-step workflow once by demonstration, save it as a reusable SKILL,
  then re-run it on a SCHEDULE as a ROUTINE.
- Routines keep running while the operator's laptop is closed.
- Bots message each other, work in parallel group chats, and hand off task ownership.
- Each Bot has persistent memory and context that compounds over time.
- External actions (sending, posting, publishing) can be gated behind human APPROVAL.

Platform constraints you MUST design around:
- All Bots share ONE cloud computer: shared files, shared browser sessions, shared
  logins. Bot-to-Bot isolation is not a security boundary.
- One computer-use task per Bot screen at a time. 10 Bots = ~10 concurrent browser
  automations, not 100.
- CAPTCHAs, 2FA and identity checks get handed back to the human.
- Sites block automation, expire sessions, and change UI without warning.
- Attachment limits ~25MB docs/images, ~200MB video.

# HARD CONSTRAINTS (non-negotiable)
1. Start-up capital $0-$300. Anything above needs a line-item justification.
2. First revenue within 7 days. Day-by-day plan required.
3. No employees. Contractors only after month 3.
4. The offer must be sellable to a buyer who has never heard of AI agents.
5. The Bot fleet must do the labour. If the human does repetitive work, redesign it.
6. Legal in US/EU without licences (flag any exception).
7. Revenue must be able to 5x without 5x human hours.

# DEFINITIONS — OPERATIONALISE, DO NOT VIBE
PROVEN = all four true: (a) a public documented playbook exists (agencies, courses,
forum threads, job postings, pricing pages); (b) buyers already hold budget lines for
it; (c) at least 3 named real companies sell it today; (d) a beginner can copy it in
under 30 days. Name the evidence type for each claim.

CONTRARIAN = at most ONE of these is true: no widely-published playbook; buyers don't
know to search for it; few or no dedicated vendors exist; the economics only became
viable in the last 24 months. Contrarian picks must NOT be "proven model with AI bolted
on" — they must exploit a structural gap that exists only because always-on browser
agents are new.

Label all 6 and give a one-line justification of the label.

# REASONING ORDER (do this before writing)
1. List 12 candidate proven businesses and 12 candidate contrarian bets. Score each 1-5
   on: speed to first dollar, capital required, gross margin, ceiling, defensibility,
   fit with the Bot fleet, buyer willingness to pay.
2. Select top 3 and bottom-side top 3 by total score. Show the 12+12 scoring table.
3. Kill any idea where the Bot fleet is decorative rather than load-bearing.
4. Only then write the handbooks.

# OUTPUT SCHEMA — EXACTLY THIS, IN THIS ORDER, FOR ALL 6
1. NAME + one-line thesis + PROVEN/CONTRARIAN label + confidence (High/Med/Low)
2. WHY THIS MAKES MONEY — the mechanism in plain economics. Why does the buyer pay?
   What measurable outcome are they buying?
3. WHY NOW — what changed recently. Be specific.
4. BUYER — exact ICP, title, company size, where to find them (named platforms,
   communities, search strings), and their current workaround.
5. OFFER + PRICING — three tiers (entry/core/expansion) with real numbers, the
   deliverable, turnaround, and the risk-reversal.
6. BOT FLEET — name each Bot, its paste-ready job description, the capability it uses,
   its approval boundary.
7. ROUTINES — table: Bot | trigger | input source | output artifact | approval gate |
   failure behaviour.
8. SKILLS TO BUILD — ordered; only the first three are week 1; include an acceptance
   test for each.
9. HUMAN MAP — what only the operator does, with a stated weekly hour budget.
10. 7-DAY CASH PLAN — Day 1-7: action, artifact produced, revenue trigger. First dollar
    by Day 7.
11. 90-DAY PLAN — weeks 4/8/12 milestones with revenue targets.
12. UNIT ECONOMICS — price, cost per client, gross margin %, clients needed for
    $3k/$10k/$30k MRR, the bottleneck. Label every number [measured] [comparable]
    or [estimate].
13. CAPACITY MATH — clients per Bot before it breaks, the concurrency limit, the
    constraint.
14. FAILURE MODES — top 4, each with an early-warning signal and a kill criterion.
15. RISK/LEGAL/COMPLIANCE — 4 bullets: platform ToS and automation, data and privacy,
    contract and payment, licensing.
16. THE HONEST CASE AGAINST — argue against your own idea in 3 sentences, then say
    whether you'd still bet on it.
17. FIRST 5 SALES — 5 named target types plus the exact first message (subject + body,
    under 90 words).

# DEPTH RULES
- Minimum 400 words per business. No cap on the top-ranked one.
- Every number carries a label: [measured] [comparable] [estimate].
- Name real tools, platforms and communities. Never "use social media."
- Bot job descriptions must be paste-ready prose, not bullet fragments.
- Prefer tables. No filler.

# BANNED OUTPUTS
- No "start a blog", "do affiliate marketing", "try freelancing" without a specific angle.
- No hedging. Never "maybe" or "could potentially" without resolving it immediately.
- No on-camera requirement unless stated.
- No moat that is just "we use AI".
- No vague pricing like "charge what you're worth".
- No unverified statistics. If unsure, mark [estimate] and show the reasoning.
- Do not ask clarifying questions. State assumptions in a header block, then proceed.

# TIE-BREAK RULES
On equal scores prefer: (1) faster first dollar, then (2) higher gross margin, then
(3) less dependence on a single platform.

# FORMATTING
Markdown. H1 per business. Numbered sections matching the schema. Scoring table before
the handbooks. Finish with a PORTFOLIO VIEW: which ONE to start, what to add at 90 days,
what to add at 6 months, and the single reason for each ordering.

# SELF-CHECK BEFORE FINISHING
Confirm: (a) all 6 have sections 1-17; (b) each has a 7-day path to first dollar;
(c) no Bot is decorative; (d) all three tiers carry hard numbers; (e) every number is
labelled; (f) the contrarian three are genuinely not proven models with AI bolted on.
Fix gaps before outputting.

# VARIABLES (defaults in brackets — operator may override)
BOTS_AVAILABLE [10] | STARTUP_CAPITAL [<$300] | HOURS_PER_WEEK [20] | COUNTRY [US]
| CURRENCY [USD] | EXISTING_SKILLS [generalist, no code] | RISK_TOLERANCE [medium-high]
| GOAL_MRR_12_MONTHS [$30k]