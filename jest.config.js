module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.spec.ts'],
  transform: {
    '^.+\.ts$': 'ts-jest',
    '^.+\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!octokit|@octokit)',
  ],
};