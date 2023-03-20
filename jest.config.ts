import { Config } from 'jest';

const config: Config = {
  moduleNameMapper: {
    '^@root/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  collectCoverageFrom: [
    '**/modules/**/services/*.service.(t|j)s',
    '!<rootDir>/node_modules/',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageReporters: ['text-summary', 'lcov'],
  coverageProvider: 'v8',
};

export default config;
