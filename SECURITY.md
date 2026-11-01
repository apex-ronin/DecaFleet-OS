# Security & Constitutional Compliance Policy — DecaFleet-OS

## 1. Zero-Credential / No-Login Architectural Mandate

`DecaFleet-OS` is engineered under a strict **Zero-Credential / No-Login Default**:
- The 10-bot fleet (`bot-01`..`bot-10`) **never** ingests, stores, caches, or transmits client login passwords, session cookies, OAuth refresh tokens, or 2FA codes.
- All automated browser operations (`BoardScout-01..04`) interact exclusively with **100% public government sunshine portals** (`CSLB`, `TDLR`, `DBPR`), public ad/funnel URLs, or client-supplied CSV exports.
- Any workflow encountering an authentication wall, CAPTCHA challenge requiring private credentials, or legally binding signature prompt is automatically intercepted by the **Jev-AI (`jev-latest`) System One Gate** (`non_delegable_boundary.noul >= 0.30` or `zero_login_compliant.noul < 0.80`) and locked in **`TIER_3_HARD_HUMAN_LOCK`**.

---

## 2. Secret & Environment Variable Hygiene

- **Never commit `.env` files.** The repository's [`.gitignore`](./.gitignore) blocks `.env*` while permitting [`.env.example`](./.env.example).
- Required runtime credentials are injected strictly via environment variables:
  - `TYPESAFE_API_KEY` (or alias `JEV_AI_API_KEY`): Authenticates requests to `https://api.typesafe.ai/v1/systemone` (`model: "jev-latest"`).
  - `GEMINI_API_KEY`: Optional secondary fallback key.
- If `TYPESAFE_API_KEY` is omitted in local development or CI, `server.ts` transparently engages its deterministic System One mathematical evaluator so tests and offline dry runs execute safely without leaking external requests.

---

## 3. 3-Tier Human-in-the-Loop Safety Bounds

| Routing Tier | Jev-AI Gate Thresholds | Execution Permission |
| :--- | :--- | :--- |
| **`TIER_1_AUTO_DISPATCH`** | `P >= 0.85`, `blast_radius <= 0.45`, `compositeLiabilityRisk <= 0.15` | Reversible internal staging traces & low-risk slot holds only. |
| **`TIER_2_CO_SIGN`** | `P >= 0.70`, `primary_evidence_verified.noul >= 0.80`, `zero_login_compliant.noul >= 0.80` | Outbound compliance breach alerts & \$149 40-Sub Audit Packets staged for **1-click human operator co-sign**. |
| **`TIER_3_HARD_HUMAN_LOCK`** | `non_delegable_boundary.noul >= 0.30` or `P < 0.60` or `blast_radius > 1.25` | Immediate execution halt; requires manual human operator review and override. |
