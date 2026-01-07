import { Cloner } from '../../src/cloner';
import { ConfigService } from '../../src/services/configService';
import { GitHubService } from '../../src/services/githubService';

// Mock the services
jest.mock('../../src/services/configService');
jest.mock('../../src/services/githubService');

const MockedConfigService = ConfigService as jest.MockedClass<typeof ConfigService>;
const MockedGitHubService = GitHubService as jest.MockedClass<typeof GitHubService>;

describe('Cloner - Unit', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MockedConfigService.mockClear();
    MockedGitHubService.mockClear();
  });

  it('should call closeIssue when deleteAfterClone is true', async () => {
    // Arrange
    MockedConfigService.prototype.get.mockImplementation((key) => {
        if (key === 'fromRepo') return 'owner/from';
        if (key === 'toRepo') return 'owner/to';
        if (key === 'deleteAfterClone') return true;
        return undefined;
    });
    MockedConfigService.prototype.getGitHubToken.mockReturnValue('fake_token');

    const mockIssues = [{ number: 1, title: 'Test Issue', body: 'Body', labels: [] }];
    const mockCreatedIssue = { number: 101, title: 'Test Issue' };
    const getIssuesMock = jest.fn().mockResolvedValue(mockIssues);
    const createIssueMock = jest.fn().mockResolvedValue(mockCreatedIssue);
    const closeIssueMock = jest.fn().mockResolvedValue({});
    const addCommentMock = jest.fn().mockResolvedValue([]);
    MockedGitHubService.prototype.getIssues = getIssuesMock;
    MockedGitHubService.prototype.createIssue = createIssueMock;
    MockedGitHubService.prototype.closeIssue = closeIssueMock;
    MockedGitHubService.prototype.addComment = addCommentMock;

    const cloner = new Cloner('./fake-config.json');

    // Act
    await cloner.cloneIssues(false);

    // Assert
    expect(closeIssueMock).toHaveBeenCalledWith('owner', 'from', 1);
  });

  it('should NOT call closeIssue when deleteAfterClone is false', async () => {
    // Arrange
    MockedConfigService.prototype.get.mockImplementation((key) => {
        if (key === 'fromRepo') return 'owner/from';
        if (key === 'toRepo') return 'owner/to';
        if (key === 'deleteAfterClone') return false;
        return undefined;
    });
    MockedConfigService.prototype.getGitHubToken.mockReturnValue('fake_token');

    const mockIssues = [{ number: 1, title: 'Test Issue', body: 'Body', labels: [] }];
    const mockCreatedIssue = { number: 101, title: 'Test Issue' };
    const getIssuesMock = jest.fn().mockResolvedValue(mockIssues);
    const createIssueMock = jest.fn().mockResolvedValue(mockCreatedIssue);
    const closeIssueMock = jest.fn().mockResolvedValue({});
    const addCommentMock = jest.fn().mockResolvedValue([]);
    MockedGitHubService.prototype.getIssues = getIssuesMock;
    MockedGitHubService.prototype.createIssue = createIssueMock;
    MockedGitHubService.prototype.closeIssue = closeIssueMock;
    MockedGitHubService.prototype.addComment = addCommentMock;
    
    const cloner = new Cloner('./fake-config.json');
    
    // Act
    await cloner.cloneIssues(false);

    // Assert
    expect(closeIssueMock).not.toHaveBeenCalled();
  });
});
