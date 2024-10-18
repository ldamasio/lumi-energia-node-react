// jest.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { diagnostics: false }], // Add any ts-jest options here
  },
  testMatch: ['**/__tests__/**/*.(spec|test).ts'],
  coverageDirectory: './coverage',
  collectCoverageFrom: ['./src/**/*.ts'],
  coveragePathIgnorePatterns: ['node_modules'],
};
