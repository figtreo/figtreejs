/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^d3-array$': '<rootDir>/../..//node_modules/d3-array/dist/d3-array.min.js',
    '^d3-scale$': '<rootDir>/../..//node_modules/d3-scale/dist/d3-scale.min.js',
    '^d3-interpolate$': '<rootDir>/../../node_modules/d3-interpolate/dist/d3-interpolate.min.js',
    '^d3-color$': '<rootDir>/../../node_modules/d3-color/dist/d3-color.min.js',
    '^d3-format$': '<rootDir>/../../node_modules/d3-format/dist/d3-format.min.js',
    '^d3-time$': '<rootDir>/../../node_modules/d3-time/dist/d3-time.min.js',
    '^d3-time-format$': '<rootDir>/../../node_modules/d3-time-format/dist/d3-time-format.min.js',
  }};