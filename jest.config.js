module.exports = {
  'roots': [
    '<rootDir>/tests',
  ],
  'testMatch': [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  'coverageThreshold': {
    'global': {
      'branches': 85,
      'functions': 90,
      'lines': 90,
      'statements': 90,
    },
  },
};
