module.exports = {
  setupFilesAfterEnv: [
    './src/__tests__/setup/setupEnzyme.js',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  testPathIgnorePatterns: [
    './src/__tests__/setup/',
  ],
  coveragePathIgnorePatterns: [
  ],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  modulePathIgnorePatterns: ['<rootDir>/cypress', '<rootDir>/src/components/Continue/Continue.jsx'],
};
