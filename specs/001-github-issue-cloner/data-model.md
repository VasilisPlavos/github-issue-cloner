# Data Models: GitHub Issue Cloner

This document defines the key data entities for the GitHub Issue Cloner tool.

## 1. Configuration

This entity represents the user-provided settings that control the tool's behavior. It is typically stored in a `config.json` file.

| Field | Type | Description | Required | Example |
|---|---|---|---|---|
| `fromRepo` | String | The source repository in `owner/repo` format. | Yes | `"my-org/old-project"` |
| `toRepo` | String | The target repository in `owner/repo` format. | Yes | `"my-org/new-project"` |
| `githubToken` | String | A GitHub Personal Access Token with `repo` scope. **Note**: It is highly recommended to use the `GITHUB_TOKEN` environment variable instead. | No | `"ghp_..."` |
| `deleteAfterClone` | Boolean | If `true`, issues in the `fromRepo` will be deleted after being successfully cloned to the `toRepo`. Defaults to `false`. | No | `true` |

## 2. Issue

This entity represents a GitHub issue. The tool will read issues from the source repository and create new ones in the target repository.

| Field | Type | Description |
|---|---|---|
| `title` | String | The title of the issue. |
| `body` | String | The main content of the issue description. |
| `labels` | Array of Strings | A list of labels associated with the issue. |
| `comments` | Array of Comments | A list of comments on the issue. |

## 3. Comment

This entity represents a single comment on a GitHub issue.

| Field | Type | Description |
|---|---|---|
| `body` | String | The content of the comment. |
| `author` | String | The GitHub username of the original commenter. |
| `createdAt` | String (ISO 8601) | The timestamp of the original comment. |
