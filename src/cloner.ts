import { ConfigService } from './services/configService';
import { GitHubService } from './services/githubService';
import { Issue } from './models/issue';

export class Cloner {
  private configService: ConfigService;
  private githubService: GitHubService;

  constructor(configPath: string) {
    this.configService = new ConfigService(configPath);
    const token = this.configService.getGitHubToken();
    if (!token) {
      throw new Error('GitHub token not found. Please set GITHUB_TOKEN environment variable or add to config file.');
    }
    this.githubService = new GitHubService(token);
  }

  public async cloneIssues(dryRun: boolean = false) {
    const fromRepo = this.configService.get('fromRepo') as string;
    const toRepo = this.configService.get('toRepo') as string;
    const [fromOwner, fromRepoName] = fromRepo.split('/');
    const [toOwner, toRepoName] = toRepo.split('/');

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
    
            if (!dryRun) {
              const createdIssue = await this.githubService.createIssue(toOwner, toRepoName, newIssue);
                        console.log(`  -> Created issue #${createdIssue.number} in ${toRepo}`);
                        
                        const issueComments = await this.githubService.getComments(fromOwner, fromRepoName, sourceIssue.number);    
              if (issueComments && issueComments.length > 0) {
                  for(const comment of issueComments) {
                      const commentBody = `**Original comment by @${comment.user.login} on ${comment.created_at}**:\n\n${comment.body}`;
                      await this.githubService.addComment(toOwner, toRepoName, createdIssue.number, commentBody);
                      console.log(`  -> Added comment from @${comment.user.login}`);
                  }
              }
    
              if (this.configService.get('deleteAfterClone')) {
                console.log(`  -> Closing source issue #${sourceIssue.number} in ${fromRepo}`);
                await this.githubService.closeIssue(fromOwner, fromRepoName, sourceIssue.number);
              }
            } else {
              console.log(`  -> Dry run: Would clone issue "${sourceIssue.title}" to ${toRepo}`);
            }
          } catch (error: any) {
            console.error(`Error cloning issue "${sourceIssue.title}" (#${sourceIssue.number}): ${error.message}`);
          }
        }
        console.log('Cloning complete.');
      }
    }