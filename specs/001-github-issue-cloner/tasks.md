# Tasks: GitHub Issue Cloner

**Input**: Design documents from `specs/001-github-issue-cloner/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/, research.md

---
## Phase 1: Setup

**Purpose**: Initialize the Node.js project and configure the development environment.

- [ ] T001 Initialize npm project: `npm init -y`
- [ ] T002 [P] Install core dependencies: `npm install octokit yargs`
- [ ] T003 [P] Install development dependencies: `npm install -D typescript @types/node jest ts-jest @types/jest`
- [ ] T004 [P] Create `tsconfig.json` for TypeScript compilation.
- [ ] T005 [P] Configure Jest for TypeScript in `jest.config.js`.
- [ ] T006 Create initial project directory structure: `src/`, `tests/`.

---
## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement core configuration and service structures.

- [ ] T007 Define `Configuration` and related types in `src/models/config.ts` based on `data-model.md`.
- [ ] T008 Implement a `ConfigService` in `src/services/configService.ts` to load and validate `config.json`.
- [ ] T009 [P] Write unit tests for `ConfigService` in `tests/unit/configService.test.ts`.

---
## Phase 3: User Story 1 - Configure Repositories (Priority: P1)

**Goal**: Allow a user to configure the tool and see basic usage.

**Independent Test**: Running the tool with `--help` displays all available commands and options.

### Implementation for User Story 1

- [ ] T010 [US1] Create the main CLI entry point in `src/cli.ts` using `yargs`.
- [ ] T011 [US1] Implement the `--help` command to show usage based on `contracts/cli-api.md`.
- [ ] T012 [US1] Implement the `--version` command.

---
## Phase 4: User Story 2 - Clone Issues (Priority: P1)

**Goal**: Implement the core functionality of cloning issues.

**Independent Test**: The tool successfully clones an issue from the source to the target repository, including its title, body, labels, and comments.

### Implementation for User Story 2

- [ ] T013 [P] [US2] Define `Issue` and `Comment` types in `src/models/issue.ts` based on `data-model.md`.
- [ ] T014 [US2] Create a `GitHubService` in `src/services/githubService.ts` to encapsulate all `octokit` API calls.
- [ ] T015 [US2] Implement `getIssues(repo: string)` method in `GitHubService` to fetch all open issues.
- [ ] T016 [US2] Implement `createIssue(repo: string, issue: Issue)` method in `GitHubService` to create a new issue.
- [ ] T017 [US2] Implement `addComment(repo: string, issueNumber: number, comment: string)` method in `GitHubService`.
- [ ] T018 [US2] Implement the main cloning logic in `src/cloner.ts` that orchestrates the service calls.
- [ ] T019 [US2] Integrate the cloning logic into the main command in `src/cli.ts`.
- [ ] T020 [P] [US2] Write integration tests for the cloning process in `tests/integration/cloner.test.ts`, mocking the `GitHubService`.

---
## Phase 5: User Story 3 - Delete After Cloning (Priority: P2)

**Goal**: Add the ability to delete the source issue after a successful clone.

**Independent Test**: When the `deleteAfterClone` flag is true, the source issue is deleted after it has been successfully cloned and verified.

### Implementation for User Story 3

- [ ] T021 [US3] Implement `closeIssue(repo: string, issueNumber: number)` method in `GitHubService`. Note: GitHub API doesn't allow permanent deletion, so closing is the safer alternative. The task description will be updated to reflect this.
- [ ] T022 [US3] Add logic to `src/cloner.ts` to call `closeIssue` if the `deleteAfterClone` flag is true in the configuration.
- [ ] T023 [P] [US3] Add a unit test for the delete/close logic in `tests/unit/cloner.test.ts`.

---
## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finalize the tool with documentation, error handling, and build scripts.

- [ ] T024 Create a comprehensive `README.md` based on `quickstart.md`.
- [ ] T025 Implement robust error handling for API failures and invalid configurations.
- [ ] T026 Add logging to provide clear feedback to the user during the cloning process.
- [ ] T027 [P] Create `npm` scripts for `build` and `prod` in `package.json`.
- [ ] T028 Add the `--dry-run` functionality to the CLI.

---
## Dependencies & Execution Order

- **Setup (Phase 1)** and **Foundational (Phase 2)** must be completed first.
- **User Story 1 (Phase 3)** can be implemented.
- **User Story 2 (Phase 4)** depends on Phase 3.
- **User Story 3 (Phase 5)** depends on Phase 4.
- **Polish (Phase 6)** can be worked on throughout, but is finalized last.

## Implementation Strategy

The project will be implemented by following the phases in order. Each user story phase results in a testable, valuable increment.

1.  **MVP Scope**: Complete up to Phase 4. This will deliver the core cloning functionality.
2.  **Incremental Delivery**: Add Phase 5 to include the "delete/close" feature.
3.  **Finalization**: Complete Phase 6 for a polished, production-ready tool.
