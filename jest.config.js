const { main } = require("./package.json");

const CI = !!process.env.CI;
const coverageThreshold = 95;

module.exports = {

  testEnvironment: "node",
  browser: false,

  cacheDirectory: ".cache/jest",

  collectCoverage: true,
  collectCoverageFrom: [
    main,
  ],
  coverageDirectory: "coverage",
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
