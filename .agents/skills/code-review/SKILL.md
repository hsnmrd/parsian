---
name: code-review
description: Review current task or branch changes for actionable defects, regressions, and repository-rule violations. Use when the user asks for a code review and before completing any task that changes repository files. In standalone review requests, remain read-only unless the user also asks for fixes.
---

# Code Review

Review the actual changes and their surrounding behavior, not only the author's intent. Prioritize correctness and user impact over stylistic preferences.

## Establish the review scope

1. Read every applicable `AGENTS.md`, including more specific files below the repository root.
2. Inspect `git status --short`, the unstaged diff, the staged diff, and relevant untracked files. Include only changes belonging to the current task; preserve unrelated user changes.
3. Read each changed file in context. Inspect affected callers, shared types, tests, configuration, and runtime boundaries when needed to validate behavior.
4. If the changed area is covered by a repository skill or versioned local documentation, read that source before judging an API or convention.

## Choose the review mode

- **Completion gate:** After implementing a task, review the final task diff. Fix actionable findings that are within the authorized task scope, rerun affected verification, and inspect the resulting diff once more before completion.
- **Standalone review:** When the user asks only for analysis or review, do not edit files. Report findings and let the user decide whether to apply fixes.

Never expand a review into unrelated cleanup, refactoring, dependency updates, commits, or external changes.

## Review priorities

Check the following where relevant:

- Compliance with the request, supplied references, and applicable `AGENTS.md` rules.
- Functional correctness, boundary values, error paths, and regressions.
- Data flow, validation, security, privacy, and accidental exposure of secrets.
- Async behavior, cancellation, race conditions, cache identity, and stale responses.
- Server/client boundaries, deployment behavior, and environment configuration.
- Accessibility, RTL behavior, responsive layouts, and loading/empty/error states for UI changes.
- Tests and verification appropriate to the risk of the change.
- Maintainability problems only when they create a concrete defect or make the changed behavior unsafe to evolve.

Do not report formatting preferences or speculative improvements as defects when automated tooling or repository conventions already resolve them.

## Verification

- Run the commands required by the applicable `AGENTS.md` after relevant changes.
- Start with focused checks when they provide faster evidence, then run every required completion check.
- For UI changes, perform the required visual and responsive verification rather than relying only on static code inspection.
- If a check cannot run, state the exact reason and treat the unverified area as residual risk.
- Never claim the review passed while a required check is failing.

## Findings

Report only actionable findings. Sort them by severity:

- **P0:** Critical security, data-loss, or system-wide failure.
- **P1:** High-impact correctness issue, deployment blocker, or major regression.
- **P2:** User-visible bug, violated requirement, accessibility failure, or meaningful reliability/performance issue.
- **P3:** Localized maintainability or quality issue with a concrete future cost.

For each finding, include the severity, a concise title, the exact file and tightest useful line range, the failure condition, and its impact. Provide a brief fix direction when it is not obvious.

Lead with findings. If there are none, say so explicitly. Finish with the checks performed and any residual risks or unverified behavior. Keep a task-completion review concise when all findings were fixed and the final diff is clean.
