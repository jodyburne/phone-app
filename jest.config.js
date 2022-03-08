module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es)"],
  testEnvironment: "jsdom",
};
