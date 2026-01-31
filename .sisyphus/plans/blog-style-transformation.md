# Blog Writing Style Transformation

## TL;DR

> **Quick Summary**: Transform all 24 blog posts from dry, AI-generated news style to personal, conversational "Tom's voice" style using emoji markdown markers. Also update /publish command to generate new posts in the same style.
>
> **Deliverables**:
>
> - Writing style guide document
> - Updated /publish command with style instructions
> - 24 rewritten MDX posts
> - Successful pnpm build verification
>
> **Estimated Effort**: Large (24 posts to rewrite + 2 files to create/update)
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Style Guide → /publish Update → Batch Rewrite → Build Verification

---

## Context

### Original Request

Transform blog writing style from factual, news-reporting style to personal, conversational "Tom's voice" - similar to popular Korean tech blogs like goddaehee.tistory.com.

### Interview Summary

**Key Discussions**:

- Component Strategy: Use emoji markdown only (💡, 🎯, ⚠️), no new MDX components
- Existing Posts: All 24 posts to be AI auto-rewritten
- /publish Command: Update AI prompt to include style guide
- Testing: pnpm build success only

**Research Findings**:

- Korean tech blog best practices: personal greeting, learning journey sharing, humble tone
- Recommended structure: Personal Hook → What it is → My Experience → Key Insights → Practical Guide → Verdict
- Use inline emoji markers instead of separate components

### Self-Conducted Gap Analysis

**Identified Gaps (addressed in plan):**

1. **Order of operations**: Style guide must exist BEFORE rewriting posts
2. **Frontmatter preservation**: Must keep existing frontmatter fields when rewriting
3. **Post-specific handling**: Some posts (like hello-world.mdx) are already personal - may need different treatment
4. **Build verification timing**: Should verify after each batch, not just at the end
5. **Rollback strategy**: If build fails, need clear recovery path

---

## Work Objectives

### Core Objective

Transform the blog's voice from impersonal AI-generated style to authentic, personal "Tom's voice" across all existing and future content.

### Concrete Deliverables

- `.claude/writing-style.md` - Comprehensive style guide for AI and human reference
- `.claude/commands/publish.md` - Updated with style instructions embedded
- 24 rewritten `.mdx` files in `content/posts/`
- Clean `pnpm build` with no errors

### Definition of Done

- [ ] `pnpm build` completes successfully
- [ ] All 24 posts use new style (personal greeting, emoji markers, conversational tone)
- [ ] /publish command includes style guide reference

### Must Have

- Personal greeting pattern: "안녕하세요, Tom입니다."
- Conversational Korean tone throughout
- Emoji markers for tips/notes (💡, 🎯, ⚠️, 📝)
- Personal opinions woven naturally (not in separate sections)
- Preserved frontmatter (title, date, tags, category, source, sourceUrl)

### Must NOT Have (Guardrails)

- ❌ New MDX components (use emoji markdown instead)
- ❌ Separate "Developer Perspective" sections (weave opinions inline)
- ❌ Formal "~입니다/~합니다" throughout (use conversational "~요/~예요")
- ❌ Changes to frontmatter structure or required fields
- ❌ Modification of files outside content/posts/, .claude/commands/, and .claude/

---

## Verification Strategy (MANDATORY)

### Test Decision

- **Infrastructure exists**: NO (no test framework)
- **User wants tests**: Manual-only
- **Framework**: none

### Automated Verification (pnpm build)

Each major change will be verified with:

```bash
# Agent runs after each TODO completion:
pnpm build
# Assert: Exit code 0
# Assert: No MDX parsing errors in output
```

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
└── Task 1: Create writing style guide

Wave 2 (After Wave 1):
├── Task 2: Update /publish command
└── Task 3: Rewrite hello-world.mdx (pilot test)

Wave 3 (After Wave 2, parallel batches):
├── Task 4: Rewrite posts batch 1 (posts 1-8)
├── Task 5: Rewrite posts batch 2 (posts 9-16)
└── Task 6: Rewrite posts batch 3 (posts 17-24)

Wave 4 (After Wave 3):
└── Task 7: Final verification and cleanup

Critical Path: Task 1 → Task 3 → Tasks 4/5/6 → Task 7
```

### Dependency Matrix

| Task | Depends On | Blocks  | Can Parallelize With |
| ---- | ---------- | ------- | -------------------- |
| 1    | None       | 2, 3    | None                 |
| 2    | 1          | None    | 3                    |
| 3    | 1          | 4, 5, 6 | 2                    |
| 4    | 3          | 7       | 5, 6                 |
| 5    | 3          | 7       | 4, 6                 |
| 6    | 3          | 7       | 4, 5                 |
| 7    | 4, 5, 6    | None    | None                 |

---

## TODOs

- [ ] 1. Create Writing Style Guide

  **What to do**:
  - Create `.claude/writing-style.md` with comprehensive Tom style guidelines
  - Include: tone/voice, structure template, emoji usage guide, before/after examples
  - Reference goddaehee.tistory.com patterns
  - Provide Korean tech blog best practices

  **Must NOT do**:
  - Don't create MDX component documentation (we're not using them)
  - Don't include English examples (this is a Korean blog)

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: This is pure documentation/writing work, no code execution needed
  - **Skills**: []
    - No special skills needed for markdown documentation

  **Parallelization**:
  - **Can Run In Parallel**: NO (foundational task)
  - **Parallel Group**: Wave 1 (solo)
  - **Blocks**: Tasks 2, 3
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `.claude/commands/publish.md:17-40` - Current MDX post format to understand structure
  - `content/posts/hello-world.mdx:1-35` - Only existing personal-style post

  **Target Style References** (external):
  - goddaehee.tistory.com/504 - Reference personal Korean tech blog style
  - Korean tech blog best practices from librarian research

  **Content to Include**:

  ```markdown
  # Tom's Blog Writing Style Guide

  ## Voice & Tone

  - Personal greeting: "안녕하세요, Tom입니다."
  - Conversational Korean: ~요/~예요 endings, not ~입니다/~합니다
  - Share personal experience: "제가 써본 결과", "실제로 테스트해보니"
  - Natural opinions: "이 부분이 특히 좋았어요", "아쉬운 점은..."

  ## Structure Template

  1. Personal Hook (왜 이게 나에게 중요한지)
  2. What it is (간단한 대화체 설명)
  3. My Experience (실제 테스트/사용 경험)
  4. Key Insights (좋았던 점/아쉬웠던 점)
  5. Practical Guide (사용법 + 팁)
  6. Verdict (최종 생각)

  ## Emoji Markers

  - 💡 **팁:** - Quick tips
  - 🎯 **핵심:** - Key points
  - ⚠️ **주의:** - Warnings
  - 📝 **메모:** - Side notes
  - 💰 **비용:** - Cost-related
  ```

  **Acceptance Criteria**:
  - [ ] File created: `.claude/writing-style.md`
  - [ ] Contains all sections: Voice & Tone, Structure Template, Emoji Markers, Before/After Examples
  - [ ] Minimum 100 lines of comprehensive guidance

  **Automated Verification**:

  ```bash
  # Agent runs:
  test -f .claude/writing-style.md && wc -l .claude/writing-style.md
  # Assert: File exists and has 100+ lines
  ```

  **Commit**: YES
  - Message: `docs(blog): add writing style guide for Tom's voice`
  - Files: `.claude/writing-style.md`
  - Pre-commit: none (documentation only)

---

- [ ] 2. Update /publish Command with Style Guide

  **What to do**:
  - Update `.claude/commands/publish.md` to include Tom style instructions
  - Add reference to writing style guide
  - Update MDX template example to show new format
  - Ensure AI will generate posts in personal style

  **Must NOT do**:
  - Don't change the workflow structure (fetch → select → publish)
  - Don't modify frontmatter field requirements

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Updating command documentation/prompts
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 3)
  - **Blocks**: None (but should complete before bulk rewrite)
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `.claude/commands/publish.md:1-61` - Current publish command to update
  - `.claude/writing-style.md` - Style guide to reference (created in Task 1)

  **Changes to Make**:

  ```markdown
  # Add to publish.md after "## 실행 단계" section:

  ## 글쓰기 스타일

  모든 포스트는 `.claude/writing-style.md`의 Tom 스타일 가이드를 따릅니다:

  - 개인적 인사로 시작: "안녕하세요, Tom입니다."
  - 대화체 한국어 사용 (~요/~예요)
  - 개인 경험과 의견을 자연스럽게 녹여내기
  - 이모지 마커 활용: 💡 팁, 🎯 핵심, ⚠️ 주의

  ## MDX 포스트 형식 (Updated)

  [Update the template to show new style]
  ```

  **Acceptance Criteria**:
  - [ ] `.claude/commands/publish.md` updated
  - [ ] Contains "글쓰기 스타일" section
  - [ ] References `.claude/writing-style.md`
  - [ ] Updated MDX template shows personal style

  **Automated Verification**:

  ```bash
  # Agent runs:
  grep -c "writing-style.md" .claude/commands/publish.md
  # Assert: At least 1 match (reference exists)

  grep -c "Tom" .claude/commands/publish.md
  # Assert: At least 1 match (Tom style mentioned)
  ```

  **Commit**: YES
  - Message: `docs(publish): add Tom style guide to publish command`
  - Files: `.claude/commands/publish.md`
  - Pre-commit: none

---

- [ ] 3. Pilot Rewrite: hello-world.mdx

  **What to do**:
  - Rewrite `content/posts/hello-world.mdx` as pilot test
  - Apply Tom style guide
  - Verify build passes
  - This establishes pattern for batch rewriting

  **Must NOT do**:
  - Don't change frontmatter fields (title, date, tags, category, source)
  - Don't add new sections that don't fit the content

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Content rewriting task
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 2)
  - **Blocks**: Tasks 4, 5, 6
  - **Blocked By**: Task 1

  **References**:

  **Source File**:
  - `content/posts/hello-world.mdx:1-35` - Current content to rewrite

  **Style Guide**:
  - `.claude/writing-style.md` - Apply this style (created in Task 1)

  **Transformation Example**:

  ```markdown
  # BEFORE (current):

  안녕하세요! Tom's Blog에 오신 것을 환영합니다.
  이 블로그에서는 **AI 관련 뉴스**와...

  # AFTER (Tom style):

  안녕하세요, Tom입니다! 👋

  드디어 블로그를 시작하게 됐어요.

  평소에 AI 뉴스를 읽으면서 "이거 한글로 정리하면 좋겠다" 싶은 게 많았거든요...
  ```

  **Acceptance Criteria**:
  - [ ] `content/posts/hello-world.mdx` rewritten
  - [ ] Uses personal greeting pattern
  - [ ] Conversational tone throughout
  - [ ] Frontmatter unchanged
  - [ ] `pnpm build` passes

  **Automated Verification**:

  ```bash
  # Agent runs:
  pnpm build
  # Assert: Exit code 0

  grep -c "Tom입니다" content/posts/hello-world.mdx
  # Assert: At least 1 match
  ```

  **Commit**: YES
  - Message: `content(blog): rewrite hello-world with Tom style (pilot)`
  - Files: `content/posts/hello-world.mdx`
  - Pre-commit: `pnpm build`

---

- [ ] 4. Batch Rewrite: Posts 1-8 (2026-01-23 posts)

  **What to do**:
  - Rewrite 8 posts from 2026-01-23 date range
  - Apply Tom style guide consistently
  - Preserve all frontmatter
  - Run build after batch

  **Target Files**:

  ```
  content/posts/2026-01-23-tldraw-closes-external-prs.mdx
  content/posts/2026-01-23-ai-codemod-refactoring.mdx
  content/posts/2026-01-23-claude-new-constitution.mdx
  content/posts/2026-01-23-ai-destroys-institutions.mdx
  content/posts/2026-01-23-claude-code-v2116.mdx
  content/posts/2026-01-23-nano-banana-naming.mdx
  content/posts/2026-01-23-openai-postgresql-scaling.mdx
  content/posts/2026-01-24-oh-my-opencode.mdx
  ```

  **Must NOT do**:
  - Don't modify frontmatter structure
  - Don't remove technical content (tables, code blocks)
  - Don't skip any post in the batch

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Batch content rewriting
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 5, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Task 3

  **References**:

  **Style Guide**:
  - `.claude/writing-style.md` - Apply this style

  **Pilot Reference**:
  - `content/posts/hello-world.mdx` - Reference rewritten style from Task 3

  **Transformation Pattern for News Posts**:

  ```markdown
  # Pattern for news/update posts:

  안녕하세요, Tom입니다.

  오늘은 [topic]에 대해 이야기해볼게요. [personal hook - why this matters]

  ## [Topic]이 뭔가요?

  [conversational explanation]

  💡 **여기서 중요한 점은** [key insight with personal opinion]

  ## 실제로 어떻게 동작하나요?

  [technical content with tables/code, but with conversational intro]

  🎯 **제가 가장 주목한 부분은** [highlight with opinion]

  ## 마무리

  [personal verdict and recommendation]
  ```

  **Acceptance Criteria**:
  - [ ] All 8 files rewritten
  - [ ] Each uses Tom style (personal greeting, conversational tone, emoji markers)
  - [ ] All frontmatter preserved
  - [ ] `pnpm build` passes

  **Automated Verification**:

  ```bash
  # Agent runs after batch:
  pnpm build
  # Assert: Exit code 0

  # Spot check for Tom style:
  grep -l "Tom입니다\|제가\|좋았\|아쉬" content/posts/2026-01-23-*.mdx | wc -l
  # Assert: At least 5 files have personal markers
  ```

  **Commit**: YES
  - Message: `content(blog): rewrite 2026-01-23 posts with Tom style (batch 1/3)`
  - Files: `content/posts/2026-01-23-*.mdx`, `content/posts/2026-01-24-oh-my-opencode.mdx`
  - Pre-commit: `pnpm build`

---

- [ ] 5. Batch Rewrite: Posts 9-16 (2026-01-24 to 2026-01-26)

  **What to do**:
  - Rewrite 8 posts from 2026-01-24 to 2026-01-26
  - Apply Tom style guide consistently
  - Preserve all frontmatter

  **Target Files**:

  ```
  content/posts/2026-01-24-opencode-introduction.mdx
  content/posts/2026-01-25-google-personal-intelligence.mdx
  content/posts/2026-01-25-openai-codex-agent-loop.mdx
  content/posts/2026-01-25-claude-code-v2119.mdx
  content/posts/2026-01-25-oh-my-opencode-v3.mdx
  content/posts/2026-01-26-claude-accelerating-science.mdx
  content/posts/2026-01-26-gpt5-for-work-report.mdx
  content/posts/2026-01-26-praktika-ai-language-learning.mdx
  ```

  **Must NOT do**:
  - Same guardrails as Task 4

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 4, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Task 3

  **References**:
  - `.claude/writing-style.md` - Style guide
  - `content/posts/hello-world.mdx` - Pilot reference

  **Acceptance Criteria**:
  - [ ] All 8 files rewritten
  - [ ] Each uses Tom style
  - [ ] All frontmatter preserved
  - [ ] `pnpm build` passes

  **Automated Verification**:

  ```bash
  pnpm build
  # Assert: Exit code 0

  grep -l "Tom입니다\|제가\|좋았\|아쉬" content/posts/2026-01-2[4-6]-*.mdx | wc -l
  # Assert: At least 5 files have personal markers
  ```

  **Commit**: YES
  - Message: `content(blog): rewrite 2026-01-24~26 posts with Tom style (batch 2/3)`
  - Files: Listed target files
  - Pre-commit: `pnpm build`

---

- [ ] 6. Batch Rewrite: Posts 17-24 (2026-01-28 to 2026-01-30)

  **What to do**:
  - Rewrite remaining 7 posts from 2026-01-28 to 2026-01-30
  - Apply Tom style guide consistently
  - Preserve all frontmatter

  **Target Files**:

  ```
  content/posts/2026-01-28-google-search-ai-mode.mdx
  content/posts/2026-01-28-google-ai-plus-global.mdx
  content/posts/2026-01-28-openai-eu-blueprint.mdx
  content/posts/2026-01-28-oh-my-opencode-v314.mdx
  content/posts/2026-01-29-openai-in-house-data-agent.mdx
  content/posts/2026-01-29-oh-my-opencode-v317.mdx
  content/posts/2026-01-30-google-project-genie.mdx
  ```

  **Must NOT do**:
  - Same guardrails as Task 4

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 4, 5)
  - **Blocks**: Task 7
  - **Blocked By**: Task 3

  **References**:
  - `.claude/writing-style.md` - Style guide
  - `content/posts/hello-world.mdx` - Pilot reference

  **Acceptance Criteria**:
  - [ ] All 7 files rewritten
  - [ ] Each uses Tom style
  - [ ] All frontmatter preserved
  - [ ] `pnpm build` passes

  **Automated Verification**:

  ```bash
  pnpm build
  # Assert: Exit code 0

  grep -l "Tom입니다\|제가\|좋았\|아쉬" content/posts/2026-01-2[8-9]-*.mdx content/posts/2026-01-30-*.mdx | wc -l
  # Assert: At least 5 files have personal markers
  ```

  **Commit**: YES
  - Message: `content(blog): rewrite 2026-01-28~30 posts with Tom style (batch 3/3)`
  - Files: Listed target files
  - Pre-commit: `pnpm build`

---

- [ ] 7. Final Verification and Cleanup

  **What to do**:
  - Run final `pnpm build` to verify all posts
  - Spot-check 3-4 random posts for style consistency
  - Verify no broken links or MDX errors
  - Clean up any temporary files

  **Must NOT do**:
  - Don't make additional content changes
  - Don't modify any non-content files

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple verification task
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (final verification)
  - **Parallel Group**: Wave 4 (solo)
  - **Blocks**: None (end of plan)
  - **Blocked By**: Tasks 4, 5, 6

  **References**:
  - All `content/posts/*.mdx` files
  - `.claude/writing-style.md` for style verification

  **Acceptance Criteria**:
  - [ ] `pnpm build` passes
  - [ ] Spot-check: 3+ random posts have Tom style markers
  - [ ] No MDX parsing errors in build output

  **Automated Verification**:

  ```bash
  # Final build verification
  pnpm build 2>&1 | tee build-output.txt
  # Assert: Exit code 0

  # Check for any MDX errors
  grep -i "error" build-output.txt | wc -l
  # Assert: 0 errors

  # Count posts with Tom style markers
  grep -l "Tom입니다" content/posts/*.mdx | wc -l
  # Assert: 24 (all posts)

  # Cleanup
  rm -f build-output.txt
  ```

  **Commit**: NO (verification only, no changes)

---

## Commit Strategy

| After Task | Message                                                                 | Files                           | Verification |
| ---------- | ----------------------------------------------------------------------- | ------------------------------- | ------------ |
| 1          | `docs(blog): add writing style guide for Tom's voice`                   | `.claude/writing-style.md`      | file exists  |
| 2          | `docs(publish): add Tom style guide to publish command`                 | `.claude/commands/publish.md`   | grep check   |
| 3          | `content(blog): rewrite hello-world with Tom style (pilot)`             | `content/posts/hello-world.mdx` | pnpm build   |
| 4          | `content(blog): rewrite 2026-01-23 posts with Tom style (batch 1/3)`    | 8 posts                         | pnpm build   |
| 5          | `content(blog): rewrite 2026-01-24~26 posts with Tom style (batch 2/3)` | 8 posts                         | pnpm build   |
| 6          | `content(blog): rewrite 2026-01-28~30 posts with Tom style (batch 3/3)` | 7 posts                         | pnpm build   |

---

## Success Criteria

### Verification Commands

```bash
# Build must pass
pnpm build
# Expected: Exit code 0, no errors

# All 24 posts should have Tom style
grep -l "Tom입니다" content/posts/*.mdx | wc -l
# Expected: 24

# Style guide must exist
test -f .claude/writing-style.md && echo "OK"
# Expected: OK

# Publish command must reference style guide
grep "writing-style" .claude/commands/publish.md
# Expected: At least one match
```

### Final Checklist

- [ ] All 24 posts use Tom style (personal greeting, conversational tone)
- [ ] Writing style guide created at `.claude/writing-style.md`
- [ ] /publish command updated with style reference
- [ ] All `pnpm build` commands pass
- [ ] No MDX parsing errors
- [ ] No changes to files outside scope (content/posts/, .claude/)
