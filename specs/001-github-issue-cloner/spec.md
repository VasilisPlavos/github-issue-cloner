# Feature Specification: GitHub Issue Cloner

**Feature Branch**: `001-github-issue-cloner`
**Created**: 2026-01-07
**Status**: Draft
**Input**: User description: "Build a cli tool that can clone the issues from one github repo to another github repo. It should have a config file with the settings: From: user/repo To: user/repo Github API token: “token here” DeleteIssuesAfterClone: true or false This tool should be written using nodejs, typescript, octokat To run it I should do: npm run prod Make sure to include: - README file with instructions - Example usage"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Configure Repositories (Priority: P1)

As a developer, I want to configure the source and target repositories so that the tool knows where to clone issues from and to.

**Why this priority**: This is the most fundamental step to using the tool.

**Independent Test**: The tool can read a configuration file and correctly identify the source and target repositories.

**Acceptance Scenarios**:

1.  **Given** a valid configuration file with a source and target repository, **When** the tool is run, **Then** it successfully connects to both repositories.
2.  **Given** a configuration file with an invalid repository name, **When** the tool is run, **Then** it returns an error and does not proceed.

---

### User Story 2 - Clone Issues (Priority: P1)

As a developer, I want to run a command to clone all open issues from the source repository to the target repository.

**Why this priority**: This is the core functionality of the tool.

**Independent Test**: Running the command successfully clones all open issues.

**Acceptance Scenarios**:

1.  **Given** a configured source and target repository, **When** the clone command is run, **Then** all open issues from the source repository are created as new issues in the target repository.
2.  **Given** an issue in the source repository with a title, body, and labels, **When** it is cloned, **Then** the new issue in the target repository has the same title, body, and labels.

---

### User Story 3 - Delete After Cloning (Priority: P2)

As a developer, I want the option to automatically delete the original issues from the source repository after they have been successfully cloned.

**Why this priority**: This is a useful feature for migrating repositories, but not essential for the core cloning functionality.

**Independent Test**: When the `DeleteIssuesAfterClone` option is set to `true`, the source issues are deleted after cloning.

**Acceptance Scenarios**:

1.  **Given** the `DeleteIssuesAfterClone` option is set to `true`, **When** the clone command is run, **Then** the original issues in the source repository are deleted after they are cloned.
2.  **Given** the `DeleteIssuesAfterClone` option is set to `false`, **When** the clone command is run, **Then** the original issues in the source repository are not deleted.

### Edge Cases

-   What happens if the target repository does not exist?
-   What happens if the GitHub API token is invalid or has insufficient permissions?
-   What happens if an issue with the same title already exists in the target repository?
-   What happens if the network connection is interrupted during the cloning process?

## Requirements *(mandatory)*

### Functional Requirements

-   **FR-001**: The system MUST be a command-line interface (CLI) tool.
-   **FR-002**: The system MUST read its configuration from a dedicated file.
-   **FR-003**: The configuration file MUST allow specifying a source repository in the format `user/repo`.
-   **FR-004**: The configuration file MUST allow specifying a target repository in the format `user/repo`.
-   **FR-005**: The configuration file MUST allow specifying a GitHub API token.
-   **FR-006**: The configuration file MUST include a boolean option to enable or disable deleting issues after they are cloned.
-   **FR-007**: The system MUST clone all open issues from the source repository to the target repository.
-   **FR-008**: The system MUST preserve the title, body, and labels of each cloned issue.
-   **FR-009**: The project MUST include a `README.md` file with clear instructions on how to configure and run the tool.
-   **FR-010**: The system MUST handle comments on issues. If the issue has comments, the system MUST clone them along with the issue. At the comment add body, the original commenter name, created date and time.

### Key Entities *(include if feature involves data)*

-   **Issue**: A GitHub issue, which includes a title, body, labels, and comments.
-   **Repository**: A GitHub repository that contains issues.
-   **Configuration**: A set of user-defined settings that control the tool's behavior, including source and target repositories, API token, and the deletion flag.

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: 100% of open issues from a source repository are cloned to the target repository with their title, body, and labels intact.
-   **SC-002**: A user can successfully set up the configuration and run the tool to clone 100 issues in under 5 minutes, based on the provided `README.md` file.
-   **SC-003**: The tool can successfully clone 1000 issues from one repository to another without errors.
-   **SC-004**: When the delete option is enabled, 100% of the source issues are deleted after being successfully cloned.