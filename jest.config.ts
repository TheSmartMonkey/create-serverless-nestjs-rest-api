export default {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  coveragePathIgnorePatterns: ['.*__snapshots__/.*', '.*/index.ts', '.*/openapi.ts', '.*/schemas/.*'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'lcov', 'clover', 'cobertura'],
  moduleNameMapper: {
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@common/(.*)': '<rootDir>/src/common/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@tests/(.*)': '<rootDir>/tests/$1',
  },
  reporters: ['default'],
  roots: ['<rootDir>'],
  runner: 'groups',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
    '\\.html?$': [
      'esbuild-jest',
      {
        loader: { '.html': 'text' }, // see https://esbuild.github.io/content-types/
      },
    ],
  },
};
