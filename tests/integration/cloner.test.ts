import { Cloner } from '../../src/cloner';
import { ConfigService } from '../../src/services/configService';
import { GitHubService } from '../../src/services/githubService';

// Mock the services
jest.mock('../../src/services/configService');
jest.mock('../../src/services/githubService');

const MockedConfigService = ConfigService as jest.MockedClass<typeof ConfigService>;
const MockedGitHubService = GitHubService as jest.MockedClass<typeof GitHubService>;

describe('Cloner - Integration', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MockedConfigService.mockClear();
    MockedGitHubService.mockClear();
    
    // Mock the config service to return a valid config
    MockedConfigService.prototype.get.mockImplementation((key) => {
        if (key === 'fromRepo') return 'owner/from';
        if (key === 'toRepo') return 'owner/to';
        return undefined;
    });
    MockedConfigService.prototype.getGitHubToken.mockReturnValue('fake_token');
  });

  it('should fetch issues from the source repo and create them in the target repo', async () => {
    const mockIssues = [
      { number: 1, title: 'Test Issue 1', body: 'Body 1', labels: [{name: 'bug'}] },
    ];
    const mockCreatedIssue = { number: 101, title: 'Test Issue 1' };

    // Setup mock implementations for GitHubService
    const getIssuesMock = jest.fn().mockResolvedValue(mockIssues);
    const createIssueMock = jest.fn().mockResolvedValue(mockCreatedIssue);
    const addCommentMock = jest.fn().mockResolvedValue({});
    MockedGitHubService.prototype.getIssues = getIssuesMock;
    MockedGitHubService.prototype.createIssue = createIssueMock;
    MockedGitHubService.prototype.addComment = addCommentMock;
    
    const cloner = new Cloner('./fake-config.json');
    await cloner.cloneIssues(false);

    expect(getIssuesMock).toHaveBeenCalledWith('owner', 'from');
    expect(createIssueMock).toHaveBeenCalledWith('owner', 'to', {
      title: 'Test Issue 1',
      body: 'Body 1',
      labels: ['bug'],
      comments: [],
    });
  });
});
