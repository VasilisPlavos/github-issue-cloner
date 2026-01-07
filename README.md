# GitHub Issue Cloner

A CLI tool to clone issues from one GitHub repository to another.

This tool allows you to migrate issues, including their labels and comments, between repositories. It's useful for moving projects or consolidating issues into a single repository.

## Features

- Clones all open issues from a source repository to a target repository.
- Preserves issue titles, bodies, and labels.
- Clones comments and attributes them to the original author.
- Optionally closes the source issue after cloning.
- Securely handles GitHub API tokens using environment variables.
- Supports a dry-run mode to preview changes before they are made.

## Quickstart

This guide provides the essential steps to set up and run the GitHub Issue Cloner tool.

### 1. Prerequisites

-   Node.js (version 20.x or higher)
-   npm

### 2. Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/github-issue-cloner.git
    cd github-issue-cloner
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### 3. Configuration

1.  **Create a `config.json` file** in the root of the project. You can copy the example below.

2.  **Set the GitHub API Token**:
    It is **strongly recommended** to use an environment variable for your GitHub token.

    In your shell profile (e.g., `.bash_profile`, `.zshrc`, or Windows environment variables):
    ```bash
    export GITHUB_TOKEN="ghp_yourpersonalaccesstoken"
    ```
    Alternatively, you can place the token directly in the `config.json` file, but this is less secure.

3.  **Edit `config.json`**:
    Update the `fromRepo` and `toRepo` values to point to your source and target repositories.

    **Example `config.json`:**
    ```json
    {
      "fromRepo": "owner/source-repo",
      "toRepo": "owner/target-repo",
      "deleteAfterClone": false
    }
    ```

### 4. Usage

1.  **Perform a Dry Run**:
    Before running the actual clone, it's a good practice to do a dry run to ensure everything is configured correctly. The dry run will list the issues it would clone without making any changes.
    ```bash
    npm run prod -- --dry-run
    ```

2.  **Run the Cloner**:
    Once you have verified the dry run output, you can execute the clone.
    ```bash
    npm run prod
    ```
    The tool will now fetch all open issues from the `fromRepo` and create them in the `toRepo`.

### 5. Building from Source

To compile the TypeScript code, run:
```bash
npm run build
```
This will create the compiled JavaScript files in the `dist/` directory.