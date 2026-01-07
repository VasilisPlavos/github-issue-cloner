import { Octokit } from 'octokit';
import { Issue } from '../models/issue';

export class GitHubService {
  private octokit: Octokit;

  constructor(authToken: string) {
    this.octokit = new Octokit({ auth: authToken });
  }

  public async getIssues(owner: string, repo: string, state?: 'open'): Promise<Issue[]> {
    try {
      const response = await this.octokit.rest.issues.listForRepo({ owner, repo, state, per_page: 100 });
      const issues: Issue[] = response.data;
      
      const filteredIssues = issues; // .filter(i => !i.labels.some((l: any) => l.name === 'dont-clone'))
      return filteredIssues;
    } catch (error: any) {
      throw new Error(`Failed to fetch issues from ${owner}/${repo}: ${error.message}`);
    }
  }

  public async createIssue(owner: string, repo: string, issue: Issue): Promise<any> {
    try {
      const response = await this.octokit.rest.issues.create({
        owner,
        repo,
        title: issue.title,
        body: issue.body,
        labels: issue.labels,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to create issue in ${owner}/${repo}: ${error.message}`);
    }
  }

  public async addComment(owner: string, repo: string, issueNumber: number, comment: string): Promise<any> {
    try {
      const response = await this.octokit.rest.issues.createComment({ owner, repo, issue_number: issueNumber, body: comment });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to add comment to issue #${issueNumber} in ${owner}/${repo}: ${error.message}`);
    }
  }

  public async getComments(owner: string, repo: string, issueNumber: number): Promise<any[]> {
    try {
      const response = await this.octokit.rest.issues.listComments({
        owner,
        repo,
        issue_number: issueNumber,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch comments for issue #${issueNumber} in ${owner}/${repo}: ${error.message}`);
    }
  }

  public async closeIssue(owner: string, repo: string, issueNumber: number): Promise<any> {
    try {
      const response = await this.octokit.rest.issues.update({ owner, repo, issue_number: issueNumber, state: 'closed' });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to close issue #${issueNumber} in ${owner}/${repo}: ${error.message}`);
    }
  }
}
