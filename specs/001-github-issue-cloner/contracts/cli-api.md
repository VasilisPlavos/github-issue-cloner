# Contract: CLI and Configuration

This document defines the public contract for the GitHub Issue Cloner, which includes its command-line interface and the structure of its configuration file.

## 1. Command-Line Interface (CLI)

The tool is invoked via an `npm` script.

### `npm run prod`

This is the primary command to execute the cloning process.

**Usage:**

```bash
npm run prod [options]
```

**Options:**

| Option | Alias | Description | Default |
|---|---|---|---|
| `--config` | `-c` | Path to the JSON configuration file. | `./config.json` |
| `--help` | `-h` | Show the help message. | |
| `--dry-run` | | Perform a trial run without making any actual changes to the repositories (e.g., creating or deleting issues). | `false` |

## 2. Configuration File (`config.json`)

This file contains the core settings for the tool. See `data-model.md` for a detailed breakdown of the fields.

**Example `config.json`:**

```json
{
  "fromRepo": "my-org/old-project",
  "toRepo": "my-org/new-project",
  "githubToken": "ghp_...",
  "deleteAfterClone": false
}
```

**Security Note:** It is strongly recommended to provide the `githubToken` via a `GITHUB_TOKEN` environment variable rather than storing it in the configuration file. If the environment variable is set, it will take precedence over the value in the file.
