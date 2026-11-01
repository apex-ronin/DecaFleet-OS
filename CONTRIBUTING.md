# Contributing & Commit Best Practices — DecaFleet-OS

Thank you for contributing to **DecaFleet-OS**. Because this repository powers a live 10-bot commercial service fleet governed by the **Jev-AI (`jev-latest`) System One Confidence Gate**, all commits must adhere to strict architectural, security, and verification standards.

---

## 1. Pre-Commit Verification Checklist

Before staging or committing any change, run all four verification checks from the repository root:

```bash
# 1. Strict TypeScript static typecheck (zero errors allowed)
npm run lint

# 2. Deterministic Unit Economics & Fleet Capacity math test suite
npm test

# 3. Verify Stage 1 (C1 Sub Radar) 40-Sub Diff & Jev-AI Gate Pipeline
npm run audit:sub-radar

# 4. Inspect git status & diff to ensure no secrets or temp artifacts are staged
git status
```

---

## 2. Commit Message Convention (Conventional Commits)

We follow the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) specification:

```text
<type>(<scope>): <concise imperative summary under 72 chars>

- Bullet 1 explaining what changed and why (file/component/endpoint level)
- Bullet 2 detailing Jev-AI gate, DBOS checkpoint, or schema impact
- Bullet 3 noting verification tests or physical artifacts updated
```

### Allowed `<type>` Values
| Type | When to Use |
| :--- | :--- |
| `feat` | New service stage capability, bot workflow, UI view, or API endpoint |
| `fix` | Bug fix in scraper diff logic, unit economics math, or Jev-AI gate routing |
| `docs` | Updates to `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, or handbooks |
| `refactor` | Code restructuring that does not alter runtime behavior |
| `test` | Adding or updating unit/integration tests in `src/utils/calculator.test.ts` |
| `chore` | Dependency updates, `.gitignore` rules, build scripts, or repo hygiene |

### Common `<scope>` Values
- `stage-1` / `sub-radar` (`C1 Sub Radar` 40-sub compliance pipeline)
- `jev-gate` (`server.ts` Jev-AI `jev-latest` 6-question System One evaluator)
- `fleet-health` (`BotHealthWidget.tsx`, Stagehand self-healing, DBOS checkpoints)
- `handbooks` (`src/data/handbooks.ts` 17-section operator handbooks)
- `economics` (`src/utils/calculator.ts` financial & browser-minute math)
- `repo` (Repository documentation, release notes, and configuration hygiene)

---

## 3. Constitutional Guardrails for Pull Requests

1. **Zero-Credential / No-Login Mandate:** Never introduce code that stores client passwords, session cookies, or 2FA tokens. All scrapers must target public sunshine registries (`CSLB`, `TDLR`, `DBPR`) or client-exported CSVs.
2. **Preserve the 6-Question Jev-AI Schema:** Every outbound artifact routed through `/api/jev-ai/evaluate` must evaluate all 6 atomic questions (`routing_intent`, `non_delegable_boundary`, `primary_evidence_verified`, `zero_login_compliant`, `payload_checksum_valid`, `blast_radius`).
3. **Never Commit Secrets or Ephemeral Scratch Files:** Ensure `.env` and `.aistudio/` remain untracked via [`.gitignore`](./.gitignore). Document any new environment variables in [`.env.example`](./.env.example).
4. **Update `CHANGELOG.md`:** Every feature or architectural commit must include a corresponding entry in [`CHANGELOG.md`](./CHANGELOG.md).
