/** @type { import("jest").Config } */
const config = {
  cacheDirectory: 'node_modules/.cache/jest',
  preset: 'ts-jest',

  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageReporters: [
    process.env.CI ? 'json' : 'lcov',
    'text',
    'text-summary',
  ],

  testMatch: [
    '**/__test__/**/*.test.ts',
  ],

  verbose: true,
};

export default config;
