
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTest.ts'],
  globals: {
    'ts-jest' : {
      tsconfig: 'tsconfig.app.json'
    }
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}