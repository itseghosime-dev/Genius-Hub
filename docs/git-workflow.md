# Genius Hub — Git & Engineering Workflow

## 1. Branching Strategy

The repository strictly enforces a trunk-based workflow centered on a protected `main` branch:

- **`main`**: Production-ready code. Direct commits to `main` are restricted. All changes merge into `main` exclusively via reviewed Pull Requests with passing CI checks.
- **Topic Branches**: All development occurs in dedicated topic branches branched from the latest `main`.

### Branch Naming Conventions

Branch names must follow one of the standard prefixes:

- `feat/<domain>-<description>` — New feature or product capability (e.g., `feat/auth-mfa-support`)
- `fix/<domain>-<description>` — Bug fix or remediation (e.g., `fix/payments-webhook-signature`)
- `chore/<description>` — Tooling, dependency updates, or setup (e.g., `chore/project-foundation`)
- `docs/<description>` — Documentation improvements (e.g., `docs/security-architecture`)
- `refactor/<scope>` — Code refactoring without behavioral change (e.g., `refactor/api-envelope`)
- `perf/<scope>` — Performance optimizations (e.g., `perf/image-loading-priority`)
- `test/<scope>` — Testing infrastructure or coverage (e.g., `test/auth-flow-e2e`)

---

## 2. Commit Message Standards (Conventional Commits)

All commits must follow the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/) specification:

```text
<type>(<optional scope>): <short description in present tense>

[optional body explaining motivation and non-obvious context]

[optional footer(s), e.g., references to issues]
```

### Supported Types
- **`feat`**: Introduces a new user-facing or platform capability.
- **`fix`**: Fixes a defect or unexpected behavior.
- **`chore`**: Maintenance tasks, build system updates, dependency changes.
- **`docs`**: Documentation updates or additions.
- **`refactor`**: Code reorganization that neither adds a feature nor fixes a bug.
- **`perf`**: A code change that improves performance.
- **`test`**: Adding missing tests or correcting existing tests.
- **`ci`**: Changes to CI/CD configuration files and scripts.

### Atomic Commits Requirement
- Commits must be small, focused, and atomic.
- Avoid large monolithic commits bundling unrelated changes across domains.
- Every commit in the history must leave the codebase in a building and passing state.

---

## 3. Pre-Push & Local Verification Protocol

Before pushing any branch or opening a Pull Request, run the local verification suite:

```bash
# 1. Verify code formatting
bun run format:check

# 2. Run static linter
bun run lint

# 3. Verify TypeScript type safety
bun run typecheck

# 4. Run unit and integration tests
bun run test

# 5. Verify production build compilation
bun run build
```

---

## 4. Continuous Integration (CI) Enforcement

GitHub Actions automatically validates all pushes and Pull Requests targeting `main`:
1. Checkout repository with clean workspace.
2. Setup Bun environment.
3. Install dependencies using frozen lockfile (`bun install --frozen-lockfile`).
4. Execute `format:check`.
5. Execute `lint`.
6. Execute `typecheck`.
7. Execute `test`.
8. Execute `build`.

No Pull Request may be merged into `main` with failing CI checks.

