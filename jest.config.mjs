const { COVERAGE: COVERAGE_ENV } = process.env;
const collectCoverage = COVERAGE_ENV !== 'SKIP';
const coverageOnCI = COVERAGE_ENV === 'CI';

/** @type { import("jest").Config } */
const config = {
  cacheDirectory: 'node_modules/.cache/jest',
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

  verbose: true,
};

export default config;
