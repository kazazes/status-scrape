module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testPathIgnorePatterns: ["/dist/", "/node_modules/", "/bundle/"],
  collectCoverageFrom: ["src/**/*"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  reporters: ["default", "jest-junit"],
  preset: "ts-jest",
};
