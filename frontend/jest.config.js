const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^pages/(.*)$': '<rootDir>/pages/$1',
    '^utils/(.*)$': '<rootDir>/utils/$1',
    '^components/(.*)$': '<rootDir>/components/$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
