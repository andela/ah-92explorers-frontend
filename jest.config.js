module.exports = {
  setupFilesAfterEnv: [
    './src/__tests__/setup/setupEnzyme.js',
  ],
  testPathIgnorePatterns: [
    './src/__tests__/setup/',
  ],
};
