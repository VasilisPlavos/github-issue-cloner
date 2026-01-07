import ENV from './constants/ENV';
import { Issue } from './models/issue';
import { GitHubService } from './services/githubService';

export class Cloner {
  private githubService: GitHubService;

  constructor() {
    if (!ENV.GitHubToken) {
      throw new Error('GitHub token not found. Please set GITHUB_TOKEN environment variable or add to config file.');
    }
    this.githubService = new GitHubService(ENV.GitHubToken);
  }

  public async cloneIssues() {
    const fromRepo = ENV.FromRepo!;
    const toRepo = ENV.ToRepo!;
    const [fromOwner, fromRepoName] = fromRepo.split('/');
    const [toOwner, toRepoName] = toRepo.split('/');
    const deleteAfterClone = ENV.DeleteAfterClone;

    console.log(`Fetching issues from ${fromRepo}...`);
    const sourceIssues = await this.githubService.getIssues(fromOwner, fromRepoName);
    console.log(`Found ${sourceIssues.length} open issues.`);

    if (sourceIssues.length === 0) {
      console.log('No issues found to clone. Exiting.');
      return;
    }

    for (const sourceIssue of sourceIssues) {
      try {
        const newIssue: Issue = {
          title: sourceIssue.title,
          body: sourceIssue.body,
          labels: sourceIssue.labels.map((label: any) => label.name),
          comments: [], // Comments will be handled separately
        };

        console.log(`Cloning issue: "${sourceIssue.title}" (#${sourceIssue.number})`);

        const createdIssue = await this.githubService.createIssue(toOwner, toRepoName, newIssue);
        console.log(`  -> Created issue #${createdIssue.number} in ${toRepo}`);
        await this.githubService.addComment(toOwner, toRepoName, createdIssue.number, `**Clone** of ${sourceIssue.html_url}`);

        const issueComments = await this.githubService.getComments(fromOwner, fromRepoName, sourceIssue.number);
        if (issueComments && issueComments.length > 0) {
          for (const comment of issueComments) {
            const commentBody = `**Original comment by @${comment.user.login} on ${comment.created_at}**:\n\n${comment.body}`;
            await this.githubService.addComment(toOwner, toRepoName, createdIssue.number, commentBody);
            console.log(`  -> Added comment from @${comment.user.login}`);
          }
        }

        if (deleteAfterClone) {
          console.log(`  -> Closing source issue #${sourceIssue.number} in ${fromRepo}`);
          await this.githubService.closeIssue(fromOwner, fromRepoName, sourceIssue.number);
        }
      } catch (error: any) {
        console.error(`Error cloning issue "${sourceIssue.title}" (#${sourceIssue.number}): ${error.message}`);
      }
    }
    console.log('Cloning complete.');
  }
}