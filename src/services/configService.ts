import * as fs from 'fs';
import * as path from 'path';
import { Configuration } from '../models/config';

export class ConfigService {
  private config: Configuration;

  constructor(configPath: string = './config.json') {
    this.config = this.loadConfig(configPath);
    this.validateConfig();
  }

  private loadConfig(configPath: string): Configuration {
    const resolvedPath = path.resolve(configPath);
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Configuration file not found at ${resolvedPath}`);
    }
    const rawConfig = fs.readFileSync(resolvedPath, 'utf-8');
    return JSON.parse(rawConfig);
  }

  private validateConfig() {
    if (!this.config.fromRepo || !this.config.toRepo) {
      throw new Error('`fromRepo` and `toRepo` must be defined in the configuration.');
    }
    if (this.config.githubToken && typeof this.config.githubToken !== 'string') {
        throw new Error('`githubToken` must be a string.');
    }
  }

  public get(key: keyof Configuration) {
    return this.config[key];
  }

    public getGitHubToken(): string {
        return process.env.GITHUB_TOKEN || this.config.githubToken || '';
    }
}
