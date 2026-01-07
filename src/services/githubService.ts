import { Octokit } from 'octokit';
import { Issue } from '../models/issue';

export class GitHubService {
  private octokit: Octokit;

  constructor(authToken: string) {
    this.octokit = new Octokit({ auth: authToken });
  }

  public async getIssues(owner: string, repo: string): Promise<any[]> {
    const response = await this.octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: 'open',
    });
    return response.data;
  }

  public async createIssue(owner: string, repo: string, issue: Issue): Promise<any> {
    const response = await this.octokit.rest.issues.create({
      owner,
      repo,
      title: issue.title,
      body: issue.body,
      labels: issue.labels,
    });
    return response.data;
  }

  public async addComment(owner: string, repo: string, issueNumber: number, comment: string): Promise<any> {
    const response = await this.octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: issueNumber,
        body: comment,
    });
    return response.data;
  }

  public async closeIssue(owner: string, repo: string, issueNumber: number): Promise<any> {
    const response = await this.octokit.rest.issues.update({
        owner,
        repo,
        issue_number: issueNumber,
        state: 'closed',
    });
    return response.data;
  }
}
