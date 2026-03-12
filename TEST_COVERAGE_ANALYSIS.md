# Test Coverage Analysis & Improvement Proposal

## Current State

The repository is in its initial stage with no source code or tests. This analysis serves as a **proactive test strategy** to establish strong coverage as the codebase is built out.

Based on the project description (a fan site for Jinro Judgment / 人狼ジャッジメント covering role information, strategy guides, beginner explanations, and composition analysis) and the `.gitignore` configuration (Node.js, Next.js/Nuxt.js/Vite), the following areas will need test coverage.

---

## Recommended Testing Infrastructure

### Framework & Tooling

| Tool | Purpose |
|------|---------|
| **Vitest** | Unit & integration test runner (fast, Vite-native, ESM-first) |
| **Testing Library** (`@testing-library/react` or `/vue`) | Component testing with user-centric queries |
| **Playwright** or **Cypress** | End-to-end testing for critical user flows |
| **c8** or **istanbul** | Code coverage reporting (built into Vitest) |

### Suggested `package.json` scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test"
  }
}
```

---

## Areas That Need Test Coverage

### 1. Role Data Layer (High Priority)

The core value of the site is accurate role information (役職情報). This data is the foundation everything else depends on.

**What to test:**
- Role data schema validation — every role has required fields (name, team, ability description, appearance conditions)
- Data completeness — all roles from the game are present
- Data integrity — no duplicate role IDs, no broken references between roles
- Localization — Japanese text is present and non-empty for all display strings

**Example test areas:**
```
src/data/roles.ts          → validate schema, completeness, uniqueness
src/data/teams.ts          → validate team definitions, role-team mappings
src/data/compositions.ts   → validate composition rules reference valid roles
```

**Why this matters:** A data error on a fan site destroys credibility. These tests are cheap to write and catch real bugs (typos, missing fields, broken relationships).

---

### 2. Game Logic & Composition Utilities (High Priority)

Composition analysis (編成考察) implies logic for validating or suggesting player compositions.

**What to test:**
- Composition validation (min/max player counts, required role constraints)
- Role interaction logic (which roles conflict, which synergize)
- Win condition calculations per team
- Edge cases: empty compositions, single-player, all-same-role

**Example test areas:**
```
src/utils/composition.ts   → validation rules, edge cases
src/utils/game-logic.ts    → role interactions, night/day phase logic
src/utils/win-conditions.ts → team victory calculations
```

**Why this matters:** Game logic has clear inputs and outputs — perfect for unit testing. Bugs here mislead players about how the game works.

---

### 3. UI Components (Medium Priority)

**What to test:**
- **Role card/detail component**: renders correct name, team color, ability text
- **Role list/filter component**: filtering by team, searching by name, sort order
- **Composition builder** (if interactive): adding/removing roles, validation feedback
- **Navigation**: links work, active states are correct
- **Responsive layout**: key breakpoints don't break content

**Example test areas:**
```
src/components/RoleCard.tsx       → renders role data correctly
src/components/RoleList.tsx       → filtering, sorting, empty state
src/components/CompositionBuilder.tsx → add/remove roles, validation display
src/components/Navigation.tsx     → links, active states
```

**Testing approach:** Use Testing Library to test from the user's perspective — query by visible text and accessible roles, not implementation details.

---

### 4. Search & Filtering (Medium Priority)

A fan site with many roles needs good search. This is easy to get wrong with Japanese text.

**What to test:**
- Full-width / half-width character normalization (全角・半角)
- Hiragana/katakana matching (e.g., searching "おおかみ" finds "人狼")
- Partial match behavior
- Filter combinations (team + ability type)
- Empty result states

**Example test areas:**
```
src/utils/search.ts        → Japanese text normalization, matching logic
src/hooks/useRoleFilter.ts → filter state management, combined filters
```

**Why this matters:** Japanese text search has unique edge cases that English-only developers often miss. Automated tests prevent regressions.

---

### 5. Routing & Page Rendering (Medium Priority)

**What to test:**
- All defined routes resolve to the correct page
- Dynamic role detail pages (`/roles/[id]`) handle valid and invalid IDs
- 404 page renders for unknown routes
- SEO metadata (title, description) is correct per page
- Structured data / Open Graph tags for social sharing

**Example test areas:**
```
src/pages/index.tsx           → renders home page content
src/pages/roles/[id].tsx      → renders role detail, handles missing role
src/pages/guide/beginner.tsx  → renders guide content
```

---

### 6. Beginner Guide Content (Low Priority)

**What to test:**
- All guide pages render without errors
- Internal links within guides point to valid routes
- Images/diagrams referenced in guides exist
- Content structure is consistent (headings, sections)

**Testing approach:** Snapshot tests or smoke tests — render each guide page and verify no errors.

---

### 7. Accessibility (Low Priority, High Impact)

**What to test:**
- All images have alt text (especially role icons)
- Color contrast meets WCAG AA for role team colors
- Keyboard navigation works for interactive elements
- Screen reader announcements for dynamic content (filter results count)
- Language attribute is set to `ja`

**Testing approach:** Integrate `axe-core` via `@axe-core/playwright` or `jest-axe` for automated accessibility checks.

---

### 8. End-to-End (E2E) Tests (Add After Core Features)

**Critical user flows to cover:**

| Flow | Description |
|------|-------------|
| Browse all roles | Home → Role list → scroll/paginate |
| View role detail | Role list → click role → see full detail |
| Search for a role | Type in search → see filtered results → click result |
| Read beginner guide | Navigate to guide → read through sections |
| Build composition | Select roles → see validation → review summary |

---

## Coverage Goals

| Phase | Target | Focus |
|-------|--------|-------|
| **Phase 1** (MVP) | 80%+ on data & utils | Role data integrity, game logic, search |
| **Phase 2** (Components) | 70%+ on components | UI rendering, user interactions |
| **Phase 3** (Integration) | 5-10 E2E tests | Critical user flows |
| **Ongoing** | No decrease in coverage | CI gate on coverage regression |

---

## CI/CD Integration

Recommended GitHub Actions workflow:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v4  # optional: coverage reporting
```

Add a **coverage threshold** in `vitest.config.ts`:

```ts
export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      }
    }
  }
})
```

---

## Summary of Priorities

| Priority | Area | Rationale |
|----------|------|-----------|
| **High** | Role data validation | Core site value; cheap to test; high bug risk |
| **High** | Game logic / composition utils | Clear I/O; correctness is critical for credibility |
| **Medium** | UI components | User-facing; catch rendering bugs |
| **Medium** | Search & filtering | Japanese text edge cases are tricky |
| **Medium** | Routing & pages | Ensure all content is reachable |
| **Low** | Guide content | Mostly static; smoke tests suffice |
| **Low** | Accessibility | Important but can be added incrementally |

The single highest-impact action is to **set up Vitest with coverage reporting from day one** so that every new file gets tested as it's written, rather than retrofitting tests later.
