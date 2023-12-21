/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^d3-array$': '<rootDir>/../..//node_modules/d3-array/dist/d3-array.min.js',
  }};