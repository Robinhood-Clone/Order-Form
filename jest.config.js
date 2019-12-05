module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["**/*.jsx", "!**/node_modules/**"],
  moduleFileExtensions: ['js', 'json', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  verbose: false,
};