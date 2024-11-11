/** @type { import("jest").Config } */
const config = {
  cacheDirectory: 'node_modules/.cache/jest',
  preset: 'ts-jest',

  collectCoverage: process.env.COVERAGE !== 'SKIP',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageReporters: process.env.COVERAGE === 'CI'
    ? ['json', 'clover', 'cobertura']
    : ['html', 'text'],

  testMatch: [
    '**/__test__/**/*.test.ts',
  ],

  verbose: true,
};

export default config;
