module.exports = {
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  setupFilesAfterEnv: [
    './src/__tests__/setup/setupEnzyme.js',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  testPathIgnorePatterns: [
    './src/__tests__/setup/',
    './jest.config.js',
    './cypress',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  collectCoverageFrom: [
    '<rootDir>/**/*.{js,jsx}',
    '!<rootDir>/webpack.config.js',
    '!<rootDir>/node_modules',
    '!<rootDir>/src/index.js',
    '!<rootDir>/jest.config.js',
    '!<rootDir>/coverage/**/*.*',
    '!<rootDir>/cypress/**/*.*',
    '!<rootDir>/build/**/*.*',
    '!<rootDir>/dist/**/*.*',
  ],
  setupFiles: ['<rootDir>/node_modules/regenerator-runtime/runtime'],
};
