const { COVERAGE: COVERAGE_ENV } = process.env;
const collectCoverage = COVERAGE_ENV !== 'SKIP';
const coverageOnCI = COVERAGE_ENV === 'CI';

/** @type { import("ts-jest").JestConfigWithTsJest } */
const config = {
  preset: 'ts-jest',

  collectCoverage,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageReporters: coverageOnCI
    ? ['json', 'clover', 'cobertura']
    : ['html', 'text'],

  testMatch: [
    '**/__test__/**/*.test.ts',
  ],

  cacheDirectory: 'node_modules/.cache/jest',
  verbose: true,
};

export default config;
