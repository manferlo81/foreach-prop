const CI = !!process.env.CI;
const coverageThreshold = 95;

module.exports = {

  testEnvironment: "node",
  browser: false,

  cacheDirectory: "node_modules/.cache/jest",

  preset: "ts-jest",

  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.ts",
  ],
  coverageReporters: [
    CI ? "json" : "lcov",
    "text",
    "text-summary",
  ],
  coverageThreshold: {
    global: {
      branches: coverageThreshold,
      functions: coverageThreshold,
      lines: coverageThreshold,
      statements: coverageThreshold,
    },
  },

  verbose: true,

};
