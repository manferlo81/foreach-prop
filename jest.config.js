const coverageThreshold = 95

module.exports = {

  testEnvironment: 'node',
  browser: false,

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
  coverageThreshold: {
    global: {
      branches: coverageThreshold,
      functions: coverageThreshold,
      lines: coverageThreshold,
      statements: coverageThreshold,
    },
  },

  testMatch: [
    '**/__test__/**/*.test.ts',
  ],

  verbose: true,

}
