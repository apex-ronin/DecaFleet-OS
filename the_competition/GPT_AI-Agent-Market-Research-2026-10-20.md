# Persistent AI workers: market research and modular build recommendation

Prepared for Jay • October 20, 2026 • Research and design assessment

**The strongest path is to configure an existing agent platform and add a small number of replaceable services.** My first evaluation candidate is Hermes Agent, followed by NanoClaw. Keep nanobot as the simpler Python alternative and Agent Zero as the desktop-focused alternative. A custom agent engine should be justified by a measured failure of those candidates.

This updates the earlier suggestion that nanobot was the obvious starting point. Hermes currently documents a named-bot roster, per-bot profiles, direct bot messages, group chats, routines, and a desktop interface. Those features substantially overlap the experience we would otherwise have to build. [S01, S02]

The immediate problem is exhaustion of a hosted product's allowance. A self-hosted runtime gives control over infrastructure and model purchasing, but model providers still impose charges and limits. No candidate has been demonstrated here to outperform Grok Bot on Jay's actual work.

**Evidence boundaries:** I inspected first-party repositories, documentation, pricing pages, selected license files, and selected source code. I did not install the platforms, run paid agent jobs, reproduce their benchmarks, test account authentication, or benchmark Jay's workflows. “Documented” below means supported by the retrieved primary source; recommendations and effort ratings are my judgments. Default-branch features may differ from packaged releases.

**What the market already covers.** There are four different purchases or engineering decisions: an agent product, a browser worker, a workflow/recovery engine, and supporting services such as model gateways and memory. They overlap, but they are not interchangeable. Buying a browser does not supply a persistent assistant; adding memory does not supply job recovery.

| Candidate | Existing capabilities relevant to this project | Main tradeoff | Role in our decision |
|---|---|---|---|
| Hermes Agent | Bot roster, profiles, group coordination, schedules, memory, skills, browser tools, model-provider choices | Profile separation is logical; terminal sandboxing must be configured. Desktop behavior needs release-specific testing | First general-purpose candidate |
| NanoClaw | Per-agent workspaces and containers, messaging, recurring tasks, credential gateway, optional provider modules | Customization often modifies a personal fork; adapters are installed through skills | First isolation-focused candidate |
| nanobot | Python runtime, WebUI, web tools, memory, scheduling, MCP, delegation, SDK/API | One instance shares its agent memory across selected projects; separate instances are needed for separate identities | Simpler Python alternative |
| OpenClaw | Local gateway, many communication channels, replaceable models/harnesses, plugin ecosystem | Broad platform surface means more configuration to evaluate and maintain | Strong option when integrations dominate |
| Agent Zero | Docker-based desktop and browser, editable tools, projects, memory, subagents | More desktop machinery to operate than a narrow API worker | Evaluate for GUI-heavy work |
| invisible_dots | Separate QEMU VM per agent, persistent browser identities, local control plane, task queue, permissions | Alpha; missing backup/snapshot features and native subagents/search-fetch tools in the guide | Specialist VM/browser candidate |
| OpenHands Agent Canvas | Control interface for coding agents and automations; local/remote/container backends; ACP-compatible agents | Focused on development; an unsandboxed path has host filesystem access | Coding-worker candidate |
| Letta | Stateful-agent runtime and memory-oriented workflows | Its repository now points to current code and archives the retired V1 API server; old tutorials can target the wrong system | Revisit if memory behavior becomes the deciding problem |
| n8n | Visual automation, triggers, connectors, code, approvals, model integrations | Source-available license and another system to operate | Optional outer workflow layer |
| Dify | Visual agent/workflow building, document retrieval, model management, APIs, observability integrations | Modified license with conditions beyond ordinary Apache 2.0 | Alternative visual application platform |

Sources: Hermes [S01–S04]; NanoClaw [S05–S07]; nanobot [S08–S09]; OpenClaw [S10]; Agent Zero [S11]; invisible_dots [S12]; OpenHands [S13]; Letta [S14]; n8n [S15–S16]; Dify [S17–S18].

These are alternatives for the main runtime. Combining Hermes, OpenClaw, nanobot, and NanoClaw as equal supervisors would duplicate scheduling, memory, identity, and tool policy. Choose one owner for a job.

**The closest ready-made substitute deserves the first test.** Hermes Bot Mode is a user interface over profiles, with each profile retaining its own configuration, memory, skills, credentials, and history. Its documentation also provides a LiteLLM custom-endpoint recipe. That is useful evidence of a supported integration, rather than merely assuming two systems with compatible-looking APIs will work together. [S02, S04]

Hermes's built-in tools already cover web search/extraction, browser interaction, terminal/files, memory, scheduling, and delegation. Start with those capabilities before introducing equivalent modules. Its advertised learning loop is a feature claim, not evidence of improving task completion in our environment. [S01, S03]

There are also actual reports to turn into tests. Hermes issue #100523 describes a bot-to-bot message being acknowledged but dropped when the recipient had an active desktop owner. The issue is closed and linked to #101293; that is historical failure evidence, not proof that today's release still has the bug. The pilot must test a handoff while the recipient is busy. [S32]

NanoClaw's distinctive cost feature is an ordinary script before the model wakes. Its current scheduling implementation reads a final JSON line containing a wakeAgent boolean. A false value or script failure skips the model invocation, and error skips are distinguished from deliberate no-work skips. I inspected that implementation as well as the documentation. Container startup and the script itself still consume resources. [S06, S07]

NanoClaw's default Claude-oriented implementation is not the complete provider story: its current README also describes skill-installed alternatives. Provider-specific credentials, supported authentication, and usage allowances must be verified for the chosen module; an existing chat subscription is not a universal API entitlement. [S05]

**Browser automation has several useful substitutes.** Use an official connector/API where it satisfies the job, a programmed browser workflow for repeat steps, and an agent-driven browser for decisions or unfamiliar layouts. That ordering is a proposed cost policy, not a guarantee that every website offers an API.

| Browser piece | What it supplies | Best application | Integration boundary / concern |
|---|---|---|---|
| Playwright MCP | Browser tools using structured accessibility information | Exploratory tasks in an MCP-capable agent | Tool descriptions and snapshots consume context |
| Playwright CLI plus skills | Concise browser commands for coding-agent workflows | Repeated high-volume browser operations | Still needs a job owner, browser state, and result validation |
| Stagehand | Code-owned browser workflows with natural-language actions and structured extraction | Known portals with a few uncertain steps | An SDK, not an entire agent team |
| Browser Use | Open-source browser-agent library and separately sold hosted services | Open-ended browser tasks | Distinguish local library, remote browser, and hosted agent bills |
| Skyvern | Vision-based browser workflows, SDK, UI/workflow builder | Many varied forms or portals | Heavier service surface; AGPL-3.0 code |
| invisible browser stack | Patched Firefox and persistent identities | Isolated experiments where this browser is necessary | Do not assume compatibility with a Chromium/CDP integration |

Microsoft's own Playwright MCP README recommends considering CLI plus skills for coding agents because they avoid large schemas and verbose accessibility trees. That is a useful design signal, but we still need to compare costs on the same task. [S19]

Stagehand's repository demonstrates local persistent browser data, conventional locator-based credential entry, AI-assisted actions, and schema-validated extraction. It is attractive for repeatable workflows because ordinary code can own the stable parts. Browser Use offers an agent library, CLI, and hosted path. Skyvern is a more complete browser-workflow product. [S20–S22]

The stealth-browser claims require separate evaluation. A vendor's bot-check benchmark is not a guarantee of completing a logged-in business workflow. The invisible_dots guide itself acknowledges that sites can refuse its browser. [S12]

**The modular bill of materials should stay small.** The following is a proposal, not a verified integrated deployment.

| Need | Initial choice | Substitute | Why / when to add |
|---|---|---|---|
| Bot interface, memory, skills, routine work | Hermes | NanoClaw, nanobot, OpenClaw | Avoid rebuilding the product shell |
| Repeat browser workflow | Existing native tools first; Stagehand or Playwright CLI as needed | Browser Use; Skyvern for broader forms | Add only for a measured browser gap |
| Provider access and spending ledger | LiteLLM with a database | Runtime-native provider support; direct provider billing | Centralize multiple workers and enforce supported limits |
| Trigger filtering | Small script, webhook, or deterministic predicate | n8n | Keep empty checks out of the model |
| Reliable custom background jobs | Existing runtime facilities first | Pydantic AI plus DBOS | Add a separate durable service only when recovery needs justify it |
| Source fetching | Existing web tools or direct HTTP | Firecrawl | Buy extraction when it materially improves a difficult source |
| Application credentials/connectors | Native connector or MCP server | Composio | Add managed authentication/toolkits where it saves integration work |
| Memory | Runtime's existing memory | Mem0, Graphiti, Letta | Add only after testing recall, correction, and separation |
| Trace/evaluation collection | Runtime/gateway logs initially | Langfuse | Expand once comparable job records exist |
| Local inference | Optional Ollama endpoint | Hosted model APIs | Conditional on actual hardware and task quality |

LiteLLM provides provider normalization, virtual keys, spend tracking, and routing. Its core license is MIT, with separately licensed enterprise code. [S23, S24] Firecrawl supplies search/scraping and machine-readable output; self-hosted functionality and cloud behavior must be evaluated separately. [S25] Composio's MIT repository is an SDK for a managed tool/authentication service; SDK availability does not mean the entire backend is locally hosted. [S26]

Mem0 provides agent-memory infrastructure. Its README explicitly says some published performance numbers describe managed-platform optimizations unavailable in the open-source SDK. Graphiti provides temporal facts and provenance, with an additional graph database to run; Zep's managed infrastructure is a separate offering. Neither is needed just to keep files and conversation state. [S27, S28]

Langfuse's core tracing, evaluations, and prompt capabilities are MIT licensed; enterprise additions are separate. Its self-hosted stack includes application processes, PostgreSQL, ClickHouse, Redis/Valkey, and blob storage. For a small pilot, that is meaningful operational weight. Defer it if existing logs can answer the first questions. [S29, S30]

Ollama is a local-model runtime option, not a promise that an unspecified home machine can run a sufficiently capable model at an acceptable speed. Evaluate a representative tool-using task before buying hardware or making local inference a dependency. Individual model terms are separate from the runtime license. [S31]

**A custom workflow layer has credible foundations too.**

| Framework | Useful capability already available | Decision |
|---|---|---|
| Pydantic AI + DBOS | Typed agent logic plus a documented durable-execution integration; database-backed recovery/queues | Preferred Python path if custom job execution is necessary |
| LangGraph | Explicit graph state, persistent checkpoints, cross-thread stores | Use when branching, interrupts, and visible state transitions justify graphs |
| Mastra | TypeScript agents, workflows, stored suspend/resume, MCP and evaluations | Strong alternative if a custom TypeScript application is the objective |
| Microsoft Agent Framework | Python/.NET orchestration, checkpoints, human input, telemetry | Relevant for that ecosystem; no demonstrated advantage for this pilot |
| GPT Researcher | Specialized cited-report workflow over web/local sources | Potential research worker behind a narrow interface |

Sources: [S33–S38].

Pydantic's current DBOS documentation distinguishes the newer DBOSDurability capability from the deprecated DBOSAgent wrapper. Attaching the capability alone is insufficient: the run must execute inside a DBOS workflow. Custom tool functions are not all automatically wrapped; durable steps can be retried from their beginning. This is a concrete reason to include external-action reconciliation and idempotency in any implementation. [S34]

LangGraph similarly distinguishes an in-memory example checkpointer from persistent PostgreSQL or SQLite storage. Memory that survives a conversation is not automatically memory that survives process loss. [S35]

Mastra's current license is Apache-2.0 outside separately licensed enterprise directories. Do not label the entire repository MIT based on an old comparison chart. [S36] These frameworks are competing approaches; the initial plan should not stack Pydantic, LangGraph, Mastra, and multiple workflow engines.

**Three practical assembly choices follow from the evidence.**

| Assembly | Components | Relative effort | Decision rule |
|---|---|---|---|
| Configure a close substitute | Hermes + one model route + existing browser tools; add database-backed LiteLLM if required | Lowest initial integration effort among our proposed paths | Start here for general assistant/bot work |
| Configure isolated specialist workers | NanoClaw + explicit provider module + script-gated routines + one browser integration | Moderate configuration/fork maintenance | Prefer when independent workspaces and container execution matter most |
| Build a task service | Pydantic AI + DBOS + PostgreSQL + one browser adapter + model gateway; connect a UI later | Highest initial implementation effort | Use only when ready-made candidates fail agreed recovery/control requirements |

These are qualitative engineering estimates, not delivery commitments. Packaging differences, credentials, operating system, and representative tasks remain unknown.

For the first assembly, use native scheduling and handoff behavior until it fails an agreed requirement. If durable custom jobs are added, make the task service own those jobs and expose a narrow tool to the bot. Do not have two schedulers independently retry the same external action.

A sensible interface between modules contains task ID, project ID, requested capability, allowed actions, input references, model route, spend allowance, deadline, idempotency key, and expected output. Results should contain status, artifact references, evidence, usage, and an explicit error when completion is uncertain. This is a proposed contract we would implement or map to existing interfaces.

**Several compatibility findings change the build plan.**

1. **A budget setting needs working enforcement.** LiteLLM's documentation says its budgets require a database. Without one, the global budget check fails open. Test the actual deployment with a deliberately small limit, multiple workers, and an unavailable database. Do not treat an alert as a cap. [S23]
2. **Budgeting must cover child work.** A parent task can launch subagents or a hosted browser agent that makes its own model calls. Our design must attribute those costs to the parent and account for outstanding calls before accepting more work. This is a requirement to verify, not a claim that all candidates implement it.
3. **Generic API compatibility is incomplete evidence.** Test tool calls, streaming, error handling, context limits, cost reporting, and supported output limits against the exact provider and gateway versions. Hermes documents a LiteLLM endpoint, but its provider guide also discusses reliance on server-side output limits. [S04]
4. **Profiles are not complete operating-system boundaries.** Hermes profiles separate stored identities; its Docker terminal backend isolates commands. Verify where browser tools, file tools, connectors, and memory execute. Give distinct projects distinct allowed folders and credentials. [S02, S39]
5. **Browser protocols differ.** Playwright's connect_over_cdp supports Chromium-based browsers only. The patched Firefox in invisible_dots cannot simply be treated as the same remote endpoint. The conclusion that an adapter is needed is an inference from the two documented designs. [S12, S40]
6. **Recovery does not settle external outcomes automatically.** A browser can submit a form before a process dies. Before retrying, check the destination's record or use an available idempotency mechanism. Store “outcome unknown” separately from failure.
7. **Memory and caching need freshness rules.** Use source IDs, timestamps, account/project boundaries, expiry, and correction paths. A previous answer is not authoritative evidence that a changing source still says the same thing.
8. **Version selection is part of integration.** Pin an evaluated release/commit and its browser/runtime dependencies. The source version, installed package, and online guide may describe different behavior.

**The likely savings are in execution policy.** My proposed order is: eliminate no-work model invocations, use connectors/scripts for fixed steps, bound retry loops, trim irrelevant context, reuse exact fresh results, then tune model selection. More agents are useful only if they increase verified output.

NanoClaw's script gate is an existing implementation to learn from. For other runtimes, a host-side trigger can check an API, file modification time, content hash, or queue before dispatch. A no-change result should use zero model calls; an error should be recorded as an error rather than silently treated as no change. [S06, S07]

Requests-cache is a small reusable HTTP cache with expiry and conditional-request support; its default cache lifetime is indefinite, so freshness must be configured. It is not a semantic answer cache. [S41]

RouteLLM is a router framework, not an agent runtime. Its published savings refer to its own model pair and benchmark conditions. Its README says thresholds should be calibrated to the request distribution. Start with explicit job-to-model assignments; add a learned router only if a held-out evaluation shows savings without unacceptable failures. [S42]

Semantic Router can route known intents with a local embedding model. Its current 1.x interface differs from the older 0.x line. It is useful when there is a real set of repeated routes, not as an extra classifier for every already-classified task. [S43]

**Actual operating cost is broader than model tokens.** Track model usage, tool/search fees, browser time, proxy bandwidth, hosting, storage, evaluation/retries, and human repair. The primary comparison should be total cost divided by verified completed jobs.

A browser price is not an agent price:

| Service inspected | Public price signal on October 20, 2026 | Interpretation |
|---|---|---|
| Browser Use cloud browser | $0.02 per browser-hour; residential proxy $5/GB | Browser infrastructure is only part of a task's cost |
| Browser Use hosted web agents | Model pricing plus 20%, browser time, and traffic | The browser-hour headline excludes inference |
| Browserbase Developer | $20/month, 100 browser-hours included, then $0.12/hour; proxy allowances/overages separate | Compare the whole plan and relevant features |
| Lindy | Team starts at $49.99/month for 5,000 credits; top-ups listed | Managed alternative still uses a consumption allowance |
| Gumloop | Pro starts at $37/month, 20,000 included credits and 8% orchestration fee shown | Useful buy-versus-build benchmark; “unlimited agents” is not unlimited work |
| Manus | Pricing page retrieved, but plan amounts were not exposed in extracted content | No verified price comparison made |

Sources: [S44–S49]. Prices are vendor quotes at research time, not commitments or equal-quality task benchmarks. Account-specific offers and terms may differ.

For intuition only, suppose 100 jobs each use 50,000 input tokens and 5,000 output tokens. At hypothetical rates of $0.50/$3.00 per million input/output tokens, each job costs $0.04 in inference. At hypothetical rates of $3.00/$15.00, each costs $0.225. An 80/20 mixture costs $7.70. Ten Browser Use browser-hours and 0.2 GB of its residential proxy traffic add $1.20, producing $8.90 before hosting, extraction, retries, evaluations, and repair. These model rates are invented planning assumptions, not current provider quotes.

That calculation illustrates why neither a bot count nor a browser-hour price establishes the cost of a completed job. It does not validate the previously discussed “300 bots for pennies” claim.

**License and ownership affect which pieces are reusable.** These are labels and architectural selection notes from repository license files, not an assessment of a proposed commercial distribution.

| Component | License signal inspected | Selection consequence |
|---|---|---|
| Hermes, NanoClaw, nanobot, Agent Zero, OpenClaw | MIT | Attractive foundations; preserve required notices and inspect dependencies |
| Browser Use, Stagehand | MIT | Useful browser modules; hosted products remain separate services |
| Playwright MCP, RouteLLM, Mem0, Graphiti, GPT Researcher | Apache-2.0 | Review package/dependency terms for exact pinned versions |
| Pydantic AI, DBOS, LangGraph, Microsoft Agent Framework | MIT | Reusable custom-runtime foundations |
| LiteLLM, Langfuse | MIT core, separately licensed enterprise areas | Confirm the required feature is in the selected edition |
| Mastra | Apache-2.0 outside enterprise areas | Avoid treating enterprise modules as covered by core terms |
| Skyvern, Firecrawl | AGPL-3.0 repository code | Keep as deliberate service choices; review exact distribution/deployment plans before productization |
| n8n | Sustainable Use / Enterprise licenses | Source-available; inspect intended use before using it as a resold platform |
| Dify | Modified Apache-derived license | Conditions cover multi-tenant operation and frontend branding |
| Composio | MIT SDK repository | SDK licensing does not grant ownership of the hosted service |

Selected license files were fetched directly, including the three main finalists, Pydantic AI, Agent Zero, LiteLLM, Mastra, and Graphiti. The n8n and Dify files were also read. Other license labels above come from primary repository pages; transitive dependencies were not audited. [S50]

**The next useful work is a small comparative evaluation.** No installation or paid run was performed during this research.

Start with Hermes and NanoClaw under the same model and budget, and use Grok's prior outputs or the next available allowance as the managed baseline. Add Agent Zero only if the chosen task needs a full desktop. The workload below is a proposal because Jay's actual exhausted-bot jobs have not yet been described.

| Test | Passing evidence | What it distinguishes |
|---|---|---|
| Research a defined topic | Correct cited facts, saved report, source timestamps | Retrieval and synthesis |
| Download files from an authorized test portal | Correct files and manifest; reusable session | Browser execution and persistence |
| Resume interrupted work | Restart without losing the accepted job; reconcile external outcomes | Recovery behavior |
| Coordinate two specialists | Handoff delivered while recipient is busy; no uncontrolled message loop | Coordination reliability |
| Run a no-change monitor | No model invocation when unchanged; explicit errors when check fails | Waste avoidance |
| Exercise budget/limits | New calls stop according to the configured contract; child costs attributed | Real spending control |
| Correct memory | Old preference corrected; separate project does not inherit forbidden context | Memory quality and separation |

Record model, prompt/skill version, runtime version, tool calls, token usage, cache behavior, browser seconds, fees, elapsed time, repair time, artifact location, and final outcome. Review results with a checklist rather than relying solely on a model judging its own work. A cheap failed task remains a failed task.

The first deployment gate should be success on representative jobs, successful restart/handoff tests, and a verified spending stop. Only then should we expand worker count, add learned routing, or build a custom dashboard.

**My recommended sequence is therefore: evaluate Hermes as the main product; compare NanoClaw for worker isolation and no-work gating; add one browser module only if required; centralize paid model usage when multiple workers justify it; keep memory simple; add a durable task service only for a demonstrated recovery gap.** The unbuilt portion should be the thin policy, task-contract, adapter, and verification layer specific to Jay's work.

The remaining decisions are concrete: the first two real bot jobs, the host's operating system/RAM/CPU and any GPU, the accounts/tools they need, and an acceptable pilot spending limit. None requires committing to a new platform before the test.

**Primary sources and inspection trail**

[S01] [Hermes repository](https://github.com/NousResearch/hermes-agent)
[S02] [Hermes Bot Mode](https://hermes-agent.nousresearch.com/docs/user-guide/bot-mode)
[S03] [Hermes tools and toolsets](https://hermes-agent.nousresearch.com/docs/user-guide/features/tools)
[S04] [Hermes providers, including LiteLLM setup](https://hermes-agent.nousresearch.com/docs/integrations/providers)
[S05] [NanoClaw repository](https://github.com/nanocoai/nanoclaw)
[S06] [NanoClaw scheduled tasks and script gates](https://docs.nanoclaw.dev/guides/scheduled-tasks)
[S07] [NanoClaw gate implementation](https://github.com/nanocoai/nanoclaw/blob/main/container/agent-runner/src/scheduling/task-script.ts)
[S08] [nanobot repository](https://github.com/HKUDS/nanobot)
[S09] [nanobot architecture](https://github.com/HKUDS/nanobot/blob/main/docs/architecture.md)
[S10] [OpenClaw repository](https://github.com/openclaw/openclaw)
[S11] [Agent Zero repository](https://github.com/agent0ai/agent-zero)
[S12] [invisible_dots guide](https://github.com/feder-cr/invisible_dots/blob/main/docs/guide.md)
[S13] [OpenHands Agent Canvas repository](https://github.com/OpenHands/OpenHands)
[S14] [Letta repository and current-source notice](https://github.com/letta-ai/letta)
[S15] [n8n repository](https://github.com/n8n-io/n8n)
[S16] [n8n license](https://github.com/n8n-io/n8n/blob/master/LICENSE.md)
[S17] [Dify repository](https://github.com/langgenius/dify)
[S18] [Dify license](https://github.com/langgenius/dify/blob/main/LICENSE)
[S19] [Playwright MCP and CLI guidance](https://github.com/microsoft/playwright-mcp)
[S20] [Stagehand repository](https://github.com/browserbase/stagehand)
[S21] [Browser Use repository](https://github.com/browser-use/browser-use)
[S22] [Skyvern repository](https://github.com/Skyvern-AI/skyvern)
[S23] [LiteLLM budget enforcement documentation](https://docs.litellm.ai/docs/proxy/users)
[S24] [LiteLLM repository](https://github.com/BerriAI/litellm)
[S25] [Firecrawl repository](https://github.com/firecrawl/firecrawl)
[S26] [Composio SDK repository](https://github.com/ComposioHQ/composio)
[S27] [Mem0 repository and benchmark qualification](https://github.com/mem0ai/mem0)
[S28] [Graphiti repository and Zep comparison](https://github.com/getzep/graphiti)
[S29] [Langfuse licensing](https://langfuse.com/handbook/chapters/open-source)
[S30] [Langfuse self-hosted architecture](https://langfuse.com/self-hosting)
[S31] [Ollama repository](https://github.com/ollama/ollama)
[S32] [Hermes handoff issue #100523, closed](https://github.com/NousResearch/hermes-agent/issues/100523)
[S33] [Pydantic AI durable execution](https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/)
[S34] [Pydantic AI + DBOS integration](https://pydantic.dev/docs/ai/capabilities/durable_execution/dbos/)
[S35] [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence)
[S36] [Mastra repository](https://github.com/mastra-ai/mastra) and [license](https://github.com/mastra-ai/mastra/blob/main/LICENSE.md)
[S37] [Microsoft Agent Framework](https://github.com/microsoft/agent-framework)
[S38] [GPT Researcher](https://github.com/assafelovic/gpt-researcher)
[S39] [Hermes security and Docker terminal behavior](https://hermes-agent.nousresearch.com/docs/user-guide/security)
[S40] [Playwright browser protocol compatibility](https://playwright.dev/python/docs/api/class-browsertype#browser-type-connect-over-cdp)
[S41] [Requests-cache expiry behavior](https://requests-cache.readthedocs.io/en/stable/)
[S42] [RouteLLM repository](https://github.com/lm-sys/RouteLLM)
[S43] [Semantic Router repository](https://github.com/aurelio-labs/semantic-router)
[S44] [Browser Use prices](https://browser-use.com/pricing)
[S45] [Browserbase prices](https://www.browserbase.com/pricing)
[S46] [Lindy prices](https://www.lindy.ai/pricing)
[S47] [Gumloop prices](https://www.gumloop.com/pricing)
[S48] [Manus pricing page — amounts not available in extracted content](https://manus.im/pricing)
[S49] [Grok Bot current product/pricing](https://x.ai/bot)
[S50] Selected license files: [Hermes](https://github.com/NousResearch/hermes-agent/blob/main/LICENSE), [NanoClaw](https://github.com/nanocoai/nanoclaw/blob/main/LICENSE), [nanobot](https://github.com/HKUDS/nanobot/blob/main/LICENSE), [Agent Zero](https://github.com/agent0ai/agent-zero/blob/main/LICENSE), [Pydantic AI](https://github.com/pydantic/pydantic-ai/blob/main/LICENSE), [LiteLLM](https://github.com/BerriAI/litellm/blob/main/LICENSE), [Graphiti](https://github.com/getzep/graphiti/blob/main/LICENSE).
[S51] [DBOS repository](https://github.com/dbos-inc/dbos-transact-py)
[S52] [LangGraph repository](https://github.com/langchain-ai/langgraph)

Directly retrieved file identities (Git blob SHAs, not release or commit SHAs):
- Hermes README: 0412dd2203e1cf7eeb9c33983dd93288b2b5c080
- NanoClaw README: 40270f1c3a81fadb4da2095843260a4c788eb20a
- nanobot README: 016c61f23c9e53229e354885275527ca329221c7
- NanoClaw pre-task gate implementation: 584ecb4cb07b7253019481ed0e5655c9433ca527
- nanobot architecture document: c5471a7541ae119c887e8dda5b2807ca8c3cc4f7

The source links identify moving default branches. Re-resolve releases and exact dependencies before implementation. No existing project repository, canonical state file, account configuration, or installed agent was changed.

