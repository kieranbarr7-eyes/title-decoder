# 0001 — LLM choice

## Decision
Claude Haiku 4.5 (`claude-haiku-4-5`) for the `/api/decode` endpoint.

## Alternatives considered
- Claude Sonnet (4.5 / 4.6) — stronger reasoning, ~3× the cost per call, noticeably slower.
- GPT-4o-mini — comparable price band, but a different vendor relationship and a separate API surface to maintain.

## Reasoning
- **Cost per call at scale.** Phase 2 puts this inline on LinkedIn profiles via a Chrome extension. Per-call cost has to be near-flat for that to make sense. Haiku 4.5 is roughly a third of Sonnet's price for output of comparable shape on this task.
- **Latency for an extension that needs to feel snappy.** End-to-end latency on Haiku has come in around 4–6s for ~1000 tokens of structured markdown. Sonnet on the same prompt sits closer to 8–12s. For a tool you trigger from a tooltip, the Haiku response feels like "the page loaded" rather than "I'm waiting on a model."
- **Output quality verified across 6 test titles in two iteration rounds.** Storyteller Engineer, Senior Software Engineer, Forward Deployed Engineer, Vibe Engineer, and two others. Two rounds of prompt iteration (third-person rule, no top heading, conditional seniority section) brought outputs to the bar without needing a larger model.

## When to revisit
- If outputs degrade on less common titles (research-y, niche, or non-English company names), upgrade to Sonnet for harder cases — likely via a confidence signal or a per-request override rather than swapping the default.
- If monthly cost grows past $X/month, consider model routing: cheap default model + escalation to Sonnet only when the cheap model flags low confidence.
- If Anthropic ships a smaller-than-Haiku model with comparable quality, re-baseline.

## Date
May 18, 2026
