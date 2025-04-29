import { createDefaultPreset } from 'ts-jest';

const { COVERAGE: COVERAGE_ENV } = process.env;
const collectCoverage = COVERAGE_ENV !== 'SKIP';
const coverageOnCI = COVERAGE_ENV === 'CI';

const typescriptJestPreset = createDefaultPreset({
  tsconfig: './tsconfig.json',
});

/** @type { import("ts-jest").JestConfigWithTsJest } */
const config = {
  ...typescriptJestPreset,

  collectCoverage,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageReporters: coverageOnCI
    ? ['text', 'json', 'clover', 'cobertura']
    : ['text', 'html'],

  testMatch: [
    '**/__test__/**/*.test.ts',
  ],

  cacheDirectory: 'node_modules/.cache/jest',
  verbose: true,
};

export default config;
