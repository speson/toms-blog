# Persona-Driven Blog Transformation: Full-Stack Developer Voice

## TL;DR

> **Quick Summary**: Transform technical blog from neutral news translation to persona-driven content with full-stack developer perspective. Add schema fields for developer insights, create styled DeveloperPerspective component, and enhance 3 recent posts as pilot.
>
> **Deliverables**:
>
> - Extended Contentlayer schema with 5 new optional fields
> - `<DeveloperPerspective>` React component with gradient styling
> - Writing style guide with 3 post templates
> - 3 enhanced blog posts with developer commentary
>
> **Estimated Effort**: Medium (4-6 hours)
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Schema → Post Enhancement → Build Validation

---

## Context

### Original Request

Transform blog from neutral "translator" voice to persona-driven "full-stack developer" voice. Each post should include:

- Developer perspective section with hands-on insights
- Stack relevance ratings (frontend/backend/devops/tooling/database)
- Hands-on experience markers (tried vs. documentation-based)

This is a **PILOT project** targeting only the 3 most recent posts.

### Interview Summary

**Key Discussions**:

- **Hands-On Field**: Boolean type (`true` = personally tested, `false` = documentation-based)
- **Relevance Structure**: Object with nested high/medium/low ratings for 5 stack areas
- **Component Pattern**: Styled wrapper accepting MDX children (no frontmatter coupling)
- **Scope**: PILOT - only 3 posts, existing 20+ posts unchanged
- **Documentation**: Detailed templates with before/after examples

**Research Findings** (from explore agent):

- Current schema: 8 fields, all optional except title/description/date
- MDX registration: useMDXComponents() hook pattern in components/mdx-components.tsx
- Design system: Dark minimal (zinc palette), glassmorphism (bg-zinc-900/50 backdrop-blur-md), purple-500 accents
- Target posts confirmed: google-project-genie.mdx, openai-in-house-data-agent.mdx, oh-my-opencode-v317.mdx
- CodeBlock pattern: group hover, rounded-xl borders, transition effects

---

## Work Objectives

### Core Objective

Transform 3 recent blog posts from neutral news translation to persona-driven content with full-stack developer perspective, establishing reusable patterns for future content.

### Concrete Deliverables

1. **contentlayer.config.ts**: 5 new optional schema fields (hands_on, relevance, perspective, stack_context, tldr_verdict)
2. **components/developer-perspective.tsx**: Styled React component with gradient + glassmorphism
3. **components/mdx-components.tsx**: DeveloperPerspective registered in component map
4. **.claude/guides/writing-style.md**: Writing guide with 3 templates + examples
5. **content/posts/2026-01-30-google-project-genie.mdx**: Enhanced with frontmatter + DeveloperPerspective section
6. **content/posts/2026-01-29-openai-in-house-data-agent.mdx**: Enhanced with frontmatter + DeveloperPerspective section
7. **content/posts/2026-01-29-oh-my-opencode-v317.mdx**: Enhanced with frontmatter + DeveloperPerspective section

### Definition of Done

- [ ] `pnpm build` exits with code 0 (no TypeScript/Contentlayer errors)
- [ ] `pnpm dev` shows all 3 enhanced posts with DeveloperPerspective sections rendered
- [ ] DeveloperPerspective component matches design system (purple gradient, glassmorphism)
- [ ] All 3 posts have complete frontmatter (hands_on, relevance, perspective, stack_context, tldr_verdict)
- [ ] Writing guide includes 3 templates + 2 before/after examples

### Must Have

- Schema fields must be optional (no breaking changes to existing 20+ posts)
- Component must use existing design tokens (zinc palette, purple-500 accent)
- Relevance object must have exactly 5 fields: frontend, backend, devops, tooling, database
- Each field must accept only "high" | "medium" | "low" values

### Must NOT Have (Guardrails)

- **No breaking changes**: Existing posts must render without modification
- **No light mode toggle**: Dark mode only (per CLAUDE.md - light mode is post-MVP)
- **No database changes**: File-based content only, no external data
- **No new dependencies**: Use existing Tailwind, no new UI libraries
- **No AI slop**: Avoid generic "this is exciting" commentary, use specific technical insights
- **No over-engineering**: Component is a styled wrapper only, no state management, no context providers

---

## Verification Strategy (MANDATORY)

### Test Decision

- **Infrastructure exists**: YES (pnpm build, Next.js dev server)
- **User wants tests**: Manual verification (no unit tests for this pilot)
- **Framework**: N/A (no test infrastructure setup needed)

### Automated Verification Only (NO User Intervention)

Each TODO includes EXECUTABLE verification procedures that agents can run directly.

**By Deliverable Type:**

| Type                | Verification Tool      | Automated Procedure                                             |
| ------------------- | ---------------------- | --------------------------------------------------------------- |
| **Schema Changes**  | Bash (pnpm)            | `pnpm build` → exit code 0, no TypeScript errors                |
| **React Component** | Bash (pnpm dev) + Read | Dev server starts, component file compiles                      |
| **MDX Content**     | Read + Grep            | Frontmatter fields present, DeveloperPerspective sections exist |
| **Build Output**    | Bash (pnpm build)      | Static generation succeeds, all posts render                    |

**Evidence Requirements (Agent-Executable):**

- Terminal output showing `pnpm build` success
- Grep results confirming frontmatter fields in target posts
- Read output showing component code structure

---

## Execution Strategy

### Parallel Execution Waves

> Maximize throughput by grouping independent tasks into parallel waves.
> Each wave completes before the next begins.

```
Wave 1 (Foundation - Start Immediately):
├── Task 1: Extend Contentlayer Schema [no dependencies]
├── Task 2: Create DeveloperPerspective Component [no dependencies]
└── Task 4: Write Style Guide Documentation [no dependencies]

Wave 2 (Integration - After Wave 1):
└── Task 3: Register MDX Component [depends: 2]

Wave 3 (Content Enhancement - After Wave 2):
├── Task 5: Enhance google-project-genie.mdx [depends: 1, 3]
├── Task 6: Enhance openai-in-house-data-agent.mdx [depends: 1, 3]
└── Task 7: Enhance oh-my-opencode-v317.mdx [depends: 1, 3]

Wave 4 (Validation - After Wave 3):
└── Task 8: Build Validation [depends: all previous]

Critical Path: Task 2 → Task 3 → Task 5 → Task 8
Parallel Speedup: ~50% faster than sequential (Wave 1 and Wave 3 parallelized)
```

### Dependency Matrix

| Task              | Depends On | Blocks  | Can Parallelize With |
| ----------------- | ---------- | ------- | -------------------- |
| 1. Schema         | None       | 5, 6, 7 | 2, 4                 |
| 2. Component      | None       | 3       | 1, 4                 |
| 3. Registration   | 2          | 5, 6, 7 | None (bridge task)   |
| 4. Style Guide    | None       | None    | 1, 2                 |
| 5. Enhance Post 1 | 1, 3       | 8       | 6, 7                 |
| 6. Enhance Post 2 | 1, 3       | 8       | 5, 7                 |
| 7. Enhance Post 3 | 1, 3       | 8       | 5, 6                 |
| 8. Validation     | 1-7        | None    | None (final)         |

### Agent Dispatch Summary

| Wave | Tasks   | Recommended Agents | Run in Background   |
| ---- | ------- | ------------------ | ------------------- |
| 1    | 1, 2, 4 | 3x quick category  | true (parallel)     |
| 2    | 3       | quick category     | false (single task) |
| 3    | 5, 6, 7 | 3x quick category  | true (parallel)     |
| 4    | 8       | quick category     | false (validation)  |

---

## TODOs

### Wave 1: Foundation (Parallel)

---

- [ ] 1. Extend Contentlayer Schema

  **What to do**:
  - Open `contentlayer.config.ts`
  - Add 5 new optional fields to Post document definition:
    ```typescript
    hands_on: { type: 'boolean', required: false }
    relevance: {
      type: 'nested',
      of: {
        frontend: { type: 'enum', options: ['high', 'medium', 'low'], required: false },
        backend: { type: 'enum', options: ['high', 'medium', 'low'], required: false },
        devops: { type: 'enum', options: ['high', 'medium', 'low'], required: false },
        tooling: { type: 'enum', options: ['high', 'medium', 'low'], required: false },
        database: { type: 'enum', options: ['high', 'medium', 'low'], required: false }
      },
      required: false
    }
    perspective: { type: 'string', required: false }
    stack_context: { type: 'string', required: false }
    tldr_verdict: { type: 'string', required: false }
    ```
  - All fields must be optional (required: false)
  - Follow existing schema pattern (see fields like `tags`, `source`, `category`)

  **Must NOT do**:
  - Do not make any fields required (breaks existing posts)
  - Do not modify existing fields
  - Do not add computed fields (slug, url already exist)
  - Do not change MDX plugin configuration

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single-file edit, well-defined schema extension, low complexity
  - **Skills**: None needed
    - Reason: Contentlayer schema is TypeScript-based, no domain-specific patterns required
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed (schema definition, not UI work)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 4)
  - **Blocks**: Tasks 5, 6, 7 (posts need schema fields available)
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References** (existing code to follow):
  - `contentlayer.config.ts:11-19` - Existing optional field pattern (`tags`, `source`, `category`, `sourceUrl`, `draft`)
  - `contentlayer.config.ts:15` - Enum pattern for `source` field (apply to relevance nested enums)
  - `contentlayer.config.ts:16` - Enum pattern for `category` field (apply to relevance nested enums)

  **API/Type References**:
  - Contentlayer2 field types: https://contentlayer2.dev/docs/reference/source-files/field-types
  - Nested object pattern: Use `type: 'nested'` with `of` property for relevance object

  **WHY Each Reference Matters**:
  - Lines 11-19 show how optional fields are structured (`required: false`)
  - Line 15-16 demonstrate enum syntax (`options: ['value1', 'value2']`)
  - Nested types need `type: 'nested'` wrapper with `of` containing field definitions

  **Acceptance Criteria**:

  **Automated Verification**:

  ```bash
  # Agent runs:
  cd /Users/sonhyowon/Workspace/tom-project
  pnpm build 2>&1 | tee /tmp/build-output.txt
  echo "Exit code: $?"

  # Assert: Exit code 0
  # Assert: Output does NOT contain "error TS" (TypeScript errors)
  # Assert: Output contains "Contentlayer config change detected" or similar success message
  ```

  **Evidence to Capture**:
  - [ ] Terminal output from `pnpm build` showing success
  - [ ] Grep contentlayer.config.ts for new fields: `grep -E "(hands_on|relevance|perspective|stack_context|tldr_verdict)" contentlayer.config.ts`

  **Commit**: YES
  - Message: `feat(schema): add persona-driven fields to Post schema`
  - Files: `contentlayer.config.ts`
  - Pre-commit: `pnpm build` (must pass)

---

- [ ] 2. Create DeveloperPerspective Component

  **What to do**:
  - Create new file: `components/developer-perspective.tsx`
  - Export React component that accepts children (MDX content wrapper)
  - Apply styling:
    - Container: `rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 backdrop-blur-md`
    - Title: `"개발자 관점"` with icon, `text-lg font-semibold text-purple-400 mb-4`
    - Content wrapper: `prose prose-invert max-w-none` (for MDX content)
  - Component signature: `export default function DeveloperPerspective({ children }: { children: React.ReactNode })`
  - Use `"use client"` directive (client component for interactivity if needed later)

  **Must NOT do**:
  - Do not read frontmatter fields (component is presentational only)
  - Do not add state management or context
  - Do not install new dependencies (use existing Tailwind classes)
  - Do not create variants or props beyond children (keep simple)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component creation requiring design system adherence and visual polish
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Component must match existing design system (glassmorphism, gradients, spacing)
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed (no browser testing required for pilot)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 4)
  - **Blocks**: Task 3 (registration needs component to exist)
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References** (existing code to follow):
  - `components/code-block.tsx:1-45` - Client component pattern with glassmorphism styling
  - `components/code-block.tsx:15-18` - Glassmorphism pattern: `rounded-lg border border-zinc-800 bg-zinc-900`
  - `components/post-card.tsx:45-50` - Purple accent usage: `text-purple-400`, `bg-purple-500/10`
  - `components/category-sidebar.tsx:30-35` - Active state styling with purple gradient

  **Design System References**:
  - CLAUDE.md Colors section: Background (#000000, #0a0a0a, #18181b), Text (#fafafa, #a1a1aa), Accent (purple-500 → blue-500 gradient)
  - CLAUDE.md Effects section: Glassmorphism pattern `bg-zinc-900/50 backdrop-blur-md`

  **External References**:
  - Tailwind CSS gradients: https://tailwindcss.com/docs/gradient-color-stops
  - Tailwind CSS backdrop blur: https://tailwindcss.com/docs/backdrop-blur

  **WHY Each Reference Matters**:
  - CodeBlock shows the "use client" + glassmorphism pattern used throughout the site
  - PostCard demonstrates purple accent color usage (text-purple-400, bg-purple-500/10)
  - CategorySidebar shows how to style active states with purple
  - CLAUDE.md defines the exact color values and design system constraints

  **Acceptance Criteria**:

  **Automated Verification**:

  ```bash
  # Agent runs:
  cd /Users/sonhyowon/Workspace/tom-project

  # 1. Check file exists
  test -f components/developer-perspective.tsx && echo "✓ File exists" || echo "✗ File missing"

  # 2. Check for required patterns
  grep -q '"use client"' components/developer-perspective.tsx && echo "✓ Client component" || echo "✗ Missing 'use client'"
  grep -q 'export default function DeveloperPerspective' components/developer-perspective.tsx && echo "✓ Export found" || echo "✗ Missing export"
  grep -q 'children.*React.ReactNode' components/developer-perspective.tsx && echo "✓ Children prop" || echo "✗ Missing children"
  grep -q 'rounded-xl.*border.*purple' components/developer-perspective.tsx && echo "✓ Styling present" || echo "✗ Missing styling"

  # 3. Build check (TypeScript compilation)
  pnpm build 2>&1 | grep -q "Compiled successfully" && echo "✓ Build passes" || echo "✗ Build failed"
  ```

  **Evidence to Capture**:
  - [ ] Read components/developer-perspective.tsx to confirm structure
  - [ ] Terminal output from grep commands showing all patterns present
  - [ ] Build output showing component compiles without errors

  **Commit**: YES
  - Message: `feat(component): add DeveloperPerspective MDX component`
  - Files: `components/developer-perspective.tsx`
  - Pre-commit: `pnpm build` (must pass)

---

- [ ] 4. Write Style Guide Documentation

  **What to do**:
  - Create new file: `.claude/guides/writing-style.md`
  - Structure:
    1. **Voice and Tone**: Full-stack developer persona, authentic insights, no AI slop
    2. **Three Post Templates**:
       - News Commentary (AI announcement analysis)
       - Tool Review (developer tool evaluation)
       - Build Log (implementation journal)
    3. **DeveloperPerspective Section Template**: Structure for "개발자 관점" with subsections
    4. **Before/After Examples**: 2 examples showing neutral → persona-driven transformation
    5. **Dos and Don'ts**: Specific guidelines (e.g., "Do: Share specific file paths and commands" / "Don't: Generic 'this is exciting' statements")
  - Tone: Practical, technical, conversational (not academic)
  - Include frontmatter examples for each template

  **Must NOT do**:
  - Do not write generic "be authentic" advice without examples
  - Do not create templates for post types not requested (only 3 templates)
  - Do not include SEO optimization tips (out of scope)
  - Do not add marketing/promotional language guidelines

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Documentation creation requiring clear structure and examples
  - **Skills**: None needed
    - Reason: Writing guide creation is straightforward documentation work
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed (Markdown documentation, not UI)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: None (documentation is reference material)
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References** (existing content to analyze):
  - `content/posts/2026-01-30-google-project-genie.mdx` - Example of current "neutral translator" style (before state)
  - `content/posts/2026-01-29-openai-in-house-data-agent.mdx` - Example with tables and structured content
  - `content/posts/2026-01-29-oh-my-opencode-v317.mdx` - Example of release notes format

  **Design Principles**:
  - User's stated goal: "Full-stack developer voice (not limited to frontend)"
  - User's stated requirement: "Hands-on experience markers (tried vs. documentation-based)"
  - Guardrail: "No AI slop - avoid generic 'this is exciting' commentary"

  **External References**:
  - Technical writing examples: https://github.com/readme/guides/technical-writing-basics
  - Developer blog voice: https://vercel.com/blog (example of technical + conversational tone)

  **WHY Each Reference Matters**:
  - Existing posts show the "before" state that needs transformation
  - User's explicit requirements define the "after" target voice
  - External examples demonstrate successful technical + conversational balance

  **Acceptance Criteria**:

  **Automated Verification**:

  ```bash
  # Agent runs:
  cd /Users/sonhyowon/Workspace/tom-project

  # 1. Check file exists
  test -f .claude/guides/writing-style.md && echo "✓ File exists" || echo "✗ File missing"

  # 2. Check for required sections
  grep -q "## Voice and Tone" .claude/guides/writing-style.md && echo "✓ Voice section" || echo "✗ Missing Voice"
  grep -q "## News Commentary" .claude/guides/writing-style.md && echo "✓ Template 1" || echo "✗ Missing News Commentary"
  grep -q "## Tool Review" .claude/guides/writing-style.md && echo "✓ Template 2" || echo "✗ Missing Tool Review"
  grep -q "## Build Log" .claude/guides/writing-style.md && echo "✓ Template 3" || echo "✗ Missing Build Log"
  grep -q "## Before/After" .claude/guides/writing-style.md && echo "✓ Examples present" || echo "✗ Missing examples"
  grep -q "## Dos and Don'ts" .claude/guides/writing-style.md && echo "✓ Guidelines present" || echo "✗ Missing guidelines"

  # 3. Check for frontmatter examples
  grep -c "^---$" .claude/guides/writing-style.md  # Should find 6+ (3 templates × 2 frontmatter delimiters)
  ```

  **Evidence to Capture**:
  - [ ] Read .claude/guides/writing-style.md to confirm all 5 sections present
  - [ ] Terminal output from grep commands showing all required sections exist
  - [ ] Word count check: `wc -w .claude/guides/writing-style.md` (should be 1500+ words for detailed guide)

  **Commit**: YES
  - Message: `docs(guides): add persona-driven writing style guide`
  - Files: `.claude/guides/writing-style.md`
  - Pre-commit: None (Markdown documentation)

---

### Wave 2: Integration (Sequential)

---

- [ ] 3. Register MDX Component

  **What to do**:
  - Open `components/mdx-components.tsx`
  - Import DeveloperPerspective: `import DeveloperPerspective from './developer-perspective'`
  - Add to component map returned by useMDXComponents():
    ```typescript
    DeveloperPerspective,  // Add to returned object
    ```
  - Follow existing pattern (see how h1, h2, CodeBlock are registered)

  **Must NOT do**:
  - Do not modify existing component mappings
  - Do not add wrapper logic or props transformation
  - Do not change the useMDXComponents function signature

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single-file edit, simple import + export addition
  - **Skills**: None needed
    - Reason: Straightforward component registration following existing pattern
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed (registration logic, not UI work)

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (sequential after Wave 1)
  - **Blocks**: Tasks 5, 6, 7 (posts need component registered to use <DeveloperPerspective>)
  - **Blocked By**: Task 2 (component file must exist before importing)

  **References**:

  **Pattern References**:
  - `components/mdx-components.tsx:1-5` - Import pattern for components
  - `components/mdx-components.tsx:8-12` - useMDXComponents hook structure
  - `components/mdx-components.tsx:18` - CodeBlock component registration pattern (custom component, not HTML element)

  **WHY Each Reference Matters**:
  - Lines 1-5 show import syntax (import DeveloperPerspective from './developer-perspective')
  - Lines 8-12 show function structure (return object with component mappings)
  - Line 18 shows how custom components (not HTML elements) are registered

  **Acceptance Criteria**:

  **Automated Verification**:

  ```bash
  # Agent runs:
  cd /Users/sonhyowon/Workspace/tom-project

  # 1. Check import added
  grep -q "import DeveloperPerspective from" components/mdx-components.tsx && echo "✓ Import present" || echo "✗ Missing import"

  # 2. Check component registered
  grep -q "DeveloperPerspective," components/mdx-components.tsx && echo "✓ Registration present" || echo "✗ Missing registration"

  # 3. Build check
  pnpm build 2>&1 | grep -q "Compiled successfully" && echo "✓ Build passes" || echo "✗ Build failed"
  ```

  **Evidence to Capture**:
  - [ ] Read components/mdx-components.tsx showing DeveloperPerspective import and registration
  - [ ] Terminal output from build showing no errors

  **Commit**: YES
  - Message: `feat(mdx): register DeveloperPerspective in MDX components`
  - Files: `components/mdx-components.tsx`
  - Pre-commit: `pnpm build` (must pass)

---

### Wave 3: Content Enhancement (Parallel)

---

- [ ] 5. Enhance google-project-genie.mdx

  **What to do**:
  - Open `content/posts/2026-01-30-google-project-genie.mdx`
  - Add frontmatter fields:
    ```yaml
    hands_on: false # US-only, documentation-based
    relevance:
      frontend: "high" # WebGL/Canvas rendering implications
      backend: "medium" # API integration for world generation
      devops: "low"
      tooling: "medium" # AI-assisted prototyping workflows
      database: "low"
    perspective: "Interactive world generation as developer playground"
    stack_context: "Frontend devs: WebGL/Canvas rendering patterns. Backend devs: World state API design."
    tldr_verdict: "Revolutionary prototyping tool - but US-only access limits adoption. Watch for API/SDK release."
    ```
  - Add `<DeveloperPerspective>` section at end of post (before closing):

    ```mdx
    <DeveloperPerspective>

    **실무에서 이게 왜 중요한가:**

    게임 개발자나 인터랙티브 콘텐츠 제작자가 아니더라도, Project Genie의 핵심 아이디어는 주목할 가치가 있습니다. "텍스트 → 인터랙티브 환경"이라는 패러다임은 프로토타입 검증 속도를 극적으로 높일 수 있습니다.

    **프론트엔드 관점 (React/Next.js):**

    - WebGL/Canvas 기반 렌더링 엔진 통합 패턴 연구 기회
    - 실시간 상태 동기화 (사용자 입력 → 월드 변화 → UI 반영)
    - 성능 최적화: 60fps 유지하면서 복잡한 환경 렌더링

    **백엔드 관점 (Node.js/Python):**

    - 월드 상태 관리 API 설계 (GraphQL vs REST)
    - 실시간 이벤트 스트리밍 (WebSocket/SSE)
    - AI 모델 통합: Genie API가 공개되면 백엔드에서 호출하는 구조

    **내가 테스트하지 못한 이유:**
    ⚠️ US AI Ultra 구독자 전용 - 한국에서 접근 불가  
    📄 공식 문서와 데모 영상 기반 분석

    **주목할 코드 패턴:**

    - Vercel AI SDK + Genie API 통합 예상 패턴
    - Canvas 렌더링 최적화 (requestAnimationFrame, OffscreenCanvas)

    </DeveloperPerspective>
    ```

  **Must NOT do**:
  - Do not modify existing content above the DeveloperPerspective section
  - Do not change the post's title, description, date, or existing frontmatter
  - Do not add generic "this is exciting" language
  - Do not invent hands-on experience (hands_on: false is accurate)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Content enhancement following provided template, low complexity
  - **Skills**: None needed
    - Reason: Template-based content addition with clear frontmatter structure
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed (content editing, not component work)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 7)
  - **Blocks**: Task 8 (build validation)
  - **Blocked By**: Tasks 1, 3 (schema must exist, component must be registered)

  **References**:

  **Pattern References**:
  - `content/posts/2026-01-30-google-project-genie.mdx:1-9` - Existing frontmatter structure
  - `.claude/guides/writing-style.md` - DeveloperPerspective section template (created in Task 4)

  **API/Type References**:
  - `contentlayer.config.ts` - New schema fields defined in Task 1 (hands_on, relevance, perspective, stack_context, tldr_verdict)

  **WHY Each Reference Matters**:
  - Existing frontmatter shows the YAML structure to extend
  - Writing guide provides the template for DeveloperPerspective content
  - Schema definition ensures field names and types match exactly

  **Acceptance Criteria**:

  **Automated Verification**:

  ```bash
  # Agent runs:
  cd /Users/sonhyowon/Workspace/tom-project

  # 1. Check frontmatter fields added
  grep -q "hands_on: false" content/posts/2026-01-30-google-project-genie.mdx && echo "✓ hands_on field" || echo "✗ Missing hands_on"
  grep -q "relevance:" content/posts/2026-01-30-google-project-genie.mdx && echo "✓ relevance field" || echo "✗ Missing relevance"
  grep -q "frontend: \"high\"" content/posts/2026-01-30-google-project-genie.mdx && echo "✓ relevance.frontend" || echo "✗ Missing relevance.frontend"
  grep -q "perspective:" content/posts/2026-01-30-google-project-genie.mdx && echo "✓ perspective field" || echo "✗ Missing perspective"

  # 2. Check DeveloperPerspective section added
  grep -q "<DeveloperPerspective>" content/posts/2026-01-30-google-project-genie.mdx && echo "✓ Component opening tag" || echo "✗ Missing opening tag"
  grep -q "</DeveloperPerspective>" content/posts/2026-01-30-google-project-genie.mdx && echo "✓ Component closing tag" || echo "✗ Missing closing tag"
  grep -q "실무에서 이게 왜 중요한가" content/posts/2026-01-30-google-project-genie.mdx && echo "✓ Korean section header" || echo "✗ Missing section"

  # 3. Build check
  pnpm build 2>&1 | grep -q "2026-01-30-google-project-genie" && echo "✓ Post builds" || echo "✗ Build failed"
  ```

  **Evidence to Capture**:
  - [ ] Grep output confirming all 5 frontmatter fields present
  - [ ] Grep output confirming DeveloperPerspective tags and content
  - [ ] Build output showing post compiles successfully

  **Commit**: YES (groups with 6, 7)
  - Message: `content: enhance 3 posts with persona-driven perspective`
  - Files: `content/posts/2026-01-30-google-project-genie.mdx`, `content/posts/2026-01-29-openai-in-house-data-agent.mdx`, `content/posts/2026-01-29-oh-my-opencode-v317.mdx`
  - Pre-commit: `pnpm build` (must pass)

---

- [ ] 6. Enhance openai-in-house-data-agent.mdx

  **What to do**:
  - Open `content/posts/2026-01-29-openai-in-house-data-agent.mdx`
  - Add frontmatter fields:
    ```yaml
    hands_on: false # OpenAI internal tool, documentation-based
    relevance:
      frontend: "medium" # Dashboard UI for data queries
      backend: "high" # Data pipeline orchestration
      devops: "medium" # Infrastructure for data processing
      tooling: "high" # Developer productivity tool pattern
      database: "high" # SQL generation, query optimization
    perspective: "AI-powered data agent as internal tool blueprint"
    stack_context: "Backend devs: LangChain-style agent orchestration. Data engineers: SQL generation patterns. Frontend devs: Natural language query UI."
    tldr_verdict: "Blueprint for building internal data tools with GPT-5 + Codex. Key insight: Embeddings for semantic search over schemas."
    ```
  - Add `<DeveloperPerspective>` section at end:

    ```mdx
    <DeveloperPerspective>

    **실무에서 이게 왜 중요한가:**

    OpenAI가 자체 데이터 플랫폼을 위해 구축한 에이전트는 "AI 도구를 어떻게 사내 워크플로우에 통합할 것인가"에 대한 실전 케이스 스터디입니다. 특히 GPT-5, Codex, Embeddings API를 조합한 아키텍처는 바로 적용 가능합니다.

    **백엔드 관점 (Node.js/Python):**

    - **Agent Orchestration**: LangChain 스타일 체인 구성 (Query → SQL 생성 → 실행 → 결과 요약)
    - **SQL Generation**: Codex로 자연어 → SQL 변환 (스키마 정보를 컨텍스트로 주입)
    - **Semantic Search**: Embeddings API로 스키마 검색 (사용자 질문과 가장 관련 있는 테이블 찾기)
    - **Error Handling**: SQL 실행 실패 시 재시도 로직 (에러 메시지를 LLM에 피드백)

    **프론트엔드 관점 (React/Next.js):**

    - **자연어 쿼리 UI**: 검색창 + 자동완성 (Embeddings로 유사 질문 제안)
    - **결과 시각화**: 테이블, 차트 자동 선택 (데이터 타입 기반)
    - **쿼리 히스토리**: 이전 질문 재사용 (로컬 스토리지 또는 DB 저장)

    **데이터베이스 관점:**

    - **Schema Metadata**: 각 테이블/컬럼에 대한 설명 저장 (Embeddings 생성용)
    - **Query Optimization**: Codex 생성 SQL의 실행 계획 분석
    - **Access Control**: Row-level security 적용 (사용자별 권한)

    **내가 테스트하지 못한 이유:**
    ⚠️ OpenAI 내부 도구 - 외부 공개 없음  
    📄 OpenAI 블로그 포스트 기반 분석

    **주목할 기술 스택:**

    - GPT-5 (추론), Codex (코드 생성), Embeddings API (의미 검색)
    - 이 조합은 Vercel AI SDK + OpenAI SDK로 재현 가능

    **구현 참고 리포지토리:**

    - LangChain SQL Agent 예제
    - Vercel AI SDK - useChat hook + tool calling

    </DeveloperPerspective>
    ```

  **Must NOT do**:
  - Do not modify existing tables or content structure
  - Do not claim hands-on experience (hands_on: false is accurate)
  - Do not oversell the tool (it's internal, not publicly available)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Content enhancement following provided template
  - **Skills**: None needed
    - Reason: Template-based content addition
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed (content editing)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 5, 7)
  - **Blocks**: Task 8 (build validation)
  - **Blocked By**: Tasks 1, 3 (schema + registration)

  **References**:

  **Pattern References**:
  - `content/posts/2026-01-29-openai-in-house-data-agent.mdx:1-9` - Existing frontmatter
  - `.claude/guides/writing-style.md` - DeveloperPerspective template
  - Task 5 enhancement - Follow same structure

  **WHY Each Reference Matters**:
  - Same pattern as Task 5, adapted for data agent context
  - Relevance fields prioritize backend/database (high) since this is data tooling

  **Acceptance Criteria**:

  **Automated Verification**:

  ```bash
  # Agent runs (same pattern as Task 5):
  cd /Users/sonhyowon/Workspace/tom-project

  grep -q "hands_on: false" content/posts/2026-01-29-openai-in-house-data-agent.mdx && echo "✓ hands_on"
  grep -q "backend: \"high\"" content/posts/2026-01-29-openai-in-house-data-agent.mdx && echo "✓ backend relevance"
  grep -q "database: \"high\"" content/posts/2026-01-29-openai-in-house-data-agent.mdx && echo "✓ database relevance"
  grep -q "<DeveloperPerspective>" content/posts/2026-01-29-openai-in-house-data-agent.mdx && echo "✓ Component"

  pnpm build 2>&1 | grep -q "2026-01-29-openai-in-house-data-agent" && echo "✓ Build"
  ```

  **Evidence to Capture**:
  - [ ] Grep output showing frontmatter + component tags
  - [ ] Build output confirming successful compilation

  **Commit**: YES (groups with 5, 7)
  - Same commit as Task 5

---

- [ ] 7. Enhance oh-my-opencode-v317.mdx

  **What to do**:
  - Open `content/posts/2026-01-29-oh-my-opencode-v317.mdx`
  - Add frontmatter fields:
    ```yaml
    hands_on: true # User has direct experience with oh-my-opencode
    relevance:
      frontend: "low"
      backend: "low"
      devops: "medium" # CLI tool deployment
      tooling: "high" # Developer productivity tool
      database: "low"
    perspective: "OAuth 2.1 integration for AI coding tools"
    stack_context: "Tooling-focused: OAuth setup for MCP servers, LSP client migration patterns."
    tldr_verdict: "Solid OAuth 2.1 support. If you're building MCP servers, this release simplifies auth. LSP migration is internal improvement."
    ```
  - Add `<DeveloperPerspective>` section at end:

    ````mdx
    <DeveloperPerspective>

    **실무에서 이게 왜 중요한가:**

    Oh My OpenCode는 제가 직접 사용 중인 AI 코딩 도구입니다. v3.1.7의 OAuth 2.1 완전 지원은 특히 MCP(Model Context Protocol) 서버를 구축하는 개발자에게 중요한 업데이트입니다.

    **OAuth 2.1 통합 (RFC 7591, RFC 9728):**

    - **Dynamic Client Registration**: MCP 서버가 OAuth 제공자에 자동 등록
    - **PKCE 필수 적용**: 보안 강화 (authorization code flow에서 code verifier/challenge 사용)
    - **Refresh Token Rotation**: 토큰 탈취 방지

    **내가 실제로 테스트한 것:**
    ✅ Oh My OpenCode 설치 및 기본 설정 (`.opencode/config.yaml`)  
    ✅ MCP 서버 연결 테스트 (로컬 개발 환경)  
    ✅ OAuth 플로우 확인 (GitHub OAuth App 연동)

    **아직 테스트하지 못한 것:**
    ⚠️ 프로덕션 환경에서 OAuth 2.1 Dynamic Registration (로컬만 테스트)  
    ⚠️ Refresh Token Rotation 시나리오 (단기 세션만 사용)

    **React 프로젝트에서 OAuth 설정 팁:**

    ```typescript
    // oh-my-opencode OAuth 설정 예시
    // .opencode/config.yaml
    mcp_servers:
      my_server:
        oauth:
          client_id: ${GITHUB_CLIENT_ID}
          client_secret: ${GITHUB_CLIENT_SECRET}
          redirect_uri: http://localhost:3000/api/auth/callback
          scopes: ["read:user", "repo"]
    ```
    ````

    **LSP 클라이언트 마이그레이션:**
    - `vscode-jsonrpc` 도입으로 LSP 통신 안정성 향상
    - 개발자 입장에서는 내부 변경 (API 변화 없음)

    **백그라운드 에이전트 안정성 개선:**
    - 장시간 실행 시 메모리 누수 해결
    - 에러 핸들링 개선 (네트워크 장애 시 재시도)

    **추천 사용 사례:**
    - MCP 서버 개발자: OAuth 2.1 지원으로 인증 구현 간소화
    - CLI 도구 사용자: 백그라운드 에이전트 안정성 향상 체감 가능

    </DeveloperPerspective>
    ```

  **Must NOT do**:
  - Do not invent features not in the release notes
  - Do not exaggerate personal testing scope (be honest about what was tested)
  - Do not add generic praise without technical details

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Content enhancement following template
  - **Skills**: None needed
    - Reason: Template-based content addition
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed (content editing)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 5, 6)
  - **Blocks**: Task 8 (build validation)
  - **Blocked By**: Tasks 1, 3 (schema + registration)

  **References**:

  **Pattern References**:
  - `content/posts/2026-01-29-oh-my-opencode-v317.mdx:1-9` - Existing frontmatter
  - `.claude/guides/writing-style.md` - DeveloperPerspective template
  - Tasks 5, 6 enhancements - Follow same structure

  **WHY Each Reference Matters**:
  - Same pattern as Tasks 5/6, adapted for tooling context
  - hands_on: true (unique to this post - user has direct experience)
  - Relevance prioritizes tooling (high) since this is developer tool

  **Acceptance Criteria**:

  **Automated Verification**:

  ```bash
  # Agent runs:
  cd /Users/sonhyowon/Workspace/tom-project

  grep -q "hands_on: true" content/posts/2026-01-29-oh-my-opencode-v317.mdx && echo "✓ hands_on true"
  grep -q "tooling: \"high\"" content/posts/2026-01-29-oh-my-opencode-v317.mdx && echo "✓ tooling relevance"
  grep -q "<DeveloperPerspective>" content/posts/2026-01-29-oh-my-opencode-v317.mdx && echo "✓ Component"
  grep -q "내가 실제로 테스트한 것" content/posts/2026-01-29-oh-my-opencode-v317.mdx && echo "✓ Hands-on section"

  pnpm build 2>&1 | grep -q "2026-01-29-oh-my-opencode-v317" && echo "✓ Build"
  ```

  **Evidence to Capture**:
  - [ ] Grep output showing hands_on: true and other frontmatter
  - [ ] Build output confirming successful compilation

  **Commit**: YES (groups with 5, 6)
  - Same commit as Tasks 5, 6

---

### Wave 4: Validation (Sequential)

---

- [ ] 8. Build Validation

  **What to do**:
  - Run full production build: `pnpm build`
  - Verify exit code 0 (no errors)
  - Check build output for all 3 enhanced posts
  - Run dev server: `pnpm dev` and visually inspect one post with DeveloperPerspective
  - Capture build logs and dev server output

  **Must NOT do**:
  - Do not skip build step (required for final validation)
  - Do not ignore TypeScript warnings (must be zero warnings)
  - Do not deploy to production (out of scope for pilot)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single validation command execution
  - **Skills**: None needed
    - Reason: Running pnpm commands, no domain-specific knowledge
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed (no browser automation for pilot)

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (sequential after Wave 3)
  - **Blocks**: None (final task)
  - **Blocked By**: Tasks 1-7 (all changes must be applied)

  **References**:

  **Verification Commands**:
  - `pnpm build` - Full production build
  - `pnpm dev` - Start development server (for manual visual check)

  **Expected Outputs**:
  - Build: "Compiled successfully", exit code 0
  - Dev server: "Ready in Xms", localhost URL shown

  **WHY This Matters**:
  - Final gate before declaring pilot complete
  - Catches integration issues between schema, component, and content
  - Ensures no regressions in existing posts

  **Acceptance Criteria**:

  **Automated Verification**:

  ```bash
  # Agent runs:
  cd /Users/sonhyowon/Workspace/tom-project

  # 1. Full production build
  pnpm build > /tmp/build-output.txt 2>&1
  BUILD_EXIT=$?

  echo "=== Build Exit Code: $BUILD_EXIT ==="
  cat /tmp/build-output.txt

  # 2. Check for errors
  grep -i "error" /tmp/build-output.txt && echo "✗ Errors found" || echo "✓ No errors"

  # 3. Check for TypeScript errors
  grep "error TS" /tmp/build-output.txt && echo "✗ TypeScript errors" || echo "✓ No TS errors"

  # 4. Verify all 3 posts built
  grep -q "2026-01-30-google-project-genie" /tmp/build-output.txt && echo "✓ Post 1 built"
  grep -q "2026-01-29-openai-in-house-data-agent" /tmp/build-output.txt && echo "✓ Post 2 built"
  grep -q "2026-01-29-oh-my-opencode-v317" /tmp/build-output.txt && echo "✓ Post 3 built"

  # 5. Assert exit code
  [ $BUILD_EXIT -eq 0 ] && echo "✓ Build succeeded" || echo "✗ Build failed (exit $BUILD_EXIT)"
  ```

  **Evidence to Capture**:
  - [ ] Full build output showing "Compiled successfully"
  - [ ] Exit code 0 confirmation
  - [ ] Grep results showing all 3 posts compiled
  - [ ] Zero TypeScript errors

  **Commit**: NO
  - Validation task produces no file changes

---

## Commit Strategy

| After Task | Message                                                      | Files                                | Verification |
| ---------- | ------------------------------------------------------------ | ------------------------------------ | ------------ |
| 1          | `feat(schema): add persona-driven fields to Post schema`     | contentlayer.config.ts               | pnpm build   |
| 2          | `feat(component): add DeveloperPerspective MDX component`    | components/developer-perspective.tsx | pnpm build   |
| 3          | `feat(mdx): register DeveloperPerspective in MDX components` | components/mdx-components.tsx        | pnpm build   |
| 4          | `docs(guides): add persona-driven writing style guide`       | .claude/guides/writing-style.md      | None         |
| 5, 6, 7    | `content: enhance 3 posts with persona-driven perspective`   | content/posts/\*.mdx (3 files)       | pnpm build   |

**Total Commits**: 5

---

## Success Criteria

### Verification Commands

```bash
# Final validation checklist
cd /Users/sonhyowon/Workspace/tom-project

# 1. Build succeeds
pnpm build
# Expected: Exit code 0, "Compiled successfully"

# 2. All schema fields present
grep -A 20 "export const Post" contentlayer.config.ts | grep -E "(hands_on|relevance|perspective|stack_context|tldr_verdict)"
# Expected: All 5 fields found

# 3. Component registered
grep "DeveloperPerspective" components/mdx-components.tsx
# Expected: Import + export found

# 4. All 3 posts enhanced
for post in google-project-genie openai-in-house-data-agent oh-my-opencode-v317; do
  grep -q "hands_on:" content/posts/*${post}*.mdx && echo "✓ $post has hands_on"
  grep -q "<DeveloperPerspective>" content/posts/*${post}*.mdx && echo "✓ $post has component"
done
# Expected: 6 checkmarks (3 posts × 2 checks)

# 5. Writing guide complete
test -f .claude/guides/writing-style.md && wc -l .claude/guides/writing-style.md
# Expected: File exists, 150+ lines
```

### Final Checklist

- [ ] All "Must Have" present:
  - [ ] Schema fields optional (no breaking changes)
  - [ ] Component uses existing design tokens
  - [ ] Relevance object has 5 fields with "high"|"medium"|"low" enums
- [ ] All "Must NOT Have" absent:
  - [ ] No breaking changes (existing posts still render)
  - [ ] No light mode toggle added
  - [ ] No new dependencies installed
  - [ ] No AI slop in content enhancements
- [ ] Build passes: `pnpm build` exit code 0
- [ ] All 3 posts display DeveloperPerspective sections correctly
- [ ] Writing guide has all 5 required sections
