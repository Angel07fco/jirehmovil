module.exports = {
    preset: "jest-expo",
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    transformIgnorePatterns: [
      "node_modules/(?!react-native|@react-native|expo|expo-status-bar|@expo/.*)"
    ],
    testPathIgnorePatterns: [
      "/node_modules/",
      "/android/",
      "/ios/"
    ],
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    }
  };
  