# GitHub Issue Cloner

A TypeScript Node.js application that clones issues from one GitHub repository to another.

## Features

- Clones all open issues from a source repository to a target repository
- Preserves issue titles, bodies, and labels
- Clones comments and attributes them to the original author
- Optionally closes the source issue after cloning
- Securely handles GitHub API tokens using environment variables

## Quickstart

1. **GitHub Token Setup**:
   - Generate a Personal Access Token from [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Give it `repo` permissions for private repositories

1. **Create a `.env` file** in the root directory:

   - `FromRepo`: Source repository in format `owner/repo-name`
   - `ToRepo`: Target repository in format `owner/repo-name`
   - `DeleteAfterClone`: Set to `true` to close issues in source repo after cloning

    ```bash
    GitHubToken=ghp_yourpersonalaccesstoken
    FromRepo=owner/source-repo
    ToRepo=owner/target-repo
    DeleteAfterClone=false
    ```

1. Running the GitHub Issue Cloner

    ```bash
    npm install
    npm run dev
    ```

This will execute the issue cloning process using the configuration from `.env`.
