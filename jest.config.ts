import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './', // Root directory of the Next.js app
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Ensure this file exists
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Adjust this mapping to your project structure
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Ensure TypeScript files are transformed by ts-jest
  },
};

export default createJestConfig(customJestConfig);