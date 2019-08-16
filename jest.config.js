module.exports = {
  setupFilesAfterEnv: [
    './src/__tests__/setup/setupEnzyme.js',
  ],
  testPathIgnorePatterns: [
    './src/__tests__/setup/',
  ],
  "collectCoverageFrom": [
    "<rootDir>/**/*.js",
    "!<rootDir>/webpack.config.js",
    "!<rootDir>/node_modules",
    "!<rootDir>/src/index.js",
    "!<rootDir>/coverage/**/*.*",
    "!<rootDir>/build/**/*.*",
    "!<rootDir>/dist/**/*.*"
  ],
};
