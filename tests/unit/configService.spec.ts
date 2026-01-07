import { ConfigService } from '../../src/services/configService';
import * as fs from 'fs';

jest.mock('fs');

describe('ConfigService', () => {
  const MOCK_CONFIG = {
    fromRepo: 'test/from',
    toRepo: 'test/to',
    githubToken: 'test_token',
  };

  beforeEach(() => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(MOCK_CONFIG));
  });

  it('should load and parse the config file', () => {
    const configService = new ConfigService();
    expect(configService.get('fromRepo')).toBe('test/from');
    expect(configService.get('toRepo')).toBe('test/to');
  });

  it('should throw an error if the config file does not exist', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    expect(() => new ConfigService()).toThrow('Configuration file not found');
  });

  it('should throw an error if fromRepo is missing', () => {
    const invalidConfig = { ...MOCK_CONFIG, fromRepo: '' };
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(invalidConfig));
    expect(() => new ConfigService()).toThrow('`fromRepo` and `toRepo` must be defined in the configuration.');
  });

    it('should prioritize environment variable for github token', () => {
        process.env.GITHUB_TOKEN = 'env_token';
        const configService = new ConfigService();
        expect(configService.getGitHubToken()).toBe('env_token');
        delete process.env.GITHUB_TOKEN;
    });

    it('should fallback to config file for github token', () => {
        const configService = new ConfigService();
        expect(configService.getGitHubToken()).toBe('test_token');
    });
});
