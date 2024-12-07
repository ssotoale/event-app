module.exports = {
  // Specify how to transform files (e.g., JSX/TSX files)
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  
  // Automatically mock modules that are not being tested
  moduleNameMapper: {
    '\\.png$': '<rootDir>/__mocks__/fileMock.js',
    "^react$": require.resolve("react"),
    "^react-dom$": require.resolve("react-dom"),
  },

  // Set up the test environment (e.g., jsdom for browser-like testing)
  testEnvironment: "jsdom",

  // Collect code coverage information
  collectCoverage: true,

  // Specify test files pattern (in this case, look for *.test.js or *.test.jsx files)
  testMatch: [
    "**/src/**/*.test.{js,jsx}",
    "**/?(*.)+(spec|test).{js,jsx}",
  ],

  // Optional: Enable debugging for Jest tests if needed
  verbose: true,
};
