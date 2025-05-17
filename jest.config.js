/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.(ts|js)'],
  testPathIgnorePatterns: [
    '/node_modules/', 
    '/dist/',
    'weatherController.test.ts',
    'mcp.test.ts'
  ],
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/tests/**/*.ts']
}; 