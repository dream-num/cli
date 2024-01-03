import type { JestConfigWithTsJest } from 'ts-jest'

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/templates/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/templates/'],
} as JestConfigWithTsJest
